<template>
  <div class="challenge-container">
    <div id="scroll">
      <div v-for="(challenge, index) in data" :id="'challenge_'+(index+1)">
        <div class="challenge" v-bind:class="[activeRoute === 1 && page === active && ypos === 1+index ? 'hover' : '']">
          <div class="image"
               v-if="(challenge.picture || challenge.icon) && (challenge.picture != null || challenge.icon!= null) && (challenge.picture !== undefined || challenge.icon!== undefined)">
            <img v-if="!isActivity" :src="challenge.picture" alt=""/>
            <img v-if="isActivity" :src="challenge.icon" alt=""/>
            <!--<img src="../../assets/images/hamsam.jpg" />-->
          </div>
          <counter v-if="!isActivity" :time="challenge.end" class="counter"></counter>
          <div class="title">
            {{challenge.title}}

            <div class="in-challenge" v-if="(challenge.is_active && !isActivity && challenge.user.status!=1)">در چالش
            </div>
            <div class="in-challenge" v-if="(challenge.is_active &&  !isActivity &&  challenge.user.status==1)">تمام
              شده
            </div>


          </div>

          <div class="desc"
               v-html="challenge.description.length > 75 ? challenge.description.replace(challenge.description.substr(75, challenge.description.length), '...').replace(/(<([^>]+)>)/ig,'') : challenge.description.replace(/(<([^>]+)>)/ig,'')"></div>

          <div class="desc">{{challenge.pasttime}}</div>

          <div class="people">
            <other-challengers :available="4" :people="others" :title="null"></other-challengers>
          </div>

          <div class="coin-point">
            <coin-point :point="challenge.point" :coin="challenge.coin"></coin-point>
          </div>
          <!--progress bar-->
          <div v-if="challenge.user" class="progress-position">
            <vue-circle class="progress-circle"
                        :progress="challenge.user.progress"
                        :size="71"
                        :reverse="false"
                        line-cap="butt"
                        :fill="challenge.user.progress <= 50 ? fill2 : fill"
                        empty-fill="rgba(0, 0, 0, .1)"
                        :animation='{ duration: 3000, easing: "circleProgressEasing" }'
                        :animation-start-value="0.0"
                        :start-angle="4.73"
                        insert-mode="append"
                        :thickness="10"
                        :show-percent="true">
            </vue-circle>
          </div>
        </div>
      </div>
      <div style="height: 40px;"></div>
      <div style="width: 100px; height: 40px;"></div>
    </div>
  </div>
</template>

<script>
  import coinPoint from "./coinPoint"
  import VueCircle from 'vue2-circle-progress'
  import OtherChallengers from "../pageFifteen/otherChallengers";
  import Counter from "../pageSix/Counter";
  import {ROAST_CONFIG} from "../../config";
  import IScroll from "../../js/iscroll";

  export default {
    props: ['data', 'active', 'page', 'activeRoute', "isActivity", "length"],
    name: "challenge",
    data() {
      return {
        desc: [],
        fill: {color: '#27AE60'},
        fill2: {color: '#F2C94C'},
        progressPercent: 0,
        ypos: 1,
        challenges: [],
        myScroll: '',
        // length: '',
        url_img: ROAST_CONFIG.url_comp_server,
        others: []
      }
    },

    created() {
      let _self = this;
      setTimeout(function () {
        // console.log(this.data)
        _self.scrollInit();
        //  console.log(_self.data)
      }, 600);
    },

    watch: {
      data: () => {
        // console.log(this.data)
      }
    },

    components: {OtherChallengers, coinPoint, VueCircle, Counter},

    methods: {

      scrollInit() {
        this.myScroll = new IScroll(".challenge-container", {
          scrollY: true,
          momentum: true,
          scrollbars: "custom",
          preventDefault: false,
          scrollbars: false,
          mouseWheel: true,
          interactiveScrollbars: true,
          shrinkScrollbars: "none",
          fadeScrollbars: false,
          mouseMove: true
        });
      },

      down() {
        if (this.ypos < this.data.length) {
          this.ypos++;
          // if (this.ypos > 4)
          this.myScroll.scrollToElement('#challenge_' + this.ypos, 400, false, -180);
          this.myScroll.refresh();
        }
      },

      up() {
        if (this.ypos > 1)
          this.ypos -= 1;
        this.myScroll.scrollToElement('#challenge_' + this.ypos, 400, false, true);
        this.myScroll.refresh();
      },

      resetScroll() {



        //if (this.myScroll) {
          this.ypos = 1;
          this.myScroll.scrollToElement('#challenge_' + this.ypos, 400, false, true);
          this.myScroll.refresh();
        //}

      },

      enter() {
        return this.data[this.ypos - 1].id
      }
    },


    computed: {
      descriptionCutter() {
        // this.desc = this.desc.substr(25, this.desc.length);
        // for (var i = 0; i < this.desc.length; i++)
        // return this.desc[i];
      }
    }
  }
</script>

<style scoped>
  .challenge {
    background: #F0F0F0;
    border: 1.71383px solid #E4E4E4;
    box-shadow: 0px 3.42766px 23.1367px rgba(0, 0, 0, 0.1);
    border-radius: 8.56916px;
    /*position: absolute;*/
    width: 988px;
    height: 146px;
    margin-right: 65px;
    display: block;
    margin-top: 17px;
    overflow: hidden;
    transition: 1s;
  }

  .aacc {
    margin-top: 20px;
  }

  .image {
    /*border-left: 60px solid transparent;*/
    /*border-right: 1px solid transparent;*/
    height: 146px;
    width: 190px;
    /*top: -1px;*/
    /*right: -3px;*/
    position: absolute;
    overflow: hidden;
    border-radius: 8.56916px;
  }

  .image > img {
    width: 190px;
    height: 146px;
    /*margin-top: 20px;*/
  }

  .counter {
    position: absolute;
    margin-right: -440px;
    margin-top: 95px;
  }

  .title {
    font-size: 24px;
    text-align: right;
    font-weight: bolder;
    position: absolute;
    margin-right: 200px;
    margin-top: 8px;
    width: 580px;
    height: 45px;
    color: #003366;
    line-height: 45px;
    /*background-color: burlywood;*/
  }

  .desc {
    font-size: 18px;
    text-align: right;
    font-weight: normal;
    color: #484848;
    margin-right: 200px;
    position: absolute;
    margin-top: 50px;
    width: 670px;
  }

  #scroll {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
  }

  .challenge-container {
    width: 1110px;
    height: 970px;
    /*background-color: #e50;*/
    position: absolute;
    right: 20px;
    text-align: center;
    /*top: 204px;*/
    overflow: hidden;
    /*white-space: nowrap;*/
  }

  .coin-point {
    position: relative;
    margin-right: 820px;
    /*margin-top: -192px;*/
  }

  .progress-position {
    position: relative;
    margin-right: 860px;
    margin-top: 60px;
  }

  .in-challenge {
    /*position: relative;*/
    margin-bottom: 5px;
    margin-right: 10px;
    width: 75px;
    height: 29px;
    line-height: 29px;
    background: #003366;
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
