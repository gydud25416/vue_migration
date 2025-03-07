<template>
        <ul className='plusFilter graph'>
                    <li :class="plusFilter === '+1' ? 'on' : ''" @click="PlusFilter('+1')">수입</li>
                    <li :class="plusFilter === '-1' ? 'on' : ''" @click="PlusFilter('-1')">지출</li>
                </ul>
        <div className="wrap_graph">
            {[2022, 2023, 2024].map((year)=>(
                <div className='graph_box' key={year}>
                    <!-- <div className='graph_item ' style={{height: yearFilter[year] + "%"}}></div> -->
                    <p>{year}</p>
                 </div>
            ))}
        </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  plusFilter : string
}>();
function PlusFilter(value:string){
  console.log(value)
}
</script>

<style scoped>

</style>
