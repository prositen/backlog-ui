<script setup>
import Period from "@/components/Period.vue";
import Prio from "@/components/Prio.vue";
import Markdown from "@/components/Markdown.vue";
import ShortcutLink from "@/components/ShortcutLink.vue";

defineProps(['story'])

</script>

<template>
<div class="story">
  <Prio class="story-prio story-meta" :value="story.priority"/>
  <Period class="story-period story-meta" :value="story.period"/>
  <span class="story-meta">{{ story.created.split('T')[0] }}</span>
  <span class="story-meta">{{ story.updated.split('T')[0] }}</span>
  <div class="story-description">
    <div class="story-title">{{ story.name }}</div>
    <!-- <span v-for="label in story.label_names">{{ label }}</span> -->
    <div class="story-content">
      <Markdown :value="story.description.slice(0, 200)"/>
    </div>
  </div>
  <div class="story-link story-meta"><ShortcutLink :id="story.id" :url="story.shortcut_url" /></div>
</div>

</template>

<style scoped>
div.story {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: start / end;
  border: 1px solid black;
  border-radius: 10px;
  background-color: var(--color-background-soft);
  padding: 0.3rem;
}
div.story-description {
  overflow: hidden !important;
}

div.story-title {
  font-weight: bold;
}

.story-meta {
  font-size: small;
}
.story-prio {
  grid-column: prio;
}

.story-link {
  grid-column: extra;
}

.story-content {
  display: none;
}
</style>
