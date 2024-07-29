<script setup lang="ts">
// 实现思路为，将 dynamicTabs 搬到 store 中
import {Back, Close, FullScreen, Minus, Refresh, Right} from "@element-plus/icons-vue";

const handleClickRefresh = () => {

}

const handleClickLeft = () => {

}

const handleClickRight = () => {

}

const handleClickAround = () => {

}

const handleClickClose = () => {

}
</script>

<template>
  <div class="header-tab-bar">
    <el-dropdown trigger="click">
            <span class="el-dropdown-link">
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="Refresh" @click="handleClickRefresh">重新加载</el-dropdown-item>
          <el-dropdown-item :icon="Back" @click="handleClickLeft">关闭左侧</el-dropdown-item>
          <el-dropdown-item :icon="Right" @click="handleClickRight">关闭右侧</el-dropdown-item>
          <el-dropdown-item :icon="Minus" @click="handleClickAround">关闭其它</el-dropdown-item>
          <el-dropdown-item :icon="Close" @click="handleClickClose">关闭所有</el-dropdown-item>
          <el-dropdown-item :icon="FullScreen" @click="handleClickClose">全屏</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
.header-tab-bar {
  width: 20px;
  height: 40px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #dcdfe6;
}
.block-col-2 .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>