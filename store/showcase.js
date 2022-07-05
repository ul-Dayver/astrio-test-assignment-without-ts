export const state = () => ({
    products: [],
    brands: []
});
export const mutations = {
    set(state, payload) {
        state.products = payload.products;
        state.brands = payload.brands;
    }
};
export const actions = {
    async load({ commit }) { 
        const data = process.server ? getData() : await fetchData();
        commit("set", data);
    }
}
/**
 * asynchronous loading of products and brands on client
 * 
 * @returns {Promise<{ brands: Array, products: Array }>}
 */
const fetchData = () => new Promise(
    function(resolve, reject) {
        Promise.all([fetch("~/assets/brands.json"), fetch("~/assets/products.json")])
        .then(data => Promise.all(data.map(res => res.json())))
        .then(jsonData => {
            resolve({
                brands: jsonData[0],
                products: jsonData[1]
            })
        })
        .catch((err) => {
            reject(err)
        });
    }
)

/**
 * loading of products and brands on server
 * 
 * @returns { brands: Array, products: Array }
 */
const getData = () => {
    const brands = require("~/assets/brands.json");
    const products = require("~/assets/products.json");
    return { products, brands };
}