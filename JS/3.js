let inc = 0.1;
let scl = 50;
let cols, rows;
let detailSlider;
let canvas; 

function setup() {
    canvas = createCanvas(200, 200);
    canvas.parent('canvas'); 
    cols = floor(width / scl);
    rows = floor(height / scl);
    textAlign(CENTER, CENTER);
    detailSlider = document.getElementById('detail-slider');
}

function draw() {
    background(255);
    inc = parseFloat(detailSlider.value); 

    let yoff = 0;
    for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
            let noiseValue = noise(xoff, yoff) * 255;
            fill(noiseValue);
            noStroke();
            rect(x * scl, y * scl, scl, scl);
            fill(0);
            textSize(scl / 5);
            text(nf(noiseValue, 1, 2), x * scl + scl / 2, y * scl + scl / 2);
            xoff += inc;
        }
        yoff += inc;
    }

    stroke(0);
    noFill();
    yoff = 0;
    for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
            let noiseValue = noise(xoff, yoff) * 255;
            let midNoiseValue = noise(xoff + (inc / 2), yoff) * 255;
            let circleX = x * scl + (scl / 2); 
            let circleY = y * scl + scl - (midNoiseValue / 255) * scl; 

            beginShape();
            for (let i = 0; i <= scl; i++) {
                let noiseValue = noise(xoff, yoff) * 255;
                noFill();
                vertex(x * scl + i, y * scl + scl - (noiseValue / 255) * scl);
                xoff += inc / scl;
            }
            endShape();
            fill('#09f'); 
            ellipse(circleX, circleY, scl / 10, scl / 10);
        }
        yoff += inc;
    }
}
