<template>
  <div class="base-echarts">
    <div class="echarts" ref="echartsRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import ChinaJSON from '../data/china.json'

echarts.registerMap('china', ChinaJSON as any)
const echartsRef = ref<HTMLElement>()

interface IProps {
  option: EChartsOption
}
const props = defineProps<IProps>()
onMounted(() => {
  const echartsInstance = echarts.init(echartsRef.value!, 'light', { renderer: 'canvas' })
  // watchEffect
  watchEffect(() => echartsInstance.setOption(props.option))
  // 响应式
  window.addEventListener('resize', () => {
    echartsInstance.resize()
  })
})
</script>

<style lang="less" scoped>
.echarts {
  height: 300px;
}
</style>
