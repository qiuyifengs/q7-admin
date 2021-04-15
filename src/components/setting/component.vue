<template>
  <div class="side-setting">
    <!-- <setting-item title="导航设置">
      <img-checkbox-group @change="handleNavChange" :defaultValues="[layout]">
        <img-checkbox title="侧边导航" img="https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg" value="side" />
        <img-checkbox title="混合导航" img="https://gw.alipayobjects.com/zos/antfincdn/x8Ob%26B8cy8/LCkqqYNmvBEbokSDscrm.svg" value="mix" />
      </img-checkbox-group>
    </setting-item> -->

    <el-divider />
    <setting-item title="其他设置">
      <div class="flex justify-between items-center mb-6">
        <span>色弱模式</span>
        <el-switch v-model="weekMode" slot="actions" size="small" @change="setWeekMode" />
      </div>
      <div class="flex justify-between items-center mb-6">
        <span>多页签模式</span>
        <el-switch v-model="multiPage" slot="actions" size="small" @change="setMultiPage" />
      </div>
    </setting-item>

    <el-divider />
    <setting-item title="页面切换动画">
      <div class="flex justify-between items-center mb-6">
        <span>禁用动画</span>
        <el-switch v-model="animate.disabled" slot="actions" size="small" @change="(val) => setAnimate({ ...animate, disabled: val })" />
      </div>
      <div class="flex justify-between items-center mb-6">
        <span>动画效果</span>
        <el-select :value="animate.name" class="select-item" @change="(val) => setAnimate({ ...animate, name: val })" size="small">
          <el-option :key="index" :value="item.name" v-for="(item, index) in animates">{{ item.alias }}</el-option>
        </el-select>
      </div>
      <div class="flex justify-between items-center mb-6">
        <span>动画方向</span>
        <el-select :value="animate.direction" class="select-item" :getPopupContainer="getPopupContainer" @change="(val) => setAnimate({ ...animate, direction: val })" size="small">
          <el-option :key="index" :value="item" v-for="(item, index) in directions">{{ item }}</el-option>
        </el-select>
      </div>
    </setting-item>
  </div>
</template>

<script>
import SettingItem from './item'
// import ImgCheckbox from '@/components/q7-checkbox/'
import { mapState, mapMutations, mapActions } from 'vuex'
// const ImgCheckboxGroup = ImgCheckbox.Group

export default {
  name: 'hy-setting',
  components: { SettingItem },
  computed: {
    directions() {
      return this.animates.find((item) => item.name == this.animate.name).directions
    },
    ...mapState('q7admin/setting', ['layout', 'animate', 'animates', 'palettes', 'multiPage', 'weekMode', 'fixedHeader', 'fixedSideBar', 'hideSetting', 'pageWidth']),
  },
  watch: {
    'animate.name': function (val) {
      this.setAnimate({ name: val, direction: this.directions[0] })
    },
  },
  getPopupContainer() {
    return this.$el.parentNode
  },
  methods: {
    handleNavChange(val) {
      if (val[0] === 'mix') {
        this.setTheme({ ...this.theme, mode: 'light' })
      }
      this.setLayout(val[0])
    },
    ...mapMutations('q7admin/setting', ['setTheme', 'setLayout', 'setMultiPage', 'setWeekMode', 'setFixedSideBar', 'setFixedHeader', 'setAnimate', 'setHideSetting']),
  },
}
</script>

<style lang="less" scoped>
.side-setting {
  min-height: 100%;
  background-color: white;
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  position: relative;
  .flex {
    display: flex;
  }
  .select-item {
    width: 80px;
  }
}
</style>
