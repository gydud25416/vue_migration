<script setup lang="ts">
import Button from '@/components/my-button.vue';
import MyHeader from '@/components/my-header.vue';

function onSubmit(){

}

function onlyNumber(){

}
</script>

<template>
  <div className="wrap_add  "  >
    <MyHeader :title="'추가하기'"/>

    <input className='date' id='dataInput'    type='date'  />
    <div>
        <label for='memo' style="display: block; font-size: 18px;">메모</label>
        <input id='memo'  className='text2' placeholder='메모를 입력하세요.'  ref={contentRef} type='text'/>
        <select ref={plusRef} >
            <option value="+1">입금</option>
            <option value="-1">출금</option>
        </select>
        <input className='text' placeholder='금액를 입력하세요.' @change="onlyNumber"  ref={textRef} type='text'/>
    </div>
    <div className='btn'>
        <Button  text="등록" @click="onSubmit" class="btn_add" />
        <RouterLink to="/"><Button :text="'취소'" /></RouterLink>
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
