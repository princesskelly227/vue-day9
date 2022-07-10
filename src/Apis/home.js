import request from '@/utils/request';

// 首页 - 推荐歌单
export const getMusic = (params) => request({
    url: '/personalized',
    params
})

// 首页 - 推荐最新音乐
export const getNewMusic = params => request({
    url: "/personalized/newsong",
    params
})