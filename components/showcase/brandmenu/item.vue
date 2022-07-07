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
            this.$emit('click', this.brand);
        }
    }
}
</script>
