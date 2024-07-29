import {defineStore} from 'pinia'
import {constantRoutes} from '@/router/modules/constant.ts'

// 这个系统共用状态管理
export const useSystem = defineStore('useSystem', {
    state: () => {
        return {
            route: {},
            routes: constantRoutes,
        }
    },
    getters: {
        getRoutes: (state) => {
            return state.routes
        }
    },

    // actions 中并不对应 setter 方法，而是关于这个 store 的所有请求调用封装
    // 在这里面调用 api 目录中对应的请求接口，不要在文件组件中进行调用，而是统一在 store 中调用
    actions: {
        setRoutes() {

        }
    }
})
