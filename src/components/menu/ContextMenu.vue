<template>
  <div>
    <el-menu v-show="visible" :default-active="selectedKeys" :style="style" @select="handleClick">
      <el-menu-item v-for="item in itemList" :key="item.key" :index="item.key">
        <i class="el-icon-document"></i>
        <span slot="title">{{ item.text }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'ContextMenu',
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false,
    },
    itemList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      left: 0,
      top: 0,
      target: null,
      selectedKeys: '',
    }
  },
  computed: {
    style() {
      return {
        left: this.left + 'px',
        top: this.top + 'px',
      }
    },
  },
  created() {
    const clickHandler = () => this.closeMenu
    const contentMenuHandler = (e) => this.setPosition(e)
    window.addEventListener('click', clickHandler)
    window.addEventListener('contextmenu', contentMenuHandler)
    this.$emit('hook:beforeDestroy', () => {
      window.removeEventListener('click', clickHandler)
      window.removeEventListener('contextmenu', contentMenuHandler)
    })
  },
  methods: {
    closeMenu() {
      this.$emit('update:visible', false)
    },
    setPosition(e) {
      this.left = e.clientX
      this.top = e.clientY
      this.target = e.targt
    },
    handleClick({ key }) {
      this.$emit('select', key, this.target)
      this.closeMenu()
    },
  },
}
</script>