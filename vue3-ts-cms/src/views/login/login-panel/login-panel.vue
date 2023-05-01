<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 账号panel -->
        <el-tab-pane label="账号登录" name="account">
          <template #label>
            <div class="label">
              <el-icon><User /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <account-pane ref="accountRef"></account-pane>
        </el-tab-pane>
        <!-- 手机panel -->
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span>手机登录</span>
            </div>
          </template>
          <phone-pane></phone-pane>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="control">
      <el-checkbox v-model="isRemPwd" label="记住密码" />
      <el-link type="primary">忘记密码?</el-link>
    </div>
    <el-button type="primary" class="login-btn" size="large" @click="handleClick"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import accountPane from './account-pane/account-pane.vue'
import phonePane from './phone-pane/phone-pane.vue'
import { ref, watch } from 'vue'

const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
// 监视isRemPwd的变化
watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})
const activeName = ref('account')
const accountRef = ref<InstanceType<typeof accountPane>>()

function handleClick() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
    console.log('账号登录')
  } else {
    console.log('手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 20px;
  }

  .tabs {
    .label {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .control {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
