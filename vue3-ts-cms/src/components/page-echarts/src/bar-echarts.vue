<template>
  <div class="bar-ecahrts">
    <base-echarts :option="option"></base-echarts>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import baseEcharts from './base-echarts.vue'
import type { EChartsOption } from 'echarts'

interface IProps {
  labels: any[]
  values: any[]
}
const props = defineProps<IProps>()

const option = computed<EChartsOption>(() => {
  return {
    xAxis: {
      type: 'category',
      data: props.labels
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.values,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
