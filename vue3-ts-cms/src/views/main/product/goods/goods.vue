<template>
  <div class="goods">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></page-search>
    <page-content :content-config="contentConfig" ref="contentRef">
      <template #img="scope">
        <!-- 增加图片预览功能，注意preview-src-list需要用数组包裹 -->
        <div style="display: flex; align-items: center">
          <el-image
            preview-teleported
            :preview-src-list="[scope.row[scope.prop]]"
            class="goods_img"
            :src="scope.row[scope.prop]"
          />
        </div>
      </template>
    </page-content>
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search-config'
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content-config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
</script>

<style lang="less" scoped>
.goods_img {
  width: 50px;
  height: 50px;
}
</style>
