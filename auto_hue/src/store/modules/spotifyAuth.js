import api from '../../api/spotify';

const state = {
  accessToken: '',
  refreshToken: '',
  expiryTime: ''
};

const getters = {
  getAccessToken: state => state.accessToken,
  getRefreshToken: state => state.refreshToken,
  getExpiryTime: state => state.expiryTime
};

const mutations = {
  SET_SPOTIFY_ACCESS_TOKEN(state, token) {
    state.accessToken = token;
  },

  SET_SPOTIFY_REFRESH_TOKEN(state, token) {
    state.refreshToken = token;
  },

  SET_SPOTIFY_EXPIRY_TIME(state, time) {
    state.expiryTime = time;
  },
};


const actions = {
  login: async function () {
    try {
      const response = await api.auth.getUserAuthURL();
      if (response.data) {
        window.location.href = response.data;
      }
    } catch (e) {
      console.log(e);
    }
  },

  refreshToken: async function ({commit, state}) {
    try {
      if (state.refreshToken) {
        const response = await api.auth.refreshToken(state.refreshToken);
        commit('SET_ACCESS_TOKEN', response.data.access_token);

        return response;
      }
    } catch (e) {
      console.log(e);
    }
  },

  logout: function () {
    let script = document.createElement('script');

    script.src = 'https://www.spotify.com/logout/';
    document.getElementById('app').appendChild(script);

    window.localStorage.clear();
    window.sessionStorage.clear();

    setTimeout(function () {
      location.reload();
    }, 1000)
  },

  setAccessToken({commit}, token) {
    commit('SET_ACCESS_TOKEN', token);
  },

  setRefreshToken({commit}, token) {
    commit('SET_REFRESH_TOKEN', token);
  },

  setExpiryTime({commit}, time) {
    commit('SET_EXPIRY_TIME', time);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
