<script setup>

import {DeleteFilled, EditPen, InfoFilled} from "@element-plus/icons-vue";
import {computed, ref} from "vue";

const props = defineProps({
  item: {},
  reloadStoriesFn: {},
  editFn: {},
  removeFn: {},
  labelField: {
    default: 'name'
  },
  idField: {
    default: 'id'
  }
})

const removeTitle = computed(() => `Radera ${props.item[props.labelField]}? Fältet kommer tas bort från alla stories.`
)

async function editItem(fn, id, name) {
  if (name.length > 0) {
    await fn(id, name);
    editItemVisible.value = false;
  }
  await props.reloadStoriesFn();
}

const editItemVisible = ref(false);
const itemName = ref();

const confirmRemove = () => {
  props.removeFn(props.item[props.idField]);
  props.reloadStoriesFn();
}


</script>

<template>

  <div v-if="editItemVisible">
    <el-input
        @keyup.enter="editItem(editFn, item[idField], itemName)"
        size="small"
        style="width: 240px;"
        v-model="itemName"/>
    <el-button v-if="itemName" size="small" @click="editItem(editFn, item[idField], itemName)">
      Spara
    </el-button>
  </div>
  <div v-else>
    <div class="name">{{ item[labelField] }}</div>
    <el-button-group class="buttons">
      <el-button size="small"
                 :icon="EditPen"
                 @click="itemName = item['name']; editItemVisible=true"/>
      <el-popconfirm
          confirm-button-text="Ja, ta bort"
          cancel-button-text="Nej"
          width="300px"
          :icon="InfoFilled"
          icon-color="#626AEF"
          :title="removeTitle"
          @confirm="confirmRemove"
      >
        <template #reference>
          <el-button size="small" :icon="DeleteFilled"/>
        </template>
      </el-popconfirm>
    </el-button-group>
  </div>
</template>

<style scoped>
div.name {
  padding-right: 1rem;
  width: 400px;
  display: inline-block;
}
</style>
