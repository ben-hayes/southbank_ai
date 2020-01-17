Error.stackTraceLimit = Infinity;

const model = require("@ben-hayes/magenta-music/node/music_vae");

const tf = require("@tensorflow/tfjs");
//require("@tensorflow/tfjs-node");

//const core = require("@ben-hayes/magenta-music/node/core");

const globalAny = global;
globalAny.performance = Date;
globalAny.fetch = require("./fetch_hack.js");

const music_vae = new model.MusicVAE("https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_chords");

let doStuff = async () => {
    await music_vae.initialize()
    const z = tf.randomNormal([1, 128]);
    const chords = ["Cm"];

    let y = await music_vae.decode(z, undefined, chords);
    console.log(y);
    for (const note of y[0].notes) {
        console.log(note);
    }
};

doStuff().then(() => console.log("done"));
