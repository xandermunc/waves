let angleX = 0;
let angleY = 0;
let zoom = 500;
let lastX, lastY;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    // ortho(-width / 2, width / 2, -height / 2, height / 2, 0.1, 10000); 
}

function draw() {
    background(20);

    translate(0, 0, -zoom);
    rotateX(angleX);
    rotateY(angleY);

    push();
    fill(100, 200, 255);
    stroke(255);
    strokeWeight(2);
    box(500);
    pop();
}

function mouseDragged() {
    angleY += (mouseX - pmouseX) * 0.01;
    angleX -= (mouseY - pmouseY) * 0.01;
}

function mouseWheel(event) {
    zoom += event.delta * 0.5;
    zoom = constrain(zoom, 100, 500);
}
