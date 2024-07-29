<script lang="ts" setup>
import { ref } from 'vue'
import {RouteLocationNormalizedLoaded} from "vue-router";
import {TabsPaneContext} from "element-plus";

const router = useRouter()
// 当前激活的tab下标
const activeTabIndex = ref(0)
// 动态tab数组
const dynamicTabs = ref<RouteLocationNormalizedLoaded[]>([])

// 监听当前路由变化，实现动态添加tag
// 动态添加tag，添加之前检查这个名称的tag在dynamicTags是否已经存在
watch(
    () => router.currentRoute.value,
    // newValue 是当前将听的路由对象
    (newValue) => {
      // TODO 当路由发生变化时，先判断是新增还是跳转
      if (dynamicTabs.value.length === 0) {
        dynamicTabs.value.push(newValue)
        activeTabIndex.value = dynamicTabs.value.indexOf(newValue)
        router.push(newValue.fullPath)
      } else {
        // dynamicTabs 中是否存在 newValue 同名路由标识
        let flag = false
        // 遍历所有 dynamicTabs 中的路由
        dynamicTabs.value.forEach((tab, index) => {
          // 如果在 dynamicTabs 中存在同名的路由，直接跳转并激活
          if (tab.meta.title === newValue.meta.title) {
            console.log("已存在相同tab")
            // 如果 dynamicTags 中已经存在同名tag则直接跳转，不在重复添加,直接跳转过去
            activeTabIndex.value = index
            router.push(newValue.fullPath)
            flag = true
          }
        })
        // 如果 dynamicTabs 中不存在于 newValue 同名路由，则直接添加、激活、跳转
        if (!flag) {
          console.log("不存在相同tab")
          // 如果 dynamicTags 中不存在同名tag
          dynamicTabs.value.push(newValue)
          activeTabIndex.value = dynamicTabs.value.indexOf(newValue)
          router.push(newValue.fullPath)
        }
      }
    },
    {immediate: true}
)

// targetIndex 是被删除的 tab 的索引。activeIndex 是当前激活的 tab 的索引。
// 也需要在 el-tab-pane 上对应使用 :name="index"
const removeTab = (targetIndex: number) => {
  console.log('remove tab', targetIndex)
  const tabs = dynamicTabs.value
  let activeIndex = activeTabIndex.value
  console.log("activeIndex: ", activeIndex)
  // 如果删除的 tab 是当前激活的 tab，则激活下一个 tab。分两种情况
  if (activeIndex === targetIndex) {
    // 遍历 tabs，找到目标 tab 并根据情况激活下一个 tab
    // 如果删除的 tab 是最后一个 tab，则让 activeIndex 等于它前一个 tab 的 index
    // 如果删除的 tab 不是最后一个 tab，则让 activeIndex 等于它后一个 tab 的 index
    tabs.forEach((tab, index) => {
      console.log(tab.path)
      if (index === targetIndex) {
        // nextTab 为下一个激活的 tab，如果存在则激活并跳转
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          // 使用findIndex()方法查找目标路由在数组中的索引
          // dynamicTabs.value.findIndex(route => route.path === tab.path)
          activeIndex = dynamicTabs.value.indexOf(nextTab)
          router.push(nextTab.fullPath)
        }
      }
    })
  }
  // 路由跳转后，更新当前激活的 tab 的 activeTabIndex 下标值
  activeTabIndex.value = activeIndex
  // 如果关闭的目标tab不是激活的tab，则直接将目标tab从 dynamicTabs 中移除。filter 中符合条件的将被收集
  dynamicTabs.value = tabs.filter((tab) => dynamicTabs.value.indexOf(tab) !== targetIndex)
}

// 当tab被点击后触发，1、路由跳转 2、激活状态
const handleTabClick = (pane: TabsPaneContext) => {
  const index = parseInt(<string>pane.index)
  const route = dynamicTabs.value[index]
  activeTabIndex.value = index
  router.push(route.fullPath)
}
</script>

<template>
  <el-tabs
      v-model="activeTabIndex"
      type="card"
      closable
      class="demo-tabs"
      @tab-remove="removeTab"
      @tab-click="handleTabClick"
  >
    <el-tab-pane
        v-for="(item, index) in dynamicTabs"
        :key="index"
        :label="item.meta.title"
        :name="index"
    >
      {{ item.meta.title }}
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss">
// 去除 el-tabs 自带的 content 显示，只保留 tab 内容
:deep(.el-tabs__content) {
  display: none;
}
// 去除 el-tabs 自带的 tab 下外边距样式，默认和 tab 内容存在 15px 的间距
:deep(.el-tabs__header) {
  margin: 0;
}
// 修改 el-tabs 自带的 tab 选中激活样式
:deep(.el-tabs__header .el-tabs__item.is-active) {
  border-bottom: 2px solid #79bbff;
  background-color: #ecf5ff;
}
// 以下是样式是 tab 项悬浮样式
:deep(.el-tabs__header .el-tabs__item) {
  vertical-align: middle;
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  overflow: hidden;
}
// 鼠标悬浮在 tab 项上时，显示悬浮样式，非激活状态的 tab 项上悬浮样式
:deep(.el-tabs__item:not(.is-active):before) {
  content: "";
  position: absolute;
  z-index: -1;
  left: 51%;
  right: 51%;
  bottom: 0;
  background: #79bbff;
  height: 2px;
  -webkit-transition-property: left, right;
  transition-property: left, right;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
:deep(.el-tabs__item:hover:before,
.el-tabs__item:focus:before,
.el-tabs__item:active:before) {
  left: 0;
  right: 0;
}
</style>
