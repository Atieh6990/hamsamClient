<template>
  <div class="forecastBg">
    <img :src="URL + 'forecast/logo.png'" class="logo">
    <div class="whiteBg">
      <img :src="URL + 'forecast/logoF.png'" class="logoF">
      <img :src="URL + 'forecast/title.png'" class="txtF">
      <div class="tabParent">
        <div class="tabs" v-for="(Tab , i) in tab">{{Tab}}
          <div :class="[ypos == 1 && xtab == (i + 1) ? 'tabHvr' : '']"></div>
        </div>
      </div>
      <div class="line"></div>
      <div v-if="xtab == 1" class="matchParent">
        <div class="matchScroll">
          <div :id="'match_' + m" v-for="(Match , m) in matches" class="matches matchTabOne"
               :class="[(ypos == 2 && ymatch == m) ? 'hvr-grow': '']">
            <img :src='cat[m][0].pic' class="icon">
            <div class="teamName">{{Match.host.name + ' / ' + Match.guest.name}}</div>

            <div v-if="(matches[m]['forecast'].length == 0)" class="score">
              <input :id="'inputPoint_'+[m]" v-model="points[m]" placeholder="امتیاز رو بنویس"
                     class="forecastTxt"
                     :class="[((ypos == 2 && ymatch == m && xscore == 0) ? 'inputHvr':'')]">
              <div class="coinBg">
                <img :src="URL + 'friends/emtiaz.png'" class="coin">
              </div>
            </div>


            <div v-else class="score" v-for="(Forecast , f) in matches[m]['forecast']">
              <div class="scoreForecast"> {{Forecast.score}} امتیازی</div>
              <div class="coinBg">
                <img :src="URL + 'friends/emtiaz.png'" class="coin">
              </div>
            </div>


            <div v-if="(matches[m]['forecast'].length == 0)" class="timeMatch">
              {{Match.starttime}}
            </div>
            <!--<div v-else class="timeMatch" style="color:#ffb700">پیش بینی کرده اید</div>-->


            <div v-if="(matches[m]['forecast'].length == 0)" class="teamsParent">
              <div class="teamBg"
                   :style="[(ypos == 2 && ymatch == m && xscore == 1) ? { 'background': 'url(' + (URL + 'forecast/back_select.png')  + ')'}:{ 'background': 'url(' + (URL + 'forecast/back.png')  + ')'}]">
                <img :src="Match.host.pic" class="pic">
                <div v-if="(ypos == 2 && ymatch == m && xscore == 1)" class="circle"></div>
              </div>
              <div class="teamBg equal"
                   :style="[(ypos == 2 && ymatch == m && xscore == 2) ? { 'background': 'url(' + (URL + 'forecast/back_select.png')  + ')'}:{ 'background': 'url(' + (URL + 'forecast/back.png')  + ')'}]">
                <img :src="URLSERVER + 'forecast/tasavi.png'" class="pic">
                <div v-if="(ypos == 2 && ymatch == m && xscore == 2)" class="circle"></div>
              </div>
              <div class="teamBg guest"
                   :style="[(ypos == 2 && ymatch == m && xscore == 3) ? { 'background': 'url(' + (URL + 'forecast/back_select.png')  + ')'}:{ 'background': 'url(' + (URL + 'forecast/back.png')  + ')'}]">
                <img :src="Match.guest.pic" class="pic">
                <div v-if="(ypos == 2 && ymatch == m && xscore == 3)" class="circle"></div>
              </div>
            </div>
            <div v-else class="teamsParent" style="width: 645px"
                 v-for="(Forecast , f) in matches[m]['forecast']">
              <!--<div class="userForecast">-->
              <div class="userForecast"
                   v-text="(Forecast.state == 1) ?  'پیش بینی شما برد ' + Match.host.name  : (Forecast.state == 2) ? 'پیش بینی شما تساوی دو تیم'  : (Forecast.state == 3) ? 'پیش بینی شما برد ' + Match.guest.name: ''"></div>
              <!--<div class="coinBg">-->
              <!--<img :src="(Forecast.state == 1) ?  Match.host.pic  : (Forecast.state == 2) ? URL + 'tasavi2-55.png' : (Forecast.state == 3) ? Match.guest.pic: ''" class="coin">-->
              <!--</div>-->
              <!--</div>-->
              <div class="cancelButton"
                   :class="[(ypos == 2 && ymatch == m) ? 'cancelHvr':'']">انصراف
              </div>
            </div>

          </div>
        </div>

      </div>
      <div v-if="xtab == 2" class="matchParent">
        <div :id="'match_' + m" v-for="(Match , m) in matches" class="matches matchTabTwo"
             :class="[(ypos == 2 && ymatch == m) ? 'hvr-grow': '']">
          <img :src="URL + 'forecast/friendMatch.png'" class="icon">
          <div class="teamName">{{Match.host.name + ' / ' + Match.guest.name}}</div>
          <div class="score">
            <div class="scoreForecast"> {{Match.score}} امتیازی</div>
            <div class="coinBg">
              <img :src="URL + 'friends/emtiaz.png'" class="coin">
            </div>
          </div>
          <div class="timeMatch">
            نتیجه بازی : {{Match.finalstate}}
          </div>
          <div class="userForecast"
               v-text="(Match.state == 1) ?  'پیش بینی شما برد ' + Match.host.name  : (Match.state == 2) ? 'پیش بینی شما تساوی دو تیم'  : (Match.state == 3) ? 'پیش بینی شما برد ' + Match.guest.name: ''">

          </div>
          <div class="scoreUserParent">
            <div class="scoreUser"
                 v-text="Match.confficient == 1 ? '+' + (Match.score) : Match.confficient == -1 ? (Match.score != 0) ? '-' + (Match.score) : (Match.score): ''"></div>
            <img class="cup"
                 :src="Match.confficient == 1 ? URLSERVER + 'forecast/bord.png' : Match.confficient == -1 ? URLSERVER + 'forecast/bakht.png' : ''">
          </div>
        </div>
      </div>
      <div v-if="xtab == 2" class="buttonsGroup">
        <div class="btn">
          <div class="prev-next prev"
               :class="[(ypos == 3 && xpage == 1) ? 'pageHvr' : '']"> قبلی
          </div>
          <div class="currentPage" :class="[]">
            <span class="pages">{{meta['current_page']}}</span>
            <span class="pages">/</span>
            <span class="pages">{{meta['last_page']}}</span>
          </div>
          <div class="prev-next next" :class="[(ypos == 3 && xpage == 2) ? 'pageHvr' : '']">بعدی</div>
        </div>
      </div> <!-- End of buttonsGroup-55 -->
      <div v-if="xtab == 3" class="guideParent">
        برای پیش بینی در این بخش شما می توانید با انتخاب نتیجه "برد، باخت، یا مساوی " در هم سام به پیش بینی
        بازی ها بپردازید.
        <br>امتیاز پیش بینی ها در نسخه جدید هم سام به این صورت است که تنها درصورتی که چالشی برای پیش بینی ایجاد کرده
        باشیم و شما در آن چالش شرکت کرده باشید، طبق قواعد آن چالش امتیاز پیش بینی ها محاسبه می گردد.
        <br> به طور مثال قانون شرکت در چالشی مانند " پیش بینی کن امتیاز بگیر" این است که درطول زمان فعال بودن چالش، مثلا
        5 بازی را باید درست حدس بزنید، شما از بین 20 بازی فوتبال موجود اگر نتیجه 5 بازی را درست حدس بزنید امتیاز چالش را
        دریافت می کنید.<br> بنابراین برای 15 بازی باقی مانده دیگر نه امتیازی از دست خواهید داد و نه امتیازی می گیرید.
        <br> درکل نحوه امتیاز گیری از بخش پیش بینی وابسته به نوع چالش وقوانینی است که در صفحه ی چالش ها تعیین می شود.
        <br> نتایج بازی ها و درنتیجه محاسبه ی امتیاز هر کاربر ، روز بعد از مسابقات ثبت می شود.
        <br> فرصت پیش بینی تا آغاز مسابقه است و بعد از آن غیر فعال می شود.
        درنظر داشته باشید این پیش بینی، از اپلیکیشن پیش بینی که در اخبارمعرفی کرده ایم، مجزا است و در نتیجه چالش ها و
        امتیازات مربوط به هر کدام نیز متفاوت است.

      </div>
    </div>
  </div>
</template>

<script>
    import IScroll from "../../js/iscroll";
    import {ROAST_CONFIG} from '../../config';

    export default {
        name: "forecast",
        props: ['matches', 'meta', 'cat'],
        data() {
            return {
                URL: ROAST_CONFIG.url_Img_comp,
                URLSERVER: ROAST_CONFIG.url_comp_server,
                tab: ['بازی های قابل پیش بینی', 'پیش بینی های انجام شده', 'راهنما'],
                ypos: 1,
                xtab: 1,
                ymatch: 0,
                xscore: 0,
                xpage: 1,
                // forecast: [],
                type: 0,
                // emptyPoint: false,
                points: [],
                myScroll: ''


            }
        },
        created() {

            this.$root.$on('refresh_list', () => {
                this.xscore = 0;
                // this.forecast = '';
                this.points = [];

            });
            this.$root.$on('refresh_page', () => {
                this.ymatch = 0;
            });
            var _self = this;
            _self = setTimeout(() => {
                this.scrollInit();
            }, 10);

        }, methods: {
            scrollInit() {
                this.myScroll = '';
                if (this.myScroll == '') {
                    setTimeout(() => {
                        this.myScroll = new IScroll(".matchParent", {
                            scrollY: true,
                            scrollbars: "custom",
                            momentum: true,
                            preventDefault: false,
                            scrollbars: false,
                            mouseWheel: true,
                            interactiveScrollbars: true,
                            shrinkScrollbars: "none",
                            fadeScrollbars: false,
                            mouseMove: true
                        });
                    }, 10);

                }

            },
            up() {
                if (this.ypos == 3) {
                    this.ypos = 2;
                } else if (this.ypos == 2) {
                    if (this.ymatch > 0) {
                        this.ymatch--;
                        this.myScroll.scrollToElement('#match_' + this.ymatch, 590, false, true);
                        this.myScroll.refresh();

                    } else {
                        this.ypos = 1;

                    }
                }

            }, down() {
                if (this.ypos == 1) {
                    if (this.matches.length != 0) {
                        this.ypos = 2;
                    }


                } else if (this.ypos == 2) {
                    if (this.ymatch < (this.matches.length) - 1) {
                        this.ymatch++;
                        this.xscore = 0;
                        this.myScroll.scrollToElement('#match_' + this.ymatch, 590, false, -180);
                        this.myScroll.refresh();


                    } else {
                        if (this.xtab == 2) {
                            this.ypos = 3;
                        }

                    }
                }
                // this.emptyPoint = false;


            }, left() {
                if (this.ypos == 1) {
                    if (this.xtab < this.tab.length) {
                        this.xtab++;
                        return {
                            'ypos': this.ypos,
                            'xtab': this.xtab,
                            // 'length': this.tab.length
                        }
                    }

                    return true;
                } else if (this.ypos == 2) {
                    if (this.xscore < 3) {
                        this.xscore++;
                    }
                    return true;
                } else if (this.ypos == 3) {
                    this.xpage = 2;
                    return true;
                }
                // this.emptyPoint = false;
                return false;
            }, right() {
                if (this.ypos == 1) {
                    if (this.xtab > 1) {
                        this.xtab--;
                        return {
                            'ypos': this.ypos,
                            'xtab': this.xtab,
                        }

                    }
                    return true;
                } else if (this.ypos == 2) {
                    if (this.xscore > 0) {
                        this.xscore--;
                    }
                    return true;
                } else if (this.ypos == 3) {
                    this.xpage = 1;
                    return true;
                }
                // this.emptyPoint = false;
                return false;

            }, enter() {
                // alert(this.xscore + ' ' + this.ypos)
                if (this.ypos == 2) {

                    if (this.matches[this.ymatch]['forecast'].length == 0) {
                        // console.log('point  --->' + this.points[this.ymatch] + ' xscore ---->' + this.xscore + ' fore ->' + this.forecast)
                        // if (this.points[this.ymatch] > 0 && this.xscore > 0) {
                        if (this.xscore > 0) {
                            // this.emptyPoint = false;
                            return {
                                'ypos': this.ypos,
                                'matchID': this.matches[this.ymatch]['id'],
                                'type': this.xscore,
                                'point': this.points[this.ymatch],
                                // 'stsPoint': this.emptyPoint,
                                'forecast': this.matches[this.ymatch]['forecast'].length
                            }
                        }
                        // else {
                        //     this.emptyPoint = true;
                        //     return {
                        //         'stsPoint': this.emptyPoint
                        //     }
                        // }

                    } else {
                        return {
                            'ypos': this.ypos,
                            'matchID': this.matches[this.ymatch]['id'],
                            'forecast': this.matches[this.ymatch]['forecast'].length
                        }

                    }


                } else if (this.ypos == 3) {
                    return {
                        'ypos': this.ypos,
                        'xpage': this.xpage
                    }
                }


            },
            showNumber(number) {
                // alert(number)
                // if (this.xPos == 0) {

                // if (this.predicted[this.yMatch] == 0 && !this.isForcast(this.yMatch)) {

                // if (this.xPos1 == 0) {
                // console.log(this.forecast);

                if (number > 9) {


                    if (isNaN(parseInt(this.points[this.ymatch]))) {

                    } else {
                        // alert('else')
                        var str = "'" + this.points[this.ymatch] + "'";
                        var res = str.substring(1, str.length - 2);
                        this.points[this.ymatch] = res;
                        // alert(this.points[this.ymatch]);
                        this.$set(this.points, this.ymatch, this.points[this.ymatch]);

                    }

                } else {
                    //  alert('4 -->' + parseInt(this.points[this.ymatch]))

                    if (isNaN(parseInt(this.points[this.ymatch]))) {
                        //  alert('this.points[this.yMatch]if --->' + this.ymatch + '   ' + this.points);

                        this.$set(this.points, this.ymatch, number);
                        //   alert(this.points)
                    } else {

                        //   alert('this.points[this.yMatch]else --->' + this.points[this.ymatch]);
                        this.$set(this.points, this.ymatch, parseInt(parseInt(this.points[this.ymatch]) + "" + number));
                        //    alert(this.points)
                    }

                }

                // this.forecast[this.ymatch] = this.points[this.ymatch];
                // this.$set(this.forecast, this.points[this.ymatch] + "", number);
                //alert('array  --->' + this.forecast[this.ymatch])


            }
        }
    }
</script>

<style scoped>
  .forecastBg {
    background-color: #e6e7e8;
    width: 1920px;
    height: 1080px;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 11;
  }

  .logo {
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 1;
  }

  .whiteBg {
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
    width: 1650px;
    height: 960px;
    position: absolute;
    top: 90px;
    left: 140px;
  }

  .logoF {
    position: absolute;
    top: 50px;
    left: 85px;

  }

  .txtF {
    position: absolute;
    top: 40px;
    left: 605px;
  }

  .tabParent {
    width: 900px;
    height: 70px;
    position: absolute;
    top: 200px;
    left: 375px;
    line-height: 70px;
  }

  .tabs {
    width: 300px;
    height: 70px;
    float: right;
    font-size: 23px;
    color: #212121;

  }

  .line {
    background-color: #a1a1a1;
    width: 1650px;
    height: 2px;
    position: absolute;
    top: 274px;
  }

  .tabHvr {
    background-color: #1c5aa9;
    width: 300px;
    height: 5px;
    position: absolute;

  }

  .matchParent {
    width: 1597px;
    height: 620px;
    /*height: 570px;*/
    position: absolute;
    top: 280px;
    left: 25px;
    overflow: hidden;
  }

  .matchScroll {
    width: 1534px;
    position: absolute;
    top: 0px;
    left: 0px;
  }

  .matches {
    border-width: 2px;
    border-color: rgb(172, 172, 172);
    border-style: solid;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
    width: 1534px;
    height: 82px;

  }

  .matchTabOne {
    float: left;
    position: relative;
    margin-top: 15px;
    margin-left: 30px;
  }

  .matchTabTwo {
    float: right;
    position: relative;
    margin-top: 15px;
    margin-right: 30px;
  }

  .icon {
    float: right;
    position: relative;
    right: 20px;
    top: 12px;

  }

  .teamName {
    width: 325px;
    height: 82px;
    position: relative;
    right: 20px;
    float: right;
    line-height: 82px;
    font-size: 21px;
    color: #212121;
  }

  .score {
    border-radius: 15px;
    background-color: rgb(225, 225, 225);
    width: 247px;
    height: 57px;
    float: right;
    position: relative;
    right: 25px;
    top: 13px;
  }

  .coinBg {
    background-color: #d2cece;
    width: 65px;
    height: 57px;
    float: left;
    border-bottom-left-radius: 15px;
    border-top-left-radius: 15px;
    position: absolute;
    left: 0px;
    z-index: 111;
  }

  .coin {
    width: 46px;
    height: 46px;
    margin-top: 5px;
  }

  .forecastTxt {
    background-color: rgb(225, 225, 225);
    width: 180px;
    height: 54px;
    color: #4d4d4f;
    line-height: 54px;
    float: right;
    direction: rtl;
    font-size: 20px;
    position: relative;
    top: 1px;
    right: 0px;
    text-align: right;
    border: none;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    text-indent: 15px;
  }

  .textarea:focus, input:focus {
    outline: none;
  }

  .inputHvr {
    border: 1px solid #212121;
  }

  .emptyPoint {
    border: 1px solid red;
  }

  .timeMatch {
    width: 375px;
    height: 82px;
    position: relative;
    float: right;
    font-size: 20px;
    line-height: 82px;
    color: #212121;
    right: 30px;
  }

  .teamsParent {
    width: 500px;
    height: 82px;
    position: relative;
    float: left;

  }

  .teamBg {
    width: 97px;
    height: 64px;
    float: right;
    position: relative;
    top: 8px;
  }

  .host {

  }

  .equal {
    right: 85px;
  }

  .guest {
    right: 170px;
  }

  .pic {
    width: 52px;
    position: absolute;
    right: 6px;
    top: 7px;
  }

  .hvr-grow {
    -webkit-transform: scale(1.03);
    transform: scale(1.03);
    -webkit-transition-duration: 0.7s;
  }

  .teamHvr {

  }

  .circle {
    background-color: #24ff00;
    width: 20px;
    height: 20px;
    border-radius: 50px;
    position: absolute;
    top: 22px;
    left: 10px;

  }

  .userForecast {
    border-radius: 15px;
    width: 332px;
    height: 54px;
    float: right;
    position: relative;
    top: 13px;
    color: #f99c2a;
    line-height: 54px;
    direction: rtl;
    font-size: 20px;
    text-align: center;

  }

  .scoreForecast {
    width: 180px;
    height: 54px;
    color: #212121;
    line-height: 54px;
    float: right;
    direction: rtl;
    font-size: 20px;
    text-align: center;
  }

  /*.cancelScore {*/
  /*background-color: rgb(225, 225, 225);*/
  /*width: 65px;*/
  /*height: 57px;*/
  /*border-radius: 50px;*/
  /*position: absolute;*/
  /*left: 0px;*/

  /*}*/

  .cancelButton {
    background-color: #e53935;
    width: 247px;
    height: 57px;
    line-height: 57px;
    position: relative;
    float: left;
    top: 9px;
    left: 20px;
    color: #fff;
    border-radius: 15px;
    font-size: 20px;
    border: 3px solid transparent;

  }

  .cancelHvr {
    border-width: 3px;
    border-color: rgb(148, 11, 8);
    border-style: solid;
    border-radius: 15px;
    box-shadow: 0px 0px 6.79px 0.21px rgba(0, 0, 0, 0.6);
  }

  .scoreUserParent {
    width: 190px;
    height: 54px;
    float: left;
    position: relative;
    top: 13px;
  }

  .scoreUser {
    width: 130px;
    height: 54px;
    float: right;
    position: relative;
    line-height: 54px;
    font-size: 20px;
    text-align: left;
    color: #212121;
    direction: ltr;
  }

  .cup {
    float: left;
    position: relative;
    top: 10px;
    left: 20px;

  }

  .buttonsGroup {
    width: 418px;
    height: 50px;
    border-radius: 10px;
    /*background-color: rgb(225, 225, 225);*/
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    bottom: 10px;
    left: 600px;
  }

  .btn {
    width: 330px;
    height: 40px;
    position: absolute;
    top: 5px;
    right: 48px;

  }

  .prev-next {
    width: 88px;
    height: 40px;
    line-height: 40px;
    background-color: #d2cece;
    color: #212121;
    border-radius: 10px;
    border: 2px solid transparent;
    font-size: 19px;
    text-align: center;
    position: relative;

  }

  .prev {
    right: 10px;
    float: right;
  }

  .next {
    left: 10px;
    float: left;

  }

  .currentPage {
    width: 100px;
    height: 45px;
    border-radius: 5px;
    display: inline-block;
    font-size: 22px;
    font-family: 'BYekan';
    text-align: center;
    background-color: #f99c2a;
    color: #ffffff;

  }

  /*.pageHvr {*/
  /*background-color: #5d62a4;*/
  /*}*/

  .pageHvr {
    border: 2px solid #212121;
  }

  .pages {
    position: relative;
    top: 5px;
  }

  .guideParent {
    width: 1440px;
    height: 620px;
    line-height: 50px;
    position: absolute;
    top: 300px;
    left: 105px;
    overflow: hidden;
    font-size: 22px;
    text-align: right;
    direction: rtl;
    color: #212121;
  }

</style>
