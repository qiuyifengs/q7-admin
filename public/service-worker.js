workbox.setConfig({
    debug: true
  })

  workbox.core.setCacheNameDetails({
    prefix: 'TMADH',
    suffix: 'v1.0.0'
  })
 
 // 注册成功后要立即缓存的资源列表
  workbox.precaching.precacheAndRoute(self.__precacheManifest)

  // Skip over the SW waiting lifecycle stage
  workbox.skipWaiting() // 强制等待中的 Service Worker 被激活
  // Start controlling any existing clients as soon as it activates
  workbox.clientsClaim() // Service Worker 被激活后使其立即获得页面控制权

// 对我们请求的数据进行缓存，这里采用 networkFirst 策略
// workbox.routing.registerRoute(
//   new RegExp('.\*experiments?.\*'),
//   workbox.strategies.networkFirst()
// );
// workbox.routing.registerRoute(
//   new RegExp('.\*experiments/\\d'),
//   workbox.strategies.networkFirst()
// )
// workbox.routing.registerRoute(
//   new RegExp('.\*experiment\_types.\*'),
//   workbox.strategies.networkFirst()
// )

/*
  registerRoute 路由请求缓存
  第一个参数可以是正则、完整路径字符串、或者是返回布尔值的函数
  第二个参数 workbox.strategies.staleWhileRevalidate () 是一个路由缓存策略，用来确定资源缓存方式
  staleWhileRevalidate 请求的路由有对应的 cache 缓存就直接返回，同时在后台再次发起请求并更新 Cache
  networkFirst 请求后，首先尝试拿到网路请求的返回结果，请求到就直接返回并且更新 cache，否则返回缓存中的内容, 缓存优先同时后台更新
  cacheFirst 请求后，直接从 Cache 中取得结果，没有的话在发起网络请求
  networkOnly 强制使用网络请求
  cacheOnly 强制使用 Cache 资源
 */
  workbox.routing.registerRoute(/.*\.css/, workbox.strategies.staleWhileRevalidate({
    cacheName: 'css-cache',
    plugins: [
        new workbox.expiration.Plugin({
        maxEntries: 20
        })
    ]
      })
  )

  workbox.routing.registerRoute(/.*\.js/, workbox.strategies.staleWhileRevalidate({
          cacheName: 'js-cache'
      })
  );

  workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'images',
          plugins: [
              new workbox.expiration.Plugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60
              })
          ]
      })
  )

  workbox.routing.registerRoute(
      /^https:\/\/cdn\.my\.com\/.*\.(jpe?g|png|gif|svg)/,
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'cdn-images',
          plugins: [
              new workbox.expiration.Plugin({
                  maxEntries: 60,
                  maxAgeSeconds: 5 * 24 * 60 * 60
              })
          ],
          fetchOptions: {
              credentials: 'include'
          }
      })
  )

  // workbox.routing.registerRoute(
  //     new RegExp('http://dev.wowbein.com/app'),
  //     workbox.strategies.networkFirst({
  //         cacheName: 'api'
  //     })
  // );

  // 缓存post api请求的数据
  // const bgSyncPlugin = new workbox.backgroundSync.Plugin('apiQueue', {
  //   maxRetentionTime: 1 * 60
  // });

  // workbox.routing.registerRoute(
  //   /.*\/api\/.*/,
  //   new workbox.strategies.NetworkOnly({
  //     plugins: [bgSyncPlugin]
  //   }),
  //   'POST'
  // );


  self.addEventListener('push', function (event) {
    // 检查服务端是否发来了任何有效载荷数据
    console.log('event.data:', event.data.text()) // event.data: {"msg":"this is a test","url":"https://www.baidu.com/","icon":"./app.png"}
    const payload = event.data ? JSON.parse(event.data.text()) : 'no payload'
    console.log(payload) // {msg: "this is a test", url: "https://www.baidu.com/", icon: "./app.png"}
    const title = 'Progressive Times'
    event.waitUntil(
        // 使用提供的信息来显示 Web 推送通知
        self.registration.showNotification(title, {
            body: payload.msg,
            data: payload.url,
            icon: payload.icon
        })
      )
  })

  self.addEventListener('notificationclick', event => {
      // 关闭当前的弹窗
      event.notification.close();
      // 在新窗口打开页面
      event.waitUntil(
          // event.notification.data 取出推送通知中的数据
          clients.openWindow(event.notification.data)
      )
  })