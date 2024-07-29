<template>
  <!-- el-container 容器必须直接包含 el-header 和 el-main 标签，否则会导致样式错乱。layout布局无效 -->
  <el-container class="layout-container">
    <layout-aside></layout-aside>
    <el-container class="layout-right">
      <layout-header></layout-header>
      <layout-main></layout-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import LayoutAside from "@/layouts/aside/layout-aside.vue";
import LayoutHeader from "@/layouts/header/layout-header.vue";
import LayoutMain from "@/layouts/main/layout-main.vue";
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  > .layout-right {
    display: flex;
    flex-direction: column;
  }
}
</style>
