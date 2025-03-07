<script setup lang="ts">
import Button from '@/components/my-button.vue';
import MyGraph from '@/components/my-graph.vue';
import MyHeader from '@/components/my-header.vue';
import MyItemList from '@/components/my-itemList.vue';
import MyTotal from '@/components/my-total.vue';

</script>

<template>
    <MyHeader :title="'가계부'"/>
    <MyGraph/>
    <MyTotal/>
    <MyItemList/>
    <RouterLink to="/add"><Button :text="'추가하기'" /></RouterLink>

</template>
