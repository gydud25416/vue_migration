<script setup lang="ts">
import Button from '@/components/my-button.vue';
import MyHeader from '@/components/my-header.vue';

</script>

<template>
    <MyHeader :title="'가계부'"/>
    <RouterLink to="/add"><Button :text="'추가하기'" /></RouterLink>

</template>
