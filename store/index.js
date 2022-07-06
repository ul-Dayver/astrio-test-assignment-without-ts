export const actions = {
    async nuxtServerInit ({ dispatch  }) {
        await dispatch("products/load");
        await dispatch("brands/load");
    }
}