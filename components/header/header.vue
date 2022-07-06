<template>
    <header>
        <v-app-bar fixed app dense>
            <NuxtLink to="/">
                <img src="/images/logo.png" alr="Astrio Logo" />
            </NuxtLink>
            <v-spacer></v-spacer>
            <Cartbutton />
        </v-app-bar>
  </header>
</template>
<script>
import Cartbutton from './cartbutton.vue';
export default {
    name: "Header",
    components: { Cartbutton }
}
</script>