// 获取当前系统时间，用于登录成功时的弹窗提示问候
export const getTime = () => {
    let message = "";
    const hour = new Date().getHours();
    if (5 <= hour && hour < 8) {
        message = "早上";
    } else if (8 <= hour && hour < 12) {
        message = "上午";
    } else if (12 <= hour && hour < 14) {
        message = "中午";
    } else if (14 <= hour && hour < 18) {
        message = "下午";
    } else {
        message = "晚上";
    }
    return message;
};