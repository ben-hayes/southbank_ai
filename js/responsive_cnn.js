const path = require("path");
const fs = require("fs");
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node-gpu');

class ResponsiveCNN {
    constructor (sequence_length, output_size) {
        this.config = {
            inputShape: [1, 128, sequence_length || 16],
            outputSize: output_size || 4,
            sequenceLength: sequence_length || 16,
        };
    }

    async initialize () {
        this.model = this.getModel();
    }

    async train (X, y, epochs=100, lossLogger) {
        let callbacks;
        if (lossLogger !== undefined) {
            callbacks = {
                onEpochEnd: lossLogger,
            };
        }
        await this.model.fit(
            X,
            y,
            {
                epochs: epochs,
                shuffle: true,
                validationSplit: 0.1,
                callbacks: callbacks,
            },
        );
    }

    async predict (x) {
        return this.model.predict(x);
    }

    getModel () {
        const model = tf.sequential();
        model.add(tf.layers.conv2d({
            inputShape: this.config.inputShape,
            kernelSize: [128, 5],
            filters: 16,
            padding: 'same',
            strides: [128, 1],
            activation: 'relu',
            kernelInitializer: 'randomUniform',
        }));

        model.add(tf.layers.maxPooling2d({
            poolSize: [1, 2],
            strides: [1, 2],
        }));

        model.add(tf.layers.conv2d({
            kernelSize: [1, 3],
            filters: 8,
            padding: 'same',
            strides: [1, 1],
            activation: 'relu',
            kernelInitializer: 'randomUniform',
        }));

        model.add(tf.layers.maxPooling2d({
            poolSize: [1, 2],
            strides: [1, 2],
        }));

        model.add(tf.layers.flatten());

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
    }

    async initializeFromFile (file_path) {
        this.model = await tf.loadLayersModel(file_path);
    }
}

module.exports = ResponsiveCNN;
