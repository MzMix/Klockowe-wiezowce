<script setup>
//Import from Pinia, Vueuse, Vue
import { storeToRefs } from "pinia";
import { get } from '@vueuse/core';
import { computed, ref, watch } from "vue";

//Import Stores
import { useColorPaletteStore } from "@Stores/ColorPaletteStore";
import { useBoardStore } from "@Stores/BoardStore";
import { useCellStore } from "@Stores/CellStore";

//Import from Utils
import { CalculateBoardPosition } from "@Utils/CalculatePositionAndId";
import { GetTextColorOnBackground } from '@Utils/TextUtilities';

//Color & Palette
const ColorPaletteStore = useColorPaletteStore();
const { InterpreteColorValue, GetBoardDefaultColorId, GetSelectedPaletteLength } = ColorPaletteStore;

//Board
const BoardStore = useBoardStore();
const { SaveToBoard, GetCellValue } = BoardStore;
const { UseBoardHighlight } = storeToRefs(BoardStore);

//Cell
const CellStore = useCellStore();
const { SelectedCellContentType } = storeToRefs(CellStore);

const props = defineProps({
    cellId: Number,
});

const Hover = ref(false);

function ColorCell(add = true) {

    let color = GetCellValue(props.cellId);

    let paletteLength = GetSelectedPaletteLength();

    if (color == null || color == undefined) {
        color = 0;
        SaveToBoard(props.cellId, color);
        return;
    }

    if (add) {
        color = (color + 1) % paletteLength;
    } else {
        color--;
        if (color < 0) color = paletteLength - 1;
    }

    SaveToBoard(props.cellId, color);

}

const PositionBoard = computed(() => {
    let id = new Number(props.cellId);
    return CalculateBoardPosition(id);
});

const content = computed(() => {

    let paletteLength = GetSelectedPaletteLength();

    if (get(SelectedCellContentType) === 0) {
        return '';
    } else if (get(SelectedCellContentType) === 1) {

        if (GetCellValue(props.cellId) == null || GetCellValue(props.cellId) == paletteLength - 1) {
            return '';
        } else {
            return GetCellValue(props.cellId) + 1;
        }

    }

    return '';

});

const CellColor = computed(() => {
    let boardValue = GetCellValue(props.cellId);
    if (boardValue === null) boardValue = GetBoardDefaultColorId();
    return InterpreteColorValue(boardValue);
});

const TextColor = computed(() => {
    return GetTextColorOnBackground(CellColor.value);
});


watch(Hover, () => {

    if (!get(UseBoardHighlight)) return;

    if (get(Hover)) {
        let indexX = document.getElementsByClassName(`x${get(PositionBoard).x}`);
        let indexY = document.getElementsByClassName(`y${get(PositionBoard).y}`);

        for (let i = 0; i < 2; i++) {
            indexX[i].classList.add('cellOnHover');
            indexY[i].classList.add('cellOnHover');
        }
    } else {
        let indexX = document.getElementsByClassName(`x${get(PositionBoard).x}`);
        let indexY = document.getElementsByClassName(`y${get(PositionBoard).y}`);

        for (let i = 0; i < 2; i++) {
            indexX[i].classList.remove('cellOnHover');
            indexY[i].classList.remove('cellOnHover');
        }
    }
});


</script>

<template>
    <div class="squareOnBoard border-top border-dark border-start" @click="ColorCell()"
        @contextmenu.prevent="ColorCell(false)" :style="{ backgroundColor: CellColor, color: TextColor }"
        @mouseover="Hover = true" @mouseleave="Hover = false">
        {{ content }}
    </div>
</template >

<style scoped>
div {
    font-size: .75rem;
}
</style>