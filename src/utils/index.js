import env from '@/env'
import * as cookies from './modules/cookies'
import * as db from './modules/db'
import * as fn from './modules/fn'
import * as helper from './modules/helper'
import * as log from './modules/log'
import * as time from './modules/time'
import * as dict from './modules/dict'

const utils = {
    cookies,
    db,
    fn,
    helper,
    log,
    time,
    dict,
    import: require('./modules/import-' + env.NODE_ENV)
}

/**
 * @description 更新标题
 * @param {String} titleText 标题
 */
utils.title = (titleText) => {
  const processTitle = process.env.VUE_APP_TITLE || 'admin'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
utils.open = url => {
  let a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAtrribute('id', 'q7admin-menu-link')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('f7admin-menu-link'))
}

utils.timeFix = () => {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export default utils