import {defineStore} from 'pinia';
import axios from 'axios';


const prioMap = {
    'High': 1,
    'Medium': 2,
    'Low': 3
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
                        return this.comparePrio(a, b, 1);
                    });
                    this.periods = [...new Set(this.stories.map(item => item.period))].sort((a, b) => {
                        return this.comparePeriod(a, b, 1);
                    })
                    this.labels = new Set(this.stories.map(item => item.labels).flat()).add(null);
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        comparePrio(a, b, sort_order) {
            if (a && b) {
                if (prioMap[a] > prioMap[b]) {
                    return 1 * sort_order;
                } else if (prioMap[a] < prioMap[b]) {
                    return -1 * sort_order;
                } else {
                    return 0;
                }
            }
            return this.compareEmpty(a, b);
        },
        comparePeriod(a, b, sort_order) {
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
                return this.compareEmpty(a, b);
            }
        },
        compareEmpty(a, b) {
            if (!a && !b) {
                return 0;
            } else if (!a && b) {
                return 1;
            } else {
                return -1;
            }

        }


    }
})
