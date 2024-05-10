<script setup>
import Backlog from './components/Backlog.vue';
import Tabs from "@/components/Tabs.vue";
import Tab from "@/components/Tab.vue";
</script>

<template>
  <main>

    <Tabs>
      <Tab title="P1 2024"><Backlog filter-by="period" filter-value="P1 2024"/></Tab>
      <Tab title="P2 2024"><Backlog filter-by="period" filter-value="P2 2024"/></Tab>
      <Tab title="Kanske nästa period"><Backlog filter-by="period" filter-value="Kanske nästa period"/></Tab>
      <Tab title="Kanske efter nästa period"><Backlog filter-by="period" filter-value="Kanske efter nästa period"/></Tab>
      <Tab title="Period ej satt"><Backlog filter-by="period" filter-value="null"/></Tab>
      <Tab title="PO/BO: Att prioritera"><Backlog filter-by="label" filter-value="PO/BO: Att prioritera"/></Tab>
      <Tab title="PO/BO: Önskemål"><Backlog filter-by="label" filter-value="PO/BO: Önskemål"/></Tab>
      <Tab title="Hög prio"><Backlog filter-by="priority" filter-value="High"/></Tab>
      <Tab title="Medium prio"><Backlog filter-by="priority" filter-value="Medium"/></Tab>
      <Tab title="Låg prio"><Backlog filter-by="priority" filter-value="Low"/></Tab>
    </Tabs>
  </main>

</template>

<style scoped>
header {
  line-height: 1.5;
}

</style>
