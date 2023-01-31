<template>
  <div class="pageParent" v-if="detail.name">

    <div class="detailsParent">

      <img :src="detail.avatar.hdpi" class="poster">
      <div class="Pname">{{ episodeName }}</div>
      <div class="Ename">{{ detail.name_english }}</div>
      <div class="catParent">
        <div class="cat" v-for="(item,index) in detail.category">{{ item }}</div>
      </div>
      <div class="duration">{{ detail.date_create }}</div>
      <div class="description">{{ detail.short_description }}</div>

    </div>

    <div class="demoParent">

      <div v-if="showPoster">

        <img :src="posterUrl" class="playBox">
        <div class="playOnPoster">
          <img :src="playOnPoster" class="">
        </div>

      </div>

      <object id="av-player" type="application/avplayer"
              :class="[fullScreen ? 'playFullScreen' : 'playBox']" v-else></object>


      <div v-if="showSeekBar" :class="[(fullScreen) ? 'statusBar_1' : 'statusBar_0']">

        <div class="totalDuration">{{ totalDuration }}</div>
        <div class="currentTime">{{ currentTime }}</div>

        <div :class="[(fullScreen) ? 'seekBar_1' : 'seekBar_0']">
          <div class="seekBarMove" :style="{ width: seekPercent+'%' }"></div>
        </div>

      </div>


      <div class="btnHover" style="left: 0px;" v-if="btnIndex==0 && activeRoute == 1 && yPage ==0"></div>
      <div class="button play">
        <img :src="playIcon" class="btnIcon">
        <span class="btnTxt">پخش ویدئو</span>
      </div>

      <div class="btnHover" style="left: 362px;" v-if="btnIndex==1 && activeRoute == 1 && yPage ==0"></div>
      <div class="button fullScreen">
        <img :src="fullScreenIcon" class="btnIcon">
        <span class="btnTxt">بزرگ نمایی</span>
      </div>

    </div>


    <div class="line"></div>


    <div class="Parent-filickty">
      <flickity class="flickity onlineFilms" ref="flickity" :options="flickityOptions">

        <div v-for="(item,index) in detail.files" class="carousel-cell" :key="index"
             :class="[xpos==index && activeRoute==1  && yPage==1 ? 'active' : '',xpos == films.length-1&& activeRoute==1 && yPage== 1 ? 'ml--33' : '',xpos == 0&& activeRoute==1  && yPage== 1 ? 'ml-0' : '',
             'carousel-cell' ,(index == 0)? 'removeMargin':'' ]"
        >
          <img class="img" :src="detail.avatar.hdpi">
          <div class="episode">قسمت {{index +1}}</div>
        </div>





      </flickity>
    </div>


  </div>
</template>

<script>
import {ROAST_CONFIG} from "../config";
import Flickity from 'vue-flickity';
import api from '../api/onlineFilms'
import Player from "../js/player";
import {page} from "vue-analytics";
import challenge from "../api/challenge";

export default {
  name: "videoDetails",
  components: {Flickity},
  data() {
    return {
      detail: '',
      activeRoute: 1,
      filmId: this.$route.query.filmId,
      films: this.$route.query.films,
      episodeName:'',
      posterUrl: '',
      playIcon: (ROAST_CONFIG.url_Img_server + 'onlineFilms/play.png'),
      fullScreenIcon: (ROAST_CONFIG.url_Img_server + 'onlineFilms/fullScreen.png'),
      playOnPoster: (ROAST_CONFIG.url_Img_server + 'onlineFilms/playOnPoster.png'),
      btnIndex: 0,
      yPage: 0,
      xpos: 0,
      indexToStartScroll: 8,
      streamLink: '',
      flickityOptions: {
        pageDots: false,
        accessibility: false,
        contain: true,
        draggable: false,
        freeScroll: false,
        adaptiveHeight: true,
        prevNextButtons: false,
        cellAlign: 'right',
        rightToLeft: true
      },
      playerObj: '', fullScreen: false, showPoster: true,
      totalDuration: '', currentTime: '', seekPercent: 0,
      handleSeekBar: '', showSeekBar: false
    }
  },
  beforeDestroy: function () {
    // console.log("beforeDestroy videoDetail!!!")
    this.playerObj.stop();
    this.playerObj.closeVideo();
  },
  deactivated: function () {
    // console.log("deactivated videoDetail!!!")
    this.playerObj.stop();
    this.playerObj.closeVideo();
  },
  created() {
    this.getProductDetail(this.filmId);

    this.$root.$on('playerTimeData', (data) => {
      let _self = this;
      setTimeout(() => {
        _self.currentTime = data.timeNow
        _self.totalDuration = data.totalDurationShow
        _self.seekPercent = data.percentVideo
        // console.log(data)
      }, 10)


    });

  },
  methods: {
    getProductDetail(id) {
      // console.log('id', id)
      api.productDetail(id).then(data => {
        this.detail = data
        this.episodeName = this.detail.name;
        this.posterUrl = this.detail.feature_avatar.hdpi;
        this.getStreamLink(this.detail.files[0].id)
      })
    },

    getStreamLink(id) {
      api.streamLink(id).then(data => {
        this.streamLink = data.stream_link
        page({
          page: 'episode id' + id,
          title: 'episode id' + id
        })

        this.playerObj = new Player.VideoPlayer(1);
      })
    },

    next() {
      this.$refs.flickity.next();
    },

    previous() {
      this.$refs.flickity.previous();
    },

    left() {
      switch (this.yPage) {
        case 0:

          if (this.btnIndex == 0) {
            this.activeRoute = 0;
            this.$root.$emit('leftside_active');
            return false
          } else {
            this.btnIndex = 0;
            return false
          }

          break;
        case 1:

          if (this.xpos < this.detail.files.length - 1) {
            // if (this.xpos < 14) {
            this.xpos++
            if (this.xpos > this.indexToStartScroll)
              this.next();

            return false
          } else {
            this.activeRoute = 0;
            this.$root.$emit('leftside_active');
            return false
          }

          break
      }

    },
    right() {
      switch (this.yPage) {
        case 0:
          if (this.btnIndex == 1) {
            this.activeRoute = 0;
            this.$root.$emit('sideMenu_active');
            return false
          } else {
            this.btnIndex = 1;
            return false
          }
          break;

        case 1:

          if (this.xpos > 0) {
            this.previous();
            this.xpos--
            return false
          } else {
            this.activeRoute = 0
            this.$root.$emit('sideMenu_active');
            return false
          }

          break
      }
    },
    down() {
      this.yPage = 1
    },
    up() {
      this.yPage = 0
    },
    enter() {

      switch (this.yPage) {
        case 0:

          if (this.btnIndex == 0) {

            if (this.playerObj.videoState() != "PLAYING") {
              this.showPoster = false;
              this.playVideo();
              this.sendChallenge();
            }

          } else {

            if (this.playerObj.videoState() == "PLAYING") {
              this.fullScreen = true;
              this.$root.$emit('sideMenu_deactive');
              this.$root.$emit('sideMenu_hide');
              this.$root.$emit('leftside_hide');
              this.$root.$emit('header_hide');
              this.playerObj.toggleFullscreen();
            }

          }

          break
        case 1:
          // console.log(this.detail.files[this.xpos].id)
          this.resetParams();
          this.episodeName = this.detail.files[this.xpos].name
          this.getStreamLink(this.detail.files[this.xpos].id)
          // this.getProductDetail(this.detail.files[this.xpos].id);
          break
      }

    },
    back() {
      if (this.fullScreen == true) {
        this.fullScreen = false;
        this.$root.$emit('sideMenu_show');
        this.$root.$emit('leftside_show');
        this.$root.$emit('header_show');
        this.playerObj.toggleFullscreen();
        return false;
      }
      this.playerObj.stop();
      this.playerObj.closeVideo();
      this.$router.go(-1);
    },


    playVideo() {
      this.toggleSeekBar()
      this.playerObj.open(this.streamLink);
      this.playerObj.play();

    },

    ff() {
      this.toggleSeekBar()
      if (this.playerObj.videoState() == "PLAYING")
        this.playerObj.ff(30000)
    },
    rew() {
      this.toggleSeekBar()
      if (this.playerObj.videoState() == "PLAYING")
        this.playerObj.rew(30000)
    },
    pause() {
      this.toggleSeekBar()
      this.playerObj.pause()
    },
    play() {
      this.toggleSeekBar()
      this.playerObj.play();
    },
    stop() {
      this.toggleSeekBar()
      this.playerObj.stop();
    },

    toggleSeekBar() {

      let self = this
      this.showSeekBar = true
      clearTimeout(this.handleSeekBar);
      this.handleSeekBar = setTimeout(function () {
        self.showSeekBar = false;
      }, 7000);

    },
    sendChallenge() {
      challenge.challengeApp(130,1).then(data => {

        if (data["success"] = true) {

          console.log("starttttttttttt app  -------->", data)


        } else {

        }
      });
    },

    resetParams() {
      this.playerObj.stop();
      this.playerObj.closeVideo();
      this.filmId = ''
      // this.posterUrl = ''
      this.playerObj = ''
      this.streamLink = ''
      this.fullScreen = false
      this.showPoster = true;
      this.yPage = 0;
      this.btnIndex = 0

    }
  }
}
</script>

<style scoped>
.pageParent {
  position: absolute;
  top: 95px;
  left: 80px;
  width: 1754px;
  height: 947px;
  z-index: 0;
  /*border: 1px solid red;*/
}

.detailsParent {
  position: absolute;
  top: 0px;
  left: 800px;
  width: 926px;
  height: 516px;
  /*border: 1px solid green;*/
}

.line {
  position: absolute;
  height: 0px;
  width: 1708.5px;
  left: 20px;
  top: 543.5px;
  border-radius: 0px;
  border: 1px solid #BCBCBC;
}

.demoParent {
  position: absolute;
  top: 0px;
  left: 23px;
  width: 751px;
  height: 516px;
  /*border: 1px solid blue;*/
}

.poster {
  position: absolute;
  left: 730px;
  top: 70px;
  box-shadow: 0px 4px 21px 0px #3b3b3b80;
  border-radius: 20px 20px 0 20px;
}

.Pname {
  position: absolute;
  height: 41.96503448486328px;
  width: 700.253265px;
  left: 0px;
  top: 147px;
  /*border: 1px solid green;*/
  color: #212121;
  font-size: 30px;
  text-align: right;
  white-space: nowrap;
}

.Ename {
  position: absolute;
  height: 41.96503448486328px;
  width: 700.253265px;
  left: 0px;
  top: 200px;
  /*border: 1px solid green;*/
  color: #212121;
  font-size: 20px;
  text-align: right;
  white-space: nowrap;
}

.catParent {
  position: absolute;
  height: 41.96503448486328px;
  width: 700.253265px;
  left: 0px;
  top: 253px;
  /*border: 1px solid green;*/
  white-space: nowrap;
  overflow: hidden;
}

.cat {
  position: relative;
  float: right;
  height: 41.96503448486328px;
  color: #767676;
  /*border: 1px solid red;*/
  margin-left: 30px;
  font-size: 20px;
  white-space: nowrap;
  text-align: center;
}

.duration {
  position: absolute;
  height: 41.96503448486328px;
  width: 700.253265px;
  left: 0px;
  top: 293px;
  /*border: 1px solid green;*/
  white-space: nowrap;
  overflow: hidden;
  color: #616161;
  font-size: 20px;
  text-align: right;
  direction: rtl;
}

.description {
  position: absolute;
  height: 135px;
  width: 878px;
  left: 26px;
  top: 372px;
  /*border: 1px solid green;*/
  /* white-space: nowrap; */
  overflow: hidden;
  color: #616161;
  font-size: 20px;
  text-align: right;
  direction: rtl;
}

.teaser {
  position: absolute;
  height: 357px;
  width: 711px;
  left: 2px;
  top: 55px;
  border-radius: 11px;
  background: #000000;
  overflow: hidden;
}

.playBox {
  position: absolute;
  height: 357px;
  width: 711px;
  left: 2px;
  top: 55px;
  background: rgba(0, 0, 0, 0.5);
  /*border: 1px solid red;*/
}

.playFullScreen {
  position: absolute;
  height: 1080px;
  width: 1920px;
  left: -105px;
  top: -95px;
  /*border: 1px solid red;*/
  z-index: 100;
}

.btnHover {
  height: 70px;
  width: 349px;
  top: 428px;
  border-radius: 10px;
  position: absolute;
  background-color: #000000;
}

.button {
  height: 62px;
  width: 343px;
  color: #FFFFFF;
  top: 432px;
  border-radius: 8px;
  position: absolute;
  font-size: 20px;
  line-height: 60px;
  direction: rtl;
  z-index: 10;
}

.play {
  left: 2px;
  box-shadow: 0px 4px 17px 0px #B6D4314D;
  background: linear-gradient(10deg, #2D9CDB 15.51%, #B05BFF 88.79%);
}

.fullScreen {
  left: 365px;
  box-shadow: 0px 4px 17px 0px #B6D4314D;
  background: linear-gradient(30deg, #8DC63F 15.51%, #A7CF38 39.79%, #D7DF23 88.79%);
}

.btnIcon {
  float: right;
  margin-top: 15px;
  padding-left: 10px;
  margin-right: 30%;
}

.btnTxt {
  float: left;
  margin-left: 27%;
}


.Parent-filickty {

  top: 571px;
  height: 335px;
  width: 1672px;
  position: absolute;
  left: 25px !important;
  padding-right: 20px;
  padding-left: 15px;
  overflow: hidden;
z-index: 10 !important;
}

.carousel-cell {
  position: relative;
  width: 163px;
  height: 232px;
  float: right;
  margin-right: 15px;
  text-align: center;
  background: #FFFFFF;

  margin-top: 20px;
  /*overflow: hidden;*/
  /*border: 1px solid green;*/
}

.img {
  vertical-align: middle;
  width: 100%;
  border: 1px solid rgba(207, 207, 207, 0.5);
  box-sizing: border-box;
  box-shadow: 0px 0px 18px rgba(66, 65, 67, 0.16);
  border-radius: 20px 20px 0px 20px;
  margin-bottom: 10px;
}

.episode{
  position: absolute;
  width: 95%;
  height: 30px;
  /*border: 1px solid red;*/
  text-align: right;
  overflow: hidden;
  font-size: 18px;
  left: 0px;
  color: #000000
  /*padding-right: 10px;*/
}

.playOnPoster {
  position: absolute;
  height: 109.21878814697266px;
  width: 112.818115234375px;
  left: 300px;
  top: 185px;
  border-radius: 10px;
  border: 1px solid #D3D3D3;
  z-index: 101;

}

.playOnPoster > img {
  position: absolute;
  top: 15px;
  left: 15px;
}

.removeMargin {
  margin-right: 0px !important;
}

.addMargin {
  margin-left: 15px;
}

@keyframes is-selected {

  0% {

    -webkit-transform: scale(1);
    transform: scale(1);

  }
  50% {

    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  100% {

    -webkit-transform: scale(1.1);
    transform: scale(1.1);

  }
}

.active {

  /*display: inline-block;*/
  vertical-align: middle;
  /*-webkit-transform: perspective(1px) translateZ(0);*/
  /*transform: perspective(1px) translateZ(0);*/
  -webkit-animation-name: hvr-bob-float, is-selected;
  animation-name: hvr-bob-float, is-selected;
  -webkit-animation-duration: .3s, 1.5s;
  animation-duration: .3s, 1.5s;
  /*-webkit-animation-delay: 0s, .3s;*/
  /*animation-delay: 0s, .3s;*/
  -webkit-animation-timing-function: ease-out, ease-in-out;
  animation-timing-function: ease-out, ease-in-out;
  -webkit-animation-iteration-count: 1, infinite;
  /*animation-iteration-count: 1, infinite;*/
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-direction: normal, alternate;
  animation-direction: normal, alternate;
}

.statusBar_0 {
  width: 711px;
  height: 100px;
  left: 2px;
  background: rgba(63, 63, 63, 0.7);
  position: absolute;
  z-index: 100;
  top: 311px;
}

.statusBar_1 {
  width: 1920px;
  height: 100px;
  left: -100px;
  background: rgba(63, 63, 63, 0.7);
  position: absolute;
  z-index: 100;
  top: 900px;
}

.seekBar_0 {
  position: absolute;
  height: 6px;
  width: 665px;
  left: 20px;
  top: 36px;
  background: #FFFFFF;
  border-radius: 10px;
  overflow: hidden;
}

.seekBar_1 {
  position: absolute;
  height: 6px;
  width: 1870px;
  left: 20px;
  top: 36px;
  background: #FFFFFF;
  border-radius: 10px;
  overflow: hidden;
}

.seekBarMove {
  width: 10%;
  height: 6px;
  background: #8DC63F;
  border-radius: 10px;
  position: absolute;
  left: 0px;
}

.currentTime {
  position: absolute;
  height: 20px;
  width: 100px;
  left: 20px;
  top: 50px;
  color: #FFFFFF;
  font-size: 18px;
  text-align: left;
  /*border: 1px solid red;*/
}

.totalDuration {
  position: absolute;
  height: 20px;
  width: 100px;
  right: 22px;
  top: 50px;
  color: #FFFFFF;
  font-size: 18px;
  text-align: right;
  /*border: 1px solid red;*/
}
</style>
