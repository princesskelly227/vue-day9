<template>
  <div>
    <van-search
      placeholder="请输入搜索关键词"
      v-model="value"
      @input="inputFn(value)"
    />

    <!--  热门搜索-->
    <van-cell title="热门搜索" />
    <van-tag
      type="primary"
      v-for="(item, index) in hotsMusic"
      :key="index"
      @click="clickFn(item.first)"
      >{{ item.first }}</van-tag
    >
    <!-- 最佳匹配 -->
    <van-cell title="最佳匹配" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <SongItem
        v-for="obj in list"
        :key="obj.id"
        :name="obj.name"
        :author="obj.ar[0].name"
        :id="obj.id"
      ></SongItem>
      <!-- <van-cell
        v-for="item in list"
        :key="item.id"
        :title="item.name"
        :label="`${item.ar[0].name}-${item.name}`"
      />
      <template #right-icon>
        <van-icon name="play-circle-o" size="0.6rem" />
      </template> -->
    </van-list>
  </div>
</template>

<script>
import SongItem from '@/components/SongItem.vue';
import { hotSearchApi, searchResultApi } from '@/Apis';
export default {
  data() {
    return {
      hotsMusic: [],
      value: '',
      list: [],
      loading: false, //只有为false, 才能触底后自动触发onload方法
      finished: false, //// 未加载全部 (如果设置为true, 底部就不会再次执行onload, 代表全部加载完成)
      page: 1, // 当前搜索结果的页码
    };
  },
  mounted() {
    this.getHotArr();
  },
  methods: {
    async getHotArr() {
      try {
        const res = await hotSearchApi();
        // console.log(res.data.result.hots);
        this.hotsMusic = res.data.result.hots;
      } catch (e) {}
    },
    async clickFn(val) {
      this.page = 1; // 点击重新获取第一页数据
      this.finished = false; // 点击新关键词-可能有新的数据
      this.value = val;
      try {
        const res = await searchResultApi({ keywords: this.value });
        console.log(res.data.result.songs);
        this.list = res.data.result.songs;
        this.$toast.success('搜索成功');
      } catch (e) {
        this.$toast.fail('搜索失败');
      }
      this.loading = false; // 本次数据加载完毕-才能让list加载更多
    },
    async inputFn(val) {
      // console.log(val);
      if (this.timer) clearTimeout(this.timer);
      // 计时n秒, 最后执行一次, 如果再次触发, 重新计时
      this.timer = setTimeout(async () => {
        this.page = 1; // 点击重新获取第一页数据
        this.finished = false; // 输入框关键字改变-可能有新数据(不一定加载完成了)
        // 如果输入为空 就不请求了
        if (this.value.trim() === '') {
          this.list = [];
          return;
        }
        const res = await searchResultApi({
          keywords: val,
        });
        // console.log(res);
        // 如果获取不到数据 就返回为空
        if (res.data.result.songs == undefined) {
          this.list = [];
          this.$toast.fail('搜索不到');
          return;
        }
        this.list = res.data.result.songs;
      }, 1000);
    },

    async onLoad() {
      // 触底事件(要加载下一页的数据咯), 内部会自动把loading改为true
      this.page++;
      const res = await hotSearchApi();
      if (res.data.result.songs === undefined) {
        // 没有更多数据了
        this.finished = true; // 全部加载完成(list不会在触发onload方法)
        this.loading = false; // 本次加载完成
        return;
      }
      this.list = [...this.list, ...res.data.result.songs];
      this.loading = false; // 数据加载完毕-保证下一次还能触发onload
    },
  },
  components: {
    SongItem,
  },
};
</script>

<style lang="css" scope>
.van-tag--primary {
  margin-left: 10px;
  margin-bottom: 5px;
}
</style>
