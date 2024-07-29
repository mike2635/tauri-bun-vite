<script setup lang="ts">
import AsideMenu from "@/layouts/aside/aside-menu.vue";
</script>

<template>
  <el-aside class="layout-aside">
<!--    <aside-logo></aside-logo>-->
    <el-scrollbar>
      <aside-menu></aside-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped lang="scss">
.layout-aside {
  width: auto;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.el-aside {
  color: var(--el-text-color-primary);
  background-color: #545c64;
}

.layout-container .el-menu {
  border-right: none;
}
</style>