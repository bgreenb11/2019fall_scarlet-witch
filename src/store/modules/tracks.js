/*  Vuex module to interact with Philips Hue bridges 
 */

const state = {
    tracks: []
};

const getters = {
    getTrack: (state, index) => state.tracks[index]
};

const actions = {
    addTrack({
        commit
    }, track) {
        commit('addTrack', track)
    }
};

const mutations = {
    addTrack: (state, track) => {
        if (track.path) state.tracks.push(track);
        else console.error("No filepath for inserted track.");
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};