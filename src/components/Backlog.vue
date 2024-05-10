<script setup>
import axios from 'axios';
import Story from "@/components/Story.vue";
import {onMounted, ref} from "vue";
/*
  TODO: Load backlog once and store in browser. Sort and filter on local data.
 */
const props = defineProps(['filterBy', 'filterValue'])
const sort_by = ref({
  'id': null,
  'created': null,
  'updated': null,
  'name': null,
  'priority': null,
  'period': null
});

const filter_by = ref({
  'label': null,
  'priority': null,
  'period': null
})

if (props.filterBy) {
  filter_by.value[props.filterBy] = props.filterValue;
}

const data = ref({
  stories: [],
  count: 0,
  total: 0
});

async function getBacklog() {
  let url = '/shortcut/backlog?';
  for (const [key, value] of Object.entries(sort_by.value)) {
    if (value) {
      url += `&sort[${key}]=${value}`
    }
  }
  for (const [key, value] of Object.entries(filter_by.value)) {
    if (value) {
      url += `&filter[${key}]=${value}`
    }
  }
  await axios.get(url)
      .then((response) => {
        data.value.stories = response.data.items;
        data.value.count = response.data.count;
        data.value.total = response.data.total;
      })
      .catch((error) => {
        console.log(error);
      })
}

async function sortBy(sort_column) {
  const prev_sort = sort_by.value[sort_column]
  let next_sort = null;
  switch (prev_sort) {
    case null:
      next_sort = 'forward';
      break;
    case 'forward':
      next_sort = 'reverse';
      break
    case 'reverse':
      next_sort = null;
      break
  }
  sort_by.value[sort_column] = next_sort;
  await getBacklog();
}

onMounted(async () => {
  await getBacklog()
})

</script>

<template>
  <div class="backlog-container">
    <nav>
      <div class="story-prio header"><a v-on:click="sortBy('priority')">Prio</a></div>
      <div class="story-period header"><a v-on:click="sortBy('period')">Period</a></div>
      <div class="story-created header"><a v-on:click="sortBy('created')">Skapad</a></div>
      <div class="story-updated header"><a v-on:click="sortBy('updated')">Ändrad</a></div>
      <div class="story-description header"><a v-on:click="sortBy('name')">Story</a></div>
      <div class="story-id header"><a v-on:click="sortBy('id')">ID</a></div>
      <hr>
    </nav>

    <section>
      <Story
          v-for="story in data.stories"
          :story="story"
          :key="story.id"
      />
      <hr>
    </section>
    <footer>
      <div>{{ data.count }} av {{ data.total }} stories visas.</div>
    </footer>
  </div>

</template>

<style scoped>


div.backlog-container {
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: [start prio] min-content [period] min-content [created] min-content [updated] min-content [story story-start] 1fr [story-end extra] auto [end];
  column-gap: 1rem;
  grid-template-areas: "header" "section" "footer";
}

div.backlog-container h2 {
  grid-column: start / end;
}
nav {
  font-weight: bold;
  grid-area: header;
  display: grid;
  grid-template-columns: subgrid;
  grid-column: start / end;
  height: auto;
  top: 0;
  position: sticky;
}

nav div, footer div, nav div a {
  font-weight: bold;
}

nav div a {
  cursor: pointer;
}

hr {
  grid-column-start: start;
  grid-column-end: end;
  height: 1px;
}

section {
  grid-area: section;
  overflow: scroll;
  display: grid;
  grid-template-columns: subgrid;
  grid-column: start / end;
  row-gap: 0.5rem;
}

footer {
  grid-area: footer;
  display: grid;
  grid-template-columns: subgrid;
  grid-column: start / end;
  font-weight: bold;
  position: sticky;
  bottom: 0;
}

footer input {
  width: 3rem;
}

footer a {
  cursor: pointer;
}

footer div {
  grid-column: start / story;
}




</style>
