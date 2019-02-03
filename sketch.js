class Segment {
    constructor(x, y, w, h, color, stat) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color
        this.stat = stat;
        this.limit = 5;
        this.num = 0;
    }

    display() {
        push();
        translate(this.x, this.y);
        fill(this.color);
        stroke(120);
        rect(0, 0, this.w, this.h)

        if (this.num != 0) {
            textAlign(CENTER, CENTER);
            textSize(24);
            fill(255);
            stroke(255);
            text(this.num, 3, 3, this.w, this.w);
        }

        pop();
    }

    checkPointing() {

        if (mouseX > this.x && mouseX < this.x + this.w &&
            mouseY > this.y && mouseY < this.y + this.w) {
            return true;
        } else {
            return false;
        }

    }

    increaseNum() {
        this.num++;
        this.num = this.num % this.limit;
    }

}

let segments = [];

let bound = [2, 3, 4, 5, 31, 32, 33, 34, 35, 7, 13, 19, 25, 12, 18, 24, 30, 18];

let colors;
const size = 65;
let n = 1,
    z;

function setup() {
    let c = createCanvas(400, 400);

    select('.box').child(c);

    colors = [color(255, 255, 255), color(194, 178, 128), color(0, 127, 255), color(184, 3, 255), color(0, 255, 0)];
    for (let i = 0; i < 6; i++) {

        for (let j = 0; j < 6; j++) {
            if (n != 1 && n != 6 && n != 31 && n != 36) {

                if (bound.includes(n)) {
                    segments.push(new Segment(j * size, i * size, size, size, color(211, 211, 211), false));
                } else {
                    segments.push(new Segment(j * size, i * size, size, size, color(255, 160, 122), true));
                }
            }
            n++;
        }
    }
    z = true;
}

function draw() {
    background('#553D67');



    for (let s of segments) {

        s.display();

        if (s.stat) {

            s.color = colors[s.num];
        }
    }

}

function mouseClicked() {
    for (s of segments) {
        if (s.checkPointing()) {
            s.increaseNum();
        }
    }
}