<template>
        <ul className='plusFilter graph'>
                    <li :class="plusFilter === '+1' ? 'on' : ''" @click="PlusFilter('+1')">수입</li>
                    <li :class="plusFilter === '-1' ? 'on' : ''" @click="PlusFilter('-1')">지출</li>
                </ul>
        <div className="wrap_graph">
            <div class='graph_box' v-for="year in years" :key="year">
                <p>{{ year }}</p>
            </div>
        </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const years = ref([2022, 2023, 2024]);
const plusFilter = ref<string>("+1");
function PlusFilter(value:string){
  plusFilter.value = value === "+1" ? "+1" : "-1";
}

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
