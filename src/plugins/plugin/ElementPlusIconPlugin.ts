// element-plus的图标注册插件

// 引入element-plus的图标库
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import PluginInterface from "@/plugins/PluginInterface.ts";
import { App } from "vue";

export default class ElementPlusIconPlugin implements PluginInterface {
    install(app: App<Element>) {
        // 此处参考官网，意为将图标库中的每个图标都注册成组件
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component);
        }
    }
}
