/**
 * create a new module state
 * @param {String} url 
 * @returns {Object}
 */
export function createModuleState(url) {
    return {
        state: () => ({ data: [] }),
        mutations: {
            set(state, payload) {
                state.data = payload;
            }
        },
        actions: {
            async load({ commit }) {
                let data;
                try {
                    if (process.server) {
                        data = await this.$http.$get(url);
                    } else {
                        const res = await fetch(url);
                        data = await res.json();
                    }
                    commit("set", data);
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
}