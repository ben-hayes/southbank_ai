const max_api = require('max-api');
const fs = require ('fs');

const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

const DATA_STORE = 'drum_beats.json';

const handlers = {
    add_beat: (label, ...notes) => {
        const notes_as_tensor = maxNotesToTensor(sliceArray(notes, 3));
        const all_rotations = allRotations(notes_as_tensor);
        const labels = makeLabels (label, all_rotations.shape[0]);
        writeDataToFile(all_rotations.arraySync(), labels);
    }
};

function maxNotesToTensor(notes) {
    const buffer = tf.zeros([3, 16]).bufferSync();

    for (const note of notes) {
        const sound = note[0];
        const time_in_semis = note[1] * 4;
        buffer.set(1, sound, time_in_semis);
    }

    return buffer.toTensor();
}

function allRotations(sequence) {
    const n_rotations = sequence.shape[1];
    const rotations = [];

    let last = sequence;
    for (let n = 0; n < n_rotations; n++) {
        const first_column = last.slice([0,0], [last.shape[0],1]);
        const the_rest = last.slice([0,1], [last.shape[0], last.shape[1] - 1]);

        last = tf.concat ([the_rest, first_column], 1);
        rotations.push (last);
    }

    return tf.stack (rotations);
}

function sliceArray(arr, size) {
    if (arr.length < size) return arr;

    const output = [];

    for (let n = 0; n < arr.length / size; n++) {
        output.push(arr.slice(n * size, n * size + size));
    }

    return output;
}

function makeLabels(label, number) {
    return Array(number).fill(label);
}

function writeDataToFile(beats, labels) {
    let existing_data;

    try {
        const existing_raw_data = fs.readFileSync(DATA_STORE);
        existing_data = JSON.parse (existing_raw_data);
    } catch (e) {
        if (e.code == 'ENOENT') {
            existing_data = {
                beats: [],
                labels: [],
            };
        }
    }
    console.log (existing_data.beats);

    const all_beats = existing_data.beats;
    const all_labels = existing_data.labels;
    all_beats.push (...beats);
    all_labels.push (...labels);
    const new_data = { beats: all_beats, labels: all_labels };

    fs.writeFileSync(DATA_STORE, JSON.stringify(new_data));
}

max_api.addHandlers(handlers);
