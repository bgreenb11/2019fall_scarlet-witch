/*  Vuex module to interact with Philips Hue bridges 
 */

const state = {
    tracks: []
};

const getters = {
    getTracks: (state) => state.tracks,
    getTrack: (state, index) => state.tracks[index]
};

const actions = {
    addTrack({
        commit
    }, track) {
        commit('addTrack', track)
    },
    addTracks({
        commit
    }, tracks) {
        commit('addTracks', tracks)
    }
};

const mutations = {
    addTrack: (state, track) => {
        if (track.path) state.tracks.push(track);
        else console.error("No filepath for inserted track.");
    },
    addTracks: (state, tracks) => {
        state.tracks = tracks;
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};