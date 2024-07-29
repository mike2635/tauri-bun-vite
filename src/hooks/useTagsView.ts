// 自定义钩子函数的作用是对外提供数据，可以是函数、对象等任何东西
// 自定义的Vue Composition API钩子函数。Vue Composition API是Vue 3中引入的一种新的组织组件逻辑的方式，它允许我们将逻辑代码按功能划分并重用。
import {useTagsViewStore} from "@/stores/modules/tagsView.ts";
import {RouteLocationNormalizedLoaded} from "vue-router";
import {storeToRefs} from "pinia";

// 按照惯例，组合式函数名以“use”开头
export const useTagsView = () => {
    // tagsViewStore 不可以解构，因为是一个用 reactive 包裹的对象象，一旦解构，状态数据将断开连接，失去响应式的能力
    const tagsViewStore= useTagsViewStore()
    // 当你只需要在组件中使用 store 的状态属性而不需要其他功能时, 可以使用 storeToRefs 方法将 store 转化为响应式的引用。
    // storeToRefs方法是将pinia的状态转化为响应式的引用，方便在模板中使用。可以将storeToRefs的返回值解包，得到其中的响应式属性。
    const store = storeToRefs(tagsViewStore)
    const {currentRoute } = useRouter()
    // 监听当前路由变化，更新当前路由的标签页信息
    const currentTag = computed(() => store.getCurrentTag)

    // 关闭当前标签页的函数
    const closeCurrentTag = (view?: RouteLocationNormalizedLoaded) => {
        if (view?.meta?.affix) return
        tagsViewStore.closeCurrentTag(view || unref(currentRoute))
    }

    // 关闭左侧标签页的函数
    const closeLeftTags = () => {
        tagsViewStore.closeLeftTags(currentTag)
    }

    // 关闭右侧标签页的函数
    const closeRightTags = () => {
        tagsViewStore.closeRightTags(currentTag)
    }

    // 关闭其它标签页的函数，即除了当前标签页之外的标签页
    const closeOtherTags = () => {
        // TODO: 这里的unref()方法是什么意思？
        // 这里的unref()方法是为了解包currentTag的响应式引用，使其成为一个纯粹的对象，而不是响应式的。
        tagsViewStore.closeOtherTags(currentTag)
    }

    // 关闭所有标签页的函数
    const closeAllTags = () => {
        tagsViewStore.closeAllTags()
    }

    // 一个组合式函数也可以挂靠在所属组件的生命周期上
    // 来启动和卸载副作用
    // onMounted(() => window.addEventListener('mousemove', update))

    // 通过返回值暴露所管理的状态
    return { closeCurrentTag, closeLeftTags, closeRightTags, closeOtherTags, closeAllTags }
}