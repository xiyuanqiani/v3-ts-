import { defineStore } from 'pinia'
import {
  postUsersListData,
  deleteUserById,
  newUser,
  editUser,
  postPageData,
  deletePageById,
  newPage,
  editPage
} from '@/service/main/system/system'
import type { ISystemState } from './type'

const useSystem = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    totalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    // 用户信息的增删改查
    async postUsersListAction(queryInfo: any) {
      const usersListRes = await postUsersListData(queryInfo)
      const { list, totalCount } = usersListRes.data
      this.usersList = list
      this.totalCount = totalCount
    },
    async deleteUserByIdAction(id: number) {
      // 1.删除用户
      const res = await deleteUserById(id)
      // 2.重新发起请求
      this.postUsersListAction({ size: 10, offset: 0 })
    },
    async newUserAction(userInfo: any) {
      // 1.新增用户
      const newUserRes = await newUser(userInfo)
      console.log(newUserRes)
      // 2.重新发起请求
      this.postUsersListAction({ size: 10, offset: 0 })
    },
    async editUserAction(id: number, userInfo: any) {
      // 1.修改用户
      const editUserRes = await editUser(id, userInfo)
      console.log(editUserRes)

      // 2.重新发起请求
      this.postUsersListAction({ size: 10, offset: 0 })
    },

    // 页面信息的增删改查
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageDataRes = await postPageData(pageName, queryInfo)
      const { list, totalCount } = pageDataRes.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const res = await deletePageById(pageName, id)
      console.log(res)
      this.postPageListAction(pageName, { size: 10, offset: 0 })
    },
    async newPageAction(pageName: string, pageInfo: any) {
      // 1.新增用户
      const newPageRes = await newPage(pageName, pageInfo)
      console.log(newPageRes)
      // 2.重新发起请求
      this.postPageListAction(pageName, { size: 10, offset: 0 })
    },
    async editPageAction(pageName: string, id: number, userInfo: any) {
      // 1.修改用户
      const editPageRes = await editPage(pageName, id, userInfo)
      console.log(editPageRes)

      // 2.重新发起请求
      this.postPageListAction(pageName, { size: 10, offset: 0 })
    }
  }
})

export default useSystem
