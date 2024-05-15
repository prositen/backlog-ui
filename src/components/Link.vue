<script setup>
import IconLink from "@/components/icons/IconLink.vue";

defineProps(['title', 'url', 'text'])
</script>

<template>
  <a :href="url" :title="title">{{ text }}
    <IconLink size="10"/>
  </a>
</template>

<style scoped>

</style>
