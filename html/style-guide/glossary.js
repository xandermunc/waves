let glossary = function (p) {
    let characters = ['λ', 'f', 'v', 'ϕ', 'θ', 'k', 'Ѱ'];
    let currentCharIndex = 0;

    p.setup = function () {
        let canvas = p.createCanvas(400, 270);
        canvas.parent('glossary');
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(150);
        p.textFont('inter-bold'); 
        // p.textStyle(p.BOLD); 
    };

    p.draw = function () {
        p.pixelDensity(2);
        p.clear();
        p.translate(p.width / 2, p.height / 2);
        p.fill(0);
        p.text(characters[currentCharIndex], 0, 0);

        if (p.frameCount % 50 === 0) {
            currentCharIndex = (currentCharIndex + 1) % characters.length;
        }
    };
};

new p5(glossary);
