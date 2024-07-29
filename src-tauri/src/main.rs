// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use redis::{Client, Commands};
use sea_orm::EntityTrait;
use tauri::Manager;
use tauri_bun_vite::{init_mysql, init_redis, init_system_tray, init_window_menu};
use tauri_bun_vite::prelude::XxlJobUser;
use tauri_bun_vite::xxl_job_user::Model;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}


/*
Tauri 是一个框架，用于为所有主要的桌面平台构建微小、极快的二进制文件。
开发人员可以集成任何编译为 HTML、JS 和 CSS 的前端框架来构建他们的用户界面。
应用程序的后端是一个源自 rust 的二进制文件，其中包含前端可以与之交互的 API。
*/
// tauri 配置参考： https://docs.rs/tauri/1.7.1/tauri/index.html
// tauri 也可以像 axum 一样配置： https://docs.rs/tauri/1.7.1/tauri/trait.Manager.html#method.manage
#[tokio::main]
async fn main() {
    // 测试 MySQL
    let db = init_mysql().await;
    let data = XxlJobUser::find().all(&db).await.unwrap();
    data.iter().for_each(|d| println!("the mysql user is {:?}", d));

    // 测试 Redis
    let redis = init_redis().await;
    store_user_to_redis(redis).await;

    // 构建并启动 Tauri
    // default() 方法用于创建默认的 Tauri 构建器，将 Wry 设为 Builder 的默认运行时
    // Wry 是 Rust 中的跨平台 WebView 渲染库，支持所有主要的桌面平台，如 Windows、macOS 和 Linux。
    tauri::Builder::default()
        // 定义 setup 挂钩, 用于初始化应用程序状态或者自定设置
        .setup(|app| {
            let handle = app.handle();
            let handler = app.listen_global("ready", move |event| {
                println!("app is ready");

                // we no longer need to listen to the event
                // we also could have used `app.once_global` instead
                handle.unlisten(event.id());
            });

            // stop listening to the event when you do not need it anymore
            app.unlisten(handler);

            let main_window = app.get_window("main").unwrap();
            // tauri::api::dialog::blocking::message(Some(&main_window), "Hello", "Welcome back!");

            Ok(())
        })
        // 应用菜单栏
        .menu(init_window_menu())
        // 应用系统托盘
        .system_tray(init_system_tray())
        // 应用指令注册
        .invoke_handler(tauri::generate_handler![
            greet
        ])
        //
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}



// 处理函数，使用 AppState 中的 Redis 客户端
async fn store_user_to_redis(client: Client) {
    // 获取连接
    // let mut conn = state.redis.get_connection().unwrap();
    let mut conn = client.get_connection().unwrap();

    let _: () = conn.set("test", "test_data").unwrap();
    let data: String = conn.get("test").unwrap();
    println!("Redis get test: {}", data);

    // 定义一个用户
    let user = Model {
        id: Default::default(),
        username: Default::default(),
        password: Default::default(),
        role: Default::default(),
        permission: Default::default(),
    };
    // 设置值
    let json_user = serde_json::to_string(&user).unwrap();
    println!("json_user: {:#?}", json_user);

    let _: () = conn.set("user", json_user).unwrap();


    let json_user: String = conn.get("user").unwrap();
    let user: Model = serde_json::from_str(&json_user).unwrap();
    println!("Redis get user: {:#?}", user); }

