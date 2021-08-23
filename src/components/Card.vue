<template>
  <div :class="getCardStatus" @click="select(field.id)"></div>
</template>

<script>
import { GAME_STATUS,FIELD } from '@/constants';
import { computed } from '@vue/reactivity';
export default {
name:"Card",
props:{
    field:{
        type:Object,
        required:true,
    },
    gameStatus:{
        type:Number,
        required:false,
        default:GAME_STATUS.none,
    }
  },
  setup(props){
      const getCardStatus = computed(()=>{
        let classes = 'card ';
      
      if (props.field.value === FIELD.filled && props.gameStatus === GAME_STATUS.preshow
        || props.field.clicked && props.field.value === FIELD.filled) {
        classes += 'active';
      }

      if (props.field.clicked && props.field.value === FIELD.empty){
          classes += 'error';
      }
      
      return classes;

      });
       return {
      getCardStatus
        }
  },

  methods:{
      select(id) {
          if (this.gameStatus == GAME_STATUS.gameStarted){
          this.$emit('selectField', id);
          }
      }
  }
}
</script>

<style scoped>
.card{
    position: relative;
    width: 100px;
    height: 100px;
    background: #ccc;
    margin: 5px;
    cursor: pointer;
    
    transition: .5s;
    transform-style: preserve-3d;

}
.card.active{
    background: rgb(0, 153, 255);
    transform: rotateY(180deg);
}

.card.error{
    background: rgb(199, 53, 53);
    transform: rotateY(180deg);
}

</style>