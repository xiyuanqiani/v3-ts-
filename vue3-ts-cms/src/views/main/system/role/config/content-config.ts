const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新增角色'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '80px' },
    { type: 'index', label: '序号', width: '80px' },

    { type: 'normal', label: '角色名称', prop: 'name', width: '150px' },
    { type: 'normal', label: '权限描述', prop: 'intro', width: '150px' },

    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },

    { type: 'handle', label: '操作', width: '200px' }
  ]
}

export default contentConfig
