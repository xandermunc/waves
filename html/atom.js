
function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('atom');
}

function draw() {
    pixelDensity(2); 
    clear();

    stroke(255);
    ellipse(width / 2, height / 2, 100, 100);
    ellipse(width / 2, height / 2, 150, 150);
    ellipse(width / 2, height / 2, 200, 200);

    let angle1 = frameCount * 0.05;
    let angle2 = frameCount * 0.03;
    let angle3 = frameCount * 0.01;

    let x1 = width / 2 + 50 * cos(angle1);
    let y1 = height / 2 + 50 * sin(angle1);

    let x2 = width / 2 + 75 * cos(angle2);
    let y2 = height / 2 + 75 * sin(angle2);

    let x3 = width / 2 + 100 * cos(angle3);
    let y3 = height / 2 + 100 * sin(angle3);

    fill(255);
    ellipse(x1, y1, 10, 10);
    ellipse(x2, y2, 10, 10);
    ellipse(x3, y3, 10, 10);

    stroke(255);
    strokeWeight(2);
    noFill();
    beginShape();
    vertex(x1, y1);
    vertex(x2, y2);
    vertex(x3, y3);
    endShape(CLOSE);
}