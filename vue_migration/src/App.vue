<template>
    <div class="main_wrap" ref="imageWrapper">
        <RouterView/>
    </div>
  <button class="capture_btn" title="캡처하기" @click="takeScreenshot('result')">
    <img src="./assets/capture.png" alt="출력하기">
  </button>

</template>

<script setup lang="ts">
import html2canvas from 'html2canvas';
import {RouterView } from 'vue-router'
import { ref } from 'vue';

const imageWrapper = ref();

const takeScreenshot = (id: string) => {
  html2canvas(imageWrapper.value, {
    logging: false,
    allowTaint: true,
    scale: window.devicePixelRatio,
    // width: shareContent.clientWidth,
    // height: shareContent.clientHeight,
    scrollY: 0,
    scrollX: 0,
    useCORS: true,
    backgroundColor: '#555',
  }).then((canvas) => {
    const imgUrl = canvas.toDataURL('image/png');
    const tempLink = document.createElement('a');
    tempLink.href = imgUrl;
    tempLink.setAttribute('download', id);
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(imgUrl);
  });
};

</script>

<style>
  @import url("./styles/default.css");
  .capture_btn{position:absolute; right:2%; bottom:2%; width:60px; height:60px; padding: 15px; transition:0.5s; background:#5967e4; border-radius: 50%;}
  .capture_btn:hover{bottom:2.5%;}
</style>
