<template>
    <MyHeader :title="'가계부'"/>
    <MyGraph/>
    <MyTotal :fetchData="fetchData"/>
    <MyItemList @deleteData="deleteData"/>
    <RouterLink to="/add"><Button :text="'추가하기'" :className="'btn_box'" /></RouterLink>

</template>

<script setup lang="ts">
import type { Data } from '@/common.type';
import Button from '@/components/my-button.vue';
import MyGraph from '@/components/my-graph.vue';
import MyHeader from '@/components/my-header.vue';
import MyItemList from '@/components/my-itemList.vue';
import MyTotal from '@/components/my-total.vue';
import axios from 'axios';
import { onMounted } from 'vue';
import { ref } from 'vue';

const fetchData = ref<Data[]>([]);

onMounted(async ():Promise<void>=>{
  try {
    const results = await axios.get('http://localhost:3001/item');
    fetchData.value = results.data.sort((a: Data, b:Data)=>{
      return Number(b.day) - Number(a.day)
    })
  }
  catch(error){console.error(error)}
})

function deleteData(id?: string){
  fetchData.value = fetchData.value.filter((it)=> it.id !== id);
}

</script>
