import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { get } from 'lodash'
import util from '@/utils'

const baseURL = process.env.VUE_APP_BASE_API_URL
const isDev = process.env.NODE_ENV === 'development'

// 使用 cancel token 取消请求
// 对每个请求进行标记，并把 cancle 方法储存，如果再次请求中有相同的就取消上一次请求，重新请求
let cancelToken = axios.CancelToken;

// 获取请求标志，对请求队列进行命名
const getRequestMarker = (config) => {
  return encodeURIComponent(config.url + JSON.stringify(config.method === 'get' ? config.params : config.data))
}

function createService () {
  const service = axios.create({
    timeout: 15000,
    baseURL: isDev ? '' : baseURL,
    withCredentials: false
  })

  service.interceptors.request.use(
    config => {
      const token = util.cookies.get('adminToken')
      if (config.params) delete config.params.finished
      if (config.data) delete config.data.finished
      if (token) config.headers['jwt-token-admin'] = token

      config.url = isDev ? `${baseURL}${config.url}` : `${baseURL}${config.url}`;

      // 发送前执行取消操作，把相同的重复请求去除掉，避免短时间重复请求
      config.cancelToken = new cancelToken(cancel => {
        let requestMarker = getRequestMarker(config)
        // 储存 pending 对象 提交到 store 进行记录
        const params = {
          cancel,
          key: requestMarker
        }
        store.commit('q7admin/axios/add', params)
      })
      
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  service.interceptors.response.use(
    response => {
      // 响应后再执行取消操作，把已经完成的请求从 store 中移除
      let requestMarker = getRequestMarker(response.config)
      store.commit('q7admin/axios/remove', requestMarker)

      if (response.data.code && response.data.code === 200) {
        
        if (response.headers['jwt-token-admin']) {
          util.cookies.set('adminToken', response.headers['jwt-token-admin'])
        }

        // 用于兼容充值订单返回的数据结构
        if (response.data.data && response.data.data.pageVO && response.data.data.pageVO.pageable) {
          const page = {
            pageSize: response.data.data.pageVO.size,
            page: response.data.data.pageVO.number + 1,
            total: response.data.data.pageVO.totalElements
          }

          printList(response, page)
          return Promise.resolve({
            list: response.data.data.pageVO.content,
            page
          })
        }

        // 用于兼容保证金订单返回的数据结构
        if (response.data.data && response.data.data.page && response.data.data.page.pageable) {
          const page = {
            pageSize: response.data.data.page.size,
            page: response.data.data.page.number + 1,
            total: response.data.data.page.totalElements
          }

          printList(response, page)
          return Promise.resolve({
            list: response.data.data.page.content,
            page
          })
        }
        
        if (response.data.data && response.data.data.pageable) {
          // 如果返回数据是分页列表
          // 分页信息再包装，添加 finished 判断
          const page = {
            pageSize: response.data.data.size,
            page: response.data.data.number + 1,
            total: response.data.data.totalElements
          }
          
          printList(response, page)
          return Promise.resolve({
            list: response.data.data.content || response.data.data.pageVO.content,
            page
          })
        }
        
        if (response.data.data == null) {
          printList(response, response.data, response.data.data);
          return Promise.resolve(response.data);
        } else {
          printData(response)
          return Promise.resolve(response.data.data || response.data)
        }
      } else {
        Message.error(response.data.message || '服务器繁忙')
        printError(response)
        return Promise.reject(response.data)
      }
    },
    error => {
      Message.closeAll()

      const status = get(error, 'response.data.code')
      const message = get(error, 'response.data.message')

      console.log(error)
      const url = error.config.url

      if (error.response && status === 401) {
        util.cookies.remove()
        if (error.config.url.indexOf('logout') === -1) {
          Message.error(message)
        }
        router.push({
          name: 'login'
        })
      } else if (error.response && status === 500) {
        console.log(new Error(`系统错误!: ${url}`))
        Message.error(message)
      } else if (error.response && error.message.indexOf('timeout') > -1) {
        console.log(new Error(`网络超时!: ${url}`))
      } else if (error.type === '403') {
        console.log(new Error(`没有请求权限!: ${url}`))
      } else if (status === 940) {
        Message.error(message)
        router.push({
          name: 'login'
        })
      } else {
        Message.error(message)
        console.log(new Error(`网络错误!: ${url}`))
      }

      return Promise.reject(error)
    }
  )
  return service
}

/**
 * @description 创建请求方法
 * @param {Object} service axios 实例
 */
function createRequestFunction (service) {
  return function (config) {
    const configDefault = {
      headers: {
        'Content-Type': get(config, 'headers.Content-Type', 'application/json')
      },
      baseURL: isDev ? '' : baseURL,
      data: {},
    }
    return service(Object.assign(configDefault, config))
  }
}

export const service = createService()
export const request = createRequestFunction(service)

const printError = response => {
  if (isDev) {
    let url = response.config.url.replace(response.config.baseURL, '')
    console.groupCollapsed(
      '%cError >>>>>>>>>>>>>>> ' +
      response.config.method.toUpperCase() +
      ' ' +
      url,
      'color: #e74c3c'
    )
    printReq('request query', response.config.params)
    printReq('request payload', response.config.data)
    if (response.data) {
      printErrorCode(response.data.code)
      printMessage(response.data.message)
    }
    console.groupEnd()
  }
}

const printList = (response, page) => {
  if (isDev) {
    let url = response.config.url.replace(response.config.baseURL, '')
    groupStart(response.config.method.toUpperCase() + ' ' + url)
    printReq('请求参数, url query', response.config.params)
    printReq('请求参数, payload body', response.config.data)
    if (response.data.data.content) {
      printRes('返回内容, page', page)
    }
    printRes('返回内容, list', response.data.data.content)
    printMessage(response.data.message)
    console.groupEnd()
  }
}
const printData = response => {
  if (isDev) {
    let url = response.config.url.replace(response.config.baseURL, '')
    groupStart(response.config.method.toUpperCase() + ' ' + url)
    printReq('请求参数, url query', response.config.params)
    printReq('请求参数, payload body', response.config.data)
    printRes('返回内容', response.data.data || response.data)
    printMessage(response.data.message)
    console.groupEnd()
  }
}

const rainbow = [
  'color: #e74c3c',
  'color: #e67e22',
  'color: #f1c40f',
  'color: #2ecc71',
  'color: #1abc9c',
  'color: #3498db',
  'color: #9b59b6',
  'color: #333'
]
const printErrorCode = val => {
  if (val) {
    console.log(
      `%cserver error code: ` + val,
      'background:linear-gradient(to right,#ff6b81, #ff4757);color:#fff;padding:5px 10px'
    )
  }
}
const printMessage = val => {
  if (val) {
    console.log(
      `%cresponse message: ` + val,
      'background:linear-gradient(to top,#ff7f50, #ff6b81);color:#fff;padding:5px 10px'
    )
  }
}
const printRes = (type, val) => {
  if (val) {
    console.log(
      '%c' + (type || 'response data') + ':',
      'background:linear-gradient(to left,#2ed573, #1e90ff);color:#fff;padding:5px 15px;'
    )
    console.log({
      ...val
    })
  }
}
const printReq = (type, val) => {
  if (val) {
    if (typeof val === 'string') {
      val = JSON.parse(val)
    }
    console.log(
      '%c' + (type || 'request payload') + ':',
      'background:linear-gradient(to right,#2ed573, #1e90ff);color:#fff;padding:5px 15px'
    )
    console.log(val)
  }
}
const groupStart = val => {
  let cord = []
  while (cord.length < 7) {
    let n = Math.floor(Math.random() * 7)
    if (!cord.includes(rainbow[n])) {
      cord.push(rainbow[n])
    }
  }
  console.groupCollapsed(
    '%cSuccess %c>>>%c>>>%c>>>%c>>>%c>>>%c>>>%c>>>%c ' + val,
    'color: #2ecc71',
    ...cord,
    'color: #333'
  )
}
