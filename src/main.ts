import { createApp } from 'vue'
import App from '@/App.vue'

import '@/styles/main.scss'
import 'tailwindcss/tailwind.css'
// 全局引入svg图标注册器
import 'virtual:svg-icons-register'

// 引入vue-i18n实例
import i18n from "@/locales/index.ts";
// 引入对外暴露的pinia实例
import pinia from "@/stores/index.ts";
// 引入定义的路由
import router from "@/router/index.ts";
// 引入自定义插件管理器
import PluginManager from "@/plugins/PluginManager.ts";
import { directive } from "@/directives/index.ts";

// 创建vue实例
const app = createApp(App);
// 注册自定义指令
directive(app)

// 直接采用批量自定义插件安装 installPlugins
const pluginManager = new PluginManager();
pluginManager.installPlugins(app);

// 应用级错误处理 可以用来向追踪服务报告错误
app.config.errorHandler = (error) => {
    /* 处理错误 */
    console.log("the error is: " + error);
};

// 注册i18n
app.use(i18n);
// 注册pinia
app.use(pinia)
// 注册路由
app.use(router)
// 将vue实例挂载到#app元素上
app.mount('#app')
