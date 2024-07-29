<template>
  <div class="simple-statistic">
    <el-row :gutter="20">

      <el-col :span="6">
        <div class="statistic-card theme-glass theme-glass-dark">
          <el-statistic :value="98500">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Daily active users
                <el-tooltip
                    effect="dark"
                    content="Number of users who logged into the product in one day"
                    placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>than yesterday</span>
              <span class="green">
              24%
              <el-icon>
                <CaretTop />
              </el-icon>
            </span>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="statistic-card theme-glass theme-glass-dark">
          <el-statistic :value="98500">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Daily active users
                <el-tooltip
                    effect="dark"
                    content="Number of users who logged into the product in one day"
                    placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>than yesterday</span>
              <span class="green">
              24%
              <el-icon>
                <CaretTop />
              </el-icon>
            </span>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="statistic-card theme-glass theme-glass-dark">
          <el-statistic :value="693700">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Monthly Active Users
                <el-tooltip
                    effect="dark"
                    content="Number of users who logged into the product in one month"
                    placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>month on month</span>
              <span class="red">
              12%
              <el-icon>
                <CaretBottom />
              </el-icon>
            </span>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="statistic-card theme-glass theme-glass-dark">
          <el-statistic :value="72000" title="New transactions today">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                New transactions today
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>than yesterday</span>
              <span class="green">
              16%
              <el-icon>
                <CaretTop />
              </el-icon>
            </span>
            </div>
            <div class="footer-item">
              <el-icon :size="14">
                <ArrowRight />
              </el-icon>
            </div>
          </div>
        </div>
      </el-col>

    </el-row>
  </div>

  <div class="">
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
  </div>
</template>

<script lang="ts" setup>
import {
  ArrowRight,
  CaretBottom,
  CaretTop,
  Warning,
} from '@element-plus/icons-vue'

const handleGlassToggle = () => {
  const elements = document.getElementsByClassName("statistic-card")
  for (const element of elements) {
    // 点击时，如果当前元素存在毛玻璃样式，则去掉
    if (element.classList.contains("box-glass-light")) {
      element.classList.remove("box-glass-light")
      element.classList.add("box-glass-dark")
    } else if (element.classList.contains("box-glass-dark")){
      element.classList.remove("box-glass-dark")
      element.classList.add("box-glass-light")
    }
  }
}

</script>

<style scoped lang="scss">
.simple-statistic {
  padding-bottom: 20px;
}

:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  height: 100%;
  border-radius: 4px;
  //background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>
