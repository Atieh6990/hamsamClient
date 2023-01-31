<template>
  <!--  <div>-->
  <div class="challenge">
    <div class="challengeScroll">
      <div :id="'ch_' + (index + 1)" :ref="'ch_' + (index + 1)" v-for="(challenge, index) in data" class="challengeList"
           v-bind:class="[(hover &&  yCH == index + 1) ? 'hover' : '']">
        <img :src="challenge.picture" class="img"/>
        <div class="title" v-bind:style="{color: challenge.color}">{{challenge.title}}
          <!--<div class="in-challenge" v-if="(challenge.is_active != null)">در چالش</div>-->
        </div>
        <!--        <div class="desc" v-html="descriptionCutter"></div>-->
        <div class="progress-position">
          <vue-circle :id="'circle_' + (index + 1)" :ref="'circle_' + (index + 1)" class="progress-circle"
                      :progress="challenge.user.progress"
                      :size="71"
                      :reverse="false"
                      line-cap="butt"
                      empty-fill="rgba(0, 0, 0, .1)"
                      :animation='{ duration: 3000, easing: "circleProgressEasing" }'
                      :animation-start-value="0.0"
                      :start-angle="4.73"
                      insert-mode="append"
                      :thickness="10"
                      :show-percent="true">
          </vue-circle>
        </div>
        <div class="coin-point">
          <coin-point :coin="challenge.coin" :point="challenge.point"></coin-point>
        </div>
        <div class="counter">
          <counter :time="challenge.end"></counter>
        </div>
        <!--progress bar-->
      </div>
    </div>
  </div>
  <!--  </div>-->
</template>

<script>

  import VueCircle from 'vue2-circle-progress'
  import OtherChallengers from "../pageFifteen/otherChallengers";
  import CoinPoint from "../pageFifteen/coinPoint";
  import Counter from "../pageSix/Counter";
  import IScroll from "../../js/iscroll"

  export default {
    props: ['data', "length", "hover"],
    name: "challenge",
    data() {
      return {
        desc: '',
        // fill: {},
        // // fill: {color: '#27AE60'},
        // // fill2: {color: '#F2C94C'},
        progressPercent: 0,
        yCH: 1,
        myScroll: ''
      }
    },
    created() {
      let _self = this
      setTimeout(() => {
        _self.scrollInit();
      }, 100);
    },
    components: {Counter, OtherChallengers, VueCircle, CoinPoint},
    methods: {
      scrollInit() {

        this.myScroll = '';
        if (this.myScroll == '') {
          this.myScroll = new IScroll(".challenge", {
            scrollY: true,
            scrollbars: "custom",
            momentum: true,
            preventDefault: false,
            scrollbars: true,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: "none",
            fadeScrollbars: false,
            mouseMove: true
          });
        }


      },
      down() {
        if (this.yCH < this.data.length) {
          this.yCH++;
          this.myScroll.refresh();
          this.myScroll.scrollToElement('#ch_' + this.yCH, 1000, false, true);
          return true;
        }
      },

      up() {
        if (this.yCH === 1)
          return false;
        else {
          if (this.yCH > 0) {
            this.yCH--;
            this.myScroll.refresh();
            this.myScroll.scrollToElement('#ch_' + this.yCH, 1000, false, true);
            return true;
          }
        }

      },
      right() {
        return false
      },
      left() {
        this.leftSide();
      },
      leftSide() {
        this.$root.$emit('leftsideMenu_active');
        this.activeRoute = 0;
      },
      enter() {
        return this.data[this.yCH - 1];
      }
    },
    // computed: {
    //   // descriptionCutter() {
    //   //   if (this.data[this.yCH]['description'] !== '')
    //   //     this.data[this.yCH]['description'] = this.data[this.yCH]['description'].replace(this.data[this.yCH]['description'].substr(45, this.data[this.yCH]['description'].length), "...");
    //   //   return this.data[this.yCH]['description'];
    //   // }
    //   colorFill() {
    //
    //     for (var i = 0; i < this.data.length; i++) {
    //       // alert(i + '-' + this.data[i]['user']['progress'] + '-' + JSON.stringify(this.fill))
    //       if (this.data[i]['user']['progress'] < 60) {
    //         this.fill = {};
    //         // alert('iff ->' + this.data[i]['user']['progress'])
    //         // this.fill = {color: 'red'};
    //       } else {
    //         // alert('elsee ->' + this.data[i]['user']['progress'])
    //         this.fill = {};
    //         // this.fill = {color: 'green'};
    //       }
    //
    //     }
    //
    //
    //   }
    //
    // },
  }
</script>

<style scoped>
  .challenge {
    width: 765px;
    height: 255px;
    position: absolute;
    top: 90px;
    left: 12px;
    overflow: hidden;
  }


  .challengeScroll {
    position: absolute;
  }

  .challengeList {
    width: 715px;
    height: 105px;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.52);
    display: block;
    margin-top: 17px;
    margin-right: 35px;
    transition: 1s;
  }

  .img {
    width: 120px;
    height: inherit;
    /*position: absolute;*/
  }

  .trapezoid {
    border-bottom: 170px solid red;
    border-left: 60px solid transparent;
    border-right: 1px solid transparent;
    height: 0px;
    width: 150px;
    top: -1px;
    right: -3px;
    position: absolute;
    border-bottom-left-radius: 10px;
    overflow: hidden;
  }

  .counter {
    position: relative;
    float: left;
    left: 45px;
    top: -47px;
  }

  .trapezoid > img {
    width: 244px;
    height: 101px;
    position: absolute;
    right: 0;
  }

  .title {
    font-size: 24px;
    text-align: right;
    font-weight: bolder;
    position: relative;
    margin-right: 130px;
    margin-top: -115px;
    width: 280px;
    height: 105px;
    line-height: 105px;
  }

  .desc {
    font-size: 18px;
    text-align: right;
    font-weight: normal;
    color: #484848;
    margin-right: 130px;
    position: relative;
    margin-top: 3px;
  }

  .coin-point {
    position: relative;
    float: left;
    left: 195px;
    top: -95px;
  }

  .progress-position {
    position: relative;
    float: left;
    top: -88px;
    left: 20px;
  }

  .in-challenge {
    /*position: absolute;*/
    width: 75px;
    height: 29px;
    background: #191450;
    border-radius: 10px;
    font-size: 14px;
    color: white;
    text-align: center;
    display: inline-block;
  }

  .hover {
    transform: scale(1.03);
    transition: 0.5s;
    background: linear-gradient(0deg, rgba(66, 127, 199, 0.3) 0%, rgba(178, 152, 200, 0.05) 33.48%, rgba(255, 255, 255, 0) 65.86%), #FFFFFF;
    /*border: 2px solid #DADADA;*/
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
    /*border-radius: 5px;*/
  }

  .people {
    position: relative;
    margin-top: 12px;
    right: 180px;
  }
</style>
