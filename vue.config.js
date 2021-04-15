const path = require('path')
// 拼接路径
const resolve = dir => path.join(__dirname, dir)

const getDateTimes = (function() {
  var date = new Date()
  var Y = date.getFullYear() + ''
  var M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + ''
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ''
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ''
  var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  return Y + M + D + h + m
})()

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const cdnDependencies = require('./dependencies-cdn')
const manifestJSON = require('./public/manifest.json')
const isProd = process.env.NODE_ENV === 'production'
const { chain, set, each } = require('lodash')
const pages = undefined

// 设置不参与构建的库
let externals = {}
cdnDependencies.forEach(pkg => { externals[pkg.name] = pkg.library })

// 引入文件的 cdn 链接
const cdn = {
  css: cdnDependencies.map(e => e.css).filter(e => e),
  js: cdnDependencies.map(e => e.js).filter(e => e)
}

const assetsPath = 'static'

// posix兼容方式处理路径
const posixJoin = _path => path.posix.join(assetsPath, _path)
const NODE_ENV = process.env.NODE_ENV

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH || '/',
  assetsDir: assetsPath,
  lintOnSave: true,
  pwa: {
    name: manifestJSON.name,
    themeColor: '#FAFAFA',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'public/service-worker.js'
    }
  },
  pages,
  productionSourceMap: NODE_ENV !== 'production',
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  parallel: require('os').cpus().length > 1,
  devServer: {
    open: true,
    // host: '0.0.0.0',
    // https: false,
    // hotOnly: true,
    // proxy: {
    //   '/apis': {
    //     target: process.env.VUE_APP_BASE_API_URL,
    //     pathRewrite: {
    //       '^/apis': '/'
    //     },
    //     ws: true,
    //     changeOrigin: true
    //   }
    // }
  },
  configureWebpack: config => {
    config.resolve.extensions = ['.js', '.json', '.vue', '.css', '.scss']

    const configNew = {}
    if (process.env.NODE_ENV === 'production') {
      configNew.externals = externals
      configNew.plugins = [
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false
        })
      ]
    }
    return configNew
  },
  chainWebpack: config => {
    const htmlPluginNames = chain(pages).keys().map(page => 'html-' + page).value()
    const targetHtmlPluginNames = htmlPluginNames.length ? htmlPluginNames : ['html']
    each(targetHtmlPluginNames, name => {
      config.plugin(name).tap(options => {
        set(options, '[0].cdn', process.env.NODE_ENV === 'production' ? cdn : [])
        return options
      })
    })

    config.resolve
      .symlinks(true)

    // 重新设置 alias
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@api', resolve('src/api'))
      .set('@css', resolve('src/style'))
      .set('@img', resolve('src/assets/images'))
      .set('@js', resolve('src/assets/js'))
      .end()

    config.module.rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()

    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins
      .delete('prefetch')
      .delete('preload')
    
    if (isProd) {
      // 压缩代码
      config.optimization.minimize(true)
      // 分割代码
      config.optimization.splitChunks({
        chunks: 'all', //在做代码分割时，只对异步代码生效，写成all的话，同步异步代码都会分割
        minSize: 30000, //引入的包大于30KB才做代码分割
        minChunks: 1, //当一个包至少被用了多少次的时候才进行代码分割
        maxAsyncRequests: 5, //同时加载的模块数最多是5个
        maxInitialRequests: 3, //入口文件做代码分割最多能分成3个js文件
        automaticNameDelimiter: '~', //文件生成时的连接符
        name: true, //让cacheGroups里设置的名字有效
        cacheGroups: {
          vue: {
            name: 'vue',
            minChunks: 1,
            test: /[\\/]node_modules[\\/]_?vue(.*)/,
            reuseExistingChunk: true, //如果一个模块已经被打包过了,那么再打包时就忽略这个上模块
            enforce: true,
            priority: 100 //值越大,优先级越高.模块先打包到优先级高的组里
          },
          vuePlugins: {
            name: 'vue-plugins',
            test: /[\\/]node_modules[\\/]_?(vue-router|vuex|axios)(.*)/,
            chunks: 'initial',
            reuseExistingChunk: true,
            enforce: true,
            priority: 90
          },
          element: {
            name: 'vue-element-ui',
            minChunks: 1,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
            reuseExistingChunk: true,
            enforce: true,
            priority: 10
          },
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            enforce: true,
            priority: -10
          }
        }
      })
      // 生产环境js增加版本号
      config.when(NODE_ENV, config => {
        config.output
          .set('filename', posixJoin(`js/[name].${getDateTimes}.js`))
          .set('chunkFilename', posixJoin(`js/[name].${getDateTimes}.js`))
      })
    }
    
    // svg
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .include
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'hy-[name]'
      })
      .end()
    // image exclude
    const imagesRule = config.module.rule('images')
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
  },
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: {
      filename: posixJoin('css/[name].' + getDateTimes + '.css'),
      chunkFilename: posixJoin('css/[name].' + getDateTimes + '.css')
    },
    // 是否开启 CSS source map？
    sourceMap: false,
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    requireModuleExtension: true,
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
        // loaderOptions: {
        //   less: {
        //     modifyVars: {
        //       // less vars，customize ant design theme
        //       'primary-color': '#FA541C',
        //       'link-color': '#FA541C',
        //       'border-radius-base': '2px'
        //     },
        //     javascriptEnabled: true
        //   },
        // }
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
        plugins: [require('tailwindcss'), require('autoprefixer')]
      }
    }
  },
  // transpileDependencies: ['vuex-persist'],
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/style/mixin.less'),
        path.resolve(__dirname, './src/style/variable.less')
      ]
    }
  }
}
