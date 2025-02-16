var inc = 0.01;
var start = 0;
var incSlider;
var octaveSlider;

function setup() {
    var canvas = createCanvas(1200, 600);
    canvas.parent('canvasContainer');
}

function draw() {
    background('#111');
    stroke(255);
    noFill();

    inc = parseFloat(document.getElementById('incSlider').value);
    var numOctaves = parseInt(document.getElementById('octaveSlider').value);

    beginShape();
    var xoff = start;
    for (var x = 0; x < width; x++) {
        var y = combinedNoise(xoff) * height / 4; 
        vertex(x, y);
        xoff += inc;
    }
    endShape();

    var yOffset = height / 2;
    for (var i = 0; i < numOctaves; i++) {
        drawOctave(i, yOffset);
        yOffset += height / (2 * numOctaves); 
    }

    start += inc;
}

function combinedNoise(xoff) {
    var total = 0;
    var frequency = 1;
    var amplitude = 1;
    var maxValue = 0;
    var numOctaves = parseInt(document.getElementById('octaveSlider').value);

    for (var i = 0; i < numOctaves; i++) {
        total += noise(xoff * frequency) * amplitude;
        maxValue += amplitude;
        amplitude *= 0.5;
        frequency *= 2;
    }

    return total / maxValue;
}

function drawOctave(octave, yOffset) {
    var frequency = Math.pow(2, octave);
    var amplitude = Math.pow(0.5, octave);
    var xoff = start;

    beginShape();
    for (var x = 0; x < width; x++) {
        var y = noise(xoff * frequency) * amplitude * height / 8 + yOffset;
        vertex(x, y);
        xoff += inc;
    }
    endShape();
}