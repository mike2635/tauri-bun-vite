import axios from "axios";
import {refreshTokenAPI} from "@/api/auth.ts";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";

// 空值合并运算符 `??` 的作用是在左侧操作数为 null 或 undefined 时，返回右侧操作数的值；在左侧操作数为非 null 或非 undefined 时（包括 0、空字符串等），返回左侧操作数的值。类似Java中的三元表达式
const accessToken = localStorage.getItem("accessToken") ?? "";

// 创建一个axios实例对象
const instance = axios.create({
    // 使用vue-cli基于webpack构建的项目可以通过process.env获取系统变量,
    // 但在vite构建的项目中需要使用 import.meta.env来获取环境变量
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    // 自定义配置 axios 全局统一请求头
    headers: {
        // 指定发送的请求数据的格式
        'Content-Type': 'application/json',
        // 用于身份验证的凭据，通常用于发送 AccessToken
        'Authorization': `Bearer ${accessToken}`
    },
});

// 配置请求拦截器
instance.interceptors.request.use(
    (config) => {
        // TODO 检查请求是否合法，是否已认证
        // 在发送请求之前做些什么，进行请求拦截处理
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        // 发生请求异常时处理
        console.log("请求发生异常:", error.response)
        // 弹出错误消息提示
        ElMessage.error(error.response.message)
        return Promise.reject(error);
    }
);

// 配置响应拦截器
instance.interceptors.response.use(
    (response) => {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        // 将请求响应的数据体进行数据解构
        const {code, data, msg} = response.data
        console.log("响应对象:", response)
        console.log("响应数据:", data, "响应提示信息:", msg)
        // 如果响应状态码匹配则返回数据
        if (code === 200 || code === 201) {
            return response.data;
        } else {
            // 响应状态码不匹配则返回响应的msg
            return Promise.reject(msg)
        }
    },
    async (error) => {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        // 发生响应异常时处理
        const originalConfig = error.config;
        // 如果错误码为 401，表示 Token 过期，originalConfig._retry 默认为 false 表示非重新请求
        if (error.response.status === 401 && !originalConfig._retry) {
            // 标识已经尝试过一次重新请求。这是为了防止在重新请求过程中无限循环发起请求
            originalConfig._retry = true;

            // 使用 RefreshToken 向后端请求新的 AccessToken
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                // 发起请求并获取新的 AccessToken 并将新 AccessToken 存储在 localStorage 中
                const responseData = await refreshTokenAPI(refreshToken);
                const newAccessToken = responseData.data
                // 如果成功获取新的 AccessToken，则更新原始请求的 Authorization 头，并重新发起原始请求
                originalConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axios(originalConfig);
            } else {
                // RefreshToken 过期，引导用户重新登录
                // 跳转到登录页面或执行重新登录流程
                const router = useRouter()
                router.push("/login").then(error => {
                    console.log(error?.message)
                });
            }
        }

        console.log("响应发生异常:", error.response)
        // 弹出消息提示
        ElMessage.error(error.response.message)
        return Promise.reject(error);
    }
);

export default instance;
