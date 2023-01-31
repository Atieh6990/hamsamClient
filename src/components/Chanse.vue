<template>
  <div v-if="show==true" style="    z-index: 99;position: absolute;">
    <div style="width: 1920px;height: 1080px;background: black;opacity: 0.5;top: 0px">
    </div>

    <div v-if="array!=[]"
         style="width: 1352px;height: 876px;border-radius: 100px;background-color: white;position: absolute;top: 132px;right: 306px;z-index: 99999999">
      <div style="position: absolute;height: 110px;padding: 30px 80px">
        <div v-for="(item,index) in PeriodImage" style="float:right;width: 170px;position: relative">
          <img style="height: 100px" v-if="PeriodSelelected != index" :src="imgAdrs+'Chanse/ratio_buttom.png'">
          <img style="height: 100px" v-if="PeriodSelelected == index" :src="imgAdrs+'Chanse/ratio_buttom_hover.png'">
          <div
            style="    position: absolute; top: 49px;  left: 24px; color: rgb(231, 204, 133);  text-align: center;  font-size: 27px;  font-weight: bold; width: 125px;">
            {{1+(0.25 * (index))}}
          </div>
          <div style="direction: ltr;color:white;top:11px;position: absolute;top: 5px;width: 100%">
            روز
            {{PeriodText[index]}}
          </div>

        </div>
      </div>
      <img style="width:478px ;height: 254px;right: 110px;top:220px;position: absolute"
           :src="imgAdrs+'Chanse/logo.png'">
      <div style="position: absolute;top: 500px;right: 116px;width: 455px;height: 114px">
        <img style="width: 408px;height: 104px" :src="imgAdrs+'Chanse/buttom.png'">
        <div
          style="    border: 2px solid red; width: 391px;   height: 81px;   position: absolute;  top: 10px;  right: 29px;  border-radius: 20px;"></div>
        <div style="width: 100%;text-align: center;color: #413e4f;font-size: 40px;position: absolute;top: 14px">شروع
          کن
        </div>
      </div>

      <div style="position: absolute;   color: red; font-size: 22px; top: 684px; right: 400px;width: 400px;">
        {{description }}
      </div>


      <img src="/dist/images/chanse/selectorIcn.svg"
           style=" z-index: 99; height: 60px; width: 40px; left: 371px; top: 168px; position: absolute;">
      <img src="../assets/images/chanse/bg-wheel.png" style=" left: 124px; top: 145px;position: absolute;width: 538px;">
      <div id="ring" style="position: absolute" :style="{transform: 'rotate(-90deg)'}">
        <div style="     position: absolute; top: -23px;right: 35px; width: 392px;"
             :class="[(isAnimating == 1) ? 'droplet':'']">
          <div style="width: 392px;height: 392px" id="wheel">
            <img style="width: 100%" :style="{transform: 'rotate('+randnum+'deg) '}"
                 :src="imgAdrs+'Chanse/dayereh.png'">
          </div>
          <div class=" sWheel-txt-wrap">
            <div class=" sWheel-txt ">
              <div v-for="(item , index) in array" v-html="item" data-color="#fff" class="sWheel-title"
                   :style="{transform: 'rotate('+index*18+'deg) translate(0px, -50%)'}">
              </div>
            </div>
          </div>
        </div>
      </div>


      <div style="position: absolute;width: 100%;bottom: 0px;padding: 10px 30px 50px 194px;left:0px">
        <div
          style="height: 66px;width: 320px;border-radius: 20px;background-color: #dcdcdc;text-align: center;position: relative;float: left;">
          <span style="font-size: 38px;" v-if="PeriodSelelected != -1 && EndAnimationStatus==1">{{this.score}}</span>
        </div>
        <img style="position: relative;float: left;margin: 10px 0px 0px 30px" :src="imgAdrs+'Chanse/zarb.png'">
        <div style="position: relative;float: left;width: 162px;height: 66px;margin-left:30px;margin-top: -4px">
          <img style="width: 100%;height: 100%" :src="imgAdrs+'Chanse/buttom_hover.png'">
          <div v-if="PeriodSelelected != -1" style="    position: absolute;
    top: 1px;
    left: 6px;
    color: rgb(231, 204, 133);
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    width: 152px;">{{this.data["data"]["level"]}}
          </div>

        </div>
        <img style="position: relative;float: left;margin-top: 7px;margin-left: 30px"
             :src="imgAdrs+'Chanse/mosavi.png'">
        <div
          style="margin-left: 30px;margin-top: -5px;height: 66px;width: 320px;border-radius: 20px;background-color: #dcdcdc;text-align: center;position: relative;float: left;">
          <span style="font-size: 38px;"
                v-if="PeriodSelelected != -1 && EndAnimationStatus==1">{{this.score_by_level}}</span>
        </div>

      </div>
    </div>


  </div>
</template>


<script>
  import {ROAST_CONFIG} from '../config';
  import chance from '../api/chanse'
  import {page} from 'vue-analytics'
  import func from '../mixins/func'

  export default {
    mixins: [func],
    name: "Chance", watch: {
      show: function () {
        if (this.show == true && this.isPopUp == 1) {
          this.HideTv();
        }

      }
    },
    created() {
      this.$root.$on("Chanse_on", (isPopUp) => {
        this.isPopUp = isPopUp
        if (this.isPopUp == 0) {
          this.show = true;
        }
        chance.get().then(data => {
          // alert("ll")
          //  console.log(data)
          if (data["success"]) {
            this.show = true;
            this.isAllowed = 1
            this.interval = data["data"].intervals
            this.setParam('Chanse_date', new Date().getDay());
          } else {
            this.isAllowed = 0;
            this.description = data["data"].message
          }


        });
      });
      this.$root.$on("Chanse_off", () => {
        this.show = false;
      });


    },
    mounted() {
      /*    document.getElementById("ring").addEventListener("webkitAnimationEnd", this.AnimationListener, false);
          document.getElementById("ring").addEventListener("oAnimationEnd"     , this.AnimationListener, false);
          document.getElementById("ring").addEventListener("msAnimationEnd"    , this.AnimationListener, false);
          document.getElementById("ring").addEventListener("animationend"      , this.AnimationListener, false);
          window.addEventListener("animationend", this.AnimationListener, false);*/
      //  var anim = document.getElementById("ring");
      // alert(anim)
//console.log(document.getElementById("ring"))
      // this.$el.addEventListener("webkitAnimationEnd", this.AnimationListener, false);
    }
    , data() {
      return {
        isPopUp: 0,
        imgAdrs: ROAST_CONFIG.url_comp_server,
        PeriodImage: ["1x.png", "125x.png", "1.5.png", "2x.png", "2.5.png", "3.png", "5x.png"],
        PeriodText: ["اول", "دوم", "سوم", "چهارم", "پنجم", "ششم", "هفتم"],
        PeriodSelelected: -1,
        EndAnimationStatus: 0,
        score: 0,
        score_by_level: 0,
        randnum: 0,
        isAnimating: 0,
        Ypos: 0,
        showDroupDown: 0,
        isAllowed: 0,
        interval: [],
        description: "",
        array: [],
        data: {},
        show: false,
        testData: {
          "data": {
            "array": "\u0634\u0627\u0646\u0633 \u062f\u0648\u0628\u0627\u0631\u0647*30*20*1*20*100*100*20*100*30*100*20*30*30*30*\u067e\u0648\u0686*20*100*50*100#20*20*30*100*\u067e\u0648\u0686*20*1*30*100*100*20*20*50*100*30*30*30*100*100*\u0634\u0627\u0646\u0633 \u062f\u0648\u0628\u0627\u0631\u0647",
            "voucher": null,
            "description": null,
            "level": 1,
            "chosen": "#26",
            "score": "20",
            "score_by_level": 20
          }, "message": "\u0634\u0627\u0646\u0633 \u0634\u0645\u0627 \u062b\u0628\u062a \u0634\u062f", "success": true
        }
      }
    }, activated() {

      // this.$root.$emit('sideMenu_hide');
      // this.$root.$emit('leftside_hide');
      // this.$root.$emit('header_hide');
    }
    , methods: {
      HideTv() {

        this.$root.$emit('HideTv');
      },
      EndAnimation() {
        this.description = this.data.message
        this.EndAnimationStatus = 1
        //  alert("f")
      }, parseData() {
        //  alert()


        this.array = this.data["data"]["array"].split("#")[1].split("*")
        /*  for(var i=0;i<this.data.array2.length;i++){
              if(!isNaN(this.data.array2[i])){
                  this.array.push(this.data.array2[i]);

              }else{
                  this.array.push(this.data.elementType[this.data.AllTypes.indexOf(this.data.array2[i])]);
              }
          }*/
        //console.log("pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp",this.array)

      },
      up() {
        /* if (this.Ypos != 1 && this.showDroupDown) {
             this.Ypos--
         }*/
      }
      , down() {
        /*  if (this.Ypos != 3 && this.showDroupDown) {
              this.Ypos++
          }*/
      }
      , left() {

      }
      , right() {

      }
      , enter() {

        if (this.isAllowed == 1 && !this.isAnimating) {
          /*  if (this.showDroupDown == 0) {
                page({
                    page:   "click on select chance",
                    title:  "click on select chance"
                })
                this.showDroupDown = 1
                this.Ypos = 1
            } else {*/
//alert(this.interval[this.Ypos])
          page({
            page: "click on select chance",
            title: "click on select chance"
          })
          var period = parseInt(this.interval[0])
          chance.insert(period).then(data => {
            //  var data= this.testData

            this.randnum = Math.floor((Math.random() * 20)) * 18
            this.data = data

            this.parseData()
            this.PeriodSelelected = (parseInt(this.data["data"]["level"]) - 1) / (0.25)
            this.score = this.data["data"]["score"]
            this.score_by_level = this.data["data"]["score_by_level"]
            this.isAnimating = 1
            this.showDroupDown = 0
            var _this = this
            setTimeout(_this.EndAnimation, 15000);


          });


        } else if (!this.isAnimating) {

        }

      }
      , back() {
        page({
          page: "return chance",
          title: "return chance"
        })
        // this.$root.$emit('sideMenu_show');
        // this.$root.$emit('leftside_show');
        // this.$root.$emit('header_show');
        // this.$router.go(-1);
        this.show = false;
        if (this.isPopUp == 1) {

          this.$root.$emit('ShowTv');


        }
      }
    }
  }
</script>
<style scoped>
  #content-page-27 {
    position: absolute;
    z-index: 1;
    top: 0px;
    right: 0px;
    width: 1920px;
    height: 1080px;

  }

  .dropDpwn {
    position: absolute;
    left: 1051px;
    top: 508px;
    border-radius: 30px;
    background-color: rgb(239, 240, 241);
    box-shadow: rgb(0, 0, 0) 0px 0px 7px 0px;
    width: 333px;
    height: 65px;
    z-index: 5;
    float: left;
  }

  .bottomDropDown {
    /* padding-bottom: 10px;
     padding-top: 10px;*/
    border-radius: 26px;
    background-color: #1756a7;
    position: absolute;
    left: 1064px;
    top: 574px;
    width: 306px;
    /* height: 221px; */
    z-index: 1;
  }

  .arrow {
    margin-left: 24px;
    margin-top: 22px;
    float: left;
    position: relative
  }

  .titleDropDown {
    position: relative;
    color: black;
    font-size: 30px;
    line-height: 65px;
  }

  .DropDownItem {
    height: 50px;
    color: white;
    text-align: center;
    font-size: 22px;
    line-height: 50px;

  }

  .DropDownSelected {
    border: solid 1px red !important;
  }

  .DropDownBorder {
    border-bottom: solid 1px #043574;
  }

  .DropDownItemSelected {
    position: absolute;
    height: 50px;
    width: 306px;
    border: solid 1px red;
    border-radius: 26px;
  }

  .d-none {
    display: none;
  }

  .d-block {
    display: block !important;
  }

  .sWheel-txt-wrap > .sWheel-txt > div {
    position: absolute;
    top: 50%;
    left: 50%;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    /*overflow: hidden;*/
    line-height: 1.2em;
    max-height: 23.4em;
    text-align: right;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 1px;
    width: 50%;
    /*  padding-right: 6%;*/
    font-weight: bold;
    font-size: 100%;
    cursor: default;
    color: #fff;
    text-align: right;
    padding-right: 8%;
    color: rgb(255, 255, 255);
  }

  .droplet {

    transition: all 15s;
    transition-timing: ease-in-out;


  }

  .droplet {
    transform: rotate(3600deg);
  }

  #ring {
    position: absolute;
    left: 220px;
    top: 179px;
    height: 504px;
    width: 497px;
    z-index: 9;
  }
</style>
