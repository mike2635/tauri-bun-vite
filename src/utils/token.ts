// 凡是需要将数据随HTTP请求发送到服务器的数据，建议采用cookie。像token就是每次请求都需要携带的
import Cookies from 'js-cookie'

const accessTokenKey = 'access-token'
const refreshTokenKey = 'refresh-token'

export const getToken = () => {
    return Cookies.get(accessTokenKey)
}

export const setToken = (token: string) => {
    return Cookies.set(accessTokenKey, token)
}

export const removeToken = () => {
    return Cookies.remove(accessTokenKey)
}

export const getRefreshToken = () => {
    return Cookies.get(refreshTokenKey)
}

export const setRefreshToken = (token: string) => {
    return Cookies.set(refreshTokenKey, token)
}

export const removeRefreshToken = () => {
    return Cookies.remove(refreshTokenKey)
}

export const isTokenExpired = () => {
    return Cookies.remove(refreshTokenKey)
}
