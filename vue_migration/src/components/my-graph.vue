<template>
        <ul className='plusFilter graph'>
                    <li :class="plusFilter === '+1' ? 'on' : ''" @click="PlusFilter('+1')">수입</li>
                    <li :class="plusFilter === '-1' ? 'on' : ''" @click="PlusFilter('-1')">지출</li>
                </ul>
        <div className="wrap_graph">
            <div class='graph_box' v-for="year in years" :key="year">
                    <div className='graph_item ' :style="{height: formattedPercent[year] + '%'}"></div>
                    <p>{{ year }}</p>
            </div>
        </div>
</template>

<script setup lang="ts">
import type { Data } from '@/common.type';
import axios from 'axios';
import { watch } from 'vue';
import { computed } from 'vue';
import { onMounted } from 'vue';
import { reactive } from 'vue';
import { ref } from 'vue';
import { useFetchStore } from '@/stores/storeFetch';

const years = ref<string[]>([]);
const datas = ref<Data[]>([]);
const plusFilter = ref<string>("+1");
const yearFilter = reactive<Record<string, number>>({});

const fetchStore = useFetchStore();

function PlusFilter(value:string){
  plusFilter.value = value === "+1" ? "+1" : "-1";
}

onMounted(async ():Promise<void>=>{
  try{
    const results = await axios.get(`http://localhost:3001/item`);
    datas.value = results.data;
    years.value = [...new Set(datas.value.map(item => item.year).sort((a,b)=> Number(a) - Number(b)))];
  }
  catch(error){console.error(error)}
});

watch(
  ()=> fetchStore.watchDeleteData,
  (newData)=>{
    datas.value = datas.value.filter((it)=> it.id !== newData?.id);
  }
)

const formattedPercent = computed(()=>{
  const plusTotal = datas.value.filter((it)=> it.multiply === plusFilter.value).reduce((pre, now) => pre + Number(now.money), 0);
  const yearsMoneyArray = years.value.map((year)=>
    datas.value.filter((it)=> it.year === year && it.multiply === plusFilter.value).reduce((pre, now)=> pre + Number(now.money), 0)
  )
  const percentArray = yearsMoneyArray.map((money)=> Math.round((money / plusTotal)*100) )
  years.value.forEach((item, idx)=>{
    yearFilter[item] = percentArray[idx]
  })
  return yearFilter
})

</script>

<style scoped>
.wrap_graph{ border:1px solid #555; padding:50px 20px 0 20px; display: flex; gap:30px; justify-content: center;  background:#dee1f3; }

.wrap_graph .graph_box{ position:relative; width:30px; height:180px;  border-radius: 5px 5px 0 0; display: flex; flex-direction: column; align-items: center; background:#fff; box-shadow: 3px 0px 5px rgba(0, 0, 0, 0.2);}
.wrap_graph .graph_box .graph_item{width:100%; height:0%; background:#5967e4; position:absolute; bottom:0; transition:0.5s; }
.wrap_graph .graph_box p{ position:absolute; top:100%; padding-top:10px; }

.plusFilter.graph {display: flex; justify-content: flex-end; padding-bottom:5px;}
.plusFilter.graph li{padding:0 5px;  cursor: pointer;}
.plusFilter.graph   li.on{color:#5967e4; }
.plusFilter.graph   li:nth-child(2){ border-left:2px solid #555;}
</style>
