import store from '@/store'

export const tableMixin = {
    data() {
        return {
            queryParam: {},
            vendorArr: []
        }
    },
    methods: {
      // 判断是否为超级管理员
        isSuperAdmin() {
          const user = store.state.user.info
          let flag = !user.isSuperAdmin && user.isVendorAdmin
          return !flag
        },
        handleSubmit() {
            this.$refs.table.refresh()
        },
        handleReset() {
            this.queryParam = {}
            this.$refs.table.refresh()
        },
        // 清除对象中值为空的属性
        filterParams(obj) {
            let _newPar = {}
            for (var key in obj) {
                if ((obj[key] === 0 || obj[key] === false || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
                    _newPar[key] = obj[key];
                }
            }
            return _newPar
        },
        getVendorList() {
            const requestParams = {
                page: 1,
                pageSize: 999,
                isDeleted: false
            }
            this.$q7.api.vendor_all(requestParams).then(res => {
                this.vendorArr = res.list.map(item => {
                    return {
                        value: item.id,
                        label: item.name
                    }
                })
            })
        }
    }
}
