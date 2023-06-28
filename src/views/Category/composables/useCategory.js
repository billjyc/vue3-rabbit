import {onMounted, ref} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {getCategoryAPI} from "@/apis/category";

export function useCategory() {
    const categoryData = ref({});
    const route = useRoute();
    const getCategory = async (id=route.params.id)=> {
        const res = await getCategoryAPI(id);
        categoryData.value = res.result;
    }

    onMounted(() => getCategory());

    // 目标：路由参数变化的时候，可以把分类数据接口重新发送
    onBeforeRouteUpdate((to) => {
        console.log(to);
        getCategory(to.params.id);
    });
    return { categoryData };
}