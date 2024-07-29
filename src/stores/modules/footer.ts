import {defineStore} from 'pinia'

// Footer状态管理
export const useFooter = defineStore('useFooter', {
    state: () => {
        return {
            name: 'vue3-template-admin',
            nameUrl: 'https://element-plus.gitee.io/zh-CN/',
            team: '龙茶清欢团队',
            teamUrl: 'https://element-plus.gitee.io/zh-CN/'
        }
    },
    getters: {
        getName: (state) => {
            return state.name
        },
        getNameUrl: (state) => {
            return state.nameUrl
        },
        getTeam: (state) => {
            return state.team
        },
        getTeamUrl: (state) => {
            return state.teamUrl
        }
    },

    // actions 中并不对应 setter 方法，而是关于这个 store 的所有请求调用封装
    // 在这里面调用 api 目录中对应的请求接口，不要在文件组件中进行调用，而是统一在 store 中调用
    actions: {
        setName(name: string) {
            this.name = name
            localStorage.setItem("footer", name)
        },
        setNameUrl(nameUrl: string) {
            this.nameUrl = nameUrl
            localStorage.setItem("footer", nameUrl)
        },
        setTeam(team: string) {
            this.team = team
            localStorage.setItem("footer", team)
        },
        setTeamUrl(teamUrl: string) {
            this.teamUrl = teamUrl
            localStorage.setItem("footer", teamUrl)
        }
    }
})
