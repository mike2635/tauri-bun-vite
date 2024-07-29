import {RouteRecordRaw} from "vue-router"
import Layout from "@/layouts/layout-index.vue"

// $t() 用于 Vue 组件，在任何 Vue 单文件组件中，统一使用 $t()
// t() 适用于非 Vue 组件的场景。在任何 .ts 文件中，统一使用 t()
// 要想在 ts 文件中使用 t 目前只知道如下方法，在 ts 文件中导入我们暴露的 i18n 实例，然后从中解构出 global
// TODO 为了和 Vue 组件的 $t() 保持一致，将接受的变量名改为 $t 而不是 t
// const $t = i18n.global.t;

/**
 * 定义layout页面路由（默认路由）
 * 前端添加路由，请在此处加，每天加一个layout布局下的views目录下的vue文件
 */
export const dynamicRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/home/home.vue'),
                meta: {
                    title: "首页",
                    icon: 'HomeFilled',
                },
            },
        ],
    },
    {
        path: '/user',
        name: 'user',
        component: Layout,
        meta: {
            title: "用户管理",
            icon: 'UserFilled',
        },
        children: [
            {
                path: '/user-info',
                name: 'user-info',
                component: () => import('@/views/user/user-info.vue'),
                meta: {
                    title: "用户信息",
                    icon: 'HomeFilled',
                },
            },
            {
                path: '/user-center',
                name: 'user-center',
                component: () => import('@/views/user/user-center.vue'),
                meta: {
                    title: "用户中心",
                    icon: 'HomeFilled',
                },
            },
        ],
    },
    {
        path: '/user1',
        name: 'user1',
        component: Layout,
        children: [
            {
                path: '/user-info1',
                name: 'user-info1',
                component: () => import('@/views/user/user-info.vue'),
                meta: {
                    title: "用户信息",
                    icon: 'HomeFilled',
                },
            },
        ],
    },

];

/**
 * 定义静态非layout路由（登录、注册、404、401错误异常等基础路由）
 */
export const staticRoutes: Array<RouteRecordRaw> = [
    {
        path: '/normal/login',
        name: 'normal.login',
        component: () => import('@/views/login/normal/normal-login.vue'),
        meta: {
            hidden: true,
            requiresAuth: false,
        },
    },
    {
        path: '/normal/register',
        name: 'normal.register',
        component: () => import('@/views/login/normal/normal-register.vue'),
        meta: {
            hidden: true,
            requiresAuth: false,
        },
    },
    {
        path: '/glass/login',
        name: 'glass.login',
        component: () => import('@/views/login/glass/glass-login.vue'),
        meta: {
            hidden: true,
            requiresAuth: false,
        },
    },
    {
        path: '/glass/register',
        name: 'glass.register',
        component: () => import('@/views/login/glass/glass-register.vue'),
        meta: {
            hidden: true,
            requiresAuth: false,
        },
    },
    {
        path: '/401',
        name: 'staticRoutes.notAuth',
        component: () => import('@/views/error/401.vue'),
        meta: {
            hidden: true,
        },
    },
    {
        path: '/404',
        name: 'staticRoutes.notFound',
        component: () => import('@/views/error/404.vue'),
        meta: {
            hidden: true,
        },
    },
];