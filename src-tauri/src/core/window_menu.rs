use tauri::{
    utils::assets::EmbeddedAssets, Context, CustomMenuItem, Menu, Submenu, WindowMenuEvent,
};

// 应用窗口菜单使用参考官方示例改造而来: https://tauri.app/zh-cn/v1/guides/features/menu

// 初始化配置应用窗口菜单
pub fn init_window_menu(context: &Context<EmbeddedAssets>) -> Menu {
    let app_name = &context.package_info().name;
    println!("the app_name is: {}", app_name);

    // 创建应用窗口菜单,开启默认菜单并额外添加自定义菜单项
    Menu::os_default(&app_name)
        .add_submenu(handle_file_submenu())
        .add_submenu(handle_edit_submenu())
}

// 文件菜单项
fn handle_file_submenu() -> Submenu {
    // 这里 `"quit".to_string()` 定义菜单项 ID，第二个参数是菜单项标签。
    let new_file = CustomMenuItem::new("new_file".to_string(), "新建文件");
    let new_dir = CustomMenuItem::new("new_dir".to_string(), "新建文件夹");
    let open_windows = CustomMenuItem::new("open_windows".to_string(), "新建窗口");
    let close_windows = CustomMenuItem::new("close_windows".to_string(), "关闭窗口");
    let file_submenu = Submenu::new(
        "文件",
        Menu::new()
            .add_item(new_file)
            .add_item(new_dir)
            .add_item(open_windows)
            .add_item(close_windows),
    );
    file_submenu
}

// 帮助菜单项
fn handle_edit_submenu() -> Submenu {
    // 这里Menu是整个菜单组件， Submenu是菜单项，CustomMenuItem和MenuItem是菜单项看中的具体功能项
    let about_app = CustomMenuItem::new("about_app".to_string(), "关于");
    let check_update = CustomMenuItem::new("check_update".to_string(), "检查更新");
    let help_submenu = Submenu::new(
        "帮助",
        Menu::new().add_item(about_app).add_item(check_update),
    );
    help_submenu
}

// 应用自定义菜单项处理器，只有自定义的菜单项才需要自己编写相应的事件处理
pub fn window_menu_event_handler(event: WindowMenuEvent) {
    // 获取所有应用窗口菜单时间WindowMenuEvent
    // let win = Some(event.window()).unwrap();
    match event.menu_item_id() {
        "about_app" => {}
        "check_update" => {}
        _ => {}
    }
}
