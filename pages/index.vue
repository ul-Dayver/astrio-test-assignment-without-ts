<template>
    <Showcase />
</template>

<script>
export default {
    name: "IndexPage",
    async asyncData({store}) {
        store.commit("showcase/SET_PRODUCTS", store.state.products.data);
        store.commit("showcase/SET_BRANDS", store.state.brands.data);
    }
};
</script>
