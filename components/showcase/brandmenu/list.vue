<template>
    <v-list>
        <v-list-item-group
          v-model="model"
        >
            <v-list-item @click="resetBrand">
                <v-list-item-title>{{defaultLabel}}</v-list-item-title>
            </v-list-item>
            <ShowcaseBrandmenuItem 
                v-for="brand in brands"
                :key="brand.id"
                :brand="brand"
                @click="selectBrand"
            />
        </v-list-item-group>
    </v-list>
</template>
<script>
export default {
    name: "brandmenulist",
    props: {
        defaultLabel: {type: String, required: true},
        currentBrandId: {type: Number | null, required: true}
    },
    data() {
        const index = this.$store.state.brands.data.findIndex(({id}) => id === this.currentBrandId);
        return {
            model: index+1
        };
    },
    watch: {
        currentBrandId() {
            const index = this.$store.state.brands.data.findIndex(({id}) => id === this.currentBrandId);
            this.model = index+1;
        }
    },
    computed: {
        brands() {
            return this.$store.state.brands.data;
        }
    },
    methods: {
        selectBrand(brand) {
            this.$emit("selectbrand", brand);
        },
        resetBrand() {
            this.$emit("selectbrand", null);
        }
    }
}
</script>