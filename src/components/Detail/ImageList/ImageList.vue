<template>
  <div class="container">
    <div class="wrapper">
      <div class="slide"> 
        <img v-for="item in skuImageList" :key="item.id" :src="item.imgUrl" @click="changeImg(item.imgUrl)"> 
      </div>
    </div>
    <!-- <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div> -->
  </div>
</template>

<script>

  // import Swiper from 'swiper'
  export default {
    name: "ImageList",
    props:['skuImageList'],
    methods:{
      changeImg(url){
        this.$store.commit('changeImg',url)
      },
      
    }
  }
</script>

<style lang="less" scoped>
  .container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;
    .slide {
      // width: 56px;
      // height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>