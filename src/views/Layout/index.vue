<template>
  <div style="padding-bottom:50px">
    <van-nav-bar :title="this.$route.meta.title" />
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/layout/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/layout/search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
</script>
<style>
</style>