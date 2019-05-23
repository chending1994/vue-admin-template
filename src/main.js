import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import ElementUI from 'element-ui';
import './styles.scss';
import '@/styles/index.scss';
import 'normalize.css/normalize.css';
import '@/assets/icon/iconfont.css';

Vue.config.productionTip = false;

// Vue.use(ElementUI, {
//   size: 'medium'
// });
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
