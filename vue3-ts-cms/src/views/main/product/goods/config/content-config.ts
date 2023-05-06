const contentConfig = {
  pageName: 'goods',
  header: {
    title: '商品列表',
    btnTitle: '新增商品'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '60px' },
    { type: 'index', label: '序号', width: '60px' },

    { type: 'normal', label: '商品名称', prop: 'name', width: '100px' },
    { type: 'normal', label: '原价格', prop: 'oldPrice', width: '90px' },
    { type: 'normal', label: '新价格', prop: 'newPrice', width: '90px' },
    { type: 'normal', label: '商品描述', prop: 'desc', width: '100px' },
    { type: 'normal', label: '状态', prop: 'status', width: '90px' },
    { type: 'custom', label: '图片', prop: 'imgUrl', slotName: 'img', width: '90px' },
    { type: 'normal', label: '库存', prop: 'inventoryCount', width: '90px' },
    { type: 'normal', label: '销量', prop: 'saleCount', width: '90px' },
    { type: 'normal', label: '收藏', prop: 'favorCount', width: '90px' },
    { type: 'normal', label: '地址', prop: 'address', width: '90px' },

    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },

    { type: 'handle', label: '操作', width: '180px' }
  ]
}

export default contentConfig
