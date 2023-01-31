<template>

  <div v-if="challenges[0]">

    <div class="Parent-filickty">
      <flickity class="flickity suggestedActivity" ref="flickity" :options="flickityOptions">
        <div v-for="(challenge, index) in challenges"
             v-bind:class="[xpos == index && activeRoute==1  && yActive== yPage ? 'active' : '',xpos == 0&& activeRoute==1  && yActive== yPage ? 'ml32' : '',xpos == challenges.length-1 ? 'ml26' : '','carousel-cell',(index == 0) ? 'removeMargin':'']"
             :key="index">
          <img class="img" :src=challenge.icon>
        </div>

      </flickity>
    </div>

  </div>
</template>
<script>
import Flickity from 'vue-flickity';
import {page} from 'vue-analytics'
import connect from "../../api/challenge";
import {mapGetters} from "vuex"

export default {
  components: {
    Flickity
  },
  mounted: function () {

  }, created() {


  }, props: ['xActive', 'yActive', 'yPage', 'xPage', 'activeRoute', 'challenges'], data() {
    return {

      images: ["/dist/images/one/activities/Activity1.png", "/dist/images/one/activities/Activity2.png", "/dist/images/one/activities/Activity3.png", "/dist/images/one/activities/Activity4.png",
        "/dist/images/one/activities/Activity5.png",
      ],
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
      }, xpos: 0,indexToStartScroll:4


    };

  }, methods: {
    ...mapGetters([
      'getUser',
    ]),
    next() {
      //   console.log( this.$refs.flickity.$flickity.prevButton.isEnabled)
      //     console.log( this.$refs.flickity.$flickity.nextButton.isEnabled)

      this.$refs.flickity.next();

    },

    previous() {

      this.$refs.flickity.previous();
    },
    right() {
      if (this.xpos > 0) {

        this.previous();
        this.xpos--
        return true
      } else {
        return false
      }


    }, left() {
      if (this.xpos < this.challenges.length-1) {
        this.xpos++
        if (this.xpos > this.indexToStartScroll)
          this.next();

        return true
      } else {

        return false
      }


    }, up() {
      return false
    }, down() {
      return false
    }, enter() {
      page({
        page: 'Challenge p1' + this.challenges[this.xpos].id,
        title: 'Challenge p1' + this.challenges[this.xpos].id
      })
      // alert('suggest')
      connect.challengeDetail(this.challenges[this.xpos].id, this.getUser().userID)
        .then(data => {
          // console.log(data.challenges[0])
          this.$router.push({
            path: '/ten/' + new Date().getTime(),
            query: {params: data.challenges[0], status: true},
          });
        })
    }
  }, watch: {
    active: function () {

    }, challenges: function () {


      // this.flickityOptions.initialIndex = this.challenges.length - 1
      // this.xpos = this.challenges.length - 1

    }
  }
};

</script>

<style scoped>
.suggestedActivity {
  height: 100% !important;
}

/*.active.ml26{*/
/*    margin-left: -12px ;*/
/*}*/
/*.active.ml32{*/
/*    margin-left:12px !important;*/
/*}*/
/*.flickity{*/
/*    height: 162px;*/
/*}*/
/*.off {*/


/*}*/


.Parent-filickty {

  top: 670px;
  height: 176px;
  width: 1758px;
  position: absolute;
  left: 63px;
  padding-right: 20px;
  padding-left: 15px;
  overflow: hidden;


  /*top: 930px;*/
  /*height: 123px;*/
  /*width: 1754px;*/
  /*position: absolute;*/
  /*right: 80px;*/

}
.removeMargin {
  margin-right: 20px !important;
}
.carousel-cell {

  width: 282px;
  height: 123px;

  position: relative;
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




}
.img {
  vertical-align: middle;
  width: 282px;
  height: 123px;
}

.flickity {
  width: 100%;
}


.flickity-button-icon {

}

.flickity-viewport {
  /*height: 100% !important;*/
}

/*@keyframes active{*/
/*0% {*/


/*-webkit-transform: translateY(0px) scale(1.1);*/
/*transform: translateY(0px) scale(1.1);*/
/*}*/
/*50% {*/
/*-webkit-transform: translateY(10px) scale(1.1);*/
/*transform: translateY(10px) scale(1.1);*/
/*}*/
/*100% {*/
/*-webkit-transform: translateY(0px) scale(1.1);*/
/*transform: translateY(0px) scale(1.1);*/
/*}*/
/*}*/
@keyframes active {

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
  -webkit-animation-name: hvr-bob-float, active;
  animation-name: hvr-bob-float, active;
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
z-index: 10;

  /*  box-shadow: 0 0 1px rgba(0, 0, 0, 0);*/
}

.carousel-cell.active {
  /*z-index: 9;*/
  /*border: 2px solid #555 !important;*/
}

.flickity-button {

}


</style>
