import {defineStore} from 'pinia';
import axios from 'axios';
import {computed, ref} from "vue";

export const usePersonStore = defineStore('person', () => {
    const personMap = ref(new Map());
    const message = ref('');
    const loading = ref(false);
    const persons = computed(() => {
        return [...personMap.value.values()]
    })

    async function fetchPersons() {
        const url = '/persons';
        await axios.get(url)
            .then((response) => {
                personMap.value = new Map(response.data.map(obj => [obj.id, obj]));
            })
            .catch((error) => {
                console.log(error);
            })
    }

    async function addPerson(name) {
        const url = '/persons'
        loading.value = true;
        await axios.post(url,
            {'name': name}
        )
            .then((response) => {
                personMap.value.set(response.data.id, response.data)
            })
            .catch((error) => {
                message.value = error;
            })
        loading.value = false;
    }

    async function updatePerson(id, name) {
        const url = '/persons/' + id;
        await axios.post(url,
            {'id': id, 'name': name})
            .then((response) => {
                personMap.value.set(response.data.id, response.data)
            })
            .catch((error) => {
                message.value = error;
            })
    }

    async function deletePerson(id) {
        const url = '/persons/' + id;
        await axios.delete(url)
            .then(() => {
                personMap.value.delete(id);
            })
            .catch((error) => {
                message.value = error;
            })
    }

    return {
        persons, message, loading,
        fetchPersons, addPerson, updatePerson, deletePerson
    }
})
