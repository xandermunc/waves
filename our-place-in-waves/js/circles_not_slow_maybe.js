let circles = function (p) {
    let numCircles = 12;
    let maxRadius = 40;
    let ellipseSize = maxRadius * 2;
    let t = 0;
    let amplitudeFactor = 1;
    let frequencyFactor = 1;

    p.setup = function () {
        let canvas = p.createCanvas(400, 270);
        canvas.parent('circles');
    };

    p.draw = function () {
        p.pixelDensity(2);
        p.clear();
        p.translate(p.width / 2, p.height / 2);

        p.stroke(0);
        p.strokeWeight(2);
        p.noFill();

        let angleStep = p.TWO_PI / numCircles;

        frequencyFactor = 1 + 4 * p.sin(t * 0.01);
        frequencyFactor = p.map(frequencyFactor, -1, 1, 1, 5);

        for (let i = 0; i < numCircles; i++) {
            let angle = i * angleStep;
            let phaseShift = i * (p.TWO_PI / numCircles) * frequencyFactor;
            let oscRadius = maxRadius + (amplitudeFactor * maxRadius * p.sin(t * 2 + phaseShift));

            let x = oscRadius * p.cos(angle);
            let y = oscRadius * p.sin(angle);

            p.ellipse(x, y, ellipseSize, ellipseSize);
        }

        t += 0.05;
    };
};

new p5(circles);
