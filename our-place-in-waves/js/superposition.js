let superposition = function (p) {
    let angle1 = 0;
    let angle2 = 0;
    let amplitude = 12;
    let frequency = 0.1;

    p.setup = function () {
        const canvas = p.createCanvas(100, 80);
        canvas.parent("superposition");
    };

    p.draw = function () {
        // const rootStyles = getComputedStyle(document.documentElement);
        // const inputColor = rootStyles.getPropertyValue('--input-color').trim();
        //   p.background(255);
        p.clear();
        p.strokeWeight(2);
        p.noFill();

        p.stroke('#09f');
        p.beginShape();
        for (let x = 0; x < p.width; x++) {
            let y = p.height / 2 + p.sin(x * frequency + angle1) * amplitude;
            p.vertex(x, y);
        }
        p.endShape();

        p.stroke('#f00');
        p.beginShape();
        for (let x = 0; x < p.width; x++) {
            let y = p.height / 2 + p.sin(x * frequency + angle2 + p.PI) * amplitude;
            p.vertex(x, y);
        }
        p.endShape();

        p.stroke(100);
        p.beginShape();
        for (let x = 0; x < p.width; x++) {
            let y1 = p.sin(x * frequency + angle1) * amplitude;
            let y2 = p.sin(x * frequency + angle2 + p.PI) * amplitude;
            let ySuperposition = p.height / 2 + (y1 + y2);
            p.vertex(x, ySuperposition);
        }
        p.endShape();

        angle1 += 0.03;
        angle2 += 0.05;
    };
};

new p5(superposition); 
