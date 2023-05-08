import ysRequest from '@/service'

export function getGoodsAmountData() {
  return ysRequest.get({
    url: 'goods/amount/list'
  })
}

export function getGoodsCount() {
  return ysRequest.get({
    url: 'goods/category/count'
  })
}

export function getGoodsSale() {
  return ysRequest.get({
    url: 'goods/category/sale'
  })
}

export function getGoodsFavor() {
  return ysRequest.get({
    url: 'goods/category/favor'
  })
}

export function getGoodsAddressSale() {
  return ysRequest.get({
    url: 'goods/address/sale'
  })
}
