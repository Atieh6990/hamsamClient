<template dir="rtl">
  <div class="container">
    <countdown-counter v-if="renderFlag && obj[ypos - 1].start" :time="obj[ypos-1].end" :start="obj[ypos-1].start"
                       class="countdown"></countdown-counter>
    <!--<hamsam-logo class="hamsam-logo"></hamsam-logo>-->
    <div v-if="obj[ypos-1].picture && obj[ypos-1].picture != null && obj[ypos-1].picture !== undefined"
         class="pic-wrapper">
      <img :src="obj[ypos-1].background2"/>
      <!--<img src="../../assets/images/hamsam.jpg" />-->
    </div>
    <div class="title">
      {{obj[ypos-1].title}}
    </div>
    <div class="info-wrapper">
      <coin-point :coin="obj[ypos-1].coin" :point="obj[ypos-1].point"></coin-point>
    </div>
    <div class="description" v-html="obj[ypos - 1].description.replace(/(<([^>]+)>)/ig,'')"></div>
    <!--<div class="other-challengers">-->
    <!--<other-challengers :available="4" :title="'افراد دیگری که در این چالش شرکت کرده اند'"></other-challengers>-->
    <!--</div>-->
    <!--<div class="activity-container" v-if="obj[ypos -1].activity">-->
    <!--<activity ref="act" :data="obj[ypos-1].activity">-->
    <!--&lt;!&ndash;:page="1" :active="1" :activeRoute="1" :data="acts">&ndash;&gt;-->
    <!--</activity>-->
    <!--</div>-->
  </div>
</template>
obj[ypos - 1]
<script>
  import HamsamLogo from '../pageFifteen/hamsamLogo';
  import CountdownCounter from '../pageFifteen/countdownCounter';
  import OtherChallengers from "../pageFifteen/otherChallengers"
  import Activity from "../pageFifteen/activity";
  import coinPoint from "../pageFifteen/coinPoint";

  export default {
    props: ["money", "score", "obj", "activities", "ypos", "renderFlag"],
    name: "counter",
    data() {
      return {
        timer: 0,
        tt: 0,
        show: true
      }
    },
    activated() {
      // this.timer = this.countdown();
    },

    created() {

    },
    components: {Activity, OtherChallengers, HamsamLogo, CountdownCounter, coinPoint},
    methods: {}
  }
</script>

<style scoped>

  .container {
    width: 678px;
    height: 1500px;
    position: absolute;
    /*top: 221px;*/
    /*background-color: yellowgreen;*/
    border-right: 1px dashed #bdbdbd;
  }

  .pic-wrapper {
    /*position: absolute;*/
    width: 641px;
    height: 340px;
    margin-right: 18px;
    /*top: 221px;*/
    box-shadow: 0px 4px 23px rgba(178, 125, 84, 0.4);
    border-radius: 20px;
    overflow: hidden
  }

  .pic-wrapper > img {
    object-fit: contain;
    width: 641px;
    /*margin-top: 50px;*/
    /*height: 340px;*/


    /*max-width: 100%;*/
    /*max-height: 100%;*/
  }

  .hamsam-logo {
    position: absolute;
    top: 300px;
    right: 35px;
    z-index: 2
  }

  .countdown {
    position: absolute;
    top: 26px;
    right: 400px;
  }

  .title {
    font-size: 24px;
    text-align: right;
    position: absolute;
    top: 350px;
    right: 30px;
    font-weight: bold;
    color: #003366;
    width: 350px;
  }

  .info-wrapper {
    direction: ltr;
    position: absolute;
    top: 177px;
    left: -15px;
    width: inherit;
    /*background-color: #2c3e50;*/
    text-align: left;
  }

  .info-wrapper > img {
    direction: ltr;
    text-align: left;
    margin-left: 50px;
    display: inline-block;
    width: 36px;
    height: 36px;
  }

  .info-text {
    font-size: 20px;
    color: #000000;
    font-weight: bolder;
    padding-left: 20px;
    position: absolute;
    top: 3px;
  }

  .description {
    position: absolute;
    font-size: 18px;
    line-height: 31px;
    text-align: justify;
    color: #000;
    width: 640px;
    height: 200px;
    top: 440px;
    right: 20px;
  }

  .other-challengers {
    position: absolute;
    top: 570px;
  }

  .activity-container {
    position: absolute;
    right: 0px;
    top: 690px;
  }

</style>
