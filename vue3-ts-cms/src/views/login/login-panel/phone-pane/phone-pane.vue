<template>
  <div class="phone-pane">
    <el-form label-width="60">
      <el-form-item label="手机号">
        <el-input placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verity-code">
          <el-input placeholder=""></el-input>
          <el-button type="primary" class="code-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.verity-code {
  display: flex;
  .code-btn {
    margin-left: 8px;
  }
}
</style>
