<template>
  <div class="wrap_list">
    <div class="list_header">
                <select  v-model="yearValue">
                    <option value='전체'>전체</option>
                    <option value='2024'>2024</option>
                    <option value='2023'>2023</option>
                    <option value='2022'>2022</option>
                </select>
                <input type='text'   class='ItemSearch' placeholder='검색어를 입력하세요'  @change="handleOnChangeSearch" />
                <ul class='plusFilter'>
                    <li :class='plusFilter === "all" ? "on" : ""' @click="itemPlus('all')">전체</li>
                    <li :class='plusFilter === "+1" ? "on" : ""' @click="itemPlus('+1')">입금</li>
                    <li :class='plusFilter === "-1" ? "on" : ""' @click="itemPlus('-1')">출금</li>
                </ul>
    </div>
    <div className='list_view'>
      <ul v-if="formattedData.length <= 0"  className="wrap_view">
         <li style="justify-content: center;">내역이 없습니다.</li>
      </ul>
      <ul v-else  className="wrap_view">
        <li className='abc' v-for="data in formattedData" :key="data.id">
          <p :style="{color: data.multiply === '+1' ? 'blue' : 'red'}">{{ data.multiply === '+1' ? '입금' : '출금' }}</p>
          <p className='day'>{{data.day}}</p>
          <p>{{data.content}}</p>
          <p>{{data.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}} 원</p>
          <button @click="onDelete(data)">X</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue';
import axios from 'axios'
import type { Data } from '@/common.type';
import { computed } from 'vue';

const plusFilter = ref<string>("all");
const yearValue = ref<string>("전체");
const datas = ref<Data[]>([]);
const originalDatas = ref<Data[]>([]);

const emit = defineEmits<{
  (event: 'deleteData', id?: string):void;
}>();

onMounted(async (): Promise<void>=>{
  try {
    const result = await axios.get(`http://localhost:3001/item`);
    originalDatas.value = result.data.sort((a:Data ,b:Data )=>{
      return new Date(b.day).getTime() - new Date(a.day).getTime() ;
    });
    datas.value = originalDatas.value;
  }
  catch(error){
    console.error(error);
  }
})

async function onDelete(delData:Data){
  if(window.confirm("삭제하시겠습니까?")){
    try{
      const result = await axios.delete(`http://localhost:3001/item/${delData.id}`);

      if (result.data && result.data.id) {
        datas.value = datas.value?.filter((it) => it.id !== result.data.id);
        alert("삭제되었습니다.");

        emit('deleteData', delData.id)

      } else {
        alert("삭제 실패: 응답 데이터가 올바르지 않습니다.");
      }
    }
    catch(error){
      console.error("삭제 중 오류 발생:", error);
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  }
}

// 전체, 입금, 출금 필터링
function itemPlus(value:string){
  plusFilter.value = value;
  datas.value = originalDatas.value.filter((it)=> it.multiply === value);
  if(value=== "all"){
    datas.value = originalDatas.value;
  }
}

function handleOnChangeSearch(){
}

const formattedData = computed(():Data[]=>{
  let resluts = originalDatas.value;
  if(yearValue.value !== "전체"){
    resluts = resluts.filter((it)=> it.year === yearValue.value);
  }
  if(plusFilter.value !== "all"){
    resluts = resluts.filter((it)=> it.multiply === plusFilter.value);
  }

  return resluts;

})

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
