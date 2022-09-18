<script setup>
import BoardCell from './BoardCell.vue'
import BoardIndex from './BoardIndex.vue'

import { ref } from 'vue'

const Board = ref(null);

</script>

<template>

  <div class="d-grid" style="place-content: center;">
    <div id="BoardOuterContainer">
      <div id="BoardContainer" class="p-2">
        <div class=" index top-index">
          <BoardIndex v-for="index in 3" :cellId="index" :key="index" sector="horizontal" :class="'x'+index">
          </BoardIndex>
          <BoardIndex :cellId="4" :key="4" sector="horizontal" class="border-dark border-end x4">4</BoardIndex>
        </div>

        <div class="index left-index">
          <BoardIndex v-for="index in 3" :cellId="4+index" :key="index" sector="vertical" :class="'y'+index">
          </BoardIndex>
          <BoardIndex :cellId="8" :key="4" sector="vertical" class="border-dark border-bottom y4">4</BoardIndex>

        </div>

        <div id="Board" ref="Board">
          <BoardCell v-for="i in 16" :key="i" :cellId="i" v-bind="{ pos: i }" />
        </div>

        <div class="index right-index border-dark border-end">
          <BoardIndex v-for="index in 3" :cellId="8+index" :key="index" sector="vertical" :class="'y'+index">
          </BoardIndex>
          <BoardIndex :cellId="12" :key="4" sector="vertical" class="border-dark border-bottom y4">4</BoardIndex>

        </div>

        <div class="index bottom-index border-dark border-bottom">
          <BoardIndex v-for="index in 3" :cellId="12+index" :key="index" sector="horizontal" :class="'x'+index">
          </BoardIndex>
          <BoardIndex :cellId="16" :key="4" sector="horizontal" class="border-dark border-end x4">4</BoardIndex>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  transition: all 0.15s ease-in-out;
}

#BoardContainer {
  display: grid;
  /* grid-template-columns: calc(4vw) calc(40vw) calc(4vw);
  grid-template-rows: calc(4vw) calc(40vw) calc(4vw); */
  grid-template:
    '.top-index.'
    'left-index board right-index'
    '.bottom-index.';
}

#Board {
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: repeat(4, 25%);
  grid-area: board;
  position: relative;
  box-sizing: border-box;
}

.index {
  display: grid;
  place-content: center;
  text-align: center;
}

.top-index {
  grid-area: top-index;
  grid-template-rows: 1;
  grid-template-columns: repeat(4, 25%);
  width: 100%;
}

.bottom-index {
  grid-area: bottom-index;
  grid-template-rows: 1;
  grid-template-columns: repeat(4, 25%);
  width: 100%;
}

.left-index {
  grid-area: left-index;
  grid-template-columns: 1;
  grid-template-rows: repeat(4, 25%);
  height: 100%;
}

.right-index {
  grid-area: right-index;
  grid-template-columns: 1;
  grid-template-rows: repeat(4, 25%);
  height: 100%;
}
</style>