import {defineStore} from 'pinia';
import axios from 'axios';
import {computed, ref} from "vue";
import sortString from "@/components/common/sort.js";

export const useProductStore = defineStore('product', () => {
    const productMap = ref(new Map());
    const message = ref('');
    const loading = ref(false);
    const products = computed(() => {
        return [...productMap.value.values()].sort((a, b) => {
            return sortString(a, b, 'name')
        });
    })

    async function fetchProducts() {
        const url = '/products';
        await axios.get(url)
            .then((response) => {
                productMap.value = new Map(response.data.map(obj => [obj.id, obj]));
            })
            .catch((error) => {
                console.log(error);
            })
    }

    async function addProduct(name) {
        const url = '/products'
        loading.value = true;
        await axios.post(url,
            {'name': name}
        )
            .then((response) => {
                productMap.value.set(response.data.id, response.data);
            })
            .catch((error) => {
                message.value = error;
            })
        loading.value = false;
    }

    async function updateProduct(id, name) {
        const url = '/products/' + id;
        await axios.post(url,
            {'id': id, 'name': name})
            .then((response) => {
                productMap.value.set(response.data.id, response.data);
            })
            .catch((error) => {
                message.value = error;
            })
    }

    async function deleteProduct(id) {
        const url = '/products/' + id;
        await axios.delete(url)
            .then(() => {
                productMap.value.delete(id);
            })
            .catch((error) => {
                message.value = error;
            })
    }

    return {
        products, message, loading,
        fetchProducts, addProduct, updateProduct, deleteProduct
    }
})
