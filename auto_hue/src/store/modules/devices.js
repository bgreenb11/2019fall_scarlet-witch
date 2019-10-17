/*  Vuex module to interact with Philips Hue devices 
 */

const state = {
    devices: [{
            id: 1,
            name: "Testing White Device",
            power: true,
            color: null
        },
        {
            id: 2,
            name: "Testing Color Device",
            power: true,
            color: "orange"
        },
        {
            id: 3,
            name: "Testing Color Device 1",
            power: true,
            color: "gray"
        },
        {
            id: 4,
            name: "Testing Off Device",
            power: false,
            color: null
        },
        {
            id: 5,
            name: "Testing Off Color Device",
            power: false,
            color: "orange"
        },
        {
            id: 6,
            name: "Testing Color Device",
            power: true,
            color: "red"
        },
    ]
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
    addDevices: (state, devices) => (state.devices = devices)
};

export default {
    state,
    getters,
    actions,
    mutations
};