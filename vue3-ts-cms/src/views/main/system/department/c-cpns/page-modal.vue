<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新增部门' : '修改部门'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80" size="large">
          <el-form-item label="部门名称" prop="name">
            <el-input placeholder="请输入部门名称" v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input placeholder="请输入部门领导" v-model="formData.leader"></el-input>
          </el-form-item>
          <el-form-item label="上级部门" prop="departmentId">
            <el-select v-model="formData.parentId" placeholder="请选择上级部门" style="width: 100%">
              <template v-for="item in departmentList" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useMain from '@/stores/main/main'
import useSystem from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'

// 定义内部数据
const dialogVisible = ref(false)
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})

const isNewRef = ref(true)
const editData = ref()

// 请求角色和部门数据
const mainStore = useMain()
const systemStore = useSystem()
const { departmentList } = storeToRefs(mainStore)

// 展示dialog
function changeDialog(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    // 修改
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新增
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}
// 点击确定的逻辑
function handleConfirm() {
  dialogVisible.value = false
  if (!isNewRef.value && editData) {
    //修改用户
    systemStore.editPageAction('department', editData.value.id, formData)
  } else {
    // 新增用户
    systemStore.newPageAction('department', formData)
  }
}

defineExpose({
  changeDialog
})
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
