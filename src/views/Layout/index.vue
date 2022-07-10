<template>
  <div class="main">
    <!-- 头部导航 -->
    <van-nav-bar :title="this.$route.meta.title" />
    <!-- 中间渲染区域 -->
    <router-view></router-view>
    <!-- 底部导航 -->
    <van-tabbar route>
      <van-tabbar-item to="/layout/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/layout/search" icon="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
    };
  },
  //   点击底部导航栏 头部导航栏会跟着显示相应的title
  //   created() {
  //     console.log(this.$route.meta.title);
  //     this.title = this.$route.meta.title;
  //   },
  //   watch: {
  //     $route() {
  //       this.title = this.$route.meta.title;
  //     },
  //   },
};
</script>

<style scope>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
  /* padding-top: 46px; */
  padding-bottom: 50px;
}
</style>
