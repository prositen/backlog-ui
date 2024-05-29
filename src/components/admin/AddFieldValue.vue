<script setup>

import {ref} from "vue";

defineProps({
  addFn: {}
})

async function addItem(fn, name) {
  if (name.length > 0) {
    await fn(name);
    addItemVisible.value = false;
    itemName.value = "";
  }
}

const addItemVisible = ref(false);
const itemName = ref();
</script>

<template>
<div v-if="addItemVisible">
      <el-input
          @keyup.enter="addItem(addFn, itemName)"
          size="small"
          style="width: 240px;"
          v-model="itemName"></el-input>
      <el-button v-if="itemName" size="small" @click="addItem(addFn, itemName)">
        Spara
      </el-button>
    </div>
    <el-button v-else @click="addItemVisible=true">+ Lägg till</el-button>
</template>

<style scoped>

</style>
