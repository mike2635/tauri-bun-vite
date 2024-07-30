mod api;
mod core;
mod entity;

pub use api::*;
pub use core::*;
pub use entity::*;


use std::env;
use std::io::Error;
use std::time::Duration;
use dotenvy::dotenv;
use redis::Client;
use sea_orm::{ConnectOptions, Database, DatabaseConnection};
use serde::{Deserialize, Serialize};
use tracing::{Level, log};





// 初始化系统环境
pub async fn init_system() -> Result<String, Error> {
    // 初始化日志
    init_log().await.unwrap();

    // 初始化数据库连接
    init_mysql().await;

    // 初始化 redis 连接
    init_redis().await;

    Ok("system init success".to_string())
}

// 初始化日志
pub async fn init_log() -> Result<String, Error> {
    // let log_file = std::fs::File::create("log.txt").unwrap();

    /// 推荐使用这一方式
    // 开始配置一个 `fmt` subscriber
    let subscriber = tracing_subscriber::fmt()
        // 使用更紧凑、更简短的日志格式
        .compact()
        // 显示源代码文件路径
        .with_file(false)
        // .with_writer(log_file)
        // 显示源代码行号
        .with_line_number(true)
        // 显示记录事件的线程 ID
        .with_thread_ids(true)
        // 不显示事件的目标（模块路径）
        .with_target(false)
        // 所有级别高于 TRACE 的 spans 事件（例如，debug、info、warn 等）都将写入 stdout
        .with_max_level(Level::TRACE)
        // 结束配置并创建 subscriber
        .finish();
    // 使用该订阅服务器处理在此时间点之后发出的跟踪
    // 在程序的剩余时间里，此订阅者将在所有线程中用作默认值，类似于记录器在 log crate 中的工作方式
    tracing::subscriber::set_global_default(subscriber)
        .expect("setting default subscriber failed");
    Ok("log init success".to_string())
}

/// sea_orm 官方网站： https://www.sea-ql.org/SeaORM/docs/install-and-config/connection/  此处为连接配置
// 初始化数据库连接池
pub async fn init_mysql() -> DatabaseConnection {
    // 此处部分配置参考 sea_orm 官方示例： https://github.com/SeaQL/sea-orm/blob/master/examples/axum_example/api/src/lib.rs
    // 设置日志级别
    env::set_var("RUST_LOG", "debug");

    // 加载根目录下的 .env 文件配置到环境变量，而不是当前目录
    dotenv().ok();

    // env::vars().for_each(|x| println!("{:?}", x));

    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL is not set in .env file");
    println!("Database URL: {}", db_url);

    // 通过数据库连接地址创建连接池配置对象
    let mut opt = ConnectOptions::new(db_url);

    // 配置连接池参数
    opt.max_connections(100)
        .min_connections(5)
        .connect_timeout(Duration::from_secs(8))
        .acquire_timeout(Duration::from_secs(8))
        .idle_timeout(Duration::from_secs(8))
        .max_lifetime(Duration::from_secs(8))
        // 是否打印SQL执行日志，仅在开发环境下开启
        .sqlx_logging(false)
        // 如果开启SQL日志、对应设置SQL日志级别
        .sqlx_logging_level(log::LevelFilter::Info)
        // 设置默认连接的数据库
        .set_schema_search_path("blog_cloud");

    // 开始连接数据库
    // 在后台，会创建了一个 sqlx::Pool，并由 DatabaseConnection 拥有。每次调用 execute 或 query_one/all 时，都会从池中获取并释放一个连接。当您等待多个查询时，它们将并行执行。
    let db = Database::connect(opt).await.expect("Failed to connect to database");

    // 测试数据库连接是否成功
    let result = db.ping().await.is_ok();
    println!("Database connection test result: {}", result);

    db
}

/// redis 官方网站： https://docs.rs/redis/0.26.0/redis/  此处为连接配置
// redis 数据库连接示例
pub async fn init_redis() -> Client {
    // 连接 redis  注意这里的密码
    let client = redis::Client::open("redis://:479368@127.0.0.1:6379/").unwrap();
    // // 获取一个连接
    // let mut conn = client.get_connection().unwrap();
    // // 扔掉结果，只要确保它不会失败
    // let _ : () = conn.set("龙茶清欢2025", "13647933851").unwrap();
    client
}


/// 自定义响应类型
/*
axum 已经实现了多种响应，比如纯文本、HTML、JSON 及 自定义响应头(response header)。除了这些 axum 内置的响应之外，我们还将讨论如何将自己定义的结构体，作为响应返回给客户端。
axum 有句话说的是：
    Anything that implements IntoResponse can be returned from a handler
大意就是：凡是实现了 IntoResponse trait 的，都可作为 handler 的返回值，也就是我们所说的响应。
官方已经对若干常用数据类型实现了该 trait，亦是说，这些数据类型可以直接作为请求的响应进行返回。
对于我们自己的数据类型，比如自定义的 struct，也只需要实现 IntoResponse，就可以直接作为响应进行返回了。
*/

// 定义一个结构体来封装你的响应数据。这里我们定义一个 ApiResponse 结构体，它包含三个字段：status（状态码），message（消息）和 data（可选的数据）
#[derive(Debug, Serialize, Deserialize)]
pub struct ApiResponse<T> {
    pub status: u16,
    pub message: String,
    pub data: Option<T>,
}

// 自定义响应类型的实现
impl<T> ApiResponse<T> {
    fn new(status: u16, message: String, data: Option<T>) -> Self {
        Self {
            status,
            message,
            data,
        }
    }
}

// axum 请求响应处理的官方文档： https://docs.rs/axum/latest/axum/response/index.html