const path = require ("path");

const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");

const model = require("@ben-hayes/magenta-music/node/music_vae");
const core = require("@ben-hayes/magenta-music/node/core");
const max_api = require("max-api");

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

const initialize = async () => {
    max_api.addHandlers (handlers);
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
};

initialize().then(() => max_api.outlet("initialized"));
