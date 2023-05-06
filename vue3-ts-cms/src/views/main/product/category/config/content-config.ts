const contentConfig = {
  pageName: 'category',
  header: {
    title: '类别列表',
    btnTitle: '新增类别'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '80px' },
    { type: 'index', label: '序号', width: '80px' },

    { type: 'normal', label: '类别名称', prop: 'name', width: '150px' },

    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },

    { type: 'handle', label: '操作', width: '200px' }
  ]
}

export default contentConfig
