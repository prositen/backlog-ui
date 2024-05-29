<script setup>
import MarkdownIt from 'markdown-it';
import {computed} from "vue";

const props = defineProps({
  value: {},
  length: {default: 0}
})

const markdown = new MarkdownIt();
const short_value = computed(() => {
  if (props.length && props.value.length >= props.length) {
    return props.value.slice(0, props.length).trimEnd() + '...';
  }
  return props.value;

});
let read_more = false;

</script>

<template>
  <div v-if="read_more" v-html="markdown.render(value)"></div>
  <div v-else v-html="markdown.render(short_value)"></div>
</template>

<style scoped>

</style>
