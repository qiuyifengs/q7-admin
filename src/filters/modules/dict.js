import utils from '@/utils'
import { isNull } from 'lodash'

export default {
  filterIndustry: type => {
    const data = ['个人', '机构']
    return data[type]
  },
  reportType: state => {
    const data = {
      0:'其他原因',
      1:'虚假',
      2:'过期',
      3:'诈骗',
    }
    return data[state]
  },
  examStatusFilter: value => {
    return utils.dict.format('examStatus', value)
  },
  isEnabledFilter: value => {
    return utils.dict.format('isEnabled', value ? 1 : 0)
  },
  createdAtFilter: value => {
    if (isNull(value)) return
    return utils.time.format(value)
  },
  serveFilter: value => {
    if (isNull(value)) return
    return utils.dict.formatServe(value)
  },
  kindFilter: value => {
    if (isNull(value)) return
    return utils.dict.format('releaseUser', value)
  }
}