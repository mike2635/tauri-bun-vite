// 路由守卫，进行路由权限认证

import router from "@/router";

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import {useUser} from "@/store/modules/user.ts";

// NProgress 进度条配置
NProgress.configure({
    easing: 'ease',
    speed: 500,
    trickleSpeed: 200,
    showSpinner: false,
});

// 获取用户信息
// const userStore = useUser()
// console.log(userStore)

// TODO 每次路由导航都需要鉴权，参考官方：https://router.vuejs.org/zh/guide/advanced/meta.html
// 在Vue3中，可以使用路由守卫实现路由鉴权。
// 路由守卫是Vue3中用于控制路由跳转的钩子函数，它可以在路由跳转前、后或者跳转过程中进行一些操作，比如验证用户身份、获取数据等。
// 路由跳转前置处理
router.beforeEach((to, from, next) => {
    console.log(from.fullPath)
    console.log(to)
    // 在路由导航开始之前先检查要去的路由是否存在，如果存在则继续下面的内容；如果不存在则重定向到 404 页面
    // if (router.hasRoute(to.name)) {
    //     next()
    // } else {
    //     next("/404")
    // }

    // 开始进度条
    NProgress.start()

    // console.log('我从' + from + '页面来')

    // TODO: 后续添加加载动画

    // 如果要前往的路由中存在requiresAuth标识，则表明该路由需要特殊权限才能访问。反之，则不需要鉴权，直接放行
    if (to.meta.requiresAuth) {
        // to.meta.requiresAuth && !auth.isLoggedIn()
        // 此路由需要授权，请检查是否已登录
        // 如果没有，则重定向到登录页面
        // 进行用户鉴权处理
        // 需要用户鉴权可分为两种情况，1、用户已登录、2、用户未登录

        // 1、用户已登录, user.isAuthenticated() 为true则放行
        if (true) {
            // 如果条件成立，继续导航
            next()
        } else {
            // 2、用户未登录,重定向到到登录页，让用户先登录
            next('/login')
        }

    } else {
        // 常量路由，不需要鉴权，直接放行
        next()
    }
})

// 路由跳转后置处理
router.afterEach(() => {
    NProgress.done()
})

// 导航故障，或者叫导航失败，表示一次失败的导航，
// 添加一个错误处理程序，每当导航过程中发生未捕获的错误时都会调用该程序。
// 这包括同步和异步抛出的错误，在任何导航保护中返回或传递给next的错误，以及在尝试解析呈现路由所需的异步组件时发生的错误。
// 直接参数为一个复合类型 _ErrorHandler ,用于包装多个参数。
// 路由发生错误后销毁进度条
router.onError((error, to, from) => {
    NProgress.remove()
    console.log(error.name)
    console.log(to.fullPath)
    console.log(from.fullPath)
    // TODO 根据错误类型重定向到对应页面
    router.push("/404")
    // if (error.name === "NetworkError") {
    //     console.log(error.type)
    // }
})
