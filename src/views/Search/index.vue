<template>
  <div>
    <van-search shape="round" placeholder="请输入搜索关键词" v-model="value" />
    <!-- 热门搜索 -->
    <van-cell title="热门搜索" />
    <div style="padding: 10px 16px">
      <template v-if='searchList.length ==0'>
        <van-tag
        color="#ccc"
        size="large"
        text-color="#000"
        plain
        round
        type="primary"
        v-for="(item, index) in tags"
        :key="index"
        style="margin-right: 6px"
        @click="clickFn(item.first)"
      >
        {{ item.first }}
      </van-tag>
      </template>
      <template v-else>
        <van-cell title="最佳匹配" />
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="item in searchList"
            :key="item.id"
            :title="item.name"
            :label="`${item.ar[0].name}-${item.name}`"
          />
        </van-list>
      </template>
    </div>
  </div>
</template>
<script>
import { getHotListApi, getSearchListApi } from "@/apis/index";
export default {
  data() {
    return {
      tags: [],
      value: "",
      searchList: [],
      loading: "",
      finished: "",
    };
  },
  created() {
    this.getHotList();
  },

  methods: {
    async getHotList() {
      try {
        const res = await getHotListApi();
        //   console.log(res);
        this.tags = res.data.result.hots;
        // console.log(this.tags);
      } catch (e) {
        //   console.log(错了);
      }
    },
    async clickFn(val) {
      this.value = val;
      try{const res = await getSearchListApi({
        keywords: this.value,
      });

      this.searchList = res.data.result.songs;
      console.log(this.searchList);
      this.$toast.success('成功文案');
      }catch(e){
       this.$toast.fail('失败文案');
      }
      
    },
    onLoad() {},
  },
};
</script>


