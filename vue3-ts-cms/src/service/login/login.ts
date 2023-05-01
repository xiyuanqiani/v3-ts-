import ysRequest from '..'
import type { IAccount } from '@/types'

// 登录
export function loginRequest(account: IAccount) {
  return ysRequest.post({
    url: '/login',
    data: account
  })
}

// 获取登录用户信息
export function loginUserInfo(id: number) {
  return ysRequest.get({
    url: `users/${id}`
  })
}

// 获取登录用户菜单权限
export function UserMenuById(id: number) {
  return ysRequest.get({
    url: `/role/${id}/menu`
  })
}
