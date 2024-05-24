<script setup>
import Link from './Link.vue'

const props = defineProps(['url', 'id'])

const shortcut_title = 'sc-' + props.id
</script>

<template>
  <Link :url="props.url" :title="props.url" :text="shortcut_title" target="_blank"/>
</template>

<style scoped>

</style>
