<template>
    <v-list-item @click="selectItem">
        <v-list-item-title>{{brand.title}}</v-list-item-title>
    </v-list-item>
</template>
<script>
export default {
    name: "brandmenuitem",
    props: {
        brand: {type: Object, required: true}
    },
    methods: {
        selectItem() {
            this.$store.commit("showcase/SET_ACTIVE_BRAND_BY_ID", this.brand.id);
        }
    }
}
</script>
