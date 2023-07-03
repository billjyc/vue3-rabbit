import request from "@/utils/http";

//加入购物车
export const insertCartAPI = async ({skuId, count}) => {
  return request({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count
    }
  })
}

//获取最新的购物车列表
export const findNewCartListAPI = async () => {
  return request({
    url: '/member/cart'
  })
}