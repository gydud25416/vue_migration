<template>
  <div class="wrap_list">
    <div class="list_header">
                <select @change='handleOnChange'>
                    <option value='전체'>전체</option>
                    <option value='2024'>2024</option>
                    <option value='2023'>2023</option>
                    <option value='2022'>2022</option>
                </select>
                <input type='text'   class='ItemSearch' placeholder='검색어를 입력하세요'  @change="handleOnChangeSearch" />
                <ul class='plusFilter'>
                    <li :class='plusFilter === "all" ? "on" : ""' @click="itemPlus('all')">전체</li>
                    <li :class='plusFilter === "+1" ? "on" : ""' @click="itemPlus('+1')">입금</li>
                    <li :class='plusFilter === "-1" ? "on" : ""' @click="itemPlus('-1')">전체</li>
                </ul>
    </div>
    <div className='list_view'>
      <ul v-if="datas.length <= 0"  className="wrap_view">
         <li style="justify-content: center;">내역이 없습니다.</li>
      </ul>
      <ul v-else  className="wrap_view">
        <li className='abc' v-for="data in datas" :key="data.id">
          <p :style="{color: data.multiply === '+1' ? 'blue' : 'red'}">{{ data.multiply === '+1' ? '입금' : '출금' }}</p>
          <p className='day'>{{data.day}}</p>
          <p>{{data.content}}</p>
          <p>{{data.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}} 원</p>
          <button @click="onDelete">X</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue';
import axios from 'axios'

export interface Data {
  id: string,
  money: string,
  year: string,
  day: string,
  content: string,
  multiply: string
}

const plusFilter = ref<string>("all");
const datas = ref<Data[]>([]);

onMounted(async (): Promise<void>=>{
  try {
    const result = await axios.get(`http://localhost:3001/item`);
    datas.value = result.data;
    console.log(result)
  }
  catch(error){
    console.error(error);
  }
})

function onDelete(){

}

function itemPlus(value:string){
  plusFilter.value = value;
}

function handleOnChange(){

}

function handleOnChangeSearch(){

}
</script>

<style scoped>
.wrap_list .list_header{ display: flex; align-items: center; justify-content: space-between;}
.wrap_list .list_header select{padding:5px 10px; border-radius: 5px; background:#5967e4; border:0; color:#fff; font-family: 'GmarketSansMedium'}
.wrap_list .list_header select option{ background:#919bf0; color:#fff; border-radius: 0; }
.wrap_list .list_header ul{display: flex;}
.wrap_list .list_header ul li{padding:0 5px;  cursor: pointer;}
.wrap_list .list_header ul li.on{color:#5967e4; }
.wrap_list .list_header ul li:nth-child(2){border-right:2px solid #555;border-left:2px solid #555;}
.wrap_list .list_header .ItemSearch { width:50%; text-align: right; border:0; border-bottom:2px solid #5967e4; padding: 5px 10px; font-family: 'GmarketSansMedium' ;}

.wrap_view  {margin-top:5px; border-bottom:2px #555 solid; border-top:2px #555 solid;}
.wrap_view  li { padding:12px 10px; border-bottom:2px #efefef solid; display: flex; justify-content: space-between; align-items: center;  }
.wrap_view  li:last-child{border-bottom:0;}
.wrap_view  li button{padding:5px 8px; font-size: 13px;}
.wrap_view p{line-height: 16px;}
.wrap_view  li .day{color:#666; font-size: 13px; }
.wrap_view p:nth-child(1) { width: 8%;}
.wrap_view p:nth-child(2) { width: 20%;}
.wrap_view p:nth-child(3) { width:33%;}
.wrap_view p:nth-child(4) { width: 22%;}

</style>
