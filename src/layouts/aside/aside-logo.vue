<script setup lang="ts">
import { useThemeConfig } from '@/stores/modules/themeConfig';
import SvgIcon from "@/components/svg-icon/svg-icon.vue";
import {useRouter} from "vue-router";

// 定义变量内容
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

// 设置 logo 的显示。classic 经典布局默认显示 logo
const setShowLogo = computed(() => {
  let { isCollapse, layout } = themeConfig.value;
  return !isCollapse || layout === 'classic' || document.body.clientWidth < 1000;
});

const handleLogoClick = () => {
  useRouter().push("/")
}
</script>

<template>
  <div class="aside-logo" @click="handleLogoClick">
    <div class="layout-logo" v-if="setShowLogo">
      <span>{{ themeConfig.globalTitle }}</span>
    </div>

    <div class="layout-logo-size" v-else>
      <el-icon size="35">
        <svg-icon name="login-logo" size="30"></svg-icon>
      </el-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.aside-logo {
  background-color: #79bbff;
  width: 220px;
  transition: width 3s ease-in-out;
}
.layout-logo {
  width: 220px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgb(0 21 41 / 2%) 0 1px 4px;
  color: var(--el-color-primary);
  font-size: 16px;
  cursor: pointer;
  animation: logoAnimation 0.3s ease-in-out;
  span {
    white-space: nowrap;
    display: inline-block;
    font-size: 21.5px;
    font-weight: 700;
  }
}
.layout-logo-size {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: logoAnimation 0.3s ease-in-out;
}

/* logo 过渡动画 */
@keyframes logoAnimation {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}


@keyframes wipe-in-right {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

[transition-style="in:wipe:right"] {
  animation: 2s cubic-bezier(.25, 1, .30, 1) wipe-in-right both;
}
</style>
