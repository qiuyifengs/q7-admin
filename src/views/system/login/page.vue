<template lang="pug">
.w-full.h-full.login-bg.bg-no-repeat.bg-center.bg-cover
  .h-full.m-auto.flex.justify-center.items-center
    figure(style="width: 567px")
      img(src="~@img/bgbar.png")

    .ml-12.bg-white.text-center.rounded(style="width: 350px; box-shadow: 0 26px 49px 0 rgba(182,208,247,.34); padding: 32px")
      h1.text-black.text-sm.mb-12.pt-2 欢迎登录运营平台
      el-form(ref="form" :model="form" :rules="rules" size="medium")
        el-form-item.w-full(prop="account")
          el-input(v-model="form.account" size="default" placeholder="请输入登录账号" prefix-icon="el-icon-user")

        el-form-item.w-full(prop="password")
          el-input(show-password size="default" v-model="form.password" placeholder="请输入登录密码" prefix-icon="el-icon-lock")

        el-form-item.mx-4
          el-button.w-full.text-sm.mt-8.el-button--violet(type="primary" size="default" @click="submit") 登录
</template>

<script>
import { mapActions } from 'vuex'
import { Message } from 'element-ui'

export default {
  name: 'login',
  data () {
    return {
      form: {},
      rules: {
        account: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          {
            min: 5,
            max: 20,
            message: '登录账号为5～20个英文或数字',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 5, max: 20, message: '登录密码为5～20个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    document.addEventListener('keyup', event => {
      if (event.keyCode === 13) {
        this.submit()
      }
    }, false)
  },
  methods: {
    ...mapActions('q7admin/user', [
      'login'
    ]),
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.login(this.form).then(() => {
            // 重定向对象不存在则返回顶层路径
            this.$router.replace(this.$route.query.redirect || '/')
          })
        } else {
          Message.closeAll()
          Message.error('表单校验失败，请检查')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login-bg {
  background-image: url('~@img/bg.png')
}

.el-button--violet {
  /* background-color: #5153fd; */
  border-color: transparent;
  background: -webkit-linear-gradient(left, #5153fdcf, #5153fd);
}
</style>
