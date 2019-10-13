import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import HueHelper from './components/HueHelper';

Vue.config.productionTip = false

Vue.prototype.$hue = HueHelper;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
