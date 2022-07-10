import request from '@/utils/request'
export const gethomelist=(params)=>request({url:'/personalized',params})
export const getnewhomelist=(params)=>request({url:'/personalized/newsong',params})