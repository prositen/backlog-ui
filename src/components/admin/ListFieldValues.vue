<script setup>
import AddFieldValue from "@/components/admin/AddFieldValue.vue";
import EditFieldValue from "@/components/admin/EditFieldValue.vue";


defineProps({
  header: {},
  apiItems: {},
  labelField: {
    default: 'name'
  },
  addFn: {},
  removeFn: {},
  editFn: {},
  reloadStoriesFn: {}
})

</script>


<template>
  <h2>{{ header }}</h2>

  <div class="cell">
    <slot></slot>
    <div class="item" v-for="item in apiItems">
      <EditFieldValue :edit-fn="editFn"
                      :remove-fn="removeFn"
                      :reload-stories-fn="reloadStoriesFn"
                      :item="item"/>
    </div>
    <AddFieldValue :add-fn="addFn"/>
  </div>

</template>

<style scoped>

</style>
