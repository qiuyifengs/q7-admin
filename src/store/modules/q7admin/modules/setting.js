import config from '@/config'
import {ADMIN} from '@/config/default'
import { formatFullPath, filterMenu } from '@/utils/authority-utils'

export default context => {
  return {
    namespaced: true,
    state: {
      animates: ADMIN.animates,
      palettes: ADMIN.palettes,
      menuData: [],
      filterMenu: [],
      subMenu: [],
      asideCollapse: config.menu.asideCollapse,
      asideTransition: config.menu.asideTransition,
      activatedFirst: undefined,
      ...config,
    },
    getters: {
      menuData: state => {
        if (state.filterMenu) {
          filterMenu(state.menuData)
        }
        return state.menuData
      },
      
      firstMenu: state => {
        const { menuData } = state
        if (menuData.length > 0 && !menuData[0].fullPath) {
          formatFullPath(menuData)
        }
        return menuData.map(item => {
          const menuItem = { ...item }
          delete menuItem.children
          return menuItem
        })
      },

      subMenu (state) {
        const { menuData, activatedFirst } = state

        if (!menuData[0] && !menuData[0].fullPath) {
          formatFullPath(menuData)
        }
        const current = menuData.find(menu => menu.fullPath === activatedFirst)
        return current && current.children ? current.children : []
      }
    },
    actions: {
      // 设置侧边栏展开或者收缩
      async asideCollapseSet ({ state, dispatch }, collapse) {
        state.asideCollapse = collapse
        await dispatch('q7admin/db/set', {
          dbName: 'sys',
          path: 'setting.asideCollapse',
          value: state.asideCollapse,
          user: true
        }, { root: true })
      },

      // 切换侧边栏展开和收缩
      async asideCollapseToggle ({ state, dispatch }) {
        state.asideCollapse = !state.asideCollapse
        await dispatch('q7admin/db/set', {
          dbName: 'sys',
          path: 'setting.asideCollapse',
          value: state.asideCollapse,
          user: true
        }, { root: true })
      },

      // 持久化数据加载侧边栏设置
      async asideLoad ({ state, dispatch }) {
        const menu = await dispatch('q7admin/db/get', {
          dbName: 'sys',
          path: 'setting',
          defaultValue: config.menu.asideCollapse,
          user: true
        }, { root: true })
        state.asideCollapse = menu.asideCollapse !== undefined ? menu.asideCollapse : config.menu.asideCollapse
        state.asideTransition = menu.asideTransition !== undefined ? menu.asideTransition : config.menu.asideTransition
      }
    },
    mutations: {
      asideSet (state, menu) {
        state.menuData = menu
      },

      setTheme (state, theme) {
        state.theme = theme
      },

      setLayout (state, layout) {
        state.layout = layout
      },

      setMultiPage (state, multiPage) {
        state.multiPage = multiPage
      },

      setAnimate (state, animate) {
        state.animate = animate
      },

      setWeekMode(state, weekMode) {
        state.weekMode = weekMode
      },

      setFixedHeader(state, fixedHeader) {
        state.fixedHeader = fixedHeader
      },

      setFixedSideBar(state, fixedSideBar) {
        state.fixedSideBar = fixedSideBar
      },

      setLang(state, lang) {
        state.lang = lang
      },

      setHideSetting(state, hideSetting) {
        state.hideSetting = hideSetting
      },

      setMenuData(state, menuData) {
        state.menuData = menuData
      },

      setAsyncRoutes(state, asyncRoutes) {
        state.asyncRoutes = asyncRoutes
      },

      setActivatedFirst(state, activatedFirst) {
        state.activatedFirst = activatedFirst
      }
    }
  }
}
