const canvas = document.getElementById("wave");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

let amplitude = 50; // Initial amplitude
let frequency = 0.2; // Initial frequency
let velocity = 0.8; // Initial velocity

let phase = 0;
let targetRotationY = 0;
let targetRotationX = 0;
let rotationY = 0;
let rotationX = 0;

function drawSineWave() {
    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.translate(width / 2, height / 2);

    ctx.beginPath();
    for (let x = -width / 4; x < width / 4; x++) {
        const y = amplitude * Math.sin(frequency * (x + phase));
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
    phase += velocity; // Use velocity to update phase

    rotationX += (targetRotationX - rotationX) * 0.1;
    rotationY += (targetRotationY - rotationY) * 0.1;

    drawSineWave();
    requestAnimationFrame(animate);
}

animate();

// Wavelength Slider
const svgWavelength = document.getElementById('svg-wavelength-slider');
const lineWavelength = document.getElementById('wavelength-slider-line');
const circleWavelength = document.getElementById('wavelength-slider-circle');
const colorRect = document.getElementById('color-rect');

const lineStartXWavelength = parseFloat(lineWavelength.getAttribute('x1'));
const lineEndXWavelength = parseFloat(lineWavelength.getAttribute('x2'));

let isDraggingWavelength = false;

// Initial settings for wavelength
const initialWavelength = 470; // #09f
const normalizedPositionWavelength = (initialWavelength - 380) / (750 - 380);
const initialSliderPositionWavelength = lineStartXWavelength + normalizedPositionWavelength * (lineEndXWavelength - lineStartXWavelength);

circleWavelength.setAttribute('cx', initialSliderPositionWavelength);
frequency = 0.01 + normalizedPositionWavelength * 0.1;
colorRect.style.backgroundColor = wavelengthToColor(initialWavelength);

// Function to update frequency and the corresponding slider position
function updateFrequencyAndSlider(normalizedPosition) {
    // Reverse the position for frequency
    const reversedPosition = 1 - normalizedPosition; 
    frequency = 0.01 + reversedPosition * 0.1;
    circleFrequency.setAttribute('cx', lineStartXFrequency + reversedPosition * (lineEndXFrequency - lineStartXFrequency));
    drawSineWave();
}

// Wavelength slider event listeners
svgWavelength.addEventListener('mousedown', (e) => {
    const mouseX = e.offsetX;
    const circleX = parseFloat(circleWavelength.getAttribute('cx'));
    const distance = Math.hypot(mouseX - circleX, e.offsetY - parseFloat(circleWavelength.getAttribute('cy')));
    if (distance <= parseFloat(circleWavelength.getAttribute('r'))) {
        isDraggingWavelength = true;
    }
});

svgWavelength.addEventListener('mousemove', (e) => {
    if (isDraggingWavelength) {
        const mouseX = e.offsetX;
        const constrainedX = Math.max(lineStartXWavelength, Math.min(lineEndXWavelength, mouseX));
        circleWavelength.setAttribute('cx', constrainedX);

        const normalizedPositionWavelength = (constrainedX - lineStartXWavelength) / (lineEndXWavelength - lineStartXWavelength);
        const wavelength = 380 + normalizedPositionWavelength * (750 - 380);
        colorRect.style.backgroundColor = wavelengthToColor(wavelength);
        
        updateFrequencyAndSlider(normalizedPositionWavelength);
    }
});

svgWavelength.addEventListener('mouseup', () => {
    isDraggingWavelength = false;
});

svgWavelength.addEventListener('mouseleave', () => {
    isDraggingWavelength = false;
});

// Frequency Slider
const svgFrequency = document.getElementById('svg-frequency-slider');
const lineFrequency = document.getElementById('frequency-slider-line');
const circleFrequency = document.getElementById('frequency-slider-circle');

const lineStartXFrequency = parseFloat(lineFrequency.getAttribute('x1'));
const lineEndXFrequency = parseFloat(lineFrequency.getAttribute('x2'));

let isDraggingFrequency = false;

// Initial settings for frequency
const initialFrequency = 0.2; // Default frequency
const constrainedInitialFrequency = Math.min(0.1, Math.max(0.01, initialFrequency)); // Ensure within range
const normalizedPositionFrequency = (constrainedInitialFrequency - 0.01) / (0.1 - 0.01);
const initialSliderPositionFrequency = lineStartXFrequency + normalizedPositionFrequency * (lineEndXFrequency - lineStartXFrequency);

circleFrequency.setAttribute('cx', initialSliderPositionFrequency);
frequency = constrainedInitialFrequency;

// Function to update wavelength and the corresponding slider position
function updateWavelengthAndSlider(normalizedPosition) {
    const wavelength = 380 + normalizedPosition * (750 - 380);
    colorRect.style.backgroundColor = wavelengthToColor(wavelength);
    circleWavelength.setAttribute('cx', lineStartXWavelength + normalizedPosition * (lineEndXWavelength - lineStartXWavelength));
    drawSineWave();
}

// Frequency slider event listeners
svgFrequency.addEventListener('mousedown', (e) => {
    const mouseX = e.offsetX;
    const circleX = parseFloat(circleFrequency.getAttribute('cx'));
    const distance = Math.hypot(mouseX - circleX, e.offsetY - parseFloat(circleFrequency.getAttribute('cy')));
    if (distance <= parseFloat(circleFrequency.getAttribute('r'))) {
        isDraggingFrequency = true;
    }
});

svgFrequency.addEventListener('mousemove', (e) => {
    if (isDraggingFrequency) {
        const mouseX = e.offsetX;
        const constrainedX = Math.max(lineStartXFrequency, Math.min(lineEndXFrequency, mouseX));
        circleFrequency.setAttribute('cx', constrainedX);

        const normalizedPositionFrequency = (constrainedX - lineStartXFrequency) / (lineEndXFrequency - lineStartXFrequency);
        frequency = 0.01 + normalizedPositionFrequency * (0.1 - 0.01); // Frequency range between 0.01 and 0.1

        // Reverse the position for wavelength
        const reversedPositionWavelength = 1 - normalizedPositionFrequency;
        updateWavelengthAndSlider(reversedPositionWavelength);
    }
});

svgFrequency.addEventListener('mouseup', () => {
    isDraggingFrequency = false;
});

svgFrequency.addEventListener('mouseleave', () => {
    isDraggingFrequency = false;
});

// Amplitude Slider
const svgAmplitude = document.getElementById('svg-amplitude-slider');
const lineAmplitude = document.getElementById('amplitude-slider-line');
const circleAmplitude = document.getElementById('amplitude-slider-circle');

const lineStartXAmplitude = parseFloat(lineAmplitude.getAttribute('x1'));
const lineEndXAmplitude = parseFloat(lineAmplitude.getAttribute('x2'));

let isDraggingAmplitude = false;

// Initial settings for amplitude
const initialAmplitude = 50; // Default amplitude
const normalizedPositionAmplitude = (initialAmplitude - 10) / (100 - 10); // Slider range between 10 and 100
const initialSliderPositionAmplitude = lineStartXAmplitude + normalizedPositionAmplitude * (lineEndXAmplitude - lineStartXAmplitude);

circleAmplitude.setAttribute('cx', initialSliderPositionAmplitude);
amplitude = initialAmplitude;

// Amplitude slider event listeners
svgAmplitude.addEventListener('mousedown', (e) => {
    const mouseX = e.offsetX;
    const circleX = parseFloat(circleAmplitude.getAttribute('cx'));
    const distance = Math.hypot(mouseX - circleX, e.offsetY - parseFloat(circleAmplitude.getAttribute('cy')));
    if (distance <= parseFloat(circleAmplitude.getAttribute('r'))) {
        isDraggingAmplitude = true;
    }
});

const minOpacity = 0.2; // Minimum opacity
const maxOpacity = 2; // Maximum opacity

svgAmplitude.addEventListener('mousemove', (e) => {
    if (isDraggingAmplitude) {
        const mouseX = e.offsetX;
        const constrainedX = Math.max(lineStartXAmplitude, Math.min(lineEndXAmplitude, mouseX));
        circleAmplitude.setAttribute('cx', constrainedX);

        const normalizedPositionAmplitude = (constrainedX - lineStartXAmplitude) / (lineEndXAmplitude - lineStartXAmplitude);
        amplitude = 10 + normalizedPositionAmplitude * (100 - 10); // Amplitude range between 10 and 100

        const normalizedOpacity = minOpacity + (amplitude / 100) * (maxOpacity - minOpacity); // Opacity based on amplitude
        colorRect.style.opacity = normalizedOpacity; // Set opacity based on amplitude

        drawSineWave();
    }
});

svgAmplitude.addEventListener('mouseup', () => {
    isDraggingAmplitude = false;
});

svgAmplitude.addEventListener('mouseleave', () => {
    isDraggingAmplitude = false;
});

// Velocity Slider
const svgVelocity = document.getElementById('svg-velocity-slider');
const lineVelocity = document.getElementById('velocity-slider-line');
const circleVelocity = document.getElementById('velocity-slider-circle');

const lineStartXVelocity = parseFloat(lineVelocity.getAttribute('x1'));
const lineEndXVelocity = parseFloat(lineVelocity.getAttribute('x2'));

let isDraggingVelocity = false;

// Initial settings for velocity
const initialVelocity = 0.8; // Default velocity
const normalizedPositionVelocity = (initialVelocity - 0.1) / (2.0 - 0.1); // Slider range between 0.1 and 2.0
const initialSliderPositionVelocity = lineStartXVelocity + normalizedPositionVelocity * (lineEndXVelocity - lineStartXVelocity);

circleVelocity.setAttribute('cx', initialSliderPositionVelocity);
velocity = initialVelocity;

// Velocity slider event listeners
svgVelocity.addEventListener('mousedown', (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    const circleX = parseFloat(circleVelocity.getAttribute('cx'));
    const circleY = parseFloat(circleVelocity.getAttribute('cy'));

    const distance = Math.hypot(mouseX - circleX, mouseY - circleY);
    if (distance <= parseFloat(circleVelocity.getAttribute('r'))) {
        isDraggingVelocity = true;
    }
});

svgVelocity.addEventListener('mousemove', (e) => {
    if (isDraggingVelocity) {
        const mouseX = e.offsetX;
        const constrainedX = Math.max(lineStartXVelocity, Math.min(lineEndXVelocity, mouseX));
        circleVelocity.setAttribute('cx', constrainedX);

        const normalizedPositionVelocity = (constrainedX - lineStartXVelocity) / (lineEndXVelocity - lineStartXVelocity);
        velocity = 0.1 + normalizedPositionVelocity * (5.0 - 2); // Velocity range between 0.1 and 2.0
    }
});

svgVelocity.addEventListener('mouseup', () => {
    isDraggingVelocity = false;
});

svgVelocity.addEventListener('mouseleave', () => {
    isDraggingVelocity = false;
});

// Function to convert wavelength to color
function wavelengthToColor(wavelength) {
    let r, g, b;

    if (wavelength >= 380 && wavelength < 440) {
        r = -(wavelength - 440) / (440 - 380);
        g = 0;
        b = 1;
    } else if (wavelength >= 440 && wavelength < 490) {
        r = 0;
        g = (wavelength - 440) / (490 - 440);
        b = 1;
    } else if (wavelength >= 490 && wavelength < 510) {
        r = 0;
        g = 1;
        b = -(wavelength - 510) / (510 - 490);
    } else if (wavelength >= 510 && wavelength < 580) {
        r = (wavelength - 510) / (580 - 510);
        g = 1;
        b = 0;
    } else if (wavelength >= 580 && wavelength < 645) {
        r = 1;
        g = -(wavelength - 645) / (645 - 580);
        b = 0;
    } else if (wavelength >= 645 && wavelength <= 750) {
        r = 1;
        g = 0;
        b = 0;
    } else {
        r = 0;
        g = 0;
        b = 0;
    }

    const alpha = 1; // Opacity
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    return `rgba(${r},${g},${b},${alpha})`;
}
