import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useColorPaletteStore = defineStore('ColorPaletteManager', () => {

    const AppName = ref('KW');

    const ColorPalettes = ref(useLocalStorage('ColorPalettes', [
        {
            value: 0,
            text: 'Kreatywny',
            colorSet: ['#FD1818', '#FDFD18', '#1818FD', '#188B18', 'white'],
            standard: true,
            appOrigin: AppName.value,
        },
        {
            value: 1,
            text: 'Matematyczny',
            colorSet: ['#f0e796', '#18C4FD', '#8B188B', '#B3FD42', 'white'],
            standard: true,
            appOrigin: AppName.value,
        }
    ]));

    const BoardDefaultColor = ref(useLocalStorage('boardDefaultColor', 'white'));

    const SelectedPalette = ref(useLocalStorage('SelectedPalette', 0));

    function SetPalette(id) {
        SelectedPalette.value = id;
    }

    function AddPalette(name, colors, origin) {

        let available = ColorPalettes.value.filter(el => el.text == name).length <= 0;

        if (available) {

            ColorPalettes.value.push({
                value: ColorPalettes.value.length,
                text: name,
                colorSet: colors,
                standard: false,
                appOrigin: origin,
            });
        }
    }

    function RemovePalette(id) {

        if (ColorPalettes.value[id].standard) {
            return;
        }

        if (SelectedPalette.value === id) SelectedPalette.value = 0;

        ColorPalettes.value.splice(id, 1);
    }

    function GetSelectedPalette() {
        return ColorPalettes.value[SelectedPalette.value].colorSet;
    }

    function GetSelectedPaletteOrigin() {
        return ColorPalettes.value[SelectedPalette.value].appOrigin;
    }

    function InterpreteColorValue(colorValue) {
        return GetSelectedPalette()[colorValue];
    }

    function GetBoardDefaultColorId() {
        return GetSelectedPalette().findIndex(el => el == BoardDefaultColor.value);
    }

    return {
        AppName,
        SelectedPalette,
        ColorPalettes,
        SetPalette,
        BoardDefaultColor,
        AddPalette,
        RemovePalette,
        GetSelectedPaletteOrigin,

        GetBoardDefaultColorId,

        InterpreteColorValue,
    };

});