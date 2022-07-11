<template>
  <div class="home-container">
    <van-cell class="title" title="推荐歌单" />
    <van-grid :border="false" :column-num="3">
      <van-grid-item v-for="item in list" :key="item.id">
        <van-image width="100" height="100" :src="item.picUrl" />
        <p class="music-name van-multi-ellipsis--l2">
          {{item.name}}
        </p>
      </van-grid-item>
    </van-grid>
    <van-cell class="title" title="最新音乐" />
    <SongItem v-for="obj in newlist"
    :key="obj.id"
    :name="obj.name"
    :author="obj.song.artists[0].name"
    :id="obj.id"
    ></SongItem>
      <template>
        <van-icon color="#000" name="play-circle-o" size="26" />
      </template>
  </div>
</template>

<script>
import { getRecommendListAPI, getNewSongListAPI } from '@/apis';
import SongItem from '@/components/SongItem.vue'
export default {
  data() {
    return {
      list: [],
      newlist: []
    };
  },
  components: {
    SongItem,
  },
  mounted() {
    this.getList();
    this.getNewSongList()
  },
  methods: {
    async getList() {
      try {
        const res = await getRecommendListAPI({
          limit: 6,
        });
        console.log(res.data.result);
        this.list = res.data.result;
      } catch (e) {
        console.log(e);
      }
    },
    async getNewSongList() {
      try {
        const res = await getNewSongListAPI({
        //   limit: 20,
        });
        console.log(res.data.result);
        this.newlist = res.data.result;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="less" scope>
.home-container {
  .title {
    background-color: #c71d24;
    color: #fff;
  }

  .music-name {
    font-size: 12px;
    text-align: left;
    line-height: 20px;
    width: 100%;
    padding: 0 5px;
    box-sizing: border-box;
    height: 37px;
  }

  /deep/.van-grid-item__content {
    padding: 10px 0px;
  }
}
</style>
