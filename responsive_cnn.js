const path = require("path");
const fs = require("fs");
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node-gpu');

class ResponsiveCNN {
    constructor ([lowest_note, highest_note], sequence_length, output_size) {
        this.config = {};
        this.config.noteRange = [lowest_note || 0, highest_note || 127];

        if (lowest_note !== undefined && highest_note !== undefined) {
            this.config.noteHeight = highest_note - lowest_note + 1;
        } else {
            this.config.noteHeight = 127;
        }
        this.config.sequenceLength = sequence_length || 16;

        this.config.inputShape = [
            this.config.noteHeight,
            this.config.sequenceLength,
            1];
        this.config.outputSize = output_size || 4;
    }

    async initialize () {
        this.model = this.getModel();
    }

    train (X, y, epochs=100) {
        this.model.fit(X, y, {epochs: epochs, shuffle: true});
    }

    async predict (x) {
        return this.model.predict(x);
    }

    getModel () {
        const model = tf.sequential();
        model.add(tf.layers.conv2d({
//            inputShape: this.config.inputShape,
            inputShape: [128, 16, 1],
            kernelSize: [16, 4],
            filters: 8,
            strides: [8, 2],
            activation: 'relu',
            kernelInitializer: 'randomUniform',
        }));

        model.add(tf.layers.maxPooling2d({
            poolSize: [4, 4],
            strides: [4, 4],
        }));

        model.add(tf.layers.flatten());

        model.add(tf.layers.dense({
            units: 127,
            kernelInitializer: 'randomUniform',
            activation: 'linear',
        }));

        model.add(tf.layers.dense({
            units: this.config.outputSize,
            kernelInitializer: 'randomUniform',
            activation: 'linear',
        }));

        const optimiser = tf.train.adam();
        model.compile({
            optimizer: optimiser,
            loss: 'meanSquaredError',
        });

        return model;
    }

    async saveModel (file_path) {
        await this.model.save(file_path);
        fs.writeFileSync(
            path.join(file_path, "model_config.json"),
            JSON.stringify(this.config));
    }

    static async loadModel (file_path) {
        const model = await tf.loadLayersModel(file_path);
        const config_raw =
            await fs.readFile(path.join(file_path, "model_config.json"));
        const config = JSON.parse(config_raw);
        const loadedCNN = new ResponsiveCNN();

        loadedCNN.config = config;
        loadedCNN.model = model;

        return loadedCNN;
    }
}

module.exports = ResponsiveCNN;
