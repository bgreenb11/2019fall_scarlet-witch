import Vue from 'vue';
import './plugins/axios'
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store'
import HueHelper from './components/HueHelper';

Vue.config.productionTip = false

Vue.prototype.$hue = HueHelper;

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')