<script setup>
import Backlog from './components/Backlog.vue';
import {onMounted} from "vue";
import {useBacklogStore} from "@/store/backlog.js";

const store = useBacklogStore();

onMounted(() => {
  store.fetchBacklog();
})


</script>

<template>
  <main>

    <Backlog/>
  </main>

</template>

<style scoped>
header {
  line-height: 1.5;
}


</style>
