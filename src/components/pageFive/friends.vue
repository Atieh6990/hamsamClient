<template>
  <div v-if="show == 1" class="friendParent">
    <div class="friendChild">
      <div
        v-if="(friends) && (friends.length > 0) && (parseInt((index)/columnCount))+2>(parseInt((number)/columnCount))"
        v-for="(Friend, index) in friends" class="friendItem"
        :class="(number == index && active == page  && activeRoute == 1) || (number == index && ypos == 3 && activeRoute == 1) ? 'friendOver' :''">
        <div class="friendBack"></div>
        <div class="userInfo"
             :class="[(ypos == 2) && (number == index) && (activeRoute == 1)  && (active == page)? 'hoverUserInfo': '']">
          <div class="friendImgBox">
            <img v-if="Friend.pic != null" class="friendIcon" :src="Friend.pic"/>
            <img v-else class="friendIcon" :src="URL + 'header/userdefaul.png'"/>
          </div>
          <div v-if="Friend.username != null" class="frienfName">{{Friend.username|substr(10)}}</div>

          <!--<div class="line L_1"></div>-->
          <!--<div class="commonFriend"><b>دوستان مشترک</b></div>-->
          <!--<div class="line L_2"></div>-->
          <!--<div class="commons">به زودی ...</div>-->
          <!--<img class="group" src="../../assets/images/five/Group_5.png">-->
          <!--<div class="cnt">{{Friend.score}}</div>-->
          <div class="scoreParent" style="top: 165px;">
            <div class="score">
              <div class="txt">سطح دوره</div>
              <div class="numScore">{{Friend.level}}</div>
            </div>
            <img :src="URL + 'friends/emtiaz.png'" class="iconScore">
          </div>
        </div>
        <div class="line L_2"></div>
        <div class="scoreParent" style="bottom: 0px">
          <div class="buttons" style="float: right;">
            <div v-if="status == 1" class="txtButtons" style="right: 10px;"
                 :class="[(number == index  && ypos == 3 &&  xpos == 1 && activeRoute == 1) ? 'hoverMsg' : '']">
              ارسال
              پیام
              <img class="message" :src="URL + 'friends/payam.png'">
              <img v-if="(number == index  && ypos == 3 && xpos == 1 && activeRoute == 1)"
                   class="messageHover"
                   :src="URL + 'friends/payam-hover.png'">
            </div>
            <div v-else-if="status == 0" class="txtButtons" style="right: 10px;"
                 :class="[(number == index  && ypos == 3 &&  xpos == 1 && activeRoute == 1) ? 'hoverAccept' : '']">
              قبول
              <img class="message" :src="URL + 'friends/accept.png'">
              <img v-if="(number == index  && ypos == 3 && xpos == 1 && activeRoute == 1)"
                   class="messageHover"
                   :src="URL + 'friends/accept-hover.png'">
            </div>
          </div>
          <div class="buttons" style="float: left;">
            <div v-if="status == 1" class="txtButtons" style="left: 3px;"
                 :class="[(number == index   && ypos == 3 && xpos == 2 && activeRoute == 1) ? 'hoverReject' : '']">
              لغو
              دوستی
              <img class="message" :src="URL + 'friends/laghv-dosty.png'">
              <img v-if="(number == index   && ypos == 3 && xpos == 2 && activeRoute == 1)"
                   class="messageHover"
                   :src="URL + 'friends/laghv-dosty-hover.png'">
            </div>
            <div v-else-if="status == 0" class="txtButtons" style="left: 3px;"
                 :class="[(number == index   && ypos == 3 && xpos == 2 && activeRoute == 1) ? 'hoverReject' : '']">
              رد
              <img class="message" :src="URL + 'friends/laghv-dosty.png'">
              <img v-if="(number == index   && ypos == 3 && xpos == 2 && activeRoute == 1)"
                   class="messageHover"
                   :src="URL + 'friends/laghv-dosty-hover.png'">
            </div>
          </div>
        </div>
      </div>
      <!--<div v-else-if="(friends) && (friends.length == 0)" class="msg">شما دوستی ندارید.</div>-->
    </div>
  </div>


</template>

<script>
    import {ROAST_CONFIG} from '../../config';
    import func from '../../mixins/func';


    export default {
        name: "friends",
        props: ['friends', 'activeRoute', 'status', 'show', 'active', 'page', 'type'],
        mixins: [func],
        data() {
            return {
                number: 0,
                columnCount: 4,
                xpos: 1,
                ypos: 2,
                URL: ROAST_CONFIG.url_Img_comp,


            }
        },
        created() {
            this.$root.$on('friend', () => {
                this.ypos = 2;
                this.number = 0;

            });
        },
        components: {},
        methods: {
            left() {
                if (this.ypos == 2) {
                    if ((this.number % this.columnCount != parseInt(this.columnCount) - 1) && (this.number + 1 < this.friends.length)) {
                        this.number++;
                        return true
                    }

                } else if (this.ypos == 3) {
                    if (this.xpos == 1) {
                        this.xpos = 2;
                        return true
                    } else {
                        if ((this.number % this.columnCount != parseInt(this.columnCount) - 1) && (this.number + 1 < this.friends.length)) {
                            this.number++;
                            this.ypos = 2;
                            return true
                        }
                    }

                }
                return false

            },
            right() {

                if (this.ypos == 2) {
                    // if (this.xpos == 1) {
                    if (this.number % this.columnCount != 0) {
                        this.number--;
                        // this.xpos = 1;
                        return true
                    }

                    // }

                } else if (this.ypos == 3) {
                    if (this.xpos == 2) {
                        this.xpos = 1;
                        return true
                    } else if (this.xpos == 1) {
                        if (this.number % this.columnCount != 0) {
                            this.number--;
                            this.ypos = 2;
                            return true
                        }

                    }

                }
                return false

            },
            down() {
                if (this.ypos == 2) {

                    this.ypos = 3;
                    this.xpos = 1;

                    return true
                } else if (this.ypos == 3) {
                    if ((this.number + parseInt(this.columnCount)) < (this.friends.length)) {
                        this.number += parseInt(this.columnCount);
                        this.ypos = 2;
                        if (parseInt(this.friends.length / this.columnCount) - 2) {
                            return {
                                'num': (this.number / this.columnCount) + 1,
                                'length': this.friends.length / this.columnCount,
                            }


                        }

                        // return true
                    }
                    // if ((parseInt((this.number / this.columnCount) + 1) >= parseInt(this.friends.length / this.columnCount))) {
                    //     return {
                    //         'num': (this.number / this.columnCount) + 1,
                    //         'length': this.friends.length / this.columnCount,
                    //     }
                    //
                    //
                    // }


                }


                return false

            },
            up() {
                if (this.ypos == 2) {

                    if ((this.number) >= this.columnCount) {
                        this.number -= parseInt(this.columnCount);

                        this.ypos = 3;
                        this.xpos = 1;
                        return true
                    } else {
                        // this.ypos = 1;
                        // return true;
                    }

                } else if (this.ypos == 3) {

                    this.ypos = 2;
                    return true;
                }
                return false;

            },
            enter() {

                if ((this.friends) && (this.friends.length != 0)) {
                    return {
                        'ypos': this.ypos,
                        'xpos': this.xpos,
                        'friendID': this.friends[this.number]['id'],
                        'level': this.friends[this.number]['level'],
                        'pic': this.friends[this.number]['pic'],
                        'username': this.friends[this.number]['username'],
                        'number': this.number
                    };
                } else {
                    return {'ypos': this.ypos, 'xpos': this.xpos, 'friendID': ''};
                }


            },
            // moreFriend() {
            //     // alert(this.nextPage + ' ' + this.token + ' ' + this.type)
            //     api.friends(this.nextPage, this.token, this.type).then(data => {
            //
            //         this.total_friendC = data['meta']['total'];
            //         this.nextPage = data['links']['next'];
            //
            //         if (this.nextPage != null) {
            //
            //             this.friends = this.friends.concat(data['data']);
            //         }
            //
            //
            //     });
            // }


        }
    }
</script>

<style scoped>
  .numScore {
    top: 0px;
    width: 125px;
    text-align: center;
    height: 45px;
    font-size: 22px;
    color: #fba835;
    position: relative;
    float: left;
    left: 15px;
    line-height: 48px;
  }

  .friendParent {
    position: absolute;
    width: 1170px;
    top: 148.91px;
    right: 80px;
    height: 927.09px;

  }

  .friendChild {
    position: absolute;
    width: 100%;
    top: 0px;
    left: 0px;
  }

  .msg {
    width: 100%;
    height: 100px;
    line-height: 100px;
    font-size: 25px;
    color: #636467;
    position: absolute;
    top: 450px;
    direction: rtl;
    border: 1px solid red;
  }

  .friendItem {
    position: relative;
    float: right;
    width: 261px;
    height: 328px;
    margin-top: 24px;
    margin-right: 25px;
    border-radius: 5px;

  }

  .friendBack {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    opacity: 0.3;
    border-bottom-width: 1px;
    border-bottom-color: rgb(215, 215, 215);
    border-bottom-style: solid;
    box-sizing: border-box;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 1);
    border-radius: 5px;
  }

  .userInfo {
    width: 240px;
    height: 240px;
    position: absolute;
    top: 10px;
    left: 10px;
    border-radius: 5px;

  }

  .hoverUserInfo {
    border: 1px solid #1955a6;
  }

  .friendImgBox {
    position: absolute;
    width: 100%;
    height: 91.46px;
    top: 14.52px;
  }

  .friendIcon {
    width: 91.46px;
    height: 91.46px;
    border-radius: 100px;
  }

  .frienfName {
    position: absolute;
    width: 100%;
    height: 45px;
    top: 110px;
    line-height: 50px;
    font-size: 24px;
    text-align: center;
    /*color: #6C489C;*/
    color: #4d4d4f;

  }

  .line {
    position: absolute;
    width: 255px;
    height: 0px;
    border: 1px solid #E9E7E7;
    background: #E9E7E7;
  }

  .L_1 {
    top: 178px;
  }

  .L_2 {
    top: 261px;
    right: 2px;
  }

  .commonFriend {
    position: absolute;
    width: 260px;
    height: 22px;
    padding: 0px;
    left: 0px;
    top: 183px;
    line-height: 32px;
    font-size: 16px;
    text-align: center;
    color: #000000;
  }

  .commons {
    position: absolute;
    width: 260px;
    height: 36.56px;
    left: 11.68px;
    top: 224.25px;
    line-height: 32px;
    font-size: 16px;
    text-align: center;
    color: #000000;
    direction: rtl;
  }

  .group {
    position: absolute;
    left: 103.83px;
    top: 281.6px;
  }

  .cnt {
    position: absolute;
    left: 147px;
    top: 270px;
    line-height: 50px;
    font-size: 24px;
    text-align: center;
    color: #FEA832;
  }

  .friendOver {
    background: linear-gradient(0deg, rgba(141, 142, 150, 0.5) 1.4%, rgba(207, 207, 207, 0) 100%), #FFFFFF;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
    transition: 0.5s;
    transform: scale(1.1);

  }

  /****************************************** mahsa ******************************************/
  .scoreParent {
    width: 261px;
    height: 60px;
    position: absolute;

  }

  .score {
    width: 145px;
    height: 60px;
    position: absolute;
    /* float: right; */
    right: 35px;

  }

  .iconScore {
    position: absolute;
    left: 50px;
    top: 5px;
  }

  .txt {
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: #c8c7c7;
  }

  .buttons {
    width: 128px;
    height: 40px;
    position: relative;
    top: 7px;
    /*border: 1px solid red;*/
  }

  .txtButtons {
    width: 120px;
    height: 40px;
    line-height: 40px;
    position: relative;
    /* float: left; */
    /* top: 10px; */
    border-radius: 5px;

  }

  .message {
    float: right;
    position: relative;
    top: 5px;
    right: 8px;

  }

  .hoverMsg {
    background-color: #1955a6;
    color: #fff;
  }

  .hoverAccept {
    background-color: #5bac5d;
    color: #fff;
  }

  .hoverReject {
    background-color: #ea3c45;
    color: #fff;
  }

  .messageHover {
    position: absolute;
    top: 5px;
    right: 8px;
  }

  .hide {
    display: none;
  }


</style>
