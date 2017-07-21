import Vue from 'vue'
import Router from 'vue-router'

import Discovers from 'components/discovers/discovers'
import Songlists from 'components/songlists/songlists'
import Fms from 'components/fms/fms'
import Ranks from 'components/ranks/ranks'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'discover'
    },
    {
      path: '/discover',
      component: Discovers
    },
    {
      path: '/songlist',
      component: Songlists
    },
    {
      path: '/fm',
      component: Fms
    },
    {
      path: '/rank',
      component: Ranks
    }
  ]
})
