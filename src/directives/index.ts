import {App} from "vue";
import {authDirective} from "@/directives/auth/authDirective.ts";

/**
 * 导出指令方法：v-xxx
 * @methods authDirective 用户权限指令，用法：v-auth
 * @methods wavesDirective 按钮波浪指令，用法：v-waves
 */
// 自定义指令一次性注册函数
// 自定义指令统一注册，便于管理。只需要在这里导入自定义指令文件，在main.ts中调用directive方法注册即可
export const directive = (app: App<Element>) => {
    // 用户权限指令
    authDirective(app);

    // 按钮波浪指令

    // 其他自定义指令注册
}