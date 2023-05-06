<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></page-search>
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @add-click="handleAddClick"
      @edit-click="handleEditClick"
    >
      <template #custom1="scope">
        <span>我是自定义1{{ scope.row[scope.prop] }}</span>
      </template>
      <template #custom2="scope">
        <span>我是自定义2{{ scope.row[scope.prop] }}</span>
      </template>
    </page-content>
    <page-modal :modal-config="modalConfigRef" ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts">
// import pageSearch from './c-cpns/page-search.vue'
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import { ref, computed } from 'vue'
import searchConfig from '@/views/main/system/department/config/search-config'
import contentConfig from '@/views/main/system/department/config/content-config'
import modalConfig from '@/views/main/system/department/config/modal-config'
import useMain from '@/stores/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// 对modalConfig操作
const modalConfigRef = computed(() => {
  const mainStore = useMain()
  const departments = mainStore.departmentList.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options?.push(...departments)
    }
  })
  console.log(modalConfig)
  return modalConfig
})

// 相同逻辑hooks抽取

// 点击search，content的操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
// 点击新增，修改，modal操作
const { modalRef, handleAddClick, handleEditClick } = usePageModal()
</script>

<style lang="less" scoped></style>
