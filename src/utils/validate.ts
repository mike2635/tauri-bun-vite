/**
 * 邮箱
 */
export const isEmail = (s: any) => {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 */
export const isMobile = (s: any) => {
    return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 */
export const isPhone = (s: any) => {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 */
export const isURL = (s: any) => {
    return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 用户名
 */
export const isUsername = (s: any) => {
    const valid_map = ['admin', 'editor']
    return valid_map.indexOf(s.trim()) >= 0
}

/**
 * 密码
 */
export const isPassword = (s: any) => {
    console.log(s)
}

/**
 * 判断是否为空
 * @param val 数据
 */
export const validateNull = (val: any) => {
    if (typeof val === 'boolean') {
        return false;
    }
    if (typeof val === 'number') {
        return false;
    }
    if (val instanceof Array) {
        if (val.length === 0) return true;
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === '{}') return true;
    } else {
        if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true;
        return false;
    }
    return false;
};
