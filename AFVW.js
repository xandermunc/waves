const velocitySlider = document.getElementById('velocity');
const frequencySlider = document.getElementById('frequency');
const wavelengthSlider = document.getElementById('wavelength');

const velocityValueDisplay = document.getElementById('velocityValue');
const frequencyValueDisplay = document.getElementById('frequencyValue');
const wavelengthValueDisplay = document.getElementById('wavelengthValue');

const colorRect = document.getElementById('color-rect');
const initialWavelength = 160; // #09f
colorRect.style.backgroundColor = wavelengthToColor(initialWavelength);

let velocity = parseFloat(velocitySlider.value);

// Update displays for initial values
velocityValueDisplay.textContent = velocity.toFixed(1);
frequencyValueDisplay.textContent = frequencySlider.value;
wavelengthValueDisplay.textContent = (velocity / frequencySlider.value).toFixed(1);

// Update frequency and wavelength based on velocity
velocitySlider.addEventListener('input', () => {
    velocity = parseFloat(velocitySlider.value);
    const frequency = parseFloat(frequencySlider.value);
    const wavelength = velocity / frequency;

    wavelengthSlider.value = wavelength.toFixed(wavelengthSlider.min);
    wavelengthValueDisplay.textContent = wavelength.toFixed(1);
    velocityValueDisplay.textContent = velocity.toFixed(1);
});

// Update wavelength based on frequency
frequencySlider.addEventListener('input', () => {
    const frequency = parseFloat(frequencySlider.value);
    const wavelength = velocity / frequency;

    wavelengthSlider.value = wavelength.toFixed(wavelengthSlider.min);
    wavelengthValueDisplay.textContent = wavelength.toFixed(1);
    frequencyValueDisplay.textContent = frequency.toFixed(1);
});

// Update frequency based on wavelength
wavelengthSlider.addEventListener('input', () => {
    const wavelength = parseFloat(wavelengthSlider.value);
    const frequency = velocity / wavelength;

    frequencySlider.value = frequency.toFixed(frequencySlider.min);
    frequencyValueDisplay.textContent = frequency.toFixed(1);
    wavelengthValueDisplay.textContent = wavelength.toFixed(1);
});

frequencySlider.addEventListener('input', function () {
    if (parseFloat(velocitySlider.value) <= parseFloat(frequencySlider.value)) {
        velocitySlider.value = frequencySlider.value;
        velocityValueDisplay.textContent = frequency.toFixed(1);
        wavelengthValueDisplay.textContent = wavelength.toFixed(1);
        wavelengthSlider.value = wavelengthSlider.min;
    } else if (parseFloat(frequencySlider.value) >= parseFloat(velocitySlider.value)) {
        frequencySlider.value = velocitySlider.value;
        frequencyValueDisplay.textContent = velocity.toFixed(1);
        wavelengthValueDisplay.textContent = wavelength.toFixed(1);
        wavelengthSlider.value = wavelengthSlider.min;
    } else {
        wavelengthSlider.value = (velocitySlider.value / frequencySlider.value).toFixed(1);
        wavelengthValueDisplay.textContent = (velocitySlider.value / frequencySlider.value).toFixed(1);
    }
});

wavelengthSlider.addEventListener('input', function () {
    if (parseFloat(velocitySlider.value) <= parseFloat(wavelengthSlider.value)) {
        velocitySlider.value = wavelengthSlider.value;
        velocityValueDisplay.textContent = wavelength.toFixed(1);
        frequencyValueDisplay.textContent = frequency.toFixed(1);
        frequencySlider.value = frequencySlider.min;
    } else if (parseFloat(wavelengthSlider.value) >= parseFloat(velocitySlider.value)) {
        wavelengthSlider.value = velocitySlider.value;
        wavelengthValueDisplay.textContent = velocity.toFixed(1);
        frequencyValueDisplay.textContent = frequency.toFixed(1);
        frequencySlider.value = frequencySlider.min;
    } else {
        frequencySlider.value = (velocitySlider.value / wavelengthSlider.value).toFixed(1);
        frequencyValueDisplay.textContent = (velocitySlider.value / wavelengthSlider.value).toFixed(1);
    }
});

velocitySlider.addEventListener('input', function () {
    if (parseFloat(wavelengthSlider.value) == parseFloat(wavelengthSlider.min) && parseFloat(velocitySlider.value) < parseFloat(frequencySlider.value)) {
        frequencySlider.value = velocitySlider.value;
        frequencyValueDisplay.textContent = velocity.toFixed(1);
        wavelengthSlider.value = wavelengthSlider.min;
        wavelengthValueDisplay.textContent = wavelength.toFixed(1);
    }
});

const minValue = velocitySlider.min;
const maxValue = velocitySlider.max;
console.log(minValue);
console.log(maxValue);

// // // // // // // // // // // // // // // // // // // 

const canvas = document.getElementById("wave");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

let amplitude = 50;
let frequency = 1;
let wavelength = 160;
let phase = 0;
// let targetRotationY = 0;
// let targetRotationX = 0;
let rotationY = 0;
let rotationX = 0;

function drawSineWave() {
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.beginPath();
    for (let x = -width / 4; x < width / 4; x++) {
        const y = amplitude * Math.sin(2 * Math.PI * (x / wavelength + frequency * phase));
        const z = (x / width) * 50;
        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        const cosX = Math.cos(rotationX);
        const sinX = Math.sin(rotationX);
        const xRotated = cosY * x + sinY * z;
        const zRotated = -sinY * x + cosY * z;
        const yRotated = cosX * y - sinX * zRotated;
        const projectedX = xRotated;
        const projectedY = -yRotated;
        ctx.lineTo(projectedX, projectedY);
    }

    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();
}

function animate() {
    phase += velocity / wavelength / 2;
    // rotationX += (targetRotationX - rotationX) * 0.1;
    // rotationY += (targetRotationY - rotationY) * 0.1;

    drawSineWave();
    requestAnimationFrame(animate);
}

animate();
log();

const amplitudeSlider = document.getElementById('amplitude');
const amplitudeValueDisplay = document.getElementById('amplitudeValue');

const minOpacity = 0.2; 
const maxOpacity = 2; 

amplitudeSlider.addEventListener('input', () => {
    amplitude = parseFloat(amplitudeSlider.value);
    amplitudeValueDisplay.textContent = Math.round(amplitude);
    log();
    const opacity = minOpacity + (amplitude / 100) * (maxOpacity - minOpacity);
    colorRect.style.opacity = opacity;

    if (amplitude >= 51 && amplitude <= 100) {
        const minHeight = 100; 
        const maxHeight = 150;
        const minWidth = 100;
        const maxWidth = 200;
        const height = minHeight + ((amplitude - 51) / 49) * (maxHeight - minHeight);
        const width = minWidth + ((amplitude - 51) / 49) * (maxWidth - minWidth);
        colorRect.style.height = `${height}vh`;
        colorRect.style.width = `${width}vw`;
    }
});

frequencySlider.addEventListener('input', () => {
    updateWaveValues();
});

wavelengthSlider.addEventListener('input', () => {
    updateWaveValues();
});

velocitySlider.addEventListener('input', () => {
    updateWaveValues();
});

function updateFrequency() {
    const frequencyValue = parseFloat(frequencySlider.value);
    frequency = (velocity / frequencyValue);
    log();
}

function updateWavelength() {
    const wavelengthValue = parseFloat(wavelengthSlider.value);
    wavelength = wavelengthValue * 100;
    log();
}

function updateVelocity() {
    const velocityValue = parseFloat(velocitySlider.value);
    velocity = velocityValue;
    log(); 
}

function updateWaveValues() {
    colorRect.style.backgroundColor = wavelengthToColor(wavelength);
    updateFrequency();
    updateWavelength();
    updateVelocity();
}

function log() {
    console.clear();
    console.log('frequency', frequency);
    console.log('wavelength', wavelength);
    console.log('velocity', velocity);
    console.log('phase', phase);
}

function wavelengthToColor(wavelength) {
    let r, g, b;

    if (wavelength >= 0 && wavelength < 100) {
        r = -(wavelength - 100) / (100 - 0);
        g = 0;
        b = 1;
    } else if (wavelength >= 100 && wavelength < 200) {
        r = 0;
        g = (wavelength - 100) / (200 - 100);
        b = 1;
    } else if (wavelength >= 200 && wavelength < 300) {
        r = 0;
        g = 1;
        b = -(wavelength - 300) / (300 - 200);
    } else if (wavelength >= 300 && wavelength < 400) {
        r = (wavelength - 300) / (400 - 300);
        g = 1;
        b = 0;
    } else if (wavelength >= 400 && wavelength < 500) {
        r = 1;
        g = -(wavelength - 500) / (500 - 400);
        b = 0;
    } else if (wavelength >= 500 && wavelength < 600) {
        r = 1;
        g = 0;
        b = (wavelength - 500) / (600 - 500);
    } else {
        r = 0;
        g = 0;
        b = 0;
    }

    const alpha = 1;
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    return `rgba(${r},${g},${b},${alpha})`;
}

