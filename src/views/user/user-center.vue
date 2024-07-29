<template>
  <div>
    <h1>User Center</h1>
    <el-button type="primary" @click="handleClick">
      Click me
    </el-button>
  </div>
</template>

<script setup lang="ts">
import {invoke} from "@tauri-apps/api/core";
import {platform, version, type, arch} from '@tauri-apps/plugin-os';

const handleClick = () => {

  invoke('command_without_any')

  // 调用不带参数、有返回值的 Rust 指令
  invoke('command_with_return')
      .then((message) => console.log(message));

  // 调用带参数、但没有返回值的 Rust 指令
  invoke('command_with_arg', {invokeMessage: 'Hello!'});

  // 调用带参数并返回值的 Rust 指令
  invoke('command_with_arg_and_return', {invokeMessage: 'Hello!'})
      .then(res => console.log(res));




  // 获取系统信息
  const currentPlatform = platform();
  console.log("Current platform:", currentPlatform);
  const osVersion = version();
  console.log("OS version:", osVersion);
  const osType = type();
  console.log("OS type:", osType);
  const archName = arch();
  console.log("Architecture:", archName);

}
</script>

<style scoped>

</style>