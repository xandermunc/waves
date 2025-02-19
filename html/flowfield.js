let flowFieldSketch = function(p) {
    let inc = 0.1;
    let scl = 50;
    let cols, rows;
    let zoff = 0;

    p.setup = function() {
        const canvas = p.createCanvas(550, 300);
        canvas.parent('flowfield');
        cols = p.floor(p.width / scl);
        rows = p.floor(p.height / scl);
    };

    p.draw = function() {
        p.translate(50, -1);
        p.clear();
        let yoff = 0;
        for (let y = 0; y < rows; y++) {
            let xoff = 0;
            for (let x = 0; x < cols; x++) {
                let angle = p.noise(xoff, yoff, zoff) * p.TWO_PI;
                let v = p5.Vector.fromAngle(angle);
                xoff += inc;
                p.stroke(255);

                p.push();
                p.translate(x * scl, y * scl);
                p.rotate(v.heading());
                p.line(0, 0, scl, 0);
                p.pop();
            }
            yoff += inc;
            zoff += 0.0005;
        }
    };
};

new p5(flowFieldSketch);
