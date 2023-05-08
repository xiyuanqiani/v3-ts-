<template>
  <div class="dashboard">
    <!-- 顶部数字数据 -->
    <el-row :gutter="10">
      <template v-for="(item, i) in goodsAmountList" :key="i">
        <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6">
          <count-card v-bind="item"></count-card
        ></el-col>
      </template>
    </el-row>
    <!-- 中间部分图表 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card header="分类商品的个数(饼图)">
          <pie-echarts :pie-data="showGoodsCount" />
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card header="全国城市销量">
          <map-echarts :map-data="showGoodsAddressSale"></map-echarts>
        </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card header="分类商品数量(玫瑰图)">
          <rose-echarts :rose-data="showGoodsCount"></rose-echarts>
        </chart-card>
      </el-col>
    </el-row>
    <!-- 底部图表 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <chart-card header="分类商品销量(折线图)">
          <line-echarts
            :labels="showGoodsSale.labels"
            :values="showGoodsSale.values"
          ></line-echarts>
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card header="分类商品收藏(柱状图)">
          <bar-echarts
            :labels="showGoodsFavor.labels"
            :values="showGoodsFavor.values"
          ></bar-echarts>
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import countCard from './c-cpns/count-card/count-card.vue'
import chartCard from './c-cpns/chart-card/chart-card.vue'
import useAnalysis from '@/stores/main/analysis/analysis'
import {
  pieEcharts,
  roseEcharts,
  lineEcharts,
  barEcharts,
  mapEcharts
} from '@/components/page-echarts'

const analysisStore = useAnalysis()
analysisStore.fetchAnalysisData()
const { goodsAmountList, goodsCount, goodsSale, goodsFavor, goodsAddressSale } =
  storeToRefs(analysisStore)

const showGoodsCount = computed(() => {
  return goodsCount.value?.map((item) => {
    return { value: item.goodsCount, name: item.name }
  })
})

const showGoodsSale = computed(() => {
  const labels = goodsSale.value?.map((item) => item.name)
  const values = goodsSale.value?.map((item) => item.goodsSale)
  return { labels, values }
})
const showGoodsFavor = computed(() => {
  const labels = goodsFavor.value?.map((item) => item.name)
  const values = goodsFavor.value?.map((item) => item.goodsFavor)
  return { labels, values }
})

const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value?.map((item) => ({
    name: item.address,
    value: item.count
  }))
})
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
