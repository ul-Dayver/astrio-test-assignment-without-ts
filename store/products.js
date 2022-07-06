import { createModuleState } from "~/utils/simpleState";

const moduleState = createModuleState('https://raw.githubusercontent.com/fe-side/vue-test/master/assets/level3/products.json');

export const state = moduleState.state
export const mutations = moduleState.mutations
export const actions = moduleState.actions