let stars = [];
let lightPollutionSlider;

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < 200; i++) {
    stars.push(createVector(random(width), random(height * 0.5)));
  }
  lightPollutionSlider = createSlider(0, 10, 0, 0.1); 
  lightPollutionSlider.position(20, 20);
  lightPollutionSlider.style('width', '200px');
}

function draw() {
  background(0);
  fill(255);
  noStroke();
  for (let star of stars) {
    ellipse(star.x, star.y, 3, 3);
  }
  
  let lightPollution = lightPollutionSlider.value();
  
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color('#0000FF'), color('#FFA500'), inter);
    c.setAlpha(map(lightPollution, 10, 0, 255, 0)); 
    stroke(c);
    line(0, y, width, y);
  }
  
  fill(255);
  textSize(16);
  text(`Light Pollution Index: ${lightPollution.toFixed(1)}`, 20, 50);
}
