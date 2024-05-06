<script setup>
import IconLink from "@/components/icons/IconLink.vue";

defineProps(['title', 'url'])
</script>

<template>
  <a :href="url" :title="title">{{ title }}
    <IconLink size="10"/>
  </a>
</template>

<style scoped>

</style>
