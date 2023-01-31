<template>
  <div id="FortySix" class=""
       style="min-height: 1080px;">
    <div v-show="isRoom" id="content-page-46" class="">

      <div id="title-box-46">
        <div id="count-46" class="animated"><span class="animated">{{numUsers}}  </span>نفر آنلاین</div>
        <img :src="urlDomain+'alt2/ssn/images/version/online.png'" class="lazy-loaded">
        <div id="userjonin-46" v-bind:class=" [Showkeyboard==1 ? 'keybord' : '']" class="animated slideInUp"
             v-html="userEnterPm"></div>
      </div>
      <div v-show="!hidechat" v-bind:class=" [Showkeyboard==1 ? 'keybord' : '']" id="warrper-46">

        <div class="msgCover" id="msg-box-46">
          <div class="msgHolder" id="msg-scroll-46"
               style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 1000ms; transform: translate(0px, 0px) translateZ(0px);">


            <div :id="'msg'+i" v-for="(pic , i) in pics">
              <div class="item-message">
                <div class="tvchat-module-picHolder">
                  <img class="tvchat-module-imageDefault" :src=pic>
                  <img class="tvchat-module-userOverLay" :src="urlDomain+'alt2//ssn/images/version/picOverlay.png'"
                       style="opacity: 1;"></div>
                <span class="username-tvchat">{{usernames[i]}}</span><span
                class="messageBody-tvchat" v-html="messages[i]"></span></div>
              <div style="clear: both;"></div>
            </div>


          </div>
          <div
            style="-webkit-mask-image: -webkit-gradient(linear, left bottom, left top, from(rgba(0,0,0,1)), to(rgba(0,0,0,0))); height: 10%; position: absolute; top: 0px; width: 100%;"></div>

          <!--<div class=" iScrollLoneScrollbar"-->
          <!--style="position: absolute; z-index: 9999; width: 7px; bottom: 2px; top: 2px; right: 1px; overflow: hidden;">-->
          <!--<div class="iScrollIndicator"-->
          <!--style="box-sizing: border-box; position: absolute; border: 1px solid rgba(255, 255, 255, 0.901961); border-radius: 3px; width: 100%; transition-duration: 1000ms; display: none; height: 631px; transform: translate(0px, -84px) translateZ(0px); transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); background: rgba(0, 0, 0, 0.498039);"></div>-->
          <!--</div>-->
        </div>

        <div id="input-box-46">
          <input v-model="message" data-role="none" type="text" id="input-msg-46"
                 placeholder="نظرت رو اینجا بنویس">
          <div id="enter-box-46"><img id="enter-img-46" :src="urlDomain+'alt2/ssn/images/version/send.png'"
                                      class="lazy-loaded"></div>
        </div>
      </div>
      <div v-show="hidechat && isShowSmall" id="warrperhide-46">
        <div id="msg-hidebox-46">
          <div id="msg-hidescroll-46">
            <div>
              <div class="item-message">
                <div class="tvchat-module-picHolder">
                  <img class="tvchat-module-imageDefault" :src=pics[usernames.length-1]>
                  <img class="tvchat-module-userOverLay"
                       :src="urlDomain+'alt2//ssn/images/version/picOverlay.png'"
                       style="opacity: 1;"></div>
                <span class="username-tvchat">{{usernames[usernames.length-1]}}</span><span
                class="messageBody-tvchat" v-html="messages[usernames.length-1]"></span></div>
              <div style="clear: both;"></div>
            </div>


          </div>
          <div
            style="-webkit-mask-image: -webkit-gradient(linear, left bottom, left top, from(rgba(0,0,0,1)), to(rgba(0,0,0,0))); height: 10%; position: absolute; top: 0px; width: 100%;"></div>

        </div>
      </div>

      <div v-show="!hidechat" id="arrowRight-46" class="arrow-46">
        <img style="width: 45px;margin-top: 5px;" :src="urlDomain+'alt2/ssn/images/version/ar.png'"
             alt="">
        <div style="float: right; margin-right: 10px; color: #000000;">مخفی کردن</div>
      </div>
      <div v-show="hidechat" id="arrowleft-46" class="arrow-46" style="">
        <img style="width: 45px;margin-top: 5px;" :src="urlDomain+'alt2/ssn/images/version/al.png'"
             alt="">
        <div style="float: right; margin-right: 10px; color: #000000;">نمایش</div>
      </div>

      <div class="video-skin">
        <div class="progress">
          <span id="progress-amount"></span>
        </div>
        <div class="time-info">
          <span id="current-time"></span> <span id="total-time"></span>
        </div>
      </div>

      <div class="titlebox">

      </div>

    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import md5 from '../js/md5'

  import io from 'socket.io-client';
  import IScroll from "../js/iscroll";
  import func from '../mixins/func';
  import {mapGetters} from 'vuex';
  import {ROAST_CONFIG} from "../config";
  import {page} from 'vue-analytics'
  import challenge from '../api/challenge'

  export default {
    name: "three",
    mixins: [func],
    data() {
      return {
        urlDomain: ROAST_CONFIG.url_Domain,
        urlImage: ROAST_CONFIG.URL_IMAGE,
        isShowSmall: false,
        Showkeyboard: 0,
        sockets: "",
        pics: [],
        usernames: [],
        messages: [],
        ypos: 0,
        myScroll: "",
        message: "",
        hidechat: false,
        userNemeEnter: "",
        numUsers: 0,
        isRoom: 0,
        userEnterPm: "",
        MyUsername: this.getUser().username,
        MyUserID: this.getUser().userID,
        MyPicture: this.getUser().picture,
        ids: [],
        idME: 0,
        intervall: "",
        time: 0,
      }
    }, created() {

      setTimeout(() => {
        this.scrollInit();
      }, 200);
    },
    activated() {
      this.time = 0;
      clearInterval(this.intervall)
      this.intervall = setInterval(() => {
        this.time = this.time + 1
        // console.log('timeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee ->' + this.time)

      }, 60000);
      $.ajax({
        url: "http://samyar.tvapps.ir/socket.io/index.html", success: function (result) {
          //   alert("succes ajax")
          //$("#div1").html(result);
        }
      });  //alert("bef socket")

      this.sockets = io('http://ssn.tvapps.ir:3000', {
        reconnection: false,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 99999,
        debug: true
      })

      this.$root.$emit('sideMenu_deactive');
      this.$root.$emit('sideMenu_hide');
      this.$root.$emit('leftside_hide');
      this.$root.$emit('header_hide');
      this.openTv(0, 0, 1920, 1080, 1)

    }, deactivated() {

      clearInterval(this.intervall)
      this.sendCallenge()
      this.$root.$emit('header_show');
      this.$root.$emit('sideMenu_show');
      this.$root.$emit('leftside_show');
      // this.hideTv();
    },
    methods: {
      ...mapGetters([
        'getUser',
        'getSsnUser',
        'getModelTv',
        'getTvDetail'
      ]),
      sendCallenge() {
        challenge.challengeApp(49, this.time).then(data => {

          if (data["success"] = true) {

            console.log("starttttttttttt app  -------->", data)


          } else {

          }
        });
      },
      resetParam() {
        //   this.sockets=""
        this.pics = []
        this.messages = []
        this.ypos = 0
        this.myScroll = ""
        this.message = ""
        this.isRoom = 0
        this.userEnterPm = ""
        this.Showkeyboard = 0


      },
      startSocket(channel) {

        /*,MyUsername:this.getUser().username,MyUserID:"this.getUser().userID",MyPicture:"http://ssn.tvapps.ir/alt2/"+this.getUser().picture*/
        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+this.MyUsername)

        this.resetParam()


        var timeCon = Date.now();


        // channel="IRIB TV3"

        var hash = md5(md5(timeCon) + md5(channel) + md5(this.MyUserID) + md5(this.MyUsername) + md5(this.MyPicture) + this.MyUserID);
        this.sockets.emit('check login', channel, this.MyUserID, this.MyUsername, this.MyPicture, hash, timeCon)
        // this.$root.$emit('sideMenu_show');

        this.chatRooms()

      },
      scrollInit() {
        if (typeof this.myScroll == "undefined" || this.myScroll == "") {
          this.myScroll = new IScroll("#msg-box-46", {
            scrollY: true,
            scrollbars: "custom ",
            momentum: true,
            preventDefault: false,
            scrollbars: true,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'none',
            fadeScrollbars: false,
            mouseMove: true
          });
          // this.myScroll.refresh();
          // this.myScroll.refresh();
        }
      },
      right() {
        this.hidechat = true
      },
      left() {
        this.hidechat = false
      },
      down() {
        if (this.myScroll) {
          this.myScroll.moveDown(40);
        }

        /* if(this.ypos+1<this.pics.length){
             this.ypos++;
             this.myScroll.moveDown(40);
             this.myScroll.refresh();
         }*/

      }, up() {
        /* if(this.ypos!=0){
             this.ypos--;
             this.myScroll.scrollToElement('#msg' + this.ypos, 50, false, true);
             this.myScroll.refresh();
         }*/
        if (this.myScroll) {
          this.myScroll.moveUp(40);
        }
      },
      chatRooms() {
        // alert("chatRooms")

        var _this = this
        this.sockets.on('login', (data) => {
          // this.msg = data.message;
          page({
            page: "start online chat main tv",
            title: "start online chat main tv"
          })
          _this.numUsers = data.numUsers
          _this.userEnterPm = "<b>" + _this.MyUsername + "</b>  خوش آمدید "

          // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", data)
        });
        this.sockets.on('get check room', function (data) {
          //  console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii", data)
          if (data["rsl"]) {
            _this.isRoom = 1
          }
        })
        this.sockets.on('history message', function (data) {
          //    alert("history")
          //console.log("oooooooooooooooooooooooooooooooooooooooooooooooooooooooooo", data)
        })
        this.sockets.on('new message', function (data) {
          _this.addChatMessage(data)
          // alert("new")
          //   console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", data)
        })
        this.sockets.on('user joined', function (data) {

          _this.userNemeEnter = data.username
          _this.numUsers = data.numUsers
          _this.userEnterPm = "<b>" + data.username + "</b>  به گروه پیوست "

          // alert(this.numUsers)

        })
        this.sockets.on('user left', function (data) {
          _this.numUsers = data.numUsers
          _this.userEnterPm = "<b>" + data.username + "</b> از گروه خارج شد "
          //  alert(this.numUsers)
        })
        this.sockets.on('typing', function (data) {

        })
        this.sockets.on('stop typing', function (data) {

        })
        this.sockets.on('disconnect', function (data) {
          _this.userEnterPm = "اتصال شما قطع شده است"
        })
        this.sockets.on('reconnect', function (data) {
          _this.userEnterPm = "ارتیاط شما مجدد برقرار شده است"
        })
        this.sockets.on('reconnect_error', function (data) {
          _this.userEnterPm = "مشکل در برقراری ارتباط"
        })
        this.sockets.on('remove pm from tv', function (id) {
          var idID = _this.ids.indexOf(id._id)
          _this.usernames.splice(idID, 1);
          _this.messages.splice(idID, 1);
          _this.ids.splice(idID, 1);
          _this.pics.splice(idID, 1);
          setTimeout(() => {

            _this.myScroll.refresh();
          }, 1);
        })
        this.sockets.on('room end', function (data) {
          _this.$router.push({path: '/one/' + new Date().getTime()});
        })

      }, addChatMessage(data) {
        if (data.pic && data.pic != this.urlImage + "alt2/null") {
          this.pics.push(data.pic)
          //  this.pics = data.pic;

        } else if (typeof data.pic == "undefined" || data.pic == this.urlImage + "alt2/null") {
          this.pics.push(this.urlImage + "/ssn/images/version/avatar2.png")

        } else {
          this.pics.push(this.urlImage + "/ssn/images/version/avatar2.png")


        }
        ;
        //   data.pic

        this.usernames.push(data.username)
        this.messages.push(data.message)
        // console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", data)
        // console.log("ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg", data._id)
        this.ids.push(data._id.trim())
        ;

        /*  alert(this.myScroll.scroller.offsetHeight)
          console.log("777777777777777777777777777777777777777777777777777777777777777",this.myScroll)*/
        //     this.scrollInit();
        setTimeout(() => {
          this.myScroll.refresh();
          this.myScroll.scrollTo(0, this.myScroll.maxScrollY, 0);
        }, 1);
        // this.moveScroll()
        if (!this.isShowSmall && this.hidechat) {
          this.isShowSmall = true
          var _this = this
          setTimeout(function () {
            _this.isShowSmall = false

          }, 5000);
        }

      }/*, moveScroll(pos) {


                //alert(tvChatScroll.maxScrollY + "----" + tvChatScroll.y)
                // alert(tvChatScroll.y)
                if (typeof pos == "undefined") {
                    if (this.myScroll) {

                        this.myScroll.scrollTo(0, this.myScroll.maxScrollY, 1000);
                    }
                } else {
//alert(tvChatScroll.y - tvChatScroll.maxScrollY)
                    if ((this.myScroll.y - this.myScroll.maxScrollY) < 130) {
                        if (this.myScroll) {
                            //   alert("ll")
                            this.myScroll.refresh();
                            this.myScroll.scrollTo(0, this.myScroll.maxScrollY, 1000);
                        }
                    }

                }

            }*/,

      hideTv() {

        try {
          tizen.tvwindow.hide(
            function (success) {

            },
            function (fail) {

            }
          );
        } catch (error) {

        }

      }, openTv(xpos, ypos, width, height, state) {

        if (window.screen.width != 1920) {
          xpos = Math.round((window.screen.width * xpos) / 1920)
          ypos = Math.round((window.screen.height * ypos) / 1080)
          width = Math.round((window.screen.width * width) / 1920)
          height = Math.round((window.screen.height * height) / 1080)
          // xpos, ypos, width, height
          // Math.round(x)


        }
        var _this = this
        // this.startSocket("IRIB TV3")
        this.zPos = "BEHIND";
        try {
          tizen.tvwindow.show(
            function (success) {
              var text = 'tizen.tvwindow.show BEHIND Success';
              if (state == 1) {

                var channel = tizen.tvchannel.getCurrentChannel();
                //  alert(channel)
                _this.startSocket(channel.channelName)
              }


            },
            function (fail) {
              var text = 'tizen.tvwindow.show BEHIND Error : ' + JSON.stringify(error);

            },
            [xpos + 'px', ypos + 'px', width + 'px', height + 'px'],
            'MAIN',
            _this.zPos
          );
        } catch (error) {

        }
      }, channelUp() {
        if (this.isRoom == 0) {
          page({
            page: "channel up main tv",
            title: "channel up main tv"
          })
          var _this = this

          //  alert("tv")
          // this.sockets.disconnect();
          var tuneCB = {
            onsuccess: function () {
              var channel = tizen.tvchannel.getCurrentChannel();
              _this.startSocket(channel)
            },
            onnosignal: function () {
              // console.log("tuneDown() is successfully done. But there is no signal.");
            }
          };

          try {
            // change the channel down according to 'ALL' navigation mode.
            tizen.tvchannel.tuneUp(tuneCB, null, "ALL");
          } catch (error) {
            //  console.log("Error name = " + error.name + ", Error message = " + error.message);
          }
        }
      }, channelDown() {
        if (this.isRoom == 0) {
          page({
            page: "channel down main tv",
            title: "channel down main tv"
          })
          var _this = this
          //   this.sockets.disconnect();
          var tuneCB = {
            onsuccess: function () {
              var channel = tizen.tvchannel.getCurrentChannel();
              _this.startSocket(channel)
            },
            onnosignal: function () {
              // console.log("tuneDown() is successfully done. But there is no signal.");
            }
          };

          try {
            // change the channel down according to 'ALL' navigation mode.
            tizen.tvchannel.tuneDown(tuneCB, null, "ALL");
          } catch (error) {
            //  console.log("Error name = " + error.name + ", Error message = " + error.message);
          }
        }
      }, back() {
        this.sockets.disconnect();
        this.$router.go(-1);
      }, enter() {

        /*       this.addChatMessage({
                   username: this.MyUsername,
                   message: this.message,
                   pic: this.getUser().picture
               });
               this.Showkeyboard=0
               this.sockets.emit('new message', this.message);
               this.sockets.emit('stop typing');
               this.message = ""*/
        if (this.isRoom == 1 && !this.hidechat) {
          this.Showkeyboard = 1
          this.openTv(0, 0, 1067, 600, 0);
          this.showIme('input-msg-46');
        }


      }, done() {
        page({
          page: "send pm main tv",
          title: "send pm main tv"
        })
        this.Showkeyboard = 0
        this.openTv(0, 0, 1920, 1080, 0);
        this.hideIme('input-msg-46');
        this.sockets.emit('new message', this.message);
        // this.sockets.emit('stop typing');
        // console.log("this.idME8888880=",this.idME)
        this.idME = this.idME - 1
        //   console.log("this.idME11111=",this.idME)
        this.addChatMessage({
          username: this.MyUsername,
          message: this.message,
          pic: this.getUser().picture,
          _id: "'" + this.idME + "'"
        });
        this.message = ""
        /* setTimeout(() => {
             this.myScroll.refresh();
             this.myScroll.scrollTo(0, this.myScroll.maxScrollY, 0);
         }, 1);*/
      }, cancel() {
        this.Showkeyboard = 0
        this.openTv(0, 0, 1920, 1080, 0);
        this.hideIme('input-msg-46');
      }
    }
  }
</script>

<style scoped>
  /******start tvchat*******/
  #FortySix {
    /*background: #2bcaff !important;*/
    background: transparent !important;
  }

  .homemodule-main-21 {
    z-index: 999999 !important;
  }

  #newHeader {
    z-index: 999 !important;
  }

  /********************ali***************/
  #warrper-46 {
    display: block;
    position: absolute;
    right: 55px;
    width: 800px;
    top: 479px;
    height: 551px;

  }

  #input-box-46 {
    position: absolute;
    border: 1px solid rgba(255, 255, 255, 0.56);
    border-radius: 10px;
    height: 75px;
    bottom: 0px;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 10%);

  }

  #input-msg-46 {
    width: 87%;
    float: right;
    height: 100%;
    background: transparent;
    border: none;
    text-align: right;
    margin-right: 10px;
    direction: rtl;
    color: #fff;
    font-size: 25px;

  }

  #enter-box-46 {
    background: rgba(238, 197, 239, 0.5);
    position: absolute;
    top: 0px;
    width: 90px;
    border-radius: 10px;
    text-align: center;
    line-height: 75px;
    height: 75px;
    left: 0px;
  }

  #enter-img-46 {
    margin-top: 13px;
  }

  .item-message {
    float: right;
    display: block;
    width: 80%;
    min-height: 80px;
    line-height: 40px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 20px;
    text-align: right;
    direction: rtl;
    margin-top: 15px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    position: relative;
  }

  .username-tvchat {
    float: right;
    margin-top: 15px;
    width: 80%;
    color: #fff;
    font-size: 25px;
  }

  .messageBody-tvchat {
    float: right;
    width: 80%;
    color: #fff;
    font-size: 20px;

  }

  #msg-box-46 {
    height: 86%;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 8%);
    mask-image: linear-gradient(to bottom, transparent 0%, black 8%);
    -webkit-mask-image: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 1)), color-stop(0.92, rgba(0, 0, 0, 1)), to(rgba(0, 0, 0, 0)));
    /* display: block;
     overflow: hidden;
     height: 77%;*/
  }

  .tvchat-module-picHolder {
    float: right;
    width: 76px;
    height: 76px;
    position: relative;
    margin: 16px;
  }

  .tvchat-module-imageDefault {
    opacity: 1;
    width: 90%;
    height: 90%;
    margin-top: 7%;
    margin-right: 7%;
    position: absolute;
    border-radius: 29px;
    top: 0px;
    right: 0px;
  }

  .tvchat-module-userOverLay {
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 18px;
    font-family: BYekan !important;
    text-align: right;
    top: 3px;
    float: right;
    right: 3px;
    direction: rtl;
    line-height: 39px;
    overflow: hidden;
    position: absolute;

  }

  input::-webkit-input-placeholder {
    color: #fff !important;
  }

  #title-box-46 {
    height: 65px;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 0px;
    left: 0px;
    line-height: 65px;
    color: #fff;
    overflow: hidden;
  }

  #count-46 {
    float: left;
    margin: 0px 20px;
    direction: rtl;
    font-size: 26px;
  }

  #title-box-46 img {
    margin-top: 5px;
    float: left;
  }

  #userjonin-46 {
    float: right;
    direction: rtl;
    font-size: 26px;
    margin-right: 55px;
  }

  .topPos0 {
    top: 0px !important;
  }

  #warrper-46.keybord {
    display: block;
    position: absolute;
    right: 0px;
    width: 850px;
    top: 0px;
    height: 600px;
    background: rgb(48, 91, 119);
  }

  #userjonin-46.keybord {
    margin-right: 900px;
  }

  body {
    background: transparent !important;
  }

  #warrperhide-46 {
    position: absolute;
    right: 55px;
    width: 800px;
    top: 875px;
    height: 200px;
    overflow: hidden;
  }

  .arrow-46 {
    position: absolute;
    bottom: 0px;
    left: 1834px;
  }

  .arrow-46 div {
    right: 36px;
    color: #1D1D1D;
    width: 226px;
    position: absolute;
    bottom: 14px;
    font-size: 22px;
    text-align: right;
  }

  .arrow-46 img {
    width: 45px;
    margin-top: 5px;
  }

  #total-time {
    opacity: 0
  }

  #msg-scroll-46 {
    margin-right: 18px;
  }

  /******End tvchat*******/
</style>
