<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" />
      <h2 class="title" v-show="!isFold">后台管理系统</h2>
    </div>
    <div class="menu-nav">
      <el-menu
        :default-active="defaultActive"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :collapse="isFold"
      >
        <template v-for="item in userMenu" :key="item.id">
          <el-sub-menu :index="String(item.id)">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="iten in item.children" :key="iten.id">
              <el-menu-item :index="String(iten.id)" @click="onItenRouter(iten)">{{
                iten.name
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import useLogin from '@/stores/login/login'
import { mapPathToMenu } from '@/utils/mapMenu'
import { computed } from 'vue'

// 动态获取菜单
const loginStore = useLogin()
const userMenu = loginStore.userMenu

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
const router = useRouter()
function onItenRouter(iten: any) {
  const url = iten.url
  router.push(url)
}
// 动态匹配菜单
const route = useRoute()
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenu)
  return pathMenu.id + ''
})
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}
.el-menu {
  border-right: none;
  //  user-select 控制用户能否选中文本
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
