let keys = [];
let activeNotesArturia = new Set();

let keyWidth = 30;
let keyHeight = 120;
let spacing = keyWidth / 2;
let octaves = 4;
let notesToRemoveFromStart = 5;
let notesToRemoveFromEnd = 11;

function setup() {
    const canvas = createCanvas(keyWidth * 19, keyHeight);
    canvas.parent('arturia');
    for (let i = notesToRemoveFromStart; i < (octaves * 12) - notesToRemoveFromEnd; i++) {
        let y = 0;
        x = (i % 12) * spacing + Math.floor(i / 12) * 7 * keyWidth - notesToRemoveFromStart * keyWidth + spacing * 4;
        let w = keyWidth;
        let h = keyHeight;
        if ([1, 3, 6, 8, 10].includes(i % 12)) {
            w = keyWidth / 3 * 2;
            x = keyWidth / 3 * 2 + (i % 12 - 1) * spacing + Math.floor(i / 12) * 7 * keyWidth - notesToRemoveFromStart * keyWidth + spacing * 4;
            h = keyHeight / 5 * 3;
        }
        if ((i % 12) > 4 || (i % 12) === 11) {
            x += spacing;
        }
        keys.push(new Key(x, y, w, h, i));
    }
    setupMIDI();
}

function draw() {
    background(255);
    for (let key of keys) {
        if (![1, 3, 6, 8, 10].includes(key.note % 12)) {
            key.show();
        }
    }
    for (let key of keys) {
        if ([1, 3, 6, 8, 10].includes(key.note % 12)) {
            key.show();
        }
    }
}

class Key {
    constructor(x, y, w, h, note) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.note = note;
    }

    show() {
        if (activeNotesArturia.has(this.note)) {
            fill('var(--blue)');
        } else if ([1, 3, 6, 8, 10].includes(this.note % 12)) {
            fill('#111'); 
        } else {
            fill('#111');
        }
        stroke(255);
        strokeWeight(2);
        rect(this.x, this.y, this.w, this.h);
    }
}

function setupMIDI() {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    } else {
        console.error("Web MIDI API not supported in this browser.");
    }
}

function onMIDISuccess(midiAccess) {
    for (let input of midiAccess.inputs.values()) {
        input.onmidimessage = getMIDIMessage;
    }
}

function onMIDIFailure() {
    console.error("Could not access your MIDI devices.");
}

function getMIDIMessage(message) {
    const [command, note, velocity] = message.data;
    const adjustedNote = note - 48;
    if (command === 147 && velocity > 0) {
        activeNotesArturia.add(adjustedNote);
    } else if (command === 131 || (command === 147 && velocity === 0)) {
        activeNotesArturia.delete(adjustedNote);
    }

    console.log(`Active Notes: ${Array.from(activeNotesArturia)}`);
}