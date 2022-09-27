import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCellStore = defineStore('CellManager', () => {

    const CellContentTypes = ref([
        {
            value: 0,
            text: 'Brak'
        },
        {
            value: 1,
            text: 'Numeracja'
        }
    ]);

    const SelectedCellContentType = ref(useLocalStorage("SelectedCellContentType", 1));

    function SetCellContentType(value) {
        SelectedCellContentType.value = value;
    }

    return {
        CellContentTypes,
        SelectedCellContentType,
        SetCellContentType,
    };

});