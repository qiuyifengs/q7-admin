export default context => ({
  namespaced: true,
  state: {
    list: []
  },
  getters: {
    list: state => state.list,
  },
  mutations: {
    // 添加单个请求
    add(state, payload) {
      state.list.push(payload)
    },
    // 删除单个请求
    remove(state, payload) {
      if (payload) {
        const index = state.list.findIndex(item => item.key == payload)
        state.list.splice(index, 1)
      }
    },
    // 清除所有请求
    clear(state, payload) {
      state.list.forEach(item => {
        if (item && (typeof item.cancel == "function")) {
          item.cancel()
        }
      })

      state.list = []
    },
  },

})