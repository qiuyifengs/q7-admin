
export const channelColumns = [
    {
      prop: 'id',
      label: '频道ID'
    },
    {
      prop: 'ranking',
      label: '排序'
    },
    {
      prop: 'name',
      label: '频道名称'
    },
    {
      prop: 'vendorName',
      label: '所属商户',
    },
    {
      prop: 'createdAt',
      label: '添加日期',
      slot: true
    },
    {
      prop: 'action',
      label: '操作',
      slot: true
    },
  ]

export const evaluateColumns = [
  {
    prop: 'id',
    label: 'ID',
    width: 35
  },
  {
    prop: 'createdAt',
    label: '评价日期',
    slot: true,
    width: 80
  },
  {
    prop: 'nickName',
    label: '昵称'
  },
  {
    prop: 'witkeyId',
    label: '账号'
  },
  {
    prop: 'name',
    label: '内容',
    slot: true
  },
  {
    prop: 'scores',
    label: '综合评分',
    slot: true
  },
  {
    prop: 'content',
    label: '评论详情',
    slot: true
  },
  {
    prop: 'vendorName',
    label: '所属商户'
  }
]

export const reportPendingColumns = [
  {
    prop: 'id',
    label: 'ID',
    width: 35
  },
  {
    prop: 'createdAt',
    label: '举报日期',
    slot: true,
    width: 80,
  },
  {
    prop: 'nickName',
    label: '举报人昵称'
  },
  {
    prop: 'userAccount',
    label: '举报人账号'
  },
  {
    prop: 'reportContent',
    label: '被举报内容',
    slot: true,
    width: 250
  },
  {
    prop: 'isValidReport',
    label: '举报类型',
    slot: true
  },
  {
    prop: 'reportType',
    label: '描述',
    slot: true
  },
  {
    prop: 'reportDetail',
    label: '举报详情',
    slot: true,
    width: 150
  },
  {
    prop: 'vendorName',
    label: '所属商户'
  },
  {
    prop: 'action',
    label: '操作',
    slot: true,
    width: 120
  }
]

export const serviceColumns = [
  {
    prop: 'id',
    label: '服务ID'
  },
  {
    prop: 'ranking',
    label: '排序'
  },
  {
    prop: 'name',
    label: '服务名称'
  },
  {
    prop: 'createdTime',
    label: '添加日期',
    slot: true
  },
  {
    prop: 'action',
    label: '操作',
    slot: true
  }
]

export const projectColumns = [
  {
    prop: 'id',
    label: '评项ID'
  },
  {
    prop: 'name',
    label: '评项名称'
  },
  {
    prop: 'createdAt',
    label: '添加日期',
    slot: true
  },
  {
    prop: 'action',
    label: '操作',
    slot: true
  }
]

export const giveColumns = [
  {
    prop: 'id',
    label: '配套ID'
  },
  {
    prop: 'ranking',
    label: '排序'
  },
  {
    prop: 'name',
    label: '配套名称'
  },
  {
    prop: 'createdTime',
    label: '添加日期',
    slot: true
  },
  {
    prop: 'action',
    label: '操作',
    slot: true
  }
]

export const reportRejectColumns = [
  {
    prop: 'id',
    label: 'ID',
    width: 35
  },
  {
    prop: 'createdAt',
    label: '举报日期',
    slot: true,
    width: 80,
  },
  {
    prop: 'nickName',
    label: '举报人昵称'
  },
  {
    prop: 'userAccount',
    label: '举报人账号'
  },
  {
    prop: 'reportContent',
    label: '被举报内容',
    slot: true,
    width: 250
  },
  {
    prop: 'isValidReport',
    label: '举报类型',
    slot: true
  },
  {
    prop: 'reportType',
    label: '描述',
    slot: true
  },
  {
    prop: 'reportDetail',
    label: '举报详情',
    slot: true,
    width: 150
  },
  {
    prop: 'vendorName',
    label: '所属商户'
  },
  {
    prop: 'examStatus',
    label: '处理结果',
    slot: true
  }
]

export const infoAuditColumns = [
  {
    prop: 'id',
    label: 'ID',
    width: 35
  },
  {
    prop: 'createdAt',
    label: '发布时间',
    width: '90',
    slot: true
  },
  {
    prop: 'name',
    label: '昵称'
  },
  {
    prop: 'nickName',
    label: '账号'
  },
  {
    prop: 'content',
    label: '内容',
    width: 200,
    slot: true
  },
  {
    prop: 'kind',
    label: '行业',
    width: 50,
    slot: true
  },
  {
    prop: 'price',
    label: '价格',
    slot: true
  },
  {
    prop: 'area',
    label: '地区',
    slot: true
  },
  {
    prop: 'contact',
    label: '联系方式',
    wdith: 100,
    slot: true
  },
  {
    prop: 'vendorName',
    label: '所属商户',
    slot: true
  },
  {
    prop: 'action',
    label: '操作',
    width: 100,
    slot: true
  }
]

export const infoOfflineColumns = [
  {
    prop: 'id',
    label: 'ID',
    width: 35
  },
  {
    prop: 'createdAt',
    label: '发布时间',
    width: '80',
    slot: true
  },
  {
    prop: 'name',
    label: '昵称',
    width: 100
  },
  {
    prop: 'nickName',
    label: '账号'
  },
  {
    prop: 'content',
    label: '内容',
    width: 250,
    slot: true
  },
  {
    prop: 'kind',
    label: '行业',
    slot: true
  },
  {
    prop: 'price',
    label: '价格',
    slot: true
  },
  {
    prop: 'area',
    label: '地区',
    slot: true
  },
  {
    prop: 'addr',
    label: '地址'
  },
  {
    prop: 'contact',
    label: '联系方式',
    width: 120,
    slot: true
  },
  {
    prop: 'vendorName',
    label: '所属商户',
    slot: true
  },
  {
    prop: 'examStatus',
    label: '审核类型',
    slot: true
  }
]

export const pendingApprovalColumns = [

]

export const vendorColumns = [
  {
    prop: 'id',
    label: '商户ID',
    width: 35
  },
  {
    prop: 'name',
    label: '商户名称',
    slot: true,
    width: 80
  },
  {
    prop: 'appZipUrl',
    label: '下载zip包',
    slot: true,
    width: 80
  },
  {
    prop: 'ca',
    label: 'CA证书',
    slot: true,
    width: 50
  },
  {
    prop: 'content',
    label: '备注',
    slot: true
  },
  {
    prop: 'googleKey',
    label: '谷歌密钥',
    slot: true,
    width: 50
  },
  {
    prop: 'publicKey',
    label: '秘钥对公钥',
    slot: true,
    width: 50
  },
  {
    prop: 'privateKey',
    label: '秘钥对秘钥',
    slot: true,
    width: 50
  },
  {
    prop: 'isEnabled',
    label: '状态',
    slot: true,
    width: 50
  },
  {
    prop: 'createdTime',
    label: '添加日期',
    slot: true,
  },
  {
    prop: 'action',
    label: '操作',
    slot: true,
    fixed: 'right',
    width: 200
  }
]

export const infoOnlineColumns = [
  {
    prop: 'id',
    label: 'ID',
    width: 35
  },
  {
    prop: 'createdAt',
    label: '发布时间',
    width: '80',
    slot: true
  },
  {
    prop: 'name',
    label: '昵称',
    width: 100
  },
  {
    prop: 'nickName',
    label: '账号'
  },
  {
    prop: 'content',
    label: '内容',
    width: 250,
    slot: true
  },
  {
    prop: 'kind',
    label: '行业',
    slot: true
  },
  {
    prop: 'price',
    label: '价格',
    slot: true
  },
  {
    prop: 'area',
    label: '地区',
    slot: true
  },
  {
    prop: 'contact',
    label: '联系方式',
    width: 120,
    slot: true
  },
  {
    prop: 'count',
    label: '浏览/付费/普通举报/验证举报',
    width: 120,
    slot: true
  },
  {
    prop: 'action',
    label: '操作',
    width: 150,
    slot: true,
    fixed: 'right'
  }
]

export const orderColumns = [
  {
    prop: 'id',
    label: '订单编号',
    width: 35
  },
  {
    prop: 'lastUpdateAt',
    label: '支付日期',
    slot: true,
    width: 80
  },
  {
    prop: 'nickName',
    label: '付款人昵称'
  },
  {
    prop: 'payUserAccount',
    label: '付款人账号'
  },
  {
    prop: 'content',
    label: '内容',
    slot: true,
    width: 250
  },
  {
    prop: 'price',
    label: '付款金额',
    slot: true
  },
  {
    prop: 'vendorName',
    label: '所属商户'
  }
]

export const industryColumns = [
    {
        prop: 'id',
        label: '行业ID',
        width: 40
    },
    {
        prop: 'ranking',
        label: '排序',
        width: 40
    },
    {
        prop: 'name',
        label: '行业名称',
        width: 80
    },
    {
        prop: 'attributeCount',
        label: '配套数量',
        width: 60
    },
    {
        prop: 'serveCount',
        label: '服务数量',
        width: 60
    },
    {
        prop: 'channelName',
        label: '关联频道'
    },
    {
        prop: 'industryType',
        label: '行业类型',
        slot: true,
        width: 60
    },
    {
        prop: 'payPrice',
        label: '行业价格',
        width: 80
    },
    {
        prop: 'vendorName',
        label: '所属商户',
        width: 80
    },
    {
        prop: 'createdAt',
        label: '添加日期',
        width: 100,
        slot: true
    },
    {
        label: '操作',
        prop: 'action',
        slot: true,
        fixed: 'right',
        width: 350
    },
]
