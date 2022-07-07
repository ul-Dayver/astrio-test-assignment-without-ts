<template>
    <v-row>
        <v-col cols="12" md="2">
            <ShowcaseBrandmenu @changebrand="changeActiveBrand"/>
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
    data() {
        return { activeBrandId: null };
    },
    methods: {
        changeActiveBrand(brandId) {
            this.activeBrandId = brandId;
        }
    },
    computed: {
        products() {
            let products = this.$store.state.products.data;
            if (this.activeBrandId) {
                products = products.filter(({brand}) => brand === this.activeBrandId);
            }
            return products;
        }
    }
};
</script>