<template>
    <v-row>
        <v-col cols="12" md="2">
            <ShowcaseBrandmenu/>
        </v-col>
        <v-col cols="12" md="10" sm="12">
            <v-row>
                <ShowcaseProductcard v-for="product in products" :key="product.id" :product="product"/>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "showcase",
    beforeMount() {
        this.$store.commit("showcase/SET_PRODUCTS", this.$store.state.products.data);
        this.$store.commit("showcase/SET_BRANDS", this.$store.state.brands.data);
    },
    computed: {
        products() {
            let products = process.server 
                ? this.$store.state.products.data
                : this.$store.getters['showcase/showcaseProducts'];
            
            return products;
        }
    } 
};
</script>