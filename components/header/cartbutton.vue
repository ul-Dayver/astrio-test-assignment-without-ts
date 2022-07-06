<template>
    <client-only>
        <NuxtLink to="/shopcart" class="shopcart-link">
            <v-badge
                bordered
                color="error"
                overlap
                v-if="productsQty !== '0'"
            >
                <template v-slot:badge>
                    {{productsQty}}
                </template>
                <v-icon>mdi-shopping</v-icon>
            </v-badge>
            <v-icon v-else>mdi-shopping</v-icon>
        </NuxtLink>
        
    </client-only>
</template>
<script>
export default {
    name: "cartbutton",
    computed: {
        productsQty() {
            const qty = this.$store.state.cart.counter;
            return qty > 99 ? "99+" : qty + "";
        }
    }
}
</script>
<style>
.shopcart-link {
    outline: none;
    text-decoration: none;
}
</style>