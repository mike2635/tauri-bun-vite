// 定义响应数据类型
export interface ResponseData<T> {
    code: number;
    status: string;
    msg: string;
    data: T;
}