import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'

import ClickOutside from './directives/click-outside'

Vue.use(Vuetify)

Vue.directive('click-outside', ClickOutside)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
