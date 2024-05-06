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
  }[props.value] ?? "Saknas"
});

</script>

<template>
  <div class="story-period" :title="`Period: ${value}`">
    <span> {{ selectedPeriod }}</span>
  </div>

</template>

<style scoped>
div.story-period {
  display: inline-block;
  font-size: x-small;
}

.period-container span {
  border: 1px solid grey;
  padding: 2px;
}
</style>
