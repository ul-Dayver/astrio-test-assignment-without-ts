<template>
    <div class="text-right" style="position: relative">
        <v-btn
            color="primary"
            dark
            @click="clickToggleMenu"
            v-if="$vuetify.breakpoint.smAndDown"
        > 
            {{currentBrandTitle}}
        </v-btn>
        <div :class="`showcase-brandmenu-list${menuOpened ? ' showcase-brandmenu-list__show' : ''}`">
            <ShowcaseBrandmenuList
                :defaultLabel="defaultBrandLabel"
                :currentBrandId="currentBrandId"
                @selectbrand="setActiveBrand"
            />
        </div>
    </div>
</template>
<script>
const ALL_BRANDS = "All brands";
export default {
    name: "brandmenu",
    data() {
        return {
            menuOpened: false,
            defaultBrandLabel: ALL_BRANDS,
            currentBrandTitle: ALL_BRANDS,
            currentBrandId: null,
        }
    },
    mounted() {
        if (window && window.addEventListener) {
            window.addEventListener("click", this.closeMenu);
        }
    },
    beforeDestroy() {
        if (window && window.removeEventListener) {
            window.removeEventListener("click", this.closeMenu);
        }
    },
    computed: {
        brands() {
            return this.$store.state.brands.data;
        }
    },
    methods: {
        clickToggleMenu(event) {
            event.stopPropagation();
            this.menuOpened = !this.menuOpened;
        },
        closeMenu() {
            this.menuOpened = false;
        },
        setActiveBrand(brand) {
            if (brand) {
                this.currentBrandId = brand.id;
                this.currentBrandTitle = brand.title;
            } else {
                this.currentBrandId = null;
                this.currentBrandTitle = this.defaultBrandLabel;
            }
            this.$emit("changebrand", this.currentBrandId);
            this.closeMenu();
        }
    }
}
</script>
<style>
.showcase-brandmenu-list {
    text-align: left;
}
@media(max-width: 960px) {
    .showcase-brandmenu-list {
        position: absolute;
        z-index: 1;
        right: 0;
        min-width: 140px;
        display: none;
    }
    .showcase-brandmenu-list__show {
        display: block;
    }
}

</style>