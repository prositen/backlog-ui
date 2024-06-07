<script setup>
import {Expand} from '@element-plus/icons-vue'
import Period from "@/components/backlog/Period.vue";
import Prio from "@/components/backlog/Prio.vue";
import ShortcutLink from "@/components/backlog/ShortcutLink.vue";


import StoryDetails from "@/components/story/StoryDetails.vue";
import {ref} from "vue";

defineProps(['story', 'showTags'])
const storyDrawer = ref(false);
</script>

<template>
  <div class="story">
    <Prio class="story-prio story-meta" :value="story.priority"/>
    <Period class="story-period story-meta" :value="story.period"/>
    <span class="story-meta">{{ story.created.split('T')[0] }}</span>
    <span class="story-meta">{{ story.updated.split('T')[0] }}</span>
    <div class="story-description">
      <div class="story-title">{{ story.name }}
        <el-icon class="header-icon" @click="storyDrawer=true">
          <Expand/>
        </el-icon>
      </div>
      <el-drawer v-model="storyDrawer" :name="story.id" size="50%">
        <template #header="{  titleId, titleClass }">
          <h4 :id="titleId" :class="titleClass"> {{ story.name }} </h4>
          <ShortcutLink :id="story.id" :url="story.shortcut_url"/>
        </template>
        <StoryDetails :story="story"/>
      </el-drawer>
      <el-tag type="primary" :key="label" effect="plain" size="small" v-for="label in story.labels">{{
          label
        }}
      </el-tag>
      <template v-if="showTags">
        <el-tag disable-transitions type="success" :key="person" v-for="person in story.persons" size="small">{{person.name}}</el-tag>
        <el-tag disable-transitions type="warning" :key="product" v-for="product in story.products" size="small">{{product.name}}</el-tag>
        <el-tag disable-transitions type="danger" :key="component" v-for="component in story.components" size="small">{{component.name}}</el-tag>
        <el-tag disable-transitions type="info" :key="group" v-for="group in story.epic_groups" size="small">{{group.name}}</el-tag>
      </template>
    </div>
    <div class="story-link story-meta">
      <ShortcutLink :id="story.id" :url="story.shortcut_url"/>
    </div>
  </div>


</template>

<style scoped>
div.story {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: start / end;
  max-height: min-content;
  background-color: var(--color-background-soft);
  padding: 0.3rem;
}

div.story-description {
  overflow: hidden !important;
}

div.story-title {
  font-weight: bold;
}

div.story-title .el-icon {
  cursor: pointer;
}

.story-meta {
  font-size: small;
  margin-top: 0.5rem;
}
.story-prio {
  grid-column: prio;
}

.story-link {
  grid-column: extra;
}


</style>
