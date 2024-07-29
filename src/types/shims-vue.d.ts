// shims-vue.d.ts 文件是一个类型声明文件，用于告诉 TypeScript 编译器如何处理 Vue 的单文件组件（SFC）和其他自定义模块。

// 声明一个模块，用于申明外部 npm 插件模块
declare module 'js-cookie';
declare module 'nprogress';

// 声明一个模块，用于匹配所有以 ".js"、".mjs"、".scss" 等结尾的文件，防止引入文件时报错
declare module '*.scss';
declare module '*.ts';
declare module '*.js';
declare module '*.mjs';

// 声明一个模块，用于匹配所有以 ".vue" 结尾的文件，并将其识别为一个 Vue 组件
declare module '*.vue' {
    // 从 "vue" 中导入 DefineComponent 类型
    import type { DefineComponent } from 'vue'

    // 定义一个类型为 DefineComponent 的变量 component
    // 它具有三个泛型参数，分别表示组件的 props、组件的 data 和其他的类型。
    // 在这里，我们使用空对象（{}）表示没有 props，使用空对象（{}）表示没有 data，使用 any 表示其他类型可以是任意值。
    const component: DefineComponent<{}, {}, any>

    // 导出 component 变量，这样其他地方在导入 ".vue" 文件时，TypeScript 编译器会将它识别为一个 Vue 组件
    export default component
}