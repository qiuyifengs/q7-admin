/* eslint-disable no-undef */
/* <template lang="pug">
div.table-wrapper
    Table.w-full(v-bind="$attrs" 
        v-on="$listeners"  
        v-loading="localLoading" 
        :data="localDataSource" 
        border 
        :stripe="true" 
        :header-cell-style="{ background: '#fafafa', color: 'rgba(0, 0, 0, 0.85)' }")
        TableColumn(v-for="column in columns" 
            align="center" 
            :key="column.prop" 
            :fixed="column.fixed" 
            :prop="column.prop" 
            :label="column.label" 
            :min-width="column.width")
            template(slot-scope="scope")
                slot(v-if="column.slot" :name="column.prop" :row='scope.row')
                span(v-else) {{ scope.row[column.prop] }}

    Pagination.text-right.py-4(background 
        layout="total, sizes, prev, pager, next, jumper" 
        v-if='localPagination.total >= 10'
        :current-page.sync="localPagination.current" 
        :page-size.sync="localPagination.pageSize" 
        :total="localPagination.total"
        :page-sizes="[10, 20, 30, 40]"
        @size-change="handleSizeChange"
        @current-change="onChange")
</template> */

// const vendorColumns = [
//     {
//       prop: 'id',
//       label: '商户ID',
//       minWidth: 35
//     },
//     {
//       prop: 'name',
//       label: '商户名称',
//       minWidth: 80,
//       render: h => ({row}) => <div class="q7-multi-ellipsis--l2">{row.name}</div>
//     },
//     {
//       prop: 'appZipUrl',
//       label: '下载zip包',
//       minWidth: 80,
//       // render: h => ({row, column}) => row.appZipUrl ? <el-button size="mini" plain onClick = {() => { 
//       //   console.log(column)
//       //   self.handleDownloadClient(row) 
//       // }}>下载客户端</el-button> : ''
//     },
//     // {
//     //   prop: 'ca',
//     //   label: 'CA证书',
//     //   minWidth: 50,
//     //   render: h => ({row}) => row.ca ? <el-popover placement="right-start" trigger="hover">
//     //     <el-link class="flex items-center justify-end" type="primary" underline= { false }></el-link>
//     //     <p class="pt-4" style="max-width: 800px">{ row.ca}</p>
//     //     <el-button size="mini" plain slot="reference">查看</el-button>
//     //   </el-popover> : ''
//     // },
//     {
//       prop: 'content',
//       label: '备注',
//       minWidth: 100
//     },
//     {
//       prop: 'isEnabled',
//       label: '状态',
//       minWidth: 50
//     },
//     {
//       prop: 'createdTime',
//       label: '添加日期',
//     },
//     {
//       prop: 'action',
//       label: '操作',
//       fixed: 'right',
//       minWidth: 200
//     }
//   ]

// const ColumnRender = {
//     // functional: true,
//     name: 'hy-column',
//     props: {
//       column: Object
//     },
//     render: (h, ctx) => {
//         console.log(h)
//         const column = ctx.props.column
//         let scopedSlots
//         if ('render' in column) {
//             const slot = column.render(h)
//             scopedSlots = { default: ({ row }) => slot({ row, column })}
//         }

//         return <el-table-column { ...{ props: { ...column }, scopedSlots: { ...scopedSlots } } }>
//             </el-table-column>
//     }
// }

import { Table } from 'element-ui'

export default {
    name: 'q7-table2',
    props: Object.assign({}, Table.props, {
        data: {
            type: Function,
            required: true
        },
        columns: {
            type: Array,
            default: () => [],
            required: false
        },
        pageNum: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 10
        },
        highlightCurrentRow: {
            type: Boolean,
            required: false,
            default: true
        },
        border: {
            type: Boolean,
            required: false,
            default: false
        },
        size: {
            type: String,
            default: 'default'
        },
        showPagination: {
            type: String | Boolean,
            default: 'auto'
        },
        pageURI: {
            type: Boolean,
            default: false
        },
        headerCellStyle: { 
            type: Object,
            default: () => {
                return { background: '#fafafa', color: 'rgba(0, 0, 0, 0.85)' }
            }
        }
    }),
    data() {
        return {
            needTotalList: [],
            localLoading: false,
            localDataSource: [],
            localPagination: Object.assign({}, this.pagination)
        }
    },
    watch: {
        'localPagination.current' (val) {
            this.pageURI && this.$router.push({
                ...this.$route,
                name: this.$route.name,
                params: Object.assign({}, this.$route.params, {
                    page: val
                })
            })
            // change pagination, reset total data
            this.needTotalList = this.initTotalList(this.columns)
        },
        pageNum (val) {
            Object.assign(this.localPagination, {
                current: val
            })
        },
        pageSize (val) {
            Object.assign(this.localPagination, {
                pageSize: val
            })
        },
    },
    created () {
        const { page } = this.$route.params
        const localPageNum = this.pageURI && (page && parseInt(page)) || this.pageNum
        this.localPagination = ['auto', true].includes(this.showPagination) && Object.assign({}, this.localPagination, {
            current: localPageNum,
            pageSize: this.pageSize,
            showSizeChanger: this.showSizeChanger
        }) || false
        this.needTotalList = this.initTotalList(this.columns)
        this.loadData()
    },
    methods: {
        handleClick (row, fnName) {
            this.$emit(`${fnName}`, row)
        },
        onChange(val) {
            this.loadData({
                current: val,
                pageSize: this.pageSize
            })
        },
        handleSizeChange(val) {
            this.loadData({
                current: this.localPagination.current,
                pageSize: val
            })
        },
        /**
         * 表格重新加载方法
         * 如果参数为 true, 则强制刷新到第一页
         * @param Boolean bool
         */
        refresh (bool = false) {
            bool && (this.localPagination = Object.assign({}, {
                current: 1, pageSize: this.pageSize
            }))
            this.loadData()
        },
        /**
         * 加载数据方法
         * @param {Object} pagination 分页选项器
         */
        loadData (pagination) {
            this.localLoading = true
            const parameter = Object.assign({
                page: (pagination && pagination.current) ||
                this.showPagination && this.localPagination.current || this.pageNum,
                pageSize: (pagination && pagination.pageSize) ||
                this.showPagination && this.localPagination.pageSize || this.pageSize
            })
            const result = this.data(parameter)
            
            // 对接自己的通用数据接口需要修改下方代码中的 r.page, r.totalCount, r.data
            if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
                result.then(r => {
                    this.localPagination = this.showPagination && Object.assign({}, this.localPagination, {
                        current: r.page, // 返回结果中的当前分页数
                        total: r.totalCount, // 返回结果中的总记录数
                        showSizeChanger: this.showSizeChanger,
                        pageSize: (pagination && pagination.pageSize) || this.localPagination.pageSize
                    }) || false
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
                        if ((['auto', true].includes(this.showPagination) && r.totalCount <= (r.page * this.localPagination.pageSize))) {
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
        initTotalList (columns) {
            const totalList = []
            columns && columns instanceof Array && columns.forEach(column => {
                if (column.needTotal) {
                    totalList.push({
                        ...column,
                        total: 0
                    })
                }
            })
            return totalList
        },
        recursion(columns) {
            return columns.map(column => {
                return this.createElTableColumn(column)
            })
        },
        createElTableColumn(column) {
            // return <ColumnRender column = { column }></ColumnRender>
            // const self = this
            // console.log(this)
            // const { $slots } = self
            // console.log($slots.default)
            // return <el-table-column { ...{ props: { ...column }} }>
            //     {this.$slots.default}
            // </el-table-column>
            // let scopedSlots
            // if ('render' in column) {
            //     const slot = column.render(h)
            //     scopedSlots = { default: ({ row }) => slot({ row, column })}
            // }

            const scopedSlots = column.render ? {
                scopedSlots: {
                  default: scope => column.render(scope)
                }
            } : null
            console.log(scopedSlots)

            return <el-table-column { ...{ props: { ...column }, scopedSlots } }>
                    {/* {<template slot={ column.prop } slot-scope={scopedSlots}></template>} */}
                </el-table-column>
        }
    },
    render () {
        // const propsDefault = {
        //     stripe: true,
        //     height: '100%',
        //     rowKey: 'id',
        // }

        const props = Object.assign(this.$props, { data: this.localDataSource}, this.$attrs)
        const localKeys = Object.keys(this.$data)

        Object.keys(Table.props).forEach(k => {
            const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(1)}`
            if (localKeys.includes(localKey)) {
                props[k] = this[localKey]
                return props[k]
            }

            this[k] && (props[k] = this[k])
                return props[k]
        })
        
        const localPagination = this.$data.localPagination
        // return h('el-table', {
        //     ref: 'table',
        //     props: Object.assign(propsDefault, this.$attrs),
        //     on: this.$listeners
        //   }, this.columns.map(column => {
        //     //   console.log(column)
        //     const scopedSlots = column.render ? {
        //       scopedSlots: {
        //         default: scope => column.render(scope)
        //       }
        //     } : null
        //     console.log(scopedSlots)
        //     return h('el-table-column', {
        //       props: column,
        //       ...scopedSlots || {}
        //     })
        //   })
        // )
        return (
            <div class="hy-design-pro-table">
                <el-table { ...{ props } }>
                    { this.recursion(props.columns) }
                </el-table>
                <el-pagination { ...{ props: { ...localPagination }} }></el-pagination>
            </div>
        )
    },
}