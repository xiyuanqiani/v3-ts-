import { ref } from 'vue'
import type pageModal from '@/components/page-modal/page-modal.vue'

type EditFnType = (data: any) => void
function usePageModal(editCallback?: EditFnType) {
  const modalRef = ref<InstanceType<typeof pageModal>>()
  function handleAddClick() {
    modalRef.value?.changeDialog()
  }
  function handleEditClick(itemData: any) {
    modalRef.value?.changeDialog(false, itemData)
    if (editCallback) editCallback(itemData)
  }

  return { modalRef, handleAddClick, handleEditClick }
}

export default usePageModal
