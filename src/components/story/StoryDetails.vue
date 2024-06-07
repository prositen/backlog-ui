<script setup>
import AddTag from "@/components/story/AddTag.vue";
import Markdown from "@/components/story/Markdown.vue";
import StoryMeta from "@/components/story/StoryMeta.vue";

import {useBacklogStore} from "@/store/backlog.js";
import {usePersonStore} from "@/store/persons.js";
import {useComponentStore} from "@/store/components.js";
import {useEpicGroupStore} from "@/store/epicgroup.js";
import {useProductStore} from "@/store/products.js";

defineProps(['story'])

const blStore = useBacklogStore();
const pStore = usePersonStore();
const cStore = useComponentStore();
const eStore = useEpicGroupStore();
const productStore = useProductStore();
</script>

<template>


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
            type="success"
    />
  </StoryMeta>

  <StoryMeta header="Produkter">
    <AddTag :story-items="story.products"
            :api-items="productStore.products"
            :story-id="story.id"
            :add-fn="blStore.addProductToStory"
            :remove-fn="blStore.removeProductFromStory"
            type="warning"
            />
  </StoryMeta>

  <StoryMeta header="Systemkomponenter">
    <AddTag :story-items="story.components"
            :api-items="cStore.components"
            :story-id="story.id"
            :add-fn="blStore.addComponentToStory"
            :remove-fn="blStore.removeComponentFromStory"
            type="primary"
    />
  </StoryMeta>

  <StoryMeta header="Övergripande epics">
    <AddTag :story-items="story.epic_groups"
            :api-items="eStore.epicGroups"
            :story-id="story.id"
            :add-fn="blStore.addEpicGroupToStory"
            :remove-fn="blStore.removeEpicGroupFromStory"
            type="danger"
    />

  </StoryMeta>


</template>

<style scoped>


</style>
