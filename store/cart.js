const LOCAL_STORAGE_KEY = "shopcart"

export const state = () => ({
    products: [],
    counter: 0
});

export const actions = {
    /**
     * load state from localStorage
     * @param {Object} store 
     */
    async load({ commit }) {
        const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storage) {
            commit("set", JSON.parse(storage));
        }
    }
};

/**
 * calculating count products and save state to localstorage
 * 
 * @param {Object<{products: Array, counter: number}>} state 
 */
function done(state) {
    state.counter = state.products.reduce((acc, product) => acc + product.qty, 0);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({...state}));
};

/**
 * 
 * @param {Object<{products: Array, counter: Number}>} state 
 * @param {Number} productId
 * @returns {Number} index product; -1 if not founed
 */
function findIndexProduct(state, productId ) {
    return state.products
    .findIndex((product) => product.productId === productId);
};

export const mutations = {
    /**
     * add product to cart;
     * if product already exists, increment quantity  product.
     * 
     * @param {Object<{products: Array, counter: Number}>} state 
     * @param {Object<{productId: Number}>} payload 
     */
    addProduct(state, {productId}) {
        const index = findIndexProduct(state, {productId});
        const product = {productId, qty: 1};
        if (index >= 0) {
            product.qty += state.products[index].qty;
            state.products.splice(index, 1, product);
        } else {
            state.products.push(product);
        }
        done(state);
    },
    /**
     * remove product from cart.
     * 
     * @param {Object<{products: Array, counter: Number}>} state 
     * @param {Object<{productId: Number}>} payload
     */
    removeProduct(state, {productId}) {
        const index = findIndexProduct(state, productId);
        if (index >= 0) {
            state.products.splice(index, 1);
            done(state);
        }
    },
    /**
     * set/rewrite state.
     * 
     * @param {Object<{products: Array, counter: Number}>} state 
     * @param {Object<{products: Array, counter: Number}>} newstate
     */
    set(state, { products, counter }) {
        state.products = products;
        state.counter = counter;
    },
    /**
     * set quantity product
     * 
     * @param {Object<{products: Array, counter: Number}>} state 
     * @param {Object<{productId: Number, qty: Number}>} payload
     */
    setProductQty(state, { productId, qty }){
        if (qty > 0) {
            const index = findIndexProduct(state, productId);
            if (index >= 0) {
                state.products.splice(index, 1, {productId, qty});
                done(state);
            }
        }
    }
};