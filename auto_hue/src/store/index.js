import Vuex from 'vuex';
import Vue from 'vue';
import devices from './modules/devices';
import bridges from './modules/bridges';
import spotifyAuth from './modules/spotifyAuth'

// Load Vuex
Vue.use(Vuex);

// Export Vuex Store 
export default new Vuex.Store({
    modules: {
        devices,
        bridges,
        spotifyAuth
    }
})