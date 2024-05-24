<script setup>
defineProps(['header'])
</script>

<template>
  <div class="story-meta">{{ header }}:
    <slot>Test</slot>
  </div>
</template>

<style scoped>

</style>
