<script setup>
import {ref} from "vue";

defineProps({
  storyItems: {},
  apiItems: {},
  labelField: {
    default: 'name'
  },
  idField: {
    default: 'id'
  },
  addFn: {},
  removeFn: {},
  storyId: {},
  type: {default: 'success'}
})

const addVisible = ref(false);
const addItem = ref();

async function addItemToStory(fn, story_id, item_id) {
  await fn(story_id, item_id);
  addItem.value = '';
  addVisible.value = false;
}
</script>

<template>
  <el-tag v-for="item in storyItems"
          :type="type"
          :key='item[idField]'
          effect="plain"
          closable
          @close="removeFn(storyId, item[idField])"
  >{{ item[labelField] }}
  </el-tag>
  <div v-if="addVisible">
    <el-select clearable
               v-model="addItem"
               class="w-20"
               size="small"
               style="width: 400px;"
               @clear="addVisible=false">
      <el-option
          v-for="item of apiItems"
          :key="item[idField]"
          :label="item[labelField]"
          :value="item[idField]"
      />

    </el-select>
    <el-button v-if="addItem" size="small" @click="addItemToStory(addFn, storyId, addItem)">Spara</el-button>
  </div>
  <el-button v-else class="button-new-tag" size="small" @click="addVisible = true">
    + Lägg till
  </el-button>
</template>

<style scoped>

</style>
