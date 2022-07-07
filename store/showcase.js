const ALL_BRANDS = {id: null, title: "All brands"};
export const state = () => ({
    products: [],
    brands: [ALL_BRANDS],
    activeBrandIndex: 0
});

export const mutations = {
    /**
     * set products
     * @param {Object} state 
     * @param {products} payload products
     */
    SET_PRODUCTS(state, payload) {
        if (Array.isArray(payload)) {
            state.products = [...payload]
        }
    },
    /**
     * set brands
     * @param {Object} state 
     * @param {Array} payload brands
     */
    SET_BRANDS(state, payload) {
        if (Array.isArray(payload)) {
            state.brands = [ALL_BRANDS,...payload]
        }
    },
    /**
     * set active brand by id
     * @param {Object} state 
     * @param {Number | null} payload id brand
     */
    SET_ACTIVE_BRAND_BY_ID(state, payload) {
        const brandIndex = state.brands.findIndex(brand => brand.id === payload);
        if (brandIndex >= 0) {
            state.activeBrandIndex = brandIndex;
        }
    }
};

export const getters = {
    /**
     * return showcase products
     * @param {Object} state 
     * @returns {Array}
     */
    showcaseProducts(state) {
        if (!state.activeBrandIndex) {
            return state.products;
        }
        const brand = state.brands[state.activeBrandIndex];
        return state.products.filter(product => product.brand === brand.id);
    },
    /**
     * return active brand title
     * @param {Object} state 
     * @returns {String}
     */
    currentBrandTitle(state) {
        return state.activeBrandIndex === null 
            ? ALL_BRANDS.title
            : state.brands[state.activeBrandIndex].title
    }
};