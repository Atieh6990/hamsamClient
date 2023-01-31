<template>
  <div class="roomParent">
    <!--{{ this.getUser().userID + '*********' }}-->

    <div class="roomChild">


      <div v-for="(item , index) in roomData"
           class="listElm"
           :id="'room_' + index">


        <img v-if="getUser().userID == item['users'][0]['userId']"
             :src="imgURL + 'gameCenter/personal-game-room.png'" class="roomImg"/>

        <img v-else-if="selectedRoom == item.id & RS == 1" :src="imgURL + 'gameCenter/game-room-2.png'"
             class="roomImg">
        <img v-else-if="rejectedRoom == item.id && RS == 0" :src="imgURL + 'gameCenter/game-room.png'"
             class="roomImg">
        <img v-else :src="imgURL + 'gameCenter/game-room.png'" class="roomImg"/>


        <img class="personImg" :src="imgURL3 + item.pic" v-if="item.pic != null">
        <img class="personImg" :src="imgURL2 + 'ssn/images/userDefault.png'" v-else>
        <div class="roomTitle">{{ 'اتاق بازی شماره '+(index +1) }}</div>
        <img :src="imgURL + 'gameCenter/text-name.png'" class="personBox"/>
        <div class="gamename">حاضر جواب</div>


        <img v-if="selectedRoom == item.id & RS == 1" :src="imgURL + 'gameCenter/wating.png'"
             class="waitingBox">
        <img v-else-if="rejectedRoom == item.id  & RS == 0" :src="imgURL + 'gameCenter/play.png'"
             class="scorBox">
        <img v-else="" :src="imgURL + 'gameCenter/play.png'" class="scorBox">


        <div v-if="selectedRoom == item.id & RS == 1" class="waitingTitle">{{ 'در حال انتظار' }}</div>
        <div v-else-if="rejectedRoom == item.id & RS == 0 && resRejUserid == getUser().userID" class="score">{{
          'رد شد' }}
        </div>
        <div v-if="rejectedRoom == item.id" class="score">{{ 'رد شد' }}</div>
        <div v-else class="score">{{ item.score }}</div>

        <!--<div class="userCat">{{ item.adminName }}</div>-->
        <div class="userCat" v-if="item.adminName != null">{{ item.adminName|substr(15) + '//' +item.catName }}</div>
        <div class="userCat" v-else>{{ item.adminName + '//' +item.catName }}</div>
        <img :src="imgURL + 'gameCenter/hover.png'" class="backHover"
             v-if="(ypos == index) && (activeRoute == 1) && (active == page)">

      </div>

    </div>

  </div>
</template>

<script>
    import {ROAST_CONFIG} from '../../config';
    import {mapGetters} from 'vuex'
    import IScroll from "../../js/iscroll";
    import func from '../../mixins/func'

    export default {
        name: "room-list",
        props: ['roomData', 'active', 'page', 'activeRoute', 'selectedRoom', 'popupData', 'rejectedRoom', 'RS', 'resRejUserid'],
        mixins: [func],
        data() {
            return {
                imgURL: ROAST_CONFIG.url_comp_server,
                imgURL2: ROAST_CONFIG.URL_IMAGE,
                imgURL3: "http://ssn.tvapps.ir/alt2/ssn/images/avatar/",
                ypos: 0,
                tmpY: 0,

            }
        },
        created() {
            let self = this
            setTimeout(() => {
                self.scrollInit();
            }, 600);
            console.log('get user ->' + JSON.stringify(this.getUser()))
        },
        computed: {},
        watch: {
            roomData: function () {
                var self = this;
                setTimeout(function () {
                    if (self.myScroll) {
                        self.ypos = self.tmpY;
                        self.myScroll.refresh();
                        self.myScroll.scrollToElement('#room_' + self.tmpY, 1000, false, -180);
                    }
                }, 100);
            }
        },
        methods: {
            ...mapGetters([
                'getUser', 'getTvDetail'
            ]),

            scrollInit() {
                //  this.myScroll=''
                this.myScroll = new IScroll(".roomParent", {
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
            },

            down() {

                if (this.ypos < this.roomData.length - 1) {
                    this.ypos++;
                    this.tmpY = this.ypos
                    this.myScroll.scrollToElement('#room_' + this.ypos, 1000, false, -180);
                    return true
                }

            },
            up() {
                if (this.ypos > 0) {
                    this.ypos--;
                    this.tmpY = this.ypos
                    this.myScroll.scrollToElement('#room_' + this.ypos, 1000, false, -180);
                    return true
                }
                return false
            },
            enter() {
                return this.roomData[this.ypos]['id']
            },
            adminUserid() {
                return this.roomData[this.ypos]['users'][0]['userId']
            },
            emptyArr() {
                while (this.roomData.length > 0) {
                    this.roomData.pop();
                }
                ;
                this.ypos = 0
            }
        }
    }
</script>

<style scoped>

  .roomParent {
    position: absolute;
    width: 974px;
    left: 485px;
    top: 310px;
    height: 656px;
    /*border: 1px solid red;*/
    overflow: hidden;
  }

  .roomChild {
    position: absolute;
    width: 100%;
    left: 0px;
    top: 0px;
  }

  .listElm {
    position: relative;
    float: left;
    width: 100%;
    height: 115px;
    margin-top: 8px;
    margin-left: 0px;
    border: 3px solid transparent
  }

  .roomImg {
    position: absolute;
    top: 2px;
    left: 50px;
  }

  .personImg {
    position: absolute;
    top: 27px;
    right: 88px;
    width: 67px;
    height: 67px;
    border-radius: 50px;
    z-index: 10;
  }

  .roomTitle {
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

  .gamename {
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

  .personBox {
    position: absolute;
    top: 19px;
    right: 78px;
  }

  .waiting {
    position: absolute;
    top: 40px;
    left: 120px;
    z-index: 10;
  }

  .waitingBox {
    position: absolute;
    top: 40px;
    left: 120px;
    z-index: 10;
  }

  .waitingTitle {
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
  }

  .scorBox {
    position: absolute;
    top: 25px;
    left: 120px;
  }

  .score {
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

  .userCat {
    position: absolute;
    top: 60px;
    left: 313px;
    width: 351px;
    height: 40px;
    white-space: nowrap;
    color: #0d1c43;
    text-align: center;
    font-size: 18px;
    line-height: 40px;
    direction: rtl;
    overflow: hidden;
  }

  .backHover {
    position: absolute;
    top: 0px;
    left: 50px;
  }
</style>
