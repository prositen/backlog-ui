<script setup>
import Backlog from './components/Backlog.vue';
import {onMounted} from "vue";
import {useBacklogStore} from "@/store/backlog.js";
import {usePersonStore} from "@/store/persons.js";
import Admin from "@/components/Admin.vue";

const backlogStore = useBacklogStore();
const personStore = usePersonStore();
onMounted(() => {
  backlogStore.fetchBacklog();
  personStore.fetchPersons();
})


</script>

<template>
  <main>

    <el-tabs tab-position="right" stretch="stretch">
      <el-tab-pane label="Backlog"><Backlog/></el-tab-pane>
      <el-tab-pane label="Admin"><Admin /></el-tab-pane>
    </el-tabs>

  </main>

</template>

<style scoped>

header {
  line-height: 1.5;
}


</style>
