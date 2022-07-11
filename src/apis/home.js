import request from '@/utils/request'
export const getRecommendList = params => request({
    url: '/personalized',
    params
    // 将来外面可能传入params的值 {limit: 20}
})
export const getNewSongList = params => request({
    url: "/personalized/newsong",
    params
})