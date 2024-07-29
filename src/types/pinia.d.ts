/**
 * pinia 类型定义
 */

// 用户信息
export interface UserInfosState<T> {
    userInfos: {
        authBtnList: string[];
        photo: string;
        roles: string[];
        time: number;
        userName: string;
        [key: string]: T;
    };
}

// 路由缓存列表
export interface KeepAliveNamesState {
    keepAliveNames: string[];
    cachedViews: string[];
}

// 后端返回原始路由(未处理时)
export interface RequestOldRoutesState {
    requestOldRoutes: string[];
}

// TagsView 路由列表
export interface TagsViewRoutesState<T> {
    tagsViewRoutes: T[];
    isTagsViewCurrenFull: boolean;
    favoriteRoutes: T[];
}

// 路由列表
export interface RoutesListState<T> {
    routesList: T[];
    isColumnsMenuHover: boolean;
    isColumnsNavHover: boolean;
}

// 布局配置
export interface ThemeConfigState {
    themeConfig: {
        isDrawer: boolean;
        primary: string;
        topBar: string;
        topBarColor: string;
        isTopBarColorGradual: boolean;
        menuBar: string;
        menuBarColor: string;
        menuBarActiveColor: string;
        isMenuBarColorGradual: boolean;
        columnsMenuBar: string;
        columnsMenuBarColor: string;
        isColumnsMenuBarColorGradual: boolean;
        isColumnsMenuHoverPreload: boolean;
        isCollapse: boolean;
        isUniqueOpened: boolean;
        isFixedHeader: boolean;
        isFixedHeaderChange: boolean;
        isClassicSplitMenu: boolean;
        isLockScreen: boolean;
        lockScreenTime: number;
        isShowLogo: boolean;
        isShowLogoChange: boolean;
        isBreadcrumb: boolean;
        isTagsview: boolean;
        isBreadcrumbIcon: boolean;
        isTagsviewIcon: boolean;
        isCacheTagsView: boolean;
        isSortableTagsView: boolean;
        isShareTagsView: boolean;
        isFooter: boolean;
        isGrayscale: boolean;
        isInvert: boolean;
        isIsDark: boolean;
        isWartermark: boolean;
        wartermarkText: string;
        tagsStyle: string;
        animation: string;
        columnsAsideStyle: string;
        columnsAsideLayout: string;
        layout: string;
        isRequestRoutes: boolean;
        globalTitle: string;
        globalViceTitle: string;
        globalViceTitleMsg: string;
        globalI18n: string;
        globalComponentSize: string;
        footerAuthor: string;
    };
}
