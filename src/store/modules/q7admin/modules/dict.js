
import dict from '@/config/dict'

export default context => {
  return {
    namespaced: true,
    state: {
      // 字典数据
      dicts: dict
    },
    actions: {
      /**
       * @description 获取字典
       * @param {String} name 字典名称
       */
      get ({ state }, name) {
        const dict = state.dicts.find(e => e.name === name)
        return (dict && dict.value) || []
      }
    },
    mutations: {
      /**
       * @description 设置字典
       * @param {Object} payload {String} name 字典名称
       * @param {Object} payload {Array} value 字典数据
       */
      set (state, { name = '', value = [] } = {}) {
        const dictIndex = state.dicts.findIndex(e => e.name === name)
        if (dictIndex < 0) {
          state.dicts.push({ name, value })
        } else {
          state.dicts.splice(dictIndex, 1, { name, value })
        }
      }
    }
  }
}
