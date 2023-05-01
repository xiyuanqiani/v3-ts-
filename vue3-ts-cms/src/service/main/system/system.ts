import ysRequest from '@/service'

// 用户增删查改网络的请求
export function postUsersListData(queryInfo: any) {
  return ysRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

export function deleteUserById(id: number) {
  return ysRequest.delete({
    url: `/users/${id}`
  })
}

export function newUser(userInfo: any) {
  return ysRequest.post({
    url: '/users',
    data: userInfo
  })
}

export function editUser(id: number, userInfo: any) {
  return ysRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

// 页面增删改查的网络请求
export function postPageData(pageName: string, queryInfo: any) {
  return ysRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}
export function deletePageById(pageName: string, id: number) {
  return ysRequest.delete({
    url: `/${pageName}/${id}`
  })
}
export function newPage(pageName: string, pageInfo: any) {
  return ysRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  })
}

export function editPage(pageName: string, id: number, pageInfo: any) {
  return ysRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  })
}
