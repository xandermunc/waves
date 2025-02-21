let waveHeight;
let xOffset = 0;
let waterColor1;
let waterColor2;

let circleRadius = 0;
let circlePosition;
let circleOpacity = 255;

function setup() {
  createCanvas(800, 600);
  waveHeight = height / 2;
  waterColor1 = color('#39f');
  waterColor2 = color('#06f');
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
  strokeWeight(2);
  stroke('#cef');

  beginShape();
  for (let x = 0; x <= width; x += 5) {
    let noiseFactor = map(x + xOffset, 0, width, 0, 2);
    let amplitude = map(sin(x * 0.02 + frameCount * 0.05), -1, 1, 20, 100);
    let y = waveHeight + noise(noiseFactor) * amplitude;

    if (circlePosition) {
      let d = dist(x, waveHeight, circlePosition.x, circlePosition.y);
      if (d < circleRadius) {
        let displacement = map(d, 0, circleRadius, 100, 0);
        let opacityFactor = circleOpacity / 255; 
        y += displacement * opacityFactor; 
      }
    }

    vertex(x, y);
  }
  endShape();

  if (circlePosition) {
    noFill();
    stroke(255, 0, 0, circleOpacity);
    ellipse(circlePosition.x, circlePosition.y, circleRadius * 2, circleRadius * 2);
    circleRadius += 2;

    circleOpacity -= 255 / (60 * 2); 
    if (circleOpacity < 0) {
      circleOpacity = 0;
      circlePosition = null;
    }
  }

  xOffset += 0.05;
}

function mousePressed() {
  circlePosition = createVector(mouseX, mouseY);
  circleRadius = 1;
  circleOpacity = 255;
}
