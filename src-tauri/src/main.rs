// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use sea_orm::EntityTrait;
use tauri_bun_vite::{init_mysql, init_system_tray, init_window_menu};
use tauri_bun_vite::prelude::XxlJobUser;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tokio::main]
async fn main() {
    let db = init_mysql().await;
    let data = XxlJobUser::find().all(&db).await.unwrap();
    data.iter().for_each(|d| println!("the user is {:?}", d));

    tauri::Builder::default()
        .menu(init_window_menu())
        .system_tray(init_system_tray())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
