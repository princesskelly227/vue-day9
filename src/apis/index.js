import {getRecommendList, getNewSongList} from './home'
import {hotSearch, searchResult} from './search'
import {getSongById,getLyricById} from './play'

export const getRecommendListAPI = getRecommendList 
export const getNewSongListAPI = getNewSongList 
export const hotSearchAPI = hotSearch // 热搜
export const searchResultAPI = searchResult // 搜索结果
export const getSongByIdAPI = getSongById
export const getLyricByIdAPI = getLyricById

