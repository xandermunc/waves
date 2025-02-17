if (navigator.permissions) {
    navigator.permissions.query({ name: 'midi', sysex: false }).then(result => {
        console.log(`MIDI permission state: ${result.state}`);
        if (result.state === 'granted' || result.state === 'prompt') {
            requestMIDIAccess();
        } else {
            console.error("MIDI access permission denied.");
        }
    }).catch(err => {
        console.error("Error querying MIDI permissions:", err);
        requestMIDIAccess();
    });
} else {
    requestMIDIAccess();
}

function requestMIDIAccess() {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    } else {
        console.error("Web MIDI API is not supported in this browser.");
    }
}

function onMIDISuccess(midiAccess) {
    console.log("MIDI Access Object", midiAccess);
    for (let input of midiAccess.inputs.values()) {
        console.log(`MIDI input device: ${input.name}`);
        input.onmidimessage = getMIDIMessage;
    }
}

function onMIDIFailure() {
    console.error("Could not access your MIDI devices.");
}

function getMIDIMessage(midiMessage) {
    console.clear();
    console.log("MIDI message received:", midiMessage);
    const [command, note, velocity] = midiMessage.data;
    console.log(`Command: ${command}, Note: ${note}, Velocity: ${velocity}`);
}