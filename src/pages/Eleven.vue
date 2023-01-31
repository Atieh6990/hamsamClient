<template>
    <div id="content-page-27">
        <img src="../assets/images/chanse/game-tag.png" style="left:-4px ;top:-4px;position: absolute ">
        <div style="width: 1598px;height: 899px;position: absolute;right: 150px;top:92px;border-radius: 5px;background-color: white;box-shadow: rgba(0, 0, 0, 0.44) 0px 0px 1px 0px;">


            <img src="../assets/images/chanse/logo.png"
                 style="    right: 133px;    top: 139px;    position: absolute; ">


            <img src="/dist/images/chanse/selectorIcn.svg" style="    z-index: 99; height: 60px; width: 40px; left: 450px; top: 134px;position: absolute; ">
            <img src="../assets/images/chanse/bg-wheel.png" style="    left: 124px; top: 81px; position: absolute;">
            <div id="ring" :style="{transform: 'rotate(-90deg)'}" >
            <div  style="position: absolute;top: 0px;right: 0px;height: 504px;width: 497px;"  :class="[(isAnimating == 1) ? 'droplet':'']"  >
                <div id="wheel" style="position: absolute; left: 3px; top: -5px;">
                    <img :style="{transform: 'rotate('+randnum+'deg) '}" src="../assets/images/chanse/wheel.png">
                </div>
                <div class=" sWheel-txt-wrap"><div class=" sWheel-txt " >
                    <div v-for="(item , index) in array" v-html="item" data-color="#fff" class="sWheel-title" :style="{transform: 'rotate('+index*18+'deg) translate(0px, -50%)'}">




                        </div>






                </div></div>


            </div>
            </div>
            <div :class="[((Ypos == 0)  ?'DropDownSelected ':'') , ' DropDownBorder dropDpwn']">
                <img style="display: none" src="../assets/images/chanse/arrow.png" class="arrow">
                <div class="titleDropDown">
                    شروع کنید
                </div>

            </div>
            <div :class="[((showDroupDown == 1)  ?'d-block':'') , 'bottomDropDown d-none']">

                <div style="direction: rtl" v-for="(item , index) in interval" class=" DropDownItem">
                    <div :class="[((Ypos == index+1)  ?'d-block':'') , 'DropDownItemSelected d-none']"></div>
                    {{ item + " تا " + item +"-" }}


                </div>


            </div>

            <div style="position: absolute;color: red;font-size: 22px;top: 800px;right: 400px;width: 400px">
                {{description }}
            </div>
        </div>
    </div>
</template>

<script>
    import chance from '../api/chanse'
    import {page} from 'vue-analytics'
    export default {
        name: "eleven",
        created() {



            chance.get().then(data => {
              //  console.log(data)
                if(data["success"]){
                    this.isAllowed = 1
                    this.interval = data["data"].intervals
                }else{
                    this.isAllowed=0;
                    this.description = data["data"].message
                }



            });

        },
        mounted(){
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
     ,data() {
            return {
/*                randnum:Math.floor((Math.random() * 20) )*18*/ randnum:0,  isAnimating:0, Ypos: 0, showDroupDown: 0, isAllowed: 0, interval: [], description: "", array: [],data:{"elementType":["<div class='reward16'>\u0647\u062f\u06cc\u0647 \u0633\u0627\u0645\u0633\u0648\u0646\u06af<\/div>","<div class='reward16'>\u0627\u0634\u062a\u0631\u0627\u06a9 \u0622\u06cc\u0648<\/div>","<div class='reward16'>\u0639\u062f\u062f \u0645\u062b\u0628\u062a<\/div>","<div class='reward16'>\u0639\u062f\u062f \u0645\u0646\u0641\u06cc<\/div>","<div class='reward16'>\u0628\u0644\u06cc\u0637 \u0633\u06cc\u0646\u0645\u0627<\/div>"],"status":"ok","code":"131","array1":[2397,2501,4879,4420,3381,4154,"aioVocher1",4818,2182,4599,1494,4115,3249,"cinemaVocher1","rewardsam",2635,4161,3625,2788,4445],"array2":[4161,4445,2635,3625,"cinemaVocher1",2397,3249,4879,2182,"aioVocher1",4115,"rewardsam",2788,4154,3381,4599,4818,2501,1494,753],"AllTypes":["rewardsam","aioVocher1","positiveRating","negativeRating","cinemaVocher1"],"array2_type_elemet1":3,"score_changed":"1","description":" \u0627\u0645\u062a\u06cc\u0627\u0632\u062a\u0627\u0646 \u0628\u0627 \u0645\u0648\u0641\u0642\u06cc\u062a \u062b\u0628\u062a \u0634\u062f","rand_chance":4161,"user_score":"4295","best_chance":"4161","worst_chance":"0","is_Allowed":0}

            }
        }, activated() {

            this.$root.$emit('sideMenu_hide');
            this.$root.$emit('leftside_hide');
            this.$root.$emit('header_hide');
        }
        , methods: {
            EndAnimation() {
                this.description = this.data.message
              //  alert("f")
            }   , parseData(){
              //  alert()


                this.array=  this.data["data"]["array"].split("#")[1].split("*")
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
                            page:   "click on select chance",
                            title:  "click on select chance"
                        })
                        var period=parseInt(this.interval[0])
                        chance.insert(period).then(data => {

                            /* data.description
                             data.is_Allowed
                             data.rand_chance
                             data.AllTypes
                             data.array2
                             data.elementType*/
                      //   this.randnum= - this.randnum
                            this.randnum=Math.floor((Math.random() * 20) )*18
                                this.data=data

                            this.parseData()
                           // console.log(data)


                            this.isAnimating=1
                            this.showDroupDown = 0
                            var _this=this
                            setTimeout( _this.EndAnimation, 15000);


                        });

                        //this.Ypos = 0
                  /*  }*/
                }else if(!this.isAnimating){

                }

            }
            , back() {
                page({
                    page:   "return chance",
                    title:  "return chance"
                })
                this.$root.$emit('sideMenu_show');
                this.$root.$emit('leftside_show');
                this.$root.$emit('header_show');
                this.$router.go(-1);
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
    .sWheel-txt-wrap>.sWheel-txt>div {
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
    #ring{position: absolute; left: 219px;  top: 182px;  height: 504px;   width: 497px; z-index: 9;}
</style>