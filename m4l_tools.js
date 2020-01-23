const max_api = require("max-api");
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node-gpu');

const DEFAULT_VELOCITY = 100;
const DEFAULT_MUTED = 0;

function m4lListToQuantizedMagentaNoteSequence(
    max_note_list,
    sequence_length = 32,
    quarters_per_minute = 120,
    steps_per_quarter = 4) {
    
    const note_sequence = {
        notes: m4lListToNoteList(max_note_list, steps_per_quarter),
        quantizationInfo: {stepsPerQuarter: steps_per_quarter},
        tempos: [{quarters_per_minute: quarters_per_minute, time: 0}],
        totalQuantizedSteps: sequence_length,
    };

    return note_sequence;
}

function outputNoteSequence(notes, {steps_per_quarter = 4, prefix}) {
    const p = (msg) => prefix != undefined ? [prefix].concat(msg) : msg;

    max_api.outlet(p(["notes", notes.length]));
    for (const note of notes) {
        const midi_note = note.pitch;
        const note_start = 1.0 * note.quantizedStartStep / steps_per_quarter;
        const note_length =
            1.0 * note.quantizedEndStep / steps_per_quarter - note_start;

        max_api.outlet(p([
            "note",
            midi_note,
            note_start,
            note_length,
            DEFAULT_VELOCITY,
            DEFAULT_MUTED
        ]));
    }
    max_api.outlet(p(["done"]));
}

function m4lListToTensor(
    max_note_list,
    note_range=[0, 127],
    sequence_length=32,
    steps_per_quarter=4) {

    const notes = m4lListToNoteList(max_note_list, steps_per_quarter);

    const height = note_range[1] - note_range[0];

    const output = tf
        .zeros([height, sequence_length])
        .bufferSync();

    for (let note of notes) {
        if (note.pitch < note_range[0] || note_range[1] < note.pitch) {
            continue;
        }

        const pitch_index = note.pitch - note_range[0];
        max_api.post("pitch: " + pitch_index + "; start: " + note.quantizedStartStep);
        output.set(1, pitch_index, note.quantizedStartStep);
    }

    return allRotations (output.toTensor());
}

function m4lListToNoteList(
    max_note_list,
    steps_per_quarter=4) {

    const num_notes = max_note_list.length / 5;

    const notes = [];

    for (let i = 0; i < num_notes; i++) {
        const midi_note = max_note_list[i * 5];
        const note_start = max_note_list[i * 5 + 1] * steps_per_quarter;
        const note_end =
            note_start + max_note_list[i * 5 + 2] * steps_per_quarter;

        const note = {
            pitch: midi_note,
            quantizedStartStep: note_start,
            quantizedEndStep: note_end
        };

        notes.push(note);
    }

    return notes;
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

module.exports = {m4lListToQuantizedMagentaNoteSequence, outputNoteSequence, m4lListToTensor};
