// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use redis::{Client, Commands};
use sea_orm::EntityTrait;
use tauri::Manager;
use tracing::instrument::WithSubscriber;
use tauri_bun_vite::{init_log, init_mysql, init_redis, init_system, init_system_tray, init_window_menu, window_menu_event_handler};
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
fn main() {
    // 测试 MySQL
    // let db = init_mysql().await;
    // let data = XxlJobUser::find().all(&db).await.unwrap();
    // data.iter().for_each(|d| println!("the mysql user is {:?}", d));

    // 测试 Redis
    // let redis = init_redis().await;
    // store_user_to_redis(redis).await;

    // 构建并启动 Tauri
    // default() 方法用于创建默认的 Tauri 构建器，将 Wry 设为 Builder 的默认运行时
    // Wry 是 Rust 中的跨平台 WebView 渲染库，支持所有主要的桌面平台，如 Windows、macOS 和 Linux。
    let app = tauri::Builder::default()
        // 定义 setup 挂钩, 用于初始化应用程序状态或者自定设置
        .setup(|app| {
            let handle = app.handle();

            // 异步初始化系统，包括日志、mysql、redis等
            tauri::async_runtime::spawn(async move {
                init_system().await.expect("TODO: panic message");
            });

            // 异步检查更新，需要启用 tauri 依赖包的 updater 特性功能
            // 参考文档： https://docs.rs/tauri/1.7.1/tauri/updater/struct.UpdateBuilder.html
            tauri::async_runtime::spawn(async move {
                // 使用平台的目标三元组来检查更新，检查当前平台的更新
                let builder = tauri::updater::builder(handle).target(tauri::utils::platform::target_triple().unwrap());
                match builder.check().await {
                    Ok(update) => {
                        if update.is_update_available() {
                            update.download_and_install().await.unwrap();
                        }
                    }
                    Err(e) => {
                        println!("failed to get update: {}", e);
                    }
                }
            });

            // 测试系统弹窗，需要启用 tauri 依赖包的 dialog 特性功能
            let main_window = app.get_window("main").unwrap();
            tauri::api::dialog::blocking::message(Some(&main_window), "Hello", "Welcome back!");

            Ok(())
        })
        // 应用菜单栏
        .menu(init_window_menu())
        // 自定义菜单栏事件监听
        .on_menu_event(|event| {
            // 自定义菜单栏事件处理器
            window_menu_event_handler(event)
        })
        // 应用系统托盘
        .system_tray(init_system_tray())
        // 应用指令注册。接受命令、函数的列表。创建一个处理程序，允许使用 invoke() 从 JS 调用命令。
        .invoke_handler(tauri::generate_handler![
            greet
        ])
        // 在编译时读取配置文件，并根据其内容生成 Context
        .run(tauri::generate_context!())
        .expect("error while running tauri application");



    // 监听更新事件，需要启用 tauri 依赖包的 updater 特性功能
    // 需要生成密钥并在 tauri.conf.json 中配置 updater 部分
    // 配置参考文档： https://tauri.app/zh-cn/v1/guides/distribution/updater
    app.run(|_app_handle, event| match event {
        tauri::RunEvent::Updater(updater_event) => {
            match updater_event {
                // 当有可用更新时触发
                tauri::UpdaterEvent::UpdateAvailable { body, date, version } => {
                    println!("update available {} {:?} {}", body, date, version);
                    // tauri::api::dialog::blocking::message(Some(&main_window), "Hello", "Welcome back!");
                }
                // 在即将开始下载时触发
                tauri::UpdaterEvent::Pending => {
                    println!("update is pending!");
                }
                tauri::UpdaterEvent::DownloadProgress { chunk_length, content_length } => {
                    println!("downloaded {} of {:?}", chunk_length, content_length);
                }
                // 在下载完成且即将安装更新时触发
                tauri::UpdaterEvent::Downloaded => {
                    println!("update has been downloaded!");
                }
                // 在安装更新时触发。然后，您可以要求重新启动应用程序
                tauri::UpdaterEvent::Updated => {
                    println!("app has been updated");
                }
                // 当应用程序已安装最新版本且不需要更新时触发
                tauri::UpdaterEvent::AlreadyUpToDate => {
                    println!("app is already up to date");
                }
                // 当更新程序出现错误时触发。我们建议即使启用了默认对话框，也要侦听此事件。
                tauri::UpdaterEvent::Error(error) => {
                    println!("failed to update: {}", error);
                }
                _ => (),
            }
        }
        _ => {}
    });
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

