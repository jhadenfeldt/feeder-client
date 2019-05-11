import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueFriendlyIframe from 'vue-friendly-iframe'

Vue.component('vue-friendly-iframe', VueFriendlyIframe)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
