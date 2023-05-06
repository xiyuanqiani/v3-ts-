<template>
  <div class="category">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></page-search>
    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      @add-click="handleAddClick"
      @edit-click="handleEditClick"
    ></page-content>
    <page-modal :modal-config="modalConfig" ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search-config'
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content-config'
import pageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal-config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleAddClick, handleEditClick } = usePageModal()
</script>

<style lang="less" scoped></style>
