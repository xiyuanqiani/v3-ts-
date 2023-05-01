import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import '@/assets/css/index.less'
import router from './router'
import registerIcon from './globle/register-icon'
import registerStore from './stores'

// 针对ElMessage等组件引入样式
// 1.全局引入样式
// import 'element-plus/dist/index.css
// 2.组件样式引入
// import 'element-plus/theme-chalk/el-message.css'
/*
  3.使用vite-plugin-style-import
     * npm install vite-plugin-style-import consola -D
      * 在vite.config.ts中配置
*/

createApp(App).use(registerStore).use(router).use(registerIcon).mount('#app')
