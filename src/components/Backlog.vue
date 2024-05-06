<script>
import axios from 'axios';
import Story from "@/components/Story.vue";

const page = 1;
export default {
  name: 'Backlog',
  components: {Story},
  data() {
    return {
      stories: [],
      page: 0,
      total_pages: 0
    };
  },
  methods: {
    getBacklog(page, sort_by) {
      let url = '/shortcut/backlog?page=' + page + '&size=20'
      if (sort_by) {
        url += `&order_by=${sort_by}`
      }
      axios.get(url)
          .then((response) => {
            this.stories = response.data.items;
            this.page = response.data.page;
            this.total_pages = response.data.pages;
          })
          .catch((error) => {
            console.log(error);
          })
    },
    sortBy(sort_value) {
     this.getBacklog(page, sort_value);
    }
  },
  created() {
    this.getBacklog(page);
  },


}
</script>

<template>

  <div class="backlog-container">
    <nav>
      <div class="story-prio header">Prio</div>
      <div class="story-period header">Period</div>
      <div v-on:click="sortBy('name')" class="story-description header">Story</div>
      <div class="story-page header">Sida {{ page }} av {{ total_pages }}</div>
      <hr>
    </nav>

    <section>
      <Story
          v-for="story in stories"
          :story="story"
          :key="story.id"
      />
    </section>
  </div>
</template>

<style scoped>
hr {
  grid-column-start: 1;
  grid-column-end: -1;
  height: 1px;
}


div.backlog-container {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: [prio] min-content [period] min-content [story story-start] 1fr [extra] auto [story-end];
  column-gap: 1em;
  row-gap: 1em;
  grid-template-areas: "header" "section";
}

nav {
  grid-area: header;
  display: grid;
  grid-template-columns: subgrid;
  grid-column: prio / story-end;
}

section {
  grid-area: section;
  overflow: auto;

  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / 5;
}

div.header {
  font-weight: bold;
}
</style>
