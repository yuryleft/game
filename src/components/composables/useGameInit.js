import{ref,onBeforeMount, watch} from "vue";
import{ FIELD,DEFAULT_DIFFICULT } from '@/constants';
import { MAX_DIFFICULT } from "../../constants";
export default function useGameInit(number){
    let difficult = ref(DEFAULT_DIFFICULT);
    let fields = ref([]);

    const init = () => {
        fields.value = [];
        
        for (let i = 0; i < number; i++) {
          fields.value.push({
            id: i,
            clicked: false,
            value: FIELD.empty,
          });
        }
      }

      watch(difficult,(newDifficult)=>{
        if (newDifficult > MAX_DIFFICULT){
          difficult.value = MAX_DIFFICULT;
        }

      })
       
      onBeforeMount(init);

      return{
          difficult,
          fields,
          init
      }
}