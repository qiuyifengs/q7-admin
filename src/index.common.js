import VuePlugin from './vue-plugin.js'

import * as directives from './directives.js'
import * as plugins from './plugins.js'

export default {
  // for when importing all
  ...VuePlugin,
  install (Vue, opts) {
    VuePlugin.install(Vue, {
      directives,
      plugins,
      ...opts
    })
  },

  // for when cherry-picking
  q7: VuePlugin,

  ...directives,
  ...plugins

}
