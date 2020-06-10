function addMethodsToObjects() {

    UserInterface.prototype.checkBoardClicks = function () {
        if (!this.modalOpened)
            for (let segment of this.board) {
                if (segment.mousePointing()) segment.colorSegment();
            }
    }

    Segment.prototype.txt = 0;

    Segment.prototype.colorSegment = function () {

        if (userInterface.modalOpened == false) {

            this.txt++;
            this.txt = this.txt % settings.segmentMaxNum;

            if (!(this instanceof Index)) this.changeColor(settings.colorSchemes[settings.activeColorScheme][this.txt - 1])
        }
    }

    Segment.prototype.changeContent = function (val) {
        if (val) {
            this.txt = val;
        } else {
            this.txt = this.basicContent;
        }
    }

    Segment.prototype.basicContent = "";
    Index.prototype.basicContent = "";

    Segment.prototype.changeColor = function (val) {
        if (val) {
            this.fill = val;
            this.stroke = "transparent"
        } else {
            this.fill = this.basicFillColor;
            this.stroke = this.basicStrokeColor
        }
    }

    Segment.prototype.basicFillColor = settings.squareFill;
    Index.prototype.basicFillColor = settings.indexFill;

    Segment.prototype.basicStrokeColor = settings.squareStroke;
    Index.prototype.basicStrokeColor = settings.indexStroke;

    Segment.prototype.updatePosition = function () {
        this.pos = createVector(
            this.iteratorIndex.x * settings.squareSize + settings.squareSpacer * this.iteratorIndex.x + 2,
            this.iteratorIndex.y * settings.squareSize + settings.squareSpacer * this.iteratorIndex.y + 2
        );
    }

    Segment.prototype.retriveBasicValues = function () {
        this.changeContent();
    }

    UserInterface.prototype.addCustomColorSet = function () {

        let newColorSet = [];

        for (let i = 0; i < settings.colorMatrix.length; i++) {
            let picker = select(`.picker${i}`);

            newColorSet.push(picker.value());
        }
        newColorSet.push('#C0C0C0');

        settings.colorSchemes.push(newColorSet);
    }

    action.showModal = function (value) {
        let el;

        if (select(".ownColors")) select(".ownColors").remove();
        select('.modalBtn').removeAttribute('onclick');
        select('.modalBtn').html('Zamknij');

        switch (value) {
            case 'changeColorSet':
                this.refreshColorSets();

                select(".modal-title").html("Zestawy kolorów");

                if (!select(".ownColors")) {
                    let ownScheme = createButton('Dodaj własny zestaw kolorów');
                    ownScheme.addClass("ownColors btn btn-info btn-sm order-1");
                    ownScheme.attribute('onclick', "action.showModal('addCustomColorSet')");
                    ownScheme.parent(select(".footerLeft"));
                }

                el = createSelect();
                el.option("Domyślny");

                for (let i = 0; i < settings.colorSchemes.length - 1; i++) {
                    el.option(`Zestaw ${i+1}`);
                }

                if (settings.currentColorScheme) el.value(settings.currentColorScheme);

                el.addClass("custom-select switchColorScheme");

                el.changed(this.switchColorScheme);

                select(".modal-body").html("");
                select(".modal-body").child(el);

                break;

            case 'changeSegmentSize':
                select(".modal-title").html("Wielkość pól");

                el = createSlider(0.5, 1.5, settings.skalar, 0.10);
                el.addClass("form-control-range");
                el.attribute("id", "form-control-ranged")
                el.changed(() => {
                    settings.skalar = el.value();

                    settings.squareSize = settings.basicSquareSize * settings.skalar;
                    settings.squareSpacer = settings.basicSquareSpacing * settings.skalar;

                    let sizeW = settings.squareSize * (settings.squaresBySideW + 2) + 11 * settings.squareSpacer + 6;
                    let sizeH = settings.squareSize * (settings.squaresBySideH + 2) + 11 * settings.squareSpacer + 6;
                    resizeCanvas(sizeW, sizeH);

                    for (let s of userInterface.board) {
                        s.updatePosition();
                    }

                    select("#scaleP").html(`Skala: ${floor(settings.skalar * 100)}%`);
                })

                let label = createElement("label", "Zmień wielkość pól")
                label.attribute("for", "form-control-range");

                let p = createP(`Skala: ${floor(settings.skalar * 100)}%`);
                p.attribute("id", "scaleP");

                select(".modal-body").html("");
                select(".modal-body").child(label);
                select(".modal-body").child(el);
                select(".modal-body").child(p);

                break;

            case 'addCustomColorSet':
                $('#modal').modal('show');
                select(".modal-title").html("Dodaj zestaw kolorów");
                select(".modal-body").html("");

                select(".modalBtn").html("Zapisz");
                select(".modalBtn").attribute('onclick', 'userInterface.addCustomColorSet()');

                print(settings.colorMatrix);


                for (let col of settings.colorMatrix) {

                    let el = createP(`Kolor ${1 + settings.colorMatrix.indexOf(col)}: `);
                    let picker = createColorPicker(col);

                    picker.addClass(`colorPicker picker${settings.colorMatrix.indexOf(col)}`);

                    picker.parent(el);
                    select(".modal-body").child(el);
                }

                break;

            default:
                break;
        }
    }

    action.refreshColorSets = function () {
        settings.colorsSchemesInList = [];
        for (let i = 0; i < settings.colorSchemes.length - 1; i++) {
            settings.colorsSchemesInList.push(`Zestaw ${i+1}`);
        }
    }

    action.switchColorScheme = function () {
        settings["currentColorScheme"] = select(".switchColorScheme").value();

        if (settings.currentColorScheme == "Domyślny") {
            settings.activeColorScheme = 0;
        } else {
            let pos = settings.colorsSchemesInList.indexOf(settings.currentColorScheme);
            pos++;

            settings.activeColorScheme = pos;
        }

        for (let s of userInterface.board) {
            if (!(s instanceof Index)) s.changeColor(settings.colorSchemes[settings.activeColorScheme][s.txt - 1])
        }

    }

    settings.addValues({
        segmentMaxNum: 5,
        activeColorScheme: 0,
        skalar: 1
    })

    userInterface.executeQueue = {}

    action.saveImg = function () {
        let data = new Date();
        saveCanvas(`plansza-${data.getHours()}-${data.getMinutes()}-${data.getSeconds()}`, 'png');
    }

    action.resetBoard = function () {
        for (let s of userInterface.board) {
            if (!(s instanceof Index)) {
                s.retriveBasicValues()
                s.changeColor();
            }
        }
    }

    action.resetIndex = function () {
        for (let s of userInterface.board) {
            if ((s instanceof Index)) {
                s.retriveBasicValues()
            }
        }
    }

    settings.colorSchemes = [
        ['khaki', 'deepskyblue', 'purple', 'greenyellow', '#C0C0C0'],
        ['red', 'yellow', 'blue', 'green', '#C0C0C0']
    ];

    settings.colorMatrix = settings.colorSchemes[1];
    settings.colorMatrix.pop();

}

function setup() {
    addMethodsToObjects();

    userInterface.createInterface().generateBoard();
    for (let segment of userInterface.board) {
        if (segment instanceof Index) segment.changeContent();

        segment.display();
    }

    settings.basicSquareSize = settings.squareSize;
    settings.basicSquareSpacing = settings.squareSpacer;

    noLoop();
}

function draw() {
    userInterface.refreshBoard();
    for (let segment of userInterface.board) {
        segment.display();
    }
}

function mouseClicked() {
    userInterface.checkBoardClicks();
    redraw();
}