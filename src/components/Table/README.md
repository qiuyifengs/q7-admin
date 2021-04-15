Table 重封装组件说明
====


封装说明
----

> 基础的使用方式与 Element 与 [官方版(Table)](https://element.eleme.cn/#/zh-CN/component/table/) 本一致，在其基础上，封装了加载数据的方法。
>
> 你无需在你是用表格的页面进行分页逻辑处理，仅需向 Table 组件传递绑定 `:data="Promise"` 对象即可

例子1
----
（基础使用）

```vue

<template>
  <hy-table
    ref="table"
    size="default"
    :columns="columns"
    :data="loadData"
  >
  </hy-table>
</template>

<script>
  import HyTable from '@/components'

  const columns = [
    {
        label: '规则编号',
        prop: 'no',
        width: 50
    },
    {
        title: '更新时间',
        prop: 'updatedAt',
        width: 50
    }
  ]

  export default {
    components: {
      HyTable
    },
    data() {
      return {
        columns,
        // 查询条件参数
        queryParam: {},
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          const requestParameters = Object.assign({}, parameter, queryParam)
          return this.$q7.api.get(requestParameters).then(res => {
            const result = res.page
              const data = {
                  pageSize: result.pageSize || 10,
                  page: result.page || 1,
                  totalCount: result.total || 0,
                  data: res.list || []
              }
              return data
          })
        }
      }
    },
    methods: {
       handleOk() {
            this.$refs.table.refresh()
       },
    }
  }
</script>

```


例子2
----

（简单的表格，最后一列是各种操作）

```vue
<template>
  <hy-table
    ref="table"
    size="default"
    :columns="columns"
    :data="loadData"
  >
    <template slot="action" slot-scope="scope">
        <el-button type="primary" plain size="small" @click="handleEdit(scope.row)">编辑</el-button>
    </template>
  </hy-table>
</template>

```vue pug
<template lang="pug">
  hy-table(ref="table" size="default" :columns="columns" :data="loadData")
    template(slot="action" slot-scope="scope")
        el-button(type="primary" plain size="small" @click="handleEdit(scope.row)") 编辑
</template>

<script>
  import HyTable from '@/components/table/'

  const columns = [
    {
        label: '规则编号',
        prop: 'no',
        width: 50
    },
    {
        title: '操作',
        prop: 'action',
        slot: true,
        width: 100
    }
  ]

  export default {
    components: {
      HyTable
    },
    data() {
      return {
        columns,
        // 查询条件参数
        queryParam: {},
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          const requestParameters = Object.assign({}, parameter, queryParam)
          return this.$q7.api.get(requestParameters).then(res => {
            const result = res.page
              const data = {
                  pageSize: result.pageSize || 10,
                  page: result.page || 1,
                  totalCount: result.total || 0,
                  data: res.list || []
              }
              return data
          })
        }
      }
    },
    methods: {
      handleEdit(row) {
        // axios 发送数据到后端 修改数据成功后
        // 调用 refresh() 重新加载列表数据
        // 这里 setTimeout 模拟发起请求的网络延迟..
        setTimeout(() => {
          this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        }, 1500)

      }
    }
  }
</script>
```



内置方法
----

通过 `this.$refs.table` 调用

`this.$refs.table.refresh(true)` 刷新列表 (用户新增/修改数据后，重载列表数据)

> 注意：要调用 `refresh(bool)` 需要给表格组件设定 `ref` 值
>
> `refresh()` 方法可以传一个 `bool` 值，当有传值 或值为 `true` 时，则刷新时会强制刷新到第一页（常用户页面 搜索 按钮进行搜索时，结果从第一页开始分页）


内置属性
----
> 除去 `el-table` 自带属性外，还而外提供了一些额外属性属性  


| 属性           | 说明                                            | 类型              | 默认值 |
| -------------- | ----------------------------------------------- | ----------------- | ------ |
| showPagination | 显示分页选择器，可传 'auto' \| boolean          | [string, boolean] | 'auto' |
| data           | 加载数据方法 必须为 `Promise` 对象 **必须绑定** | Promise           | -      |


注意事项
----

> 你可能需要为了与后端提供的接口返回结果一致而去修改以下代码：
> (需要注意的是，这里的修改是全局性的，意味着整个项目所有使用该 table 组件都需要遵守这个返回结果定义的字段。)

修改 `@/components/Table/index`  第 154 行起

```javascript
result.then(r => {
          this.localPagination = this.showPagination && Object.assign({}, this.localPagination, {
            current: r.page, // 返回结果中的当前分页数
            total: r.totalCount, // 返回结果中的总记录数
            showSizeChanger: this.showSizeChanger,
            pageSize: (pagination && pagination.pageSize) || this.localPagination.pageSize
          }) || false
          // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
          if (r.data.length === 0 && this.showPagination && this.localPagination.current > 1) {
            this.localPagination.current--
            this.loadData()
            return
          }

          // 这里用于判断接口是否有返回 r.totalCount 且 this.showPagination = true 且 pageNo 和 pageSize 存在 且 totalCount 小于等于 pageNo * pageSize 的大小
          // 当情况满足时，表示数据不满足分页大小，关闭 table 分页功能
          try {
            if ((['auto', true].includes(this.showPagination) && r.totalCount <= (r.pageNo * this.localPagination.pageSize))) {
              this.localPagination.hideOnSinglePage = true
            }
          } catch (e) {
            this.localPagination = false
          }
          console.log('loadData -> this.localPagination', this.localPagination)
          this.localDataSource = r.data // 返回结果中的数组数据
          this.localLoading = false
        })
```