export const inBrowser = typeof window !== 'undefined';

export const isFirefox = () => {
  return !!window.navigator.userAgent.match(/firefox/i);
}

export const kebabCase = function(str) {
  const hyphenateRE = /([^-])([A-Z])/g;
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase();
};

export function rafThrottle(fn) {
  let locked = false
  return function(...args) {
    if (locked) return
    locked = true
    window.requestAnimationFrame(() => {
      fn.apply(this, args)
      locked = false
    });
  };
}

export const isEmpty = function(val) {
  // null or undefined
  if (val == null) return true

  if (typeof val === 'boolean') return false

  if (typeof val === 'number') return !val

  if (val instanceof Error) return val.message === ''

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length;

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size;
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length;
    }
  }

  return false;
};

export function objToArray(obj) {
  if (Array.isArray(obj)) {
    return obj;
  }
  return isEmpty(obj) ? [] : [obj];
}