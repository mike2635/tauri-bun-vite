<script setup lang="ts">
// 定义组件 props 即父组件传过来的值
const props = defineProps({
  // svg 图标前缀
  prefix: {
    type: String,
    default: "icon"
  },
  // svg 图标名称
  name: {
    type: String,
    required: true
  },
  // svg 图标颜色
  color: {
    type: String,
    default: ""
  },
  // svg 图标大小
  size: {
    type: [String, Number],
    default: 20
  }
})

// 通过计算属性生成 symbolId
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<!-- svg 图标组件封装 -->
<template>
    <svg aria-hidden="true" :width="size" :height="size">
        <use :href="symbolId" :fill="color"></use>
    </svg>
</template>


