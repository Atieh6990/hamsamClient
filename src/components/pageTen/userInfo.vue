<template>
  <div>
    <div v-if="(type == 'proType')" class="section">
      <div class="icon"><img class="rank-image" :src="url_img + 'profile/visitProfile/sath.png'"/></div>
      <div class="text">سطح</div>
      <div class="data">{{data.level}}</div>
      <!--      <div class="line"></div>-->
    </div>
    <div class="section">
      <div class="icon"><img class="rank-image" :src="url_img + 'profile/visitProfile/seke.png'"/></div>
      <div class="text">سکه</div>
      <div class="data">{{data.coin}}</div>
      <!--      <div class="line" style="top: 25px;"></div>-->
    </div>
    <div class="section">
      <div class="icon"><img class="rank-image" :src="url_img + 'profile/visitProfile/emtiaz.png'"/></div>
      <div class="text">امتیاز</div>
      <div class="data">{{data.point || data.score}}</div>
      <!--      <div class="line" style="top: 25px;"></div>-->
    </div>
    <div style="display: none" class="section">
      <div class="icon"><img class="rank-image" :src="url_img + 'profile/visitProfile/card.png'"/></div>
      <div class="text">کارت</div>
      <div class="data">فاقد کارت</div>
      <!--<div class="line"></div>-->
    </div>
  </div>
</template>

<script>
    import {ROAST_CONFIG} from "../../config";

    export default {
        props: ["data", 'type'],
        name: "userInfo",
        data() {
            return {
                url_img: ROAST_CONFIG.url_comp_server,
                icons: [
                    'ten/info/rank.png',
                    'ten/info/bitcoin.png',
                    'ten/info/star.png',
                    'ten/info/card.png',
                ],

            }
        }
    }
</script>

<style scoped>
  .wrapper {
    /*display: inline-block;*/
    position: absolute;
    width: 850px;
    left: -70px;
    text-align: right;
  }

  .section {
    width: 202px;
    height: 85px;
    position: relative;
    text-align: right;
    float: right;
    margin-right: 20px;
  }

  .section1 {
    right: 150px;
  }

  .section2 {
    right: 320px;
    top: -4.5px;
  }

  .section3 {
    right: 500px;
    top: -6px;
  }

  .section4 {
    right: 670px;
    top: -4px;
  }

  .icon {
    width: 55px;
    height: 55px;
    position: relative;
    float: left;
    left: 0px;
  }

  .icon-image {
    width: 40px;
    height: 41px;
  }

  .rank-image {
    width: 55px;
    height: 55px;
    position: absolute;
    left: 45px;
  }

  .text {
    width: 100px;
    height: 40px;
    line-height: 40px;
    position: relative;
    float: right;
    right: 20px;
    font-size: 20px;
    color: #838383;
    text-align: center;
  }

  .line {
    width: 43px;
    height: 0px;
    border: 1px solid #BDBDBD;
    transform: rotate(90deg);
    position: absolute;
    right: 110px;
    top: 20px;
  }

  .data {
    width: 100px;
    height: 40px;
    line-height: 40px;
    position: relative;
    float: right;
    right: 20px;
    font-size: 24px;
    color: #3899f8;
    text-align: center;
  }

</style>
