<template>
  <div class="apps-content">
    <div class="app-obj" v-for="(app , i) in appList"
         :class="[((number == i  && active == page && activeRoute == 1) ? 'app-obj-hover hvr-grow' :'')]"
         v-show="(appList.length > 0) && ( parseInt((i)/column) ) + 2 > ( parseInt((number)/column))">
      <div class="app-img-parent">
        <img :src="app.screen1" class="app-img"/>
        <div v-show="(number == i && showText)" class="dlBack">
          <div class="appDownload">برای نصب به اپ APPS مراجعه کنید
          </div>
        </div>
        <div class="app-circle">
          <img :src="app.icon" class="appIcon"/>
        </div>
        <div class="strip">
          <div>{{app.name}}</div>
        </div>
        <!--<div class="app-name">{{app.ename|substr(19)}}</div>-->
      </div>
      <div :id="'rateImg_'+ i" class="rateParent">
        <!--<star-rating :star-size="16.06"-->
                     <!--:max-rating="5"-->
                     <!--inactive-color="#CCCACA"-->
                     <!--active-color="#F2994A"-->
                     <!--:rating="app.rate"-->
                     <!--:read-only="true"-->
                     <!--:show-rating="false"-->
                     <!--:round-start-rating="false">-->
        <!--</star-rating>-->
      </div>
      <div class="app-desc">{{app.shortdesc}}</div>
      <div class="app-ability app-download"
           :class="[(number == i  && active == page && xposApps == 1) ? 'inside-hover' : '']">
        <div class="icon-pos" style="right: 21.85px;">باز کردن</div>
        <img class="icon-pos" :src="URL + 'apps/cloud.png'" style="left: 19.48px;top: 9.88px;"/>
      </div>
      <div class="app-ability app-detail"
           :class="[(number == i  && active == page && xposApps == 2) ? 'inside-hover' : '']">
        <img class="icon-pos" :src="URL + 'apps/info.png'" style="right: 16.53px;top: 9.37px;"/>
        <div class="icon-pos" style="left:15.9px">توضیحات</div>
      </div>
    </div>
  </div>
</template>

<script>
  import StarRating from 'vue-star-rating';
  import func from '../../mixins/func';
  import {ROAST_CONFIG} from "../../config";


  export default {
    name: "app-list",
    props: ['active', 'page', 'appList', 'activeRoute', 'cat'],
    data() {
      return {
        URL: ROAST_CONFIG.url_Img_comp,
        column: 3,
        number: 0,
        xposApps: 1,
        showText: false,


      }
    },  watch: {
      appList: function () {
      //  console.log("/////////////////////////////////////",this.appList)

      }},created() {
      this.$root.$on('refresh_list', () => {
        this.number = 0;
        this.xposApps = 1;

      });
      this.$root.$on('show_dl', () => {
        this.showText = true;

      });
      this.$root.$on('hide_dl', () => {
        this.showText = false;

      });

    },
    mixins: [func],
    components: {
      StarRating

    }
    , methods: {
      up() {

        if ((this.number) >= this.column) {
          this.number -= parseInt(this.column);
          return true
        }
        return false;
      },
      down() {
         // alert(this.number + ' ' + this.column)
      //  console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyy",this.appList)
        if (this.number + parseInt(this.column) < this.appList.length) {

          this.number += parseInt(this.column);
          return true
        }
        // if (this.cat == 0) {
          if (parseInt(this.number / this.column) >= parseInt(this.appList.length / this.column) - 1) {

            this.$root.$emit('moreApps');
            return true;
          }
        // }

        return false

      }, left() {
        // alert('xxxxxxxx ->' + this.xpos + '    ' + this.inside)
        if (this.xposApps == 1) {
          this.xposApps = 2;
          return true
        } else {
          // console.log('left ->' + 'num ->' + this.number + 'column -> ' + this.column + '%%%%%% ' + this.number % this.column + 'parse ->' + parseInt(this.column))
          // if (this.number % this.column != parseInt(this.column)) {
          if (this.number % this.column != 2) {

            this.number++;
            this.xposApps = 1;
            return true
          }
          return false
        }

      },
      right() {
        // console.log('right ->' + this.xposApps)

        if (this.xposApps == 2) {
          this.xposApps = 1;
          return true
        } else if (this.xposApps == 1) {
          if (this.number % this.column != 0) {
            this.number--;
            this.xposApps = 2;
            return true
          }
          return false
        }


      }, enter() {

        return {
          'xpos': this.xposApps,
          'packageID': this.appList[this.number]['packageid'],
          'appID': this.appList[this.number]['id'],

        };


      }
    }

  }
</script>

<style scoped>
  .apps-content {
    width: 1314px;
    height: 990px;
    position: absolute;
    left: 2px;

  }

  .app-obj {
    width: 400px;
    height: 458px;
    position: relative;
    float: right;
    margin-top: 33px;
    margin-right: 36px;
    background: linear-gradient(0deg, rgba(193, 193, 193, 0.3) 0%, rgba(178, 152, 200, 0.05) 33.48%, rgba(255, 255, 255, 0) 65.86%), #F1EEEE;
    box-shadow: 0px 4px 27px rgba(0, 0, 0, 0.1);
    border-radius: 5px;

  }

  .app-obj-hover {
    /*background: linear-gradient(0.5turn, rgba(255, 255, 255, 0) 80%, rgba(178, 152, 200, 0.05) 5%, rgba(96, 62, 127, 0.5) 90%);*/
    /*z-index: 1;*/
    /*!*outline: 2px solid #C3BDBD;*!*/
    /*-webkit-box-shadow: rgba(0, 0, 0, 0.1);*/
    /*-moz-box-shadow: rgba(0, 0, 0, 0.1);*/
    /*-o-box-shadow: rgba(0, 0, 0, 0.1);*/
    /*box-shadow: rgba(0, 0, 0, 0.1);*/

    background: linear-gradient(0deg, rgba(193, 193, 193, 0.3) 0%, rgba(178, 152, 200, 0.05) 33.48%, rgba(255, 255, 255, 0) 65.86%), #FFFFFF;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
    border-radius: 5px;

  }

  .topPosFirst {
    margin-top: 0px;
  }

  .topPosOthers {
    margin-top: 33px;
  }

  .rightPosFirst {
    margin-right: 0px;
  }

  .rightPosOthers {
    margin-right: 37px;
  }

  .second-row {
    margin-top: 500px;
  }

  .app-img-parent {
    position: absolute;
    width: 400px;
    height: 179px;
    right: 0px;
    top: 0px;
    border-radius: 5px 5px 0px 0px;
  }

  .app-img {
    width: 400px;
    height: 179px;
  }

  .strip {
    position: absolute;
    width: 397.99px;
    height: 43px;
    right: 0px;
    top: 136px;
    background: rgba(0, 0, 0, 0.7);
    line-height: 43px;
    font-size: 22px;
    color: #FFFFFF;
    text-align: center;
  }

  .app-circle {
    position: absolute;
    width: 61.84px;
    height: 61.29px;
    right: 21.21px;
    top: 151.63px;
    background: #FFFFFF;
    box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.25);
    border-radius: 100px;
    z-index: 1;

  }

  .appIcon {
    width: 115px;
    border-radius: 50px;
    position: relative;
    top: 5px;
    left: 28px;

  }

  .app-name {
    width: 235px;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    color: #000;
    position: absolute;
    right: 65px;
    top: 190px;
    text-align: right;
    direction: rtl;
    text-indent: 25px;
  }

  .rateParent {
    width: 91.55px;
    height: 13.58px;
    position: absolute;
    left: 7.04px;
    top: 193px;
    direction: ltr;

  }

  .app-desc {
    position: absolute;
    top: 236px;
    right: 20px;
    width: 362px;
    height: 112px;
    line-height: 30px;
    font-size: 21px;
    text-align: right;
    color: #777777;
    direction: rtl;

  }

  .app-ability {
    position: absolute;
    top: 389px;
    width: 150px;
    height: 45px;
    font-size: 18px;
    background-color: #6d6d6d;
    color: #fff;
    line-height: 45px;

  }

  .app-download {
    right: 0px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .app-detail {
    left: 0px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .icon-pos {
    position: absolute;
  }

  .inside-hover {
    background-color: #603E7F;
  }

  .dlBack {
    background-color: #000;
    width: 400px;
    height: 458px;
    position: absolute;
    opacity: 0.8;
    top: 0px;
    z-index: 2;
  }

  .appDownload {
    position: absolute;
    width: 400px;
    height: 34px;
    left: 0px;
    top: 50px;
    background: #BB6BD9;
    box-shadow: 0px 4px 14px rgba(187, 107, 217, 0.4);
    border-radius: 0px 5px 5px 0px;
    color: #fff;
    line-height: 34px;
    font-size: 20px;
    direction: rtl;
    transition: all 1s;

  }

  /******************************************** animate ***************************************************/

  .hvr-grow {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    -webkit-transition-duration: 0.6s;
  }


</style>
