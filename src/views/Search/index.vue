<template>
  <div>
    <van-search shape="round" placeholder="请输入搜索关键词" v-model="value" @input="inputfn"/>
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
        <!-- <van-cell
          v-for="item in list"
          :key="item.id"
          :title="item.name"
          :label="`${item.ar[0].name}-${item.name}`"
        /> -->
      <SongItem
          v-for="obj in list"
          :key="obj.id"
          :name="obj.name"
          :author="obj.ar[0].name"
          :id="obj.id"
></SongItem>
      </van-list>
    </template>
  </div>
</template>
<script>
import { getsearchtagapi, getsearchlistapi } from "@/apis";
import SongItem from '@/components/SongItem.vue'
export default {
  data() {
    return {
      tags: [],
      value: "",
      list: [],
      loading: false,
      finished: false,
      page:1,
      timer:null
    };
  },
  components:{
    SongItem
  },
  created() {
    this.gettag();
  },
  methods: {
    async gettag() {
      try {
        const res = await getsearchtagapi();
        this.tags = res.data.result.hots;
        return res
      } catch (e) {
        console.log(e);
      }
    },
    async clickfn(val) {
      try {
        this.value = val;
        const res = await getsearchlistapi({
          keywords: this.value,
          limit: 20,
        });
        this.list = res.data.result.songs;
        this.$toast.success("成功文案");
      } catch (e) {
        console.log(e);
        this.$toast.fail("失败文案");
      }
    },
    async onLoad() {
      try {
        this.page++
        const res = await getsearchlistapi({
          keywords: this.value,
          limit: 20,
        offset: (this.page - 1) * 20,
        });
        this.list=[...this.list, ...res.data.result.songs]
        this.loading = false;
        if (res.data.result.songs === undefined) {
          this.finished = true; 
          this.loading = false; 
          return;
        }
        // console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    async inputfn(){
      if(this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(async()=>{
        if(this.value.length==0){
        this.list=[]
        return
      }
      try {
        const res = await getsearchlistapi({
          keywords: this.value,
          limit: 20,
        offset: (this.page - 1) * 20,
        })
        // console.log( res);
        if (res.data.result.songs === undefined) {
        this.list = [];
        return;
    }
        this.list=res.data.result.songs
      }catch (e) { console.log(e);}
      },500)
    }
  },
};
</script>
