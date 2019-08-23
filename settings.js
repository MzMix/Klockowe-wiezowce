class PresetSettings {
    constructor() {
        this.squareSize = 80;
        this.squareSpacer = 5;
        this.squaresBySideH = 4;
        this.squaresBySideW = 4;

        this.squareCurvature = 0;

        this.squareFill = '#D3D3D3';
        this.squareStroke = color(255, 255, 255, 125);
        this.squareTextColor = "white";
        this.squareTextStrokeColor = "black";

        this.squareTextSize = 25;
        this.squareTextWeight = 2;

        this.indexFill = 'white';
        this.indexStroke = 'black';

        this.indexCurvature = 0;
    }

    addValues(valueObj) {
        for (const el in valueObj) {
            this[el] = valueObj[el];
        }
    }
}

const settings = new PresetSettings();