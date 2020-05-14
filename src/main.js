import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import infiniteScroll from 'vue-infinite-scroll';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import '../src/scss/variables.scss';
import VueFullPage from 'vue-fullpage.js';

Vue.use(VueFullPage);

const options = {
  // You can set your default options here
};

Vue.use(Toast, options);

Vue.use(infiniteScroll);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
