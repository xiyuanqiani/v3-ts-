<template>
  <div class="role">
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
    ></page-content>
    <page-modal :modal-config="modalConfig" :other-info="otherInfo" ref="modalRef">
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="menuList"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckClick"
        />
      </template>
    </page-modal>
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
import type { ElTree } from 'element-plus'
import { mapMenuListToIds } from '@/utils/mapMenu'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleAddClick, handleEditClick } = usePageModal(newCallback, editCallback)

// 获取全部菜单数据
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'
import useMain from '@/stores/main/main'
const mainStore = useMain()
const { menuList } = storeToRefs(mainStore)

// 点击树形菜单拿到对应id
const otherInfo = ref({})
function handleCheckClick(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}

const treeRef = ref<InstanceType<typeof ElTree>>()
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
function editCallback(itemData: any) {
  nextTick(() => {
    const ids = mapMenuListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(ids)
  })
}
</script>

<style lang="less" scoped></style>
