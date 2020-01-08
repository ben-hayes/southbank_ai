const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");

const model = require("@magenta/music/node/music_vae");
const core = require("@magenta/music/node/core");
const max_api = require("max-api");

const STEPS_PER_QUARTER = 4;
const SEQUENCE_LENGTH = 32;
const DEFAULT_VELOCITY = 100;
const DEFAULT_MUTED = 0;

// Magenta Node hackery:
const globalAny = global;
globalAny.performance = Date;
globalAny.fetch = require("./fetch_hack.js");

//max_api.outlet ("loading");

const music_vae = new model.MusicVAE(
    //"https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_med_lokl_q2"
    "file://Users/benhayes/code/purcell_room_sessions/southbank_ai/checkpoints/cat-mel_2bar_big/"
);

const midi_me = new model.MidiMe({epochs: 100, input_size: 512, latent_size: 4});

music_vae
    .initialize()
    .then(() => midi_me.initialize())
    .then(() => initializeMax());

const note_sequence = {
    notes: [],
    quantizationInfo: {stepsPerQuarter: STEPS_PER_QUARTER},
    tempos: [{qpm: 120, time: 0}],
    totalQuantizedSteps: SEQUENCE_LENGTH
};

const handlers = {
    notes_changed: (num_notes, ...max_note_list) => {
        note_sequence.notes = makeNoteSequence(num_notes, max_note_list);
    },

    train: () => {
        max_api.outlet("training");
        const note_sequences = core.sequences.split(note_sequence, SEQUENCE_LENGTH);
        music_vae
            .encode(note_sequences)
            .then(z => {
                midi_me
                    .train(z)
                    .then(() => {
                        max_api.outlet("trained");
                    })
                    .catch(msg => console.log(msg));
            })
            .catch(msg => console.log(msg));
    },

    decode: (...z_in) => {
        max_api.outlet("decoding");
        const z = tf.tensor([z_in]);
        midi_me.decode(z)
            .then(z_2 => music_vae.decode(z_2))
            .then(y => {
                outputNoteSequence(y[0].notes);
                max_api.outlet("decoded"); 
            }).catch(msg => console.log(msg));
    }
};

function makeNoteSequence(num_notes, max_note_list) {
    let notes = [];

    for (let i = 0; i < num_notes; i++) {
        const midi_note = max_note_list[i * 5] + 0;
        const note_start = max_note_list[i * 5 + 1] * STEPS_PER_QUARTER;
        const note_end = note_start + max_note_list[i * 5 + 2] * STEPS_PER_QUARTER;

        const note = {
            pitch: midi_note,
            quantizedStartStep: note_start,
            quantizedEndStep: note_end
        };

        notes.push(note);
    }

    return notes;
}

function outputNoteSequence(notes) {
    max_api.outlet(["notes", notes.length]);
    for (const note of notes) {
        const midi_note = note.pitch;
        const note_start = 1.0 * note.quantizedStartStep / STEPS_PER_QUARTER;
        const note_length = 1.0 * note.quantizedEndStep / STEPS_PER_QUARTER - note_start;

        max_api.outlet([
            "note",
            midi_note,
            note_start,
            note_length,
            DEFAULT_VELOCITY,
            DEFAULT_MUTED
        ]);
    }
    max_api.outlet("done");
}

function initializeMax() {
    max_api.addHandlers(handlers);
    max_api.outlet("model_initialized");
}
