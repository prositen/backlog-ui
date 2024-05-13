<script setup>
import Story from "@/components/Story.vue";
import {computed, onMounted, ref} from "vue";
import {useBacklogStore} from "@/store/backlog.js";

const props = defineProps(['filterBy', 'filterValue'])
const sort_by = ref({
  'id': null,
  'created': null,
  'updated': null,
  'name': null,
  'priority': null,
  'period': null
});

function filter_fun(key, value) {
  switch (key) {
    case 'label':
      return function (item) {
        if ([null, 'null'].includes(value)) {
          return item.labels.length === 0;
        }
        return item.labels.includes(value);
      };
    case 'priority':
      return function (item) {
        return item.priority === value;
      }
    case 'period':
      return function (item) {
        return item.period === value;
      }
    default:
      return function (item) {
        return true;
      }
  }
}

const data = ref({
  stories: [],
  count: 0,
  total: 0,
})

const store = useBacklogStore();

onMounted(() => {
  data.value.stories = store.getStories.filter(item => filter_fun(props.filterBy, props.filterValue)(item));
  data.value.total = store.getStoryTotal;
  data.value.count = data.value.stories.length;
})

// TODO: Sort on multiple
const sortedStories = computed(() => {
  let to_sort = [...data.value.stories]
  for (const [key, value] of Object.entries(sort_by.value)) {
    let gt = -1;
    let lt = 1;
    if (value === "forward") {
      gt = 1;
      lt = -1;
    }
    if (value) {
      to_sort.sort((a, b) => {
        return a[key] > b[key] ? gt : lt
      })
    }
  }
  return to_sort
})

async function sortBy(sort_column) {
  const prev_sort = sort_by.value[sort_column]
  let next_sort = null;
  switch (prev_sort) {
    case 'forward':
      next_sort = 'reverse';
      break
    case 'reverse':
      next_sort = null;
      break;
    case null:
      next_sort = 'forward';
      break;
  }
  sort_by.value[sort_column] = next_sort;
}

const translateHeader = {
  'prio': 'Prio',
  'period': 'Period',
  'created': 'Skapad',
  'updated': 'Ändrad',
  'name': 'Namn',
  'id': 'ID'
}

</script>

<template>
  <div class="backlog-container">
    <h2 v-if="filterBy">{{ filterBy[0].toUpperCase() + filterBy.slice(1) }}: <em>{{ filterValue ?? "Ej satt" }}</em>
    </h2>
    <nav>
      <div v-for="(se, en) in translateHeader"
        :class="`story-${en} header`">
        <a :class="sort_by[en]" v-on:click="sortBy(en)">{{se}}</a>
      </div>

      <hr>
    </nav>

    <section>
      <Story
          v-for="story in sortedStories"
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
  max-height: 100vh;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  grid-template-columns: [start prio] auto [period] auto [created] auto  [updated] auto [story story-start] 1fr [story-end extra] auto [end];
  column-gap: 1rem;
  grid-template-areas: "header" "nav" "section" "footer";
}

div.backlog-container h2 {
  grid-row: header;
  grid-column: start / end;
}

nav {
  font-weight: bold;
  grid-area: header;
  display: grid;
  grid-template-columns: subgrid;
  grid-row: nav;
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



nav div a.forward:after {
  content: url("/SortAscending.svg");
  position: absolute;
}

nav div a.reverse:after {
  content: url("/SortDescending.svg");
  position: absolute;
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
