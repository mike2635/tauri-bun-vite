<script setup lang="ts">
import BreadCrumb from "@/layouts/header/top/left/bread-crumb.vue";
import LanguageSwitch from "@/layouts/header/top/right/language-switch.vue";
import ThemeSwitch from "@/layouts/header/top/right/theme-switch.vue";
import SystemSetting from "@/layouts/header/top/right/system-setting.vue";
import UserAvatar from "@/layouts/header/top/right/user-avatar.vue";
import PageRefresh from "@/layouts/header/top/right/page-refresh.vue";
import FullscreenSwitch from "@/layouts/header/top/right/fullscreen-switch.vue";
import MessageBox from "@/layouts/header/top/right/message-box.vue";
import TagView from "@/layouts/header/bottom/tag-view.vue";
import TagViewBar from "@/layouts/header/bottom/tag-view-bar.vue";
</script>

<template>
  <el-header class="layout-header">
    <!-- 头部组件上面的区域，包括左侧面包屑、右侧的其他功能组件 -->
    <div class="header-top">
      <!-- 头部组件上面的左侧组件, 面包屑 -->
      <div class="top-left">
        <bread-crumb></bread-crumb>
      </div>
      <!-- 头部组件上面的右侧组件, 其他功能组件 -->
      <div class="top-right">
        <fullscreen-switch></fullscreen-switch>
        <language-switch></language-switch>
        <theme-switch></theme-switch>
        <message-box></message-box>
        <page-refresh></page-refresh>
        <system-setting></system-setting>
        <user-avatar></user-avatar>
      </div>
    </div>
    <!-- 头部组件下面的 tag-view 标签栏 -->
    <div class="header-bottom">
      <tag-view></tag-view>
      <tag-view-bar></tag-view-bar>
    </div>
  </el-header>
</template>

<style scoped lang="scss">
.layout-header {
  height: 100px;
  // 覆盖掉 el-header 的默认内边距样式
  padding: 0;
  display: flex;
  flex-direction: column;
  .header-top {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .top-left {
      // inherit 意为继承父元素的高度
      height: inherit;
    }
  }
  .header-bottom {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

</style>