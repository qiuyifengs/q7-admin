<template>
<el-dialog
    width="400px"
    title="修改密码"
    :visible.sync="visible"
    :append-to-body="true">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="旧密码" prop="oldPassword">
          <el-input show-password v-model.trim="form.oldPassword" placeholder="请输入旧密码" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
          <el-input show-password v-model.trim="form.newPassword" placeholder="请输入新密码" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmNewPassword">
          <el-input show-password v-model.trim="form.confirmNewPassword" placeholder="请再次输入新密码" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">提 交</el-button>
    </span>
</el-dialog>
</template>

<script>
export default {
    name: 'updatePasswordForm',
    data () {
        return {
            visible: false,
            form: {},
            rules: {
                oldPassword: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' },
                    { min: 6, max: 32, message: '密码为6～32个字符', trigger: 'blur' },
                    { validator: this.validPassword, trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { validator: this.handlePassword, trigger: 'blur' },
                    { validator: this.validPassword, trigger: 'blur' }
                ],
                confirmNewPassword: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    { validator: this.handlePasswordCheck, trigger: 'blur' },
                    { validator: this.validPassword, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        open () {
            this.visible = true
            this.$nextTick(() => this.clearValidate())
        },

        clearValidate () {
            this.$nextTick(() => {
                this.form = {}
            })
        },

        handleSubmit() {
            this.updatePassword()
        },

        validPassword(rule, value, callback){
            const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,32}$/
            if(reg.test(value.trim())){
                callback()
            } else {
                callback(new Error('请输入6-32位数字，特殊字符，英文字母，至少包含两种'))
            }
        },

        handlePassword (rule, value, callback) {
            if (value === undefined) {
                callback(new Error('请输入密码'))
            } else {
                if (this.form.newPassword !== '') {
                    this.$refs.form.validateField('confirmNewPassword')
                }
                callback()
            }
        },

        handlePasswordCheck (rule, value, callback) {
            if (value === undefined || value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value.trim() !== (this.form.newPassword).trim()) {
                callback(new Error('两次密码不一致'))
            } else {
                callback()
            }
        },

        updatePassword () {
            const { form } = this
            const requestParams = {
                newPassword: form.newPassword,
                oldPassword: form.oldPassword
            }
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (form.newPassword === form.oldPassword) {
                        this.$message.warning('旧密码与新密码不能一样')
                        return false
                    }
                    this.$q7.api.SYS_USER_PASSWORD(requestParams).then(res => {
                        this.$message.success('修改成功')
                        console.log(res)
                        this.visible = false
                    }).catch(error => {
                        console.log(error)
                        this.$message.error(error.data.message)
                    })
                } else {
                    this.$message.error('表单校验失败，请检查')
                    return false
                }
            })
        },

        handleCancel() {
            this.visible = false
            this.clearValidate()
        },
    }
}
</script>
<style lang="less">
.eysCon {
    position: relative;
    top: 4px;
    > img {
        width: 20px !important;
        height: 20px;
        line-height: 20px;
    }
}
</style>