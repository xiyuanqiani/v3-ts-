import { defineStore } from 'pinia'
import {
  getGoodsAmountData,
  getGoodsCount,
  getGoodsSale,
  getGoodsFavor,
  getGoodsAddressSale
} from '@/service/main/analysis/analysis'

interface IState {
  goodsAmountList: any[]
  goodsCount: any[]
  goodsSale: any[]
  goodsFavor: any[]
  goodsAddressSale: any[]
}

const useAnalysis = defineStore('analysis', {
  state: (): IState => ({
    goodsAmountList: [],
    goodsCount: [],
    goodsSale: [],
    goodsFavor: [],
    goodsAddressSale: []
  }),
  actions: {
    async fetchAnalysisData() {
      const goodsAmountRes = await getGoodsAmountData()
      const goodsCountRes = await getGoodsCount()
      const goodsSaleRes = await getGoodsSale()
      const goodsFavorRes = await getGoodsFavor()
      const goodsAddressSaleRes = await getGoodsAddressSale()
      this.goodsAmountList = goodsAmountRes.data
      this.goodsCount = goodsCountRes.data
      this.goodsSale = goodsSaleRes.data
      this.goodsFavor = goodsFavorRes.data
      this.goodsAddressSale = goodsAddressSaleRes.data
    }
  }
})

export default useAnalysis
