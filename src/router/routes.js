import TabsView from '@/layouts/tabs/TabsView'
import major from './modules/major'
import vendor from './modules/vendor'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/utils/util.import.' + process.env.NODE_ENV)

const routes = [
  { path: '/login', name: 'login', component: _import('system/login'), meta: { title: '登录' }},
  { path: '*', name: '404', component: _import('system/error/404')},
  {
    path: '/',
    redirect: { name: 'major-base' },
    meta: { title: '首页' },
    component: TabsView,
    children: [
      // { path: '/index', name: 'index', component: _import('system/index'), meta: { icon: 'el-icon-s-home', title: '首页' }},
      // 刷新页面 必须保留
      { path: 'refresh', name: 'refresh', component: _import('system/function/refresh'), meta: { invisible: true }},
      // 页面重定向 必须保留
      { path: 'redirect/:route*', name: 'redirect', invisible: true, component: _import('system/function/redirect'), meta: { invisible: true }},
      major,
      vendor
    ]
  }
]
export default routes
