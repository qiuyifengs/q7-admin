// export default {
//     /**
//      * 补全静态资源地址
//      * @param {String} val 七牛的key值
//      * @returns {String}
//      */
//     formatStaticUrl (val) {
//       if (val) {
//         if (val.substring(0, 4) === 'http') {
//           return val
//         } else {
//           return process.env.VUE_APP_BASE_STATIC_URL + val
//         }
//       } else {
//         return ''
//       }
//     },
//     /**
//      * 图片正方形缩略图200x200
//      * @param {String} val 图片URL
//      * @returns {String}
//      */
//     thumbSquare: (val, size = 200) => {
//       if (val) {
//         const ext = val.substring(val.lastIndexOf('.'));
//         const names = val.substring(0, val.lastIndexOf('.'));
//         return `${names}_${size}x${size}${ext}`
//       } else {
//         return ''
//       }
//     },
//     /**
//      * 七牛图片缩略图等比缩放600
//      * @param {String} val 图片URL
//      * @returns {String}
//      */
//     thumbSquareFull: (val, size = 600) => {
//       if (val) {
//         const ext = val.substring(val.lastIndexOf('.'));
//         const names = val.substring(0, val.lastIndexOf('.'));
//         return `${names}_${size}x${size}${ext}`
//       } else {
//         return ''
//       }
//     },
//     /**
//      * 视频缩略图
//      * @param {String} val 图片URL
//      * @returns {String}
//      */
//     videoThumbPost: (val, width = 300, height = 200, time = 2000) => {
//       if (val && val !== "") {
//         let isHeight = height === 0
//         let thumb = isHeight ? `thumb-${time}-w${width}.jpg` : `thumb-${time}-w${width}-h${height}.jpg`
//         if (val.includes('index.m3u8')) {
//           return val.replace(/index.m3u8/, thumb)
//         } else {
//           return `${val}/${thumb}`
//         }
//       } else {
//         return ""
//       }
//     },
//     /**
//      * 手机号格式化
//      * @param {String} numb 手机号
//      * @returns {String}
//      */
//     phoneFilter: numb => {
//       let num = numb.toString()
//       if (num === '') return
//       return num.replace(/^(.{3})(.*)(.{4})$/, '$1 $2 $3')
//     },
//     /**
//      * @description: 行业类型过滤
//      * @param {string,number}
//      * @return {String}
//      */
//     filterIndustry: type => {
//       const data = ['个人', '机构']
//       return data[type]
//     },
//     /**
//      * @description: 举报类型类型过滤
//      * @param {string,number}
//      * @return {String}
//      */
//     reportType: state => {
//       const data = {
//         0:'其他原因',
//         1:'虚假',
//         2:'过期',
//         3:'诈骗',
//       }
//       return data[state]
//     },
//     /**
//      * @description: 举报审核状态过滤
//      * @param {string,number}
//      * @return {String}
//      */
//     reportExamStatus: state => {
//       const data = {
//         'AUDIT':'待审核',
//         'REJECTION':'驳回',
//         'ADOPTION':'通过',
//       }
//       return data[state]
//     }
//   }
  


// import Vue from 'vue'

// const files = require.context('./modules', false, /\.js$/)
// console.log(files)
// files.keys().forEach(key => {
//     console.log(key)
//     console.log(files[key].default)
//     const filterModule = files[key].default
//     for (const filterName in filterModule) {
//         console.log(filterName)
//         if (Object.prototype.hasOwnProperty.call(filterModule, filterName)) {
//             Vue.filter(filterName, filterModule[filterName])
//         }
//     }
// })



import Vue from 'vue'

const files = require.context('./modules', false, /\.js$/)
files.keys().forEach(key => {
  const filterModule = files(key).default
  for (const filterName in filterModule) {
    if (Object.prototype.hasOwnProperty.call(filterModule, filterName)) {
      Vue.filter(filterName, filterModule[filterName])
    }
  }
})