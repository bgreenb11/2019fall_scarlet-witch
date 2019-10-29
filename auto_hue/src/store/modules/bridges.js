/*  Vuex module to interact with Philips Hue bridges 
 */

const state = {
    bridge: {
        id: "Manual Entry",
        internalipaddress: "192.168.1.145"
    },
    user: "oKTQBmOGamkYpnHaL48p58v0VYR1UrANuNQwcZLt"
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