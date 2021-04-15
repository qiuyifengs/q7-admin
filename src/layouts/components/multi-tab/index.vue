<template>
  <div class="hy-multiple-page-control-group justify-between items-center flex mx-4 mt-4">
    <div class="hy-multiple-page-control-content flex-1">
      <div class="hy-multiple-page-control-content-inner">
        <hy-context-menu :visible.sync="contextmenuFlag" :x="contentmenuX" :y="contentmenuY">
          <hy-context-menu-list :menulist="tagName === '/' ? contextmenuListIndex : contextmenuList" @rowClick="contextmenuClick" />
        </hy-context-menu>
        <el-tabs
          class="hy-multiple-page-control hy-multiple-page-sort"
          :value="current"
          type="card"
          :closable="true"
          @tab-click="handleClick"
          @tab-remove="handleTabRemove"
          @contextmenu.native="handleContextmenu"
        >
          <el-tab-pane v-for="page in opened" :key="page.fullPath" :label="page.meta.title || '未命名'" :name="page.fullPath" :closable="isTabClosable(page)" />
        </el-tabs>
      </div>
    </div>

    <div class="hy-multiple-page-control-btn flex-shrink-0 flex-grow-0">
      <el-dropdown size="small" type="primary" split-button @click="closeAll" @command="(command) => handleControlItemClick(command)">
        <span>清空</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="left" icon="el-icon-back">关闭左侧</el-dropdown-item>
          <el-dropdown-item command="right" icon="el-icon-right">关闭右侧</el-dropdown-item>
          <el-dropdown-item command="other" icon="el-icon-close"> 关闭其它</el-dropdown-item>
          <el-dropdown-item command="all" icon="el-icon-circle-close">全部关闭</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Sortable from 'sortablejs'
import HyContextMenu from '../context-menu'
import HyContextMenuList from '../context-menu/components/list'

export default {
  components: {
    HyContextMenu,
    HyContextMenuList,
  },
  name: 'hy-multi-tab',
  data() {
    return {
      contextmenuFlag: false,
      contentmenuX: 0,
      contentmenuY: 0,
      contextmenuListIndex: [{ icon: 'times-circle', title: '关闭全部', value: 'all' }],
      contextmenuList: [
        { icon: 'arrow-left', title: '关闭左侧', value: 'left' },
        { icon: 'arrow-right', title: '关闭右侧', value: 'right' },
        { icon: 'close', title: '关闭其它', value: 'other' },
        { icon: 'close-circle', title: '关闭全部', value: 'all' },
      ],
      tagName: '/index',
    }
  },
  computed: {
    ...mapState('q7admin/page', ['opened', 'current']),
  },
  methods: {
    ...mapActions('q7admin/page', ['close', 'closeLeft', 'closeRight', 'closeOther', 'closeAll', 'openedSort']),
    /**
     * @description 计算某个标签页是否可关闭
     * @param {Object} page 其中一个标签页
     */
    isTabClosable(page) {
      return page.name !== 'index'
    },
    /**
     * @description 右键菜单功能点击
     */
    handleContextmenu(event) {
      let target = event.target
      let flag = false
      if (target.className.indexOf('el-tabs__item') > -1) flag = true
      else if (target.parentNode.className.indexOf('el-tabs__item') > -1) {
        target = target.parentNode
        flag = true
      }
      if (flag) {
        event.preventDefault()
        event.stopPropagation()
        this.contentmenuX = event.clientX
        this.contentmenuY = event.clientY
        this.tagName = target.getAttribute('aria-controls').slice(5)
        this.contextmenuFlag = true
      }
    },
    /**
     * @description 右键菜单的 row-click 事件
     * @param {String} command 事件类型
     */
    contextmenuClick(command) {
      this.handleControlItemClick(command, this.tagName)
    },
    /**
     * @description 接收点击关闭控制上选项的事件
     * @param {String} command 事件类型
     * @param {String} tagName tab 名称
     */
    handleControlItemClick(command, tagName = null) {
      if (tagName) this.contextmenuFlag = false
      const params = { pageSelect: tagName }
      switch (command) {
        case 'refresh':
          this.$router.push({ name: 'refresh' })
          break
        case 'left':
          this.closeLeft(params)
          break
        case 'right':
          this.closeRight(params)
          break
        case 'other':
          this.closeOther(params)
          break
        case 'all':
          this.closeAll()
          break
        default:
          this.$message.error('无效的操作')
          break
      }
    },
    /**
     * @description 接收点击 tab 标签的事件
     * @param {object} tab 标签
     * @param {object} event 事件
     */
    handleClick(tab) {
      // 找到点击的页面在 tag 列表里是哪个
      const page = this.opened.find((page) => page.fullPath === tab.name)
      if (page) {
        const { name, params, query } = page
        this.$router.push({ name, params, query })
      }
    },
    /**
     * @description 点击 tab 上的删除按钮触发这里
     * @param {String} tagName tab 名称
     */
    handleTabRemove(tagName) {
      this.close({ tagName })
    },
  },
  mounted() {
    const el = document.querySelectorAll('.hy-multiple-page-sort .el-tabs__nav')[0]
    Sortable.create(el, {
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt
        this.openedSort({
          oldIndex,
          newIndex,
        })
      },
    })
  },
}
</script>

<style lang="less" scoped>
// 多页面控制器
.hy-multiple-page-control-group {
  .hy-multiple-page-control-content {
    overflow: auto;
    position: relative;
    .hy-multiple-page-control-content-inner {
      .hy-multiple-page-control {
        .el-tabs__header.is-top {
          margin: 0px;
        }
        .el-tabs__nav {
          overflow: hidden;
        }
      }
    }
  }
  .hy-multiple-page-control-btn {
    position: relative;
    bottom: -1px;
    .el-dropdown {
      .el-button-group {
        .el-button:first-child {
          border-bottom-left-radius: 0px;
        }
        .el-button:last-child {
          border-bottom-right-radius: 0px;
        }
      }
    }
  }
}
</style>