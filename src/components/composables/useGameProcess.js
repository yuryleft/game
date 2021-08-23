import {nextTick,computed } from "vue";
import { DEFAULT_DIFFICULT, FIELD, GAME_SPEED, GAME_STATUS , } from "../../constants";

export default function useGameProcess(fields,gameStatus,difficult,start) {
  const selectField = (id) => {
    const index = fields.value.findIndex((field) => {
      return field.id === id;
    });

    if (index > -1 && !fields.value[index].clicked) {
      fields.value[index].clicked = true;

      checkCard();
    }
  }

  const checkCard=()=>{
    const errorIndex = fields.value.findIndex(field =>{
      return field.clicked && field.value === FIELD.empty;

    });
    if (errorIndex > -1) {
      setFail();
      return;
    }
    const notFoundCardIndex = fields.value.findIndex(field =>{
      return !field.clicked && field.value=== FIELD.filled;
    });

    if (notFoundCardIndex === -1){
      setWin();

    }
  }

  const setFail = () =>{
    
    gameStatus.value = GAME_STATUS.fail;
    difficult.value = DEFAULT_DIFFICULT;
  }

  const setWin = () =>{

    gameStatus.value = GAME_STATUS.win;
    
    setTimeout( async () => {
      
      difficult.value +=1;

      await nextTick();
      start();
    },GAME_SPEED);
  }

  const isWin = computed(() => {
    return gameStatus.value === GAME_STATUS.win;
  });

  const isFail = computed(() => {
    return gameStatus.value === GAME_STATUS.fail;
  });

  return {
    selectField,
    isFail,
    isWin
  }
}