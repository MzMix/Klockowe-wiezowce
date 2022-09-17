<script setup>
import { storeToRefs } from "pinia";
import { get } from '@vueuse/core';
import { computed, ref, watch } from "vue";

import { useColorPaletteStore } from "../../stores/ColorPaletteStore";
import { useBoardStore } from "../../stores/BoardStore";
import { useCellStore } from "../../stores/CellStore";

// const { GetCellColor, SetCellColor_Selected } = store;

import { CalculateBoardPosition } from "../../utils/CalculatePositionAndId";

//Color & Palette
const ColorPaletteStore = useColorPaletteStore();
const { InterpreteColorValue, GetBoardDefaultColorId } = ColorPaletteStore;

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

function ColorCell() {

    let color = GetCellValue(props.cellId);

    if (color == null || color == undefined) {
        color = 0;
    } else {
        color = (color + 1) % 5;
    }

    SaveToBoard(props.cellId, color)
}

const PositionBoard = computed(() => {
    let id = new Number(props.cellId);
    return CalculateBoardPosition(id);
});

const content = computed(() => {

    if (get(SelectedCellContentType) === 0) {
        return '';
    } else if (get(SelectedCellContentType) === 1) {

        if (GetCellValue(props.cellId) == null || GetCellValue(props.cellId) == 4) {
            return ''
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
})


</script>

<template>
    <div class="squareOnBoard border-top border-dark border-start" @click="ColorCell()"
        :style="{ backgroundColor: CellColor }" @mouseover="Hover = true" @mouseleave="Hover = false">
        {{ content }}
    </div>
</template >

<style scoped>
div {
    font-size: .75rem;
}
</style>