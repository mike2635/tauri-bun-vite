import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
// 配置 pinia 持久化插件，该插件的默认配置有如下特性
// 1、使用 localStorage 进行存储
// 2、store.$id 作为 storage 默认的 key
// 3、使用 JSON.stringify/JSON.parse 进行序列化/反序列化
// 4、整个 state 默认将被持久化
pinia.use(piniaPluginPersistedstate)

export default pinia

// 从pinia中引入defineStore函数来定义store
// pinia官方文档： https://pinia.web3doc.top/core-concepts/getters.html
// pinia持久化插件文档： https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/