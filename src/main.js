import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '@/lang/i18n'
import {
  numFormat,
  PR,
  getLang
} from '@/utils'

Vue.prototype.$numFormat = numFormat
Vue.prototype.$PR = PR
Vue.prototype.$getLang = getLang
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
