import {createRouter, createWebHistory} from "vue-router";
import { dynamicRoutes, staticRoutes} from "@/router/modules/constant.ts";

// 创建路由
// TODO 所用的 store 中存放的数据都持久化到 localStorage 中，可以使用 pinia-plugin-persistedstate 插件完成
const router = createRouter({
    history: createWebHistory(),
    routes: [...dynamicRoutes, ...staticRoutes], // 将定义的路由传入
    // constantRoutes: constantRoutes,
    // 默认情况下，所有路由是不区分大小写的，并且能匹配带有或不带有尾部斜线的路由。例如，路由 /users 将匹配 /users、/users/、甚至 /Users/。这种行为可以通过 strict 和 sensitive 选项来修改，它们可以既可以应用在整个全局路由上，又可以应用于当前路由上：
    strict: true,
});

// 将创建的router路由暴露，使其在其他地方可以被引用
export default router;