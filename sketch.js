class Segment {
    constructor(x, y, color, stat) {
        this.x = x;
        this.y = y;
        this.color = color
        this.stat = stat;
        this.limit = 5;
        this.num = 0;
    }

    display() {
        push();
        translate(this.x * size, this.y * size);
        fill(this.color);
        stroke(120);
        rect(0, 0, size, size)

        if (this.num != 0) {
            textAlign(CENTER, CENTER);
            textSize(24);
            fill(0);
            stroke(0);
            text(this.num, 3, 3, size, size);
        }

        pop();
    }

    checkPointing() {

        if (mouseX > this.x * size && mouseX < this.x * size + size &&
            mouseY > this.y * size && mouseY < this.y * size + size) {
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

let segments = [],
    bd = [],
    ins = [];

let bound = [2, 3, 4, 5, 31, 32, 33, 34, 35, 7, 13, 19, 25, 12, 18, 24, 30, 18];
let skalar;
let colors = ['white', 'khaki', 'deepskyblue', 'purple', 'greenyellow'];
let mtmColors = ['white', 'khaki', 'deepskyblue', 'purple', 'greenyellow'];
let crColors = ['white', 'red', 'yellow', 'blue', 'green'];
let size;
let n = 1,
    z;
let sel;

function resetBounds() {
    for (b of bd) {
        segments[b].num = 0;
    }
}

function resetInside() {
    for (i of ins) {
        segments[i].num = 0;
    }
}

function changeSet() {

    let type = sel.value();

    if (type == "MoreToMath") {
        colors = mtmColors
    } else if (type == "Zestaw Kreatywny") {
        colors = crColors;
    }
}

function createMenu() {

    btn1 = createButton('Reset opisów');
    btn1.mouseClicked(resetBounds);
    select('.btL').child(btn1);

    btn2 = createButton('Reset planszy');
    btn2.mouseClicked(resetInside);
    select('.btR').child(btn2);

    skalar = createSlider(60, 140, 60, 10);
    select('.sld').child(skalar);
    skalar.changed(resize);

    sel = createSelect();
    sel.option('MoreToMath');
    sel.option('Zestaw Kreatywny');
    sel.changed(changeSet);
    select('.list').child(sel);

}

function resize() {
    size = skalar.value();
    resizeCanvas(size * 6, size * 6)
}

function setup() {
    createMenu();
    size = skalar.value();

    let c = createCanvas(size * 6, size * 6);
    select('.box').child(c);

    for (let i = 0; i < 6; i++) {

        for (let j = 0; j < 6; j++) {
            if (n != 1 && n != 6 && n != 31 && n != 36) {

                if (bound.includes(n)) {
                    segments.push(new Segment(j, i, color(211, 211, 211), false));
                    bd.push(segments.length - 1);
                } else {
                    segments.push(new Segment(j, i, color(255, 160, 122), true));
                    ins.push(segments.length - 1);
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