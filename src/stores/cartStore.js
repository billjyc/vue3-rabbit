import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import { findNewCartListAPI, insertCartAPI, delCartAPI } from "@/apis/cart";


export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore();
  const isLogin = computed(() => userStore.userInfo.token);
  const cartList = ref([]);

  const updateNewList = async () => {
    const res = await findNewCartListAPI();
    cartList.value = res.result;
  }

  const addCart = async (goods) => {
    if (isLogin.value) {
      const { skuId, count } = goods
      // 登录之后加入购物车逻辑
      await insertCartAPI({ skuId, count })
      await updateNewList()
    } else {
      //通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
      const item = cartList.value.find((item) => goods.skuId === item.skuId);
      if (item) {
        //找到了
        item.count++;
      } else {
        // 没找到
        cartList.value.push(goods);
      }
    }

  }
  const delCart = async (skuId) => {
    if(isLogin.value) {
     //实现调用接口购物车的删除功能
      await delCartAPI([skuId])
      await updateNewList()
    } else {
      // 1. 找到要删除项的下标值-splice
      // 2. 使用数组的过滤方法 - filter
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1);
    }
  }

  // 清除购物车
  const clearCart = () => {
    cartList.value = []
  }

  // 单选功能
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId);
    item.selected = selected;
  };

  // 全选功能
  const allClick = (selected) => {
    cartList.value.forEach(item => item.selected = selected);
  }

  // 计算属性
  const allCount = computed(()=>cartList.value.reduce((a, c) => a + c.count, 0));
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0));
  const isAll = computed(() => cartList.value.every((item) => item.selected))
  //已选择数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0));
  // 已选择商品价钱合计
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0));
  return {
    cartList,
    allCount,
    allPrice,
    selectedCount,
    selectedPrice,
    addCart,
    delCart,
    singleCheck,
    allClick,
    clearCart,
    isAll,
  }
}, {
  persist: true,
})