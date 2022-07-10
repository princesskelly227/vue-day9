<template>
  <div class="home-container">
    <van-cell class="title" title="推荐歌单" />
    <van-grid :border="false" :column-num="3">
      <van-grid-item v-for="item in list" :key="item.id">
        <van-image width="100" height="100" :src="item.picUrl" />
        <p class="music-name van-multi-ellipsis--l2">
          {{ item.name }}
        </p>
      </van-grid-item>
    </van-grid>
    <van-cell class="title" title="最佳匹配" />
   <van-cell :label="`${item.song&&item.song.artists[0]&&item.song.artists[0].name||'未知歌手'} - ${item.name}`" :title="item.name" v-for="item in newlist" :key="item.id">
    <template>
      <van-icon color="#000" name="play-circle-o" size="28" />
    </template>
  </van-cell>
  </div>
</template>

<script>
import { gethomelistapi,getnewhomelistapi } from "@/apis";
export default {
  data() {
    return {
      list: [],
      newlist:[]
    };
  },
  created() {
    this.getlist();
    this.getnewlist()
  },
  methods: {
    async getlist() {
      try {
        const res = await gethomelistapi({
          limit: 6,
        });
        // console.log(res);
        this.list = res.data.result;
      } catch (e) {
        console.log(e);
      }
    },
    async getnewlist() {
      try {
        const res = await getnewhomelistapi();
        console.log(res);
        this.newlist = res.data.result;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang='less'>
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
  .van-cell__value{
    padding-top: 9px;
    flex: 0 0 30px;
  }
}
</style>
