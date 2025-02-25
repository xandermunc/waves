let inc = 0.1;
let scl = 50;
var rectSize = 75;
var gridAmount = 6;
let cols, rows;
let detailSlider;
let gridAmountSlider;
let canvas;
let calculatedCenter;
let redSliderValue = 0;
let greenSliderValue = 0;
let blueSliderValue = 0;

function keyPressed() {
    if (key === 'p') {
        gridAmount += 1;
        updateCanvasSize();
    } else if (key === 'o') {
        gridAmount -= 1;
        updateCanvasSize();
    } else if (key === 'r') {
        newSeed();
    }
}

function newSeed() {
    noiseSeed(millis());
    redraw();
}

function setup() {
    updateCanvasSize();
    textAlign(CENTER, CENTER);
    detailSlider = document.getElementById('detail-slider');
    gridAmountSlider = document.getElementById('grid-amount-slider');
    noiseDetailNumber = document.getElementById('noise-detail-number');
    gridAmountNumber = document.getElementById('grid-amount-number');

    gridAmountNumber.textContent = gridAmountSlider.value;
    noiseDetailNumber.textContent = parseFloat(detailSlider.value).toFixed(2);

    gridAmountSlider.addEventListener('input', function () {
        gridAmount = parseInt(gridAmountSlider.value);
        gridAmountNumber.textContent = gridAmount;
        updateCanvasSize();
    });

    detailSlider.addEventListener('input', function () {
        detailValue = parseFloat(detailSlider.value);
        noiseDetailNumber.textContent = detailValue.toFixed(2);
    });

    redSlider = document.getElementById('red-slider');
    redNumber = document.getElementById('red-number');
    redNumber.textContent = parseFloat(redSlider.value).toFixed(2);
    redSlider.addEventListener('input', function () {
        if (document.getElementById('red-checkbox').checked) {
            redSliderValue = parseFloat(redSlider.value);
            redNumber.textContent = redSliderValue.toFixed(2);
        }
    });

    greenSlider = document.getElementById('green-slider');
    greenNumber = document.getElementById('green-number');
    greenNumber.textContent = parseFloat(greenSlider.value).toFixed(2);
    greenSlider.addEventListener('input', function () {
        if (document.getElementById('green-checkbox').checked) {
            greenSliderValue = parseFloat(greenSlider.value);
            greenNumber.textContent = greenSliderValue.toFixed(2);
        }
    });

    blueSlider = document.getElementById('blue-slider');
    blueNumber = document.getElementById('blue-number');
    blueNumber.textContent = parseFloat(blueSlider.value).toFixed(2);
    blueSlider.addEventListener('input', function () {
        if (document.getElementById('blue-checkbox').checked) {
            blueSliderValue = parseFloat(blueSlider.value);
            blueNumber.textContent = blueSliderValue.toFixed(2);
        }
    });
}

function updateCanvasSize() {
    canvas = createCanvas((rectSize * gridAmount), (rectSize * gridAmount));
    canvas.parent('canvas');
    canvas.mouseMoved(() => getHexColor(mouseX, mouseY));
    cols = floor(width / scl);
    rows = floor(height / scl);
    calculatedCenter = `calc(50vh - ${(rectSize * gridAmount) / 2}px)`;
    document.getElementById('canvas').style.marginTop = calculatedCenter;
    document.getElementById('redraw-button').addEventListener('click', newSeed);
}

function draw() {
    background(255);
    inc = parseFloat(detailSlider.value);

    let yoff = 0; // grid 
    for (let y = 0; y < gridAmount; y++) {
        let xoff = 0;
        for (let x = 0; x < gridAmount; x++) {
            let noiseValue = noise(xoff, yoff) * 255;
            let redNoiseValue = noise(xoff + redSliderValue, yoff + redSliderValue) * 255;
            let greenNoiseValue = noise(xoff + greenSliderValue, yoff + greenSliderValue) * 255;
            let blueNoiseValue = noise(xoff + blueSliderValue, yoff + blueSliderValue) * 255;
            fill(redNoiseValue, greenNoiseValue, blueNoiseValue);
            noStroke();
            rect(x * rectSize, y * rectSize, rectSize, rectSize);
            fill(0);
            textSize((rectSize) / 5);
            if (document.getElementById('value').checked) {
                text(nf(noiseValue, 1, 2), x * (rectSize) + (rectSize) / 2, y * (rectSize) + (rectSize) / 2);
            }
            xoff += inc;
        }
        yoff += inc;
    }

    if (document.getElementById('horizontal').checked) {
        stroke(0);
        noFill();
        yoff = 0;
        for (let y = 0; y < gridAmount; y++) { // horizontal
            let xoff = 0;
            let xoffRed = xoff;
            let xoffGreen = xoff;
            let xoffBlue = xoff;
            for (let x = 0; x < gridAmount; x++) {
                let noiseValue = noise(xoff, yoff) * 255;
                // let midNoiseValue = noise(xoff + (inc / 2), yoff) * 255;
                let redNoiseValue = noise(xoff + redSliderValue, yoff + redSliderValue) * 255;
                let greenNoiseValue = noise(xoff + greenSliderValue, yoff + greenSliderValue) * 255;
                let blueNoiseValue = noise(xoff + blueSliderValue, yoff + blueSliderValue) * 255;
                let circleX = x * (rectSize);
                let circleY = y * (rectSize) + (rectSize) - (noiseValue / 255) * (rectSize);
                let circleYRed = y * (rectSize) + (rectSize) - (redNoiseValue / 255) * (rectSize);
                let circleYGreen = y * (rectSize) + (rectSize) - (greenNoiseValue / 255) * (rectSize);
                let circleYBlue = y * (rectSize) + (rectSize) - (blueNoiseValue / 255) * (rectSize);

                if (document.getElementById('red-checkbox').checked) {
                    redSliderValue = parseFloat(redSlider.value);
                    redNumber.textContent = parseFloat(redSlider.value).toFixed(2);
                    beginShape();
                    for (let i = 0; i <= rectSize; i++) {
                        redNoiseValue = noise(xoffRed + redSliderValue, yoff + redSliderValue) * 255;
                        noFill();
                        vertex(x * rectSize + i, y * rectSize + (rectSize - (redNoiseValue / 255) * rectSize));
                        xoffRed += inc / rectSize;
                    }
                    endShape();
                    fill('#f30');
                    ellipse(circleX, circleYRed, (rectSize) / 10, (rectSize) / 10);
                } else {
                    redSliderValue = 0;
                    redNumber.textContent = parseFloat(0).toFixed(2);
                }

                if (document.getElementById('green-checkbox').checked) {
                    greenSliderValue = parseFloat(greenSlider.value);
                    greenNumber.textContent = parseFloat(greenSlider.value).toFixed(2);
                    beginShape();
                    for (let i = 0; i <= rectSize; i++) {
                        greenNoiseValue = noise(xoffGreen + greenSliderValue, yoff + greenSliderValue) * 255;
                        noFill();
                        vertex(x * rectSize + i, y * rectSize + (rectSize - (greenNoiseValue / 255) * rectSize));
                        xoffGreen += inc / rectSize;
                    }
                    endShape();
                    fill('#090');
                    ellipse(circleX, circleYGreen, (rectSize) / 10, (rectSize) / 10);
                } else {
                    greenSliderValue = 0;
                    greenNumber.textContent = parseFloat(0).toFixed(2);
                }

                if (document.getElementById('blue-checkbox').checked) {
                    blueSliderValue = parseFloat(blueSlider.value);
                    blueNumber.textContent = parseFloat(blueSlider.value).toFixed(2);
                    beginShape();
                    for (let i = 0; i <= rectSize; i++) {
                        blueNoiseValue = noise(xoffBlue + blueSliderValue, yoff + blueSliderValue) * 255;
                        noFill();
                        vertex(x * rectSize + i, y * rectSize + (rectSize - (blueNoiseValue / 255) * rectSize));
                        xoffBlue += inc / rectSize;
                    }
                    endShape();
                    fill('#09f');
                    ellipse(circleX, circleYBlue, (rectSize) / 10, (rectSize) / 10);
                } else {
                    blueSliderValue = 0;
                    blueNumber.textContent = parseFloat(0).toFixed(2);
                }

                beginShape(); // intensity noise wave
                for (let i = 0; i <= rectSize; i++) {
                    noiseValue = noise(xoff, yoff) * 255;
                    noFill();
                    vertex(x * rectSize + i, y * rectSize + (rectSize - (noiseValue / 255) * rectSize));
                    xoff += inc / rectSize;
                }
                endShape();
                fill('#e1e1e1');
                ellipse(circleX, circleY, (rectSize) / 10, (rectSize) / 10);
            }
            yoff += inc;
        }
    }

    if (document.getElementById('vertical').checked) {
        stroke(0);
        noFill();
        xoff = 0;
        for (let x = 0; x < gridAmount; x++) { // vertical
            let yoff = 0;
            let yoffRed = yoff;
            let yoffGreen = yoff;
            let yoffBlue = yoff;
            for (let y = 0; y < gridAmount; y++) {
                let noiseValue = noise(xoff, yoff) * 255;
                // let midNoiseValue = noise(xoff, yoff + (inc / 2)) * 255;
                let redNoiseValue = noise(xoff + redSliderValue, yoff + redSliderValue) * 255;
                let greenNoiseValue = noise(xoff + greenSliderValue, yoff + greenSliderValue) * 255;
                let blueNoiseValue = noise(xoff + blueSliderValue, yoff + blueSliderValue) * 255;
                let circleX = x * (rectSize) + (rectSize) - (noiseValue / 255) * (rectSize);
                let circleY = y * (rectSize);
                let circleXRed = x * (rectSize) + (rectSize) - (redNoiseValue / 255) * (rectSize);
                let circleXGreen = x * (rectSize) + (rectSize) - (greenNoiseValue / 255) * (rectSize);
                let circleXBlue = x * (rectSize) + (rectSize) - (blueNoiseValue / 255) * (rectSize);

                if (document.getElementById('red-checkbox').checked) {
                    redSliderValue = parseFloat(redSlider.value);
                    redNumber.textContent = parseFloat(redSlider.value).toFixed(2);
                    beginShape();
                    for (let i = 0; i <= rectSize; i++) {
                        redNoiseValue = noise(xoff + redSliderValue, yoffRed + redSliderValue) * 255;
                        noFill();
                        vertex(x * rectSize + (rectSize - (redNoiseValue / 255) * rectSize), y * rectSize + i);
                        yoffRed += inc / rectSize;
                    }
                    endShape();
                    fill('#f30');
                    ellipse(circleXRed, circleY, (rectSize) / 10, (rectSize) / 10);
                } else {
                    redSliderValue = 0;
                    redNumber.textContent = parseFloat(0).toFixed(2);
                }

                if (document.getElementById('green-checkbox').checked) {
                    greenSliderValue = parseFloat(greenSlider.value);
                    greenNumber.textContent = parseFloat(greenSlider.value).toFixed(2);
                    beginShape();
                    for (let i = 0; i <= rectSize; i++) {
                        greenNoiseValue = noise(xoff + greenSliderValue, yoffGreen + greenSliderValue) * 255;
                        noFill();
                        vertex(x * rectSize + (rectSize - (greenNoiseValue / 255) * rectSize), y * rectSize + i);
                        yoffGreen += inc / rectSize;
                    }
                    endShape();
                    fill('#090');
                    ellipse(circleXGreen, circleY, (rectSize) / 10, (rectSize) / 10);
                } else {
                    greenSliderValue = 0;
                    greenNumber.textContent = parseFloat(0).toFixed(2);
                }

                if (document.getElementById('blue-checkbox').checked) {
                    blueSliderValue = parseFloat(blueSlider.value);
                    blueNumber.textContent = parseFloat(blueSlider.value).toFixed(2);
                    beginShape();
                    for (let i = 0; i <= rectSize; i++) {
                        blueNoiseValue = noise(xoff + blueSliderValue, yoffBlue + blueSliderValue) * 255;
                        noFill();
                        vertex(x * rectSize + (rectSize - (blueNoiseValue / 255) * rectSize), y * rectSize + i);
                        yoffBlue += inc / rectSize;
                    }
                    endShape();
                    fill('#09f');
                    ellipse(circleXBlue, circleY, (rectSize) / 10, (rectSize) / 10);
                } else {
                    blueSliderValue = 0;
                    blueNumber.textContent = parseFloat(0).toFixed(2);
                }

                beginShape();
                for (let i = 0; i <= rectSize; i++) {
                    noiseValue = noise(xoff, yoff) * 255;
                    noFill();
                    vertex(x * rectSize + (rectSize - (noiseValue / 255) * rectSize), y * rectSize + i);
                    yoff += inc / (rectSize);
                }
                endShape();

                fill('#e1e1e1');
                ellipse(circleX, circleY, (rectSize) / 10, (rectSize) / 10);
            }
            xoff += inc;
        }
    }

    // if (document.getElementById('vertical').checked) {
    //     stroke(0);
    //     noFill();
    //     yoff = 0;
    //     for (let x = 0; x < gridAmount; y++) { // horizontal
    //         let xoff = 0;
    //         let xoffRed = xoff;
    //         let xoffGreen = xoff;
    //         let xoffBlue = xoff;
    //         for (let y = 0; y < gridAmount; x++) {
    //             let noiseValue = noise(xoff, yoff) * 255;
    //             // let midNoiseValue = noise(xoff + (inc / 2), yoff) * 255;
    //             let redNoiseValue = noise(xoff + redSliderValue, yoff + redSliderValue) * 255;
    //             let greenNoiseValue = noise(xoff + greenSliderValue, yoff + greenSliderValue) * 255;
    //             let blueNoiseValue = noise(xoff + blueSliderValue, yoff + blueSliderValue) * 255;
    //             let circleX = x * (rectSize) + (rectSize) - (noiseValue / 255) * (rectSize);
    //             let circleY = y * (rectSize);
    //             let circleXRed = y * (rectSize) + (rectSize) - (redNoiseValue / 255) * (rectSize);
    //             let circleXGreen = y * (rectSize) + (rectSize) - (greenNoiseValue / 255) * (rectSize);
    //             let circleXBlue = y * (rectSize) + (rectSize) - (blueNoiseValue / 255) * (rectSize);

    //             if (document.getElementById('red-checkbox').checked) {
    //                 redSliderValue = parseFloat(redSlider.value);
    //                 redNumber.textContent = parseFloat(redSlider.value).toFixed(2);
    //                 beginShape();
    //                 for (let i = 0; i <= rectSize; i++) {
    //                     redNoiseValue = noise(xoffRed + redSliderValue, yoff + redSliderValue) * 255;
    //                     noFill();
    //                     vertex(x * rectSize + i, y * rectSize + (rectSize - (redNoiseValue / 255) * rectSize));
    //                     xoffRed += inc / rectSize;
    //                 }
    //                 endShape();
    //                 fill('#f30');
    //                 ellipse(circleXRed, circleY, (rectSize) / 10, (rectSize) / 10);
    //             } else {
    //                 redSliderValue = 0;
    //                 redNumber.textContent = parseFloat(0).toFixed(2);
    //             }

    //             if (document.getElementById('green-checkbox').checked) {
    //                 greenSliderValue = parseFloat(greenSlider.value);
    //                 greenNumber.textContent = parseFloat(greenSlider.value).toFixed(2);
    //                 beginShape(); 
    //                 for (let i = 0; i <= rectSize; i++) {
    //                     greenNoiseValue = noise(xoffGreen + greenSliderValue, yoff + greenSliderValue) * 255;
    //                     noFill();
    //                     vertex(x * rectSize + i, y * rectSize + (rectSize - (greenNoiseValue / 255) * rectSize));
    //                     xoffGreen += inc / rectSize;
    //                 }
    //                 endShape();
    //                 fill('#090');
    //                 ellipse(circleXGreen, circleY, (rectSize) / 10, (rectSize) / 10);
    //             } else {
    //                 greenSliderValue = 0;
    //                 greenNumber.textContent = parseFloat(0).toFixed(2);
    //             }

    //             if (document.getElementById('blue-checkbox').checked) {
    //                 blueSliderValue = parseFloat(blueSlider.value);
    //                 blueNumber.textContent = parseFloat(blueSlider.value).toFixed(2);
    //                 beginShape(); 
    //                 for (let i = 0; i <= rectSize; i++) {
    //                     blueNoiseValue = noise(xoffBlue + blueSliderValue, yoff + blueSliderValue) * 255;
    //                     noFill();
    //                     vertex(x * rectSize + i, y * rectSize + (rectSize - (blueNoiseValue / 255) * rectSize));
    //                     xoffBlue += inc / rectSize;
    //                 }
    //                 endShape();
    //                 fill('#09f');
    //                 ellipse(circleXBlue, circleY, (rectSize) / 10, (rectSize) / 10);
    //             } else {
    //                 blueSliderValue = 0;
    //                 blueNumber.textContent = parseFloat(0).toFixed(2);
    //             }

    //             beginShape(); // intensity noise wave
    //             for (let i = 0; i <= rectSize; i++) {
    //                 noiseValue = noise(xoff, yoff) * 255;
    //                 noFill();
    //                 vertex(x * rectSize + i, y * rectSize + (rectSize - (noiseValue / 255) * rectSize));
    //                 xoff += inc / rectSize;
    //             }
    //             endShape();
    //             fill('#e1e1e1');
    //             ellipse(circleX, circleY, (rectSize) / 10, (rectSize) / 10);
    //         }
    //         yoff += inc;
    //     }
    // }
}

function getHexColor(x, y) {
    let col = get(x, y); 
    let red = col[0];
    let green = col[1];
    let blue = col[2];

    let hexColor = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
    
    document.getElementById('hex').textContent = hexColor; 
    document.getElementById('hex-dot').style.backgroundColor = hexColor; 
}


function setTargetDivPosition() {
    const menuControls = document.querySelector('.menu-controls');
    const targetDiv = document.querySelector('.menu-hex');
    const menuTop = menuControls.getBoundingClientRect().top + window.scrollY;
    targetDiv.style.position = 'absolute'; 
    targetDiv.style.top = `${menuTop}px`; 
}

window.addEventListener('load', setTargetDivPosition);
window.addEventListener('resize', setTargetDivPosition); 
