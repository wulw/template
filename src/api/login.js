import request from '@/utils/request'

export function getWeather(params) {
    return request({
        url: '/Weather',
        method: 'get',
        params
    })
}

export function login(data) {
    return request({
        url: '/Login',
        method: 'post',
        data
    })
}

export function getInfo(params) {
    return request({
        url: '/User',
        method: 'get',
        params
    })
}
