<template>
    <div>
        <h1>Shopping Cart</h1>
        <v-row class="mt-4">
            <v-col md="8" sm="12">
                <ShopcartItem 
                    v-for="product in products"
                    :key="product.variantId || product.productId"
                    :productId="product.productId"
                    :variantId="product.variantId"
                    :qty="product.qty" 
                />
            </v-col>
            <v-col md="4" sm="12" class="text-right">
                <h2>Amount</h2>
                <h3>{{total | formatPrice}}</h3>
                <v-btn class="my-5"> Checkout </v-btn>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    name: "ShopcartPage",
    head () {
        return {
            title: "Shopping Cart"
        }
    },
    computed: {
        products() {
            return this.$store.state.cart.products;
        },
        total() {
            const products = this.$store.state.products.data;
            const { currency } = products[0].regular_price
            const amount = this.$store.state.cart.products
                .reduce((acc, {productId, qty}) => {
                    const product = products.find(({id}) => productId === id)
                    if (!product) return acc
                    return acc + product.regular_price.value * qty
                }, 0);
            return {currency, value: amount}
        }
    }
}
</script>