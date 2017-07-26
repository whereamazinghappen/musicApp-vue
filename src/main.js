// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import lazyload from 'vue-lazyload'

Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.use(lazyload, {
  loading: require('common/image/default.jpg')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
