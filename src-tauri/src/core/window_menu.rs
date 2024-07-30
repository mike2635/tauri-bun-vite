use tauri::{CustomMenuItem, Menu, MenuItem, Submenu, WindowMenuEvent};

// 应用窗口菜单使用参考官方示例改造而来: https://tauri.app/zh-cn/v1/guides/features/menu
// 创建并挂在应用窗口菜单后，还必须编写相应的事件处理器，以响应菜单项的点击事件。否则，菜单项的点击事件将不会被触发。

// 配置参考: https://docs.rs/tauri/1.7.1/tauri/struct.Menu.html
// 初始化配置应用窗口菜单
pub fn init_window_menu() -> Menu {
    // 创建一个包含默认菜单项和子菜单的菜单。基于操作系统自动选择默认菜单。
    Menu::os_default("system_menu")
        // 将原生菜单项添加到菜单中。
        .add_native_item(MenuItem::Copy)
        // 将自定义菜单项添加到菜单中。
        .add_item(CustomMenuItem::new("hide", "Hide"))
        // 添加带有子菜单的条目
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
    // 使用给定项创建一个新的窗口菜单。
    Menu::with_items([
        MenuItem::SelectAll.into(),
        #[cfg(target_os = "macos")]
        MenuItem::Redo.into(),
        CustomMenuItem::new("toggle", "Toggle visibility").into(),
        Submenu::new("View", Menu::new()).into(),
    ]);

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
// 关于自定义菜单的事件监听处理，请参考官方文档: https://tauri.app/zh-cn/v1/guides/features/menu
pub fn window_menu_event_handler(event: WindowMenuEvent) {
    // 获取所有应用窗口菜单时间WindowMenuEvent
    // let win = Some(event.window()).unwrap();
    match event.menu_item_id() {
        "about_app" => {}
        "check_update" => {}
        _ => {}
    }
}
