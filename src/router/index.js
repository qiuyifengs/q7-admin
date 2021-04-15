import Vue from 'vue'
import VueRouter from 'vue-router'
// import {formatRoutes} from '@/utils/routerUtil'
import TabsView from '@/layouts/tabs/TabsView'
// import vendor from './modules/vendor'
import content from './modules/content'
import statistics from './modules/statistics'
import utils from '@/utils'

Vue.use(VueRouter)

// fix vue-router NavigationDuplicated
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return VueRouterPush.call(this, location).catch(err => err)
}
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return VueRouterReplace.call(this, location).catch(err => err)
}

// 不需要登录拦截的路由配置
// const loginIgnore = {
//   names: ['404', '403'],      //根据路由名称匹配
//   paths: ['/login'],   //根据路由fullPath匹配
//   /**
//    * 判断路由是否包含在该配置中
//    * @param route vue-router 的 route 对象
//    * @returns {boolean}
//    */
//   includes(route) {
//     return this.names.includes(route.name) || this.paths.includes(route.path)
//   }
// } 

/**
 * @description 创建在 layout 中显示的路由设置
 * @param {Array} routes 动态路由设置
 */
export function createRoutesInLayout (routes = []) {
  return [
    {
      path: '/',
      redirect: { name: 'index' },
      meta: { title: '首页' },
      component: TabsView,
      children: [
        { path: '/index', name: 'index', component: utils.import('system/index'), meta: { icon: 'home', title: '首页' }},
        content,
        statistics,
        ...routes
      ]
    }
  ]
}

// 在layout 之外显示的路由
export const routesOutLayout = [
  { path: 'refresh', name: 'refresh', component: utils.import('system/function/refresh'), meta: { invisible: true }},
  { path: 'redirect/:route*', name: 'redirect', component: utils.import('system/function/redirect'), meta: { invisible: true }},
  { path: '/login', name: 'login', component: utils.import('system/login'), meta: { title: '登录' }},
  { path: '*', name: '404', component: utils.import('system/error/404')}
]

// 默认路由
export const constantRoutes = createRoutesInLayout().concat(routesOutLayout)

/**
 * @description 创建路由
 * @param {Array} routes 路由设置
 */
const createRouter = (routes = []) => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/**
 * @description 重新设置路由
 * @param {Array} routes 额外追加的路由
 */
export function resetRouter(routes = []) {
  router.matcher = createRouter(routes).matcher
}

// 导出路由在main.js中使用
const router = createRouter(constantRoutes)

export default router