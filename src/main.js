import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import 'lib-flexible'
import {getCookie} from 'js/cookie.js'

Vue.config.productionTip = false

Vue.use(VueResource)

let token = getCookie('token')
Vue.http.options.headers = {}
Vue.http.options.headers.Authorization = token

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
