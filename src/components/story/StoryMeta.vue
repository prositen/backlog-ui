<script setup>
defineProps(['header'])
</script>

<template>
  <div class="story-meta">{{ header }}:
    <slot></slot>
  </div>
</template>

<style scoped>
.story-meta {
  font-size: small;
  margin-top: 0.5rem;
}
</style>
