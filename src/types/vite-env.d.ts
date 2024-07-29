/// <reference types="vite/client" />

// 定义 .env[mode] 文件中自定义的环境变量类型
interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_BASE_URL: string;
    // 更多环境变量...
}

// 声明全局环境变量，在.env[mode] 文件中定义的环境变量会自动添加到全局环境变量中
// 这些环境变量可以在代码中通过 process.env.[ENV_NAME] 访问到
interface ImportMeta {
    readonly env: ImportMetaEnv;
}

/*
对于使用 TypeScript 的开发者来说，请确保在 env.d.ts 或 vite-env.d.ts 文件中添加类型声明，以获得类型检查以及代码提示。
随着在多环境 .env[mode] 文件中自定义了越来越多的环境变量，这些自定义环境变量必须以 VITE_ 为前缀
如果你想要在代码中获取这些以 VITE_ 为前缀的用户自定义环境变量的 TypeScript 智能提示。你需要配置此文件
* */
