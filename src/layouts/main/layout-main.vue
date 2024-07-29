<script setup lang="ts">

// 设置 Backtop 回到顶部
// const setBacktopClass = computed(() => {
//   if (themeConfig.value.isFixedHeader) return `.layout-backtop-header-fixed .el-scrollbar__wrap`;
//   else return `.layout-backtop .el-scrollbar__wrap`;
// });
</script>

<template>
  <el-main>
    <el-scrollbar>
      <!-- 这里是路由页面内容展示出口，也就是路由匹配到的组件，即 views 目录下的文件 -->
      <!-- 使用 v-slot 作用域插槽期望接收子组件 props 数据，并使用了对象解构 -->
      <!-- router-view 组件一共可以获取 { Component, route } 两个元素 -->
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'square-in-center'" mode="out-in">
          <keep-alive max="10">
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </router-view>
    </el-scrollbar>
  </el-main>
</template>

<style scoped lang="scss">

</style>