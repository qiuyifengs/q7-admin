import { version } from '../package.json'
import IconSet from './icon-set.js'

export const $q7 = {
  version,
  config: {}
}

export default function (Vue, opts = {}) {
  if (this.__q7Installed === true) { return }
  this.__q7Installed = true

  const cfg = $q7.config = Object.freeze(opts.config || {})

  // required plugins
  IconSet.install($q7, opts.iconSet)

  Vue.prototype.$q7 = $q7

  // opts.components && Object.keys(opts.components).forEach(key => {
  //   const c = opts.components[key]
  //   if (typeof c === 'function') {
  //     Vue.component(c.options.name, c)
  //   }
  // })

  opts.directives && Object.keys(opts.directives).forEach(key => {
    const d = opts.directives[key]
    if (d.name !== undefined) {
      Vue.directive(d.name, d)
    }
  })

  if (opts.plugins) {
    const param = { $q7, cfg }
    Object.keys(opts.plugins).forEach(key => {
      const p = opts.plugins[key]
      if (typeof p.install === 'function') {
        p.install(param)
      }
    })
  }
}
