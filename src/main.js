import Vue from 'vue';
import 'babel-polyfill';
import './assets/style/cssreset.scss';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import './components/index';
import Utilities from './utilities';
// 自訂語言檔
import en from './assets/lang/en';
import tw from './assets/lang/tw';

Vue.config.devTools = true;
Vue.config.productionTip = false;
Vue.use(require('vue-moment'));

Vue.use(VueI18n);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.mixin(Utilities);
// 取得預設語系
const locale = localStorage.getItem('locale') || 'tw';

// 建立 VueI18n 實體
const i18n = new VueI18n({
  locale,
  messages: { en, tw },
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
