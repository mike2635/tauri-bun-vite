// 使用 Tauri API 调用 Rust 指令代码。下面通过 @tauri-apps/api 包调用 Rust 指令代码。
// 不再需要 axios 库，直接调用 Rust 指令代码即可。

// When using the Tauri API npm package:
import { invoke } from '@tauri-apps/api';


invoke('tauri: command_without_any')


// 调用不带参数、有返回值的 Rust 指令
invoke('command_with_return').then((message) => console.log(message));


// 参数应作为带有 camelCase 驼峰命名的键的 JSON 对象传递：
// 调用带参数、但没有返回值的 Rust 指令
invoke('command_with_arg', {invokeMessage: 'Hello!'});


// 调用带参数并返回值的 Rust 指令
invoke('command_with_arg_and_return', {invokeMessage: 'Hello!'})
    .then(res => console.log(res));

//  调用 Rust 指令并捕获错误
invoke('my_custom_command')
    .then((message) => console.log(message))
    .catch((error) => console.error(error));