import Vue from 'vue'

import materialIcons from '@/icon-set/material-icons.js'

export default {
  install ($q7, iconSet) {
    const initialSet = iconSet || materialIcons

    this.set = (setObject) => {
      const def = { ...setObject }

      def.set = this.set
      $q7.iconSet = def
    }
    
    Vue.util.defineReactive($q7, 'iconMapFn', void 0)
    Vue.util.defineReactive($q7, 'iconSet', {})

    this.set(initialSet)
  }
}
