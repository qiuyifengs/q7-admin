import Cookies from 'js-cookie'

/**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} setting cookie setting
 */
export function set (name = 'default', value = '', cookieSetting = {}) {
  let currentCookieSetting = {
    expires: 1
  }
  Object.assign(currentCookieSetting, cookieSetting)
  Cookies.set(name, value, currentCookieSetting)
}

/**
 * @description 获取 cookie 值
 * @param {String} name cookie name
 */
export function get (name = 'default') {
  return Cookies.get(name)
}

/**
 * @description 获取 cookie 全部的值
 */
export function getAll () {
  return Cookies.get()
}

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
export function remove (name = 'default') {
  return Cookies.remove(name)
}
