# Humans & Machines @ Southbank Centre

This repository contains the tools developed and used in a residency and performance by Hector Plimmer and Ben Hayes at the Purcell Room at London's Southbank Centre.

The performance is/was (depending on when you read this) focusing on the interaction between humans and so-called AI in a live music setting.

The handful of tools here are designed to allow quick and flexible interaction with a handful of deep learning models from within the context of Ableton Live. In our case, this is to allow us to develop a performance in which we improvise alongside such models.

These tools, and the code behind them, are very experimental and were hacked together alongside conceiving a creative performance. They are _not_ well coded. They're full of bugs and in need of a big refactor (seriously, it's a mess in there). If you want a set of robust in-DAW tools for interacting with compositional AI, look no further than Google's [Magenta Studio](https://github.com/tensorflow/magenta-studio).
However, if you want to have a little more flexibility, get a little more under the hood, produce some unexpected results, and most importantly jam with AI in "realtime", these tools might be for you.

A few acknowledgements are necessary — the core of the deep learning here is Google Magenta's awesome MusicVAE [model](https://magenta.tensorflow.org/music-vae). And furthermore, none of this could have been achieved were it not for their excellent [JS ports](https://magenta.tensorflow.org/js-announce) of their models (a shoutout also to [TensorFlow.js](https://www.tensorflow.org/js)). Also, big gratitude to Cycling '74 for [Node for Max](https://docs.cycling74.com/nodeformax/api/), which indirectly makes GPU accelerated deep learning inside of Ableton Live possible.

## The tools

There are three main components to this suite:

### VAE Subspacer

This loads an instance of MusicVAE, initialised from a checkpoint ([Magenta have a number of pretrained ones here](https://github.com/tensorflow/magenta-js/tree/master/music/checkpoints)). It can then train a second, smaller VAE to reconstruct the MusicVAE latent codes of given training examples, creating an explorable subspace of (hopefully) musically connected ideas.

There are 2-dimensional and 4-dimensional versions, with the 2D one offering pretty visualisations of the training examples projected into its latent space.

It is possible to save and load models — if a model is saved or loaded, this is saved with the Ableton Live set, meaning it is restored when the project is open.

### Sequence Responder

This constructs a simple CNN which learns to predict VAE Subspacer latent codes given a bar of MIDI. Essentially this is a learned translation invariant feature extractor tacked onto a simple linear regression model. In combination with the musical closeness (ideally) of the VAE Subspacer latent space, this generally results in loosely similar input creating loosely similar output, meaning that it's possible to "jam" musical ideas with this system, and play off one another.

The device is designed to work in combination with the MIDI Capture device (described below), and so responds in realtime to incoming streams of MIDI.

### MIDI Capture

This real-time quantises incoming MIDI to 16th notes, and sends it globally throughout the Ableton Live set to the named receiver. This is designed to work with the Sequence Responder for real-time musical interaction.
