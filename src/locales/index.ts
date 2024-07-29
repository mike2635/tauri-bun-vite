import { createI18n } from "vue-i18n";
import en from "@/locales/lang/en-US.ts";
import zh from "@/locales/lang/zh-CN.ts";

// 创建语言翻译库对象
const messages = {
    en,
    zh,
};

// TODO 这个国际化只对于被 $() 符号包裹的配置有效，而对于 element-plus 的内置组件国际化无效
//  因此，还需要考虑在切换语言环境时，如何同步切换 element-plus 的语言环境。
// 创建一个 vue-i18n 实例，并配置实例，示例如下
const i18n = createI18n({
    locale: "zh", // 当前的语言环境，比如 'en', 'zh' 等。默认值是 'zh'。可以通过切换 locale 值来切换语言环境。
    legacy: false, // 是否使用 Vue-i18n 的旧版 API。默认值是 false，表示使用 Vue 3 兼容的新版 API。
    fallbackLocale: 'zh', // 设置备用语言
    globalInjection: true, // 是否将 $t、$d 和 $n 方法注入到所有组件的模板中。默认值是 false。
    messages: messages, // 载入语言翻译库，包含各种语言环境的翻译信息的对象
});

// 将国际化方法注入符号 t 全局导出
// $t() 和 t() 两者的用法相同，但使用侧重场景不同，尽量不要在同一个文件中，同时使用者两种用法。我们约定如下：
// $t() 用于 Vue 组件，在任何 Vue 单文件组件中，统一使用 $t()
// t() 适用于非 Vue 组件的场景。在任何 .ts 文件中，统一使用 t()
// export const { t, locale } = useI18n(); 不可以在ts文件中使用useI18n()函数，他必须在 setup 模式下使用
// 要想在 ts 文件中使用 t 目前只知道如下方法，在 ts 文件中导入我们暴露的 i18n 实例，然后从中解构出 global
// import i18n from "@/locales/index.ts";
// const t = i18n.global.t;
// 最后这样使用	title: t("route.home"),
export default i18n;

// 切换语言环境，需要同步切换 element-plus 的语言环境。
// element plus 自带国际化
import enUS from 'element-plus/dist/locale/en.mjs'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const language = ref('zh-cn')
const epLocale = computed(() => (language.value === 'zh-cn' ? zhCn : enUS))

export const toggle = () => {
    console.log(epLocale)
    language.value = language.value === 'zh-cn' ? 'en' : 'zh-cn'
}