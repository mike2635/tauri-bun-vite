<script setup lang="ts">
import {useThemeConfig} from "@/stores/modules/themeConfig.ts";
import {useRouter} from "vue-router";

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

const router = useRouter()
// 获取路由配置, 用于渲染侧边栏菜单
const routes = router.options.routes

// 通过计算确定当前激活的路由
const defaultActive = computed(() => {
  const {fullPath} = router.currentRoute.value;
  return fullPath;
});

</script>

<template>
  <!-- router 是否启用 vue-router 模式。 启用该模式会在激活导航时以 index 作为 path 进行路由跳转 使用 default-active 来设置加载时的激活项 -->
  <el-menu
      v-for="(route, index) in routes" :key="index"
      router
      mode="vertical"
      class="el-menu-vertical-demo"
      :unique-opened="true"
      :default-active="defaultActive"
      :collapse="themeConfig.isCollapse"
  >

    <!-- 如果只有一个子路由 -->
    <el-menu-item v-if="route.children && route.children.length === 1" :index="route.path">
      <el-icon>
        <component :is="route.children[0].meta?.icon"></component>
      </el-icon>
      <template #title>{{ route.children[0].meta?.title }}</template>
    </el-menu-item>

    <!-- 如果有两个及以上子路由 -->
    <el-sub-menu v-if="route.children && route.children.length > 1" :index="route.path">
      <template #title>
        <el-icon>
          <component :is="route.meta?.icon"></component>
        </el-icon>
        <span>{{ route.meta?.title }}</span>
      </template>
      <!-- 遍历子路由 -->
      <el-menu-item v-for="(child, index) in route.children" :key="index" :index="child.path">
        <el-icon>
          <component :is="child.meta?.icon"></component>
        </el-icon>
        <template #title>{{ child.meta?.title }}</template>
      </el-menu-item>
    </el-sub-menu>

  </el-menu>
</template>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
}

</style>
