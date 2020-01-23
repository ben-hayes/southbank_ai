const path = require("path");

const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node-gpu");

const model = require("@ben-hayes/magenta-music/node/music_vae");
const core = require("@ben-hayes/magenta-music/node/core");
const max_api = require("max-api");
const m4l_tools = require("./m4l_tools.js");

const alert = require("alert-node");

const SEQUENCE_LENGTH = 32;
const STEPS_PER_QUARTER = 4;
const DEFAULT_VELOCITY = 100;
const DEFAULT_MUTED = 0;

const DEFAULT_CHECKPOINT = //"file:///Users/benhayes/code/southbank_ai/checkpoints/cat-mel_2bar_big/";
    "https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_chords";

// Node globals hackery
const globalAny = global;
globalAny.performance = Date;
globalAny.fetch = require("./fetch_hack.js");

let music_vae = new model.MusicVAE();

let midi_me = new model.MidiMe({latent_size: 4});

const training_sequences = [];
const chords = [];

const currentVAEIsChordModel = () => {
    return music_vae.spec.chordEncoder !== undefined;
};

const updateChordStatus = () => {
    let chord_status = currentVAEIsChordModel() ? "on" : "off";
    max_api.outlet(["chord_status", chord_status]);
};

const checkZDimensions = () => {
    let zDims = music_vae.encoder.zDims;

    if (midi_me.config.input_size != zDims) {
        alert("Z-dimension mismatch. The loaded model will not work with this checkpoint");
        max_api.outlet("z_dimension_mismatch");
    }
};

const initialize = async () => {
    const midi_me_saved_model = process.argv[2];
    const music_vae_checkpoint = process.argv[3];

    if (music_vae_checkpoint === "none") {
        music_vae.checkpointURL = DEFAULT_CHECKPOINT;
    } else {
        music_vae.checkpointURL = "file://" + music_vae_checkpoint;
    }

    await music_vae.initialize();

    updateChordStatus();

    let zDims = music_vae.encoder.zDims;

    midi_me.config.input_size = zDims;

    if (midi_me_saved_model === "none") {
        await midi_me.initialize();
    } else {
        await midi_me.initializeFromFile(
            "file://" 
                + path.join(midi_me_saved_model, 'encoder', 'model.json'),
            "file://" 
                + path.join(midi_me_saved_model, 'decoder', 'model.json'));
    }
};

const handlers = {
    setCheckpoint: directory => {
        music_vae = new model.MusicVAE();
        music_vae.checkpointURL = "file://" + directory;
        music_vae.initialize().then(() => {
            updateChordStatus();
            checkZDimensions();
            max_api.outlet(["checkpoint_set", directory]);
            max_api.outlet("initialized");
        });
    },

    saveModel: directory => {
        const encoder_directory = path.join(directory, 'encoder');
        const decoder_directory = path.join(directory, 'decoder');

        midi_me.saveModel(
            'file://' + encoder_directory,
            'file://' + decoder_directory)
            .then(() => max_api.outlet(["model_saved", directory]));
    },

    setChords: chord_string => {
        chords.length = 0;

        if (chord_string === "no_chords") return;

        chord_string.split(" ").forEach(c => chords.push(c));
        console.log(chords);
    },

    loadModel: directory => {
        if (directory === 0) return;
        const encoder_model = path.join(directory, 'encoder', 'model.json');
        const decoder_model = path.join(directory, 'decoder', 'model.json');

        midi_me.initializeFromFile(
            'file://' + encoder_model,
            'file://' + decoder_model,
            true)
            .then(() => {
                max_api.outlet(["model_loaded", directory]);
                checkZDimensions();
            });
    },

    newModel: () => {
        let zDims = music_vae.encoder.zDims;
        midi_me = new model.MidiMe({epochs: 100, input_size: zDims, latent_size: 4});

        midi_me.initialize();
        max_api.outlet("model_created");
    },

    clearTrainingSequences: () => {
        training_sequences.length = 0;
    },

    addTrainingSequence: (...max_note_list) => {
        const note_sequence =
            m4l_tools.m4lListToQuantizedMagentaNoteSequence(max_note_list);
        training_sequences.push(note_sequence);
    },

    train: epochs => {
        if (epochs != undefined) {
            midi_me.config.epochs = epochs;
        }

        max_api.outlet("training");
        music_vae.encode(training_sequences, currentVAEIsChordModel() ? chords : undefined)
            .then(z => midi_me.train(z))
            .then(() => max_api.outlet("trained"))
            .catch(err => {
                max_api.outlet("training_error");
                max_api.post(err);
                console.log(err);
            });
    },

    decode: (...z_in) => {
        max_api.outlet("decoding");
        const z_midime = tf.tensor([z_in]);
        midi_me.decode(z_midime)
            .then(z_musicvae => music_vae.decode(
                z_musicvae,
                undefined,
                currentVAEIsChordModel() ? chords : undefined))
            .then(y => m4l_tools.outputNoteSequence(y[0].notes, {prefix: "decoded"}))
            .catch(err => {
                max_api.outlet("decoding_error")
                console.log(err)
            });
    },

    encode: (...max_note_list) => {
        const note_sequence =
            m4l_tools.m4lListToQuantizedMagentaNoteSequence(max_note_list);
        music_vae.encode([note_sequence], currentVAEIsChordModel() ? chords : undefined)
            .then(z_musicvae => midi_me.encode(z_musicvae))
            .then(z_midime => {
                const z_arr = z_midime.arraySync()[0];
                max_api.outlet(["encoded"].concat(z_arr));
            });
    },
};

max_api.addHandlers(handlers);

initialize().then(() => max_api.outlet("initialized"));
