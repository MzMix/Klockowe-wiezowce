import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useIndexStore = defineStore('IndexManager', () => {

    const IndexContentTypes = ref([
        {
            value: 0,
            text: 'Numeracja'
        },
        {
            value: 3,
            text: 'Brak'
        }
    ]);

    const SelectedIndexContentType = ref(useLocalStorage("SelectedIndexContentType", 0));

    function SetIndexContentType(value) {
        SelectedIndexContentType.value = value;
    }

    const IndexFill = ref(useLocalStorage("IndexFill", new Array(16).fill(null)));

    function SaveToIndexFill(id, value) {
        let i = id - 1;
        IndexFill.value[i] = value;
    }

    function ClearIndexFill() {
        IndexFill.value.fill(4);
    }

    function GetIndexValue(id) {
        let i = id - 1;
        return IndexFill.value[i];
    }

    return {
        IndexContentTypes,
        SelectedIndexContentType,
        IndexFill,

        SetIndexContentType,
        SaveToIndexFill,
        ClearIndexFill,
        GetIndexValue
    };

});