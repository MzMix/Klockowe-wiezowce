<script setup>
import { storeToRefs } from "pinia";
import { get } from '@vueuse/core';
import { computed, ref } from "vue";

import { useIndexStore } from "../../stores/IndexStore";

//Index
const IndexStore = useIndexStore();
const { GetIndexValue, SaveToIndexFill } = IndexStore;
const { SelectedIndexContentType } = storeToRefs(IndexStore);

const props = defineProps({
    sector: {
        type: String,
        required: true
    },
    cellId: {
        type: Number,
        required: true
    },
});

const fillColor = ref('#F2F2F2');

function ChangeIndex() {

    let index = GetIndexValue(props.cellId);

    if (index == null || index == undefined) {
        index = 0;
    } else {
        index = (index + 1) % 5;
    }

    SaveToIndexFill(props.cellId, index)
}

const content = computed(() => {

    if (get(SelectedIndexContentType) === 4) {
        return '';
    } else if (get(SelectedIndexContentType) === 0) {

        if (GetIndexValue(props.cellId) == null || GetIndexValue(props.cellId) == 4) {
            return ''
        } else {
            return GetIndexValue(props.cellId) + 1;
        }

    }

    return '';

});

</script>

<template >
    <div class="squareOnBoard border-dark border-top border-start" @click="ChangeIndex()"
        :style="{ backgroundColor: fillColor }">
        {{ content }}
    </div>
</template>

<style scoped>

</style>