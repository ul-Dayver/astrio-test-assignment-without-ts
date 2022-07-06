<template>
    <v-row>
        <ShowcaseProductcard v-for="product in products" :key="product.id" :product="product" />
    </v-row>
</template>

<script>
export default {
    name: "showcase",
    computed: {
        products() {
            return this.$store.state.products.data;
        }
    }
};
</script>