import {defineStore} from 'pinia';
import axios from 'axios';
import {computed, ref} from "vue";
import sortString from "@/components/common/sort.js";

export const useComponentStore = defineStore('component', () => {
    const componentMap = ref(new Map());
    const message = ref('');
    const loading = ref(false);
    const components = computed(() => {
        return [...componentMap.value.values()].sort((a,b) => {
            return sortString(a,b, 'name')
        });
    })

    async function fetchComponents() {
        const url = '/components';
        await axios.get(url)
            .then((response) => {
                componentMap.value = new Map(response.data.map(obj => [obj.id, obj]));
            })
            .catch((error) => {
                console.log(error);
            })
    }

    async function addComponent(name) {
        const url = '/components'
        loading.value = true;
        await axios.post(url,
            {'name': name}
        )
            .then((response) => {
                componentMap.value.set(response.data.id, response.data);
            })
            .catch((error) => {
                message.value = error;
            })
        loading.value = false;
    }

    async function updateComponent(id, name) {
        const url = '/components/' + id;
        await axios.put(url,
            {'id': id, 'name': name})
            .then((response) => {
                componentMap.value.set(response.data.id, response.data);
            })
            .catch((error) => {
                message.value = error;
            })
    }

    async function deleteComponent(id) {
        const url = '/components/' + id;
        await axios.delete(url)
            .then(() => {
                componentMap.value.delete(id);
            })
            .catch((error) => {
                message.value = error;
            })
    }

    return {
        components, message, loading,
        fetchComponents, addComponent, updateComponent, deleteComponent
    }
})
