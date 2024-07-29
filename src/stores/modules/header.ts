import {defineStore} from 'pinia'

// 头部区域状态管理
export const useHeader = defineStore('useHeader', {
    state: () => {
        return {
            collapse: false,
            refresh: false,
            theme: false,
            search: false,
            setting: false,
            drawer: false,
            showLogo: false,
            fixedHeader: false,
            language: "zh-cn",
            loginType: "demo"
        }
    },
    getters: {
        getCollapse: (state) => {
            return state.collapse
        },
        getDrawer: (state) => {
            return state.drawer
        },
        getShowLogo: (state) => {
            return state.showLogo
        },
        getFixedHeader: (state) => {
            return state.fixedHeader
        },
        getLanguage: (state) => {
            return state.language
        }
    },

    // actions 中并不对应 setter 方法，而是关于这个 store 的所有请求调用封装
    // 在这里面调用 api 目录中对应的请求接口，不要在文件组件中进行调用，而是统一在 store 中调用
    actions: {
        setCollapse() {
            this.collapse = !this.collapse
        },
        setDrawer() {
            this.drawer = !this.drawer
        },
        setShowLogo() {
            this.showLogo = !this.showLogo
        },
        setFixedHeader() {
            this.fixedHeader = !this.fixedHeader
        },
        setLanguage(lang: string) {
            this.language = lang
        }
    }
})
