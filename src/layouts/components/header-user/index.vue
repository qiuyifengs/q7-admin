<template>
  <div>
    <el-dropdown size="small" trigger="click">
      <span class="ml-2" style="font-size: 18px" :class="[layout === 'side' ? 'text-black' : 'text-white']">
        {{ name ? `${timeFix} ${name}` : '未登录' }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <!-- <el-dropdown-item icon="el-icon-lock" @click.native="$refs.updatePasswordForm.open()">修改密码</el-dropdown-item> -->
        <el-dropdown-item icon="el-icon-switch-button" @click.native="logOff">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <UpdatePwdForm ref="updatePasswordForm" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import utils from '@/utils'
import UpdatePwdForm from './business/UpdatePwdForm'

export default {
  name: 'update-password',
  components: {
    UpdatePwdForm,
  },
  props: {
    layout: {
      type: String,
      required: true,
      default: 'mix',
    },
  },
  data() {
    return {
      timeFix: utils.timeFix(),
    }
  },
  computed: {
    ...mapGetters('q7admin/user', ['name']),
  },
  methods: {
    ...mapActions('q7admin/user', ['logout']),
    logOff() {
      this.logout({
        focus: true,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.header-avatar {
  display: inline-flex;
  .avatar,
  .name {
    align-self: center;
  }
  .avatar {
    margin-right: 8px;
  }
  .name {
    font-weight: 500;
    font-size: 18px;
  }
}
.avatar-menu {
  width: 150px;
}
</style>
