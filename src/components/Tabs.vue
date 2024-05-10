<script setup>
import {ref, provide} from "vue";

const activeTabHash = ref("");
const tabs = ref([]);

provide("addTab", (tab) => {
  const count = tabs.value.push(tab);

  if (count === 1) {
    activeTabHash.value = tab.hash;
  }
});
provide("activeTabHash", activeTabHash);
</script>
<template>
  <div class="tabs">
    <ul>
      <li v-for="tab in tabs"
          :key="tab.title"
          @click="activeTabHash = tab.hash"
          :class='{"tab__selected": (activeTabHash === tab.hash)}'
      ><a>{{ tab.title }}</a>
      </li>
    </ul>
    <slot/>
  </div>
</template>
<style scoped>

div.tabs {
  display: grid;
  grid-template-columns: [tabs] min-content [backlog] 1fr [end];
  column-gap: 1rem;
  grid-template-areas: "tabs backlog";
}

div.tabs ul {
  grid-area: tabs;
  list-style: none;
  white-space: nowrap;
}

div.tabs ul li a {
  cursor: pointer;
  font-weight: bold;
}
div.tabs ul li.tab__selected a {
  cursor: default;
  color: grey;
}
div.tabs slot {
  grid-area: backlog;
}
</style>
