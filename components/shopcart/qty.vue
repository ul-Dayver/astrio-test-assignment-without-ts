<template>
    <div class="shopcart-item-editqty">
        <v-btn icon :disabled="qty <= 0" @click="clickMinus(qty)">
            <v-icon>mdi-minus</v-icon>
        </v-btn>
        <div class="shopcart-item-editqty__qty">{{qty}}</div>
        <v-btn icon @click="clickPlus">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>
</template>
<script>
export default {
    name: "shopcartqty",
    props: {
        productId: { type: Number, required: true}
    },
    computed: {
        qty() {
            const product = this.$store.state.cart.products.find(
                ({productId}) => productId === this.productId
            );
            return product ? product.qty : 0;
        }
    },
    methods: {
        clickPlus() {
            this.$store.commit("cart/addProduct", {
                productId: this.productId
            });
        },
        clickMinus(qty) {
            this.$store.commit("cart/setProductQty", {
                productId: this.productId,
                qty: qty-1
            });
        }
    }
}
</script>
<style>
.shopcart-item-editqty {
    display: flex;
    align-items: center;
    justify-content: center;
}
.shopcart-item-editqty__qty {
    width: 44px;
    cursor: default;
    text-align: center;
}
</style>