import { uniqueId, keys } from 'lodash'
import utils from '@/utils'
import router, { createRoutesInLayout, routesOutLayout, resetRouter } from '@/router'

export default context => {
  /**
   * @description 给菜单数据补充上 path 字段
   * @param {Array} menu 原始的菜单数据
   */
  function supplementPath(menu) {
    return menu.map(e => ({
      ...e,
      path: e.path || uniqueId('admin-emnu-empty-'),
      ...e.children ? {
        children: supplementPath(e.children)
      } : {}
    }))
  }

  /**
   * @description 检查一个菜单是否有子菜单
   * @param {item} item 接口返回菜单中的一项原始数据
   * @param {*} keyname 
   */
  function hasRouteChildren(item = {}, keyname = 'children') {
    return utils.helper.hasChildren(item, keyname) && item[keyname].reduce((count, menu) => menu.menu_type === context.env.VUE_APP_DICT_MENU_TYPE ? ++count : count, 0) > 0
  }

  /**
   * @description 从接口返回的数据中计算出菜单
   * @param {Array} menuSource 接口返回的原始菜单数据
   */
  function getMenus(menuSource) {
    /**
     * @description 检查是否为合法菜单
     * @param {Object} sourceItem 原始数据的一项
     */
    function isEffectiveMenu(sourceItem) {
      // if (sourceItem.menu_type !== context.env.VUE_APP_DICT_MENU_TYPE_MENU) return
      // if (sourceItem.visible !== context.env.VUE_APP_DICT_VISIBLE_TRUE) return
      if (sourceItem.name === '') return
      return true
    }

    /**
     * @description 依次处理原始数据, 返回处理后的菜单
     * @param {Array} menus 上次处理返回的结果
     * @param {Object} sourceItem 原始数据的一项
     */
    function maker(menus, sourceItem) {
      // if (!isEffectiveMenu(sourceItem)) return menus
      let menu = {}
      menu.path = sourceItem.path
      menu.name = sourceItem.name,
      menu.sort = sourceItem.sort,
      menu.meta = {
        title: sourceItem.title,
        icon: sourceItem.icon
      }

      if (hasRouteChildren(sourceItem)) menu.children = sourceItem.children.reduce(maker, [])
      menus.push(menu)
      return menus
    }

    return menuSource.reduce(maker, [])
  }

  /**
   * @description 从接口返回的数据中计算出路由
   * @param {*} menuSource 
   */
  function getRoutes(menuSource) {
    /**
     * @description 检验是否为合法路由
     * @param {*} sourceItem 原始数据的一项
     */
    function isEffectiveRoute(sourceItem) {
      const sourceItemKeys = keys(sourceItem)
      const hasAllRequireProperties = [
        'title',
        'name',
        'path',
      ].reduce((res, keyname) => res && sourceItemKeys.includes(keyname) && sourceItem[keyname], true)
      if (!hasAllRequireProperties) return
      return true
    }

    /**
     * @description 检验是否已经注册过此路由
     * @description 在vue-router 中路由的 name 不允许重复
     * @param {Array} registered 已经注册的路由
     * @param {Object} sourceItem 原始数据的一项
     */
    function isUnregistered(registered, sourceItem) {
      return !registered.find(item => item.name === sourceItem.name)
    }

    /**
     * @description 依次处理原始数据, 返回处理后的路由
     * @param {Array} routes 上次处理返回的结果
     * @param {Object} sourceItem 原始数据的一项
     */
    function maker(routes, sourceItem) {
      if (hasRouteChildren(sourceItem)) {
        // 有子菜单, 递归获取所有子菜单的路由
        routes = routes.concat(sourceItem.children.reduce(maker, []))
      } else if (isEffectiveRoute(sourceItem) && isUnregistered(routes, sourceItem)) {
        try {
          // 没有子菜单, 并且这个路由没有被加入到动态路由列表, 处理当前路由
          let route = {
            path: sourceItem.path,
            name: sourceItem.name,
            meta: {
              title: sourceItem.title,
              icon: sourceItem.icon
            },
            // component: utils.import((sourceItem.path).substr(1))
          }
          routes.push(route)
        } catch (error) {
          console.log(error)
        }
      }
      return routes
    }
    return menuSource.reduce(maker, [])
  }

  function getPermissions(menuSource) {
    /**
     * @description 检验是否为合法权限
     * @param {*} sourceItem 
     */
    // function isEffectivePermission(sourceItem) {
    //   if (sourceItem.menu_type !== context.env.VUE_APP_MENU_TYPE_BUTTON) return
    //   if (sourceItem.perms === '') return
    //   return true
    // }

    function maker(permissions, sourceItem) {
      // if (isEffectivePermission(sourceItem)) permissions.push(sourceItem.perms)
      if (utils.helper.hasChildren(sourceItem)) permissions = permissions.concat(sourceItem.children.reduce(maker, []))
      return permissions
    }
    return menuSource.reduce(maker, [])
  }

  function generator (nodes, parent) {
    if (nodes === void 0) return
    return nodes.map(node => {
      const { name, icon, url, sort, adminMenuVOS } = node || {}
      const currentNode = {
        path: url || (parent && parent.url),
        name: (String(url || (parent && parent.url)).replace(/\//g, '-')).substr(1),
        title: name,
        icon: icon,
        sort: sort
      }
      // 是否有子菜单，并递归处理
      if (adminMenuVOS && adminMenuVOS.length > 0) {
        currentNode.children = generator(adminMenuVOS, currentNode)
      }
      return currentNode
    })
  }

  return {
    namespaced: true,
    state: {
      // 是否已经加载
      isLoaded: false,
      // 用户权限
      permission: [],
      menus: []
    },
    actions: {
      /**
       * @description 加载用户菜单
       * @param {Object} vuex context
       * @param {Object} payload focus {Boolean} 强制重新加载动态路由 此项有值的时候加载状态校验跳过
       * @param {Object} payload to {String} 动态路由加载完成后跳转的页面
       * @param {Object} payload data {Array} 手动设置数据源 用来人工模拟权限数据或者重置权限设置 此项有值的时候登陆状态校验跳过
       */
      async load ({ state, rootState, commit }, { focus = false, to = '', data }) {
        // 取消请求 - 没有登录
        if (!data && !rootState.q7admin.user.isLogged) return
        // 是否已经加载过路由
        if (!focus && state.isLoaded) return
        localStorage.setItem('menuData', JSON.stringify(data))
        // 获取接口原始数据
        const source = generator(data)
        state.permission = getPermissions(source)
        // 计算出菜单
        const menus = getMenus(source).sort((a, b) => a.sort - b.sort)
        state.menus = menus
        commit('q7admin/setting/setMenuData', menus, { root: true })
        // [路由] 计算路由
        const routes = createRoutesInLayout(getRoutes(source)).concat(routesOutLayout)
        // [路由] 默认重定向
        const newArr = routes[0].children.map(item => {
          const route = {
            ...item
          }
          if (item.children && item.children.length > 0 && item.children[0].children && item.children[0].children.length > 0) {
            route.redirect = { name: item.children[0].children[0].name }
          }
          return route
        })
        routes[0].children = []
        routes[0].children = newArr
        // [路由] 重新计算路由
        resetRouter(routes)
        // [路由] 重新计算多页签页池
        // commit('q7admin/page/init', routes, { root: true })
        // [标签页] 重新计算多页签页数据
        // dispatch('q7admin/page/openedLoad', { filter: true }, { root: true })
        // [路由] 重新访问
        if (to) router.replace(to)
        // 标记已经加载过动态路由
        commit('isLoadedSet', true)
      },
      /**
       * @description 验证是否包含全新啊
       * @param {Array|String} need 需要的数据 
       * @param {Boolean} all 是否需要全部包含
       */
      has ({ state }, { need = '', all = false } = {}) {
        return utils.helper[all ? 'allIn' : 'oneOf'](state.permission, need)
      },
    },
    mutations: {
      /**
       * @description 设置动态路由加载状态
       * @param {B} value 是否已经加载动态路由
       */
      isLoadedSet (state, value) {
        state.isLoaded = value
      },

      setMenus (state, value) {
        state.menus = value
      }
    }
  }
}