<template>
  <div class="search">
    <!-- 搜索表单 -->
    <el-form label-width="80" :model="searchForm" ref="formRef">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  :placeholder="item.placeholder"
                  v-model="searchForm[item.prop]"
                  size="large"
                ></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm.createAt"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="创建时间"
                  end-placeholder="更新时间"
                  size="large"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="iten in item.options" :key="iten.value">
                    <el-option :label="iten.label" :value="iten.value"></el-option>
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
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

// 部门search配置
interface IProps {
  searchConfig: {
    formItems: any[]
  }
}
const props = defineProps<IProps>()

const formRef = ref<InstanceType<typeof ElForm>>()
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = ''
}
const searchForm = reactive(initialForm)

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
