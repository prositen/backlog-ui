<script setup>
import Story from "@/components/Story.vue";
import {computed, ref, toValue, unref} from "vue";
import {useBacklogStore} from "@/store/backlog.js";

const sort_by = ref({
  'id': 0,
  'created': 0,
  'updated': 0,
  'name': 0,
  'priority': 0,
  'period': 0
});

const sort_order = ref([]);

function filter_label(item, value) {
  if (value === "all") {
    return true;
  } else if ([null, 'null'].includes(value)) {
    return item.labels.length === 0;
  } else {
    return item.labels.includes(value);
  }
}

function filter_prio(item, value) {
  if (value === 'all') {
    return true;
  } else {
    return item.priority === value;
  }
}

function filter_period(item, value) {
  if (value === 'all') {
    return true;
  } else {
    return item.period === value;
  }
}

function sort_by_str(field, a, b) {
  return a[field].localeCompare(b[field], 'se') * toValue(sort_by)[field];
}

function sort_by_date(field, a, b) {
  const da = Date.parse(a[field]);
  const db = Date.parse(b[field]);
  let cmp = 0;
  if (da < db) {
    cmp = -1;
  } else if (da > db) {
    cmp = 1
  }
  return cmp * toValue(sort_by)[field];
}

function sort_stories(items) {
  for (let column of sort_order.value) {
    switch (column) {
      case 'name':
        items.sort((a, b) => sort_by_str(column, a, b));
        break;
      case 'updated':
      case 'created':
        items.sort((a, b) => sort_by_date(column, a, b))
        break;
      case 'priority':
        items.sort((a, b) => store.comparePrio(a.priority, b.priority, sort_by.value[column]));
        break;
      case 'period':
        items.sort((a, b) => store.comparePeriod(a.period, b.period, sort_by.value[column]));
    }
  }
  return items;
}

const store = useBacklogStore();

const stories = computed(() => {
  return sort_stories(store.getStories
      .filter(item => filter_period(item, unref(filterPeriod)))
      .filter(item => filter_prio(item, unref(filterPrio)))
      .filter(item => filter_label(item, unref(filterLabel))))
})

async function sortBy(sort_column) {
  const prev_sort = sort_by.value[sort_column];
  const new_sort = ((prev_sort + 2) % 3) - 1;
  const so = sort_order.value.indexOf(sort_column);
  if (so > -1) {
    sort_order.value.splice(so, 1);
  }

  sort_by.value[sort_column] = new_sort;
  if (new_sort !== 0) {
    sort_order.value.push(sort_column);
  }
}

const translateHeader = {
  'priority': 'Prio',
  'period': 'Period',
  'created': 'Skapad',
  'updated': 'Ändrad',
  'name': 'Namn',
  'id': 'ID'
}

const filterPeriod = ref('all');
const filterPrio = ref('all');
const filterLabel = ref('all');
</script>

<template>
  <div class="backlog-container">
    <nav class="filter-container">
      <ul>
        <li>
          <ul>Period
            <li><input type="radio" id="period-all" value="all" v-model="filterPeriod"/>
              <label for="period-all">Alla</label></li>
            <li v-for="period in store.periods">
              <input type="radio" :value="period" :id="period ?? 'period-none'" v-model="filterPeriod"/>
              <label :for="period ?? 'period-none'">{{ period ?? 'Ej satt' }}</label></li>
          </ul>
          <ul>Prio
            <li><input type="radio" id="prio-all" value="all" v-model="filterPrio"/>
              <label for="prio-all">Alla</label></li>
            <li v-for="prio in store.prios">
              <input type="radio" :value="prio" :id="prio ?? 'prio-none'" v-model="filterPrio"/>
              <label :for="prio ?? 'prio-none'">{{ prio ?? 'Ej satt' }}</label></li>
          </ul>
          <ul>Label
            <li><input type="radio" id="label-all" value="all" v-model="filterLabel"/>
              <label for="label-all">Alla</label></li>
            <li v-for="label in store.labels">
              <input type="radio" :value="label" :id="label ?? 'label-none'" v-model="filterLabel"/>
              <label :for="label ?? 'label-none'">{{ label ?? 'Ej satt' }}</label></li>
          </ul>
        </li>

      </ul>
    </nav>
    <div class="stories-container">
      <nav>
        <div v-for="(se, en) in translateHeader"
             :class="`story-${en} header`">
          <a :class="`sort-${sort_by[en]}`" v-on:click="sortBy(en)">{{ se }}</a>
        </div>

        <hr>
      </nav>
      <section>
        <Story
            v-for="story in stories"
            :story="story"
            :key="story.id"
        />
        <hr>
      </section>
      <footer>
        <div>{{ stories.length }} av {{ store.getStoryTotal }} stories visas.</div>
      </footer>
    </div>
  </div>

</template>

<style scoped>

div.backlog-container {
  display: grid;
  grid-template-columns: [nav] auto [backlog] 1fr [end];

  column-gap: 1rem;
  grid-template-areas: "tabs backlog";
}

div.backlog-container nav {
  grid-column: nav;
}

div.backlog-container nav ul {
  list-style: none;
  white-space: nowrap;
  font-weight: bold;
  padding-left: 0;
}

div.backlog-container nav ul li {
  margin-left: 1rem;
}

div.backlog-container nav ul li a {
  cursor: pointer;
}

div.backlog-container nav ul li.tab__selected a {
  cursor: default;
  color: grey;
}

div.stories-container {
  grid-area: backlog;
}

div.stories-container {
  max-height: 100vh;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  grid-template-columns: [start prio] auto [period] auto [created] auto  [updated] auto [story story-start] 1fr [story-end extra] auto [end];
  column-gap: 1rem;
  grid-template-areas: "header" "nav" "section" "footer";
}

div.stories-container h2 {
  grid-row: header;
  grid-column: start / end;
}

div.stories-container nav {
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


nav div a.sort-1:after {
  content: url("/SortAscending.svg");
  position: absolute;
}

nav div a.sort--1:after {
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
