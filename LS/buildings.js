let makeBuildings = function (p) {
    let buildingSizes = [
        { cols: 5, rows: 8 },
        { cols: 10, rows: 14 },
        { cols: 4, rows: 5 },
        { cols: 7, rows: 6 }
    ];
    let gridColors = [];
    let yOffset;
    let totalWidth = 0;

    p.setup = function () {
        let cnv3 = p.createCanvas(300, 300);
        cnv3.parent('buildings');
        p.noLoop();
        yOffset = p.height - 10;

        for (let b = 0; b < buildingSizes.length; b++) {
            let { cols, rows } = buildingSizes[b];
            let localGridColors = Array(cols * rows).fill('#6c757d'); 

            let whiteCount = p.max(3, p.floor((cols * rows) / 10));
            let whiteIndices = [];

            while (whiteIndices.length < whiteCount) {
                let randIndex = p.floor(p.random(cols * rows));
                if (!whiteIndices.includes(randIndex)) {
                    whiteIndices.push(randIndex);
                    localGridColors[randIndex] = '#fd7e14'; 
                }
            }

            gridColors.push(localGridColors);
        }

        setInterval(changeLight, 1000);
    };

    p.draw = function () {
        totalWidth = 0;

        for (let b = 0; b < buildingSizes.length; b++) {
            let { cols, rows } = buildingSizes[b];
            let buildingX = totalWidth + 10;
            totalWidth += cols * 10 + 10;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    let index = i + j * cols;
                    p.fill(gridColors[b][index]);
                    p.stroke('#6c757d');
                    p.strokeWeight(4);
                    p.rect(buildingX + i * 10, yOffset - (j + 1) * 10, 10, 10);
                }
            }
        }
    };

    function changeLight() {
        let b = p.floor(p.random(buildingSizes.length));
        let indicesWithYellow = gridColors[b].map((color, index) => color === '#fd7e14' ? index : -1).filter(index => index !== -1);
        let indicesWithGrey = gridColors[b].map((color, index) => color === '#6c757d' ? index : -1).filter(index => index !== -1);

        if (indicesWithYellow.length > 0 && (indicesWithGrey.length === 0 || p.random() < 0.5)) {
            let randIndex = p.floor(p.random(indicesWithYellow.length));
            gridColors[b][indicesWithYellow[randIndex]] = '#6c757d';
        } else if (indicesWithGrey.length > 0) {
            let randIndex = p.floor(p.random(indicesWithGrey.length));
            gridColors[b][indicesWithGrey[randIndex]] = '#fd7e14';
        }

        p.redraw();
    }
};

new p5(makeBuildings);
