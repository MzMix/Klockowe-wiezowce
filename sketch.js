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

    Segment.prototype.retriveBasicValues = function () {
        this.changeContent();
    }

    action.showModal = function (value) {
        let el;

        switch (value) {
            case 'changeColorSet':

                this.refreshColorSets();

                select(".modal-title").html("Zestawy kolorów");

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

                let el = createSlider(settings.basicSquareSize / 2, settings.basicSquareSize * 2, settings.squareSize, 10)
                el.changed(() => {
                    let val = el.value();
                    settings.squareSize = val;
                    // settings.squareSpacer = val / 16;
                    resizeCanvas();
                })

                select(".modal-body").html("");
                select(".modal-body").child(el);

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
            s.changeColor(settings.colorSchemes[settings.activeColorScheme][s.txt - 1])
        }

    }

    settings.addValues({
        segmentMaxNum: 5,
        activeColorScheme: 0
    })

    userInterface.executeQueue = {
        displayAxis: () => {}
    }

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

}

function setup() {
    addMethodsToObjects();

    userInterface.createInterface().generateBoard();
    for (let segment of userInterface.board) {
        if (segment instanceof Index) segment.changeContent();

        segment.display();
    }

    settings.basicSquareSize = settings.squareSize;

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