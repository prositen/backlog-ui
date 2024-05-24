import {defineStore} from 'pinia';
import axios from 'axios';
import {computed, ref} from "vue";

export const useComponentStore = defineStore('component', () => {
    const componentMap = ref(new Map());
    const message = ref('');
    const loading = ref(false);
    const components = computed(() => {
        return [...componentMap.value.values()]
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
                componentMap.value.set(response.data.id, response.data)
            })
            .catch((error) => {
                message.value = error;
            })
        loading.value = false;
    }

    return {
        components, message, loading,
        fetchComponents, addComponent
    }
})
