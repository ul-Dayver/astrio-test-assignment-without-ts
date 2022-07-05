<template>
    <v-col
        cols="12"
        md="4"
        sm="6"
        xs="12"
    >
        <v-card>
            <v-img 
                contain
                :src="require(`~/assets${product.image}`)"
                :alt="product.title"
            />
            <v-card-title>
                <div>
                    <div class="title">
                        {{product.regular_price | formatDate}}
                    </div>
                    <span class="title blue--text">{{product.title}}</span>
                </div>
            </v-card-title>
            <v-card-subtitle>
                {{brandTitle}}
            </v-card-subtitle>
            <v-card-actions>
                <v-btn outlined color="blue">Buy</v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>
export default {
    name: "Productcard",
    props: {
        product: {type: Object, required: true},
    },
    computed: {
        brandTitle() {
            const brand = this.$store.state.showcase.brands.find((brand) => brand.id === this.product.brand);
            return brand ? brand.title : "";
        }
    }
}
</script>