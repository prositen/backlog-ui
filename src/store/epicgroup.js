import {defineStore} from 'pinia';
import axios from 'axios';
import {computed, ref} from "vue";
import sortString from "@/components/common/sort.js";

export const useEpicGroupStore = defineStore('epicGroup', () => {
    const epicGroupMap = ref(new Map());
    const message = ref('');
    const loading = ref(false);
    const epicGroups = computed(() => {
        return [...epicGroupMap.value.values()].sort((a,b) => {
            return sortString(a,b, 'name')
        });
    })

    async function fetchEpicGroups() {
        const url = '/epic-groups'
        await axios.get(url)
            .then((response) => {
                epicGroupMap.value = new Map(response.data.map(obj => [obj.id, obj]));
            })
            .catch((error) => {
                message.value = error;
            })
    }

    async function addEpicGroup(name) {
        const url = '/epic-groups'
        loading.value = true;
        await axios.post(url,
            {'name': name}
        )
            .then((response) => {
                epicGroupMap.value.set(response.data.id, response.data)
            })
            .catch((error) => {
                message.value = error;
            })
        loading.value = false;
    }

    async function updateEpicGroup(id, name) {
        const url = '/epic-groups/' + id;
        await axios.post(url,
            {'id': id, 'name': name})
            .then((response) => {
                epicGroupMap.value.set(response.data.id, response.data)
            })
            .catch((error) => {
                message.value = error;
            })
    }

    async function deleteEpicGroup(id) {
        const url = '/epic-groups/' + id;
        await axios.delete(url)
            .then(() => {
                epicGroupMap.value.delete(id);
            })
            .catch((error) => {
                message.value = error;
            })
    }

    return {
        epicGroups, message, loading,
        fetchEpicGroups, addEpicGroup, updateEpicGroup, deleteEpicGroup
    }
})

