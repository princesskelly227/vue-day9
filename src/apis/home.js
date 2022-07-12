import request from '@/utils/request'
export const getRecommandList = (params)=>
    request({
        url:'/personalized',
        params,
    })
    export const getNewsongList = (params)=>
    request({
        url:'/personalized/newsong',
        params,
    })
