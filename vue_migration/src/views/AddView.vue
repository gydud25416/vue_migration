<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/my-button.vue';
import MyHeader from '@/components/my-header.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const priceValue = ref("");
const priceRef = ref();
const memoValue = ref("");
const memoRef = ref();
const dateValue = ref("");
const dateRef = ref();
const multiplyValue = ref("+1");

const router = useRouter();

function dateInput(){
  if(dateRef.value.showPicker){
    dateRef.value.showPicker();
  } else {
    dateRef.value.readOnly = false;
    dateRef.value.focus();
    dateRef.value.readOnly = true;
  }
}

async function onSubmit(){
  const onlyNumberTest = /[^0-9]/;

  if(!dateValue.value){
    alert("날짜를 선택해주세요.")
    return;
  }
  if(!memoValue.value){
    alert("메모를 입력해주세요.");
    memoRef.value.focus();
    return;
  }

  if(!priceValue.value){
    alert("금액을 입력해주세요");
    priceRef.value.focus()
    return;
  }
  if(priceValue.value.match(onlyNumberTest)){
    alert("금액은 숫자만 기재해주세요.");
    priceValue.value = "";
    priceRef.value.focus()
    return;
  }
  if(window.confirm("저장하시겠습니까?")){
    try {
        const results = await axios.post(`http://localhost:3001/item/`,{
        money: priceValue.value,
        year: dateValue.value.split('-')[0],
        day: dateValue.value,
        content: memoValue.value,
        multiply: multiplyValue.value
      })
      console.log(results.data);
      router.push('/');
    }
    catch(error){
      console.error(error);
    }

    alert("저장되었습니다.");
    memoValue.value = "";
    priceValue.value = "";
    dateValue.value = "";
  }
}

function onlyNumber(){
  priceValue.value = priceValue.value.replace(/[^0-9]/, '');
}
</script>

<template>
  <div className="wrap_add  "  >
    <MyHeader :title="'추가하기'"/>

    <input className='date' id='dataInput' @click="dateInput" @focus="dateInput" ref="dateRef" v-model="dateValue"  type='date'  />
    <div>
        <label for='memo' style="display: block; font-size: 18px;">메모</label>
        <input id='memo'  className='text2' placeholder='메모를 입력하세요.' ref="memoRef" v-model="memoValue" type='text'/>
        <select ref={plusRef} v-model="multiplyValue" >
            <option value="+1">입금</option>
            <option value="-1">출금</option>
        </select>
        <input className='text' placeholder='금액를 입력하세요.' @input="onlyNumber" ref="priceRef" v-model="priceValue"  type='text'/>
    </div>
    <div className='btn'>
        <Button  text="등록" @click="onSubmit" :className="'btn_add'" />
        <RouterLink to="/"><Button :text="'취소'" :className="'btn_back'" /></RouterLink>
    </div>
  </div>
</template>

<style>

.main_wrap.wrap_add{ margin-top:1px;}
.main_wrap.wrap_add>div{margin-bottom:20px;}

.wrap_add h2 { text-align: center;}
.wrap_add .date{  padding:10px 8px; height:30px; margin:20px 0; width:100%; border:#555 2px solid; }

.wrap_add input{font-family: 'GmarketSansMedium'; border-radius: 5px; height:50px; border:2px #555 solid; box-sizing: border-box; font-size: 18px; text-align: right; padding:3px 8px; }
.wrap_add input:focus{border:#5967e4 2px solid; outline : 0;}

.wrap_add select{font-family: 'GmarketSansMedium'; border:2px #555 solid; padding:3px 8px; height:50px;  border-radius: 5px; background:#5967e4; border:0; color:#fff;font-size: 18px; width:20%; }
.wrap_add select option{color:#fff; background:#919bf0;}

.wrap_add .text{ width:80%; text-align: right; margin-top:30px;}
.wrap_add .text2{ width:100%;  text-align: right;}
.wrap_add .btn{ display: flex; justify-content: center; gap:10px; margin-top:10px;}


</style>
