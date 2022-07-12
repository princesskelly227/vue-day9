<template>
  <div class='home-container'>
    <van-cell class='title' value="推荐歌单" />
    <van-grid :border="false" :column-num="3">
      <van-grid-item v-for='item in picList' :key='item.id'>
        <van-image width="100" height="100" :src="item.picUrl" />
        <p class="music-name van-multi-ellipsis--l2">{{item.name}}</p>
      </van-grid-item>
    </van-grid>
    <van-cell class='title' value="最新音乐" />
    <van-cell :label="`${item.song.artists[0].name}-${item.name}`" :title="item.name" v-for='item in newList' :key="item.id">
    <template >
      <van-icon color="#000" name="play-circle-o" size="28" />
    </template>
  </van-cell>

  </div>
</template>

<script>
import { getRecommandListApi,getNewsongListApi} from "@/apis/index";
export default {
  data() {
    return {
      picList: [],
      newList:[]
    };
  },
  created() {
    this.getList();
    this.getSong()
  },
  methods: {
    async getList() {
      try {
        const res = await getRecommandListApi({ limit: 6 });
        console.log(res.data.result);
        this.picList = res.data.result;
      } catch (e) {
        console.log(e);
      }
    },
     async getSong(){
        try{
            const res = await getNewsongListApi();
            
            this.newList = res.data.result;
            // console.log(this.newList);
        } catch (e){
            // console.log('错了');
        }
    }
  },
};
</script>

<style lang="less" scoped>
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
  .van-cell__value{
    padding-top: 9px;
  }
.van-cell__label{
    width: 300px;
}
  /deep/.van-grid-item__content {
    padding: 10px 0px;
  }
}
</style>
