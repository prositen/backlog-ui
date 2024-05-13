<script setup>
import {ref, provide} from "vue";

const activeTabHash = ref("");
const tabs = ref({
  all: [],
  groups: {}
});

provide("addTab", (tab) => {
  const count = tabs.value.all.push(tab);
  if (!(tab.groupIndex in tabs.value.groups)) {
    tabs.value.groups[tab.groupIndex] = {
      tabs: [],
      title: tab.groupTitle
    };
  }
  tabs.value.groups[tab.groupIndex].tabs.push(tab);
  if (count === 1) {
    activeTabHash.value = tab.hash;
  }
});
provide("activeTabHash", activeTabHash);
</script>
<template>
  <div class="tabs">
    <nav>
      <ul v-for="group in tabs.groups">{{ group.title }}
        <li v-for="tab in group.tabs"
            :key="tab.title"
            @click="activeTabHash = tab.hash"
            :class='{"tab__selected": (activeTabHash === tab.hash)}'
        ><a>{{ tab.title }}</a>
        </li>
      </ul>
    </nav>
    <slot/>
  </div>
</template>
<style scoped>

div.tabs {
  display: grid;
  grid-template-columns: [tabs] auto [backlog] 1fr [end];

  column-gap: 1rem;
  grid-template-areas: "tabs backlog";
}

div.tabs nav {
  grid-column: tabs;
}

div.tabs nav ul {
  list-style: none;
  white-space: nowrap;
  font-weight: bold;
}

div.tabs nav ul li {
  margin-left: 1rem;
}
div.tabs nav ul li a {
  cursor: pointer;
}

div.tabs nav ul li.tab__selected a {
  cursor: default;
  color: grey;
}

div.tabs slot {
  grid-area: backlog;
}
</style>
