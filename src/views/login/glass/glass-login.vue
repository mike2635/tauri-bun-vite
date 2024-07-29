<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import SvgIcon from "@/components/svg-icon/svg-icon.vue";
import LoginBar from "@/views/login/LoginBar.vue";
import { ChatDotSquare, Iphone, Lock, User } from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
const router = useRouter()

// 钩子函数，当组件渲染时执行
onMounted(() => {
    // vite 提供的导入方式，可以使用正则匹配
    const images = import.meta.glob('/src/assets/imgs/login-bg/*.png');
    const bgList = Object.keys(images)
    let index = Math.floor(Math.random() * bgList.length)
    let bg = bgList[index]

    const rootElement = document.documentElement
    rootElement.style.setProperty('--login-bg', `url("${bg}")`);
})

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
            router.push("/home")
            // 如果失败，弹出失败通知
            console.log("submit!");
        } else {
            // 表单校验不成功，可选择弹出提示
            console.log("error submit!", fields);

            // 展示放行
            router.push("/home")
        }
    });
};
</script>

<template>
  <div class="page-container" data-tauri-drag-region>

    <!-- 背景颜色 -->
    <div class="bg-color"></div>
    <div class="bg-color"></div>
    <div class="bg-color"></div>

    <!-- 登录容器 -->
    <div class="login-box">
      <!-- 背景圆 -->
      <div class="circle" style="--x:0"></div>
      <div class="circle" style="--x:1"></div>
      <div class="circle" style="--x:2"></div>
      <div class="circle" style="--x:3"></div>
      <div class="circle" style="--x:4"></div>

      <!-- 登录左半区域 -->
      <div class="login-box-left"></div>

      <!-- 登录右半区域 -->
      <div class="login-box-right">
        <!-- 登录表单-->
        <div class="login-form">
          <!-- 登录表单头部 -->
          <div class="login-form-header">
            <div class="logo">
              <svg-icon name="login-logo"></svg-icon>
              <span>龙茶清欢</span>
            </div>
            <div class="desc">
              Vue3 Admin 是有龙茶清欢制作的一个后台管理系统模板
            </div>
          </div>

          <!-- 登录表单主体区域 -->
          <div class="login-form-main">
            <!-- 登录表单 -->
            <el-form
                status-icon
                ref="ruleFormRef"
                class="demo-ruleForm"
                :model="ruleForm"
                :rules="rules"
                :size="formSize"
            >
              <!-- 登录类型选择 -->
              <div class="login-type-select">
                <el-tabs v-model="activeName">
                  <el-tab-pane label="邮箱登录" name="first">
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
                      <div class="login-code-send">
                        <el-input v-model="ruleForm.code" size="large" :prefix-icon="ChatDotSquare"
                                  placeholder="验证码" style="width: 65%" />
                        <el-button plain size="large">获取验证码</el-button>
                      </div>
                    </el-form-item>
                  </el-tab-pane>
                </el-tabs>
              </div>

              <!-- 是否选择自定登录、忘记密码 -->
              <el-form-item>
                <div class="autologin-forget">
                  <el-checkbox v-model="ruleForm.checkbox" label="自动登录" size="large" />
                  <div class="forget-pwd">
                    <el-link type="primary" :underline="false" href="">忘记密码
                    </el-link>
                  </div>
                </div>
              </el-form-item>

              <!-- 登录按钮 -->
              <el-form-item>
                <el-button v-loading size="large" style="width: 100%" type="primary" @click="submitForm(ruleFormRef)">
                  登录
                </el-button>
              </el-form-item>

              <!-- 第三方登录、注册 -->
              <!-- TODO 当我们点击图标时，在左侧图标区展示登录二维码 -->
              <el-form-item>
                <div class="other-login-or-register">
                  <div class="other-login">
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
                  <div class="register">
                    <el-link type="primary" :underline="false" href="/glass/register">注册账户
                    </el-link>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>

    <!-- 登录页的功能菜单 -->
    <login-bar></login-bar>
  </div>
</template>

<style scoped lang="scss">
.page-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, #f1f4f9, #dff1ff);

    /* 背景颜色 */
    .bg-color {
        /* 绝对定位 */
        position: absolute;
        /* 使用filter(滤镜) 属性，给图像设置高斯模糊*/
        /*backdrop-filter: blur(200px);*/
        filter: blur(200px);
    }

    /* :nth-child(n) 选择器匹配父元素中的第 n 个子元素 */
    .bg-color:nth-child(1) {
        top: -350px;
        width: 600px;
        height: 600px;
        background: #f873b5;
    }

    .bg-color:nth-child(2) {
        bottom: -150px;
        left: 100px;
        width: 500px;
        height: 500px;
        background: #fffd87;
    }

    .bg-color:nth-child(3) {
        bottom: 50px;
        right: 100px;
        width: 500px;
        height: 500px;
        background: #00d2ff;
    }
}

/* 登录容器 */
.login-box {
    width: 50%;
    height: 50%;
    min-width: 800px;
    min-height: 450px;
    display: flex;
    position: relative;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);

    .circle {
        position: absolute;
        background: rgba(255, 255, 255, 0.1);
        /* backdrop-filter属性为一个元素后面区域添加模糊效果 */
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-right: 1px solid rgba(255, 255, 255, 0.2);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        /* 使用filter(滤镜) 属性，改变颜色。
        hue-rotate(deg)  给图像应用色相旋转
        calc() 函数用于动态计算长度值
        var() 函数调用自定义的CSS属性值x*/
        filter: hue-rotate(calc(var(--x) * 75deg));
        // -webkit-filter: hue-rotate(calc(var(--x) * 75deg));
        /* 调用动画animate，需要10s完成动画，
        linear表示动画从头到尾的速度是相同的，
        infinite指定动画应该循环播放无限次*/
        animation: glass-login-animate 10s linear infinite;
        /* 动态计算动画延迟几秒播放 */
        animation-delay: calc(var(--x) * -1s);
    }

    .circle:nth-child(1) {
        top: -50px;
        right: -60px;
        width: 100px;
        height: 100px;
    }

    .circle:nth-child(2) {
        top: 150px;
        left: -100px;
        width: 120px;
        height: 120px;
        z-index: 2;
    }

    .circle:nth-child(3) {
        bottom: 50px;
        right: -60px;
        width: 80px;
        height: 80px;
    }

    .circle:nth-child(4) {
        bottom: -80px;
        left: 100px;
        width: 60px;
        height: 60px;
    }

    .circle:nth-child(5) {
        top: -80px;
        left: 300px;
        width: 60px;
        height: 60px;
    }

    >*:not(.circle) {
        width: 50%;
        position: relative;
    }

    .login-box-left {
        backdrop-filter: blur(5px);
    }

    .login-box-left::before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        background-image: var(--login-bg);
        background-repeat: no-repeat;
        background-size: cover;
        opacity: 0.3;
        border-top-left-radius: 1.5rem;
        border-bottom-left-radius: 1.5rem;
        z-index: -1;
    }

    .login-box-right {
        padding: 20px;
    }
}

.login-form {
    width: 100%;
    height: 100%;

    .login-form-header {
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;

        &>* {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}

.login-form-header {
    .desc {
        font-size: 1rem;
    }

    .logo {
        height: 4rem;
        display: flex;
        align-items: center;
        margin-bottom: 1rem;

        &>span {
            font-size: 2rem;
            margin-left: 2rem;
        }
    }
}

el-form-item:is([prop='password'], [prop='code']) {
    margin-bottom: 0 !important;
}

el-input::placeholder {
    font-size: 1.6rem !important;
    color: #a1a1a1 !important;
}

.login-code-send {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.autologin-forget {
    height: 2rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.other-login-or-register {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.4rem;
}

.other-login {
    display: flex;
    height: 2rem;
    line-height: 2rem;

    .other-login-list {
        display: flex;

        &>* {
            margin-left: 1rem;

            :hover {
                opacity: 0.8;
            }
        }
    }
}
</style>
