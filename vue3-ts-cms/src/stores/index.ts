import type { App } from 'vue'
import { createPinia } from 'pinia'
import useLogin from './login/login'
const pinia = createPinia()

// 页面刷新保持路由注册
function registerStore(app: App<Element>) {
  // use的pinia
  app.use(pinia)
  // 加载本地数据
  const loginStore = useLogin()
  loginStore.loadLocalCacheState()
}

export default registerStore
