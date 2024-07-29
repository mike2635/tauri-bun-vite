<script setup lang="ts">
// import {useI18n} from "vue-i18n";

// 从全局 i18n 实例中获取 messages 和 locale
// const { messages, locale } = useI18n();
// 获取全局 i18n 并监听 locale 变化
// const currentLocale  = computed(() => {
//   return messages.value[locale.value];
// });
</script>

<template>
  <el-config-provider>
    <!-- 这是你的应用的主要内容展示出口，可以是任何你想展示的东西，比如路由视图、组件、页面等 -->
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
