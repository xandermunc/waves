let stars = [];
let numStars = 150; 
let angleX = 0; 
let angleY = 0; 
let dragging = false;
let lastMouseX;
let lastMouseY; 
let zoom = 500;
let boxSize = 500;
let opacitySlider;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();
    
    opacitySlider = createSlider(0, 255, 100);
    opacitySlider.position(10, 10);
    
    for (let i = 0; i < numStars; i++) {
        stars.push(createVector(random(-boxSize / 2, boxSize / 2), random(-boxSize / 2, boxSize / 2), random(-boxSize / 2, boxSize / 2)));
    }
}

function draw() {
    background('#0A0A28');
    translate(0, 0, -zoom);

    if (dragging) {
        let deltaX = mouseX - lastMouseX;
        let deltaY = mouseY - lastMouseY;
        angleX += deltaY * 0.01; 
        angleY += deltaX * 0.01; 
    }

    rotateX(angleX);
    rotateY(angleY);

    for (let star of stars) {
        push();
        translate(star.x, star.y, star.z);
        fill(255); 
        sphere(3); 
        pop();
    }

    let opacity = opacitySlider.value();

    // Draw the box
    push();
    noFill();
    // fill(255, 0, 0, opacity);
    stroke(255);
    strokeWeight(2);
    box(boxSize);
    pop();

    // Draw planes on each face
    let halfSize = boxSize / 2;

    push();
    fill(0, 255, 0, opacity); // Green
    translate(0, 0, halfSize);
    plane(boxSize, boxSize);
    pop();

    push();
    fill(0, 0, 255, opacity); // Blue
    translate(0, 0, -halfSize);
    plane(boxSize, boxSize);
    pop();

    push();
    fill(255, 255, 0, opacity); // Yellow
    translate(halfSize, 0, 0);
    rotateY(HALF_PI);
    plane(boxSize, boxSize);
    pop();

    push();
    fill(255, 0, 255, opacity); // Magenta
    translate(-halfSize, 0, 0);
    rotateY(HALF_PI);
    plane(boxSize, boxSize);
    pop();

    push();
    fill(0, 255, 255, opacity); // Cyan
    translate(0, halfSize, 0);
    rotateX(HALF_PI);
    plane(boxSize, boxSize);
    pop();

    push();
    fill(255, 255, 255, opacity); // White
    translate(0, -halfSize, 0);
    rotateX(HALF_PI);
    plane(boxSize, boxSize);
    pop();
}

function mouseWheel(event) {
    zoom += event.delta * 0.5; 
    zoom = constrain(zoom, 100, 1000); 
    return false;
}

function mouseDragged() {
    angleY += (mouseX - pmouseX) * 0.01;
    angleX -= (mouseY - pmouseY) * 0.01;
}
