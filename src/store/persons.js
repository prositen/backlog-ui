import {defineStore} from 'pinia';
import axios from 'axios';
import {computed, ref} from "vue";
import sortString from "@/components/common/sort.js";

export const usePersonStore = defineStore('person', () => {
    const personMap = ref(new Map());
    const message = ref('');
    const loading = ref(false);
    const persons = computed(() => {
        return [...personMap.value.values()].sort((a, b) => {
            return sortString(a, b, 'name')
        });

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
        await axios.put(url,
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
