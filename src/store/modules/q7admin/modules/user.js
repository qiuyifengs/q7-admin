import { Message, MessageBox } from 'element-ui'
import utils from '@/utils'
import router from '@/router'

export default context => {
  return {
    namespaced: true,
    state: {
      // 用户登录状态
      isLogged: !!utils.cookies.get('token'),
      info: {},
    },
    getters: {
      name (state) {
        return utils.fn.getFromMulti(state.info, [
          'account',
          'nickName'
        ], '')
      }
    },
    actions: {
      async login ({ commit, dispatch }, data) {
        try {
          // const res = await context.api.SYS_USER_LOGIN(data)
          const res = {
            account: 'admin',
            token: 'X0Z6IeEhVQvS2KZlDe3aOENDPxE',
            menus: []
          }

          utils.cookies.set('token', res.token)
          await dispatch('q7admin/user/set', res, { root: true })

          // 设置用户已经登录
          commit('isLoggedSet', true)

          // 加载权限
          // await dispatch('q7admin/permission/load', { focus: true, data: res.menus }, { root: true })

          // 用户登录后从持久化数据加载一系列的设置
          await dispatch('q7admin/sys/load', undefined, { root: true })

          Message({
            message: '登录成功',
            type: 'success'
          })

          router.push({ name: 'login' })

          return Promise.resolve()
        } catch (error) {
          return Promise.reject(error)
        }
      },
      /**
       * @description 注销用户并返回登录页面
       * @param {Object} context
       * @param {Object} payload confirm {Boolean} 是否需要确认
       */
      logout ({ commit, dispatch }, { focus = false, remote = true, back = false } = {}) {
        /**
         * @description 注销
         */
        async function logout () {
          // 设置用户登录状态
          commit('isLoggedSet', false)

          // 请求登出接口 不管成功与否都要进行下一步，所以不用await
          if (remote) context.api.SYS_USER_LOGOUT()

          // 删除 cookie
          utils.cookies.remove('token')
          
          await dispatch('q7admin/user/load')
          // 本地清空用户信息
          await dispatch('q7admin/user/set', {}, { root: true })

          // 计算跳转路由
          // let redirect = ''
          // if (back) {
          //   if (['login'].indexOf(router.app.$route.name) < 0) redirect = router.app.$route.fullPath
          //   else redirect = router.app.$route.query.redirect
          // }

          // await dispatch('q7admin/permission/load', {
          //   focus: true,
          //   to: {
          //     name: 'login',
          //   },
          //   data: []
          // })

          localStorage.setItem('menuData', [])

          router.replace({ name: 'login' })
          
        }

        // 判断是否需要确认
        if (!focus) {
          commit('q7admin/gray/set', true, { root: true })
          
          MessageBox.confirm('确定要注销当前用户吗', '注销用户', { type: 'warning' })
            .then(() => {
              commit('q7admin/gray/set', false, { root: true })
              logout()
            })
            .catch(() => {
              commit('q7admin/gray/set', false, { root: true })
              Message({ message: '取消注销操作' })
            })
        } else {
          logout()
        }
      },
      /**
       * @description 设置用户数据
       * @param {Object} vuex context
       * @param {*} info info
       */
      async set ({ state, dispatch }, info) {
        state.info = info
        await dispatch('q7admin/db/set', {
          dbName: 'sys',
          path: 'user.info',
          value: info,
          user: true
        }, { root: true })
      },
      /**
       * @description 从数据库取用户数据
       * @param {Object} vuex context
       */
      async load ({ state, dispatch }) {
        // store 赋值
        state.info = await dispatch('q7admin/db/get', {
          dbName: 'sys',
          path: 'user.info',
          defaultValue: {},
          user: true
        }, { root: true })
      }
    },
    mutations: {
      /**
       * @description 设置用户登陆状态
       * @param {Object} state state
       * @param {Boolean} value 是否登录
       */
      isLoggedSet (state, value) {
        state.isLogged = value
      }
    }
  }
}
