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
            <v-list>
                <v-list-item-group v-model="activeBrandIndex">
                    <ShowcaseBrandmenuItem 
                        v-for="brand in brands"
                        :key="brand.id || 'all'"
                        :brand="brand"
                    />
                </v-list-item-group>
            </v-list>
        </div>
    </div>
</template>
<script>
export default {
    name: "brandmenu",
    data() {
        return {
            menuOpened: false,
            activeBrandIndex: this.$store.state.showcase.activeBrandIndex
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
            return this.$store.state.showcase.brands;
        },
        currentBrandTitle() {
            return this.$store.getters['showcase/currentBrandTitle'];
        }
    },
    methods: {
        clickToggleMenu(event) {
            event.stopPropagation();
            this.menuOpened = !this.menuOpened;
        },
        closeMenu() {
            this.menuOpened = false;
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