let makeMoreStars = function (p) {
    let stars2 = [];

    p.setup = function () {
        let cnv2 = p.createCanvas(windowWidth - 400, 200);
        cnv2.parent("stars2");

        for (let i = 0; i < 500; i++) {
            stars2.push({
                x: p.random(p.width),
                y: p.random(p.height),
                size: 1
            });
        }
    }

    p.draw = function () {
        p.fill(255);
        p.noStroke();
        for (let star of stars2) {
            p.circle(star.x, star.y, star.size);
        }
    }
}

new p5(makeMoreStars);
