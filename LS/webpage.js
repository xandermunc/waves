let stars = [];

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("stars");

    for (let i = 0; i < 100; i++) {
        stars.push({
            x: random(width),
            y: random(height),
            size: 1
        });
    }
}

function draw() {
    fill(255);
    noStroke();
    for (let star of stars) {
        circle(star.x, star.y, star.size);
    }
}
