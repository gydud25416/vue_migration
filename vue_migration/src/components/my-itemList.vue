<template>
  <div class="wrap_list">
    <div class="list_header">
                <select  v-model="yearValue" @change="handleOnChangeYear">
                    <option value='전체'>전체</option>
                    <option v-for="year in years" :key="year">{{ year }}</option>
                </select>
                <div class="searchBox">
                  <input type='text' class='ItemSearch' @keydown.enter="handleOnChangeSearch" v-model="searchValue" placeholder='검색어를 입력하세요'  />
                  <MyButton :className="'btn_back'" :text="'검색'"  @click="handleOnChangeSearch" />
                </div>

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
import MyButton from './my-button.vue';
import { useRoute, useRouter } from 'vue-router';
import { watch } from 'vue';
import { useFetchStore } from '@/stores/storeFetch';

const plusFilter = ref<string>("all");
const searchValue = ref<string>("");
const searchTagValue = ref<string>("");
const yearValue = ref<string>("전체");
const datas = ref<Data[]>([]);
const years = ref<string[]>([]);

const fetchStore = useFetchStore();

const router = useRouter();
const route = useRoute();

/** 마운트 시점에서 리스트 불러오고 정렬
 * datas.value = 리스트 데이터
 * years.value = 년도 중복 제거한 배열 데이터
 */
onMounted(async (): Promise<void>=>{
  try {
    const result = await axios.get(`http://localhost:3001/item`);
    datas.value = result.data.sort((a:Data ,b:Data )=>{
      return new Date(b.day).getTime() - new Date(a.day).getTime() ;
    });
    years.value = [...new Set(datas.value.map((it)=> it.year))]
  }
  catch(error){
    console.error(error);
  }
})

// 리스트 삭제시 전역 상태 변경
function onDelete(delData:Data){
  fetchStore.delete(`http://localhost:3001/item/${delData.id}`)
}

// 전역 상태 변경 - 삭제
watch(
  ()=> fetchStore.watchDeleteData,
  (newData)=>{
    datas.value = datas.value.filter((it)=> it.id !== newData?.id);
  }
)

// 전체, 입금, 출금 필터링
function itemPlus(v:string){
  plusFilter.value = v;
  const newQuery = {...route.query, multiply: plusFilter.value}
  router.push({query:newQuery});
}

// 검색어 필터링
function handleOnChangeSearch(){
  if(!searchValue.value.trim()){
    const newQuery = {...route.query};
    delete newQuery["search"];
    router.push({query: newQuery})
    searchValue.value = "";
    searchTagValue.value = ""; // 빈값을 할당하여 formattedData computed가 작동하도록 함
  } else {
    const newQuery = {...route.query, search: searchValue.value}
    router.push({query:newQuery});
  }
}

function handleOnChangeYear(){
  const newQuery = {...route.query, year: yearValue.value};
  router.push({query:newQuery});
}

// url 쿼리값 감시하여 검색어 필터링
watch(
  ()=> route.query.search,
  (newData)=>{
    if(newData){
      searchTagValue.value = newData.toString();
    }
  }
)

// 새로고침하면 URL 쿼리값으로 필터링
onMounted(()=>{
  yearValue.value = route.query.year ? `${route.query.year}` : "전체";
  searchValue.value = route.query.search ? `${route.query.search}` : "";
  searchTagValue.value = route.query.search ? `${route.query.search}` : "";
  if(String(route.query.multiply).trim() === "1"){ // url을 통해 +1이라고 검색할 때
      route.query.multiply = "+1"
    }
  plusFilter.value = route.query.multiply ? `${route.query.multiply}` : "all";
})

// 최종 필터링된 리스트 데이터
const formattedData = computed(():Data[]=>{
  let results = datas.value;
  if (searchTagValue.value) {
    results = results.filter((it) => it.content.includes(searchTagValue.value));
  }
  if(yearValue.value !== "전체"){
    results = results.filter((it)=> it.year === yearValue.value);
  }
  if(plusFilter.value !== "all"){
    results = results.filter((it)=> it.multiply === plusFilter.value);
  }

  return results;
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
.wrap_list .list_header .ItemSearch {  text-align: right; border:0; border-bottom:2px solid #5967e4; padding: 5px 10px; font-family: 'GmarketSansMedium' ;}
.wrap_list .list_header .btn_back { font-size: 13px; padding:5px ; font-family: 'GmarketSansMedium' ;}

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

@media screen and (max-width:550px){
.wrap_view  li .day{font-size: 10px; }
.wrap_list .list_header input.ItemSearch{width:65%; margin-left:8px;}

}

</style>
