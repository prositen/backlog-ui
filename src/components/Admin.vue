<script setup>
import {useBacklogStore} from "@/store/backlog.js";
import {usePersonStore} from "@/store/persons.js";
import {ref} from "vue";


const blStore = useBacklogStore();
const pStore = usePersonStore();
const addPersonVisible = ref(false);
const personName = ref();

async function addPerson(name) {
  await pStore.addPerson(name);
  addPersonVisible.value = false;
  addPerson.value = "";
}
</script>

<template>
  <div class="admin-stories">
    <h2>Stories</h2>
    <el-button :disabled="blStore.loading" type="primary" @click="blStore.updateFromShortcut">Uppdatera från shortcut
    </el-button>
    <div v-loading="blStore.loading">
      {{ blStore.message }}
    </div>
  </div>
  <hr>
  <div class="admin-persons">
    <h2>Personer</h2>

    <div v-for="person in pStore.persons">{{ person.name }}</div>
    <div v-if="addPersonVisible">
      <el-input
          size="small"
          v-model="personName"></el-input>
      <el-button v-if="personName" size="small" @click="addPerson(personName)">Spara</el-button>
    </div>

    <el-button v-else @click="addPersonVisible=true">+ Lägg till</el-button>

  </div>
</template>

<style scoped>

</style>
