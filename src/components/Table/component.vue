<!--
 * 基础的使用方式与 API 与 官方版(ElTable) 本一致，在其基础上，封装了加载数据的方法。
 * 无需在你是用表格的页面进行分页逻辑处理，仅需向 Table 组件传递绑定 :data="Promise" 对象即可 v-bind="$attrs" v-on="$listeners"
-->
<template lang="pug">
.table-wrapper
  el-table.w-full(
    v-bind='$attrs',
    v-on='$listeners',
    v-loading='localLoading',
    :data='localDataSource',
    highlight-current-row,
    :header-cell-style='{ background: "#fafafa", color: "rgba(0, 0, 0, 0.85)" }'
  )
    el-table-column(
      v-for='(item, index) in columns',
      align='left',
      :key='index',
      :label='item.label',
      :prop='item.prop',
      :fixed='item.fixed',
      :min-width='item.width'
    )
      template(slot-scope='scope')
        render-component(v-if='item.render', :render-function='item.render', :scope='scope.row')
        slot(v-else-if='item.slot', :name='item.prop', :row='scope.row')
        template(v-else) {{ scope.row[item.prop] }}

  el-pagination.text-center.py-4(
    background,
    layout='total, sizes, prev, pager, next, jumper',
    v-if='localPagination.total >= 10',
    :current-page.sync='localPagination.current',
    :page-size.sync='localPagination.pageSize',
    :total='localPagination.total',
    :page-sizes='[10, 20, 30, 40]',
    @size-change='handleSizeChange',
    @current-change='onChange'
  )
</template>

<script>
import { Table } from 'element-ui'
import renderComponent from './renderComponent'

export default {
  name: 'hy-table',
  components: { Table, renderComponent },
  props: Object.assign({}, Table.props, {
    data: {
      type: Function,
      required: true,
    },
    columns: {
      required: true,
      type: Array,
      default: () => {
        return []
      },
    },
    pageNum: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    showPagination: {
      type: String | Boolean,
      default: 'auto',
    },
    pageURI: {
      type: Boolean,
      default: false,
    },
  }),
  data() {
    return {
      needTotalList: [],
      localLoading: false,
      localDataSource: [],
      localPagination: Object.assign({}, this.pagination),
    }
  },
  watch: {
    'localPagination.current'(val) {
      this.pageURI &&
        this.$router.push({
          ...this.$route,
          name: this.$route.name,
          params: Object.assign({}, this.$route.params, {
            page: val,
          }),
        })
      // change pagination, reset total data
      this.needTotalList = this.initTotalList(this.columns)
    },
    pageNum(val) {
      Object.assign(this.localPagination, {
        current: val,
      })
    },
    pageSize(val) {
      Object.assign(this.localPagination, {
        pageSize: val,
      })
    },
  },
  created() {
    const { page } = this.$route.params
    const localPageNum = (this.pageURI && page && parseInt(page)) || this.pageNum
    this.localPagination =
      (['auto', true].includes(this.showPagination) &&
        Object.assign({}, this.localPagination, {
          current: localPageNum,
          pageSize: this.pageSize,
          showSizeChanger: this.showSizeChanger,
        })) ||
      false
    this.needTotalList = this.initTotalList(this.columns)
    this.loadData()
  },
  methods: {
    handleClick(row, fnName) {
      this.$emit(`${fnName}`, row)
    },
    onChange(val) {
      this.loadData({
        current: val,
        pageSize: this.pageSize,
      })
    },
    handleSizeChange(val) {
      this.loadData({
        current: this.localPagination.current,
        pageSize: val,
      })
    },
    /**
     * 表格重新加载方法
     * 如果参数为 true, 则强制刷新到第一页
     * @param Boolean bool
     */
    refresh(bool = false) {
      bool &&
        (this.localPagination = Object.assign(
          {},
          {
            current: 1,
            pageSize: this.pageSize,
          }
        ))
      this.loadData()
    },
    /**
     * 加载数据方法
     * @param {Object} pagination 分页选项器
     */
    loadData(pagination) {
      this.localLoading = true
      const parameter = Object.assign({
        page:
          (pagination && pagination.current) || (this.showPagination && this.localPagination.current) || this.pageNum,
        pageSize:
          (pagination && pagination.pageSize) ||
          (this.showPagination && this.localPagination.pageSize) ||
          this.pageSize,
      })
      const result = this.data(parameter)

      // 对接自己的通用数据接口需要修改下方代码中的 r.page, r.totalCount, r.data
      if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
        result.then((r) => {
          this.localPagination =
            (this.showPagination &&
              Object.assign({}, this.localPagination, {
                current: r.page, // 返回结果中的当前分页数
                total: r.totalCount, // 返回结果中的总记录数
                showSizeChanger: this.showSizeChanger,
                pageSize: (pagination && pagination.pageSize) || this.localPagination.pageSize,
              })) ||
            false
          console.log(r)
          // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
          if (r.data.length === 0 && this.showPagination && this.localPagination.current > 1) {
            this.localPagination.current--
            this.loadData()
            return
          }

          // 这里用于判断接口是否有返回 r.totalCount 且 this.showPagination = true 且 page 和 pageSize 存在 且 totalCount 小于等于 page * pageSize 的大小
          // 当情况满足时，表示数据不满足分页大小，关闭 table 分页功能
          try {
            if (
              ['auto', true].includes(this.showPagination) &&
              r.totalCount <= r.page * this.localPagination.pageSize
            ) {
              this.localPagination.hideOnSinglePage = true
            }
          } catch (e) {
            this.localPagination = false
          }
          this.localDataSource = r.data // 返回结果中的数组数据
          this.localLoading = false
        })
      }
    },
    initTotalList(columns) {
      const totalList = []
      columns &&
        columns instanceof Array &&
        columns.forEach((column) => {
          if (column.needTotal) {
            totalList.push({
              ...column,
              total: 0,
            })
          }
        })
      return totalList
    },
  },
}
</script>