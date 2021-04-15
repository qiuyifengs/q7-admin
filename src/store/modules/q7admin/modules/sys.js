export default context => ({
  namespaced: true,
  actions: {
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} context
     */
    async load ({ dispatch }) {
      // 持久化数据加载上次退出时的多页列表
      // await dispatch('q7admin/page/openedLoad', null, { root: true })
      // 持久化数据加载侧边栏配置
      // await dispatch('q7admin/setting/asideLoad', null, { root: true })
    }
  }
})