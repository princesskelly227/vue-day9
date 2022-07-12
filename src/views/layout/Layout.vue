<template>
<div>
     <van-nav-bar :title="tname" />
     <router-view></router-view>
     <van-tabbar route >
  <van-tabbar-item icon="home-o" to="/Layout/Home">首页</van-tabbar-item>
  <van-tabbar-item icon="search" to="/Layout/Search">搜索</van-tabbar-item>
  
</van-tabbar>
 
</div>
</template>

<script>
export default {
data(){
    return{
        tname:''
    }
},
mounted(){
     this.tname=this.$route.meta.title
  },
 watch: {
    $route(newVal) {
      this.tname = newVal.meta.title; // 提取切换后路由信息对象里的title显示
    },
  },
}
</script>

<style>

</style>