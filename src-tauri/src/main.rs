// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use redis::{Client, Commands};
use sea_orm::EntityTrait;

use tauri_bun_vite::{init_mysql, init_redis, init_system_tray, init_window_menu};
use tauri_bun_vite::prelude::XxlJobUser;
use tauri_bun_vite::xxl_job_user::Model;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tokio::main]
async fn main() {
    // 测试 MySQL
    let db = init_mysql().await;
    let data = XxlJobUser::find().all(&db).await.unwrap();
    data.iter().for_each(|d| println!("the mysql user is {:?}", d));

    // 测试 Redis
    let redis = init_redis().await;
    store_user_to_redis(redis).await;

    tauri::Builder::default()
        .menu(init_window_menu())
        .system_tray(init_system_tray())
        .invoke_handler(tauri::generate_handler![greet])
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

