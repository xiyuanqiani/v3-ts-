<template>
  <div class="main-header">
    <div class="menu-icon" @click="isFoldClick">
      <el-icon size="28" v-if="!isFold"><Fold /></el-icon>
      <el-icon size="28" v-else><Expand /></el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">
        <header-crumb></header-crumb>
      </div>
      <div class="info">
        <header-info></header-info>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import headerInfo from './c-cpns/header-info.vue'
import headerCrumb from './c-cpns/header-crumb.vue'
import { ref } from 'vue'
let isFold = ref(false)
const emit = defineEmits(['changeFold'])

// 自定义事件
function isFoldClick() {
  isFold.value = !isFold.value

  emit('changeFold', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
