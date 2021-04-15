export default function cache (vm, key, obj) {
  const k = `__q7cache_${key}`
  return vm[key] === void 0
    ? (vm[k] = obj)
    : vm[key]
}

export function getPropCacheMixin (propName, proxyPropName) {
  return {
    data () {
      const target = {}
      const source = this[propName]

      for (const prop in source) {
        target[prop] = source[prop]
      }

      return { [proxyPropName]: target }
    },

    watch: {
      [propName] (newObj, oldObj) {
        const target = this[proxyPropName]

        if (oldObj !== void 0) {
          // we first delete obsolete events
          for (const prop in oldObj) {
            if (newObj[prop] === void 0) {
              this.$delete(target, prop)
            }
          }
        }

        for (const prop in newObj) {
          // we then update changed events
          if (target[prop] !== newObj[prop]) {
            this.$set(target, prop, newObj[prop])
          }
        }
      }
    }
  }
}