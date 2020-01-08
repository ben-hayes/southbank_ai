require ('@tensorflow/tfjs-node');
const model = require ('@magenta/music/node/music_vae');
const core = require ('@magenta/music/node/core');

const globalAny = global;
globalAny.performance = Date;
globalAny.fetch = require('node-fetch');

const music_vae = new model.MusicVAE ('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_med_lokl_q2');

const notes = [
    {pitch: 60, quantizedStartStep: 0, quantizedEndStep: 2},
    {pitch: 62, quantizedStartStep: 2, quantizedEndStep: 4},
    {pitch: 64, quantizedStartStep: 4, quantizedEndStep: 8},
    {pitch: 65, quantizedStartStep: 8, quantizedEndStep: 12},
    {pitch: 70, quantizedStartStep: 12, quantizedEndStep: 18},
    {pitch: 60, quantizedStartStep: 18, quantizedEndStep: 27},
    {pitch: 62, quantizedStartStep: 27, quantizedEndStep: 33},
    {pitch: 64, quantizedStartStep: 33, quantizedEndStep: 41},
    {pitch: 65, quantizedStartStep: 41, quantizedEndStep: 52},
    {pitch: 70, quantizedStartStep: 52, quantizedEndStep: 64},
];

const note_sequence = {
    notes: notes,
    quantizationInfo: {
        stepsPerQuarter: 4
    },
    tempos: [ {qpm: 120, time: 0} ],
    totalQuantizedSteps: 64
};

core.sequences.assertIsQuantizedSequence(note_sequence);

let print_z = z => {
    console.log (z.print ());
};

let decode_z = z => {
    music_vae.decode (z).then (y => {
        console.log (y[0].notes);
    });
};

let encode_z = x => {
    console.log (x);
    music_vae.encode ([x]).then (z => {
        print_z(z);
        decode_z (z);
    }).catch (msg => console.log (msg));
};

music_vae.initialize().then (() => encode_z (note_sequence));
