
const isEnabled = {
  name: 'isEnabled',
  value: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '已上架',
      value: 1
    },
    {
      label: '已下架',
      value: 0
    }
  ]
}

const linkIsEnabled = {
  name: 'linkIsEnabled',
  value: [
    {
      label: '启用',
      value: 1
    },
    {
      label: '禁用',
      value: 0
    }
  ]
}

const userStatusOptions = {
  name: 'userStatusOptions',
  value: [
    {
      label: '已启用',
      value: 1
    },
    {
      label: '已禁用',
      value: 0
    }
  ]
}

const formatterIsEnabled = {
  name: 'formatterIsEnabled',
  value: [
    {
      label: '-',
      value: 2
    },
    {
      label: '已上架',
      value: 1
    },
    {
      label: '已下架',
      value: 0
    }
  ]
}

const releaseUser = {
  name: 'releaseUser',
  value: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '个人',
      value: 'PERSON'
    },
    {
      label: '机构',
      value: 'ORGAN'
    },
    // {
    //   label: '经纪人',
    //   value: ''
    // }
  ]
}

// 发布产品类型
const certType = {
  name: 'certType',
  value: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '个人',
      value: 'MEMBER'
    },
    {
      label: '机构',
      value: 'ORG'
    },
    {
      label: '经纪人',
      value: 'AGENT'
    },
  ]
}

const examStatus = {
  name: 'examStatus',
  value: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '待审核',
      value: 'AUDIT'
    },
    {
      label: '审核通过',
      value: 'ADOPTION'
    },
    {
      label: '审核不通过',
      value: 'REJECTION'
    }
  ]
}

const orderStatus = {
  name: 'orderStatus',
  value: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '支付成功',
      value: 1
    },
    {
      label: '订单失效',
      value: 2
    },
    {
      label: '等待支付成功',
      value: 3
    }
  ]
}

const paymentFlowTypeStatus = {
  name: 'paymentFlowTypeStatus',
  value: [
    {
      label: '暗扣',
      value: 'DEDUCT'
    },
    {
      label: '赠送',
      value: 'GIVE'
    }
  ]
}

const paymentFlowRadioStatus = {
  name: 'paymentFlowRadioStatus',
  value: [
    {
      label: '是',
      value: 1
    },
    {
      label: '否',
      value: 0
    }
  ]
}

const accountStatusOptions = {
  name: 'accountStatusOptions',
  value: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '正常',
      value: 'NORMAL'
    },
    {
      label: '封禁',
      value: 'BAN'
    },
    {
      label: '锁定',
      value: 'BLOCK'
    }
  ]
}

const userBlockDaysFormOptions = {
  name: 'userBlockDaysFormOptions',
  value: [
    {
      label: '永久封禁',
      value: 36500
    },
    {
      label: '封禁24小时',
      value: 1
    },
    {
      label: '封禁2天',
      value: 2
    },
    {
      label: '封禁3天',
      value: 3
    },
    {
      label: '封禁7天',
      value: 7
    }
  ]
}

const terminalType = {
  name: 'terminalType',
  value: [
    {
      label: '全部',
      value: ''
    },
    {
      label: 'android',
      value: 'android'
    },
    {
      label: 'ios',
      value: 'ios'
    }
  ]
}

const terminalVersion = {
  name: 'terminalVersion',
  value: [
    {
      label: '全部',
      value: ''
    },
    {
      label: 'v1.0.0',
      value: 'v1.0.0'
    },
    {
      label: 'v1.0.1',
      value: 'v1.0.0'
    }
  ]
}

const sexOptions = {
  name: 'sexOptions',
  value: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '男',
      value: 0
    },
    {
      label: '女',
      value: 1
    }
  ]
}

const gradeOptions = {
  name: 'gradeOptions',
  value: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '游客',
      value: 'visitor'
    },
    {
      label: '普通会员',
      value: 'member'
    },
    {
      label: 'VIP会员',
      value: 'vip'
    }
  ]
}

const certOptions = {
  name: 'certOptions',
  value: [
    {
      label: '个人',
      value: 'MEMBER'
    },
    {
      label: '机构',
      value: 'ORG'
    },
    {
      label: '经纪人',
      value: 'AGENT'
    }
  ]
}

const upgradeTypeOptions = {
  name: 'upgradeTypeOptions',
  value: [
    {
      label: '强制',
      value: 2
    },
    {
      label: '非强制',
      value: 1
    }
  ]
}

const versionFormStatusOptions = {
  name: 'versionFormStatusOptions',
  value: [
    {
      label: '有效',
      value: 1
    },
    {
      label: '无效',
      value: 0
    }
  ]
}

const userSubmitOptions = {
  name: 'userSubmitOptions',
  value: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '首次提交',
      value: true
    },
    {
      label: '补交',
      value: false
    }
  ]
}

const userCertificationOptions = {
  name: 'userCertificationOptions',
  value: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '机构',
      value: 'ORG'
    },
    {
      label: '经纪人',
      value: 'AGENT'
    },
    {
      label: '个人',
      value: 'MEMBER'
    }
  ]
}

const showPasswordStatus = {
  name: 'showPasswordStatus',
  value: [
    {
      label: '是',
      value: 1
    },
    {
      label: '否',
      value: 0
    }
  ]
}

const orderAuditStatusOptions = {
  name: 'orderAuditStatusOptions',
  value: [
    {
      label: '处理中',
      value: 'PENDING'
    },
    {
      label: '支付成功',
      value: 'SUCCESS'
    },
    {
      label: '支付失败',
      value: 'FAIL'
    },
    {
      label: '异常订单',
      value: 'EXCEPTION'
    }
  ]
}

export default [
  isEnabled,
  linkIsEnabled,
  formatterIsEnabled,
  releaseUser,
  examStatus,
  orderStatus,
  certType,
  paymentFlowTypeStatus,
  paymentFlowRadioStatus,
  accountStatusOptions,
  terminalType,
  terminalVersion,
  sexOptions,
  gradeOptions,
  certOptions,
  upgradeTypeOptions,
  versionFormStatusOptions,
  userBlockDaysFormOptions,
  userStatusOptions,
  userSubmitOptions,
  userCertificationOptions,
  showPasswordStatus,
  orderAuditStatusOptions
]