<script setup>
//Import from Pinia
import { storeToRefs } from 'pinia';

//Import Palette Store
import { useColorPaletteStore } from "../../stores/ColorPaletteStore";

//Import Utils
import { DonloadContent } from '../../utils/SharingUtilities';

//Color & Palette
const ColorPaletteStore = useColorPaletteStore();
const { ColorPalettes, SelectedPalette } = storeToRefs(ColorPaletteStore);

const props = defineProps({
    UseIcon: {
        default: false,
        require: false,
        type: Boolean
    }
})

function ExportColorPalettes() {

    let customPaletes = ColorPalettes.value.slice(2);
    let out = JSON.stringify({ ColorPalettes: customPaletes, SelectedPalette: SelectedPalette.value }, null, 4);

    DonloadContent(out, 'palety-eksport.json', 'text/plain');
}

</script>

<template>
    <button type="button" class="btn btn-outline-primary" @click="ExportColorPalettes()">Eksportuj palety
        kolorów <i class="bi bi-download" v-if="props.UseIcon"></i></button>
</template>

<style scoped>

</style>>