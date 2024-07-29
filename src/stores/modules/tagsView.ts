import {RouteLocationNormalizedLoaded} from "vue-router";
import {defineStore} from "pinia";

// 定义 TagsView 使用的数据类型
export interface TagsViewState {
    visitedViews: RouteLocationNormalizedLoaded[]
    cachedViews: Set<string>
}

export const useTagsViewStore = defineStore('useTagsViewStore', {
    // 定义初始状态
    state: (): TagsViewState => ({
        // 存储访问过的路由
        visitedViews: [],
        // 存储已缓存的路由, 用于判断是否需要缓存
        cachedViews: new Set()
    }),
    // 定义 getters 方法，用于获取 store 中的数据
    getters: {
        // 访问过的路由
        getVisitedViews: (state) => {
            return state.visitedViews
        },
        // 已缓存的路由
        getCachedViews: (state) => {
            return state.cachedViews
        },
        // 当前访问的路由
        getCurrentTag: (state) => {
            return state.visitedViews[state.visitedViews.length - 1]
        }
    },
    // 定义 mutations 方法，用于修改 store 中的数据
    // actions 中并不对应 setter 方法，而是关于这个 store 的所有请求调用封装
    // 在这里面调用 api 目录中对应的请求接口，不要在文件组件中进行调用，而是统一在 store 中调用
    actions: {
        // 新增tag
        addVisitedView(tagView: RouteLocationNormalizedLoaded) {
            if (this.visitedViews.some((v) => v.path === tagView.path)) return
            if (tagView.meta?.noTagsView) return
            this.visitedViews.push(
                Object.assign({}, tagView, {
                    title: tagView.meta?.title || 'no-name'
                })
            )
        },
        // 删除当前tag
        closeCurrentTag(tagView: any) {
            for (const [i, v] of this.visitedViews.entries()) {
                if (v.path === tagView.path) {
                    this.visitedViews.splice(i, 1)
                    break
                }
            }
        },
        // 删除左侧
        closeLeftTags(tagView: any) {
            console.log(tagView)
        },
        // 删除右侧
        closeRightTags(tagView: any) {
            console.log(tagView)
        },
        // 删除其他tag
        closeOtherTags(tagView: any) {
            this.visitedViews = this.visitedViews.filter((v) => {
                return v?.meta?.affix || v.path === tagView.path
            })
        },
        // 删除所有tag
        closeAllTags() {
            // const affixTags = this.visitedViews.filter((tag) => tag.meta.affix)
            this.visitedViews = []
        },
    },
    // 开启持久化，如果不需要自定配置，可以直接使用 persist: true 开启
    // 默认使用 localStorage 存储，并使用store的id作为key值
    persist: true
})