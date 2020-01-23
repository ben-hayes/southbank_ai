const max_api = require('max-api');
const m4l = require('./m4l_tools.js');
const ResponsiveCNN = require('./responsive_cnn.js');

const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node-gpu');

//for now... const note_range = [0, 127]; // DEFAULT
const note_range = [60, 64];
let sequence_length = 32;

const note_sequences = [];
const targets = [];

const rcnn = new ResponsiveCNN();

const initialize = async () => {
    rcnn.config.inputShape[0] = note_range[1] - note_range[0];
    await rcnn.initialize();
};

const handlers = {
    addTrainingExample: (...max_input) => {
        const target = max_input.slice(0,4);
        const max_note_list = max_input.slice(4);
        const output = m4l.m4lListToTensor(max_note_list, note_range);

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

    setNoteRange: (lo, hi) => {
        note_range[0] = lo;
        note_range[1] = hi;
    },
}

max_api.addHandlers(handlers);

initialize().then(() => max_api.post("initialized"));
