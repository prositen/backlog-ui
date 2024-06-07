<script setup>
import IconLink from "@/components/icons/IconLink.vue";

defineProps({
      'title': {},
      'url': {},
      'text': {},
      'target': {'default': '_self'}
    }
)
</script>

<template>
  <a :href="url" :title="title" :target="target">{{ text }}
    <IconLink size="10"/>
  </a>
</template>

<style scoped>

</style>
