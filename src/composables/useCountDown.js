import { computed, onUnmounted, ref } from "vue";
import dayjs from 'dayjs';

export const useCountDown = () => {
  //响应式的数据
  const time = ref(0);
  let timer = null;
  // 格式化时间为xx分xx秒
  const formatTime = computed(() => {
    dayjs.unix(time.value).format('mm分ss秒')
  })

  //开启倒计时的函数
  const start = (currentTime) => {
    // 开始倒计时的逻辑
    // 每隔1s就减一
    formatTime.value = currentTime
    timer = setInterval(() => {
      formatTime.value--;
    }, 1000)
  }
  // 组件销毁时清除定时器
  onUnmounted(() => {
    timer && clearInterval(timer)
  })
  return {
    formatTime,
    start
  }
}