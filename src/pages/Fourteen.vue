<template>
    <div data-role="page" id="FiftySix" style="width: 1920px;height: 1080px;">
        <div id="popUp2048">
            <div style="width: 1920px;
height: 1080px;
background: #000;
opacity: 0.8;
position: absolute;
top: 0px;
left: 0px;
z-index: 2;"></div>
            <div style=" position: absolute; color: green;top: 407px;left: 760px;font-size: 35px;z-index: 3;">
                بازی با موفقیت به اتمام رسید
            </div>
            <div id="popUpScore2048" style="
    position: absolute;
    top: 468px;
    left: 670px;
    text-align: center;
    color: green;
    width: 600px;
    z-index: 3;
    font-size: 35px;
">

            </div>
            <img :src="url+'alt2/ssn/images/version/rate-2048.gif'" style="
    position: absolute;
    top: 581px;
    left: 811px;
    z-index: 3;
"><img :src="url+'alt2/ssn/images/version/popup-2048.png'" style="
    position: absolute;
    top: 245px;
    left: 564px;
    z-index: 2;
">
        </div>
        <div style="top: 0px;position: absolute;width: 1920px;height:1080px;background:#f0f4fa;margin:0 auto;text-align:center;/* margin-top:100px */">

            <div id="ErrSecond2048"
                 style="width:100%;text-align:center;position:absolute;top:688px;color: red;font-size: 28px;">برای بازی
                مجدد
                از اپ خارج شده و دوباره وارد شوید
            </div>
            <img :src="url+'alt2/ssn/images/version/SPLASH-2048.gif'" style=" margin-top: 229px;">
        </div>
        <div id="page2048" style="top: 0px;position: absolute;width: 100%;height: 100%;background: white">
            <div id="Err2048"
                 style="width: 100%; text-align: center; position: absolute; top: 20px; color: green; font-size: 38px; display: block;z-index: 1;">
            </div>
            <div  style=";background: #e6e7e8;left:0px;position: absolute;top: 0px;width: 1920px;height: 1080px" >
                <img src="../assets/images/chanse/game-tag.png" style="left:-4px ;top:-4px;position: absolute ">
            </div>
            <img style="    position: absolute;top: 94px; right: 141px;" :src="url+'alt2/ssn/images/version/emtiaz-2048.png'">

            <img style="    position: absolute; top: 94px;left: 141px;" :src="url+'alt2/ssn/images/version/logo-2048.png'">
            <img style="position: absolute; top: 231px;right: 133px;" :src="url+'alt2/ssn/images/version/plus-2048.png'">
            <div class="score2048">
                0
            </div>

            <div class="score2048r">
                0
            </div>
            <div style="
       position: absolute;
    top: 104px;
    right: 159px;
    width: 182px;
    text-align: center;
    font-size: 28px;
    color: white;">امتیاز
            </div>
            <div style="    position: absolute;
    top: 240px;
    right: 159px;
    width: 182px;
    text-align: center;
    font-size: 42px;
    color: white;
    font-weight: bold;">+
            </div>
            <div class="container text-center" id="2048">

            </div>


        </div>
    </div>
</template>

<script>

    import Game1 from '../components/2048/2048'
    import {page} from 'vue-analytics'
    import {ROAST_CONFIG} from "../config";
    export default {
        name: "fourteen", data() {
            return {
                start: 1,play2048:"",url:ROAST_CONFIG.url_Domain

            }
        },
        created() {
            this.play2048 = new Game1.Game();


        }, activated() {
            if (this.start) {
                this.play2048.play("start")
                this.start = 0
            } else {
                this.play2048.play("notOnce")
            }

        }
        , methods: {
            up() {
                //  console.log(Game1.Game())
                //Game1.Game().play("up")
            }
            , down() {
              //  Game1.Game().play("down")
            }
            , left() {
              //  Game1.Game().play("left")
            }
            , right() {
              //  Game1.Game().play("right")
            }
            , enter() {

            }
            , back() {
               // Game1.Game().play("start")
                this.$root.$emit('sideMenu_show');
                this.$root.$emit('leftside_show');
                this.$root.$emit('header_show');
                page({
                    page:   "return 2048",
                    title:  "return 2048"
                })
                this.$router.go(-1);
            }
        }

    }
</script>

<style>
    .holder2048 {
        width: 876px;
        height: 881px;
        position: relative;
        margin: 0 auto;
        background: white;
        top: 100px;
    }

    .score2048 {
        top: 147px;
        left: 1579px;
        color: white;
        position: absolute;
        font-size: 36px;
        width: 182px;
        /* height: 139px; */
        /* background: red; */
        text-align: center;
    }

    .score2048r {
        top: 289px;
        right: 159px;
        color: white;
        position: absolute;
        font-size: 36px;
        text-align: center;
        width: 182px;
    }

    /* height: 139px; */
    /* background: red; */

    .holder2048 > .container {

        width: 800px;
        height: 800px;
        position: absolute;
        /* margin: 0 auto; */
        border-style: none;
        border: 8px solid #BBADA0;
        background-color: #CCC0B3;
       left: 31px;
       top: 33px;
    }

    .holder2048 > .container > .mask {
        width: 200px;
        height: 200px;
        position: absolute;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        border: 8px solid #BBADA0;
    }

    .holder2048 > .container > .box {
        width: 186px;
        height: 186px;
        background-color: Black;
        position: absolute;
        color: #776E65;
        font-size: 84PX;
        font-weight: bolder;
        font-family: Arial;
        text-align: center;
        line-height: 200px;
    }

    .holder2048 > .container > .box[value='2'] {
        background-color: #FFF8D7
    }

    .holder2048 > .container > .box[value='4'] {
        background-color: #FFED97
    }

    .holder2048 > .container > .box[value='8'] {
        background-color: #FFBB77
    }

    .holder2048 > .container > .box[value='16'] {
        background-color: #FF9224
    }

    .holder2048 > .container > .box[value='32'] {
        background-color: #FF5809
    }

    .holder2048 > .container > .box[value='64'] {
        background-color: #EA0000
    }

    .holder2048 > .container > .box[value='128'] {
        background-color: #FFFF37
    }

    .holder2048 > .container > .box[value='256'] {
        background-color: #F9F900
    }

    .holder2048 > .container > .box[value='512'] {
        background-color: #E1E100
    }

    .holder2048 > .container > .box[value='1024'] {
        background-color: #C4C400
    }

    .holder2048 > .container > .box[value='2048'] {
        background-color: #9AFF02
    }

    .holder2048 > .container > .box[value='4096'] {
        background-color: #00FFFF
    }

    .holder2048 > .container > .box[value='8192'] {
        background-color: #FF00FF
    }

    #page2048 {
        display: none;
    }

    #ErrSecond2048 {
        display: none;
    }

    #popUp2048 {
        display: none;
    }
</style>