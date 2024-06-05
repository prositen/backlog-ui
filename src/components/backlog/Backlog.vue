<script setup>
import Story from "@/components/story/Story.vue";
import {computed, ref, unref} from "vue";
import {useBacklogStore} from "@/store/backlog.js";
import {usePersonStore} from "@/store/persons.js";
import {useComponentStore} from "@/store/components.js";
import {useEpicGroupStore} from "@/store/epicgroup.js";
import {useProductStore} from "@/store/products.js";

import {sortDate, sortInt, sortNothing, sortString} from "@/components/common/sort.js";
import {filter_field, filter_field_list} from "@/components/common/filter.js";

const blStore = useBacklogStore();
const personStore = usePersonStore();
const cStore = useComponentStore();
const eStore = useEpicGroupStore();
const productStore = useProductStore();

const sort_by = ref({
  'id': 0,
  'created': 0,
  'updated': 0,
  'name': 0,
  'priority': 0,
  'period': 0
});

const sort_order = ref([]);


function filter_q(item, value) {
  if (value.length) {
    return item.name.toLowerCase().includes(value.toLowerCase())
  }
  return true;
}


function comparePrio(a, b, field, sort_order) {
  return blStore.comparePrio(a[field], b[field], sort_order)
}

function comparePeriod(a, b, field, sort_order) {
  return blStore.comparePeriod(a[field], b[field], sort_order)
}

function sort_stories(items) {
  for (let column of sort_order.value) {
    const sort_order = unref(sort_by)[column];
    let sortFn = sortNothing
    switch (column) {
      case 'name':
        sortFn = sortString;
        break;
      case 'id':
        sortFn = sortInt;
        break;
      case 'updated':
      case 'created':
        sortFn = sortDate;
        break;
      case 'priority':
        sortFn = comparePrio;
        break;
      case 'period':
        sortFn = comparePeriod;
    }
    items.sort((a, b) => sortFn(a, b, column, sort_order));
  }
  return items;
}

const stories = computed(() => {
  return sort_stories(blStore.stories
      .filter(item => filter_field('period', item, unref(filterPeriod)))
      .filter(item => filter_field('priority', item, unref(filterPrio)))
      .filter(item => filter_field_list('labels', item, unref(filterLabel))))
      .filter(item => filter_field_list('persons', item, unref(filterPerson)))
      .filter(item => filter_field_list('components', item, unref(filterComponent)))
      .filter(item => filter_field_list('epic_groups', item, unref(filterEpicGroup)))
      .filter(item => filter_field_list('products', item, unref(filterProduct)))
      .filter(item => filter_q(item, unref(q)))
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
const filterPerson = ref('all');
const filterComponent = ref('all');
const filterEpicGroup = ref('all');
const filterProduct = ref('all');

const q = ref('');
</script>

<template>
  <div class="backlog-container">
    <nav class="filter-container">
      <span class="shortcut">Periodsplanering</span>
      <el-select v-model="filterPeriod" placeholder="Välj period">
        <el-option
            key="period-all"
            label="Alla"
            value="all"/>
        <el-option
            v-for="period in blStore.periods"
            :key="period ?? 'period-none'"
            :label="period ?? 'Ej satt'"
            :value="period ?? 'null'"/>
      </el-select>

      <span class="shortcut">Prioritet:</span>
      <el-select v-model="filterPrio" placeholder="Välj prio">
        <el-option
            key="prio-all"
            label="Alla"
            value="all"/>
        <el-option
            v-for="prio in blStore.prios"
            :key="prio ?? 'prio-none'"
            :label="prio ?? 'Ej satt'"
            :value="prio ?? 'null'"/>
      </el-select>

      <span class="shortcut">Label:</span>
      <el-select v-model="filterLabel" placeholder="Välj label">
        <el-option
            key="label-all"
            label="Alla"
            value="all"/>
        <el-option
            v-for="label in blStore.labels"
            :key="label ?? 'label-none'"
            :label="label ?? 'Ej satt'"
            :value="label ?? 'null'"
        />
      </el-select>
      Person:
      <el-select v-model="filterPerson" placeholder="Välj person">
        <el-option
            key="person-all"
            label="Alla"
            value="all"/>
        <el-option
            v-for="person in personStore.persons"
            :key="person.id"
            :label="person.name"
            :value="person.id"/>
        <el-option
            key="person-none"
            label="Ej satt"
            value="null"/>
      </el-select>

      Systemkomponent:
      <el-select v-model="filterComponent" placeholder="Välj komponent">
        <el-option
            key="component-all"
            label="Alla"
            value="all"/>
        <el-option
            v-for="component of cStore.components"
            :key="component.id"
            :label="component.name"
            :value="component.id"/>
        <el-option
            key="component-none"
            label="Ej satt"
            value="null"/>
      </el-select>

      Produkt:
      <el-select v-model="filterProduct" placeholder="Välj produkt">
        <el-option
            key="product-all"
            label="Alla"
            value="all"
        />
        <el-option
            v-for="product of productStore.products"
            :key="product.id"
            :label="product.name"
            :value="product.id"
        />
        <el-option
            key="product-none"
            label="Ej satt"
            value="null"/>
      </el-select>
      Övergripande epic:
      <el-select v-model="filterEpicGroup" placeholder="Välj övergripnade epic">
        <el-option
            key="epicGroup-all"
            label="Alla"
            value="all"/>
        <el-option
            v-for="epicGroup of eStore.epicGroups"
            :key="epicGroup.id"
            :label="epicGroup.name"
            :value="epicGroup.id"/>
        <el-option
            key="epicGroup-none"
            label="Ej satt"
            value="null"/>
      </el-select>
      Sök:
      <el-input v-model="q" clearable style="max-width: 400px;"
                placeholder="Sök på namn eller beskrivning"></el-input>
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
        <div>{{ stories.length }} av {{ blStore.total }} stories visas.</div>
      </footer>
    </div>
  </div>

</template>

<style scoped>

div.backlog-container {
  display: grid;
  grid-template-columns: [nav] fit-content(15%) [backlog] 1fr [end];

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

div.stories-container div.el-collapse {
  display: grid;
  grid-template-columns: subgrid;
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


nav div a.sort--1:after {
  content: url("/SortAscending.svg");
  position: absolute;
}

nav div a.sort-1:after {
  content: url("/SortDescending.svg");
  position: absolute;
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

.el-select {
  padding-bottom: 0.8rem;
}
</style>
