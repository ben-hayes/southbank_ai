const path = require("path");

const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node-gpu");

const model = require("@ben-hayes/magenta-music/node/music_vae");
const core = require("@ben-hayes/magenta-music/node/core");
const max_api = require("max-api");
const m4l_tools = require("./m4l_tools.js");

const alert = require("alert-node");

const DEFAULT_SEQUENCE_LENGTH = 32;
const STEPS_PER_QUARTER = 4;
const DEFAULT_VELOCITY = 100;
const DEFAULT_MUTED = 0;
const DEFAULT_BETA = 1;
const LCD_WIDTH = 162;
const LCD_HEIGHT = 162;
const LCD_MARGIN = 8;

let beta = DEFAULT_BETA;
let seq_length = DEFAULT_SEQUENCE_LENGTH;

const latent_size = parseInt(process.argv[4]);

const DEFAULT_CHECKPOINT = //"file:///Users/benhayes/code/southbank_ai/checkpoints/cat-mel_2bar_big/";
    "https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_chords";

// Node globals hackery
const globalAny = global;
globalAny.performance = Date;
globalAny.fetch = require("./fetch_hack.js");

let music_vae = new model.MusicVAE();

let midi_me = new model.MidiMe({latent_size: latent_size, beta: beta});

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

const setSequenceLength = () => {
    seq_length = music_vae.dataConverter.numSteps;
};

const gaussianPdf = (x, mu, sig) => {
    const frac = 1 / (Math.sqrt(2 * Math.PI) * sig);
    const exp = Math.exp((-1 / 2) * Math.pow((x - mu) / sig, 2));
    return frac * exp;
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
        max_api.outlet(["model_loaded", midi_me_saved_model]);
    }
};

const handlers = {
    setCheckpoint: directory => {
        music_vae = new model.MusicVAE();
        music_vae.checkpointURL = "file://" + directory;
        music_vae.initialize().then(() => {
            updateChordStatus();
            checkZDimensions();
            setSequenceLength();
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
        midi_me = new model.MidiMe({
            epochs: 100,
            input_size: zDims,
            latent_size: latent_size,
            beta: beta,
        });

        midi_me.initialize();
        max_api.outlet("model_created");
    },

    clearTrainingSequences: () => {
        training_sequences.length = 0;
    },

    addTrainingSequence: (...max_note_list) => {
        const note_sequence =
            m4l_tools.m4lListToQuantizedMagentaNoteSequence(
                max_note_list,
                seq_length);
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
            m4l_tools.m4lListToQuantizedMagentaNoteSequence(
                max_note_list,
                seq_length);
        music_vae.encode([note_sequence], currentVAEIsChordModel() ? chords : undefined)
            .then(z_musicvae => midi_me.encodeDist(z_musicvae))
            .then(([mu,  ]) => {
                const z_arr = mu.arraySync()[0];
                max_api.outlet(["encoded"].concat(z_arr));
            });
    },

    paintZDist: () => {
        music_vae.encode(training_sequences, currentVAEIsChordModel() ? chords : undefined)
            .then(z => midi_me.encodeDist(z))
            .then(([mu, sig]) => {
                const n_dists = mu.shape[0];
                const t_buf = tf
                    .zeros([n_dists, LCD_WIDTH, LCD_HEIGHT, 3])
                    .bufferSync();

                const l_mult = (LCD_WIDTH - LCD_MARGIN * 2) / 4;

                const mu_arr = mu.arraySync();
                const sig_arr = sig.arraySync();

                for (let i = 0; i < mu.shape[0]; i++) {
                    const this_mu = mu_arr[i];
                    const this_sig = sig_arr[i];

                    const c = [
                        Math.round(Math.random() * 255),
                        Math.round(Math.random() * 255),
                        Math.round(Math.random() * 255)
                    ];

                    for (let x = 0; x < LCD_WIDTH; x++) {
                        for (let y = 0; y < LCD_HEIGHT; y++) {
                            const x_ = ((x - LCD_MARGIN) / l_mult) - 2;
                            const y_ = ((y - LCD_MARGIN) / l_mult) - 2;
                            const x_gauss = gaussianPdf(x_, this_mu[0], this_sig[0]);
                            const y_gauss = gaussianPdf(y_, this_mu[1], this_sig[1]);

                            const p = x_gauss * y_gauss;
                            
                            for (let n = 0; n < 3; n++) {
                                t_buf.set(p * c[n], i, x, y, n);
                            }
                        }
                    }

                    //max_api.outlet(["gauss_params", ...this_mu, ...this_sig]);
                }
                const t = t_buf.toTensor().mean(0); 
                const max = t.max();
                const output = t.div(max).mul(255).arraySync();

                for (let x = 0; x < LCD_WIDTH; x++) {
                    const row = [];
                    for (let y = 0; y < LCD_HEIGHT; y++) {
                        const c = output[x][y];
                        max_api.outlet(["to_lcd", "setpixel", x, y, c[0], c[1], c[2]]);
                    }
                }
            });
    },

    setBeta: new_beta => {
        beta = new_beta;
    },
};

max_api.addHandlers(handlers);

initialize().then(() => max_api.outlet("initialized"));
