import type { IModalConfig } from '@/components/page-modal/type'

const modalConfig: IModalConfig = {
  pageName: 'role',
  header: {
    newTitle: '新建角色',
    editTitle: '编辑角色'
  },
  formItems: [
    { type: 'input', label: '角色名称', prop: 'name', placeholder: '请输入角色名称' },
    { type: 'input', label: '权限描述', prop: 'intro', placeholder: '请输入权限描述' },
    { type: 'custom', slotName: 'menuList' }
  ]
}

export default modalConfig
