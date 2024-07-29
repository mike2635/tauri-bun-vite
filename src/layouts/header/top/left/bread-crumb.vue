<script setup lang="ts">
import {useThemeConfig} from "@/stores/modules/themeConfig.ts";

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

// 展开/收起左侧菜单点击
const onThemeConfigChange = () => {
  themeConfig.value.isCollapse = !themeConfig.value.isCollapse;
  setLocalThemeConfig();
};

// 设置本地存储的主题配置
const setLocalThemeConfig = () => {
  localStorage.setItem("themeConfig", JSON.stringify(themeConfig.value));
};

const route = useRoute()
</script>

<!--TODO 感觉元素没有垂直对其，需要调整-->
<template>
  <div class="collapse-breadcrumb">
    <!-- 左侧导航菜单的伸缩控制图标 -->
    <el-icon size="20" @click="onThemeConfigChange">
      <component :is="themeConfig.isCollapse ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
          v-for="item in route.matched"
          :key="item.path"
          v-show="item.meta.title"
          :to='item.path'>
        {{ item.meta?.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>


<style scoped lang="scss">
.collapse-breadcrumb {
  height: inherit;
  display: flex;
  align-items: center;
  > * {
    margin: 0 10px;
    height: inherit;
  }
  > :last-child {
    display: flex;
    align-items: center;
  }
}

:deep(.el-breadcrumb__item) {
  height: inherit;
  display: flex;
  align-items: center;
}

.theme-config {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
  border-right: 1px solid #eee;
  cursor: pointer;

  .theme-config-title {
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }

  .theme-config-icon {
    margin-right: 10px;
  }
}
</style>