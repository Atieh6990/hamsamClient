<template>
  <div class="info-wrapper">
    <img v-if="coin != null" :src="url_img + 'ten/info/bitcoin.png'"/>
    <div v-if="coin != null" class="info-text" style="left: 75px;">{{coin}}</div>
    <img :src="url_img + 'ten/info/star.png'"/>
    <div class="info-text" style="left: 170px;" v-bind:style="coin == null ? {left: '75px'} : {}">{{point}}</div>
  </div>
</template>

<script>
  import {ROAST_CONFIG} from "../../config";

  export default {
    props: ["coin", "point"],
    name: "coinPoint",
    data() {
      return {
        url_img: ROAST_CONFIG.url_comp_server
      }
    },
    created() {
    },
    methods: {}
  }
</script>

<style scoped>

  .info-text {
    font-size: 20px;
    color: #000000;
    font-weight: bolder;
    margin-left: 20px;
    position: absolute;
    top: 3px;
  }

  .info-wrapper {
    direction: ltr;
    position: absolute;
    /*width: inherit;*/
    /*background-color: #2c3e50;*/
    text-align: left;
    width: 200px;
  }

  .info-wrapper > img {
    direction: ltr;
    text-align: left;
    margin-left: 50px;
    display: inline-block;
    width: 36px;
    height: 36px;
  }
</style>
