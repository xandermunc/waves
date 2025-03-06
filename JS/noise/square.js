let rectSize = 300;
let ellipseSize = 30;
let speedX = 2, speedY = 2;
let ellipseX, ellipseY;
let waveOffset = 0;
let frequency = 0.02;
let frequencyOffset = 0;

function setup() {
    createCanvas(innerWidth, innerHeight);
    ellipseX = width / 2 - rectSize / 2;
    ellipseY = height / 2 - rectSize / 2;
}

function draw() {
    background(225);

    colorValue = map(floor(ellipseY), height / 2 - rectSize / 2, height / 2 + rectSize / 2, 257, 0);
    colorValueInverted = map(floor(ellipseY), height / 2 - rectSize / 2, height / 2 + rectSize / 2, 0, 255);
    colorValueNumber = parseInt(colorValue, 10).toString().padStart(3, '0');

    noStroke();
    fill(colorValue);
    rect(width / 2 - rectSize / 2, height / 2 - rectSize / 2, rectSize, rectSize);

    stroke('#f90');
    strokeWeight(5);
    noFill();
    beginShape();
    let amplitude = rectSize / 2;
    frequencyOffset += 0.005;
    frequency = map(sin(frequencyOffset), -1, 1, 0.01, 0.04);
    let startX = width / 2 - rectSize / 2;
    let endX = width / 2 + rectSize / 2;
    waveOffset += 0.02;
    for (let x = startX; x <= endX; x += 5) {
        let y = height / 2 + amplitude * sin(frequency * (x - startX) + waveOffset);
        vertex(y + rectSize + 35, x - rectSize - 35);
    }
    endShape();

    noStroke();
    ellipseX = width / 2 + amplitude * sin(frequency * (startX - startX) + waveOffset);
    ellipseY = height / 2 + amplitude * sin(frequency * (startX - startX) + waveOffset);
    fill('#f90');
    ellipse(ellipseX, height / 2 - rectSize / 2, ellipseSize, ellipseSize);

    stroke('#09f');
    strokeWeight(5);
    noFill();
    beginShape();
    for (let x = startX; x <= endX; x += 5) {
        let y = height / 2 + amplitude * sin(frequency * (x - startX) + waveOffset);
        vertex(x, y);
    }
    endShape();

    push();
    fill(colorValueInverted);
    noStroke();
    textSize(100);
    textAlign(CENTER, CENTER);
    textFont("SF Mono");
    text(colorValueNumber, width / 2, height / 2);
    textSize(20);
    fill('#09f');
    text(255, width / 2 - rectSize / 2 - 30, height / 2 - rectSize / 2 - 30);
    text(0, width / 2 + rectSize / 2 + 30, height / 2 - rectSize / 2 - 30);
    text(0, width / 2 - rectSize / 2 - 30, height / 2 + rectSize / 2 + 30);
    pop();

    noStroke();
    ellipseX = width / 2 + amplitude * sin(frequency * (startX - startX) + waveOffset);
    ellipseY = height / 2 + amplitude * sin(frequency * (startX - startX) + waveOffset);
    // fill('#f90');
    // ellipse(ellipseX, height / 2 - rectSize / 2, ellipseSize, ellipseSize);
    fill('#09f');
    ellipse(width / 2 - rectSize / 2, ellipseY, ellipseSize, ellipseSize);

    if (ellipseX < width / 2 - rectSize / 2 || ellipseX > width / 2 + rectSize / 2) {
        speedX *= -1;
    }
    ellipseX += speedX;

    if (ellipseY < height / 2 - rectSize / 2 || ellipseY > height / 2 + rectSize / 2) {
        speedY *= -1;
    }
    ellipseY += speedY;
}