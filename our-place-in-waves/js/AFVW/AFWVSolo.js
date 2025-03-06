const velocitySliderS = document.getElementById('solo-velocity');
const frequencySliderS = document.getElementById('solo-frequency');
const wavelengthSliderS = document.getElementById('solo-wavelength');
let velocityS = parseFloat(velocitySliderS.value);

velocitySliderS.addEventListener('input', () => {
    velocityS = parseFloat(velocitySliderS.value);
    const frequencyS = parseFloat(frequencySliderS.value);
    const wavelengthS = velocityS / frequencyS;
    wavelengthSliderS.value = wavelengthS.toFixed(wavelengthSliderS.min);
});

frequencySliderS.addEventListener('input', () => {
    const frequencyS = parseFloat(frequencySliderS.value);
    const wavelengthS = velocityS / frequencyS;
    wavelengthSliderS.value = wavelengthS.toFixed(wavelengthSliderS.min);
});

wavelengthSliderS.addEventListener('input', () => {
    const wavelengthS = parseFloat(wavelengthSliderS.value);
    const frequencyS = velocityS / wavelengthS;
    frequencySliderS.value = frequencyS.toFixed(frequencySliderS.min);
});

frequencySliderS.addEventListener('input', function () {
    if (parseFloat(velocitySliderS.value) <= parseFloat(frequencySliderS.value)) {
        velocitySliderS.value = frequencySliderS.value;
        wavelengthSliderS.value = wavelengthSliderS.min;
    } else if (parseFloat(frequencySliderS.value) >= parseFloat(velocitySliderS.value)) {
        frequencySliderS.value = velocitySliderS.value;
        wavelengthSliderS.value = wavelengthSliderS.min;
    }
});

wavelengthSliderS.addEventListener('input', function () {
    if (parseFloat(velocitySliderS.value) <= parseFloat(wavelengthSliderS.value)) {
        velocitySliderS.value = wavelengthSliderS.value;
        frequencySliderS.value = frequencySliderS.min;
    } else if (parseFloat(wavelengthSliderS.value) >= parseFloat(velocitySliderS.value)) {
        wavelengthSliderS.value = velocitySliderS.value;
        frequencySliderS.value = frequencySliderS.min;
    } else {
        frequencySliderS.value = (velocitySliderS.value / wavelengthSliderS.value).toFixed(1);
    }
});

velocitySliderS.addEventListener('input', function () {
    if (parseFloat(wavelengthSliderS.value) == parseFloat(wavelengthSliderS.min) && parseFloat(velocitySliderS.value) < parseFloat(frequencySliderS.value)) {
        frequencySliderS.value = velocitySliderS.value;
        wavelengthSliderS.value = wavelengthSliderS.min;
    }
});

const canvasS = document.getElementById("solo-wave");
const cts = canvasS.getContext("2d");
const widthS = canvasS.width;
const heightS = canvasS.height;

let amplitudeS = 50;
let frequencyS = 1;
let wavelengthS = 160;
let phaseS = 0;
let rotationYS = 0;
let rotationXS = 0;

function drawSineWaveS() {
    cts.clearRect(0, 0, widthS, heightS);
    cts.save();
    cts.translate(widthS / 2, heightS / 2);
    cts.beginPath();
    for (let xS = -widthS / 4; xS < widthS / 4; xS++) {
        const yS = amplitudeS * Math.sin(2 * Math.PI * (xS / wavelengthS + frequencyS * phaseS));
        const zS = (xS / widthS) * 50;
        const cosYS = Math.cos(rotationYS);
        const sinYS = Math.sin(rotationYS);
        const cosXS = Math.cos(rotationXS);
        const sinXS = Math.sin(rotationXS);
        const xRotatedS = cosYS * xS + sinYS * zS;
        const zRotatedS = -sinYS * xS + cosYS * zS;
        const yRotatedS = cosXS * yS - sinXS * zRotatedS;
        const projectedXS = xRotatedS;
        const projectedYS = -yRotatedS;
        cts.lineTo(projectedXS, projectedYS);
    }

    cts.strokeStyle = "black";
    cts.lineWidth = 4;
    cts.stroke();
    cts.restore();
}

function animateS() {
    phaseS += velocityS / wavelengthS / 2;
    drawSineWaveS();
    requestAnimationFrame(animateS);
}

animateS();

const amplitudeSliderS = document.getElementById('solo-amplitude');

amplitudeSliderS.addEventListener('input', () => {
    amplitudeS = parseFloat(amplitudeSliderS.value);
});

frequencySliderS.addEventListener('input', () => {
    updateWaveValuesS();
});

wavelengthSliderS.addEventListener('input', () => {
    updateWaveValuesS();
});

velocitySliderS.addEventListener('input', () => {
    updateWaveValuesS();
});

function updateFrequencyS() {
    const frequencyValueS = parseFloat(frequencySliderS.value);
    frequencyS = (velocityS / frequencyValueS);
}

function updateWavelengthS() {
    const wavelengthValueS = parseFloat(wavelengthSliderS.value);
    wavelengthS = wavelengthValueS * 100;
}

function updateVelocityS() {
    const velocityValueS = parseFloat(velocitySliderS.value);
    velocityS = velocityValueS;
}

function updateWaveValuesS() {
    updateFrequencyS();
    updateWavelengthS();
    updateVelocityS();
}