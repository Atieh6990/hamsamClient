<template>

  <div>

    <div v-if="weatherData && this.clock" style="position: absolute; overflow: hidden !important; left: 87px;width: 571px;height: 120px; border-radius: 13px; z-index: 2; top: 472px;"  v-bind:class=" [activeRoute==1 && xActive==xPage && yActive== yPage ? 'active' : '']">
<!--      <transition  name="fade" >-->

<!--        <div v-show="0 == item"   key="0" class="middle-third">-->
<!--          <img src="../../assets/images/one/ranke/1.png" style="left: 0px;top: 1px" class="vectors"/>-->
<!--          <img src="../../assets/images/one/ranke/2.png" class="vectors" style="top: 10px;width: 353px;right: -2px"/>-->
<!--          <img src="../../assets/images/one/ranke/3.png" class="vectors"-->
<!--               style="right: 365px; top: 30px;"/>-->
<!--          <img src="../../assets/images/one/ranke/4.png" class="vectors" style="left: 0px;"/>-->
<!--          <img src="../../assets/images/one/ranke/5.png" class="vectors"-->
<!--               style="top: 50px; right: 345px;"/>-->
<!--          <img src="../../assets/images/one/ranke/laurel.png"-->
<!--               style="left: 16px ;top: 14px; z-index: 2;"/>-->
<!--          <div class="round"><strong>{{this.getUser()['periodnum']}}</strong></div>-->
<!--          <img src="../../assets/images/one/ranke/star.png"-->
<!--               style="z-index: 2; right: 115px; top: 20px;"/>-->
<!--          <div class="score-round" style="right:199px; top: 27px;"><strong>امتیاز دوره</strong>-->
<!--          </div>-->
<!--          <div class="score"><strong>{{this.getUser()['score']}}</strong></div>-->
<!--          <img src="../../assets/images/one/ranke/ranking.png"-->
<!--               style="position: absolute; z-index : 2; left: 217px; top: 37px;"/>-->
<!--          <div class="rotbe-round"><strong>رتبه</strong></div>-->
<!--          <div  class="rotbe"><strong>{{this.getUser()['rank']}}</strong></div>-->
<!--        </div>-->
<!--      </transition>-->
      <transition  name="fade" >

        <div v-show="0== item"   key="1" style=" position: absolute; width: 571px;height: 120px; ">

          <img :src="imgURL+'NWeatherBack.png'" style="position: absolute;width: 100%;height: 100%;left: 0px" class="vectors" />
          <div style="       width: 138px; height: 100%;  left:0px;   top: -6px;  z-index: 9;   position: absolute;  color: white;  font-size: 66px;  text-align: center;   align-items: center; ">
            <div :style="{left:(  (weatherData.getElementsByTagName('temp')[0].childNodes[0].nodeValue.toString().length==2?'44px':'24px') )}" style="width: 100%;  height: 25px;   position: absolute;  font-size: 43px;   top: -10px;">
              0
            </div>
            <div style="width:100%;height: 100%;position: relative;padding-top: 10px">
              {{weatherData.getElementsByTagName("temp")[0].childNodes[0].nodeValue}}
            </div>
            <div style="   width: 128px;
    height: 30px;
    position: absolute;
    top: 83px;
    font-size: 19px;
    left: 0px;
    direction: rtl;">
<!--              <span>  {{clock.result.weekname}}  </span>-->

<!--              <span> {{clock.result.date}}  </span>-->
weather

            </div>
          </div>
          <div  style="    text-align: right;padding-right: 26px;padding-top: 26px; width: 200px;  height: 100%;  position: absolute; color: white; font-size: 37px; padding-top: 8px; right: 0px;">
<div style="width: 100%" v-html="computeTime()"></div>
            <div style="    width: 100%;  font-size: 17px; margin-top: -15px;">{{clock.result.fanameday}}</div>
            <div style="    width: 100%;  font-size: 17px; margin-top: -28px; direction: rtl;">
              <span>{{clock.result.faday}}</span>
              <span>{{clock.result.famonth}}</span>
              <span>{{clock.result.fayear}}</span>
              <span style="font-size: 40px;font-weight: bold">.</span>
              <span>شمسی</span>
            </div>
          </div>
          <div style="width: 153px; height: 100%; position: absolute;  right: 216px;">
            <img v-if="parseInt(weatherData.getElementsByTagName('symbol')[0].childNodes[0].nodeValue) > 12" style="height: 120px" :src="imageUrl+weatherData.getElementsByTagName('symbol')[0].childNodes[0].nodeValue+'.png'">
            <img v-if="parseInt(weatherData.getElementsByTagName('symbol')[0].childNodes[0].nodeValue) <= 12" style="height: 120px" :src="imgURL+'Weather/'+weatherData.getElementsByTagName('symbol')[0].childNodes[0].nodeValue+'.png'">
          </div>
        </div>
      </transition>
      <transition  name="fade" >

        <div v-show="2 == item"   key="2" class="middle-third"></div></transition>
    </div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import {mapMutations} from 'vuex'
  import api from '../../api/ranking' ;
  import {page} from 'vue-analytics'
  //import {ROAST_CONFIG} from '../../ranking';
  import {ROAST_CONFIG} from '../../config';
  export default {
    components: {},
    mounted: function () {

    } ,computed: {

    }, created() {

      if(this.getUser()['city']==""){
        this.city="tehran"
      }else{
        this.city=this.getUser()['city']
      }
      api.Weather(this.city).then(data => {
        var   parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data,"text/xml");

        this.weatherData = xmlDoc.getElementsByTagName("day")[0];

        // this.titls = $xml.find("News");
        // for (var i = 0; i < this.titls.length; i++) {
        //     this.ids = this.titls.eq(i).find("id").text()
        //
        //
        // }



      });
      api.Clock().then(data => {
       this.clock = data;

        this.hour=parseInt(this.clock.result.hour)
          this.minute=parseInt(this.clock.result.min)
        clearInterval( this.timeIntervall);
       this.timeIntervall= setInterval(()=>{
       //  console.log("ee")
          if( this.minute==59){
            this.minute=0
            if( this.hour==23){
              this.hour=0
            }else{
              this.hour=this.hour+1
            }

          }else{
          //  console.log("kk",this.minute)
            this.minute=this.minute+1
          }
        }, 60000);
      });
     // this.changeContent()
      //rankingLoad
      /*  api.pageOneRanking(this.getUser().userID, 0, 1).then(data => {

           // console.log(data["users"])
            this.data = data;
            this.setUserRank(data["users"][0]["rank"]);
        });*/
    }, props: ['xActive', 'yActive', 'yPage', 'xPage', 'activeRoute'], data() {
      return {minute:0,hour:0,data: [],timeIntervall:"",interval:"" , item: 0, imgURL: ROAST_CONFIG.url_comp_server,weatherData:"",imageUrl:"http://cdn.parsijoo.ir/static/home/source/cdn/images/services/weather/",clock:"" };

    }, methods: {  computeTime(){

      if(this.minute.toString().length==1){

        return this.hour+":"+"0"+this.minute
      }else{
        return this.hour+":"+this.minute
      }

      }, changeContent: function () {

        var this_=this
        clearInterval( this.interval);
        this.interval =  setInterval(function () {
          if (this_.item != 1) {
            this_.item++
          } else {
            this_.item = 0
          }

        }, 7000);
      },
      ...mapMutations([
        'setUserRank'

      ]),
      ...mapGetters([
        'getUser'
      ]),
      down() {

        return false

      },
      up() {

        return false

      },
      right() {
        return false


      }, left() {
        return false

      }, enter() {
        page({
          page: 'rank p1',
          title: 'rank p1'
        })
        this.$router.push({path: "/six/" + new Date().getTime()});
        return false


      },
    }, watch: {}
  };

</script>

<style scoped>
  .middle-third {
    position: absolute;
    background-color: #FFB80A;
    width: 100%;
    height: 100%;
  }

  .middle-third > img {
    position: absolute;
  }

  .middle-third .vectors {
    z-index: 1;
  }

  .middle-third .vectors {
    z-index: 1;
  }

  .round {
    font-size: 144px;
    color: #F2994A;
    position: absolute;
    top: -8px;
    right: -2px;
  }

  .score-round {
    color: #fff;
    font-size: 18px;
    z-index: 2;
    position: absolute;
  }

  .rotbe-round {
    position: absolute;
    color: #fff;
    font-size: 18px;
    z-index: 2;
    right: 390px;
    top: 27px;
  }

  .score {
    position: absolute;
    color: #fff;
    font-size: 24px;
    z-index: 2;
    right: 187px;
    top: 59px;
    min-width: 100px;
  }

  .rotbe {
    position: absolute;
    color: #fff;
    z-index: 2;
    font-size: 24px;
    right: 357px;
    top: 56px;
    min-width: 95px;
  }

  @keyframes active {

    0% {

      -webkit-transform: scale(1);
      transform:  scale(1);

    }
    50% {

      -webkit-transform:  scale(1.1);
      transform:   scale(1.1);
    }
    100% {

      -webkit-transform: scale(1.1) ;
      transform:  scale(1.1);

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

    /* -webkit-animation-delay: 0s, 10.5s;
     animation-delay: 0s, 10.5s;*/
    -webkit-animation-timing-function: ease-out, ease-in-out;
    animation-timing-function: ease-out, ease-in-out;
    -webkit-animation-iteration-count: 1, infinite;
    /*animation-iteration-count: 1, infinite;*/
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-direction: normal, alternate;
    animation-direction: normal, alternate;
    border: 2px solid #555 !important;

    /*  box-shadow: 0 0 1px rgba(0, 0, 0, 0);*/
  }
</style>
