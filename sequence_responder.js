const max_api = require('max-api');
const path = require('path');
const m4l = require('./m4l_tools.js');
const ResponsiveCNN = require('./responsive_cnn.js');

const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node-gpu');

//for now... const note_range = [0, 127]; // DEFAULT
const note_height = 128;// () => note_range[1] - note_range[0] + 1;
let sequence_length = 16;
let output_size = parseInt(process.argv[2]);
let saved_model = process.argv[3];

const note_sequences = [];
const targets = [];

const input_sequence = [];
const initInputSequence = () => {
    input_sequence.length = 0;
    for (let i = 0; i < note_height; i++) {
        input_sequence.push(Array(sequence_length).fill(0));
    }
};

const rcnn = new ResponsiveCNN(sequence_length, output_size);

const initialize = async () => {
    initInputSequence();
    if (saved_model === "none" || saved_model === 0) {
        await rcnn.initialize();
    } else {
        const model_file = path.join(saved_model, 'model.json');
        await rcnn.initializeFromFile('file://' + model_file);
    }
};

const handlers = {
    addTrainingExample: (...max_input) => {
        const target = max_input.slice(0,output_size);
        const max_note_list = max_input.slice(output_size);
        const output = m4l.m4lListToTensor(max_note_list, [0, 127], sequence_length);
        max_api.post(max_note_list);
        max_api.post(output);
        note_sequences.push(output);
        for (let i = 0; i < sequence_length; i++) targets.push(target);
    },

    clearTrainingExamples: () => {
        note_sequences.length = 0;
        targets.length = 0;
    },

    trainModel: epochs => {
        max_api.outlet("training");

        const lossLogger = async (epoch, logs) => {
            const val_loss = logs.val_loss;
            const loss = logs.loss;

            max_api.outlet(["loss", loss]);
            max_api.outlet(["val_loss", val_loss]);
            max_api.outlet(["epoch", epoch]);
        };

        try {
            const X = tf.concat(note_sequences, 0).expandDims(1);
            const y = tf.tensor(targets);
            rcnn.train(X, y, epochs, lossLogger)
                .then(() => max_api.outlet("trained"))
                .catch(msg => {
                    max_api.outlet("training_error")
                    console.log(msg);
                });
        } catch (e) {
            max_api.outlet("training_error");
        }

    },

    predict: () => {
        const x = tf.tensor(input_sequence).expandDims(0).expandDims(1);
        rcnn.predict(x).then(y => max_api.outlet(["prediction", ...y.arraySync()[0]]));
    },

    receivedNotes: (...max_input) => {
        let time_step = max_input[0];
        let notes = max_input.slice(1);

        for (let i = 0; i < 128; i++) {
            input_sequence[i][time_step] = 0;
        }

        for (let note of notes) {
            if (note != -1) {
                input_sequence[note][time_step] = 1;
            }
        }
    },

    saveModel: directory => {
        rcnn.saveModel('file:///' + directory)
            .then(() => max_api.outlet(["model_saved", directory]));
    },

    loadModel: directory => {
        if (directory === 0) return;
        const model_file = path.join(directory, 'model.json');

        rcnn.initializeFromFile('file://' + model_file)
            .then(() => {
                max_api.outlet(["model_loaded", directory]);
            });
    },

    createNewModel: () => {
        rcnn.initialize();
        max_api.post("model_created");
    },
}

max_api.addHandlers(handlers);

initialize().then(() => max_api.outlet("initialized"));
