<script setup>
import {computed, onMounted, unref} from "vue";
import {useDark} from '@vueuse/core'
import {useHead} from "@unhead/vue";

import {useBacklogStore} from "@/store/backlog.js";
import {usePersonStore} from "@/store/persons.js";
import {useComponentStore} from "@/store/components.js";
import {useEpicGroupStore} from "@/store/epicgroup.js";

import Backlog from './components/backlog/Backlog.vue';
import Admin from "@/components/admin/Admin.vue";

const backlogStore = useBacklogStore();
const personStore = usePersonStore();
const componentStore = useComponentStore();
const epicGroupStore = useEpicGroupStore();

onMounted(() => {
  backlogStore.fetchBacklog();
  personStore.fetchPersons();
  componentStore.fetchComponents();
  epicGroupStore.fetchEpicGroups();
})

const isDark = useDark();

useHead({
  htmlAttrs: {
    class: computed(() => (unref(isDark) ? 'dark' : ''))
  },
  bodyAttrs: {
    class: computed(() => (unref(isDark) ? 'dark' : ''))
  },
})

</script>

<template>
  <main>

    <el-tabs tab-position="right" stretch="stretch">
      <el-tab-pane label="Backlog">
        <Backlog/>
      </el-tab-pane>
      <el-tab-pane label="Admin">
        <Admin/>
      </el-tab-pane>
    </el-tabs>

  </main>
</template>

<style scoped>

header {
  line-height: 1.5;
}


</style>
