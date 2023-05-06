import { ref } from 'vue'
import type pageContent from '@/components/page-content/page-content.vue'

function usePageContent() {
  const contentRef = ref<InstanceType<typeof pageContent>>()
  function handleQueryClick(queryInfo: any) {
    contentRef.value?.fetchPageList(queryInfo)
  }
  function handleResetClick() {
    contentRef.value?.fetchPageList()
  }

  return { contentRef, handleQueryClick, handleResetClick }
}

export default usePageContent
