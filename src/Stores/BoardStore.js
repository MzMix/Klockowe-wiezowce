import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBoardStore = defineStore('BoardManager', () => {

    const BoardFill = ref(useLocalStorage("BoardFill", new Array(16).fill(null)));

    const BoardName = ref(useLocalStorage("BoardName", "Nowa Plansza"));

    const UseBoardHighlight = ref(useLocalStorage("Highlight", true));

    function SaveToBoard(id, value) {
        let i = id - 1;
        BoardFill.value[i] = value;
    }

    function ClearBoard() {
        BoardFill.value.fill(null);
    }

    function GetCellValue(id) {
        let i = id - 1;
        return BoardFill.value[i];
    }

    function ToogleBoardHighlight() {
        UseBoardHighlight.value = !UseBoardHighlight.value;
    }


    return {
        BoardFill,
        BoardName,
        UseBoardHighlight,

        SaveToBoard,
        ClearBoard,
        GetCellValue,
        ToogleBoardHighlight
    };

});