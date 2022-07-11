<template>
  <div class="play">
    <div
      class="song-bg"
      :style="`background-image: url(${
        songInfo && songInfo.al && songInfo.al.picUrl
      }?imageView&thumbnail=360y360&quality=75&tostatic=0);`"
    ></div>
    <div class="header">
      <van-icon
        name="arrow-left"
        size="20"
        class="left-incon"
        @click="$router.back()"
      />
    </div>
    <div class="song-wrapper">
      <div
        class="song-turn ani"
        :style="`animation-play-state:${playState ? 'running' : 'paused'}`"
      >
        <div class="song-img">
          <img
            style="width: 100%"
            :src="`${
              songInfo && songInfo.al && songInfo.al.picUrl
            }?imageView&thumbnail=360y360&quality=75&tostatic=0`"
            alt=""
          />
        </div>
      </div>
      <div class="start-box" @click="audioStart">
        <span class="song-start" v-show="!playState"></span>
      </div>
      <div class="song-msg">
        <h2 class="m-song-h2">
          <span class="m-song-sname"
            >{{ songInfo.name }}-{{
              songInfo && songInfo.ar && songInfo.ar[0].name
            }}</span
          >
        </h2>
        <div class="lrcContent">
          <p class="lrc">{{ curLyric }}</p>
        </div>
      </div>
      <div class="needle" :style="`transform: rotate(${needleDeg});`"></div>
    </div>
    <audio
      ref="audio"
      preload="true"
      :src="`https://music.163.com/song/media/outer/url?id=${id}.mp3`"
    ></audio>
  </div>
</template>

<script>
import { getSongByIdAPI, getLyricByIdAPI } from '@/apis'
import { Icon } from 'vant'
export default {
  components: {
    [Icon.name]: Icon,
  },
  name: 'play',
  data() {
    return {
      playState: false, 
      id: this.$route.query.id, 
      songInfo: {}, 
      lyric: {},
      curLyric: '',
      lastLy: '' 
    }
  },
  computed: {
    needleDeg() {
      return this.playState ? '-7deg' : '-38deg'
    }
  },
  methods: {
    async getSong() { 
      const res = await getSongByIdAPI(this.id)
      this.songInfo = res.data.songs[0]
      const lyrContent = await getLyricByIdAPI(this.id)
      const lyricStr = lyrContent.data.lrc.lyric
      this.lyric = this._formatLyr(lyricStr)
      this.curLyric = this.lyric[0]
    },
    _formatLyr(lyricStr) {
      let reg = /\[.+?\]/g 
      let timeArr = lyricStr.match(reg) 
      let contentArr = lyricStr.split(/\[.+?\]/).slice(1) 
      let lyricObj = {} 
      timeArr.forEach((item, index) => {
        let ms = item.split(':')[0].split('')[2] * 60
        let ss = item.split(':')[1].split('.')[0].split('')[0] === '0' ? item.split(':')[1].split('.')[0].split('')[1] : item.split(':')[1].split('.')[0]
        lyricObj[ms + Number(ss)] = contentArr[index]
      })
      return lyricObj
    },
    audioStart() {
      if (!this.playState) { 
        this.$refs.audio.play() 
      } else {
        this.$refs.audio.pause() 
      }
      this.playState = !this.playState 
    },
    showLyric() {
      this.$refs.audio.addEventListener('timeupdate', () => {
        let curTime = Math.floor(this.$refs.audio.currentTime)
        if (this.lyric[curTime]) {
          this.curLyric = this.lyric[curTime]
          this.lastLy = this.curLyric
        } else {
          this.curLyric = this.lastLy
        }
      })
    }
  },
  mounted() {
    this.getSong()
    this.showLyric()
  }
}
</script>

<style scoped>
.header {
  height: 50px;
}
.play {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}
.song-bg {
  background-color: #161824;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  transform: scale(1.5);
  transform-origin: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  opacity: 1;
  filter: blur(25px); /*模糊背景 */
}
.song-bg::before{ /*纯白色的图片做背景, 歌词白色看不到了, 在背景前加入一个黑色半透明蒙层解决 */
  content: " ";
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom:0;
}
.song-wrapper {
  position: fixed;
  width: 247px;
  height: 247px;
  left: 50%;
  top: 50px;
  transform: translateX(-50%);
  z-index: 10001;
}
.song-turn {
  width: 100%;
  height: 100%;
  background: url("./img/bg.png") no-repeat;
  background-size: 100%;
}
.start-box {
  position: absolute;
  width: 156px;
  height: 156px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.song-start {
  width: 56px;
  height: 56px;
  background: url("./img/start.png");
  background-size: 100%;
}
.needle {
  position: absolute;
  transform-origin: left top;
  background: url("./img/needle-ab.png") no-repeat;
  background-size: contain;
  width: 73px;
  height: 118px;
  top: -40px;
  left: 112px;
  transition: all 0.6s;
}
.song-img {
  width: 154px;
  height: 154px;
  position: absolute;
  left: 50%;
  top: 50%;
  overflow: hidden;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
.m-song-h2 {
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
  color: #fefefe;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.lrcContent {
  margin-top: 50px;
}
.lrc {
  font-size: 14px;
  color: #fff;
  text-align: center;
}
.left-incon {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  z-index: 10001;
  color: #fff;
}
.ani {
  animation: turn 5s linear infinite;
}
@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>