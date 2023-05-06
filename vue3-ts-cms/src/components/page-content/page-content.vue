<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig.header?.title ?? '数据列表' }}</h3>
      <el-button type="primary" @click="handleAddUser">{{
        contentConfig.header?.btnTitle ?? '新增数据'
      }}</el-button>
    </div>
    <div class="table">
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        :row-key="contentConfig?.childrenTree?.rowKey"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <!-- 创建时间 -->
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUtc(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <!-- 操作 -->
          <template v-else-if="item.type === 'handle'">
            <el-table-column align="center" v-bind="item">
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
          </template>
          <!-- 自定义 -->
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <!-- 作用域插槽实现自定义 -->
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop"></slot>
              </template>
            </el-table-column>
          </template>
          <!-- 普通内容 -->
          <template v-else>
            <!-- 内容过长时省略show-overflow-tooltip: true -->
            <el-table-column show-overflow-tooltip v-bind="item" align="center"></el-table-column>
          </template>
        </template>
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
import { ref, defineProps } from 'vue'

interface IProp {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle: string
    }
    propsList: any[]
    childrenTree?: any
  }
}
const props = defineProps<IProp>()

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
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

// 删除
function handleDelete(id: number) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
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
// .el-table_cell {
//   background-color: red;
//   white-space: nowrap;
//   overflow: hidden;
// }
</style>
