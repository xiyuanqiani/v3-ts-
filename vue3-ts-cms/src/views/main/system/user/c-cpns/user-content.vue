<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleAddUser">新增用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <!-- selection未生效？？？？？？？？ -->
        <el-table-column type="selection" width="50" />
        <el-table-column align="center" type="index" label="序号" width="60" />
        <el-table-column align="center" prop="name" label="用户名" width="150" />
        <el-table-column align="center" prop="realname" label="真实姓名" width="150" />
        <el-table-column align="center" prop="cellphone" label="手机号码" width="150" />
        <el-table-column align="center" prop="enable" label="状态" width="100">
          <template #default="scope">
            <el-button size="small" :type="scope.row.enable === 1 ? 'primary' : 'danger'" plain>
              {{ scope.row.enable === 1 ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
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
        :total="totalCount"
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
fetchUsersList()
// 2.拿到数据
const { usersList, totalCount } = storeToRefs(systemStore)

// 分页的逻辑

function handleSizeChange() {
  fetchUsersList()
}
function handleCurrentChange() {
  fetchUsersList()
}

// 定义一个函数发网络请求
function fetchUsersList(searchForm: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  const queryInfo = { ...pageInfo, ...searchForm }
  systemStore.postUsersListAction(queryInfo)
}

// 删除
function handleDelete(id: number) {
  systemStore.deleteUserByIdAction(id)
}

// 新增用户
const emit = defineEmits(['addUser', 'editUser'])
function handleAddUser() {
  emit('addUser')
}
function handleEditUser(itemData: any) {
  emit('editUser', itemData)
}

defineExpose({
  fetchUsersList
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
