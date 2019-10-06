import Vue from 'vue';
import App from './App.vue';
import HueHelper from './plugins/HueHelper';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.prototype.$hue = HueHelper;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
