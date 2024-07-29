import {RouteLocationNormalizedLoaded, RouteRecordName} from "vue-router";

// 定义响应数据类型
export interface ResponseData<T> {
    code: number;
    status: string;
    msg: string;
    data: T;
}


export type cacheType = {
    mode: string;
    name?: RouteRecordName;
};

export type positionType = {
    startIndex?: number;
    length?: number;
};

export type appType = {
    sidebar: {
        opened: boolean;
        withoutAnimation: boolean;
        // 判断是否手动点击Collapse
        isClickCollapse: boolean;
    };
    layout: string;
    device: string;
    sortSwap: boolean;
};

export type multiType = {
    path: string;
    name: string;
    meta: any;
    query?: object;
    params?: object;
};

export type setType = {
    title: string;
    fixedHeader: boolean;
    hiddenSideBar: boolean;
};

export type userType = {
    username?: string;
    roles?: Array<string>;
    verifyCode?: string;
    currentPage?: number;
};


// 应用系统相关的对象结构，类比Java中的实体类

// 操作系统信息
export interface SystemInfo {
    osName: string;
    osArch: string;
    osVersion: string;
    computerName: string;
}

// 内存信息
export interface RamInfo {
    ramSize: number;
    ranUsed: number;
    ramFree: number;
    ramUsage: number;
}

// 磁盘信息
export interface DiskInfo {
    diskName: string;
    diskType: string;
    diskSize: number;
    diskUsed: number;
}

// CPU信息
export interface CpuInfo {
    cpuModel: string;
    cpuNum: number;
    usageRate: number;
}


// 分页数据
export interface PageInfo {
    pageSize: number;
    currentPage: number;
    total: number;
}

export interface HeaderState {
    collapse: false;
    refresh: false;
    theme: false;
    search: false;
    setting: false;
    drawer: false;
    language: string;
}

export interface RouteState {
    dynamicTabs: Array<RouteLocationNormalizedLoaded>;
    constantRoutes: Array<RouteLocationNormalizedLoaded>;
    layoutsRoutes: Array<RouteLocationNormalizedLoaded>;
    dynamicRoutes: Array<RouteLocationNormalizedLoaded>;
}

export interface UserState {
    pageSize: number;
    currentPage: number;
    total: number;
}

// 作用类似于后端的VO或者DTO类
// 登录
export interface LoginData {
    email: string;
    password: string;
}

// 属性或参数中使用 ？：表示该属性或参数为可选项
// 属性或参数中使用 ！：表示强制解析，变量后使用 ！：表示类型推断排除null、undefined

// interface 和 type 被 TS 设计出来，是完全不同的东西，有各自的职责。type在使用时需要使用 = 等于号进行类型别名赋值
// interface 是接口，用于描述一个对象。类比Java中的接口
// type 是类型别名，用于给各种类型定义别名，让 TS 写起来更简洁、清晰。
// 只是有时候两者都能实现同样的功能，才会经常被混淆
// 平时开发中，一般使用组合或者交叉类型的时候，用 type。
// 一般要用类的 extends 或 implements 时，用 interface。

