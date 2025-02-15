let audioContext;
const oscillators = {}; 
const gainNodes = {}; 
let masterGainNode; 
const maxNotes = 8; 

document.getElementById('startButton').addEventListener('click', () => {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    document.getElementById('startButton').disabled = true; 
    initializeMIDI();
    setupMasterGain();
});

function setupMasterGain() {
    masterGainNode = audioContext.createGain();
    masterGainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    masterGainNode.connect(audioContext.destination);
}

function initializeMIDI() {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(onMIDIReady, onMIDIFailure);
    } else {
        alert("Web MIDI API not supported in this browser.");
    }
}

function onMIDIReady(midiAccess) {
    const inputs = midiAccess.inputs;
    inputs.forEach(input => {
        input.onmidimessage = handleMIDIMessage;
    });
}

function onMIDIFailure() {
    alert("Failed to access MIDI devices.");
}

function handleMIDIMessage(event) {
    const [status, note, velocity] = event.data;
    if (status === 144 && velocity > 0) { 
        playSineWave(note);
    } else if (status === 128 || (status === 144 && velocity === 0)) { 
        stopSineWave(note);
    }
}

function playSineWave(note) {
    const frequency = 440 * Math.pow(2, (note - 69) / 12); 
    
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(1 / maxNotes, audioContext.currentTime); 

    oscillator.connect(gainNode);
    gainNode.connect(masterGainNode); 
    oscillator.start();

    oscillators[note] = oscillator; 
    gainNodes[note] = gainNode;

    oscillator.onended = () => {
        delete oscillators[note]; 
        delete gainNodes[note]; 
    };
}

function stopSineWave(note) {
    const oscillator = oscillators[note];
    const gainNode = gainNodes[note];
    if (oscillator) {
        oscillator.stop(); 
        oscillator.disconnect();
        if (gainNode) {
            gainNode.disconnect();
        }
        delete oscillators[note]; 
    }
}