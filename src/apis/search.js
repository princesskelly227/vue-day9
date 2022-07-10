import request from '@/utils/request'
export const getsearchtag=(params)=>request({url:'/search/hot',params})
export const getsearchlist=(params)=>request({url:'/cloudsearch',params})