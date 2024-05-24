<script setup>
import Period from "@/components/Period.vue";
import Prio from "@/components/Prio.vue";
import Markdown from "@/components/Markdown.vue";
import ShortcutLink from "@/components/ShortcutLink.vue";
import {Expand} from '@element-plus/icons-vue'
import {ref} from "vue";

import {useBacklogStore} from "@/store/backlog.js";
import {usePersonStore} from "@/store/persons.js";
import {useComponentStore} from "@/store/components.js";
import StoryMeta from "@/components/StoryMeta.vue";
import AddTag from "@/components/AddTag.vue";

defineProps(['story'])
const storyDrawer = ref(false);
const blStore = useBacklogStore();
const pStore = usePersonStore();
const cStore = useComponentStore();

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

        <div class="story-description">
          <Markdown :value="story.description"/>
        </div>
        <hr>

        <StoryMeta header="Prioritet"> {{ story.priority ?? "Ej satt" }}</StoryMeta>
        <StoryMeta header="Periodsplanering"> {{ story.period ?? "Ej satt" }}</StoryMeta>

        <StoryMeta v-if="story.labels.length" header="Labels">
          <el-tag type="info" :key="label" effect="plain" size="small" v-for="label in story.labels">
            {{ label }}
          </el-tag>
        </StoryMeta>

        <StoryMeta header="Personer">
          <AddTag :story-items="story.persons"
                  :api-items="pStore.persons"
                  :story-id="story.id"
                  :add-fn="blStore.addPersonToStory"
                  :remove-fn="blStore.removePersonFromStory"
          />
        </StoryMeta>

        <StoryMeta header="Systemkomponenter">
          <AddTag :story-items="story.components"
                  :api-items="cStore.components"
                  :story-id="story.id"
                  :add-fn="blStore.addComponentToStory"
                  :remove-fn="blStore.removeComponentFromStory"
          />
        </StoryMeta>
      </el-drawer>

      <el-tag type="primary" :key="label" effect="plain" size="small" v-for="label in story.labels">{{
          label
        }}
      </el-tag>
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
