const max_api = require('max-api');
const m4l = require('./m4l_tools.js');
const ResponsiveCNN = require('./responsive_cnn.js');

const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node-gpu');

//for now... const note_range = [0, 127]; // DEFAULT
const note_range = [60, 64];
const note_height = () => note_range[1] - note_range[0] + 1;
let sequence_length = 16;

const note_sequences = [];
const targets = [];

const input_sequence = [];
const initInputSequence = () => {
    input_sequence.length = 0;
    for (let i = 0; i < note_height(); i++) {
        input_sequence.push(Array(sequence_length).fill(0));
    }
};

const rcnn = new ResponsiveCNN();

const initialize = async () => {
    initInputSequence();
    rcnn.config.inputShape[0] = note_height();
    rcnn.config.inputShape[1] = sequence_length;
    await rcnn.initialize();
};

const handlers = {
    addTrainingExample: (...max_input) => {
        const target = max_input.slice(0,4);
        const max_note_list = max_input.slice(4);
        const output = m4l.m4lListToTensor(max_note_list, note_range, sequence_length);

        note_sequences.push(output);
        for (let i = 0; i < sequence_length; i++) targets.push(target);
    },

    clearTrainingExamples: () => {
        note_sequences.length = 0;
        targets.length = 0;
    },

    trainModel: () => {
        const X = tf.concat(note_sequences, axis=0).expandDims(3);
        const y = tf.tensor(targets);

        max_api.post(X); 
        rcnn.train(X, y);
    },

    predict: () => {
        const x = tf.tensor(input_sequence).expandDims(0).expandDims(3);
        rcnn.predict(x).then(y => max_api.outlet(y.arraySync()[0]));
    },

    setNoteRange: (lo, hi) => {
        note_range[0] = lo;
        note_range[1] = hi;

        if (hi > lo) {
            initInputSequence();
            initialize();
        }
    },

    receivedNotes: (...max_input) => {
        let time_step = max_input[0];
        let notes = max_input.slice(1);

        for (let i = 0; i < note_height(); i++) {
            input_sequence[i][time_step] = 0;
        }

        for (let note of notes) {
            if (note != -1 && note >= note_range[0] && note <= note_range[1]) {
                input_sequence[note - note_range[0]][time_step] = 1;
            }
        }
    },

    dumpReceived: () => {
        max_api.post(note_height());
        max_api.post(input_sequence);
    },
}

max_api.addHandlers(handlers);

initialize().then(() => max_api.post("initialized"));
