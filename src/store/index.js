import Vue from 'vue'
import Vuex from 'vuex'
import vuexPersistence from 'vuex-persist'

import generatorQ7admin from './modules/q7admin'
import api from '@/api'
import env from '@/env'
import permission from '@/permission'

Vue.use(Vuex)

// const generatorAdmin = context => {
//   const files = require.context('./modules', false, /\.js$/)
//   const modules = {}

//   files.keys().forEach(key => {
//     modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
//   })
//   console.log(modules)
//   return {
//     namespaced: true,
//     modules
//   }
// }

// export default new Vuex.Store({
//   modules: generatorAdmin({
//     api,
//     env,
//     permission
//   })
// })

// const vuexLocal = new vuexPersistence({
//   storage: window.localStorage
// })

// const files = require.context('./modules', false, /\.js$/)
// const modules = {}

// files.keys().forEach(key => {
//   modules[key.replace(/(\.\/|\.js)/g, '')] = files(key)
// })

// const store = new Vuex.Store({modules})

// export default store

export default new Vuex.Store({
  modules: {
    q7admin: generatorQ7admin({
      api,
      env,
      permission
    })
  }
})
