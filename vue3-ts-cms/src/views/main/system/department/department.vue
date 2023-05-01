<template>
  <div class="department">
    <page-search @query-click="handleQueryClick" @reset-click="handleResetClick"></page-search>
    <page-content
      ref="contentRef"
      @add-click="handleAddClick"
      @edit-click="handleEditClick"
    ></page-content>
    <page-modal ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts">
import pageSearch from './c-cpns/page-search.vue'
import pageContent from './c-cpns/page-content.vue'
import pageModal from './c-cpns/page-modal.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof pageContent>>()
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageList(queryInfo)
}
function handleResetClick() {
  contentRef.value?.fetchPageList()
}
const modalRef = ref<InstanceType<typeof pageModal>>()
function handleAddClick() {
  modalRef.value?.changeDialog()
}
function handleEditClick(itemData: any) {
  modalRef.value?.changeDialog(false, itemData)
}
</script>

<style lang="less" scoped></style>
