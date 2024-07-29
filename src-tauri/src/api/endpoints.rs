use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct MyObject {
    name: String,
    age: i32,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// Learn more about Tauri Rust API at https://v2.tauri.app/zh-cn/develop/calling-rust/

#[tauri::command]
pub fn command_without_any() {
    println!("command_without_arg");
}

#[tauri::command]
pub fn command_with_return() -> String {
    "command_without_return".into()
}

// 参数应作为带有 camelCase 驼峰命名的键的 JSON 对象传递：
#[tauri::command]
pub fn command_with_arg(invoke_message: String) {
    println!("I was invoked from JavaScript, with this message: {}", invoke_message);
}

#[tauri::command]
pub fn command_with_arg_and_return(invoke_message: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", invoke_message)
}


#[tauri::command]
pub async fn get_data() -> Result<MyObject, String> {
    // 在这里实现获取数据的逻辑，返回一个字符串作为示例
    if true {
        Err(String::from("世界"))
    } else {
        Ok(MyObject {
            name: String::from("世界你好"),
            age: 18,
        })
    }
}

// 如上所述，从命令返回的所有内容都必须实现 serde::Serialize，包括错误。如果您正在处理 Rust 的 std 库或外部 crates 中的错误类型，这可能会有问题，因为大多数错误类型都没有实现它。在简单的方案中，可以使用 map_err 将这些错误转换为字符串：
#[tauri::command]
fn my_custom_command1() -> Result<(), String> {
    // This will return an error
    std::fs::File::open("path/that/does/not/exist").map_err(|err| err.to_string())?;
    // Return nothing on success
    Ok(())
}



// 在 Tauri 中，异步函数有助于以不会导致 UI 冻结或减速的方式执行繁重的工作。
// Declare the async function using String instead of &str, as &str is borrowed and thus unsupported
#[tauri::command]
async fn my_custom_command2(value: String) -> String {
    // Call another async function and wait for it to finish
    // some_async_function().await;
    value
}



#[tauri::command]
pub async fn call_api() -> Result<String, String> {
    let result = get_data().await;
    if let Ok(data) = result {
        println!("data: {:?}", data);
    }

    if true {
        Ok("the result is a string".into())
    } else {
        Err("the result is not a string".into())
    }
}

#[tauri::command]
pub fn cmd1(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
pub fn cmd2(number: usize) -> Result<String, String> {
    if number == 1 {
        Err("This failed!".into())
    } else {
        Ok("This worked!".into())
    }
}
