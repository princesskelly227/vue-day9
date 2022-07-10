<template>
  <div class="home-container">
    <!-- 推荐歌单 -->
    <van-cell class="title" title="推荐歌单" />
    <van-grid :border="false" :column-num="3">
      <van-grid-item v-for="item in list" :key="item.id">
        <van-image width="100" height="100" :src="item.picUrl" />
        <p class="music-name van-multi-ellipsis--l2">
          {{ item.name }}
        </p>
      </van-grid-item>
    </van-grid>

    <!--最新音乐  -->
    <van-cell class="title" title="最新音乐" />
    <SongItem
      v-for="obj in newList"
      :key="obj.id"
      :name="obj.name"
      :author="obj.song.artists[0].name"
      :id="obj.id"
    ></SongItem>
  </div>
</template>

<script>
//
import SongItem from '@/components/SongItem.vue';
// 引入歌单接口地址
import { getMusicAPi, getNewMusicApi } from '@/Apis/index';
export default {
  data() {
    return {
      list: [],
      newList: [],
    };
  },
  mounted() {
    this.getList();
    this.getNewList();
  },
  methods: {
    // 请求数据
    async getList() {
      try {
        const res = await getMusicAPi({
          limit: 6,
        });
        console.log(res.data.result);
        this.list = res.data.result;
      } catch (e) {
        console.log(e);
      }
    },
    async getNewList() {
      try {
        const res = await getNewMusicApi({});
        this.newList = res.data.result;
        // console.log(res.data.result);
      } catch (e) {
        console.log(e);
      }
    },
  },
  components: {
    SongItem,
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
  .van-cell__value {
    padding-top: 10px;
    flex: 0 0 30px;
  }
}
</style>
