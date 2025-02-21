let waveHeight;
let xOffset = 0;
let waterColor1;
let waterColor2;

function setup() {
  createCanvas(800, 600);
  waveHeight = height / 2;
  waterColor1 = color(50, 150, 255);
  waterColor2 = color(0, 100, 255);
}

function draw() {
  background(255);

  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(waterColor1, waterColor2, inter);
    stroke(c);
    line(0, y, width, y);
  }

  noFill();
  stroke(255, 255, 255, 150);

  beginShape();
  for (let x = 0; x <= width; x += 5) {
    let noiseFactor = map(x + xOffset, 0, width, 0, 5);
    let amplitude = map(sin(x * 0.02 + frameCount * 0.05), -1, 1, 20, 100);
    let y = waveHeight + noise(noiseFactor) * amplitude;

    vertex(x, y);
  }
  endShape();

  xOffset += 0.05;
}
