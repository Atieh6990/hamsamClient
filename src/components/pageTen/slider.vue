<template>
  <div class="wrapper">
    <!--<div class="soosk"></div>-->
    <div class="mainImage">
      <!--<hamsam-logo style="z-index: 3; opacity: 100%"></hamsam-logo>-->
      <transition name="fade">
        <!--                <img v-show="show" v-bind:src="this.url_image + 'ten/slider/'+xpos+'.jpg'"/>-->
        <img v-show="show" :src="images[xpos-1]"/>
      </transition>
      <!--<div class="tag">-->
      <!--<div dir="ltr" class="tag-time">-->
      <!--{{this.timer}}-->
      <!--</div>-->
      <!--</div>-->

      <countdown-counter class="countdown" :time="data.end"></countdown-counter>

    </div>

    <div class="bottom-container">
      <div class="bottom">
        <img :src="data.icon"/>
        <img :src="data.picture"/>
        <img :src="data.background1"/>
        <img :src="data.background2"/>
        <!--        <img :src="this.url_image + 'ten/slider/1.jpg'"/>-->
        <!--        <img :src="this.url_image + 'ten/slider/2.jpg'"/>-->
        <!--        <img :src="this.url_image + 'ten/slider/3.jpg'"/>-->
        <!--        <img :src="this.url_image + 'ten/slider/4.jpg'"/>-->
        <br/>
        <div class="hover-wrappper">
          <div class="hover" v-show="(xpos === 1 && active === page && activeRoute === 1)"></div>
          <div class="hover" style="margin-right: 225px;"
               v-show="(xpos === 2 && active === page && activeRoute === 1)"></div>
          <div class="hover" style="margin-right: 430px;"
               v-show="(xpos === 3 && active === page && activeRoute === 1)"></div>
          <div class="hover" style="margin-right: 635px;"
               v-show="(xpos === 4 && active === page && activeRoute === 1)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import Countdown from 'vuejs-countdown-timer'
    import HamsamLogo from "./hamsamLogo";
    import CountdownCounter from "../pageTen/countdownCounter";
    import {ROAST_CONFIG} from "../../config"

    Vue.use(Countdown);

    export default {
        props: ["page", "activeRoute", "active", "data"],
        name: "slider",
        data() {
            return {
                mainImage: '',
                url_image: ROAST_CONFIG.url_comp_server,
                xpos: 1,
                show: true,
                timer: 0,
                day: 0,
                hour: 0,
                minute: 0,
                second: 0,
                intervalCount: "",
                intervalPic: "",
                images: []
                //    images: [this.url_image + 'ten/slider/1.jpg', this.url_image + 'ten/slider/2.jpg', this.url_image + 'ten/slider/3.jpg', this.url_image + 'ten/slider/4.jpg'],
            }
        },
        components: {HamsamLogo, Countdown, CountdownCounter},
        methods: {
            left() {
                if (this.xpos < 4) {
                    this.xpos++;
                    return true;
                }
                return false;
            },
            right() {
                if (this.xpos > 1) {
                    this.xpos -= 1;
                    return true;
                }
                return false;
            },
            down() {
                return false
            },
            changeMainPic() {
                this.show = false;
                this.mainImage = this.images[this.xpos - 1];
                var __self = this;
                setTimeout(function () {
                    __self.show = true;
                }, 300)
            },
            countdown() {
                var countDownDate = new Date("Feb 15, 2019 15:00:00").getTime();

                var _self = this;

                _self.intervalCount = setInterval(function () {

                    var now = new Date().getTime();
                    var distance = countDownDate - now;
                    // Time calculations for days, hours, minutes and seconds
                    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    _self.timer = days + " : " + hours + " : "
                        + minutes + " : " + seconds;

                    if (distance < 0) {
                        clearInterval(_self.intervalCount);
                    }
                }, 1000);
            }
        },
        created() {
            this.images = [this.data.background2, this.data.background1, this.data.picture, this.data.icon];
            this.mainImage = this.images[0];
            // var _self = this;
            // clearInterval(this.intervalPic);
            // this.intervalPic = setInterval(function () {
            //     _self.xpos < 4 ? _self.xpos++ : _self.xpos = 1;
            //     _self.changeMainPic();
            // }, 4000);
            this.timer = this.countdown();
        }, activated() {

            if (this.timer) {

                this.timer = this.countdown();
                this.mainImage = this.images[0];
                // var _self = this;
                // clearInterval(this.intervalPic);
                // this.intervalPic = setInterval(function () {
                //     _self.xpos < 4 ? _self.xpos++ : _self.xpos = 1;
                //     _self.changeMainPic();
                // }, 4000);
            }

        }, deactivated() {

            clearInterval(this.intervalCount);
            clearInterval(this.intervalPic);


        }
    }
</script>

<style scoped>

  .wrapper {

  }

  .mainImage {
    /*position: absolute;*/
    width: 802px;
    height: 425px;
    border-radius: 20px;
    box-shadow: 0px 4px 23px rgba(178, 125, 84, 0.4);
    overflow: hidden;
  }

  .mainImage > img {
    width: 802px;
    height: 425px;
  }

  .countdown {
    position: absolute;
    top: 320px;
    right: 465px;
  }

  .bottom {
    /*position: absolute;*/
    width: inherit;
    margin-top: 40px;
    margin-left: -12.5px;
  }

  .bottom-container {
    position: relative;
  }

  .bottom > img {
    display: inline-block;
    width: 190px;
    height: 123px;
    margin-left: 11px;
    border-radius: 10px;
  }

  .hover-wrappper {
    position: absolute;
    right: -17px;
  }

  .tag {
    position: absolute;
    width: 337px;
    height: 73.47px;
    top: 320px;
    right: 465px;
    background: #FC4A1A;
    opacity: 0.8;
    border-radius: 0px 24.5px 24.5px 0px;
    box-shadow: 0px 4px 23px rgba(0, 0, 0, 0.4);
    z-index: 2
  }

  .tag-time {
    color: #fff;
    font-size: 40px;
    /*font-weight: bolder;*/
    top: 6px;
    right: 40px;
    line-height: 70px;
    position: absolute;
  }

  .hover {
    position: absolute;
    background-color: #FE9923;
    /*width: 184px;*/
    width: 0px;
    height: 5px;
    margin-right: 18px;
    margin-top: 10px;
    -webkit-animation-name: move; /* Safari 4.0 - 8.0 */
    -webkit-animation-duration: 0.6s; /* Safari 4.0 - 8.0 */
    animation-name: move;
    animation-duration: 0.6s;
    animation-fill-mode: forwards;
  }

  .fadeImage {
    -webkit-animation-name: fade; /* Safari 4.0 - 8.0 */
    -webkit-animation-duration: 0.5s; /* Safari 4.0 - 8.0 */
    animation-name: fade;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }

  @-webkit-keyframes move {
    from {
      width: 0px
    }
    to {
      width: 184px
    }
  }

  @keyframes move {
    from {
      width: 0px
    }
    to {
      width: 184px
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .8s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0.5;
  }

</style>
