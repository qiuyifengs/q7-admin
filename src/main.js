import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'

import bootstrap from '@/bootstrap'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'animate.css/source/animate.css'

import '@/filters'
import dayjs from 'dayjs'

import '@/assets/svg-icons'

import Viser from 'viser-vue'

import env from '@/env'

import '@/components'

import './registerServiceWorker'
import commonModules from './index.common'

import lodash from 'lodash'
Vue.prototype._ = lodash

Vue.use(commonModules)
bootstrap({router, store, message: Vue.prototype.$message})

// 当前环境
Vue.prototype.$env = env

// 当前的 baseUrl
Vue.prototype.$baseUrl = process.env.BASE_URL
Vue.prototype.$dayjs = dayjs()

// Element
Vue.use(ElementUI, { size: 'small' })
Vue.use(Viser)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
