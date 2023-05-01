<template>
  <div class="content">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button type="primary" @click="handleAddUser">新增部门</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column type="selection" width="50" />
        <el-table-column align="center" type="index" label="序号" width="60" />
        <el-table-column align="center" prop="name" label="部门名称" width="150" />
        <el-table-column align="center" prop="leader" label="部门领导" width="150" />
        <el-table-column align="center" prop="parentId" label="上级部门" width="150" />
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUtc(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatUtc(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template #default="scope">
            <el-button
              size="small"
              icon="Edit"
              type="primary"
              text
              @click="handleEditUser(scope.row)"
              >修改</el-button
            >
            <el-button
              size="small"
              icon="Delete"
              type="danger"
              text
              @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 7, 10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystem from '@/stores/main/system/system'
import { formatUtc } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const systemStore = useSystem()
const currentPage = ref(1)
const pageSize = ref(10)
// 1.发起action请求
fetchPageList()
// 2.拿到数据
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 分页的逻辑

function handleSizeChange() {
  fetchPageList()
}
function handleCurrentChange() {
  fetchPageList()
}

// 定义一个函数发网络请求
function fetchPageList(searchForm: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  const queryInfo = { ...pageInfo, ...searchForm }
  systemStore.postPageListAction('department', queryInfo)
}

// 删除
function handleDelete(id: number) {
  systemStore.deletePageByIdAction('department', id)
}

// 新增用户
const emit = defineEmits(['addClick', 'editClick'])
function handleAddUser() {
  emit('addClick')
}
function handleEditUser(itemData: any) {
  emit('editClick', itemData)
}

defineExpose({
  fetchPageList
})
</script>

<style lang="less" scoped>
.content {
  background-color: #fff;
  padding: 20px;
  margin-top: 10px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
}
.title {
  font-size: 21px;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
