<template>
  <div class="line-ecahrts">
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
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.labels
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.values,
        type: 'line',
        areaStyle: {}
        // label: {
        //   show: true,
        //   position: 'insideBottomLeft'
        // }
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
