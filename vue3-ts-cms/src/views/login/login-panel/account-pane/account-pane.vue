<template>
  <div class="account-pane">
    <el-form label-width="60px" :model="account" :rules="rules" status-icon ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { type FormRules, type ElForm, ElMessage } from 'element-plus'
import useLogin from '@/stores/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const NAME = 'name'
const PWD = 'password'
// 定义account数据
const account = reactive<IAccount>({
  name: localCache.getCache(NAME) ?? '',
  password: localCache.getCache(PWD) ?? ''
})
// 定义account校验规则
const rules: FormRules = {
  name: [
    { required: true, message: '必须输入账号', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,15}$/, message: '必须是6到15位字母或数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '必须输入密码', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '必须是大于3位的数字或字母', trigger: 'blur' }
  ]
}

// 账号登录逻辑

const loginStore = useLogin()
const formRef = ref<InstanceType<typeof ElForm>>()
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = account.name
      const password = account.password
      loginStore.getLogin({ name, password }).then((res) => {
        if (isRemPwd) {
          localCache.setCache(NAME, name)
          localCache.setCache(PWD, password)
        } else {
          localCache.removeCache(NAME)
          localCache.removeCache(PWD)
        }
      })
    } else {
      ElMessage.error('Ooos,请你输入正确的格式后操作')
    }
  })
}
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped></style>
