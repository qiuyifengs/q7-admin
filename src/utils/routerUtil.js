// import routerMap from '@/router/async/router.map'
import deepMerge from 'deepmerge'

/**
 * 根据 路由配置 和 路由组件注册 解析路由
 * @param routesConfig 路由配置
 * @param routerMap 本地路由组件注册配置
 */
// function parseRoutes(routesConfig, routerMap) {
//   let routes = []
//   routesConfig.forEach(item => {
//     // 获取注册在 routerMap 中的 router，初始化 routeCfg
//     let router = undefined, routeCfg = {}
//     if (typeof item === 'string' && routerMap[item]) {
//       router = routerMap[item]
//       routeCfg = {path: router.path || item, router: item}
//     } else if (typeof item === 'object') {
//       router = routerMap[item.router]
//       routeCfg = item
//     }
//     // 从 router 和 routeCfg 解析路由
//     if (!router) {
//       console.warn(`can't find register for router ${routeCfg.router}, please register it in advance.`)
//     } else {
//       const route = {
//         path: routeCfg.path || router.path || routeCfg.router,
//         name: routeCfg.name || router.name,
//         component: router.component,
//         redirect: routeCfg.redirect || router.redirect,
//         meta: {
//           authority: routeCfg.authority || router.authority || '*',
//           icon: routeCfg.icon || router.icon,
//           page: routeCfg.page || router.page
//         }
//       }
//       if (routeCfg.invisible || router.invisible) {
//         route.meta.invisible = true
//       }
//       if (routeCfg.children && routeCfg.children.length > 0) {
//         route.children = parseRoutes(routeCfg.children, routerMap)
//       }
//       routes.push(route)
//     }
//   })
//   return routes
// }

/**
 * 加载路由
 * @param router 应用路由实例
 * @param store 应用的 vuex.store 实例
 * @param routesConfig 路由配置
 */
function loadRoutes({router, store}, routesConfig) {
  // 如果 routesConfig 有值，则更新到本地，否则从本地获取
  if (routesConfig) {
    store.commit('user/setRoutesConfig', routesConfig)
  } else {
    routesConfig = store.getters['user/routesConfig']
  }
  // 如果开启了异步路由，则加载异步路由配置
  // const asyncRoutes = store.state.setting.asyncRoutes
  // if (asyncRoutes) {
  //   if (routesConfig && routesConfig.length > 0) {
  //     const routes = parseRoutes(routesConfig, routerMap)
  //     formatRoutes(routes)
  //     const finalRoutes = mergeRoutes(router.options.routes, routes)
  //     router.options = {...router.options, routes: finalRoutes}
  //     router.matcher = new Router({...router.options, routes:[]}).matcher
  //     router.addRoutes(finalRoutes)
  //   }
  // }
  // 初始化Admin后台菜单数据
  const rootRoute = router.options.routes.find(item => item.path === '/')
  const menuRoutes = rootRoute && rootRoute.children
  if (menuRoutes) {
    store.commit('q7admin/setting/setMenuData', menuRoutes)
  }

  // 处理路由 得到每一级的路由设置
  store.commit('q7admin/page/init', menuRoutes)

  store.dispatch('q7admin/permission/load', { focus: true, data: JSON.parse(localStorage.getItem('menuData')) })
  
}

/**
 * 合并路由
 * @param target {Route[]}
 * @param source {Route[]}
 * @returns {Route[]}
 */
// function mergeRoutes(target, source) {
//   const routesMap = {}
//   target.forEach(item => routesMap[item.path] = item)
//   source.forEach(item => routesMap[item.path] = item)
//   return Object.values(routesMap)
// }

/**
 * 深度合并路由
 * @param target {Route[]}
 * @param source {Route[]}
 * @returns {Route[]}
 */
function deepMergeRoutes(target, source) {
  // 映射路由数组
  const mapRoutes = routes => {
    const routesMap = {}
    routes.forEach(item => {
      routesMap[item.path] = {
        ...item,
        children: item.children ? mapRoutes(item.children) : undefined
      }
    })
    return routesMap
  }
  const tarMap = mapRoutes(target)
  const srcMap = mapRoutes(source)

  // 合并路由
  const merge = deepMerge(tarMap, srcMap)

  // 转换为 routes 数组
  const parseRoutesMap = routesMap => {
    return Object.values(routesMap).map(item => {
      if (item.children) {
        item.children = parseRoutesMap(item.children)
      } else {
        delete item.children
      }
      return item
    })
  }
  return parseRoutesMap(merge)
}

/**
 * 格式化路由
 * @param routes 路由配置
 */
function formatRoutes(routes) {
  routes.forEach(route => {
    const {path} = route
    if (!path.startsWith('/') && path !== '*') {
      route.path = '/' + path
    }
  })
  // formatAuthority(routes)
}

/**
 * 格式化路由的权限配置
 * @param routes 路由
 * @param pAuthorities 父级路由权限配置集合
 */
function formatAuthority(routes, pAuthorities = []) {
  routes.forEach(route => {
    const meta = route.meta
    const defaultAuthority = pAuthorities[pAuthorities.length - 1] || {permission: '*'}
    if (meta) {
      let authority = {}
      if (!meta.authority) {
        authority = defaultAuthority
      }else if (typeof meta.authority === 'string') {
        authority.permission = meta.authority
      } else if (typeof meta.authority === 'object') {
        authority = meta.authority
        const {role} = authority
        if (typeof role === 'string') {
          authority.role = [role]
        }
        if (!authority.permission && !authority.role) {
          authority = defaultAuthority
        }
      }
      meta.authority = authority
    } else {
      const authority = defaultAuthority
      route.meta = {authority}
    }
    route.meta.pAuthorities = pAuthorities
    if (route.children) {
      formatAuthority(route.children, [...pAuthorities, route.meta.authority])
    }
  })
}

/**
 * 从路由 path 解析 i18n key
 * @param path
 * @returns {*}
 */
function getI18nKey(path) {
  const keys = path.split('/').filter(item => !item.startsWith(':') && item != '')
  keys.push('name')
  return keys.join('.')
}

/**
 * 加载导航守卫
 * @param guards
 * @param options
 */
function loadGuards(guards, options) {
  const {beforeEach, afterEach} = guards
  const {router} = options
  beforeEach.forEach(guard => {
    if (guard && typeof guard === 'function') {
      router.beforeEach((to, from, next) => guard(to, from, next, options))
    }
  })
  afterEach.forEach(guard => {
    if (guard && typeof guard === 'function') {
      router.afterEach((to, from) => guard(to, from, options))
    }
  })
}

export { loadRoutes, formatAuthority, getI18nKey, loadGuards, deepMergeRoutes, formatRoutes}
