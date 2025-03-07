<template>
  <header>
      <h1>{{ title }}</h1>
  </header>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  title: string;
}>();
</script>

<style scoped>
header{ text-align: center; padding-bottom:30px;}
</style>
