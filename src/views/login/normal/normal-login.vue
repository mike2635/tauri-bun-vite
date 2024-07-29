<template>
  <div class="login-demo" data-tauri-drag-region>
    <!-- 登录页容器 -->
    <div class="login-container">
      <!-- 登录页头部区域 -->
      <div class="login-header">
        <div class="login-header-title">
          <!-- 项目登录页logo -->
          <svg-icon name="login-logo" size="40"></svg-icon>
          <!-- 项目名称 -->
          <span>龙茶清欢</span>
        </div>
        <div class="login-header-desc">
          Vue3 Admin 是有龙茶清欢制作的一个后台管理系统模板
        </div>
      </div>

      <!-- 登录页主体表单区域 -->
      <div class="login-main">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" :size="formSize"
                 status-icon>
          <div class="login-type-select">
            <el-tabs v-model="activeName">
              <el-tab-pane label="账号密码登录" name="first">
                <el-form-item prop="username">
                  <el-input v-model="ruleForm.username" size="large" :prefix-icon="User"
                            placeholder="用户名" />
                </el-form-item>
                <el-form-item prop="password">
                  <el-input v-model="ruleForm.password" size="large" type="password" show-password
                            :prefix-icon="Lock" placeholder="密码" />
                </el-form-item>
              </el-tab-pane>

              <el-tab-pane label="手机号登录" name="second">
                <el-form-item prop="phone">
                  <el-input v-model="ruleForm.phone" size="large" :prefix-icon="Iphone"
                            placeholder="手机号" />
                </el-form-item>
                <el-form-item prop="code">
                  <div class="phone-login-code">
                    <el-input v-model="ruleForm.code" size="large" :prefix-icon="ChatDotSquare"
                              placeholder="验证码" style="width: 65%" />
                    <el-button plain style="width: 25%">获取验证码</el-button>
                  </div>
                </el-form-item>
              </el-tab-pane>
            </el-tabs>
          </div>

          <el-form-item>
            <div class="remember-me">
              <el-checkbox v-model="ruleForm.checkbox" label="自动登录" size="large" />
              <div style="color: #409eff">
                <el-link type="primary" :underline="false" href="">忘记密码</el-link>
              </div>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button v-loading style="width: 100%" type="primary" @click="submitForm(ruleFormRef)">
              登录
            </el-button>
          </el-form-item>

          <el-form-item>
            <div class="other-login">
              <div class="other-login-left">
                <div>其他登陆方式</div>

                <div class="other-login-list">
                  <el-link :underline="false" href="">
                    <svg-icon name="QQ"></svg-icon>
                  </el-link>
                  <el-link :underline="false" href="">
                    <svg-icon name="weixin"></svg-icon>
                  </el-link>
                  <el-link :underline="false" href="">
                    <svg-icon name="bilibili"></svg-icon>
                  </el-link>
                </div>
              </div>

              <div style="color: #409eff">
                <el-link type="primary" :underline="false" href="/normal/register">注册账户</el-link>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <!-- 登录页尾部条款、帮助等信息区域 -->
      <div class="login-footer">
        <div class="login-footer-top">
          <span>
            <el-link :underline="false">官网</el-link>
          </span>
          <span>
            <el-link :underline="false">博客</el-link>
          </span>
          <span>
            <el-link :underline="false">打赏</el-link>
          </span>
        </div>
        <div class="login-footer-bottom">Copyright © 2022-2023 龙茶清欢 保留所有权利</div>
      </div>
    </div>

    <!-- 登录页的功能菜单 -->
    <login-bar></login-bar>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import SvgIcon from "@/components/svg-icon/svg-icon.vue";
import LoginBar from "@/views/login/LoginBar.vue";
import { User, Lock, Iphone, ChatDotSquare } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import { getTime } from "@/utils/time.ts";

// el-tabs 组件的涉及
const activeName = ref("first");

// 登录表单涉及
const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  username: "",
  password: "",
  phone: "",
  code: "",
  checkbox: false,
});

// 表单校验规则
const rules = reactive<FormRules>({
  // 一一个大括号 {} 就是一个校验规则， 个属性字段可以绑定一个或多个校验规则
  username: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "change",
    },
  ],
  phone: [
    {
      required: true,
      message: "手机号不能为空",
      trigger: "change",
    },
  ],
  code: [
    {
      type: "date",
      required: true,
      message: "Please pick a date",
      trigger: "change",
    },
  ],
});

const router = useRouter();

// 点击登录触发提交表单，进行表单校验，并发送登录请求
const submitForm = async (formEl: FormInstance | undefined) => {
  // 如果函数传递的参数不是 el-form 实例，则直接返回，不做处理
  if (!formEl) return;

  // 发送登录请求前的表单校验
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 校验成功，发送登录请求

      // 根据登录请求的响应结果做出相应处理
      // 如果 200 成功，跳转到首页，并弹出成功通知

      // 如果失败，弹出失败通知
      console.log("submit!");
    } else {
      // 表单校验不成功，可选择弹出提示
      console.log("error submit!", fields);
    }
  });

  // 如果发送登录请求后，后端核对成功，需要返回用户信息，并跳转到首页
  router.push("/");

  ElNotification({
    title: "欢迎回来",
    message: `${getTime()}好，主人！`,
    type: "success",
    duration: 3000,
  });
};
</script>

<style scoped lang="scss">
.login-demo {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: relative;

  background-color: rgb(240, 242, 245);
  background-image: url(@/assets/icons/background.svg);
  background-repeat: no-repeat;
  background-size: cover;
}

.login-container {
  width: 400px;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .login-header {
    width: 100%;
    margin-top: 64px;
    margin-bottom: 20px;

    .login-header-title {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;

      :last-child {
        font-size: 30px;
        margin-left: 20px;
      }
    }

    .login-header-desc {
      text-align: center;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
    }
  }

  .login-main {
    width: 100%;
    padding: 20px;

    .phone-login-code {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .remember-me {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .other-login {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .other-login-left {
        display: flex;
        align-items: center;

        .other-login-list {
          display: flex;
          align-items: center;
          line-height: 32px;
          margin-left: 10px;

          >* {
            margin-left: 10px;

            :hover {
              opacity: 0.8;
            }
          }
        }
      }
    }
  }

  .login-footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;

    .login-footer-top {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);

      >*:not(:last-child) {
        margin-right: 40px;
      }
    }

    .login-footer-bottom {
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
    }
  }
}

.el-form-item {
  width: auto;
  height: 40px;
}

.el-button {
  height: 40px;
}
</style>