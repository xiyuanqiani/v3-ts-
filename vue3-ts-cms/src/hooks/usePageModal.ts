import { ref } from 'vue'
import type pageModal from '@/components/page-modal/page-modal.vue'

type EditFnType = (data: any) => void
type newFnType = () => void
function usePageModal(newCallBack?: newFnType, editCallback?: EditFnType) {
  const modalRef = ref<InstanceType<typeof pageModal>>()
  function handleAddClick() {
    modalRef.value?.changeDialog()
    if (newCallBack) newCallBack()
  }
  function handleEditClick(itemData: any) {
    modalRef.value?.changeDialog(false, itemData)
    if (editCallback) editCallback(itemData)
  }

  return { modalRef, handleAddClick, handleEditClick }
}

export default usePageModal
