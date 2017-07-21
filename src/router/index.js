import Vue from 'vue'
import Router from 'vue-router'

import Recommends from 'components/recommends/recommends'
import Songlists from 'components/songlists/songlists'
import Fms from 'components/fms/fms'
import Ranks from 'components/ranks/ranks'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'recommend'
    },
    {
      path: '/recommend',
      component: Recommends
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
