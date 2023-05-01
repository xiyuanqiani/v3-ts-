import { defineStore } from 'pinia'
import { loginRequest, loginUserInfo, UserMenuById } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { mapMenuToRoutes } from '@/utils/mapMenu'
import { LOGIN_TOKEN } from '@/globle/constant'
import router from '@/router'
import useMain from '../main/main'

// 定义state数据的类型，userInfo可以将数据全部写出
interface ILoginState {
  token: string
  userInfo: any
  userMenu: any
}

const useLogin = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenu: []
  }),
  actions: {
    async getLogin(account: IAccount) {
      const loginRes = await loginRequest(account)
      // 1.获取token等信息
      const id = loginRes.data.id
      const name = loginRes.data.name
      this.token = loginRes.data.token
      // 2.本地存储
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 3.获取登录用户信息
      const userInfoRes = await loginUserInfo(id)
      const userInfo = userInfoRes.data
      this.userInfo = userInfo
      localCache.setCache('userinfo', userInfo)

      // 4.获取用户菜单
      const userMenuRes = await UserMenuById(id)
      const userMenu = userMenuRes.data
      this.userMenu = userMenu
      localCache.setCache('usermenu', userMenu)

      // 获取全部角色好部门列表
      const mainStore = useMain()
      mainStore.fetchEntireDataAction()

      // 5.动态添加路由
      const routes = mapMenuToRoutes(userMenu)

      // !!!!!!!动态添加路由注意要给路由命名
      routes.forEach((route) => router.addRoute('main', route))

      // 6.跳转到main
      router.push('/main')
    },
    loadLocalCacheState() {
      //用户进行默认刷新
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userinfo')
      const userMenu = localCache.getCache('usermenu')
      if (token && userInfo && userMenu) {
        this.token = token
        this.userInfo = userInfo
        this.userMenu = userMenu
        // 刷新请求数据
        const mainStore = useMain()
        mainStore.fetchEntireDataAction()
        // 当页面有上面的值时，页面刷新保持路由注册
        const routes = mapMenuToRoutes(userMenu)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLogin
