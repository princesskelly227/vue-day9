import request from '@/utils/request'
export const getSongById = (id) => request({
    url: `/song/detail?ids=${id}`,
    method: "GET"
  })
  
  // 播放页 - 获取歌词
  export const getLyricById = (id) => request({
    url: `/lyric?id=${id}`,
    method: "GET"
  })
