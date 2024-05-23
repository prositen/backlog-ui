<script setup>
import {useBacklogStore} from "@/store/backlog.js";
import {usePersonStore} from "@/store/persons.js";
import {ref} from "vue";


const blStore = useBacklogStore();
const pStore = usePersonStore();
const addPersonVisible = ref(false);
const personName = ref();

async function addPerson(name) {
  if (name.length > 0) {
    await pStore.addPerson(name);
    addPersonVisible.value = false;
    personName.value = "";
  }
}
</script>

<template>
  <h1>Admin</h1>
  <hr>
  <div class="admin">


    <div class="admin-stories row">
      <h2>Stories</h2>
      <div class="cell">

        <div>{{ blStore.stories.length }} stories laddade.</div>
        <el-button :disabled="blStore.loading" @click="blStore.updateFromShortcut">Uppdatera från
          shortcut
        </el-button>
        <div v-loading="blStore.loading">
          {{ blStore.message }}
        </div>
      </div>
    </div>
    <hr>
    <div class="admin-persons row">

      <h2>Personer</h2>
      <div class="cell">
        <div v-for="person in pStore.persons">{{ person.name }}</div>
        <div v-if="addPersonVisible">
          <el-input
              @keyup.enter="addPerson(personName)"
              size="small"
              style="width: 240px;"
              v-model="personName"></el-input>
          <el-button v-if="personName" size="small" @click="addPerson(personName)">
            Spara
          </el-button>
        </div>

        <el-button v-else @click="addPersonVisible=true">+ Lägg till</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>

div.admin {
  display: grid;
  grid-template-columns: [header] auto [content] 1fr [end];
  grid-template-areas: "header backlog";
  column-gap: 1rem;

}

.row {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: header / end;
}

h2 {
  grid-area: header;
}

.cell {
  grid-area: backlog;
}


hr {
  margin-bottom: 2rem;
}

div.admin hr {
  grid-column: header / end;
  margin-top: 2rem;
}
</style>
