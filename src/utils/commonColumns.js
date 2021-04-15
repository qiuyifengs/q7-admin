import dayjs from 'dayjs'
import ContentColumn from '@/components/Tool/ContentColumn'

export const createdAt = {
    prop: 'createdAt', 
    label: '添加日期',
    render: (h, params) => {
        return (
          <span>{ dayjs(params.row.createdAt).format('YYYY-MM-DD HH:mm') }</span>
        )
    } 
}

export const content = {
    prop: 'content',
    label: '内容',
    width: 200,
    render: (h, params) => {
      return (
        <ContentColumn row={params.row}/>
      )
    }
}

export const kind = { 
    prop: 'kind', 
    label: '行业', 
    width: 80,
    render: (h, params) => {
      const kindMap = {
        'ORGAN': '机构',
        'PERSON': '个人'
      }
      return ( 
        <span> { kindMap[params.row.kind] }</span>
      )
    }
}

export const price = { 
    prop: 'price', 
    label: '价格', 
    width: 80, 
    render: (h, params) => {
      return (
        <span>{params.row.minPrice}-{params.row.maxPrice}</span>
      )
    }
}

export const area = { 
    prop: 'area', 
    label: '地区', 
    width: 100, 
    render: (h, params) => {
      return (
        <span>{ params.row.province.indexOf('市') !== -1 ? params.row.province : params.row.city }</span>
      )
    }
}

export const contact = { 
    prop: 'contact', 
    label: '联系方式', 
    width: 100, 
    render: (h, params) => {
      return (
        <div>
          { params.row.weChat ? <div>微信: {params.row.weChat}</div> : ''}
          { params.row.qq ? <div>QQ: {params.row.qq}</div> : ''}
          { params.row.phone ? <div>电话: {params.row.phone}</div> : ''}
        </div>
      )
    }
}