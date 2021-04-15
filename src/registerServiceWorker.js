
import { register } from 'register-service-worker'

if ('serviceWorker' in window.navigator && process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.info(
        'App is being served from cache by a service worker.'
      )
    },
    cached () {
      console.info('Content has been cached for offline use.')
    },
    updated () {
      console.info('New content is available; please refresh.')
    },
    offline () {
      console.info('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}

// if (window.Notification) {
//   // 调用 Notification 的 requestPermission 方法来询问用户是否允许通知、返回一个 promise
//   Notification.requestPermission()
//       .then((permission) => {
//           // 当用户选择允许通知时，Notification.permission 的值为 granted
//           if (Notification.permission === 'granted') {
//               // 将新建的通知存储在 notification 变量里面
//               // 新建的通知包括标题、icon 图标以及内容
//               let notification = new Notification("sir, you got a message", {
//                   icon: '',
//                   body: 'you will have a meeting 5 minutes later.',
//               });
//               // 为 notification 添加点击事件
//               notification.addEventListener('click', function () {
//                   console.log('6666');
//               })
//           }
//       });
// }
