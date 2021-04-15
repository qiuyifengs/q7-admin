（基础使用）

```vue

<template>
  <q7-menu :options="menuData"/>
</template>

<script>
  import { mapGetters } from 'vuex'
  import HyMenu from '@/components/menu'

  export default {
    components: {
      HyMenu
    },
    computed: {
        ...mapGetters('setting', ['menuData']),
    }
  }
</script>

```

内置属性
----
| 属性           | 说明                                            | 类型              | 默认值 |
| -------------- | ----------------------------------------------- | ----------------- | ------ |
| options | 路由数组 | Array | []
| mode | 模式 | String 可选 'horizontal' \| vertical  | vertical |
| asideCollapse | 是否水平折叠收起菜单 | Boolean | false |
| asideTransition | 是否开启折叠动画 | Boolean | false |
| layout | 布局模式 | String | side |



