const max_api = require("max-api");

const DEFAULT_VELOCITY = 100;
const DEFAULT_MUTED = 0;

function m4lListToQuantizedMagentaNoteSequence(
    max_note_list,
    sequence_length = 32,
    quarters_per_minute = 120,
    steps_per_quarter = 4) {
    
    const num_notes = max_note_list.length / 5;

    const note_sequence = {
        notes: [],
        quantizationInfo: {stepsPerQuarter: steps_per_quarter},
        tempos: [{quarters_per_minute: quarters_per_minute, time: 0}],
        totalQuantizedSteps: sequence_length,
    };

    for (let i = 0; i < num_notes; i++) {
        const midi_note = max_note_list[i * 5] + 0;
        const note_start = max_note_list[i * 5 + 1] * steps_per_quarter;
        const note_end =
            note_start + max_note_list[i * 5 + 2] * steps_per_quarter;

        const note = {
            pitch: midi_note,
            quantizedStartStep: note_start,
            quantizedEndStep: note_end
        };

        note_sequence.notes.push(note);
    }

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

module.exports = {m4lListToQuantizedMagentaNoteSequence, outputNoteSequence};
