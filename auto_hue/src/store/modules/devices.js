/*  Vuex module to interact with Philips Hue devices 
 */

const state = {
    devices: []
};

const getters = {
    allDevices: (state) => state.devices
};

const actions = {
    addDevices({
        commit
    }, devices) {
        commit('addDevices', devices)
    },
};

const mutations = {
    addDevices: (state, devices) => (state.devices.push(...devices))
};

export default {
    state,
    getters,
    actions,
    mutations
};