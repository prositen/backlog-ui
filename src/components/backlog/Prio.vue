<script setup>
import IconMediumPrio from "@/components/icons/IconMediumPrio.vue";
import IconHighPrio from "@/components/icons/IconHighPrio.vue";
import IconLowPrio from "@/components/icons/IconLowPrio.vue";
import {computed} from "vue";

const props = defineProps(['value'])

const lc_value = (props.value ?? '').toLowerCase();

const selectedPrio = computed(() => {
  return {
    high: IconHighPrio,
    medium: IconMediumPrio,
    low: IconLowPrio
  }[lc_value]
});


</script>

<template>
  <div :class="`prio-${lc_value} story-prio`" v-if="lc_value" :title="`Prio: ${lc_value}`">
    <component :is="selectedPrio"/>
  </div>
  <div v-else class="story-prio" title="Prio: Saknas"></div>
</template>

<style scoped>


</style>
