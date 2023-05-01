import { defineStore } from 'pinia'
import { getEntireRole, getEntireDepartment } from '@/service/main/main'

interface IUseState {
  roleList: any[]
  departmentList: any[]
}
const useMain = defineStore('main', {
  state: (): IUseState => ({
    roleList: [],
    departmentList: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const roleRes = await getEntireRole()
      const departmentRes = await getEntireDepartment()
      this.roleList = roleRes.data.list
      this.departmentList = departmentRes.data.list
    }
  }
})

export default useMain
