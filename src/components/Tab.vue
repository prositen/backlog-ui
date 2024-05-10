<script setup>
import {ref} from "vue";
import {inject} from "vue";

const addTab = inject("addTab");
const activeTabHash = inject("activeTabHash");
const props = defineProps(["title"]);
const hash = ref("");
const isActive = ref(false);

import {onBeforeMount, watch} from "vue";

onBeforeMount(() => {
  hash.value = `#${props.title.toLowerCase().replace(/ /g, "-")}`;

  addTab({
    title: props.title,
    hash: hash.value,
  });
});

watch(activeTabHash, () => {
  isActive.value = activeTabHash.value === hash.value;
});
</script>
<template>
  <div v-show="isActive">
    <slot></slot>
  </div>
</template>
