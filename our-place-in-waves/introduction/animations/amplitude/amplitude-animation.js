const canvas = document.getElementById("wave");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

let amplitude = 50;
let frequency = 1;
let wavelength = 160;
let velocity = 1.6;
let phase = 0;
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

    ctx.strokeStyle = "#09f";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();
}

let amplitudeBase = 27.5; // Midpoint of 5 and 50
let amplitudeRange = 22.5; // Half of the total range
let time = 0;
let speed = 0.025; // speed of oscillation

function animate() {
    phase += velocity / wavelength / 2;
    amplitude = amplitudeBase + amplitudeRange * Math.sin(time);
    time += speed;
    drawSineWave();
    requestAnimationFrame(animate);
}

animate();
