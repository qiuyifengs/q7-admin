import store from '@/store/index'
import util from '@/utils'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

/**
 * 登录守卫
 * @param to
 * @param form
 * @param next
 * @param options
 */
const loginGuard = async (to, from, next, options) => {
  const {message} = options

  // 确认已经加载多标签页数据
  // store.dispatch('page/isLoaded')
  // 确认已经加载组件尺寸设置
  NProgress.start()

  await store.dispatch('q7admin/user/load')

  // 加载动态路由 内部已经做了对登录状态和是否已经加载动态路由的判断
  // await store.dispatch('q7admin/permission/load', { to: to.fullPath })

  // commit('q7admin/setting/setMenuData', menus, { root: true })

  // 验证当前路由所有的匹配中是否需要有登录验证的
  if (to.matched.some(r => r.meta.auth)) {

    const token = util.cookies.get('adminToken')
    if (token && token !== 'undefined') {
      next()
    } else {
      if (message) {
        message.warning('登录已失效，请重新登录')
      }
      // 没有登录的时候跳转到登录界面
      // 携带上登陆成功之后需要跳转的页面完整路径
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
      NProgress.done()
    }
  } else {
    // 不需要身份校验 直接通过
    next()
  }
}

/**
 * 权限守卫
 * @param to
 * @param form
 * @param next
 * @param options
 */
// const authorityGuard = () => {}

/**
 * 混合导航模式下一级菜单跳转重定向
 * @param to
 * @param from
 * @param next
 * @param options
 * @returns {*}
 */
const redirectGuard = (to, from, next, options) => {
  const {store} = options
  if (store.state.q7admin.setting.layout === 'mix') {
    const firstMenu = store.getters['q7admin/setting/firstMenu']
    if (firstMenu.find(item => item.fullPath === to.fullPath)) {
      store.commit('q7admin/setting/setActivatedFirst', to.fullPath)
      const subMenu = store.getters['q7admin/setting/subMenu']
      if (subMenu.length > 0) {
        return next({path: subMenu[0].fullPath})
      }
    }
  }
  next()
}

const routerLoaded = to => {
  NProgress.done()
  store.dispatch('q7admin/page/open', to)

  util.title(to.meta.title)
}

export default {
  beforeEach: [loginGuard, redirectGuard],
  afterEach: [routerLoaded]
}
