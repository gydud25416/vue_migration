<template>
 <div className="wrap_total">
            <h2>총 자산</h2>
            <p> {{ formattedTotal }} 원</p>
        </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted } from 'vue';
import {ref} from 'vue';
import type { Data } from '@/common.type';
import { computed } from 'vue';
import { watch } from 'vue';

const total = ref(0);
const datas = ref<Data[]>([]);

const props = defineProps<{
  fetchData:Data[]
}>();

onMounted(async ():Promise<void>=>{
  try{
    const results = await axios.get(`http://localhost:3001/item`);
    datas.value = results.data;
    total.value = datas.value.reduce((pre, now)=> pre + (Number(now.multiply) * Number(now.money)), 0)
  }
  catch(error){
    console.error(error);
  }
})

watch(
  ()=> props.fetchData,
  (newData)=>{
    datas.value = newData
    total.value = datas.value.reduce((pre, now)=> pre + (Number(now.multiply) * Number(now.money)), 0)
  }
)

const formattedTotal = computed(()=>{
  return total.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
})
</script>

<style scoped>
.wrap_total{border:1px #555 solid; width:100%;  }
.wrap_total h2 {text-align: center;}
.wrap_total p {text-align: right; padding:30px 50px 30px 0; font-size: 20px;}
</style>
