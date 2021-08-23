<template>
<div class="board-wraper">
  <div class="board">
      <Card :game-status="gameStatus" v-for="field in fields" :field="field" :key="'item'+field.id"
      @selectField="selectField($event)"/>  
  </div>
 <p class="difficult">Level: {{difficult}}</p>
 <p class="win" v-if="isWin">You win this round!</p>
 <p class="fail" v-if="isFail">Game Over! Try Again</p>

      <button class="start-btn" @click="start" :disabled="!Started">Start</button>
</div>
</template>

<script>
import Card from './Card';
import useGameInit from "@/components/composables/useGameInit";
import useGameStart from "@/components/composables/useGameStart";
import useGameProcess from "@/components/composables/useGameProcess";
import { GAME_STATUS } from '@/constants';
import { ref } from "vue";
export default {
  name: 'Board',
  props: {},
  components: {
    Card,
  },
  setup() {
    const number = 25;
    const gameStatus = ref(GAME_STATUS.none);

    const { difficult,fields,init} = useGameInit(number);

    const {start,Started } = useGameStart(init, fields,difficult,number,gameStatus);

    const{selectField,isWin,isFail} = useGameProcess(fields,gameStatus,difficult,start);

    return {
      number,
      difficult,
      fields,
      init,
      start,
      gameStatus,
      Started,
      selectField,
      isWin,
      isFail
    }
  },
}
</script>

<style scoped>
.board{
    width: 550px;
    display: flex;
    background: #eee;
    flex-wrap: wrap;
    margin: 0 auto;
}

.start-btn{
    background: rgb(0, 153, 255);
    color: white;
    border: none;
    border-radius: 3px;
    width: 150px;
    height: 50px;
    font-size: 30px;
    cursor: pointer;
}
 .start-btn:hover{
    background: rgb(68, 176, 248);
}
 .start-btn:disabled{
   opacity: .5;
   cursor: unset;
 }
 .difficult{
   font-size: 20px;
 }
 .win{
    font-size: 20px;
   color: rgb(28, 175, 131);
 }
 .fail{
    font-size: 20px;
   color:rgb(199, 53, 53);
 }

</style>