<template>
    <v-card class="mb-5" v-if="product" style="position: relative;">
        <v-row>
            <v-col md="3" sm="12">
                <v-img 
                    contain
                    :src="require(`~/assets${product.image}`)"
                    :alt="product.title"
                />
            </v-col>
            <v-col md="6" sm="6" xs="12" class="d-flex flex-column justify-center">
                <v-card-title>
                    <div>
                        <div class="title">
                            {{product.regular_price | formatPrice}}
                        </div>
                        <span class="title blue--text">{{product.title}}</span>
                    </div>
                </v-card-title>
                <v-card-subtitle>
                    {{product.brand.title}}
                </v-card-subtitle>
            </v-col>
            <v-col md="3" sm="6" xs="12" class="d-sm-flex flex-column justify-center">
                <div class="text-right mr-5 mb-4 shopcart-trash-btn">
                    <v-btn icon @click="removeProduct"><v-icon>mdi-trash-can</v-icon></v-btn>
                </div>

                <ShopcartQty :productId="productId" />
                <div class="text-center mt-5">
                    <span>total:</span>
                    <span>{{product.total | formatPrice}}</span>
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
export default {
    name: "shopcartitem",
    props: {
        productId: {type: Number, required: true},
        qty: {type: Number, required: true}
    },
    computed: {
        product() {
            const products = this.$store.state.products.data;
            const brands = this.$store.state.brands.data;
      
            const product = products.find((product) => product.id === this.productId);
            if (!product) return null;
            const brand = brands.find((brand) => brand.id === product.brand);
            if (!brand) return null;
            
            const { value, currency } = product.regular_price;
      
            const total = value * this.qty;
            
            return {
                ...product,
                qty: this.qty,
                brand,
                total: {currency, value: total}
            };
        }
    },
    methods: {
        removeProduct() {
            this.$store.commit("cart/removeProduct", {
                productId: this.productId
            });
        }
    }
}
</script>
<style>
@media(max-width: 960px) {
    .shopcart-trash-btn {
        position: absolute;
        right: 0;
        top: 0;
        margin: 1rem;
    }
}
</style>