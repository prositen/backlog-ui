<script setup>
import {computed, ref} from "vue";

const props = defineProps({
  titleClass: {},
  title: {},
  items: {},
  addNull: {default: false},
  simpleList: {default: false}
})

const filterItem = ref('all');

</script>

<template>
  <span :class="titleClass">{{ title }}:</span>
  <el-select v-model="filterItem"
             filterable
             @change="$emit('selected', filterItem)">
    <el-option
        key="all"
        label="Alla"
        value="all"/>
    <template v-if="simpleList">
      <el-option
          v-for="item in items"
          :key="item ?? 'none'"
          :label="item ?? 'Ej satt'"
          :value="item ?? 'null'"/>
    </template>
    <template v-else>
      <el-option
          v-for="item in items"
          :key="item.id"
          :label="item.name"
          :value="item.id"/>
      <el-option
          key="none"
          label="Ej satt"
          value="null"/>
    </template>

  </el-select>
</template>

<style scoped>
.el-select {
  padding-bottom: 0.8rem;
}

.shortcut:before {
  background-image: url("/Shortcut.svg");
  background-size: 1rem 1rem;
  width: 1rem;
  height: 1rem;
  background-repeat: no-repeat;
  content: "";
  display: inline-block;
  margin-right: 0.2rem;
}

</style>
