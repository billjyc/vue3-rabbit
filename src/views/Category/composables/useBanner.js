// 封装轮播图业务相关代码
import {onMounted, ref} from "vue";
import {getBannerAPI} from "@/apis/home";

export function useBanner(params) {
    const bannerList = ref([]);
    const getBanner = async () => {
        const res = await getBannerAPI(params);
        console.log(res);
        bannerList.value = res.result;
    }

    onMounted(() => getBanner());
    return {bannerList, }
}
