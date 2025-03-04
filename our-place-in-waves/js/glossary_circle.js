let glossary = function (p) {
    let numCharacters = 12;
    let maxRadius = 70;
    let t = 0;
    let characters = ['λ', 'f', 'v'];
    let currentCharIndex = 0;

    p.setup = function () {
        let canvas = p.createCanvas(400, 270);
        canvas.parent('glossary');
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(24);
    };

    p.draw = function () {
        p.pixelDensity(2);
        p.clear();
        p.translate(p.width / 2, p.height / 2);

        let angleStep = p.TWO_PI / numCharacters;

        for (let i = 0; i < numCharacters; i++) {
            let angle = i * angleStep;
            let x = maxRadius * p.cos(angle + t);
            let y = maxRadius * p.sin(angle + t);

            p.fill(0);
            p.text(characters[currentCharIndex], x, y);
        }

        t += 0.02;

        if (p.frameCount % 30 === 0) {
            currentCharIndex = (currentCharIndex + 1) % characters.length;
        }
    };
};

new p5(glossary);
