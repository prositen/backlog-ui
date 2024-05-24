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

defineProps(['story'])
const storyDrawer = ref(false);
const blStore = useBacklogStore();
const pStore = usePersonStore();
const cStore = useComponentStore();

const addPersonVisible = ref(false);
const addPerson = ref();

const addComponentVisible = ref(false);
const addComponent = ref();

async function addPersonToStory(story_id, person_id) {
  await blStore.addPersonToStory(story_id, person_id);
  addPerson.value = '';
  addPersonVisible.value = false;
}

async function addComponentToStory(story_id, component_id) {
  await blStore.addComponentToStory(story_id, component_id);
  addComponent.value = '';
  addComponentVisible.value = false;
}
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

        <div class="story-meta">Prioritet: {{ story.priority ?? "Ej satt" }}</div>
        <div class="story-meta">Periodsplanering: {{ story.period ?? "Ej satt" }}</div>

        <div class="story-meta" v-if="story.labels.length">Labels:
          <el-tag type="info" :key="label" effect="plain" size="small" v-for="label in story.labels">{{
              label
            }}
          </el-tag>
        </div>
        <div class="story-meta">Personer:
          <el-tag v-for="person in story.persons"
                  type="success"
                  :key="person.name" effect="plain"
                  closable
                  @close="blStore.removePersonFromStory(story.id, person.id)"
          >{{ person.name }}
          </el-tag>
          <div v-if="addPersonVisible">
            <el-select clearable
                       v-model="addPerson"
                       class="w-20"
                       size="small"
                       style="width: 400px;"
                       @clear="addPersonVisible=false">
              <el-option
                  v-for="person of pStore.persons"
                  :key="person.id"
                  :label="person.name"
                  :value="person.id"/>
            </el-select>
            <el-button v-if="addPerson" size="small" @click="addPersonToStory(story.id, addPerson)">Spara</el-button>
          </div>
          <el-button v-else class="button-new-tag" size="small" @click="addPersonVisible = true">
            + Lägg till person
          </el-button>
        </div>

        <div class="story-meta">Systemkomponenter:
          <el-tag v-for="component in story.components"
                  type="success"
                  :key="component.name" effect="plain"
                  closable
                  @close="blStore.removeComponentFromStory(story.id, component.id)"
          >{{ component.name }}
          </el-tag>
          <div v-if="addComponentVisible">
            <el-select clearable
                       v-model="addComponent"
                       class="w-20"
                       size="small"
                       style="width: 400px;"
                       @clear="addComponentVisible=false">
              <el-option
                  v-for="component of cStore.components"
                  :key="component.id"
                  :label="component.name"
                  :value="component.id"/>
            </el-select>
            <el-button v-if="addComponent" size="small" @click="addComponentToStory(story.id, addComponent)">Spara</el-button>
          </div>
          <el-button v-else class="button-new-tag" size="small" @click="addComponentVisible = true">
            + Lägg till komponent
          </el-button>
        </div>

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
