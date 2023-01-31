<template>
  <div class="title-wrapper">
    <img :src="url_img + 'ten/message.png'"/>
    <div class="title">حاصل تلاش شما در این چالش تا کنون</div>

    <div class="info-wrapper">
      <div class="coin">
        <div class="text">سکه</div>
        <img class="info-img" :src="url_img + 'ten/info/bitcoin.png'"/>
        <div class="data">{{data.user.coin}}</div>
      </div>

      <div class="point">
        <div class="text">امتیاز</div>
        <img class="info-img" :src="url_img + 'ten/info/star.png'"/>
        <div class="data">{{data.user.point}}</div>
      </div>

      <vue-circle class="progress-circle"
                  :progress="data.progress || data.user.progress"
                  :size="125"
                  :reverse="false"
                  line-cap="butt"
                  :fill="data.user.progress <= 50 || data.progress <= 50 ? fill2 : fill"
                  empty-fill="rgba(0, 0, 0, .1)"
                  :animation='{ duration: 3000, easing: "circleProgressEasing" }'
                  :animation-start-value="0.0"
                  :start-angle="4.73"
                  insert-mode="append"
                  :thickness="18"
                  :show-percent="true">
      </vue-circle>

    </div>
  </div>
</template>

<script>
  import VueCircle from "vue2-circle-progress";
  import {ROAST_CONFIG} from "../../config";

  export default {
    props: ["data"],
    name: "otherChallengers",
    data() {
      return {
        fill: {color: '#27AE60'},
        fill2: {color: '#F2C94C'},
        url_img: ROAST_CONFIG.url_comp_server
      }
    },
    components: {
      VueCircle
    },
    created() {
      // if (this.data.progress < 50) {
      //   this.fill = this.fill2;
      // }
    },
    methods: {}
  }
</script>

<style scoped>

  .title-wrapper {
    font-size: 21px;
    color: #4B0D85;
  }

  .title {
    font-weight: bolder;
    right: 11px;
    position: absolute;
    width: 400px;
    top: 0;
  }

  .info-wrapper {
    position: absolute;
    width: 600px;
  }

  .point {
    position: absolute;
    right: 170px;
    /*top: 50px;*/
  }

  .text {
    position: absolute;
    color: #C7C7C7;
    top: -10px;
  }

  .coin {
    position: absolute;
  }

  .data {
    position: absolute;
    color: #F2994A;
    font-size: 24px;
    top: 24px;
    text-align: left;
    font-weight: bolder;
    margin-right: 2px;
  }

  .info-img {
    position: absolute;
    margin-right: 60px;
    top: 5px;
    width: 40px;
    height: 41px;
  }

  .progress-circle {
    position: absolute;
    right: 650px;
    top: -45px;
    font-size: 16px;
    color: #000;
  }

</style>
