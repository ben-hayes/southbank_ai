const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

const fs = require('fs');

function loadData(data_file) {
    return JSON.parse(fs.readFileSync(data_file));
}

function makeModel(output_size) {
    const model = tf.sequential();

    const SEQUENCE_LENGTH = 16;
    const SEQUENCE_HEIGHT = 3;

    model.add(tf.layers.conv2d({
        inputShape: [SEQUENCE_HEIGHT, SEQUENCE_LENGTH, 1],
        kernelSize: [SEQUENCE_HEIGHT, 4],
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
        units: output_size,
        kernelInitializer: 'randomUniform',
        activation: 'softmax',
    }));

    const optimiser = tf.train.adam();
    model.compile({
        optimizer: optimiser,
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy'],
    });

    return model;
}

const {beats, labels} = loadData("drum_beats.json");
const output_size = Math.max(...labels) + 1;

const X = tf.tensor(beats).expandDims(3);
const Y = tf.oneHot(tf.tensor(labels).asType('int32'), output_size);

const model = makeModel(output_size);
model.summary();

model.fit(X, Y, {epochs: 1000, shuffle: true});
