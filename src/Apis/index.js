// 引入 按需导出
import { getMusic, getNewMusic } from "./home"
export const getMusicAPi = getMusic // 获取推荐歌单
export const getNewMusicApi = getNewMusic // 获取最新歌单

// 
import { hotSearch, searchResult, inputSuggest } from './search'
export const hotSearchApi = hotSearch // 热搜关键字
export const searchResultApi = searchResult // 搜索结果列表
export const inputSuggestApi = inputSuggest // 搜索结果列表

import { getSongById, getLyricById } from './Play'
export const getSongByIdAPI = getSongById //  播放页 - 获取歌曲详情
export const getLyricByIdAPI = getLyricById // 获取歌词


