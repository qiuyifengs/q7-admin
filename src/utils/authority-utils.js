import { uniqueId } from 'lodash'

/**
 * 判断是否有路由的权限
 * @param authority 路由权限配置
 * @param permissions 用户权限集合
 * @returns {boolean|*}
 */
function hasPermission(authority, permissions) {
    let required = '*'
    if (typeof authority === 'string') {
      required = authority
    } else if (typeof authority === 'object') {
      required = authority.permission
    }
    return required === '*' || (permissions && permissions.findIndex(item => item === required || item.id === required) !== -1)
  }

  /**
   * 判断是否有路由需要的角色
   * @param authority 路由权限配置
   * @param roles 用户角色集合
   */
  function hasRole(authority, roles) {
    let required = undefined
    if (typeof authority === 'object') {
      required = authority.role
    }
    return authority === '*' || hasAnyRole(required, roles)
  }

  /**
   * 判断是否有需要的任意一个角色
   * @param required {String | Array[String]} 需要的角色，可以是单个角色或者一个角色数组
   * @param roles 拥有的角色
   * @returns {boolean}
   */
  function hasAnyRole(required, roles) {
    if (!required) {
      return false
    } else if(Array.isArray(required)) {
      return roles.findIndex(role => {
        return required.findIndex(item => item === role || item === role.id) !== -1
      }) !== -1
    } else {
      return roles.findIndex(role => role === required || role.id === required) !== -1
    }
  }

  /**
   * 路由权限校验
   * @param route 路由
   * @param permissions 用户权限集合
   * @param roles 用户角色集合
   * @returns {boolean}
   */
  function hasAuthority(route, permissions, roles) {
    const authorities = [...route.meta.pAuthorities, route.meta.authority]
    for (let authority of authorities) {
      if (!hasPermission(authority, permissions) && !hasRole(authority, roles)) {
        return false
      }
    }
    return true
  }

  /**
   * 根据权限配置过滤菜单数据
   * @param menuData
   * @param permissions
   * @param roles
   */
  function filterMenu(menuData) {
    menuData.forEach(menu => {
      if (menu.meta && menu.meta.invisible === undefined) {
        if (menu.children && menu.children.length > 0) {
          filterMenu(menu.children)
        }
      }
    })
  }

  /**
   * @description 检查一个对象是否有子元素
   * @param {Object} item 检查的对象
   * @param {String} keyname 子元素的 keyname
   */
  function hasChildren (item = {}, keyname = 'children') {
    return item[keyname] && Array.isArray(item[keyname]) && item[keyname].length > 0
  }

  /**
   * 给菜单数据补充上 path 字段
   * @param {Array} menu
   */
  function supplementMenuPath (menu) {
    return menu.map(e => ({
      ...e,
      path: e.path || uniqueId('admin-ment-empty-'),
      ...e.children ? {
        children: supplementMenuPath(e.children)
      } : {}
    }))
  }

  /**
   * 过滤 hidden: true 属性
   * @param {Array} routeMap
   */
  function filterHiddenRoute (routeMap) {
    const routers = routeMap.filter(route => {
      if (!route.hidden) {
        if (route.children && route.children.length) {
          route.children = filterHiddenRoute(route.children)
        }
        return true
      } else {
        return false
      }
    })
    return routers
  }

  /**
   * 格式化 router.options.routes，生成 fullPath
   * @param routes
   * @param parentPath
   */
  function formatFullPath(routes, parentPath = '') {
    routes.forEach(route => {
      let isFullPath = route.path.substring(0, 1) === '/'
      route.fullPath = isFullPath ? route.path : (parentPath === '/' ? parentPath + route.path : parentPath + '/' + route.path)
      if (route.children) {
        formatFullPath(route.children, route.fullPath)
      }
    })
  }

  export {filterMenu, hasAuthority, hasChildren, supplementMenuPath, filterHiddenRoute, formatFullPath}
