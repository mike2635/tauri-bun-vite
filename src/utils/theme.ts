// 全局主题切换工具


// 通过将 .theme-transition 类应用于 document.documentElement，你可以确保整个文档中的所有元素都继承了过渡样式，从而在主题切换时都会显示过渡效果。
// 例如，你可以这样修改 JavaScript 代码来添加 .theme-transition 类：
// document.documentElement.classList.add('theme-transition');
// 然后，你可以在 document.documentElement 上应用其他与主题切换相关的类，例如 .theme-light 或 .theme-dark，以实现主题切换的效果。

// 系统第一次初始化时，默认使用的主题,并添加主题切换过渡动画
export const themeInit = () => {
    // document.documentElement 代表的就是 html 根元素
    let htmlElement = document.documentElement;
    htmlElement.setAttribute('theme-color', 'classical-light');
    htmlElement.classList.add('theme-transition');
}

// 全局主题切换示例
// 实现思路，先定义一个全局状主题态标识 flag 并设置默认值，例如 light，系统初始化加载时，使用默认设置的主题。然后当点击切换主题时，将想要切换的主题名称传递过来
// 主题分为两大类，经典--classical  毛玻璃--glass    每一类又有明暗两种
// 需要考虑的问题，在主题切换时，如果速度过快会很突兀，怎么添加一个主题切换过渡动画
export const toggleThemeByName = (theme: string) => {
    // 直接切换 html 更元素的选择
    if (theme === 'classical-light') {
        document.documentElement.setAttribute('theme-color', 'classical-light');
    } else if (theme === 'classical-dark') {
        document.documentElement.setAttribute('theme-color', 'classical-dark');
    } else if (theme === 'glass-light') {
        document.documentElement.setAttribute('theme-color', 'glass-light');
    } else if (theme === 'glass-dark') {
        document.documentElement.setAttribute('theme-color', 'glass-dark');
    }
}

// 切换毛玻璃主题
export const toggleGlassTheme = () => {
    let rootElement = document.documentElement;
    // 直接切换 html 更元素的选择
    document.documentElement.setAttribute('theme-color', 'dark');
    rootElement.style.setProperty("--theme-glass-light-bg-color", "rgba(90, 90, 90, 0.2)")
}

// 切换普通模式的明暗主题
export const toggleNormalTheme = () => {
    let rootElement = document.documentElement;
    rootElement.style.setProperty("--theme-glass-light-bg-color", "rgba(90, 90, 90, 0.2)")
}

// 定义一个主题类型枚举
export enum ThemeType {
    NormalLight = "normal-light",
    NormalDark = "normal-dark",
    GlassLight = "glass-light",
    GlassDark = "glass-dark"
}

// 一个函数，通过参数动态确定具体要切换哪个主题
export const toggleTheme = (themeType: ThemeType) => {
    // 获取所有使用了
    const elements = document.getElementsByClassName("theme-flag")
    let htmlElement = document.documentElement;
    // 切换普通模式的明暗主题
    if (themeType === ThemeType.NormalLight) {
        for (const element of elements) {
            // 点击时，如果当前元素存在毛玻璃样式，则去掉
            if (element.classList.contains("theme-normal-dark")) {
                element.classList.remove("theme-normal-dark")
            } else if (element.classList.contains("theme-glass-light")) {
                element.classList.remove("theme-glass")
                element.classList.remove("theme-glass-light")
            } else if (element.classList.contains("theme-glass-dark")) {
                element.classList.remove("theme-glass")
                element.classList.remove("theme-glass-dark")
            }
            htmlElement.style.setProperty("--theme-background-color", "#fff");
            element.classList.add("theme-normal-light")
        }
    } else if (themeType === ThemeType.NormalDark) {
        for (const element of elements) {
            // 点击时，如果当前元素存在毛玻璃样式，则去掉
            if (element.classList.contains("theme-normal-light")) {
                element.classList.remove("theme-normal-light")
            } else if (element.classList.contains("theme-glass-light")) {
                element.classList.remove("theme-glass")
                element.classList.remove("theme-glass-light")
            } else if (element.classList.contains("theme-glass-dark")) {
                element.classList.remove("theme-glass")
                element.classList.remove("theme-glass-dark")
            }
            element.classList.add("theme-normal-dark")
            htmlElement.style.setProperty("--theme-background-color", "rgba(15, 15, 15, 0.71)");
        }
    } else if (themeType === ThemeType.GlassLight) {
        // 切换毛玻璃主题
        for (const element of elements) {
            // 点击时，如果当前元素存在毛玻璃样式，则去掉
            if (element.classList.contains("theme-normal-light")) {
                element.classList.remove("theme-normal-light")
            } else if (element.classList.contains("theme-normal-dark")) {
                element.classList.remove("theme-normal-dark")
            } else if (element.classList.contains("theme-glass-dark")) {
                element.classList.remove("theme-glass-dark")
            }
            element.classList.add("theme-glass")
            element.classList.add("theme-glass-light")
        }
    } else if (themeType === ThemeType.GlassDark) {
        for (const element of elements) {
            // 点击时，如果当前元素存在毛玻璃样式，则去掉
            if (element.classList.contains("theme-normal-light")) {
                element.classList.remove("theme-normal-light")
            } else if (element.classList.contains("theme-normal-dark")) {
                element.classList.remove("theme-normal-dark")
            } else if (element.classList.contains("theme-glass-light")) {
                element.classList.remove("theme-glass-light")
            }
            element.classList.add("theme-glass")
            element.classList.add("theme-glass-dark")
        }
    }
}

// TODO 应当有更多，例如普通模式的明暗主题、毛玻璃明暗主题

// 应该是通过 :root 全局样式变量来实现。具体该怎么实现，待分析研究

// 动态切换毛玻璃的边框圆角
export const toggleGlassRadius = () => {
    // 获取所有添加了毛玻璃的元素
    const elements = document.getElementsByClassName("radius-flag")
    for (const element of elements) {
        // 点击时，如果当前元素存在毛玻璃样式，则去掉
        if (element.classList.contains("glass-radius")) {
            element.classList.remove("glass-radius")
        } else {
            element.classList.add("glass-radius")
        }
    }
}