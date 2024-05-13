import {defineStore} from 'pinia';
import axios from 'axios';

function comparePeriod(a, b) {
    if (!a && !b) {
        return 0;
    } else if (!a && b) {
        return 1;
    } else if (a && !b) {
        return -1;
    } else if (a[0] === 'P') {
        if (b[0] === 'P') {
            // Compare periods and years separately, e.g. P1 2023 > P2 2022
            let aa = a.split(' ');
            let bb = b.split(' ');
            return aa[1] > bb[1] || aa[0] > bb[0];
        }
        return -1
    } else if (b[0] === 'P') {
        // Something with period set is always sorted before period not set
        return 1;
    } else if (a.startsWith('Kanske') && b.startsWith('Kanske')) {
        return a < b;
    } else {
        return a > b;
    }
}

const prioMap = {
    'High': 1,
    'Medium': 2,
    'Low': 3,
    null: 4
}
export const useBacklogStore = defineStore('backlog', {
    state: () => {
        return {
            stories: [],
            count: 0,
            total: 0,
            prios: [],
            labels: [],
            periods: []
        }
    },
    getters: {
        getStories(state) {
            return state.stories;
        },
        getStoryCount(state) {
            return state.count;
        },
        getStoryTotal(state) {
            return state.total;
        }
    },
    actions: {
        async fetchBacklog() {
            let url = '/shortcut/backlog?';

            await axios.get(url)
                .then((response) => {
                    this.stories = response.data.items;
                    this.count = response.data.count;
                    this.total = response.data.total;

                    this.prios = [...new Set(this.stories.map(item => item.priority))].sort((a, b) => {
                        return prioMap[a] > prioMap[b];
                    });
                    this.periods = [...new Set(this.stories.map(item => item.period))].sort((a, b) => {
                        return comparePeriod(a, b);
                    })
                    this.labels = new Set(this.stories.map(item => item.labels).flat()).add(null);
                })
                .catch((error) => {
                    console.log(error);
                })
        }


    }
})
