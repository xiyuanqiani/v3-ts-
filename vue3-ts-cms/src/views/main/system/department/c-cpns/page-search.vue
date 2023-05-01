<template>
  <div class="search">
    <!-- 搜索表单 -->
    <el-form label-width="80" :model="searchForm" ref="formRef">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称" size="large" prop="name">
            <el-input placeholder="请输入要查询的部门" v-model="searchForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" size="large" prop="realname">
            <el-input placeholder="请输入要查询的部门领导" v-model="searchForm.leader"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建日期" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="创建时间"
              end-placeholder="更新时间"
              size="large"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 操作 -->
    <div class="btns">
      <el-button icon="Refresh" @click="onResetClick">重置</el-button>
      <el-button icon="Search" type="primary" @click="onSearchClick">搜索</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

const formRef = ref<InstanceType<typeof ElForm>>()
const searchForm = reactive({
  name: '',
  leader: '',
  createAt: []
})

const emit = defineEmits(['resetClick', 'queryClick'])
// 重置表单
function onResetClick() {
  formRef.value?.resetFields()

  emit('resetClick')
}
// 搜索
function onSearchClick() {
  emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;
}
.el-form-item {
  padding: 20px 30px;
  margin-bottom: 0px;
}
.btns {
  text-align: right;
  margin: 0 50px 10px 0;
  .el-button {
    height: 36px;
  }
}
</style>
