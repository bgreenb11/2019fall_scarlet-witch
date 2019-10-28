/*  Vuex module to interact with Philips Hue devices 
 */

const state = {
    devices: [],
    groups: [],
    schedules: [],
};

const getters = {
    allDevices: (state) => state.devices,
    allGroups: (state) => state.groups,
    allSchedules: (state) => state.schedules,
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
    addSchedules({
        commit
    }, schedules) {
        commit('addSchedules', schedules)
    },
    removeSchedule({
        commit
    }, id) {
        commit('removeSchedule', id)
    }
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
    },
    addSchedules: (state, schedules) => {
        schedules.forEach(schedule => {
            if (!state.schedules.map(s => s.id).find(s => s === schedule.id)) {
                state.schedules.push(schedule)
            }
        });
    },
    removeSchedule: (state, id) => {
        state.schedules = state.schedules.filter(schedule => schedule.id != id)
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};