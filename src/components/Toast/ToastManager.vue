<script setup>
//Import Comoponents
import bsToast from '@Toast/bsToast.vue';

// import { inject, onMounted } from 'vue';

//Import Stores
import { useColorPaletteStore } from "@Stores/ColorPaletteStore";
import { useBoardStore } from "@Stores/BoardStore";
import { useIndexStore } from "@Stores/IndexStore";
import { useCellStore } from "@Stores/CellStore";

//Index
const IndexStore = useIndexStore();
const { ClearIndexFill, GetSelectedIndexTypeName } = IndexStore;

//Board Store
const BoardStore = useBoardStore();
const { ClearBoard } = BoardStore;

//Color & Palette
const ColorPaletteStore = useColorPaletteStore();
const { GetSelectedPaletteName } = ColorPaletteStore;

//CellStore
const CellStore = useCellStore();
const { GetSelectedCellTypeName } = CellStore;

//For designing Toasts
// const ShowToast = inject('ToastTrigger');
// onMounted(() => {
//     for (let i = 1; i <= 8; i++) {
//         ShowToast(`#t${i}`)
//     }
// })
</script>
    
<template>

    <!-- Color Palette Added -->
    <div aria-live="polite" aria-atomic="true" id="ToastGroup">
        <div class="toast-container bottom-0 end-0 p-3">

            <bsToast Theme="purple" Name="ColorPalettesAdded">
                <template #header>Dodano nową paletę kolorów!</template>
                <template #time>Teraz</template>
                <template #body>Aby zmienić wybraną paletę przejdź do:<br /> <strong>Rysowanie > Zmiana palety
                        kolorów</strong></template>
            </bsToast>

        </div>
    </div>

    <!-- Clear Board -->
    <div aria-live="polite" aria-atomic="true" id="ToastGroup">
        <div class="toast-container bottom-0 end-0 p-3">

            <bsToast Theme="danger" Name="ClearBoard">
                <template #header>Potwierdź akcję!</template>
                <template #time>Teraz</template>
                <template #body>
                    <div class="w-100 text-center">
                        <h6>Potwierdź wyczyszczenie planszy:</h6>
                        <button class="btn btn-danger m-2" @click="ClearBoard()" data-bs-dismiss="toast">Wyczyść planszę
                            <i class="bi bi-trash"></i></button>
                    </div>
                </template>
            </bsToast>

        </div>
    </div>

    <!-- Clear Index -->
    <div aria-live="polite" aria-atomic="true" id="ToastGroup">
        <div class="toast-container bottom-0 end-0 p-3">

            <bsToast Theme="danger" Name="ClearIndex">
                <template #header>Potwierdź akcję!</template>
                <template #time>Teraz</template>
                <template #body>
                    <div class="w-100 text-center">
                        <h6>Potwierdź wyczyszczenie oznaczeń pól:</h6>
                        <button class="btn btn-danger w-75 m-auto" @click="ClearIndexFill()"
                            data-bs-dismiss="toast">Wyczyść oznaczenia
                            pól</button>

                    </div>
                </template>
            </bsToast>

        </div>
    </div>

    <!-- PaletteChanged -->
    <div aria-live="polite" aria-atomic="true" id="ToastGroup">
        <div class="toast-container bottom-0 end-0 p-3">

            <bsToast Theme="info" Name="PaletteChanged">
                <template #header>Zmieniono wybraną paletę kolorów!</template>
                <template #time>Teraz</template>
                <template #body>Wybrana paleta:
                    <strong>{{GetSelectedPaletteName()}}</strong></template>
            </bsToast>

        </div>
    </div>

    <!-- IndexChanged -->
    <div aria-live="polite" aria-atomic="true" id="ToastGroup">
        <div class="toast-container bottom-0 end-0 p-3">

            <bsToast Theme="info" Name="IndexChanged">
                <template #header>Zmieniono opis pól!</template>
                <template #time>Teraz</template>
                <template #body>Wybrana paleta:
                    <strong>{{GetSelectedIndexTypeName()}}</strong></template>
            </bsToast>

        </div>
    </div>

    <!-- CellContentChanged -->
    <div aria-live="polite" aria-atomic="true" id="ToastGroup">
        <div class="toast-container bottom-0 end-0 p-3">

            <bsToast Theme="info" Name="CellContentChanged">
                <template #header>Zmieniono zawartość pól!</template>
                <template #time>Teraz</template>
                <template #body>Wybrana paleta:
                    <strong>{{GetSelectedCellTypeName()}}</strong></template>
            </bsToast>

        </div>
    </div>

</template>
    
<style scoped>
#ToastGroup {
    top: 0;
    right: 0;
}
</style>