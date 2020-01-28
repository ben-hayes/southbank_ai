const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node-gpu');

class ResponsiveCNN {
    constructor (input_shape, output_size) {
        this.config = {
            inputShape: input_shape || [127, 32, 1],
            outputSize: output_size || 4,
        }
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
            inputShape: this.config.inputShape,
            kernelSize: [this.config.inputShape[0], 4],
            filters: 8,
            strides: 1,
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
}

module.exports = ResponsiveCNN;
