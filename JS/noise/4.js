let inc = 0.1;
let scl = 50;
var rectSizeConst = 75
var rectSize = rectSizeConst;
var gridSize = 6;
var step = 1;
var offset = 1;
let cols, rows;
let detailSlider;
let gridSizeSlider;
let stepSlider;
let offsetSlider;
let canvas;
let calculatedCenter;
let redSliderValue = 0;
let greenSliderValue = 0;
let blueSliderValue = 0;
let rectChecked = true;
let ellipseChecked = false;
let triangleChecked = false;
let textChecked = false;
let triangleRotateInput = 0;
let triangleRotateCheckboxChanges = 0;
let textInputString = [];
let textNoiseValue;
let noiseValue;

function newSeed() {
    noiseSeed(millis());
    redraw();
}

function exportPNG() {
    save('export.png');
}

function updateBackgroundAlpha(gridSize) {
    let menuControls = document.querySelector('.menu-controls');
    let menuHex = document.querySelector('.menu-hex');
    let menuText = document.querySelector('.menu-text');
    if (gridSize >= 12 && gridSize <= 20) {
        let alpha = 1 - (gridSize - 12) * 0.1;
        menuControls.style.backgroundColor = `rgba(30, 30, 30, ${alpha})`;
        menuHex.style.backgroundColor = `rgba(30, 30, 30, ${alpha})`;
        menuText.style.backgroundColor = `rgba(30, 30, 30, ${alpha})`;
    }
}

function checkTypeCheckboxes() {
    if (triangleRotateCheckboxChanges === 0) {
        document.getElementById('triangle-rotate-checkbox').addEventListener('change', function () {
            triangleRotateInput = 1;
            triangleRotateCheckboxChanges = 1;
        });
    } else if (triangleRotateCheckboxChanges === 1) {
        document.getElementById('triangle-rotate-checkbox').addEventListener('change', function () {
            triangleRotateInput = 2;
            triangleRotateCheckboxChanges = 2;
        });
    } else if (triangleRotateCheckboxChanges === 2) {
        document.getElementById('triangle-rotate-checkbox').addEventListener('change', function () {
            triangleRotateInput = 3;
            triangleRotateCheckboxChanges = 3;
        });
    } else if (triangleRotateCheckboxChanges === 3) {
        document.getElementById('triangle-rotate-checkbox').addEventListener('change', function () {
            triangleRotateInput = 0;
            triangleRotateCheckboxChanges = 0;
        });
    }

    document.getElementById('rect-checkbox').addEventListener('change', function () {
        if (this.checked) {
            document.getElementById('ellipse-checkbox').checked = false;
            document.getElementById('triangle-checkbox').checked = false;
            document.getElementById('text-checkbox').checked = false;
            rectChecked = true;
            ellipseChecked = false;
            triangleChecked = false;
            textChecked = false;
        }
    });

    document.getElementById('ellipse-checkbox').addEventListener('change', function () {
        if (this.checked) {
            document.getElementById('rect-checkbox').checked = false;
            document.getElementById('triangle-checkbox').checked = false;
            document.getElementById('text-checkbox').checked = false;
            ellipseChecked = true;
            rectChecked = false;
            triangleChecked = false;
            textChecked = false;
        }
    });

    document.getElementById('triangle-checkbox').addEventListener('change', function () {
        if (this.checked) {
            document.getElementById('rect-checkbox').checked = false;
            document.getElementById('ellipse-checkbox').checked = false;
            document.getElementById('text-checkbox').checked = false;
            triangleChecked = true;
            rectChecked = false;
            ellipseChecked = false;
            textChecked = false;
        }
    });

    document.getElementById('text-checkbox').addEventListener('change', function () {
        if (this.checked) {
            document.getElementById('rect-checkbox').checked = false;
            document.getElementById('ellipse-checkbox').checked = false;
            document.getElementById('triangle-checkbox').checked = false;
            textChecked = true;
            triangleChecked = false;
            rectChecked = false;
            ellipseChecked = false;
        }
    });
}

function setup() {
    updateCanvasSize();
    textAlign(CENTER, CENTER);
    detailSlider = document.getElementById('detail-slider');
    noiseDetailNumber = document.getElementById('noise-detail-number');
    gridSizeSlider = document.getElementById('grid-size-slider');
    gridSizeNumber = document.getElementById('grid-size-number');
    stepSlider = document.getElementById('step-slider');
    stepNumber = document.getElementById('step-number');
    offsetSlider = document.getElementById('offset-slider');
    offsetNumber = document.getElementById('offset-number');

    noiseDetailNumber.textContent = parseFloat(detailSlider.value).toFixed(2);
    gridSizeNumber.textContent = gridSizeSlider.value;
    stepNumber.textContent = stepSlider.value;
    offsetNumber.textContent = offsetSlider.value;

    detailSlider.addEventListener('input', function () {
        detailValue = parseFloat(detailSlider.value);
        noiseDetailNumber.textContent = detailValue.toFixed(2);
    });

    gridSizeSlider.addEventListener('input', function () {
        gridSize = parseInt(gridSizeSlider.value);
        gridSizeNumber.textContent = gridSize;
        updateCanvasSize();
    });

    stepSlider.addEventListener('input', function () {
        step = parseInt(stepSlider.value);
        stepNumber.textContent = step;
        updateCanvasSize();
        rectSize = rectSizeConst / step;
    });

    offsetSlider.addEventListener('input', function () {
        offset = parseInt(offsetSlider.value);
        offsetNumber.textContent = offset;
        updateCanvasSize();
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
    canvas = createCanvas(rectSizeConst * gridSize, rectSizeConst * gridSize);
    canvas.parent('canvas');
    canvas.mouseMoved(() => getHexColor(mouseX, mouseY));
    cols = floor(width / scl);
    rows = floor(height / scl);
    calculatedCenter = `calc(50vh - ${(rectSizeConst * gridSize) / 2}px)`;
    document.getElementById('canvas').style.marginTop = calculatedCenter;
    document.getElementById('redraw-button').addEventListener('click', newSeed);
    document.getElementById('export-button').addEventListener('click', exportPNG);
    updateBackgroundAlpha(gridSize)
}

function draw() {
    checkCheckBoxes();
    checkTypeCheckboxes();
    background('#e1e1e1');
    inc = parseFloat(detailSlider.value);

    for (let g = 0; g < step; g++) {
        for (let h = 0; h < step; h++) {
            let yoff = h * offset;
            for (let y = 0; y < gridSize; y++) {
                let xoff = g * offset;
                for (let x = 0; x < gridSize; x++) {
                    const inputField = document.querySelector('.text-input');
                    const textInputString = inputField.value.replace(/\s+/g, '').split('');
                    let noiseValue = noise(xoff, yoff) * 255;
                    textNoiseValue = floor(map(noiseValue, 0, 255, 0, textInputString.length));
                    console.log(textNoiseValue);
                    let redNoiseValue = noise(xoff + redSliderValue, yoff + redSliderValue) * 255;
                    let greenNoiseValue = noise(xoff + greenSliderValue, yoff + greenSliderValue) * 255;
                    let blueNoiseValue = noise(xoff + blueSliderValue, yoff + blueSliderValue) * 255;
                    fill(redNoiseValue, greenNoiseValue, blueNoiseValue);
                    noStroke();
                    if (rectChecked) {
                        rect((g * gridSize + x) * rectSize, (h * gridSize + y) * rectSize, rectSize, rectSize);
                    } else if (ellipseChecked) {
                        ellipse((g * gridSize + x) * rectSize + rectSize / 2, (h * gridSize + y) * rectSize + rectSize / 2, rectSize, rectSize);
                    } else if (triangleChecked) {
                        push();
                        translate((g * gridSize + x) * rectSize + rectSize / 2, (h * gridSize + y) * rectSize + rectSize / 2);
                        rotate(triangleRotateInput * PI / 2);
                        let x1 = -rectSize / 2;
                        let y1 = -rectSize / 2;
                        let x2 = rectSize / 2;
                        let y2 = -rectSize / 2;
                        let x3 = -rectSize / 2;
                        let y3 = rectSize / 2;
                        triangle(x1, y1, x2, y2, x3, y3);
                        pop();
                    } else if (textChecked) {
                        push();
                        fill(0);
                        textSize(rectSize);
                        // textFont(funnelSans);
                        text(textInputString[textNoiseValue], (g * gridSize + x) * rectSize + rectSize / 2, (h * gridSize + y) * rectSize + rectSize / 2);
                        pop();
                    }
                    fill(0);
                    textSize((rectSize) / 5);
                    if (document.getElementById('value').checked) {
                        text(nf(noiseValue, 1, 2), (g * gridSize + x) * rectSize + (rectSize) / 2, (h * gridSize + y) * rectSize + (rectSize) / 2);
                    }
                    xoff += inc;
                }
                yoff += inc;
            }
        }
    }

    if (document.getElementById('horizontal').checked) {
        stroke(0);
        noFill();
        for (let g = 0; g < step; g++) {
            for (let h = 0; h < step; h++) {
                let yoff = h * offset;
                for (let y = 0; y < gridSize; y++) {
                    let xoff = g * offset;
                    let xoffRed = xoff;
                    let xoffGreen = xoff;
                    let xoffBlue = xoff;
                    for (let x = 0; x < gridSize; x++) {
                        let noiseValue = noise(xoff, yoff) * 255;
                        let redNoiseValue = noise(xoff + redSliderValue, yoff + redSliderValue) * 255;
                        let greenNoiseValue = noise(xoff + greenSliderValue, yoff + greenSliderValue) * 255;
                        let blueNoiseValue = noise(xoff + blueSliderValue, yoff + blueSliderValue) * 255;
                        let circleX = (g * gridSize + x) * rectSize;
                        let circleY = (h * gridSize + y) * rectSize + (rectSize) - (noiseValue / 255) * (rectSize);
                        let circleYRed = (h * gridSize + y) * rectSize + (rectSize) - (redNoiseValue / 255) * (rectSize);
                        let circleYGreen = (h * gridSize + y) * rectSize + (rectSize) - (greenNoiseValue / 255) * (rectSize);
                        let circleYBlue = (h * gridSize + y) * rectSize + (rectSize) - (blueNoiseValue / 255) * (rectSize);


                        if (document.getElementById('red-checkbox').checked) {
                            redSliderValue = parseFloat(redSlider.value);
                            redNumber.textContent = parseFloat(redSlider.value).toFixed(2);
                            beginShape();
                            for (let i = 0; i <= rectSize; i++) {
                                redNoiseValue = noise(xoffRed + redSliderValue, yoff + redSliderValue) * 255;
                                noFill();
                                vertex((g * gridSize + x) * rectSize + i, (h * gridSize + y) * rectSize + (rectSize - (redNoiseValue / 255) * rectSize));
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
                                vertex((g * gridSize + x) * rectSize + i, (h * gridSize + y) * rectSize + (rectSize - (greenNoiseValue / 255) * rectSize));
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
                                vertex((g * gridSize + x) * rectSize + i, (h * gridSize + y) * rectSize + (rectSize - (blueNoiseValue / 255) * rectSize));
                                xoffBlue += inc / rectSize;
                            }
                            endShape();
                            fill('#09f');
                            ellipse(circleX, circleYBlue, (rectSize) / 10, (rectSize) / 10);
                        } else {
                            blueSliderValue = 0;
                            blueNumber.textContent = parseFloat(0).toFixed(2);
                        }

                        beginShape();
                        for (let i = 0; i <= rectSize; i++) {
                            noiseValue = noise(xoff, yoff) * 255;
                            noFill();
                            vertex((g * gridSize + x) * rectSize + i, (h * gridSize + y) * rectSize + (rectSize - (noiseValue / 255) * rectSize));
                            xoff += inc / rectSize;
                        }
                        endShape();
                        fill('#e1e1e1');
                        ellipse(circleX, circleY, (rectSize) / 10, (rectSize) / 10);
                    }
                    yoff += inc;
                }
            }
        }
    }

    if (document.getElementById('vertical').checked) {
        stroke(0);
        noFill();
        for (let g = 0; g < step; g++) {
            for (let h = 0; h < step; h++) {
                let xoff = g * offset;
                for (let x = 0; x < gridSize; x++) { // vertical
                    let yoff = h * offset;
                    let yoffRed = yoff;
                    let yoffGreen = yoff;
                    let yoffBlue = yoff;
                    for (let y = 0; y < gridSize; y++) {
                        let noiseValue = noise(xoff, yoff) * 255;
                        // let midNoiseValue = noise(xoff, yoff + (inc / 2)) * 255;
                        let redNoiseValue = noise(xoff + redSliderValue, yoff + redSliderValue) * 255;
                        let greenNoiseValue = noise(xoff + greenSliderValue, yoff + greenSliderValue) * 255;
                        let blueNoiseValue = noise(xoff + blueSliderValue, yoff + blueSliderValue) * 255;
                        let circleY = (h * gridSize + y) * rectSize;
                        let circleX = (g * gridSize + x) * rectSize + (rectSize) - (noiseValue / 255) * (rectSize);
                        let circleXRed = (g * gridSize + x) * rectSize + (rectSize) - (redNoiseValue / 255) * (rectSize);
                        let circleXGreen = (g * gridSize + x) * rectSize + (rectSize) - (greenNoiseValue / 255) * (rectSize);
                        let circleXBlue = (g * gridSize + x) * rectSize + (rectSize) - (blueNoiseValue / 255) * (rectSize);

                        if (document.getElementById('red-checkbox').checked) {
                            redSliderValue = parseFloat(redSlider.value);
                            redNumber.textContent = parseFloat(redSlider.value).toFixed(2);
                            beginShape();
                            for (let i = 0; i <= rectSize; i++) {
                                redNoiseValue = noise(xoff + redSliderValue, yoffRed + redSliderValue) * 255;
                                noFill();
                                vertex((g * gridSize + x) * rectSize + (rectSize - (redNoiseValue / 255) * rectSize), (h * gridSize + y) * rectSize + i);
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
                                vertex((g * gridSize + x) * rectSize + (rectSize - (greenNoiseValue / 255) * rectSize), (h * gridSize + y) * rectSize + i);
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
                                vertex((g * gridSize + x) * rectSize + (rectSize - (blueNoiseValue / 255) * rectSize), (h * gridSize + y) * rectSize + i);
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
                            vertex((g * gridSize + x) * rectSize + (rectSize - (noiseValue / 255) * rectSize), (h * gridSize + y) * rectSize + i);
                            yoff += inc / (rectSize);
                        }
                        endShape();

                        fill('#e1e1e1');
                        ellipse(circleX, circleY, (rectSize) / 10, (rectSize) / 10);
                    }
                    xoff += inc;
                }
            }
        }
    }
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

function checkCheckBoxes() {
    if (document.getElementById('red-checkbox').checked) {
        redSliderValue = parseFloat(redSlider.value);
        redNumber.textContent = parseFloat(redSlider.value).toFixed(2);
    } else {
        redSliderValue = 0;
        redNumber.textContent = parseFloat(0).toFixed(2);
    }

    if (document.getElementById('green-checkbox').checked) {
        greenSliderValue = parseFloat(greenSlider.value);
        greenNumber.textContent = parseFloat(greenSlider.value).toFixed(2);
    } else {
        greenSliderValue = 0;
        greenNumber.textContent = parseFloat(0).toFixed(2);
    }

    if (document.getElementById('blue-checkbox').checked) {
        blueSliderValue = parseFloat(blueSlider.value);
        blueNumber.textContent = parseFloat(blueSlider.value).toFixed(2);
    } else {
        blueSliderValue = 0;
        blueNumber.textContent = parseFloat(0).toFixed(2);
    }
}