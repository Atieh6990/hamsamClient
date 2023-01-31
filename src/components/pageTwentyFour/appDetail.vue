<template>
  <div>
    <div class="detailParent">
      <div class="iconBg">
        <img class="iconApp" :src="appDetail.icon">
      </div>
      <div class="titleParent">
        <div class="Title persian">{{appDetail.name}}</div>
        <div class="Title finglish">
          {{appDetail.ename}}
        </div>
      </div>
      <div class="rateApp">
        <div class="rateParent">
          <star-rating :star-size="28.46"
                       :max-rating="5"
                       inactive-color="#CCCACA"
                       active-color="#F2994A"
                       :rating="appDetail.rate"
                       :read-only="true"
                       :show-rating="false"
                       :round-start-rating="false">
          </star-rating>
        </div>
      </div>
      <div class="description" v-html="appDetail.longdesc"></div>
      <div class="buttonsParent">
        <div class="button openApp"
             :class="[(activeRoute == 1  && yActive== yPage && ypos == 1 && xpos == 1 && xdetail == 1) ? 'hvr-bob':'']">
          <div class="txtButton">باز کردن برنامه</div>
          <img class="iconButton" :src="URL + 'apps/open-folder.png'">
        </div>
        <div class="button rate"
             :class="[activeRoute == 1  && yActive== yPage && ypos == 1 && xpos == 1 && xdetail == 2 ? 'hvr-bob':'']">
          <div class="txtButton">امتیاز</div>
          <img class="iconButton" :src="URL + 'apps/star.png'">
        </div>
      </div>
    </div>
    <div v-if="showText" class="appDownload">برای نصب به اپ APPS مراجعه کنید
    </div>
    <div class="screenParent">

      <div v-for="(Screen , i) in screen">
        <img class="screenShot" :src="Screen"
             :class="[(xscreen == (i + 1)) ? 'show':'']">
        <!--<img class="screenShot" src=""-->
        <!--:class="[(activeRoute == 1 && xscreen == (i + 1)) ? 'show':'']">-->
      </div>
      <div class="screenListParent">
        <div v-for="(Screen , i) in screen" class="screens">
          <!--<img class="screenImg" src="">-->
          <img class="screenImg" :src="Screen">
          <div
            :class="[activeRoute == 1  && yActive== yPage && ypos == 1 && xpos == 2 && xscreen == (i + 1) ? 'screenHvr' : '']"></div>
        </div>
      </div>


    </div>
    <img :src="URL + 'apps/comment.png'" class="cmdIcon" style="bottom: 368.27px;">
    <div class="titleCmd" style="bottom: 354.27px;">افرادی که در مورد این برنامه نظر داده اند</div>

    <div class="userBox">
      <div v-for="(Comment , index) in userComment" class="circle imgBox">
        <img v-if="Comment.pic" :src="Comment.pic" style="width: 100%"/>
        <img v-else :src="URL + 'header/userdefaul.png'" style="width: 100%"/>
      </div>
      <div v-if="commentcount > 9" class="circle plus"
           :class="[(activeRoute == 1  && yActive== yPage && ypos == 2 && xmsg == 1) ? 'hvr-bob  hvr-circle' : '']">
        +10
      </div>
      <div class="circle cmdCircle"
           :class="[(activeRoute == 1  && yActive== yPage && ypos == 2 && xmsg == 2) ? 'hvr-bob  hvr-circle' : '']">
        <img class="cmdWIcon" :src="URL + 'apps/commentW.png'">
      </div>

    </div>
    <img :src="URL + 'apps/Polygon.png'" class="cmdIcon" style="bottom: 173.27px;">
    <div class="titleCmd" style="bottom: 162.27px;right: 145px;">برنامه های مشابه این برنامه</div>
    <div v-if="showMsg" class="popupParent">
      <div ref="msgPopup" class="msgPopup">
        <div class="gradient"></div>
        <div class="cmdTitle">نظرات افراد در مورد برنامه {{appDetail.name}}</div>
        <div class="countCmd">{{commentcount}} نظر</div>
        <div id="listParent" class="listParent">
          <div class="cmdScroll">
            <div :id="'cmd_' + c" v-for="(Comment , c) in commentApp"
                 class="cmdList">
              <div v-if="Comment.user != null">
                <img v-if="Comment.user.pic != null" :src="Comment.user.pic" class="usersImg">
                <img v-else :src="URL + 'header/userdefaul.png'" class="usersImg">
                <div class="cmdTxt usersName">{{Comment.user.username}}</div>
              </div>


              <div class="cmdTxt dateCmd">{{Comment.date}}</div>
              <div class="cmdUsers">{{Comment.cm}}</div>
              <div class="line"></div>
            </div>
          </div>
        </div>
        <input id="cmd" v-model="comment" placeholder="متن پیام خود را اینجا بنویسید" class="msgTxt"
               :class="[(activeRoute == 1  && yActive== yPage && ysendmsg == 2 && xsendmsg == 1) ? 'msgHover':'']">
        <div class="sendMsgBg sendMsg">
          <img :src="URL + 'apps/send.png'" class="sendIcon">
          <div class="sendTxt">ارسال</div>
        </div>
        <div v-if="(activeRoute == 1  && yActive== yPage && ysendmsg == 2 && xsendmsg == 2)"
             class="sendMsgBgHvr sendMsg">
          <img :src="URL + 'apps/send.png'" class="sendIcon">
          <div class="sendTxt">ارسال</div>
        </div>


      </div>
      <div v-if="showSuccessCmd" class="successCmd">{{successCmd}}</div>
    </div>
    <div v-if="showStar" class="popupParent">
      <div class="ratePopup">
        <div class="starParent">
          <div :id="'rates_' + r" v-for="(r , Rate) in 5" class="rates">
            <img :src="onlineURL + 'apps/starOff.png'" class="stars">
            <img :src="onlineURL + 'apps/starOn.png'" class="stars starOn"
                 :class="[r <= appRate ? 'showStarOn' : '']">
            <img :src="onlineURL + 'apps/trans.gif'" class="stars starOn"
                 :class="[r <= appRate ? 'showStarOn' : '']">
          </div>
        </div>
        <div v-if="showRateMsg" class="starMsg">{{ratemsg}}</div>
      </div>
    </div>


  </div>

</template>

<script>
  import {ROAST_CONFIG} from '../../config';
  import IScroll from "../../js/iscroll";
  import StarRating from 'vue-star-rating';
  import func from '../../mixins/func'


  export default {
    props: ['appDetail', 'userComment', 'screen', 'commentcount', 'successCmd', 'ratemsg', 'commentApp', 'xActive', 'yActive', 'yPage', 'xPage', 'activeRoute', 'noAjaxCmd'],
    name: "app-detail",
    mixins: [func],
    data() {
      return {
        URL: ROAST_CONFIG.url_Img_comp,
        onlineURL: ROAST_CONFIG.url_comp_server,
        ypos: 1,
        xpos: 1,
        xscreen: 1,
        xdetail: 1,
        xmsg: 1,
        ycmd: 0,
        show: false,
        showMsg: false,
        myScroll: '',
        showStar: false,
        appRate: 0,
        comment: '',
        xsendmsg: 2,
        ysendmsg: 1,
        showSuccessCmd: false,
        showRateMsg: false,
        keyboard: false,
        showText: false,


      }
    },
    created() {
      this.$root.$on('showMsg', () => {
        this.showSuccessCmd = true;

      });
      this.$root.$on('hideMsg', () => {
        this.showSuccessCmd = false;

      });
      this.$root.$on('showRateMsg', () => {
        this.showRateMsg = true;

      });
      this.$root.$on('hideRateMsg', () => {
        this.showRateMsg = false;

      });
      this.$root.$on('show_dl', () => {
        this.showText = true;

      });
      this.$root.$on('hide_dl', () => {
        this.showText = false;

      });
      this.$root.$on('changeTopPopup', () => {
        this.keyboard = true;
        this.$refs.msgPopup.style.bottom = "520px";
        this.$refs.msgPopup.style.transition = '0.2s';
      });
      this.$root.$on('defaultTopPopup', () => {
        this.keyboard = false;
        this.$refs.msgPopup.style.bottom = "0px";
        this.$refs.msgPopup.style.transition = '0.2s';
      });


    },
    components: {
      StarRating
    },
    methods: {

      scrollInit() {
        this.myScroll = new IScroll(".listParent", {
          scrollY: true,
          scrollbars: "custom",
          momentum: true,
          preventDefault: false,
          scrollbars: true,
          mouseWheel: true,
          interactiveScrollbars: true,
          shrinkScrollbars: "none",
          fadeScrollbars: false,
          mouseMove: true
        });
      },
      up() {
        // alert('ypos ->' + this.ypos)

        if (this.ypos == 2) {

          if (this.showMsg) {
            if (this.ysendmsg == 1) {
              if (this.ycmd > 0) {
                this.ycmd--;
                this.myScroll.scrollToElement('#cmd_' + this.ycmd, 590, false, true);
                this.myScroll.refresh();

              }
            } else if (this.ysendmsg == 2) {
              this.hideKeyboard();
              this.ysendmsg = 1;
              var _self = this;
              _self = setTimeout(() => {
                this.scrollInit();
              }, 10);

            }
            return true;
          } else {
            this.ypos = 1;
            return true;
          }

        }
        return false;

      },
      down() {

        // alert(this.ypos)
        if (this.ypos == 1) {
          this.ypos = 2;
          if (this.commentcount > 9) {
            this.xmsg = 1;
          } else {
            this.xmsg = 2;
          }
          return true;
        } else if (this.ypos == 2) {

          if (this.showMsg) {

            if (this.ysendmsg == 1) {

              if (this.ycmd < (this.commentApp.length) - 2) {
                // alert('if')
                this.ycmd++;
                this.myScroll.scrollToElement('#cmd_' + this.ycmd, 500, false, true);
                this.myScroll.refresh();
                return true;
              } else if ((this.ycmd == (this.commentApp.length) - 2)) {
                return {
                  'ypos': this.ypos,
                  'showMsg': this.showMsg,
                  'ysendmsg': this.ysendmsg,
                  'ycmd': this.ycmd,
                  'length': (this.commentApp.length) - 2
                }

              }

            } else if (this.ysendmsg == 2) {
              return true;
            }

          }

        }
        return false;

      },
      right() {


        if (this.ypos == 1) {
          if (this.xpos == 2) {
            if (this.xscreen > 1) {
              this.xscreen--;
              return true;
            } else {
              this.xpos = 1;
              return true;

            }
            // return false;
          } else if (this.xpos == 1) {
            // alert(this.showStar)
            if (this.showStar) {
              if (this.appRate < 5) {
                this.appRate++;


              }
              return true;
            } else {
              if (this.xdetail == 2) {
                this.xdetail = 1;
                return true;
              }

            }


          }
          return false;
        } else if (this.ypos == 2) {

          if (this.xmsg == 2) {
            if (!this.showMsg) {
              if (this.commentcount > 9) {
                this.xmsg = 1;
                return true;
              }
            }

          }


          if (this.showMsg) {
            this.xsendmsg = 1;
            return true;
          }


          return false;

        }


      },
      left() {


        if (this.ypos == 1) {
          if (this.xpos == 1) {
            if (this.showStar) {
              if (this.appRate > 0) {
                this.appRate--;


              }
              return true;
            } else {
              if (this.xdetail == 1) {
                this.xdetail = 2;
                return true;
              } else if (this.xdetail == 2) {
                this.xpos = 2;
                return true;
              }
            }


          } else if (this.xpos == 2) {
            if (this.xscreen < this.screen.length) {
              this.xscreen++;
              return true;
            }

          }
          return false;
        } else if (this.ypos == 2) {

          if (this.xmsg == 1) {
            if (!this.showMsg) {
              if (this.commentcount > 9) {
                this.xmsg = 2;
                return true;
              }
            }

          }


          if (this.showMsg) {
            this.xsendmsg = 2;
            return true;

          }


          return false;

        }


      }, enter() {


        if (this.ypos == 1) {

          if (this.showStar) {

            setTimeout(() => {
              this.showStar = false;
              this.appRate = 0;
            }, 5000);

          } else {
            if (this.xpos == 1) {
              if (this.xdetail == 1) {

              } else if (this.xdetail == 2) {
                this.showStar = true;
                this.showRateMsg = false;


              }

            } else if (this.xpos == 2) {

            }

          }

        } else if (this.ypos == 2) {

          if (this.xmsg == 1 || this.xmsg == 2) {

            if (this.noAjaxCmd == false) {
              this.showMsg = true;
              this.comment = '';
            }


          }
          if (this.xmsg == 2) {
            this.ysendmsg = 2;


          }
        }
        return {
          'ypos': this.ypos,
          'xpos': this.xpos,
          'xdetail': this.xdetail,
          'showStar': this.showStar,
          'rating': this.appRate,
          'xmsg': this.xmsg,
          'comment': this.comment,
          'ysend': this.ysendmsg,
          'xsend': this.xsendmsg,


        }


      },
      back() {
        if (this.showMsg == true) {
          if (this.keyboard) {
            this.keyboard = false;
            this.hideKeyboard();
            return true
          } else {
            this.myScroll.refresh();
            this.resetParams();
            return true;
          }

        }
        if (this.showStar == true) {
          this.showStar = false;
          return true;
        }
        return false;

      },
      done() {
        this.hideKeyboard();
      },
      cancel() {
        this.hideKeyboard();
      },
      resetParams() {

        this.showMsg = false;
        this.ycmd = 0;
        this.ysendmsg = 1;
        this.$root.$emit('refresh_flag');

      },
      showKeyboard() {
        this.showIme('cmd');
      }, hideKeyboard() {
        this.hideIme("cmd");
      }

    }
  }
</script>

<style scoped>
  .detailParent {
    width: 865px;
    height: 426.96px;
    position: absolute;
    top: 100px;
    right: 111px;
    /*border: 1px solid red;*/
  }

  .iconBg {
    background-color: #fff;
    width: 138px;
    height: 132px;
    position: absolute;
    right: 0px;
    border-radius: 100px;
    box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.25);
  }


  .iconApp {
    position: relative;
    top: 4px;
    left: 75px;

  }


  .titleParent {
    width: 485px;
    height: 132px;
    position: absolute;
    right: 140px;
    /*border: 1px solid green;*/

  }

  .Title {
    width: 655px;
    height: 66px;
    float: right;
    color: #494949;
    text-align: right;
    direction: rtl;
    text-indent: 20px;

  }

  .persian {
    font-size: 30px;
    line-height: 80px;
  }

  .finglish {
    font-size: 22px;
    line-height: 50px;
  }

  .rateApp {
    width: 168px;
    height: 66px;
    position: absolute;
    top: 67px;
    left: 0px;
    direction: ltr;
    /*border: 1px solid #424AB5;*/

  }

  .description {
    width: 865px;
    height: 300px;
    line-height: 28px;
    position: absolute;
    top: 140px;
    font-size: 20px;
    text-align: right;
    color: #737373;
    direction: rtl;
  }

  .buttonsParent {
    width: 795px;
    height: 57px;
    position: absolute;
    top: 475px;
    right: 0px;
  }

  .button {
    width: 217px;
    height: 57px;
    border-radius: 10px;
    position: relative;
    float: right;
    box-shadow: 0px 4px 22px rgba(242, 153, 74, 0.39);

  }

  .openApp {
    background-color: #D50004;

  }

  .rate {
    background-color: #F2994A;
    right: 20px;

  }

  .txtButton {
    width: 150px;
    height: 57px;
    float: right;
    line-height: 57px;
    color: #fff;
    font-size: 18px;
    text-align: right;
    text-indent: 20px;
    direction: rtl;
  }

  .iconButton {
    position: absolute;
    float: left;
    left: 20px;
    top: 15px;
  }

  .appDownload {
    position: absolute;
    width: 400px;
    height: 34px;
    right: 115px;
    top:526px;
    border-radius: 0px 5px 5px 0px;
    color: #D50004;
    line-height: 34px;
    font-size: 20px;
    direction: rtl;
    transition: all 1s;

  }

  .screenParent {
    width: 796.3px;
    height: 565px;
    position: absolute;
    left: 85px;
    top: 100px;

  }

  .screenShot {
    width: 796.3px;
    height: 426.96px;
    position: absolute;
    left: 0px;
    border-radius: 10px 10px 0px 0px;
    display: none;

  }

  .screenListParent {
    width: 796px;
    position: absolute;
    top: 425px;
    left: 3px;
  }

  .screens {
    position: relative;
    float: right;
    margin-right: 8px;
    margin-top: 15px;

  }

  .screenImg {
    width: 190.43px;
    height: 123px;
    border-radius: 10px;
  }

  .screenHvr {
    position: absolute;
    background-color: #9B51E0;
    width: 0px;
    height: 5px;
    right: 3px;
    top: 137px;
    -webkit-animation-name: move; /* Safari 4.0 - 8.0 */
    -webkit-animation-duration: 0.6s; /* Safari 4.0 - 8.0 */
    animation-name: move;
    animation-duration: 0.6s;
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

  .show {
    display: block;
  }

  .cmdIcon {
    position: absolute;
    right: 107px;

  }

  .titleCmd {
    width: 335px;
    height: 46px;
    line-height: 40px;
    position: absolute;
    right: 156px;
    color: #4B0D85;
    font-size: 21px;
    text-align: right;

  }

  .userBox {
    width: 525px;
    height: 76.78px;
    position: relative;
    float: right;
    top: 755px;
    right: 107px;
    /*border: 1px solid red;*/
  }

  .circle {
    position: relative;
    float: right;
    margin-right: 10px;
    width: 76.78px;
    height: 76.78px;
    line-height: 76.78px;
    border-radius: 50px;
    transition: 0.7s;
    transform: scale(1.1);
    border: 4px solid transparent;
  }

  .imgBox {
    overflow: hidden;
  }

  .plus {
    background-color: #FFFFFF;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.23);
    border-radius: 50px;
    font-size: 24px;
    text-align: center;
    color: #A6A6A6;

  }

  /*.plusHvr{*/
  /*border: 1px solid #622B94;*/
  /*}*/

  .cmdCircle {
    background-color: #622B94;
    box-shadow: 0px 1px 19px rgba(98, 43, 148, 0.36);
  }

  .hide {
    display: none
  }

  .cmdWIcon {
    position: relative;
    top: 12px;
    right: 0px;
  }

  .popupParent {
    background: rgba(246, 246, 246, 0.9);
    width: 1920px;
    height: 1080px;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 11;

  }

  .msgPopup {
    background-color: #fff;
    width: 1130.19px;
    height: 834.08px;
    position: absolute;
    bottom: 0px;
    right: 404.9px;
    box-shadow: 0px -1px 20px rgba(0, 0, 0, 0.25);
    border-radius: 30px 30px 0px 0px;

  }

  .cmdTitle {
    width: 394px;
    height: 33px;
    line-height: 31px;
    position: absolute;
    top: 19.94px;
    right: 33.86px;
    font-size: 21px;
    color: #622B94;
    text-align: right;
    z-index: 1;
    /*border: 1px solid red;*/
  }

  .countCmd {
    width: 100px;
    height: 33px;
    position: absolute;
    top: 19.94px;
    left: 23.09px;
    font-size: 21px;
    color: #622B94;
    text-align: left;
    direction: rtl;
    z-index: 1;

  }

  .gradient {
    width: 1130.61px;
    height: 144.99px;
    position: absolute;
    top: 0px;
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.9) 60.22%, rgba(255, 255, 255, 0) 100%);
    border-radius: 20px 20px 0px 0px;
    z-index: 1;
    /*border: 1px solid red;*/

  }

  .listParent {
    width: 1130.61px;
    height: 675px;
    position: absolute;
    top: 70px;
    overflow: hidden;
    /*border: 1px solid red;*/

  }

  .cmdScroll {
    width: 1130.61px;
    position: absolute;
    top: 0px;
    left: 0px;
    /*border: 1px solid palevioletred;*/
  }

  .cmdList {
    width: 1130.61px;
    height: 165px;
    line-height: 30px;
    position: relative;
    color: #000;
    /*min-height: 165px;*/
    /*border: 1px solid #337ab7;*/
  }

  .usersImg {
    width: 80.02px;
    height: 80.02px;
    position: relative;
    float: right;
    top: 10px;
    right: 25px;
    border-radius: 50px;
  }

  .cmdTxt {
    width: 200px;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    position: absolute;
    top: 18px;
    direction: rtl;
    /*border: 1px solid #424AB5;*/

  }

  .usersName {
    text-align: right;
    color: #000;
    right: 126.58px;
  }

  .dateCmd {
    left: 24.69px;
    text-align: left;
    color: #A4A4A4;
  }

  .cmdUsers {
    width: 982.34px;
    height: 85px;
    position: absolute;
    top: 60px;
    left: 24.69px;
    font-size: 20px;
    text-align: justify;
    color: #A4A4A4;
    direction: rtl;
    /*border: 1px solid red;*/

  }

  .line {
    width: 984.75px;
    height: 0px;
    position: absolute;
    left: 24.69px;
    top: 160px;
    border: 1px solid #E4E4E4;
  }

  .msgTxt {
    width: 913.03px;
    height: 62px;
    color: #4d4d4f;
    line-height: 62px;
    float: right;
    direction: rtl;
    font-size: 20px;
    position: absolute;
    bottom: 13.91px;
    right: 19px;
    text-align: right;
    text-indent: 15px;
    background: #FFFFFF;
    border: 1px solid #BCBCBC;
    box-shadow: 0px 0px 21px rgba(0, 0, 0, 0.06);
    border-radius: 10px;
  }

  .textarea:focus, input:focus {
    outline: none;
  }

  .sendMsg {
    position: absolute;
    width: 166.14px;
    height: 62px;
    left: 20.37px;
    bottom: 15.91px;
    border-radius: 10px;
  }

  .sendMsgBg {
    background: #BCBCBC;
    box-shadow: 0px 4px 22px rgba(188, 188, 188, 0.39);
  }

  .sendIcon {
    position: relative;
    float: right;
    right: 20.57px;
    top: 16.1px;
  }

  .sendTxt {
    position: relative;
    float: left;
    left: 34.7px;
    top: 11.86px;
    width: 53px;
    height: 38px;
    line-height: 38px;
    font-size: 24px;
    text-align: right;
    color: #FFFFFF;
  }

  .sendMsgBgHvr {
    background: linear-gradient(73.99deg, #9B51E0 -8.81%, #E91CB0 89.47%);
    border: 1px solid #BCBCBC;
    box-shadow: 0px 0px 21px rgba(187, 107, 217, 0.32);
  }

  .ratePopup {
    position: absolute;
    width: 1130px;
    height: 428px;
    left: 387px;
    top: 650px;
    background: #FFFFFF;
    box-shadow: 0px -1px 20px rgba(0, 0, 0, 0.25);
    border-radius: 30px 30px 0px 0px;
    z-index: 1;

  }

  .starParent {
    position: absolute;
    left: 115px;
    width: 900px;
    height: 200px;
    /*border: 1px solid red;*/
    top: 110px;
  }

  .starMsg {
    width: 100%;
    height: 100px;
    line-height: 100px;
    position: absolute;
    top: 275px;
    color: #494949;
    text-align: center;
    font-size: 30px;

  }

  .rates {
    float: left;
    width: 160px;
    height: 169px;
    margin-left: 15px;
    position: relative;
    /*border: 1px solid red;*/
  }

  .stars {
    position: absolute;
    left: 10px;
    width: 150px;
    height: 150px;
  }

  .starOff {

  }

  .starOn {
    display: none;
  }

  .showStarOn {
    display: block;
  }

  .msgHover {
    border: 3px solid #2D9CDB;
    box-shadow: 0px 0px 21px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  .successCmd {
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #5bac5d;
    position: absolute;
    top: 100px;
    font-size: 25px;
    text-align: center;
    z-index: 10;

  }

  /******************************************** animate **************************************/

  .hvr-circle {
    border: 4px solid #4B0D85;
    /*transition: 0.7s;*/
    /*transform: scale(1.1);*/
  }

  .hvr-bob {
    vertical-align: middle;
    -webkit-animation-name: hvr-bob-float, hvr-bob;
    animation-name: hvr-bob-float, hvr-bob;
    -webkit-animation-duration: .3s, 1.5s;
    animation-duration: .3s, 1.5s;
    -webkit-animation-timing-function: ease-out, ease-in-out;
    animation-timing-function: ease-out, ease-in-out;
    -webkit-animation-iteration-count: 1, infinite;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-direction: normal, alternate;
    animation-direction: normal, alternate;
  }

  @keyframes hvr-bob {
    0% {
      -webkit-transform: translateY(-15px);
      transform: translateY(-15px);
    }
    50% {
      -webkit-transform: translateY(-5px);
      transform: translateY(-5px);
    }
    100% {
      -webkit-transform: translateY(-15px);
      transform: translateY(-15px);
    }
  }

  .hvr-bob-low {

    /*display: inline-block;*/
    vertical-align: middle;
    /*-webkit-transform: perspective(1px) translateZ(0);*/
    /*transform: perspective(1px) translateZ(0);*/
    -webkit-animation-name: hvr-bob-low-float, hvr-bob-low;
    animation-name: hvr-bob-low-float, hvr-bob-low;
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

  @keyframes hvr-bob-low {
    0% {
      -webkit-transform: translateY(-10px);
      transform: translateY(-10px);
    }
    50% {
      -webkit-transform: translateY(-5px);
      transform: translateY(-5px);
    }
    100% {
      -webkit-transform: translateY(-10px);
      transform: translateY(-10px);
    }
  }


</style>
