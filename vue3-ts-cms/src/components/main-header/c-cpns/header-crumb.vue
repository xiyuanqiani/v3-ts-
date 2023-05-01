<template>
  <div class="crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import useLogin from '@/stores/login/login'
import { mapPathToBreadcrumb } from '@/utils/mapMenu'
import { computed } from 'vue'

const route = useRoute()
const userMenu = useLogin().userMenu
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumb(route.path, userMenu)
})
</script>

<style lang="less" scoped></style>
