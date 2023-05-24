<template>

<!--  <div v-if="films[0]">-->
  <div v-if="films[0]">

    <div class="Parent-filickty">
      <flickity class="flickity onlineFilms" ref="flickity" :options="flickityOptions">

        <div v-for="(item,index) in films" class="carousel-cell" :key="index"
             :class="[xpos==index && activeRoute==1  && yActive== yPage ? 'active' : '',xpos == films.length-1&& activeRoute==1 && yActive== yPage ? 'ml&#45;&#45;33' : '',xpos == 0&& activeRoute==1  && yActive== yPage ? 'ml-0' : '',
             'carousel-cell' ,(index == 0)? 'removeMargin':'' ]"
        >
<!--          <img class="img" :src=item.avatar>-->
          <img class="img" :src=item.PortraitImage9X11>

        </div>

      </flickity>
    </div>
    <!--            <flickity class="flickity " ref="flickity" :options="flickityOptions">-->
    <!--              <div v-for="(film, index) in  films"-->
    <!--                   :class="[xpos==index && activeRoute==1  && yActive== yPage ? 'active' : '',xpos == film.length-1&& activeRoute==1 && yActive== yPage ? 'ml&#45;&#45;33' : '',xpos == 0&& activeRoute==1  && yActive== yPage ? 'ml-0' : '','carousel-cell']"-->
    <!--                   :key="index">-->

    <!--                <img class="img" :src=film.avatar>-->

    <!--              </div>-->


    <!--            </flickity>-->

  </div>


</template>

<script>
import Flickity from 'vue-flickity';
import {ROAST_CONFIG} from '../../config';
import {page} from "vue-analytics";


export default {
  name: "onlineFilms",
  props: ['films', 'xActive', 'yActive', 'yPage', 'xPage', 'activeRoute'],
  components: {Flickity},
  watch: {
    active: function () {

    }, films: function () {


      // this.flickityOptions.initialIndex = this.films.length - 1
      // this.xpos = this.films.length - 1

    }
  },
  data() {
    return {
      num: 0,
      imgURL: (ROAST_CONFIG.url_Img_server + 'onlineFilms/ri_play-circle-fill.png'),
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
      xpos: 0,
      indexToStartScroll: 8
    };

  },
  methods: {
    next() {
      this.$refs.flickity.next();
    },

    previous() {

      this.$refs.flickity.previous();
    },
    left() {
      if (this.xpos < this.films.length - 1) {
      //   if (this.xpos < 14) {
        this.xpos++
        if (this.xpos > this.indexToStartScroll)
          this.next();

        return true
      } else {

        return false
      }


    },
    right() {
      if (this.xpos > 0) {

        this.previous();
        this.xpos--
        return true
      } else {
        return false
      }


    },
    up() {
      return false;
    }, down() {
      return false;
    },
    enter() {
      // alert(this.xpos)
      return this.xpos
    }
  }
}
</script>

<style scoped>
.onlineFilms {
  height: 100% !important;
}


.Parent-filickty {
  top: 625px;
  height: 283px;
  width: 1758px;
  position: absolute;
  left: 63px;
  padding-right: 20px;
  padding-left: 15px;
  overflow: hidden;

  /*top: 645px;*/
  /*height: 232px;*/
  /*width: 1754px;*/
  /*position: absolute;*/
  /*right: 80px;*/

}

.carousel-cell {
  position: relative;
  width: 163px;
  height: 232px;
  float: right;
  margin-right: 15px;
  text-align: center;
  background: #FFFFFF;
  border: 1px solid rgba(207, 207, 207, 0.5);
  box-sizing: border-box;
  box-shadow: 0px 0px 18px rgba(66, 65, 67, 0.16);
  border-radius: 20px;
  margin-top: 20px;
  overflow: hidden;
  /*border: 1px solid green;*/
}

.img {
  vertical-align: middle;
  width: 100%;
}

.removeMargin {
  margin-right: 0px !important;
}
.addMargin{
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


</style>
