/*  Vuex module to interact with Philips Hue devices 
 */

const state = {
    devices: [],
    groups: [],
};

const getters = {
    allDevices: (state) => state.devices,
    allGroups: (state) => state.groups,
    devicesByIds: (state, ids) => {
        console.log(ids)
        state.devices.filter(device => ids.find(id => id === device.id))
    } 
};

const actions = {
    addDevices({
        commit
    }, devices) {
        commit('addDevices', devices)
    },
    addGroups({
        commit
    }, groups) {
        commit('addGroups', groups)
    },
};

const mutations = {
    addDevices: (state, devices) => {
        devices.forEach(device => {
            if (!state.devices.map(d => d.id).find(d => d === device.id)) {
                state.devices.push(device)
            }
        });
    },
    addGroups: (state, groups) => {
        groups.forEach(group => {
            if (!state.groups.map(g => g.id).find(g => g === group.id)) {
                state.groups.push(group)
            }
        });
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};