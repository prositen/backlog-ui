<script setup>
import {useBacklogStore} from "@/store/backlog.js";
import {usePersonStore} from "@/store/persons.js";
import {useComponentStore} from "@/store/components.js";
import {useEpicGroupStore} from "@/store/epicgroup.js";
import {useProductStore} from "@/store/products.js";
import ListFieldValues from "@/components/admin/ListFieldValues.vue";


const blStore = useBacklogStore();
const personStore = usePersonStore();
const cStore = useComponentStore();
const eStore = useEpicGroupStore();
const productStore = useProductStore();

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
      <ListFieldValues
          header="Personer"
          :api-items="personStore.persons"
          :add-fn="personStore.addPerson"
          :remove-fn="personStore.deletePerson"
          :edit-fn="personStore.updatePerson"
          :reload-stories-fn="blStore.fetchBacklog"
      >Personer i backlog-report är helt frikopplade från personer i Shortcut. De behöver inte finnas som användare
        i Shortcut och vi läser inte heller något automatiskt därifrån. Varje backlog-story kan tilldelas valfritt
        antal personer.
      </ListFieldValues>
    </div>
    <hr>

    <div class="admin-components row">
      <ListFieldValues
          header="Systemkomponenter"
          :api-items="cStore.components"
          :add-fn="cStore.addComponent"
          :remove-fn="cStore.deleteComponent"
          :edit-fn="cStore.updateComponent"
          :reload-stories-fn="blStore.fetchBacklog"
      >Systemkomponenter i backlog-report är helt frikopplade från systemkomponenter i Shortcut. Varje backlog-story
        kan tilldelas valfritt antal systemkomponenter.
      </ListFieldValues>
    </div>
    <hr>

    <div class="admin-products row">
      <ListFieldValues
          header="Produkter"
          :api-items="productStore.products"
          :add-fn="productStore.addProduct"
          :remove-fn="productStore.deleteProduct"
          :edit-fn="productStore.updateProduct"
          :reload-stories-fn="blStore.fetchBacklog"
      >Produkter är helt frikopplade från Shortcut. Varje backlog-story kan tilldelas valfritt antal produkter.
      </ListFieldValues>
    </div>
    <hr>
    <div class="admin-epic-groups row">
      <ListFieldValues
          header="Övergripande epics"
          :api-items="eStore.epicGroups"
          :add-fn="eStore.addEpicGroup"
          :remove-fn="eStore.deleteEpicGroup"
          :edit-fn="eStore.updateEpicGroup"
          :reload-stories-fn="blStore.fetchBacklog"
      >"Övergripande epics" är helt frikopplade från Shortcut. Varje backlog-story kan tilldelas valfritt antal
        övergripande epic.
      </ListFieldValues>
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



div.admin hr {
  grid-column: header / end;
  margin-top: 2rem;
}
</style>
