import { defineStore } from 'pinia'
import { getEntireRole, getEntireDepartment, getEntireMenuList } from '@/service/main/main'

interface IUseState {
  roleList: any[]
  departmentList: any[]
  menuList: any[]
}
const useMain = defineStore('main', {
  state: (): IUseState => ({
    roleList: [],
    departmentList: [],
    menuList: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const roleRes = await getEntireRole()
      const departmentRes = await getEntireDepartment()
      const menuRes = await getEntireMenuList()
      this.roleList = roleRes.data?.list
      this.departmentList = departmentRes.data?.list
      this.menuList = menuRes.data?.list
    }
  }
})

export default useMain
