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
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" :size="formSize" status-icon>
          <el-form-item prop="email">
            <el-input v-model="ruleForm.email" size="large" :prefix-icon="Message" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" size="large" type="password" show-password :prefix-icon="Lock"
                      placeholder="至少六位密码，区分大小写" />
          </el-form-item>

          <el-form-item prop="checkPassword">
            <el-input v-model="ruleForm.checkPassword" size="large" type="password" show-password :prefix-icon="Lock"
                      placeholder="确认密码" />
          </el-form-item>

          <el-form-item prop="phone">
            <el-input v-model="ruleForm.phone" size="large" :prefix-icon="Iphone" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item prop="code">
            <div class="phone-login-code">
              <el-input v-model="ruleForm.code" size="large" :prefix-icon="ChatDotSquare" placeholder="请输入验证码"
                        style="width: 65%" />
              <el-button plain style="width: 25%">获取验证码</el-button>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button v-loading style="width: 100%" type="primary" @click="submitForm(ruleFormRef)">
              注册
            </el-button>
          </el-form-item>
        </el-form>

        <div style="
            width: 100%;
            display: flex;
            justify-content: center;
            margin-top: 20px;
            color: #409eff;
          ">
          <el-link type="primary" :underline="false" href="/normal/login">使用已有账户登录</el-link>
        </div>
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
import LoginBar from "@/views/login/LoginBar.vue";
import SvgIcon from "@/components/svg-icon/svg-icon.vue";
import { Lock, Iphone, Message, ChatDotSquare } from "@element-plus/icons-vue";

// 登录表单涉及
const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  email: "",
  password: "",
  checkPassword: "",
  phone: "",
  code: "",
});

const rules = reactive<FormRules>({
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
  checkPassword: [
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

// 点击注册按钮触发提交表单，进行表单校验，并发送注册请求
const submitForm = async (formEl: FormInstance | undefined) => {
  // 如果函数传递的参数不是 el-form 实例，则直接返回，不做处理
  if (!formEl) return;

  // 发送登录请求前的表单校验
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 校验成功，发送注册请求

      // 根据注册请求的响应结果做出相应处理
      // 如果 200 成功，跳转到登录页进行登录

      // 如果失败，弹出失败通知
      console.log("submit!");
    } else {
      // 表单校验不成功，可选择弹出提示
      console.log("error submit!", fields);
    }
  });
};
</script>

<style scoped lang="scss">
.login-demo {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;

  background-color: rgb(240, 242, 245);
  background-image: url(@/assets/icons/background.svg);
  background-repeat: no-repeat;
  background-size: cover;
}

.login-container {
  width: 400px;
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
      font-size: 14px;
      text-align: center;
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
