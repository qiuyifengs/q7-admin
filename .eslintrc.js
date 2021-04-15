module.exports = {
  root: true,

  env: {
    node: true,
    es6: true
  },

  globals: {
    process: true,
    require: true,
    module: true,
    Vue: true
  },

  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],

  /* 
   下面这些rules是用来设置从插件来的规范代码的规则，使用必须去掉前缀eslint-plugin-
    主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
    "off" -> 0 关闭规则
    "warn" -> 1 开启警告规则
    "error" -> 2 开启错误规则
  */
  rules: {
  },
  
  parserOptions: {
    parser: 'babel-eslint'
  }
};
