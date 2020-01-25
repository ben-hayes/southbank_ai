var write_pointer = 0;
var notes = initNotes(16);

function addNote () {
    var note = arrayfromargs(arguments);

    var position = note[0];
    var pitch = note[1];

    if (write_pointer != position) {
        write_pointer = position;
        notes[write_pointer] = [];
    }

    if (pitch != -1) {
        notes[write_pointer].push(pitch);
    }

    dumpNotes();
}

function initNotes(length) {
    var notes = [];
    for (var i = 0; i < length; i++) {
        notes.push([]);
    }
    return notes;
}

function dumpNotes() {
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].length > 0) {
            outlet(0, i, notes[i]);
        } else {
            outlet(0, i, -1);
        }
    }
}
