<template>
 <div className="wrap_total">
            <h2>총 자산</h2>
            <p> {{ total }} 원</p>
        </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted } from 'vue';
import {ref} from 'vue';
import type { Data } from '@/common.type';

const total = ref("");
const datas = ref<Data[]>([]);


onMounted(async ():Promise<void>=>{
  try{
    const results = await axios.get(`http://localhost:3001/item`);
    datas.value = results.data;
    total.value = datas.value.reduce((pre, now)=> pre + (Number(now.multiply) * Number(now.money)), 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  catch(error){
    console.error(error);
  }
})
</script>

<style scoped>
.wrap_total{border:1px #555 solid; width:100%;  }
.wrap_total h2 {text-align: center;}
.wrap_total p {text-align: right; padding:30px 50px 30px 0; font-size: 20px;}
</style>
