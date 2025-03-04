let audioContext;
const oscillators = {};
const gainNodes = {};
let masterGainNode;
let analyserNode;
const maxNotes = 8; 
const superpositionCanvas = document.getElementById('superposition');
const ctx = superpositionCanvas.getContext('2d');

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

    analyserNode = audioContext.createAnalyser();
    masterGainNode.connect(analyserNode);
    analyserNode.fftSize = 2048;
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
    requestAnimationFrame(drawSuperposition);
}

function onMIDIFailure() {
    alert("Failed to access MIDI devices.");
}

function handleMIDIMessage(event) {
    const [status, note, velocity] = event.data;
    if (status === 147 && velocity > 0) { 
        playSineWave(note);
    } else if (status === 131 || (status === 147 && velocity === 0)) { 
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

function drawSuperposition() {
    requestAnimationFrame(drawSuperposition);

    ctx.clearRect(0, 0, superpositionCanvas.width, superpositionCanvas.height);

    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserNode.getByteTimeDomainData(dataArray);

    ctx.beginPath();
    const sliceWidth = superpositionCanvas.width / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128; 
        const y = (v * superpositionCanvas.height) / 2; 
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        x += sliceWidth;
    }

    ctx.lineTo(superpositionCanvas.width, superpositionCanvas.height / 2);
    ctx.strokeStyle = 'white'; 
    ctx.lineWidth = 2; 
    ctx.stroke();
}