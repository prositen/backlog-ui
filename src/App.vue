<script setup>
import Backlog from './components/Backlog.vue';
import Tabs from "@/components/Tabs.vue";
import Tab from "@/components/Tab.vue";
import {onMounted} from "vue";
import {useBacklogStore} from "@/store/backlog.js";

const store = useBacklogStore();

onMounted(() => {
  store.fetchBacklog();
})


</script>

<template>
  <main>

    <nav>
      <Tabs>
        <Tab groupIndex=0 groupTitle="Alla" title="Alla"><Backlog /></Tab>
        <Tab groupIndex=1 groupTitle="Period"
             v-for="period in store.periods" :title="`${period ?? 'Ej satt'}`">
          <Backlog filter-by="period" :filter-value="period"/>
        </Tab>
        <Tab groupIndex=2 groupTitle="Prio"
             v-for="prio in store.prios" :title="`${prio ?? 'Ej satt'}`">
          <Backlog filter-by="priority" :filter-value="prio"/>
        </Tab>
        <Tab groupIndex=3 groupTitle="Label"
             v-for="label in store.labels" :title="`${label ?? 'Ej satt'}`">
          <Backlog filter-by="label" :filter-value="label"/>
        </Tab>

      </Tabs>
    </nav>
  </main>

</template>

<style scoped>
header {
  line-height: 1.5;
}

main nav h2 {
  font-size: 2rem;
}

</style>
