<template>
  <div>
    <van-search
      v-model="value"
      shape="round"
      placeholder="请输入搜索关键词"
      @input="inputFn"
    />

    <div class="search_wrap" v-if="resultList.length === 0">
      <p class="hot_title">热门搜索</p>
      <!-- 热搜关键词容器 -->
      <div class="hot_name_wrap">
        <!-- 每个搜索关键词 -->
        <span
          class="hot_item"
          v-for="(obj, index) in hotArr"
          :key="index"
          @click="fn(obj.first)"
          >{{ obj.first }}</span
        >
      </div>
    </div>
    <div class="search_wrap" v-else>
      <p class="hot_title">最佳匹配</p>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <SongItem
          v-for="obj in resultList"
          :key="obj.id"
          :name="obj.name"
          :author="obj.ar[0].name"
          :id="obj.id"
        ></SongItem>
        <template #right-icon>
          <van-icon name="play-circle-o" size="0.6rem" />
        </template>
      </van-list>
    </div>
  </div>
</template>
<script>
import { hotSearchAPI, searchResultAPI } from '@/apis'
import SongItem from '@/components/SongItem.vue'
export default {
  data() {
    return {
      value: '',
      hotArr: [],
      resultList: [],
      loading: false,
      finished: false,
      page: 1,
      timer: null,
    }
  },
  components: {
    SongItem,
  },
  async created() {
    const res = await hotSearchAPI()
    console.log(res)
    this.hotArr = res.data.result.hots
  },
  methods: {
    async getListFn() {
      return await searchResultAPI({
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20,
      })
    },
    async fn(val) {
      this.page = 1
      this.finished = false
      this.value = val
      const res = await this.getListFn()
      console.log(res)
      this.resultList = res.data.result.songs
      this.loading = false
    },
    async inputFn() {
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        this.page = 1
        this.finished = false
        if (this.value.length === 0) {
          this.resultList = []
          return
        }
        const res = await this.getListFn()
        console.log(res)
        if (res.data.result.songs === undefined) {
          this.resultList = []
          return
        }
        this.resultList = res.data.result.songs
        this.loading = false
      }, 900)
    },
    async onLoad() {
      this.page++
      const res = await this.getListFn()
      if (res.data.result.songs === undefined) {
        // 没有更多数据了
        this.finished = true // 全部加载完成(list不会在触发onload方法)
        this.loading = false // 本次加载完成
        return
      }
      this.resultList = [...this.resultList, ...res.data.result.songs]
      this.loading = false
    },
  },
}
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}

/* 给单元格设置底部边框 */
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>
