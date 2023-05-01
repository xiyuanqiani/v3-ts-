<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script setup lang="ts">
import loginPanel from './login-panel/login-panel.vue'
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(@/assets/img/login-bg.svg);
}
</style>
