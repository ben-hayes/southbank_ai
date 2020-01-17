const path = require("path");

const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");

const model = require("@ben-hayes/magenta-music/node/music_vae");
const core = require("@ben-hayes/magenta-music/node/core");
const max_api = require("max-api");
const m4l_tools = require("./m4l_tools.js");

const SEQUENCE_LENGTH = 32;
const STEPS_PER_QUARTER = 4;
const DEFAULT_VELOCITY = 100;
const DEFAULT_MUTED = 0;

// Node globals hackery
const globalAny = global;
globalAny.performance = Date;
globalAny.fetch = require("./fetch_hack.js");

const music_vae = new model.MusicVAE(
    //"https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_med_lokl_q2"
    "file://Users/benhayes/code/purcell_room_sessions/southbank_ai/checkpoints/cat-mel_2bar_big/"
);

const midi_me = new model.MidiMe({epochs: 100, input_size: 512, latent_size: 4});

const training_sequences = [];

const initialize = async () => {
    max_api.addHandlers(handlers);
    await music_vae.initialize();
    await midi_me.initialize();
};

const handlers = {
    saveModel: directory => {
        const encoder_directory = path.join(directory, 'encoder');
        const decoder_directory = path.join(directory, 'decoder');

        midi_me.saveModel(
            'file://' + encoder_directory,
            'file://' + decoder_directory)
            .then(() => max_api.outlet("model_saved"));
    },

    loadModel: directory => {
        const encoder_model = path.join(directory, 'encoder', 'model.json');
        const decoder_model = path.join(directory, 'decoder', 'model.json');

        midi_me.initializeFromFile(
            'file://' + encoder_model,
            'file://' + decoder_model,
            true)
            .then(() => max_api.outlet("model_loaded"));
    },

    newModel: () => {
        midi_me.initialize(true);
        max_api.outlet("model_created");
    },

    clearTrainingSequences: () => {
        training_sequences.length = 0;
    },

    addTrainingSequence: (...max_note_list) => {
        const note_sequence =
            m4l_tools.m4lListToQuantizedMagentaNoteSequence(max_note_list);
        training_sequences.push(note_sequence);
        max_api.post(training_sequences);
    },

    train: epochs => {
        if (epochs != undefined) {
            midi_me.config.epochs = epochs;
        }

        max_api.outlet("training");
        music_vae.encode(training_sequences)
            .then(z => midi_me.train(z))
            .then(() => max_api.outlet("trained"))
            .catch(() => max_api.outlet("training_error"));
    },

    decode: (...z_in) => {
        max_api.outlet("decoding");
        const z_midime = tf.tensor([z_in]);
        midi_me.decode(z_midime)
            .then(z_musicvae => music_vae.decode(z_musicvae))
            .then(y => m4l_tools.outputNoteSequence(y[0].notes, {prefix: "decoded"}));
    },

    encode: (...max_note_list) => {
        const note_sequence =
            m4l_tools.m4lListToQuantizedMagentaNoteSequence(max_note_list);
        music_vae.encode([note_sequence])
            .then(z_musicvae => midi_me.encode(z_musicvae))
            .then(z_midime => {
                const z_arr = z_midime.arraySync()[0];
                max_api.outlet(["encoded"].concat(z_arr));
            });
    },
};

initialize().then(() => max_api.outlet("initialized"));
