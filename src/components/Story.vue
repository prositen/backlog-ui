<script setup>
import Period from "@/components/Period.vue";
import Prio from "@/components/Prio.vue";
import Markdown from "@/components/Markdown.vue";

defineProps(['story'])

</script>

<template>

  <Prio class="story-prio" :value="story.priority"/>
  <Period class="story-period" :value="story.period"/>

  <div class="story-description">
    <div class="story-title">{{ story.name }}</div>

    <div class="story-content">
      <a v-bind:href="story.shortcut_url">{{ story.shortcut_url }}</a>
      <Markdown :value="story.description.slice(0, 200)"/>
    </div>
  </div>

</template>

<style scoped>
div.story-description {
  border: 1px solid grey;
  margin: 5px;
  padding: 5px;
}

div.story-title {
  font-weight: bold;

}

.story-prio {
  grid-column: prio;
}

.story-period {
  grid-column: period;
}

.story-description {
  grid-column: story-start / story-end;
}


</style>
