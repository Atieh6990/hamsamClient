<template>
  <div class="page">

    <img :src="url_Img_page + 'gameCenter/bg.jpg'" class="gameCenterPage">
    <div class="title_P49">وارد اتاق شو رقبا رو شکست بده</div>

    <quide v-if="guideShow == true"></quide>

    <userInfo :childWid="childWid" :def="def"></userInfo>
    <btns :active="0" :page="ypos" :activeRoute="activeRoute" ref="btns"></btns>

    <roomList v-if="roomData.length !=0" :active="1" :page="ypos" :roomData="roomData"
              :activeRoute="activeRoute" ref="roomList"
              :selectedRoom="selectedRoom" :rejectedRoom="rejectedRoom" :RS="RS" :resRejUserid="resRejUserid"
              :popupData="popupData"
    ></roomList>

    <notif v-if="notifData != ''" :notifData="notifData"></notif>
    <popup v-if="popupData.length != 0" :popupData="popupData" :active="2" :page="ypos" :activeRoute="activeRoute"
           socket="socket"
           ref="popup"></popup>


    <!--<socketFuncs></socketFuncs>-->
  </div>
</template>

<script>
    import btns from '../components/gameCenter/btns'
    import userInfo from '../components/gameCenter/userInfo'
    import {mapGetters} from 'vuex'
    import md5 from '../js/md5'
    import {ROAST_CONFIG} from '../config';
    import roomList from '../components/gameCenter/roomList.vue'
    import quide from '../components/gameCenter/guide'
    import notif from '../components/gameCenter/notification'
    import popup from '../components/gameCenter/popup'
    import func from '../mixins/func'
    import io from 'socket.io-client';
    import {page} from 'vue-analytics'


    export default {
        name: "twoelve",
        mixins: [func],
        data() {
            return {
                ypos: 0,//0->dokme ha,1->roomlist, 2->popup

                limitScore: 0,
                childWid: 0,
                def: 0,
                url_Img_page: ROAST_CONFIG.url_comp_server,
                userImgURL: ROAST_CONFIG.url_comp_server,

                roomData: [],

                gameData: '',
                activeRoute: 1,
                guideShow: false,
                notifData: '',
                popupData: [],
                selectedRoom: '',
                rejectedRoom: '',
                resRejUserid: '',//user id ke az responce reject miad baraye inke khode admin barchasbe rad shod ro nabine
                RS: 0,//1-->selected room , 0-->rejected room,
                socket: ""
            }
        },
        activated() {
            //   console.log('activated')
        },
        deactivated() {
            //   console.log('deactivated')
        },
        created() {
            page({
                page: 'game center',
                title: 'game center'
            })

            //  console.log('created')
            this.$root.$on('clear_gameCenter_notif', () => {
                this.notifData = ''
            });
            this.$root.$on('resetFocuse_hidePOPup', () => {
                this.ypos = 1
            });

            this.socketConnect();

        },

        components: {
            btns, userInfo, roomList, quide, notif, popup
        },
        methods: {
            ...mapGetters([
                'getUser', 'getTvDetail'
            ]),
            ONS() {
                let _self = this

                this.socket.on("list limit score", function (data) {
                    _self.onListLimitScore(data)
                });
                this.socket.on("list rooms", function (data) {//room list responce

                    let sendData = data['result']['rooms'];
                    console.log('room list ->' + JSON.stringify(sendData))
                    if (sendData.length > 0) {
                        _self.roomData = _self.reversing(sendData);
                    }


                });
                this.socket.on("list games", function (data) {//list game ha
                    _self.showGames(data)
                });
                this.socket.on("disconnect user in room", function (data) {// DC shodane ye user
                    if (data.result.activeroom)
                        _self.roomData = data.result.activeroom.rooms;
                    _self.notifData = {'name': data.result.username}
                    if (_self.roomData.length == 0) {
                        _self.ypos = 0
                    }
                });
                this.socket.on("join in room", function (data) {//sts=0 waiting , sts=1 accept in admin ,sts=-1 error
                    _self.ypos = 2;
                    _self.popoupshow(data);
                });
                this.socket.on("admin get request join in user", function (data) {
                    _self.ypos = 2;
                    _self.popupjoinReq(data)
                });
                this.socket.on("get user responce from admin", function (data) {//sts=0 waiting , sts=1 accept in admin ,sts=-1 error
                    _self.rejectedRoom = data.result.roomId;
                    _self.resRejUserid = data.result.userId;
                    _self.RS = 0;
                });
                this.socket.on("go to play game", function (data) {
                    _self.ypos = 2;
                    _self.joinResPopup(data)
                });
                this.socket.on("jump to app", function (data) {
                    _self.ypos = 2;
                    _self.joinResPopup(data);
                    _self.jumpToAPP();
                });
            },
            socketConnect() {
                //    console.log('connect shod');
                let _self = this
                this.socket = io('http://ssn.tvapps.ir:3009/', {
                        reconnection: true,
                        reconnectionDelay: 1000,
                        reconnectionDelayMax: 5000,
                        reconnectionAttempts: 99999,
                        debug: true
                    }
                );
                this.socket.on('connect', function () {
                    _self.socketLogin();
                });

            },
            socketDisConnect() {
                //   console.log('dis connect shod');
                this.$refs.popup.emptyArr();
                this.$refs.roomList.emptyArr();
                this.ypos = 0;
                this.socket.close();

                this.socket.on('disconnect', function () {
                    //   console.log("disconnect: ");
                });
                this.socket = ''
            },
            socketLogin() {
                this.ypos = 0;
                let userId = this.getUser().userID;
                let macId = this.getTvDetail().macID;
                let timeConnect = Date.now();

                let hashKey = md5(md5(timeConnect) + md5(userId) + md5(macId) + userId);
                let _self = this

                this.socket.emit('check login', userId, macId, hashKey, timeConnect); //login
                this.socket.on("login", function (data) {
                    _self.login(data);
                });
            },
            reversing(arr) {
                let rev = this.reversArray(arr);
                return rev
            },
            right() {
                if (this.ypos == 0) {
                    if (!this.$refs.btns.right()) {
                    }
                }
            },
            left() {
                if (this.ypos == 0) {
                    if (!this.$refs.btns.left()) {
                    }
                }
            },
            down() {
                if (this.ypos == 0) {//creat
                    if (this.roomData != 0)
                        this.ypos = 1
                } else if (this.ypos == 1) {//list
                    if (!this.$refs.roomList.down()) {
                    }
                } else if (this.ypos == 2) {
                    this.$refs.popup.down()
                }
            },
            up() {
                if (this.ypos == 1) {
                    if (!this.$refs.roomList.up()) {
                        this.ypos = 0
                    }
                } else if (this.ypos == 2) {
                    this.$refs.popup.up()
                }
            },
            enter() {

                if (this.ypos == 0) {//create

                    if (this.$refs.btns.enter() == 0) {
                        this.socket.emit('get list games', this.getTvDetail().year);
                    } else if (this.$refs.btns.enter() == 1) {
                        this.guideShow = true
                    }
                } else if (this.ypos == 1) {//room list
                    let roomId = this.$refs.roomList.enter();
                    this.socket.emit('user request join in room', "" + roomId + "");//join request
                } else if (this.ypos == 2) {//popup

                    let joinRes = this.$refs.popup.enter();
                    this.socket.emit('respance admin to user joined in room', '' + joinRes.sts + '', '' + joinRes.reqId, joinRes.room); //sts=1 accept , sts =2 reject, requestId = request msg id
                }
            },
            back() {
                if (this.guideShow == true) {
                    this.guideShow = false
                } else {
                    this.$router.go(-1);
                    this.$root.$emit('sideMenu_show');
                    this.$root.$emit('header_show');
                    this.$root.$emit('leftside_show');
                }
            },
            login(obj) {
                //   console.log(' too log in' + obj.result)
                this.ONS()
                if (obj.result == true) {
                    this.socket.emit('get list limit score');
                }
            },
            onListLimitScore(data) {
                //   console.log('onListLimitScore ----- >' + JSON.stringify(data))
                this.limitScore = data["result"];
                this.socket.emit('get list rooms'); //get list rooms
                this.calcMaxScoreInDay();
            },
            calcMaxScoreInDay() {

                this.childWid = (1 - (this.limitScore / 2000)) * 100;
                this.def = 2000 - this.limitScore;
                //  console.log('def ----- >' + this.def + 'this.limitScore ->' + this.limitScore + 'this.childWid ->' + this.childWid)
            },
            showGames(data) {
                let time = new Date().getTime();
                this.$router.push({
                    path: '/twoentyOne/' + time,
                    query: {'def': this.def, 'childWid': this.childWid, 'gameData': data, 'socket': this.socket}
                });
            },
            popoupshow(data) {

                let res = {
                    'sts': data.result.sts,
                    'msg': data.result.msg,
                    'state': data.result.state,
                    'img': this.getUser().picture,
                    'adminId': this.$refs.roomList.adminUserid(),
                    'btn': 0,
                    'req': '',
                    'roomId': ''
                };
                if (res.sts == 'ok' && res.state == 0) {
                    this.selectedRoom = this.$refs.roomList.enter();
                    this.RS = 1;
                }
                this.popupData.push(res);
            },
            popupjoinReq(data) {

                //  console.log('data dar popupjoinReq ---------------------------------->' + JSON.stringify(data))

                let pic = data.result.pic
                if (data.result.pic == null) {
                    pic = 'ssn/images/userDefault.png'
                }
                let res = {
                    'sts': data.result.sts,
                    'msg': 'درخواست بازی از' + data.result.userName + 'را قبول میکنید؟؟؟',
                    'state': data.result.state,
                    // 'img': this.userImgURL + pic,
                    'img': 'http://ssn.tvapps.ir/alt2/ssn/images/avatar/' + pic,
                    'adminId': this.getUser().userID,
                    'btn': 1,
                    'req': data.result.requestId,
                    'roomId': data.result.roomId
                };
                this.popupData.push(res);
                //  console.log(this.popupData)
            },
            joinResPopup(data) {
                let res = {
                    'sts': data.result.sts,
                    'msg': data.result.msg,
                    'state': '',
                    'img': '',
                    'adminId': '',
                    'btn': 0,
                    'req': '',
                    'roomId': ''
                };
                this.popupData.push(res);
            },
            jumpToAPP() {

                page({
                    page: 'jump to quizup',
                    title: 'jump to quizup'
                })


                var pkg = 'Zbdz7KpraZ.QuizUp';

                // var pkg = 'c4ScAum1sN.empty';
                tizen.application.launch(
                    pkg,
                    function () {
                        //   console.log('raft toooooo')
                        //text = 'Jump TizenWebApplication Success';
                        // socketGC.successJump();
                    }, function (error) {
                        //  console.log('naraft toooooo')
                        //text = 'Jump TizenWebApplication Error : ' + JSON.stringify(error);
                        // var popCnt = $('#popup_P49_' + user.userID).attr('popreqcnt');
                        // pageFourtyNine.hidePopup(popCnt);
                    });
            },

        },
        mounted() {
            //    console.log('mounted')
            this.$root.$emit('sideMenu_hide');
            this.$root.$emit('header_hide');
            this.$root.$emit('leftside_hide');
        }

    }
</script>

<style scoped>
  .page {
    position: absolute;
    width: 1920px;
    height: 1080px;
    top: 0px;
    left: 0px;
  }

  /********************** End FiftyFive****************/
  .profilePic_P49 {
    position: absolute;
    top: 50px;
    width: 90px;
    height: 90px;
    left: 1774px;
    z-index: 10;
    border-radius: 50px;
  }

  .nameBackPic_P49 {
    position: absolute;
    top: 45px;
    left: 1430px;
    z-index: 10;
  }

  .namePlace_P49 {
    position: absolute;
    top: 63px;
    left: 1455px;
    width: 230px;
    height: 48px;
    font-size: 20px;
    color: #000;
    text-align: center;
    direction: rtl;
    line-height: 40px;
    z-index: 11;
    overflow: hidden;
  }

  .emtiazBar_P49 {
    position: absolute;
    top: 130px;
    left: 1440px;
    z-index: 15;
  }

  .emtiazBoxParent_P49 {
    position: absolute;
    top: 137px;
    left: 1450px;
    width: 245px;
    height: 28px;
    border-radius: 20px;
    z-index: 10;
    overflow: hidden;
  }

  .emtiazBoxChild_P49 {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    background: linear-gradient(to right, #fe7608, #fed849);
  }

  .title_P49 {
    position: absolute;
    width: 500px;
    height: 50px;
    top: 140px;
    left: 705px;
    font-size: 30px;
    direction: rtl;
    text-align: center;
    /* line-height: 50px; */
    z-index: 10;
    white-space: nowrap;
    /*color: #fff;*/
    color: #21221;
    /*text-shadow: -4px 1px 5px #1d2029 !important*/
  }

  .listParent_P49 {
    position: absolute;
    width: 974px;
    left: 485px;
    top: 310px;
    height: 690px;

    overflow: hidden;
  }

  .listChild_P49 {
    position: absolute;
    width: 100%;
    top: 0px;
    left: 0px;
  }

  .creatRoom_P49 {
    position: absolute;
    top: 200px;
    left: 590px;
    border: 3px solid transparent;
  }

  .creatRoomHoverShow_P49 {
    display: none
  }

  .creatRoomHover_P49 {
    display: block !important;
  }

  .creatRoom_P49 .creatRoomHover_P49 {
    display: block !important;
  }

  .listElm_P49 {
    position: relative;
    float: left;
    width: 100%;
    height: 115px;
    margin-top: 8px;
    margin-left: 0px;
    border: 3px solid transparent
  }

  .backImg_P49 {
    position: absolute;
    top: 2px;
    left: 50px;
  }

  .backOver_P49 {
    position: absolute;
    top: 0px;
    left: 50px;
    display: none;
  }

  .selecterRomm {
  }

  .selecterRomm .backOver_P49 {
    display: block;
  }

  .selecterRomm .waitingBox_P49 {
    display: block
  }

  .selecterRomm .waitingTitle_P49 {
    display: block
  }

  .selecterRomm .scorBox_P49 {
    display: none;
  }

  .selecterRomm .score_P49 {
    display: none;
  }

  .selecterRomm .roomTitle_P49 {
    color: #fff
  }

  .roomTitle_P49 {
    position: absolute;
    top: 14px;
    left: 400px;
    width: 155px;
    height: 40px;
    text-align: center;
    direction: rtl;
    white-space: nowrap;
    color: #ba9827;
    font-size: 15px;
    line-height: 40px;
  }

  .personBox_P49 {
    position: absolute;
    top: 19px;
    right: 78px;
  }

  .gameName_P49 {
    position: absolute;
    top: 45px;
    right: 165px;
    width: 125px;
    height: 40px;
    direction: rtl;
    white-space: nowrap;
    color: #fff;
    text-align: center;
    font-size: 15px;
    line-height: 40px;
  }

  .personImg_P49 {
    position: absolute;
    top: 27px;
    right: 88px;
    width: 67px;
    height: 67px;
    border-radius: 50px;
  }

  .personName_P49 {
    position: absolute;
    top: 60px;
    left: 370px;
    width: 235px;
    height: 40px;
    white-space: nowrap;
    color: #0d1c43;
    text-align: center;
    font-size: 18px;
    line-height: 40px;
    direction: rtl;
  }

  .scorBox_P49 {
    position: absolute;
    top: 25px;
    left: 120px;
  }

  .score_P49 {
    position: absolute;
    top: 45px;
    left: 220px;
    width: 80px;
    height: 35px;
    font-size: 18px;
    color: #fff;
    direction: rtl;
    text-align: center;
    line-height: 40px;
    white-space: nowrap
  }

  .hoverRoomList {

  }

  .hoverRoomList .backHovering_P49 {
    display: block;
  }

  .backHovering_P49 {
    position: absolute;
    top: 0px;
    left: 50px;
    display: none;
  }

  .waitingBox_P49 {
    position: absolute;
    top: 40px;
    left: 120px;
    z-index: 10;
    display: none;
  }

  .waitingTitle_P49 {
    position: absolute;
    top: 49px;
    width: 150px;
    height: 30px;
    left: 144px;
    font-size: 18px;
    text-align: center;
    color: #fff;
    direction: rtl;
    white-space: nowrap;
    z-index: 11;
    line-height: 28px;
    display: none;

  }

  .OutNews {
    display: none;
  }

  .InNews {
    display: block;
  }

  .blur_P49 {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 1920px;
    height: 1080px;
    opacity: 0.5;
    background-color: #000 !important;
    display: none
  }

  .popupBox_P49 {
    opacity: 1 !important;
    position: absolute;
    width: 600px;
    height: 600px;
    top: 220px;
    left: 630px;
  }

  .popupBoxBack_P49 {
    position: absolute;
    top: 0px;
    left: 0px;
  }

  .popupTxt_P49 {
    position: absolute;
    width: 550px;
    min-height: 60px;
    height: auto;
    top: 180px;
    left: 54px;
    text-align: center;
    white-space: nowrap;
    font-size: 20px;
    line-height: 40px;
    direction: rtl;
    color: #000;
  }

  .blurBox_P49 {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 1920px;
    height: 1080px;
    display: none;
    z-index: 20;
  }

  .userImgPopup_P49 {
    position: absolute;
    top: 200px;
    left: 500px;
    width: 67px;
    height: 67px;
  }

  .popupBtn_P49 {
    position: absolute;
    width: 500px;
    height: 185px;
    top: 240px;
    left: 80px;

  }

  .acceptBtn_P49 {
    position: absolute;
    top: 10px;
    left: 100px;
    border: 3px solid transparent;
  }

  .popupBtnTxt_P49 {
    left: 123px;
    direction: rtl;
    font-size: 24px;
    text-align: center;
    color: #000;
    line-height: 52px;
    white-space: nowrap;
    text-shadow: -4px 1px 5px #1d2029 !important;
    position: absolute;
    width: 180px;
    height: 52px;
  }

  .acceptTxt_P49 {
    top: 21px;
  }

  .ignoreBtn_P49 {
    position: absolute;
    top: 110px;
    left: 100px;
    border: 3px solid transparent;
  }

  .ignoreTxt_P49 {
    top: 123px;
  }

  .overPopupBtn_P49 {
    display: block !important;
    /*box-shadow: -1px -1px 28px 8px rgba(29,39,67,1);-*/
  }

  .gameCenterPage {
    position: absolute;
    top: 0px;
    left: 0px;

  }

  .InfoInGameCenterBox {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%
  }

  .el5_img_P49 {
    position: absolute;
    top: 20px;
    left: 270px;
    z-index: 10;
    width: 118px;
    height: 116px;
    border-radius: 50px;
  }

  .notif_P49 {
    position: absolute;
    width: 1370px;
    right: 222px;
    top: 1020px;

    direction: rtl;
    text-align: right;
    font-size: 25px;
    color: #fff;

  }

  .Limitscor_P49 {
    position: absolute;
    width: 300px;
    height: 30px;
    top: 170px;
    right: 227px;
    text-align: right;
    direction: rtl;
    font-size: 22px;
    color: #fff;
    z-index: 10
    /* border: 1px solid red; */
  }

  .rahnama_P49 {
    position: absolute;
    top: 200px;
    left: 990px;
    border: 3px solid transparent;
  }

  .rahnamaHoverShow_P49 {
    display: none
  }

  .rahnamaHover_P49 {
    display: block !important;
  }

  .rahnama_P49 .rahnamaHover_P49 {
    display: block !important;
  }

  .rahnamaBack_P49 {
    position: absolute;
    top: 185px;
    left: 430px;
    z-index: 100;
    display: none;
  }

  .rahnamaParent_P49 {
    position: absolute;
    top: 370px;
    left: 480px;
    width: 895px;
    height: 485px;

    z-index: 101;
    display: none;
  }

  .rahnamaChild_P49 {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    font-size: 20px;
    line-height: 40px;
    direction: rtl;
    color: #000;

  }

</style>
