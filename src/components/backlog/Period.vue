<script setup>
import {computed} from "vue";

const props = defineProps(['value'])

const selectedPeriod = computed(() => {
  return {
    "P1 2024": {name: "P1 2024", type: "danger"},
    "P2 2024": {name: "P2 2024", type: "success"},
    "P3 2024": {name: "P3 2024", type: "info"},
    "Kanske nästa period": {name: "Nästa?", type: "info"},
    "Kanske efter nästa period": {name: "Efter nästa??", type: "info"}
  }[props.value] ?? {name: "", type: null}
});

</script>

<template>
  <div v-if="value" class="story-period" :title="`Period: ${selectedPeriod.name}`">
    <el-tag :type="selectedPeriod.type" effect="plain">{{ selectedPeriod.name }}</el-tag>

  </div>
  <div v-else title="Period: Saknas"></div>

</template>

<style scoped>


</style>
