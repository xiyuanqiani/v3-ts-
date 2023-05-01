<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick"></user-search>
    <user-content ref="contentRef" @add-user="newUser" @edit-user="editUser"></user-content>
    <user-modal ref="modalRef"></user-modal>
  </div>
</template>

<script setup lang="ts">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import userModal from './c-cpns/user-modal.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof userContent>>()
function handleQueryClick(searchForm: any) {
  contentRef.value?.fetchUsersList(searchForm)
}

function handleResetClick() {
  contentRef.value?.fetchUsersList()
}

const modalRef = ref<InstanceType<typeof userModal>>()
function newUser() {
  modalRef.value?.changeDialog()
}

function editUser(itemData: any) {
  modalRef.value?.changeDialog(false, itemData)
}
</script>

<style lang="less" scoped></style>
