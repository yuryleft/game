
import{ FIELD, GAME_STATUS, GAME_SPEED } from '@/constants';
import { computed } from '@vue/reactivity';
export default function useGameStart(init,fields,difficult,number,gameStatus){
    
    const start = () => {
        init();
        prepareGame();
      };
      
      const prepareGame = () => {
        gameStatus.value= GAME_STATUS.preshow;

        for (let i = 0; i < difficult.value; i++) {
          const index = rand(0, number - 1);
          
          if (fields.value[index].value !== FIELD.filled) {
            fields.value[index].value = FIELD.filled;
          } else {
            i--;
          }
        }

        setTimeout(() => {
            
            gameStatus.value = GAME_STATUS.gameStarted;
          }, GAME_SPEED);
       

      };

      const rand = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
      };

      const Started = computed(() => {
        return gameStatus.value !== GAME_STATUS.preshow && gameStatus.value !== GAME_STATUS.win;
      });

      return {
       start,
       Started
      }
}