/*  Vuex module to interact with Philips Hue bridges 
 */

const state = {
    bridge: null,
};

const getters = {
    getBridge: (state) => state.bridge
};

const actions = {
    setBridge({
        commit
    }, bridge) {
        commit('setBridge', bridge)
    },
};

const mutations = {
    setBridge: (state, bridge) => {
        state.bridge = bridge;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};