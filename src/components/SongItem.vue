<template>
  <div>
    <van-cell center :title="name" :label="author + ' - ' + name" :key="id">
      <template #right-icon>
        <van-icon name="play-circle-o" size="1.5rem" @click="playFn" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    name: String, // 歌名
    author: String, // 歌手
    id: Number, // 歌曲id (标记这首歌曲-为将来跳转播放页做准备)
  },
  methods: {
    playFn() {
      this.$router.push({
        path: '/play',
        query: {
          id: this.id, // 歌曲id, 通过路由跳转传递过去
        },
      });
    },
  },
};
</script>

<style scoped>
/* 给单元格设置底部边框 */
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>
