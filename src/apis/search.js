import request from "@/utils/request";
export const getHotList = (params)=>
request({
    url:'/search/hot',
    params,
})
export const getSearchList = (params)=>
request({
    url:'/cloudsearch',
    params,
})