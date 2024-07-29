<template>
    <!-- 做一个切换登录页的功能 -->
    <div class="login-switch">
        <el-dropdown>
            <span class="el-dropdown-link">
                切换登录页
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <!-- TODO 添加一个点击选择后触发激活状态 -->
                <el-dropdown-menu>
                    <el-dropdown-item :disabled="flag" @click="handleLoginType('demo')">默认登陆页</el-dropdown-item>
                    <el-dropdown-item :disabled="!flag" @click="handleLoginType('glass')">毛玻璃登录页</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import { useRouter } from 'vue-router'
import {useHeader} from "@/store/modules/header.ts";
import {storeToRefs} from "pinia";
const router = useRouter()

const headerStore = useHeader()
const store = storeToRefs(headerStore)

// 登录页选中标识
const flag = computed(() => {
    return store.loginType.value === "demo"
})

// 登录页切换
const handleLoginType = (type: string) => {
    console.log("the login type is " + type)
    // 设置标识
    store.loginType.value = type;
    // 跳转至默认登陆页
    router.push(`/user/login/${type}`)
}
</script>

<style scoped lang="scss">
// .login-switch {
//     position: absolute;
//     right: 20px;
//     top: 20px;
// }
</style>
