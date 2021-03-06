export const listenOpts = {
  hasPassive: false,
  passiveCapture: true,
  notPassiveCapture: true
}

export function stopAndPrevent (e) {
  e.cancelable !== false && e.preventDefault()
  e.stopPropagation()
}

try {
  var opts = Object.defineProperty({}, 'passive', {
    get () {
      Object.assign(listenOpts, {
        hasPassive: true,
        passive: { passive: true },
        notPassive: { passive: false },
        passiveCapture: { passive: true, capture: true },
        notPassiveCapture: { passive: false, capture: true }
      })
    }
  })
  window.addEventListener('q7test', null, opts)
  window.removeEventListener('q7test', null, opts)
}
catch (e) {}

export function noop () {}

export default {
  listenOpts,
  stopAndPrevent
}