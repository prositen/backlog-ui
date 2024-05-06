<script setup>
import axios from 'axios';
import Story from "@/components/Story.vue";
import {onMounted, ref} from "vue";

let page = 1;
let page_size = 10;
let sort_by = '';

const data = ref({
  stories: [],
  page: 0,
  total_pages: 0
});

async function getBacklog(page) {
  let url = '/shortcut/backlog?page=' + page + '&size=' + page_size;
  if (sort_by) {
    url += `&order_by=${sort_by}`
  }
  await axios.get(url)
      .then((response) => {
        data.value.stories = response.data.items;
        data.value.page = response.data.page;
        data.value.total_pages = response.data.pages;
      })
      .catch((error) => {
        console.log(error);
      })
}

async function sortBy(sort_value) {
  sort_by = sort_value;
  await getBacklog(page);
}

async function paginate(pageno) {
  page = pageno;
  await getBacklog(page);
}

onMounted(async () => {
  await getBacklog(1)
})

</script>

<template>
  <div class="backlog-container">
    <nav>
      <div class="story-prio header">Prio</div>
      <div class="story-period header">Period</div>
      <div v-on:click="sortBy('created')" class="story-created header">Skapad</div>
      <div v-on:click="sortBy('updated')" class="story-updated header">Ändrad</div>
      <div v-on:click="sortBy('name')" class="story-description header">Story</div>
      <div v-on:click="sortBy('id')" class="story-id header">ID</div>
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

      <div class="story-pagination">

        <a v-for="pageNo in data.total_pages"
           v-on:click="paginate(pageNo)" class="nav-page"
           :class="{'active': pageNo === page}">
          <span>{{ pageNo }}</span>
        </a>
        </div>
      <div class="story-page-no">
        <br>
        Sida {{ data.page }} av {{ data.total_pages }}

        <br/>
        <input v-model="page_size" v-on:change="getBacklog(page)" type="number"/> per sida
      </div>
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

nav div, footer div {
  font-weight: bold;
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

footer a.active {
  color: red;
}

.story-pagination {
  grid-column: start / story;
}

.story-page-no {
  grid-column: story-end / end;
}


</style>
