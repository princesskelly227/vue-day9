import request from '@/utils/request'

// 热搜关键字
export const hotSearch = () => request({
    url: '/search/hot'
})

// 搜索结果列表
export const searchResult = params => request({
    url: '/cloudsearch',
    params
})