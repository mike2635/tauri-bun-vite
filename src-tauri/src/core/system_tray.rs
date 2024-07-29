use tauri::{AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem, SystemTraySubmenu};
// 系统托盘使用参考官方示例改造而来: https://tauri.app/zh-cn/v1/guides/features/system-tray/

// 构建一个功能完整的应用系统托盘
pub fn init_system_tray() -> SystemTray {
    // 创建一个空的应用系统托盘
    let system_tray = SystemTray::new();

    // 创建自定义应用系统托盘菜单项，第一个参数是托盘菜单 ID，第二个参数是菜单项标签。
    let quit = CustomMenuItem::new("quit".to_string(), "退出");
    let hide = CustomMenuItem::new("hide".to_string(), "隐藏");
    let setting = CustomMenuItem::new("setting".to_string(), "设置");

    // 创建一个扩展系统托盘菜单项(具有子菜单的菜单项)
    let demo = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("demo".to_string(), "扩展项1"))
        .add_item(CustomMenuItem::new("yan".to_string(), "扩展项2"));
    let submenu = SystemTraySubmenu::new("托盘扩展菜单".to_string(), demo);

    // 创建一个系统托盘菜单，并添加托盘菜单项
    let system_tray_menu = SystemTrayMenu::new()
        // 配置自定义托盘菜单项
        .add_item(quit)
        .add_item(hide)
        .add_item(setting)
        // 横线分隔符
        .add_native_item(SystemTrayMenuItem::Separator)
        // 配置扩展托盘菜单项
        .add_submenu(submenu);

    system_tray.with_menu(system_tray_menu)
}

// 应用系统托盘事件处理器，每一个 CustomMenuItem 在点击时触发一个事件
pub fn system_tray_event_handler(app: &AppHandle, event: SystemTrayEvent) {
    // 监听匹配每一个应用系统托盘自定义事件
    match event {
        // 如果系统托盘被鼠标左点击
        SystemTrayEvent::LeftClick {
            position: _,
            size: _,
            ..
        } => {
            // 鼠标左点击弹出应用窗口
            println!("system tray received a left click");
            let window = app.get_window("main").unwrap();
            window.show().unwrap();
        }
        // 如果系统托盘菜单项被鼠标点击
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "quit" => {
                println!("system tray received a quit click");
                std::process::exit(0);
            }
            "hide" => {
                let window = app.get_window("main").unwrap();
                window.hide().unwrap();
            }
            _ => {}
        },
        _ => {}
    }
}
