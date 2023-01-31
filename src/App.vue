<template>
  <div :style="'background:'+background" id="app">

    <Chanse ref="Chanse"></Chanse>


    <rankHeader ref="rankHeader"></rankHeader>
    <sideMenu ref="sideMenu"></sideMenu>
    <onlineUser></onlineUser>
    <network v-show="networkFlag == true"></network>
    <loading v-show="loadingFlag == true"></loading>
    <sideLeft ref="sideLeft"></sideLeft>
    <score ref="score"></score>

    <transition name="fade">
      <keep-alive exclude="challengeContent">
        <router-view ref="routeview" :key="$route.fullPath"></router-view>
      </keep-alive>
    </transition>

    <popup ref="popup"></popup>
    <!--<transition name="fade">-->
    <div class="backOpacity" v-show="modalOn === true"></div>

    <modal style="z-index: 99" v-bind:class="modalOn === true ? 'modal-on' : 'modal-off'" ref="modal"></modal>
    <!--</transition>-->

  </div>
</template>


<script>


import sideMenu from './components/sideMenu'
import sideLeft from './components/sideLeft'
import onlineUser from './components/onlineUser'
import router from './router'
import Css from '../src/assets/css/style.css'
import Auth from './js/auth'
import func from './mixins/func'
import rankHeader from './components/rankHeader'
import network from './components/network'
import loading from './components/loading'
import score from './components/score'
import axios from "axios";
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'
import {ROAST_CONFIG} from './config'
import Popup from "./components/popup";
import Modal from "./components/modal";
import Chanse from './components/Chanse';

router.beforeEach((to, from, next) => {//afterEach
  //  console.log('before "' + from.name + '" to = "' + to.name + '"')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    next();
    router.options.routes[0].meta.requiresAuth = false;
  } else {
    next() // make sure to always call next()!
  }
  // console.log('change "' + from.name + '" to = "' + to.name + '"' )
});
export default {
  mixins: [func],
  created: function () {

    this.$on('ChangeView', section => {
      // console.log(section);
    });

    this.$root.$on("modal_on", () => {
      this.modalRender = true;
      this.modalOn = true;
    });

    this.$root.$on("modal_off", () => {
      this.modalOn = false;
      setTimeout(() => {
        this.modalRender = false;
      }, 2000)
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // console.log(this.currentPageName)
        if (this.currentPageName == 'Twoelve') {
          this.$refs.routeview.socketDisConnect()
        }
      } else {
        if (this.currentPageName == 'Twoelve') {
          this.$refs.routeview.socketConnect()
        }
      }
    });

    window.addEventListener("keydown", this.keyEvent);
    var _self = this
    setInterval(function () {
      if (window.navigator.onLine) {
        //console.log('onLine')
        _self.networkFlag = false
      } else {
        //console.log('offLine');
        _self.networkFlag = true
      }
    }, 3000);

    axios.interceptors.request.use((config) => {

      var str = config.url

      // console.log(str)

      var m = str.indexOf("apitwo.digitoon.ir");
      var n = str.indexOf("?act=chat&type=lastPM");

      if (m > -1) {
        config.headers.Authorization = `token ` + ROAST_CONFIG.digitoonToken;
      } else {
        config.headers.Authorization = `Bearer ` + this.access_token();
      }

      if (n > -1) {
        this.loadingFlag = false;
      } else {
        this.loadingFlag = true;
      }
      return config;

    }, error => {
      //  console.log("error request",error)
      //  console.log('this.loadingFlag request error 121==============>' + this.loadingFlag)

      this.loadingFlag = false;
      return Promise.reject(error)
    })


    axios.interceptors.response.use((response) => {

      //  console.log('this.loadingFlag response response==============>' + this.loadingFlag)
      this.loadingFlag = false;

      return response;
    }, error => {
      this.loadingFlag = false
      //   console.log("error response",error)
      //  console.log("error.response1",error.response)

      if (typeof error.response == "object") {
        if (error.response.status == 401) {


          this.FileSsystem(ROAST_CONFIG.TokenfileUrl, "Delete")
          this.disconnectSocket()
          // console.log("errrrrrrrrrrrrrrrrrrrgetstATEEEEEEEEEEEEEEEEEEEEEEEEEEEeeee", this.getStateSpalsh())
          if (this.getStateSpalsh() == 1) {
            //  console.log("this.hideSplashhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")

            this.hideSplash()

          }
          app1.$router.push({path: '/seven/' + new Date().getTime()});

          // return axios.request(error.config);
        }
      } else {
        // console.log("too errr resp undefind",error.config.headers)
        if ("tryNumber" in error.config.headers) {
          error.config.headers.tryNumber = error.config.headers.tryNumber + 1
        } else {
          error.config.headers.tryNumber = 0
        }
        //   console.log("error.headers.tryNumber",error.config.headers.tryNumber)
        if (error.config.headers.tryNumber < 5) {
          //   console.log("too errr headers<5",error.config)
          return Axios.request(error.config);
        }

      }
      //  console.log('this.loadingFlag response error==============>' + this.loadingFlag)


    })

    /*  this.$root.$emit('onSocket', this.getSocket())*/
  }, data() {
    return {
      networkFlag: false,
      loadingFlag: false,
      background: 'url("/dist/images/background.jpg") ',
      currentPageName: '',
      socket: "",
      modalOn: false,
      modalRender: false,
    }
  }, watch: {
    '$route'(to, from) {
      this.currentPageName = to.name;
      this.setCurrentPage(this.currentPageName);
      if (to.name == "Three") {

        this.background = "transparent"
      } else if (from.name == "Three") {

        this.background = 'url("/dist/images/background.jpg")'
      }


    }, coputedSocket: function (val, oldVal) {
      this.onSocket(this.getSocket())
    }
  },
  components: {
    sideMenu, onlineUser, Css, rankHeader, network, loading, sideLeft, Popup, score, Modal, Chanse
  }, methods: {
    ...mapMutations([
      'updateDetail',
      'updateUserName',
      'disconnectSocket',
      'hideSplash',
      'setCurrentPage',
      'updateNotifications',
      'setnotifications'
    ]),
    ...mapGetters([
      'getSocket', 'access_token', 'getStateSpalsh', 'getCurrentPage', 'getnotifications'
    ]), onSocket(socket) {
      //   alert("socket")

      socket.on("login", (data) => {
        //   alert("rrrrrrr"+this.currentPageName)

        //  console.log("loginnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnsoket", data)
        if (data["data"]) {
          if ("message" in data["data"]) {
            this.$refs.routeview.getProfile(data["data"])
          }
        }


      });
      socket.on("profilepic", (data) => {//{'title': , 'pic' :  , 'type': }
        //   console.log("profilepic-----------------------" + data.data.adrs)
        this.updateUserName({item: "picture", amount: data.data.adrs})
      });


      socket.on("dis", (data) => {
        //   console.log("dissssssssssssssssssssssssssssssssssssssss", data)
      });

      socket.on("enter_app", (data) => {
        //   console.log("enter_apppppppppppppppppppppppppppp", data)
      });

      socket.on("friends", (data) => {
        //     console.log("friendssssssssssssssssssssssssssssssssssssssss", data)
      });

      socket.on("notifications", (data) => {
        //  console.log("notificationsssssssssssssssssssssssssssssssssssssssssss", data)
        this.setnotifications(data["data"]);

      });


      socket.on("chat_message_send", (data) => {
        if (this.currentPageName == "Four") {
          this.$refs.routeview.lastPm(data["data"])
        }
        //    console.log("chat_message_senddddddddddddddddddddddddddddddddddddddddddd", data)
      });

      socket.on("messages", (data) => {
        //    console.log("messageseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", data)
        // alert(this.currentPageName)
        //    console.log("data[\"msg_new\"]" + data["msg_new"])
        //    console.log("this.getnotifications()[\"msg\"]" + this.getnotifications()["msg"])
        let beforeNotife = parseInt(this.getnotifications()["msg"])
        this.updateNotifications({msg: "msg", msgCount: data["msg_new"]})
        if (beforeNotife != parseInt(data["msg_new"]) && beforeNotife < parseInt(data["msg_new"])) {

          this.$root.$emit('notif_pos', 3);

          //    console.log("imppppppppppppppppppppppppp", this.getnotifications()["msg"])
        }

        // data.msg_new
        //
      });
      socket.on("friend_request", (data) => {
        //    console.log("friend_request-----------------------", data)
      });

      socket.on("friend_notif", (data) => {//inc and dec friendreq notification  {'friendreq_last':10 , 'friendreq_new':11 , 'friendreq_type':'inc'}  {'friendreq_last':11 , 'friendreq_new':10 , 'friendreq_type':'dec'}


        //   console.log("friend_notif-----------------------", data)
        let beforeNotife = parseInt(this.getnotifications()["friendreq"])
        this.updateNotifications({msg: "friendreq", msgCount: data["friendreq_new"]})
        if (beforeNotife != parseInt(data["friendreq_new"]) && beforeNotife < parseInt(data["friendreq_new"])) {

          this.$root.$emit('notif_pos', 1);
        }

      });
      socket.on("point", (data) => {
        //   console.log("point-----------------------", data)
        if (parseInt(data["point"]) != 0) {
          this.$refs.score.ShowScore(data["point"])
          this.updateDetail({item: "score", amount: data["point"]})
        }


        //documentWrite( " point = " + JSON.stringify( data ) );
      });
      socket.on("coin", (data) => {//{'coin':value}
        this.updateDetail({item: "coin", amount: data["coin"]})
        //    console.log("coin-----------------------", data)
      });
      socket.on("level", (data) => {//{'level':value}
        this.updateDetail({item: "level", amount: data["level"]})
        //   console.log("level-----------------------", data)
      });

      socket.on("badges", (data) => {//{'title': , 'pic' :  , 'type': }
        //    console.log("badges-----------------------", data)
      });
      socket.on("profilepic", (data) => {//{'title': , 'pic' :  , 'type': }
        //     console.log("profilepic-----------------------", data)
      });
    },
    keyEvent(event) {
      const keyCode = event.keyCode;
      // console.log("keyCode = " + keyCode);
      switch (keyCode) {

        case 38://Up
        case 29460://Up
          if (this.networkFlag == false && this.loadingFlag == false) {
            if (this.modalOn) {
              this.$refs.modal.up();
            } else if (this.$refs.sideMenu.active && this.$refs.sideMenu.show) {
              this.$refs.sideMenu.up();
            } else if (this.$refs.sideLeft.active && this.$refs.sideLeft.show) {
              this.$refs.sideLeft.up();
            } else if (this.$refs.popup.show) {
              this.$refs.popup.up();
            } else if (this.$refs.Chanse.show) {
              this.$refs.Chanse.up();
            } else {
              this.$refs.routeview.up();
            }
          }


          break;
        case 39://Right
        case 5://Right
          if (this.networkFlag == false && this.loadingFlag == false) {
            if (this.modalOn) {
              this.$refs.modal.right();
            } else if (this.$refs.sideMenu.active && this.$refs.sideMenu.show) {
              this.$refs.sideMenu.right();
            } else if (this.$refs.sideLeft.active && this.$refs.sideLeft.show) {
              if (this.$refs.routeview.activeRoute == 0) {
                this.$refs.sideLeft.right();
                this.$refs.routeview.activeRoute = 1;
              }

            } else if (this.$refs.popup.show) {
              this.$refs.popup.right();
            } else if (this.$refs.Chanse.show) {
              this.$refs.Chanse.right();
            } else {
              this.$refs.routeview.right();
            }
          }


          break;
        case 37://Left
        case 4://Left


          if (this.networkFlag == false && this.loadingFlag == false) {
            if (this.modalOn) {
              this.$refs.modal.left();
            } else if (this.$refs.sideMenu.active && this.$refs.sideMenu.show) {

              if (this.$refs.routeview.activeRoute == 0) {
                this.$refs.sideMenu.left();
                this.$refs.routeview.activeRoute = 1;
              }

            } else if (this.$refs.sideLeft.active && this.$refs.sideLeft.show) {
              this.$refs.sideLeft.left();
            } else if (this.$refs.popup.show) {
              this.$refs.popup.left();
            } else if (this.$refs.Chanse.show) {
              this.$refs.Chanse.left();
            } else {
              this.$refs.routeview.left();
            }

          }

          break;
        case 40://Down
        case 29461://Down
          if (this.networkFlag == false && this.loadingFlag == false) {
            if (this.modalOn) {
              this.$refs.modal.down();
            } else if (this.$refs.sideMenu.active && this.$refs.sideMenu.show) {
              this.$refs.sideMenu.down();
            } else if (this.$refs.sideLeft.active && this.$refs.sideLeft.show) {
              this.$refs.sideLeft.down();
            } else if (this.$refs.popup.show) {
              this.$refs.popup.down();
            } else if (this.$refs.Chanse.show) {
              this.$refs.Chanse.down();
            } else {
              this.$refs.routeview.down();
            }
          }


          break;
        case 13://Enter
        case 29443://Enter

          if (this.networkFlag == false && this.loadingFlag == false) {
            if (this.modalOn) {
              if (!this.$refs.modal.enter()) {
                this.$refs.routeview.back();
                this.modalOn = false;
              } else {
                this.$refs.routeview.enter();
              }
            } else if (this.$refs.sideMenu.active && this.$refs.sideMenu.show) {

              this.$refs.routeview.activeRoute = 1;
              this.$refs.sideMenu.enter();

            } else if (this.$refs.sideLeft.active && this.$refs.sideLeft.show) {
              this.$refs.sideLeft.enter();
              this.$refs.routeview.activeRoute = 1;
            } else if (this.$refs.popup.show) {
              this.$refs.popup.enter();
            } else if (this.$refs.Chanse.show) {
              this.$refs.Chanse.enter();
            } else {
              this.$refs.routeview.enter();
            }
          }


          break;
        case 10009://Return
        case 187:
          // if (this.$refs.sideMenu.active && this.$refs.sideMenu.show) {
          //     this.$refs.sideMenu.back();
          //     this.$refs.routeview.activeRoute = 1;
          // } else {
          //     this.$refs.routeview.back();
          // }

          this.loadingFlag = false
          if (this.$refs.sideMenu.active && this.$refs.sideMenu.show) {
            if (this.modalOn) {
              this.$refs.modal.back();
            } else if (this.$refs.routeview.activeRoute == 0) {
              this.$refs.sideMenu.back();
              this.$refs.routeview.activeRoute = 1;
            } else {
              this.$refs.routeview.back();
              // this.$refs.routeview.activeRoute = 0;
            }

          } else if (this.$refs.sideLeft.active && this.$refs.sideLeft.show) {
            if (this.$refs.routeview.activeRoute == 0) {
              this.$refs.sideLeft.back();
              this.$refs.routeview.activeRoute = 1;
            } else {
              this.$refs.routeview.back();
              // this.$refs.routeview.activeRoute = 0;
            }
          } else if (this.$refs.popup.show) {

            this.$refs.popup.back();
          } else if (this.$refs.Chanse.show) {
            this.$refs.Chanse.back();
          } else {
            this.$refs.routeview.back();
          }

          break
        /* case 187://Return
           //alert(this.$refs.sideMenu.active + ' ** ' + this.$refs.sideMenu.show + ' ** ' + this.$refs.routeview.activeRoute)
           if (this.modalOn) {
             this.$refs.routeview.back();
           } else if (this.$refs.sideMenu.active && this.$refs.sideMenu.show) {
             // else
             if (this.$refs.routeview.activeRoute == 0) {
               this.$refs.sideMenu.back();
               this.$refs.routeview.activeRoute = 1;
             } else {
               this.$refs.routeview.back();
               // this.$refs.routeview.activeRoute = 0;
             }

           } else if (this.$refs.sideLeft.active && this.$refs.sideLeft.show) {
             if (this.$refs.routeview.activeRoute == 0) {
               this.$refs.sideLeft.back();
               this.$refs.routeview.activeRoute = 1;
             } else {
               this.$refs.routeview.back();
               // this.$refs.routeview.activeRoute = 0;
             }
           } else if (this.$refs.popup.show) {
             this.$refs.popup.back();
           } else {
             this.$refs.routeview.back();
           }

           break;*/


        case 35:
          if (this.networkFlag == false && this.loadingFlag == false) {
            this.setParam('Islogout', '1');
            this.$router.push('/');
          }

          break;
        case 65376: //key done
          if (this.networkFlag == false && this.loadingFlag == false) {
            this.$refs.routeview.done();
          }

          break;
        case 65385: //key cancel
          if (this.networkFlag == false && this.loadingFlag == false) {
            this.$refs.routeview.cancel();
          }
          break;
        case 54:
          //   if (this.networkFlag == false && this.loadingFlag == false) {
          //    this.setParam('Islogout', '1');
          //   this.$router.push('/seven/'+new Date().getTime());
          //  }


          break;
        case 10182: // Exit

          tizen.application.getCurrentApplication().exit();

          break;
        case 427:
          // alert("app")
          this.$refs.routeview.channelUp();
          break;
        case 428:
          this.$refs.routeview.channelDown();
          break;
        case 48: //key 0
        case 49: //key 1
        case 50: //key 2
        case 51: //key 3
        case 52: //key 4
        case 53: //key 5
        case 54: //key 6
        case 55: //key 7
        case 56: //key 8
        case 57: //key 9
          this.$refs.routeview.showNumber(parseInt(keyCode) - 48)

          break;
        case 10190: //key PRE-CH

          this.$refs.routeview.showNumber(parseInt(keyCode) - 48);

          break;




        case 412: //PREVIOUS
          if (this.currentPageName == 'videoDetails')
            this.$refs.routeview.rew();
          break;
        case 417: //NEXT
          if (this.currentPageName == 'videoDetails')
            this.$refs.routeview.ff();
          break;
                  case 19: //PAUSE
          if (this.currentPageName == 'videoDetails')
            this.$refs.routeview.pause();
          break;
        case 415: //PLAY
          if (this.currentPageName == 'videoDetails')
            this.$refs.routeview.play();
          break;
        case 413: //STOP
          if (this.currentPageName == 'videoDetails')
            this.$refs.routeview.stop();
          break;
        case 10252:




        // case 8: //key Backspace
        //     this.$refs.routeview.showNumber(parseInt(keyCode) - 48);
        //     break;
      }

    }
  },
  computed: {

    coputedSocket() {
      return this.getSocket();
      // Or return basket.getters.fruitsCount

      // (depends on your design decisions).
    }

  }
};

</script>

<style>

.modal-on {
  position: absolute;
  top: 707px;
  transition: 2s;
}

.modal-off {
  position: absolute;
  top: 1100px;
  transition: 2s;
}

.backOpacity {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 1920px;
  height: 1080px;
  z-index: 3;
  background-color: rgba(246, 246, 246, 0.9);
}

/*.fade-enter-active, .fade-leave-active {*/
/*transition: opacity 1s;*/
/*}*/

/*.fade-enter, .fade-leave-to !* .fade-leave-active below version 2.1.8 *!*/
/*{*/
/*opacity: 0.9;*/
/*}*/

</style>
