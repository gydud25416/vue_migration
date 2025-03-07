<template>
  <button :class="className">{{ text }}</button>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';

  defineProps<{
    text: string
    className: string
  }>();

</script>

<style scoped>

.btn_back{background:#555;}
.btn_add{background:#5967e4;}
.btn_box{width:60%; padding:15px; display: block; margin:0 auto; background:#5967e4; font-size: 18px;}
.btn_box.off{background:rgba(0,0,0,0.3);}

</style>
