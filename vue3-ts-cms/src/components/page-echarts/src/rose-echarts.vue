<template>
  <div class="rose-ecahrts">
    <base-echarts :option="option"></base-echarts>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import baseEcharts from './base-echarts.vue'
import type { EChartsOption } from 'echarts'

interface IProps {
  roseData: {
    value: number
    name: string
  }[]
}
const props = defineProps<IProps>()

const option = computed<EChartsOption>(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '商品数量',
        type: 'pie',
        radius: [10, 150],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData,
        label: {
          show: false
        }
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
