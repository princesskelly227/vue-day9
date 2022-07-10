<template>
  <div>
    <van-search shape="round" placeholder="请输入搜索关键词" v-model="value" />
    <template v-if="list.length == 0">
      <van-cell title="热门搜索" />
      <div style="padding: 10px 16px">
        <van-tag
          color="#ccc"
          text-color="#000"
          size="large"
          plain
          round
          type="primary"
          v-for="(item, index) in tags"
          :key="index"
          style="margin-right: 6px"
          @click="clickfn(item.first)"
        >
          {{ item.first }}
        </van-tag>
      </div>
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
          v-for="item in list"
          :key="item.id"
          :title="item.name"
          :label="`${item.ar[0].name}-${item.name}`"
        />
      </van-list>
    </template>
  </div>
</template>
<script>
import { getsearchtagapi, getsearchlistapi } from "@/apis";
export default {
  data() {
    return {
      tags: [],
      value: "",
      list: [],
      loading: false,
      finished: false,
    };
  },
  created() {
    this.gettag();
  },
  methods: {
    async gettag() {
      try {
        const res = await getsearchtagapi();
        // console.log(res);
        this.tags = res.data.result.hots;
        // console.log(this.tags);
      } catch (e) {
        console.log(e);
      }
    },
    async clickfn(val) {
      try {
        this.value = val;
        const res = await getsearchlistapi({
          keywords: this.value,
        });
        // console.log(res);
        this.list = res.data.result.songs;
        // console.log(this.list);
        this.$toast.success("成功文案");
      } catch (e) {
        console.log(e);
        this.$toast.fail("失败文案");
      }
    },
    async onLoad() {
      try {
        const res = await getsearchlistapi({
          keywords: this.value,
          limit: this.limit,
          offset: 0,
        });
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
