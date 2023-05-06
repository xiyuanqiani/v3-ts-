import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoute() {
  const localRoute: RouteRecordRaw[] = []
  // 读取router/main下.ts文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  for (const keys in files) {
    const module = files[keys]
    localRoute.push(module.default)
  }
  return localRoute
}

export let firstMenu: any = null
export function mapMenuToRoutes(userMenu: any[]) {
  const localRoute = loadLocalRoute()

  const routes: RouteRecordRaw[] = []
  for (const menu of userMenu) {
    for (const subMenu of menu.children) {
      const route = localRoute.find((item) => item.path === subMenu.url)
      if (route) {
        // 给顶级菜单重定向(只添加一次,因为是for循环会添加多个)
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        // 2级菜单
        routes.push(route)
      }
      // 第一次被匹配的菜单
      if (!firstMenu && route) firstMenu = subMenu
    }
  }
  return routes
}
/**
 *根据路径去匹配显示的菜单
 * @params 需要匹配的路径
 * @userMenu 所有的菜单
 */
export function mapPathToMenu(path: string, userMenu: any[]) {
  for (const menu of userMenu) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) return subMenu
    }
  }
}
interface IBreadcrumb {
  path: string
  name: string
}
export function mapPathToBreadcrumb(path: string, userMenu: any[]) {
  // 定义面包屑
  const breadcrumb: IBreadcrumb[] = []
  //遍历获取面包屑层级
  for (const menu of userMenu) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        // 顶级菜单
        breadcrumb.push({ name: menu.name, path: menu.url })
        // 匹配菜单
        breadcrumb.push({ name: subMenu.name, path: subMenu.url })
      }
    }
  }
  return breadcrumb
}

export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []
  function recurseId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseId(menuList)
  return ids
}
