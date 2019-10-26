/*  Vuex module to interact with Philips Hue bridges 
 */

const state = {
    bridge: null,
    user: ""
};

const getters = {
    getBridge: (state) => state.bridge.internalipaddress,
    getUser: (state) => state.user
};

const actions = {
    setBridge({
        commit
    }, bridge) {
        commit('setBridge', bridge)
    },
    setUser({
        commit
    }, user) {
        commit('setUser', user)
    }
};

const mutations = {
    setBridge: (state, bridge) => {
        state.bridge = bridge;
    },
    setUser: (state, user) => {
        state.user = user
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};