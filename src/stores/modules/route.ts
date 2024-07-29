import {defineStore} from 'pinia'
import {constantRoutes} from "@/router/modules/constant.ts";
import {dynamicRoutes} from "@/router/modules/dynamic.ts";
import {RouteLocationNormalizedLoaded} from "vue-router";

// 这个系统共用状态管理
export const useLocalRoute = defineStore('useLocalRoute', {
    state: () => {
        return {
            dynamicTabs: [],
            constantRoutes: constantRoutes,
            // layoutsRoutes: layoutsRoutes,
            dynamicRoutes: dynamicRoutes
        }
    },
    getters: {
        getDynamicTabs: (state) => {
            return state.dynamicTabs
        },
        getConstantRoutes: (state) => {
            return state.constantRoutes
        },
        // getLayoutsRoutes: (state) => {
        //     return state.layoutsRoutes
        // },
        getDynamicRoutes: (state) => {
            return state.dynamicRoutes
        },
    },

    // actions 中并不对应 setter 方法，而是关于这个 store 的所有请求调用封装
    // 在这里面调用 api 目录中对应的请求接口，不要在文件组件中进行调用，而是统一在 store 中调用
    actions: {
        async setDynamicTabs(dynamicTabs: Array<RouteLocationNormalizedLoaded>) {
            // this.dynamicTabs = dynamicTabs
            localStorage.setItem('dynamicTabs', JSON.stringify(dynamicTabs))
        },
        async setConstantRoutes(constantRoutes: Array<any>) {
            this.constantRoutes = constantRoutes
            localStorage.setItem('constantRoutes', JSON.stringify(constantRoutes))
        },
        // async setLayoutsRoutes(layoutsRoutes: Array<any>) {
        //     this.layoutsRoutes = layoutsRoutes
        //     localStorage.setItem('layoutsRoutes', JSON.stringify(layoutsRoutes))
        // },
        async setDynamicRoutes(dynamicRoutes: Array<any>) {
            this.dynamicRoutes = dynamicRoutes
            localStorage.setItem('dynamicRoutes', JSON.stringify(dynamicRoutes))
        },
    }
})

