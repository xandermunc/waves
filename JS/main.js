var rectSize = 10;
var gridSize = 10;
var gridAmount = 4;
var inc = 0.1;
var index = 3;
var previousIndex = index;
var animate = false;

function setup() {
    createCanvas(innerWidth, innerHeight, SVG);
    frameRate(4);
}

function draw() {
    background('#e1e1e1');
    resetMatrix();
    translate(innerWidth / 2 - gridAmount / 2 * gridSize * rectSize, innerHeight / 2 - gridAmount / 2 * gridSize * rectSize);

    var gIndex = [
        function (g, h) { // 0
            let rIndex = floor(random(4));
            let offset = random(1000);
            for (var i = 0; i < gridSize; i++) {
                for (var j = 0; j < gridSize; j++) {
                    let nTypes = [
                        noise(offset + i * inc, j * inc) * 255,
                        noise(offset + i * 1, j * 1) * 255,
                        noise(offset + i) * 255,
                        noise(offset + j) * 255
                    ];
                    noStroke();
                    fill(nTypes[rIndex], nTypes[rIndex], nTypes[rIndex]);
                    rect(i * rectSize + g * gridSize * rectSize, j * rectSize + h * gridSize * rectSize, rectSize, rectSize);
                }
            }
        },
        function (g, h) { // 1
            noStroke();
            fill(random(255));
            rect(g * rectSize * gridSize, h * rectSize * gridSize, rectSize * gridSize, rectSize * gridSize);
        },
        function (g, h) { // 2
            noStroke();
            fill(random(255), random(255), random(255));
            rect(g * rectSize * gridSize, h * rectSize * gridSize, rectSize * gridSize, rectSize * gridSize);
        },
        function (g, h) { // 3
            let rIndex = floor(random(3));
            gIndex[rIndex](g, h);
        }

    ];

    for (let g = 0; g < gridAmount; g++) {
        for (let h = 0; h < gridAmount; h++) {
            gIndex[index](g, h);
        }
    }

    if (!animate) {
        noLoop();
    }
}

function keyPressed() {
    if (key === 's') {
        save('export.svg')
    } else if (key === 'r') {
        redraw();
    } else if (key === '0') {
        index = 0;
    } else if (key === '1') {
        index = 1;
    } else if (key === '2') {
        index = 2;
    } else if (key === '3') {
        index = 3;
    } else if (key === 'l') {
        animate = !animate;
        if (!animate) {
            noLoop();
        } else {
            loop();
        }
    } else if (key === 't') {
        rectSize -= 1;
        redraw();
    } else if (key === 'y') {
        rectSize += 1;
        redraw();
    } else if (key === 'u') {
        gridSize -= 1;
        redraw();
    } else if (key === 'i') {
        gridSize += 1;
        redraw();
    } else if (key === 'o') {
        gridAmount -= 1;
        redraw();
    } else if (key === 'p') {
        gridAmount += 1;
        redraw();
    }
}

setInterval(() => {
    if (index !== previousIndex) {
        previousIndex = index;
        redraw();
    }
}, 100);