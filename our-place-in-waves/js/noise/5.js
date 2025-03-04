let inc = 0.1;
let scl = 50;
var rectSizeConst = 75;
var rectSizeConstSlotTwo = 75;
var rectSizeConstToggle = rectSizeConst;
var rectSize = rectSizeConst;
var rectSizeSlotTwo = rectSizeConstSlotTwo;
var gridSize = 6;
var gridSizeSlotTwo = 6;
var step = 1;
var stepSlotTwo = 1;
var offset = 0;
var offsetSlotTwo = 0;
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
let redSliderValueSlotTwo = 0;
let greenSliderValueSlotTwo = 0;
let blueSliderValueSlotTwo = 0;
let rectChecked = true;
let ellipseChecked = false;
let triangleChecked = false;
let textChecked = false;
let rectCheckedSlotTwo = true;
let ellipseCheckedSlotTwo = false;
let triangleCheckedSlotTwo = false;
let textCheckedSlotTwo = false;
let triangleRotateInput = 0;
let triangleRotateInputSlotTwo = 0;
let triangleRotateCheckboxChanges = 0;
let triangleRotateCheckboxChangesSlotTwo = 0;
let textInputString = [];
let textNoiseValue;
let noiseValue, noiseValueSlotTwo;
let slotOneToggle = true;
let slotTwoToggle = false;
let slotThreeToggle = false;
let gridSizeToggle = gridSize;

function newSeed() {
    noiseSeed(millis());
    redraw();
}

function exportPNG() {
    save('export.png');
}

function updateBackgroundAlpha() {
    const menuControls = document.querySelector('.menu-controls');
    const menuHex = document.querySelector('.menu-hex');
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    if (slotOneToggle) {
        if (gridSize >= 12 && gridSize <= 20) {
            let alpha = (gridSize - 12) * 0.15;
            let hue = Math.floor(alpha * 255);
            menuControls.style.color = `rgb(${hue}, ${hue}, ${hue})`;
            menuHex.style.color = `rgb(${hue}, ${hue}, ${hue})`;
            rangeInputs.forEach(input => {
                input.style.background = `rgb(${hue}, ${hue}, ${hue})`;
                input.style.setProperty('--thumb-color', `rgb(${hue}, ${hue}, ${hue})`);
                document.documentElement.style.setProperty('--thumb-color', `rgb(${hue}, ${hue}, ${hue})`);
            });
        } else if (gridSize < 12) {
            menuControls.style.color = '#1e1e1e';
            menuHex.style.color = '#1e1e1e';
            rangeInputs.forEach(input => {
                input.style.background = '#1e1e1e';
                input.style.setProperty('--thumb-color', '#1e1e1e');
                document.documentElement.style.setProperty('--thumb-color', '#1e1e1e');
            });
        }
    } else if (slotTwoToggle) {
        if (gridSizeSlotTwo >= 12 && gridSizeSlotTwo <= 20) {
            let alphaSlotTwo = (gridSizeSlotTwo - 12) * 0.15;
            let hueSlotTwo = Math.floor(alphaSlotTwo * 255);
            menuControls.style.color = `rgb(${hueSlotTwo}, ${hueSlotTwo}, ${hueSlotTwo})`;
            menuHex.style.color = `rgb(${hueSlotTwo}, ${hueSlotTwo}, ${hueSlotTwo})`;
            rangeInputs.forEach(input => {
                input.style.background = `rgb(${hueSlotTwo}, ${hueSlotTwo}, ${hueSlotTwo})`;
                input.style.setProperty('--thumb-color', `rgb(${hueSlotTwo}, ${hueSlotTwo}, ${hueSlotTwo})`);
                document.documentElement.style.setProperty('--thumb-color', `rgb(${hueSlotTwo}, ${hueSlotTwo}, ${hueSlotTwo})`);
            });
        } else if (gridSizeSlotTwo < 12) {
            menuControls.style.color = '#1e1e1e';
            menuHex.style.color = '#1e1e1e';
            rangeInputs.forEach(input => {
                input.style.background = '#1e1e1e';
                input.style.setProperty('--thumb-color', '#1e1e1e');
                document.documentElement.style.setProperty('--thumb-color', '#1e1e1e');
            });
        }
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

    if (triangleRotateCheckboxChangesSlotTwo === 0) {
        document.getElementById('triangle-rotate-checkbox-slot-two').addEventListener('change', function () {
            triangleRotateInputSlotTwo = 1;
            triangleRotateCheckboxChangesSlotTwo = 1;
        });
    } else if (triangleRotateCheckboxChangesSlotTwo === 1) {
        document.getElementById('triangle-rotate-checkbox-slot-two').addEventListener('change', function () {
            triangleRotateInputSlotTwo = 2;
            triangleRotateCheckboxChangesSlotTwo = 2;
        });
    } else if (triangleRotateCheckboxChangesSlotTwo === 2) {
        document.getElementById('triangle-rotate-checkbox-slot-two').addEventListener('change', function () {
            triangleRotateInputSlotTwo = 3;
            triangleRotateCheckboxChangesSlotTwo = 3;
        });
    } else if (triangleRotateCheckboxChangesSlotTwo === 3) {
        document.getElementById('triangle-rotate-checkbox-slot-two').addEventListener('change', function () {
            triangleRotateInputSlotTwo = 0;
            triangleRotateCheckboxChangesSlotTwo = 0;
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

    document.getElementById('rect-checkbox-slot-two').addEventListener('change', function () {
        if (this.checked) {
            document.getElementById('ellipse-checkbox-slot-two').checked = false;
            document.getElementById('triangle-checkbox-slot-two').checked = false;
            document.getElementById('text-checkbox-slot-two').checked = false;
            rectCheckedSlotTwo = true;
            ellipseCheckedSlotTwo = false;
            triangleCheckedSlotTwo = false;
            textCheckedSlotTwo = false;
        }
    });

    document.getElementById('ellipse-checkbox-slot-two').addEventListener('change', function () {
        if (this.checked) {
            document.getElementById('rect-checkbox-slot-two').checked = false;
            document.getElementById('triangle-checkbox-slot-two').checked = false;
            document.getElementById('text-checkbox-slot-two').checked = false;
            ellipseCheckedSlotTwo = true;
            rectCheckedSlotTwo = false;
            triangleCheckedSlotTwo = false;
            textCheckedSlotTwo = false;
        }
    });

    document.getElementById('triangle-checkbox-slot-two').addEventListener('change', function () {
        if (this.checked) {
            document.getElementById('rect-checkbox-slot-two').checked = false;
            document.getElementById('ellipse-checkbox-slot-two').checked = false;
            document.getElementById('text-checkbox-slot-two').checked = false;
            triangleCheckedSlotTwo = true;
            rectCheckedSlotTwo = false;
            ellipseCheckedSlotTwo = false;
            textCheckedSlotTwo = false;
        }
    });

    document.getElementById('text-checkbox-slot-two').addEventListener('change', function () {
        if (this.checked) {
            document.getElementById('rect-checkbox-slot-two').checked = false;
            document.getElementById('ellipse-checkbox-slot-two').checked = false;
            document.getElementById('triangle-checkbox-slot-two').checked = false;
            textCheckedSlotTwo = true;
            triangleCheckedSlotTwo = false;
            rectCheckedSlotTwo = false;
            ellipseCheckedSlotTwo = false;
        }
    });

    document.getElementById('slot-one-checkbox').addEventListener('change', function () {
        if (this.checked) {
            document.getElementById('slot-two-checkbox').checked = false;
            slotOneToggle = true;
            slotTwoToggle = false;
            updateBackgroundAlpha(gridSize);
            detailSlider.style.display = 'block';
            detailSliderNumber.style.display = 'block';
            gridSizeSlider.style.display = 'block';
            gridSizeNumber.style.display = 'block';
            stepSlider.style.display = 'block';
            stepNumber.style.display = 'block';
            offsetSlider.style.display = 'block';
            offsetNumber.style.display = 'block';
            detailSliderSlotTwo.style.display = 'none';
            detailSliderSlotTwoNumber.style.display = 'none';
            gridSizeSliderSlotTwo.style.display = 'none';
            gridSizeNumberSlotTwo.style.display = 'none';
            stepSliderSlotTwo.style.display = 'none';
            stepNumberSlotTwo.style.display = 'none';
            offsetSliderSlotTwo.style.display = 'none';
            offsetNumberSlotTwo.style.display = 'none';

            verticalCheckbox.style.display = 'block';
            horizontalCheckbox.style.display = 'block';
            valueCheckbox.style.display = 'block';
            verticalCheckboxSlotTwo.style.display = 'none';
            horizontalCheckboxSlotTwo.style.display = 'none';
            valueCheckboxSlotTwo.style.display = 'none';

            redSlider.style.display = 'block';
            redNumber.style.display = 'block';
            greenSlider.style.display = 'block';
            greenNumber.style.display = 'block';
            blueSlider.style.display = 'block';
            blueNumber.style.display = 'block';
            greenSlider.style.display = 'block';
            greenNumber.style.display = 'block';
            redSliderSlotTwo.style.display = 'none';
            redNumberSlotTwo.style.display = 'none';
            greenSliderSlotTwo.style.display = 'none';
            greenNumberSlotTwo.style.display = 'none';
            blueSliderSlotTwo.style.display = 'none';
            blueNumberSlotTwo.style.display = 'none';
            greenSliderSlotTwo.style.display = 'none';
            greenNumberSlotTwo.style.display = 'none';

            redCheckbox.style.display = 'block';
            greenCheckbox.style.display = 'block';
            blueCheckbox.style.display = 'block';
            redCheckboxSlotTwo.style.display = 'none';
            greenCheckboxSlotTwo.style.display = 'none';
            blueCheckboxSlotTwo.style.display = 'none';

            rectCheckbox.style.display = 'block';
            ellipseCheckbox.style.display = 'block';
            triangleCheckbox.style.display = 'block';
            triangleRotateCheckbox.style.display = 'block';
            textCheckbox.style.display = 'block';
            inputField.style.display = 'block';
            rectCheckboxSlotTwo.style.display = 'none';
            ellipseCheckboxSlotTwo.style.display = 'none';
            triangleCheckboxSlotTwo.style.display = 'none';
            triangleRotateCheckboxSlotTwo.style.display = 'none';
            textCheckboxSlotTwo.style.display = 'none';
            inputFieldSlotTwo.style.display = 'none';
        }
    });

    document.getElementById('slot-two-checkbox').addEventListener('change', function () {
        if (this.checked) {
            document.getElementById('slot-one-checkbox').checked = false;
            slotTwoToggle = true;
            slotOneToggle = false;
            updateBackgroundAlpha(gridSizeSlotTwo);
            detailSliderSlotTwo.style.display = 'block';
            detailSliderSlotTwoNumber.style.display = 'block';
            gridSizeSliderSlotTwo.style.display = 'block';
            gridSizeNumberSlotTwo.style.display = 'block';
            stepSliderSlotTwo.style.display = 'block';
            stepNumberSlotTwo.style.display = 'block';
            offsetSliderSlotTwo.style.display = 'block';
            offsetNumberSlotTwo.style.display = 'block';
            detailSlider.style.display = 'none';
            detailSliderNumber.style.display = 'none';
            gridSizeSlider.style.display = 'none';
            gridSizeNumber.style.display = 'none';
            stepSlider.style.display = 'none';
            stepNumber.style.display = 'none';
            offsetSlider.style.display = 'none';
            offsetNumber.style.display = 'none';

            verticalCheckboxSlotTwo.style.display = 'block';
            horizontalCheckboxSlotTwo.style.display = 'block';
            valueCheckboxSlotTwo.style.display = 'block';
            verticalCheckbox.style.display = 'none';
            horizontalCheckbox.style.display = 'none';
            valueCheckbox.style.display = 'none';

            redSliderSlotTwo.style.display = 'block';
            redNumberSlotTwo.style.display = 'block';
            greenSliderSlotTwo.style.display = 'block';
            greenNumberSlotTwo.style.display = 'block';
            blueSliderSlotTwo.style.display = 'block';
            blueNumberSlotTwo.style.display = 'block';
            greenSliderSlotTwo.style.display = 'block';
            greenNumberSlotTwo.style.display = 'block';
            redSlider.style.display = 'none';
            redNumber.style.display = 'none';
            greenSlider.style.display = 'none';
            greenNumber.style.display = 'none';
            blueSlider.style.display = 'none';
            blueNumber.style.display = 'none';
            greenSlider.style.display = 'none';
            greenNumber.style.display = 'none';

            redCheckboxSlotTwo.style.display = 'block';
            greenCheckboxSlotTwo.style.display = 'block';
            blueCheckboxSlotTwo.style.display = 'block';
            redCheckbox.style.display = 'none';
            greenCheckbox.style.display = 'none';
            blueCheckbox.style.display = 'none';

            rectCheckboxSlotTwo.style.display = 'block';
            ellipseCheckboxSlotTwo.style.display = 'block';
            triangleCheckboxSlotTwo.style.display = 'block';
            triangleRotateCheckboxSlotTwo.style.display = 'block';
            textCheckboxSlotTwo.style.display = 'block';
            inputFieldSlotTwo.style.display = 'block';
            rectCheckbox.style.display = 'none';
            ellipseCheckbox.style.display = 'none';
            triangleCheckbox.style.display = 'none';
            triangleRotateCheckbox.style.display = 'none';
            textCheckbox.style.display = 'none';
            inputField.style.display = 'none';
        }
    });
}

function setup() {
    updateCanvasSize();
    textAlign(CENTER, CENTER);
    detailSlider = document.getElementById('detail-slider');
    detailSliderSlotTwo = document.getElementById('detail-slider-slot-two');
    detailSliderNumber = document.getElementById('noise-detail-number');
    detailSliderSlotTwoNumber = document.getElementById('noise-detail-number-slot-two');
    gridSizeSlider = document.getElementById('grid-size-slider');
    gridSizeNumber = document.getElementById('grid-size-number');
    gridSizeSliderSlotTwo = document.getElementById('grid-size-slider-slot-two');
    gridSizeNumberSlotTwo = document.getElementById('grid-size-number-slot-two');
    stepSlider = document.getElementById('step-slider');
    stepNumber = document.getElementById('step-number');
    stepSliderSlotTwo = document.getElementById('step-slider-slot-two');
    stepNumberSlotTwo = document.getElementById('step-number-slot-two');
    offsetSlider = document.getElementById('offset-slider');
    offsetNumber = document.getElementById('offset-number');
    offsetSliderSlotTwo = document.getElementById('offset-slider-slot-two');
    offsetNumberSlotTwo = document.getElementById('offset-number-slot-two');

    verticalCheckbox = document.getElementById('vertical');
    verticalCheckboxSlotTwo = document.getElementById('vertical-slot-two');
    horizontalCheckbox = document.getElementById('horizontal');
    horizontalCheckboxSlotTwo = document.getElementById('horizontal-slot-two');
    valueCheckbox = document.getElementById('value');
    valueCheckboxSlotTwo = document.getElementById('value-slot-two');

    redSlider = document.getElementById('red-slider');
    redNumber = document.getElementById('red-number');
    redSliderSlotTwo = document.getElementById('red-slider-slot-two');
    redNumberSlotTwo = document.getElementById('red-number-slot-two');
    greenSlider = document.getElementById('green-slider');
    greenNumber = document.getElementById('green-number');
    greenSliderSlotTwo = document.getElementById('green-slider-slot-two');
    greenNumberSlotTwo = document.getElementById('green-number-slot-two');
    blueSlider = document.getElementById('blue-slider');
    blueNumber = document.getElementById('blue-number');
    blueSliderSlotTwo = document.getElementById('blue-slider-slot-two');
    blueNumberSlotTwo = document.getElementById('blue-number-slot-two');

    redCheckbox = document.getElementById('red-checkbox');
    redCheckboxSlotTwo = document.getElementById('red-checkbox-slot-two');
    greenCheckbox = document.getElementById('green-checkbox');
    greenCheckboxSlotTwo = document.getElementById('green-checkbox-slot-two');
    blueCheckbox = document.getElementById('blue-checkbox');
    blueCheckboxSlotTwo = document.getElementById('blue-checkbox-slot-two');

    rectCheckbox = document.getElementById('rect-checkbox');
    rectCheckboxSlotTwo = document.getElementById('rect-checkbox-slot-two');
    ellipseCheckbox = document.getElementById('ellipse-checkbox');
    ellipseCheckboxSlotTwo = document.getElementById('ellipse-checkbox-slot-two');
    triangleCheckbox = document.getElementById('triangle-checkbox');
    triangleCheckboxSlotTwo = document.getElementById('triangle-checkbox-slot-two');
    triangleRotateCheckbox = document.getElementById('triangle-rotate-checkbox');
    triangleRotateCheckboxSlotTwo = document.getElementById('triangle-rotate-checkbox-slot-two');
    textCheckbox = document.getElementById('text-checkbox');
    textCheckboxSlotTwo = document.getElementById('text-checkbox-slot-two');
    inputField = document.querySelector('.text-input');
    inputFieldSlotTwo = document.querySelector('.text-input-slot-two');

    detailSliderNumber.textContent = parseFloat(detailSlider.value).toFixed(2);
    detailSlider.addEventListener('input', function () {
        detailValue = parseFloat(detailSlider.value);
        detailSliderNumber.textContent = detailValue.toFixed(2);
    });

    detailSliderSlotTwoNumber.textContent = parseFloat(detailSliderSlotTwo.value).toFixed(2);
    detailSliderSlotTwo.addEventListener('input', function () {
        detailValueSlotTwo = parseFloat(detailSliderSlotTwo.value);
        detailSliderSlotTwoNumber.textContent = detailValueSlotTwo.toFixed(2);
    });

    gridSizeNumber.textContent = gridSizeSlider.value;
    gridSizeSlider.addEventListener('input', function () {
        gridSize = parseInt(gridSizeSlider.value);
        gridSizeNumber.textContent = gridSize;
        updateCanvasSize();
        updateBackgroundAlpha(gridSize); //!
    });

    gridSizeNumberSlotTwo.textContent = gridSizeSliderSlotTwo.value;
    gridSizeSliderSlotTwo.addEventListener('input', function () {
        gridSizeSlotTwo = parseInt(gridSizeSliderSlotTwo.value);
        gridSizeNumberSlotTwo.textContent = gridSizeSlotTwo;
        updateCanvasSize();
        updateBackgroundAlpha(gridSizeSlotTwo); //!
    });

    stepNumber.textContent = stepSlider.value;
    stepSlider.addEventListener('input', function () {
        step = parseInt(stepSlider.value);
        stepNumber.textContent = step;
        updateCanvasSize();
        rectSize = rectSizeConst / step;
    });

    stepNumberSlotTwo.textContent = stepSliderSlotTwo.value;
    stepSliderSlotTwo.addEventListener('input', function () {
        stepSlotTwo = parseInt(stepSliderSlotTwo.value);
        stepNumberSlotTwo.textContent = stepSlotTwo;
        updateCanvasSize();
        rectSizeSlotTwo = rectSizeConstSlotTwo / stepSlotTwo;
    });

    offsetNumber.textContent = offsetSlider.value;
    offsetSlider.addEventListener('input', function () {
        offset = parseInt(offsetSlider.value);
        offsetNumber.textContent = offset;
        updateCanvasSize();
    });

    offsetNumberSlotTwo.textContent = offsetSliderSlotTwo.value;
    offsetSliderSlotTwo.addEventListener('input', function () {
        offsetSlotTwo = parseInt(offsetSliderSlotTwo.value);
        offsetNumberSlotTwo.textContent = offsetSlotTwo;
        updateCanvasSize();
    });

    redNumber.textContent = parseFloat(redSlider.value).toFixed(2);
    redSlider.addEventListener('input', function () {
        if (document.getElementById('red-checkbox').checked) {
            redSliderValue = parseFloat(redSlider.value);
            redNumber.textContent = redSliderValue.toFixed(2);
        }
    });

    redNumberSlotTwo.textContent = parseFloat(redSliderSlotTwo.value).toFixed(2);
    redSliderSlotTwo.addEventListener('input', function () {
        if (document.getElementById('red-checkbox').checked) {
            redSliderValueSlotTwo = parseFloat(redSliderSlotTwo.value);
            redNumberSlotTwo.textContent = redSliderValueSlotTwo.toFixed(2);
        }
    });

    greenNumber.textContent = parseFloat(greenSlider.value).toFixed(2);
    greenSlider.addEventListener('input', function () {
        if (document.getElementById('green-checkbox').checked) {
            greenSliderValue = parseFloat(greenSlider.value);
            greenNumber.textContent = greenSliderValue.toFixed(2);
        }
    });

    greenNumberSlotTwo.textContent = parseFloat(greenSliderSlotTwo.value).toFixed(2);
    greenSliderSlotTwo.addEventListener('input', function () {
        if (document.getElementById('green-checkbox').checked) {
            greenSliderValueSlotTwo = parseFloat(greenSliderSlotTwo.value);
            greenNumberSlotTwo.textContent = greenSliderValueSlotTwo.toFixed(2);
        }
    });

    blueNumber.textContent = parseFloat(blueSlider.value).toFixed(2);
    blueSlider.addEventListener('input', function () {
        if (document.getElementById('blue-checkbox').checked) {
            blueSliderValue = parseFloat(blueSlider.value);
            blueNumber.textContent = blueSliderValue.toFixed(2);
        }
    });

    blueNumberSlotTwo.textContent = parseFloat(blueSliderSlotTwo.value).toFixed(2);
    blueSliderSlotTwo.addEventListener('input', function () {
        if (document.getElementById('blue-checkbox').checked) {
            blueSliderValueSlotTwo = parseFloat(blueSliderSlotTwo.value);
            blueNumberSlotTwo.textContent = blueSliderValueSlotTwo.toFixed(2);
        }
    });
}

function updateCanvasSize() {
    canvas = createCanvas(rectSizeConstToggle * gridSizeToggle, rectSizeConstToggle * gridSizeToggle);
    canvas.parent('canvas');
    canvas.mouseMoved(() => getHexColor(mouseX, mouseY));
    cols = floor(width / scl);
    rows = floor(height / scl);
    if (slotOneToggle) {
        gridSizeToggle = gridSize;
        rectSizeConstToggle = rectSizeConst;
        calculatedCenter = `calc(50vh - ${(rectSizeConst * gridSize) / 2}px)`;
        updateBackgroundAlpha(gridSize);
    } else if (slotTwoToggle) {
        gridSizeToggle = gridSizeSlotTwo;
        rectSizeConstToggle = rectSizeConstSlotTwo;
        calculatedCenter = `calc(50vh - ${(rectSizeConstSlotTwo * gridSizeSlotTwo) / 2}px)`;
        updateBackgroundAlpha(gridSizeSlotTwo);
    }
    document.getElementById('canvas').style.marginTop = calculatedCenter;
    document.getElementById('redraw-button').addEventListener('click', newSeed);
    document.getElementById('export-button').addEventListener('click', exportPNG);
}

function draw() {
    updateCanvasSize();
    checkCheckBoxes();
    checkTypeCheckboxes();
    background('#e1e1e1');
    inc = parseFloat(detailSlider.value);
    incrementSlotTwo = parseFloat(detailSliderSlotTwo.value);

    if (slotOneToggle) { // SLOT ONE GRID
        for (let g = 0; g < step; g++) {
            for (let h = 0; h < step; h++) {
                let yoff = h * offset;
                for (let y = 0; y < gridSize; y++) {
                    let xoff = g * offset;
                    for (let x = 0; x < gridSize; x++) {
                        const inputField = document.querySelector('.text-input');
                        const textInputString = inputField.value.replace(/\s+/g, '').split('');
                        let noiseValue = noise(xoff, yoff) * 255;
                        let textNoiseValue = floor(map(noiseValue, 0, 255, 0, textInputString.length));
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
                            textSize(rectSize);
                            text(textInputString[textNoiseValue], (g * gridSize + x) * rectSize + rectSize / 2, (h * gridSize + y) * rectSize + rectSize / 2);
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
    } else if (slotTwoToggle) { // SLOT TWO GRID
        for (let g = 0; g < stepSlotTwo; g++) {
            for (let h = 0; h < stepSlotTwo; h++) {
                let yoff = h * offsetSlotTwo;
                for (let y = 0; y < gridSizeSlotTwo; y++) {
                    let xoff = g * offsetSlotTwo;
                    for (let x = 0; x < gridSizeSlotTwo; x++) {
                        const inputFieldSlotTwo = document.querySelector('.text-input-slot-two');
                        const textInputString = inputFieldSlotTwo.value.replace(/\s+/g, '').split('');
                        let noiseValueSlotTwo = noise(xoff, yoff) * 255;
                        let textNoiseValue = floor(map(noiseValueSlotTwo, 0, 255, 0, textInputString.length));
                        let redNoiseValueSlotTwo = noise(xoff + redSliderValueSlotTwo, yoff + redSliderValueSlotTwo) * 255;
                        let greenNoiseValueSlotTwo = noise(xoff + greenSliderValueSlotTwo, yoff + greenSliderValueSlotTwo) * 255;
                        let blueNoiseValueSlotTwo = noise(xoff + blueSliderValueSlotTwo, yoff + blueSliderValueSlotTwo) * 255;
                        fill(redNoiseValueSlotTwo, greenNoiseValueSlotTwo, blueNoiseValueSlotTwo);
                        noStroke();
                        if (rectCheckedSlotTwo) {
                            rect((g * gridSizeSlotTwo + x) * rectSizeSlotTwo, (h * gridSizeSlotTwo + y) * rectSizeSlotTwo, rectSizeSlotTwo, rectSizeSlotTwo);
                        } else if (ellipseCheckedSlotTwo) {
                            ellipse((g * gridSizeSlotTwo + x) * rectSizeSlotTwo + rectSizeSlotTwo / 2, (h * gridSizeSlotTwo + y) * rectSizeSlotTwo + rectSizeSlotTwo / 2, rectSizeSlotTwo, rectSizeSlotTwo);
                        } else if (triangleCheckedSlotTwo) {
                            push();
                            translate((g * gridSizeSlotTwo + x) * rectSizeSlotTwo + rectSizeSlotTwo / 2, (h * gridSizeSlotTwo + y) * rectSizeSlotTwo + rectSizeSlotTwo / 2);
                            rotate(triangleRotateInputSlotTwo * PI / 2);
                            let x1 = -rectSizeSlotTwo / 2;
                            let y1 = -rectSizeSlotTwo / 2;
                            let x2 = rectSizeSlotTwo / 2;
                            let y2 = -rectSizeSlotTwo / 2;
                            let x3 = -rectSizeSlotTwo / 2;
                            let y3 = rectSizeSlotTwo / 2;
                            triangle(x1, y1, x2, y2, x3, y3);
                            pop();
                        } else if (textCheckedSlotTwo) {
                            textSize(rectSizeSlotTwo);
                            text(textInputString[textNoiseValue], (g * gridSizeSlotTwo + x) * rectSizeSlotTwo + rectSizeSlotTwo / 2, (h * gridSizeSlotTwo + y) * rectSizeSlotTwo + rectSizeSlotTwo / 2);
                        }
                        fill(0);
                        textSize((rectSizeSlotTwo) / 5);
                        if (document.getElementById('value-slot-two').checked) {
                            text(nf(noiseValueSlotTwo, 1, 2), (g * gridSizeSlotTwo + x) * rectSizeSlotTwo + (rectSizeSlotTwo) / 2, (h * gridSizeSlotTwo + y) * rectSizeSlotTwo + (rectSizeSlotTwo) / 2);
                        }
                        xoff += incrementSlotTwo;
                    }
                    yoff += incrementSlotTwo;
                }
            }
        }
    }

    if (slotOneToggle) { // SLOT ONE NOISE WAVES
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
                    for (let x = 0; x < gridSize; x++) {
                        let yoff = h * offset;
                        let yoffRed = yoff;
                        let yoffGreen = yoff;
                        let yoffBlue = yoff;
                        for (let y = 0; y < gridSize; y++) {
                            let noiseValue = noise(xoff, yoff) * 255;
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
    else if (slotTwoToggle) { // SLOT TWO NOISE WAVES
        if (document.getElementById('horizontal-slot-two').checked) {
            stroke(0);
            noFill();
            for (let g = 0; g < stepSlotTwo; g++) {
                for (let h = 0; h < stepSlotTwo; h++) {
                    let yoff = h * offsetSlotTwo;
                    for (let y = 0; y < gridSizeSlotTwo; y++) {
                        let xoff = g * offsetSlotTwo;
                        let xoffRed = xoff;
                        let xoffGreen = xoff;
                        let xoffBlue = xoff;
                        for (let x = 0; x < gridSizeSlotTwo; x++) {
                            let noiseValueSlotTwo = noise(xoff, yoff) * 255;
                            let redNoiseValueSlotTwo = noise(xoff + redSliderValueSlotTwo, yoff + redSliderValueSlotTwo) * 255;
                            let greenNoiseValueSlotTwo = noise(xoff + greenSliderValueSlotTwo, yoff + greenSliderValueSlotTwo) * 255;
                            let blueNoiseValueSlotTwo = noise(xoff + blueSliderValueSlotTwo, yoff + blueSliderValueSlotTwo) * 255;
                            let circleX = (g * gridSizeSlotTwo + x) * rectSizeSlotTwo;
                            let circleY = (h * gridSizeSlotTwo + y) * rectSizeSlotTwo + (rectSizeSlotTwo) - (noiseValueSlotTwo / 255) * (rectSizeSlotTwo);
                            let circleYRed = (h * gridSizeSlotTwo + y) * rectSizeSlotTwo + (rectSizeSlotTwo) - (redNoiseValueSlotTwo / 255) * (rectSizeSlotTwo);
                            let circleYGreen = (h * gridSizeSlotTwo + y) * rectSizeSlotTwo + (rectSizeSlotTwo) - (greenNoiseValueSlotTwo / 255) * (rectSizeSlotTwo);
                            let circleYBlue = (h * gridSizeSlotTwo + y) * rectSizeSlotTwo + (rectSizeSlotTwo) - (blueNoiseValueSlotTwo / 255) * (rectSizeSlotTwo);


                            if (document.getElementById('red-checkbox-slot-two').checked) {
                                redSliderValueSlotTwo = parseFloat(redSliderSlotTwo.value);
                                redNumberSlotTwo.textContent = parseFloat(redSliderSlotTwo.value).toFixed(2);
                                beginShape();
                                for (let i = 0; i <= rectSizeSlotTwo; i++) {
                                    redNoiseValueSlotTwo = noise(xoffRed + redSliderValueSlotTwo, yoff + redSliderValueSlotTwo) * 255;
                                    noFill();
                                    vertex((g * gridSizeSlotTwo + x) * rectSizeSlotTwo + i, (h * gridSizeSlotTwo + y) * rectSizeSlotTwo + (rectSizeSlotTwo - (redNoiseValueSlotTwo / 255) * rectSizeSlotTwo));
                                    xoffRed += incrementSlotTwo / rectSizeSlotTwo;
                                }
                                endShape();
                                fill('#f30');
                                ellipse(circleX, circleYRed, (rectSizeSlotTwo) / 10, (rectSizeSlotTwo) / 10);
                            } else {
                                redSliderValueSlotTwo = 0;
                                redNumberSlotTwo.textContent = parseFloat(0).toFixed(2);
                            }

                            if (document.getElementById('green-checkbox-slot-two').checked) {
                                greenSliderValueSlotTwo = parseFloat(greenSliderSlotTwo.value);
                                greenNumberSlotTwo.textContent = parseFloat(greenSliderSlotTwo.value).toFixed(2);
                                beginShape();
                                for (let i = 0; i <= rectSizeSlotTwo; i++) {
                                    greenNoiseValueSlotTwo = noise(xoffGreen + greenSliderValueSlotTwo, yoff + greenSliderValueSlotTwo) * 255;
                                    noFill();
                                    vertex((g * gridSizeSlotTwo + x) * rectSizeSlotTwo + i, (h * gridSizeSlotTwo + y) * rectSizeSlotTwo + (rectSizeSlotTwo - (greenNoiseValueSlotTwo / 255) * rectSizeSlotTwo));
                                    xoffGreen += incrementSlotTwo / rectSizeSlotTwo;
                                }
                                endShape();
                                fill('#090');
                                ellipse(circleX, circleYGreen, (rectSizeSlotTwo) / 10, (rectSizeSlotTwo) / 10);
                            } else {
                                greenSliderValueSlotTwo = 0;
                                greenNumberSlotTwo.textContent = parseFloat(0).toFixed(2);
                            }

                            if (document.getElementById('blue-checkbox-slot-two').checked) {
                                blueSliderValueSlotTwo = parseFloat(blueSliderSlotTwo.value);
                                blueNumberSlotTwo.textContent = parseFloat(blueSliderSlotTwo.value).toFixed(2);
                                beginShape();
                                for (let i = 0; i <= rectSizeSlotTwo; i++) {
                                    blueNoiseValueSlotTwo = noise(xoffBlue + blueSliderValueSlotTwo, yoff + blueSliderValueSlotTwo) * 255;
                                    noFill();
                                    vertex((g * gridSizeSlotTwo + x) * rectSizeSlotTwo + i, (h * gridSizeSlotTwo + y) * rectSizeSlotTwo + (rectSizeSlotTwo - (blueNoiseValueSlotTwo / 255) * rectSizeSlotTwo));
                                    xoffBlue += incrementSlotTwo / rectSizeSlotTwo;
                                }
                                endShape();
                                fill('#09f');
                                ellipse(circleX, circleYBlue, (rectSizeSlotTwo) / 10, (rectSizeSlotTwo) / 10);
                            } else {
                                blueSliderValueSlotTwo = 0;
                                blueNumberSlotTwo.textContent = parseFloat(0).toFixed(2);
                            }

                            beginShape();
                            for (let i = 0; i <= rectSizeSlotTwo; i++) {
                                noiseValueSlotTwo = noise(xoff, yoff) * 255;
                                noFill();
                                vertex((g * gridSizeSlotTwo + x) * rectSizeSlotTwo + i, (h * gridSizeSlotTwo + y) * rectSizeSlotTwo + (rectSizeSlotTwo - (noiseValueSlotTwo / 255) * rectSizeSlotTwo));
                                xoff += incrementSlotTwo / rectSizeSlotTwo;
                            }
                            endShape();
                            fill('#e1e1e1');
                            ellipse(circleX, circleY, (rectSizeSlotTwo) / 10, (rectSizeSlotTwo) / 10);
                        }
                        yoff += incrementSlotTwo;
                    }
                }
            }
        }

        if (document.getElementById('vertical-slot-two').checked) {
            stroke(0);
            noFill();
            for (let g = 0; g < stepSlotTwo; g++) {
                for (let h = 0; h < stepSlotTwo; h++) {
                    let xoff = g * offsetSlotTwo;
                    for (let x = 0; x < gridSizeSlotTwo; x++) {
                        let yoff = h * offsetSlotTwo;
                        let yoffRed = yoff;
                        let yoffGreen = yoff;
                        let yoffBlue = yoff;
                        for (let y = 0; y < gridSizeSlotTwo; y++) {
                            let noiseValueSlotTwo = noise(xoff, yoff) * 255;
                            let redNoiseValueSlotTwo = noise(xoff + redSliderValueSlotTwo, yoff + redSliderValueSlotTwo) * 255;
                            let greenNoiseValueSlotTwo = noise(xoff + greenSliderValueSlotTwo, yoff + greenSliderValueSlotTwo) * 255;
                            let blueNoiseValueSlotTwo = noise(xoff + blueSliderValueSlotTwo, yoff + blueSliderValueSlotTwo) * 255;
                            let circleY = (h * gridSizeSlotTwo + y) * rectSizeSlotTwo;
                            let circleX = (g * gridSizeSlotTwo + x) * rectSizeSlotTwo + (rectSizeSlotTwo) - (noiseValueSlotTwo / 255) * (rectSizeSlotTwo);
                            let circleXRed = (g * gridSizeSlotTwo + x) * rectSizeSlotTwo + (rectSizeSlotTwo) - (redNoiseValueSlotTwo / 255) * (rectSizeSlotTwo);
                            let circleXGreen = (g * gridSizeSlotTwo + x) * rectSizeSlotTwo + (rectSizeSlotTwo) - (greenNoiseValueSlotTwo / 255) * (rectSizeSlotTwo);
                            let circleXBlue = (g * gridSizeSlotTwo + x) * rectSizeSlotTwo + (rectSizeSlotTwo) - (blueNoiseValueSlotTwo / 255) * (rectSizeSlotTwo);

                            if (document.getElementById('red-checkbox-slot-two').checked) {
                                redSliderValueSlotTwo = parseFloat(redSliderSlotTwo.value);
                                redNumberSlotTwo.textContent = parseFloat(redSliderSlotTwo.value).toFixed(2);
                                beginShape();
                                for (let i = 0; i <= rectSizeSlotTwo; i++) {
                                    redNoiseValueSlotTwo = noise(xoff + redSliderValueSlotTwo, yoffRed + redSliderValueSlotTwo) * 255;
                                    noFill();
                                    vertex((g * gridSizeSlotTwo + x) * rectSizeSlotTwo + (rectSizeSlotTwo - (redNoiseValueSlotTwo / 255) * rectSizeSlotTwo), (h * gridSizeSlotTwo + y) * rectSizeSlotTwo + i);
                                    yoffRed += incrementSlotTwo / rectSizeSlotTwo;
                                }
                                endShape();
                                fill('#f30');
                                ellipse(circleXRed, circleY, (rectSizeSlotTwo) / 10, (rectSizeSlotTwo) / 10);
                            } else {
                                redSliderValueSlotTwo = 0;
                                redNumberSlotTwo.textContent = parseFloat(0).toFixed(2);
                            }

                            if (document.getElementById('green-checkbox-slot-two').checked) {
                                greenSliderValueSlotTwo = parseFloat(greenSliderSlotTwo.value);
                                greenNumberSlotTwo.textContent = parseFloat(greenSliderSlotTwo.value).toFixed(2);
                                beginShape();
                                for (let i = 0; i <= rectSizeSlotTwo; i++) {
                                    greenNoiseValueSlotTwo = noise(xoff + greenSliderValueSlotTwo, yoffGreen + greenSliderValueSlotTwo) * 255;
                                    noFill();
                                    vertex((g * gridSizeSlotTwo + x) * rectSizeSlotTwo + (rectSizeSlotTwo - (greenNoiseValueSlotTwo / 255) * rectSizeSlotTwo), (h * gridSizeSlotTwo + y) * rectSizeSlotTwo + i);
                                    yoffGreen += incrementSlotTwo / rectSizeSlotTwo;
                                }
                                endShape();
                                fill('#090');
                                ellipse(circleXGreen, circleY, (rectSizeSlotTwo) / 10, (rectSizeSlotTwo) / 10);
                            } else {
                                greenSliderValueSlotTwo = 0;
                                greenNumberSlotTwo.textContent = parseFloat(0).toFixed(2);
                            }

                            if (document.getElementById('blue-checkbox-slot-two').checked) {
                                blueSliderValueSlotTwo = parseFloat(blueSliderSlotTwo.value);
                                blueNumberSlotTwo.textContent = parseFloat(blueSliderSlotTwo.value).toFixed(2);
                                beginShape();
                                for (let i = 0; i <= rectSizeSlotTwo; i++) {
                                    blueNoiseValueSlotTwo = noise(xoff + blueSliderValueSlotTwo, yoffBlue + blueSliderValueSlotTwo) * 255;
                                    noFill();
                                    vertex((g * gridSizeSlotTwo + x) * rectSizeSlotTwo + (rectSizeSlotTwo - (blueNoiseValueSlotTwo / 255) * rectSizeSlotTwo), (h * gridSizeSlotTwo + y) * rectSizeSlotTwo + i);
                                    yoffBlue += incrementSlotTwo / rectSizeSlotTwo;
                                }
                                endShape();
                                fill('#09f');
                                ellipse(circleXBlue, circleY, (rectSizeSlotTwo) / 10, (rectSizeSlotTwo) / 10);
                            } else {
                                blueSliderValueSlotTwo = 0;
                                blueNumberSlotTwo.textContent = parseFloat(0).toFixed(2);
                            }

                            beginShape();
                            for (let i = 0; i <= rectSizeSlotTwo; i++) {
                                noiseValueSlotTwo = noise(xoff, yoff) * 255;
                                noFill();
                                vertex((g * gridSizeSlotTwo + x) * rectSizeSlotTwo + (rectSizeSlotTwo - (noiseValueSlotTwo / 255) * rectSizeSlotTwo), (h * gridSizeSlotTwo + y) * rectSizeSlotTwo + i);
                                yoff += incrementSlotTwo / (rectSizeSlotTwo);
                            }
                            endShape();

                            fill('#e1e1e1');
                            ellipse(circleX, circleY, (rectSizeSlotTwo) / 10, (rectSizeSlotTwo) / 10);
                        }
                        xoff += incrementSlotTwo;
                    }
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

    if (document.getElementById('red-checkbox-slot-two').checked) {
        redSliderValueSlotTwo = parseFloat(redSliderSlotTwo.value);
        redNumberSlotTwo.textContent = parseFloat(redSliderSlotTwo.value).toFixed(2);
    } else {
        redSliderValueSlotTwo = 0;
        redNumberSlotTwo.textContent = parseFloat(0).toFixed(2);
    }

    if (document.getElementById('green-checkbox-slot-two').checked) {
        greenSliderValueSlotTwo = parseFloat(greenSliderSlotTwo.value);
        greenNumberSlotTwo.textContent = parseFloat(greenSliderSlotTwo.value).toFixed(2);
    } else {
        greenSliderValueSlotTwo = 0;
        greenNumberSlotTwo.textContent = parseFloat(0).toFixed(2);
    }

    if (document.getElementById('blue-checkbox-slot-two').checked) {
        blueSliderValueSlotTwo = parseFloat(blueSliderSlotTwo.value);
        blueNumberSlotTwo.textContent = parseFloat(blueSliderSlotTwo.value).toFixed(2);
    } else {
        blueSliderValueSlotTwo = 0;
        blueNumberSlotTwo.textContent = parseFloat(0).toFixed(2);
    }
}

