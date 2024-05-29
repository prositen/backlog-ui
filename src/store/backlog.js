import {defineStore} from 'pinia';
import axios from 'axios';
import {computed, ref} from "vue";


const prioMap = {
    'High': 1,
    'Medium': 2,
    'Low': 3,
    null: 4
}
export const useBacklogStore = defineStore('backlog', () => {
    const storiesMap = ref(new Map());
    const stories = computed(() => {
        return [...storiesMap.value.values()];
    })
    const total = ref(0);
    const loading = ref(false);
    const message = ref('');
    const prios = computed(() => {
        return [...new Set(stories.value.map(item => item.priority))].sort((a, b) => {
            return comparePrio(a, b, 1);
        })
    })
    const labels = computed(() => {
        return new Set(stories.value.map(item => item.labels).flat()).add(null);
    })
    const periods = computed(() => {
        return [...new Set(stories.value.map(item => item.period))].sort((a, b) => {
            return comparePeriod(a, b, 1);
        })
    });

    function compareEmpty(a, b) {
        if (!a && !b) {
            return 0;
        } else if (!a && b) {
            return 1;
        } else {
            return -1;
        }
    }

    function comparePrio(a, b, sort_order) {
        if (prioMap[a] > prioMap[b]) {
            return 1 * sort_order;
        } else if (prioMap[a] < prioMap[b]) {
            return -1 * sort_order;
        } else {
            return 0;
        }
    }

    function comparePeriod(a, b, sort_order) {
        if (a && b) {
            if (a[0] === 'P') {
                if (b[0] === 'P') {
                    // Compare periods and years separately, e.g. P1 2023 > P2 2022
                    let aa = a.split(' ');
                    let bb = b.split(' ');
                    return sort_order * (aa[1] > bb[1] || aa[0] > bb[0]);
                }
                return sort_order * -1
            } else if (b[0] === 'P') {
                // Something with period set is always sorted before period not set
                return sort_order * 1;
            } else if (a.startsWith('Kanske') && b.startsWith('Kanske')) {
                return sort_order * (b.localeCompare(a));
            } else {
                return sort_order * (a > b);
            }
        } else {
            return sort_order * compareEmpty(a, b);
        }
    }


    async function updateFromShortcut() {
        let refresh_url = '/admin/shortcut/backlog';
        loading.value = true;
        message.value = 'Laddar';
        await axios.get(refresh_url)
            .then((_) => {
                    message.value = '';
                    loading.value = false;
                    fetchBacklog()
                }
            ).catch((error) => {
                loading.value = false;
                message.value = error;
            });

    }

    async function fetchBacklog() {
        let url = '/shortcut/backlog';
        await axios.get(url)
            .then((response) => {
                storiesMap.value = new Map(response.data.items.map(obj => [obj.id, obj]));
                total.value = response.data.total;
            })
            .catch((error) => {
                message.value = error;
            })
    }

    async function addPersonToStory(story_id, person_id) {
        const url = '/stories/' + story_id + '/person/' + person_id;
        loading.value = true;
        await axios.put(url)
            .then((response) => {
                storiesMap.value.set(response.data.id, response.data);
            })
            .catch((error) => {
                message.value = error;
            })
        loading.value = false;
    }

    async function removePersonFromStory(story_id, person_id) {
        const url = '/stories/' + story_id + '/person/' + person_id;
        loading.value = true;
        await axios.delete(url)
            .then((response) => {
                storiesMap.value.set(response.data.id, response.data);
            })
            .catch((error) => {
                message.value = error;
            })
        loading.value = false;
    }

    async function addComponentToStory(story_id, component_id) {
        const url = '/stories/' + story_id + '/component/' + component_id;
        loading.value = true;
        await axios.put(url)
            .then((response) => {
                storiesMap.value.set(response.data.id, response.data);
            })
            .catch((error) => {
                message.value = error;
            })
        loading.value = false;
    }

    async function removeComponentFromStory(story_id, component_id) {
        const url = '/stories/' + story_id + '/component/' + component_id;
        loading.value = true;
        await axios.delete(url)
            .then((response) => {
                storiesMap.value.set(response.data.id, response.data);
            })
            .catch((error) => {
                message.value = error;
            })
        loading.value = false;
    }

    async function addEpicGroupToStory(story_id, epic_group_id) {
        const url = '/stories/' + story_id + '/epic-group/' + epic_group_id;
        loading.value = true;
        await axios.put(url)
            .then((response) => {
                storiesMap.value.set(response.data.id, response.data);
            })
            .catch((error) => {
                message.value = error;
            })
        loading.value = false;
    }

    async function removeEpicGroupFromStory(story_id, epic_group_id) {
        const url = '/stories/' + story_id + '/epic-group/' + epic_group_id;
        loading.value = true;
        await axios.delete(url)
            .then((response) => {
                storiesMap.value.set(response.data.id, response.data);
            })
            .catch((error) => {
                message.value = error;
            })
        loading.value = false;
    }

    return {
        stories, total, prios, labels, periods, message, loading,
        updateFromShortcut, fetchBacklog,
        comparePeriod, comparePrio,
        addPersonToStory, removePersonFromStory,
        addComponentToStory, removeComponentFromStory,
        addEpicGroupToStory, removeEpicGroupFromStory
    }
})
