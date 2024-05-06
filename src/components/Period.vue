<script setup>
import {computed} from "vue";

const props = defineProps(['value'])

const selectedPeriod = computed(() => {
  return {
    "P1 2024": "P1/2024",
    "P2 2024": "P2/2024",
    "P3 2024": "P3/2024",
    "Kanske nästa period": "Nästa?",
    "Kanske efter nästa period": "Efter nästa??",
  }[props.value] ?? ""
});

</script>

<template>
  <div v-if="value" class="story-period" :title="`Period: ${selectedPeriod}`">
    <span> {{ selectedPeriod }}</span>
  </div>
  <div v-else title="Period: Saknas"></div>

</template>

<style scoped>


</style>
