<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  :placeholder="item.placeholder"
                  v-model="formData[item.prop]"
                  size="large"
                ></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData.createAt"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="创建时间"
                  end-placeholder="更新时间"
                  size="large"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="iten in item.options" :key="iten.value">
                    <el-option :label="iten.label" :value="iten.value"></el-option>
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
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
import { reactive, ref, defineProps } from 'vue'
import useMain from '@/stores/main/main'
import useSystem from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'

interface IProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}
const props = defineProps<IProps>()

// 定义内部数据
const dialogVisible = ref(false)
const initialForm: any = {}
for (const item of props.modalConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const formData = reactive<any>(initialForm)

const isNewRef = ref(true)
const editData = ref()

// 请求角色和部门数据
const mainStore = useMain()
const systemStore = useSystem()

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
  let infoData = formData
  // 有树形控件的id
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
    console.log('debug', infoData)
  }
  if (!isNewRef.value && editData) {
    //修改
    systemStore.editPageAction(props.modalConfig.pageName, editData.value.id, infoData)
  } else {
    // 新增
    systemStore.newPageAction(props.modalConfig.pageName, infoData)
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
