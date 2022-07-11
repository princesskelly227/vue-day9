import {gethomelist,getnewhomelist} from './home'
import {getsearchtag,getsearchlist} from './search'
export const gethomelistapi =gethomelist
export const getnewhomelistapi =getnewhomelist
export const getsearchtagapi =getsearchtag
export const getsearchlistapi =getsearchlist
import { getSongById, getLyricById } from './play'
export const getSongByIdAPI = getSongById //  播放页 - 获取歌曲详情
export const getLyricByIdAPI = getLyricById // 获取歌词