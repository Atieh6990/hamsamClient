<template>
  <div>
    <div v-if="show == 2" class="peopleParent">
      <div v-if="(parseInt((index)/columnCount))+2>(parseInt((number)/columnCount))"
           v-for="(Friend, index) in findFriend" class="friendItem"
           :class="(number == index && active == page && activeX == pageX) ? 'friendOver' :''">
        <div class="friendBack"></div>
        <div class="userInfo"
             :class="[(ypos == 2 && number == index && activeRoute == 1  && active == page && activeX == pageX)? 'hoverUserInfo': '']">
          <div class="friendImgBox">
            <img v-if="Friend.pic != null" class="friendIcon" :src="Friend.pic"/>
            <img v-else class="friendIcon" :src="URL + 'header/userdefaul.png'"/>
          </div>
          <div v-if="Friend.username != null" class="frienfName">{{Friend.username|substr(10)}}</div>
          <div class="scoreParent" style="top: 165px;">
            <div class="score">
              <div class="txt">امتیاز دوره</div>
              <div class="numScore">{{Friend.level}}</div>
            </div>
            <img :src="URL + 'friends/emtiaz.png'" class="iconScore">
          </div>

        </div>
        <div class="line L_2"></div>
        <div class="scoreParent" style="bottom: 0px">
          <div :id="'stateFriend_'+(index)" :ref="'stateFriend_'+(index)"
               :class="['button', (number == index  && ypos == 3 && activeRoute == 1 && activeX == pageX) ? (pendingFriend.indexOf(Friend.id) !== -1) ? 'hoverWaiting' :'hoverAdd':'']">
            <div id="'stateFriendTxt_'+(index)" :ref="'stateFriendTxt_'+(index)" class="txtButton"
                 v-text="(pendingFriend.indexOf(Friend.id) !== -1 ? 'در انتظار دوستی' : 'درخواست دوستی')">

            </div>

          </div>
        </div>

      </div>
    </div>
    <img v-if="findFriend.length > 0" :src="onlineURL + 'friends/shadow.png'"
         style="position: absolute; bottom: 85px;right: 425px;">
  </div>
</template>

<script>
    import {ROAST_CONFIG} from '../../config';
    import func from '../../mixins/func';


    export default {
        name: "find-friend",
        props: ['active', 'page', 'activeX', 'pageX', 'show', 'activeRoute', 'findFriend', 'pendingFriend', 'friendshipText'],
        created() {
            this.$root.$on('unFriend', () => {
                this.findFriend[this.number]['is_friend'] = 0;

            });
            this.$root.$on('find_friend', () => {
                this.ypos = 2;
                this.number = 0;

            });
        },
        data() {
            return {
                URL: ROAST_CONFIG.url_Img_comp,
                onlineURL: ROAST_CONFIG.url_comp_server,
                number: 0,
                columnCount: 3,
                ypos: 2,
                item: '',
                itemTxt: ''


            }
        },
        mixins: [func],
        methods: {
            defineItem() {
                this.item = this.$refs['stateFriend_' + this.number][0];
                this.itemTxt = this.$refs['stateFriendTxt_' + this.number][0];
            },
            up() {
                // alert(this.ypos)
                this.defineItem();
                this.item.style.backgroundColor = "";
                if (this.ypos == 2) {

                    if ((this.number) >= this.columnCount) {
                        this.number -= parseInt(this.columnCount);

                        this.ypos = 3;
                        return true
                    } else {
                        // this.ypos = 1;
                        // return true;
                    }

                } else if (this.ypos == 3) {

                    this.ypos = 2;
                    this.item.style.backgroundColor = "";
                    return true;
                }
                return false;

            }, down() {
                this.defineItem();
                this.item.style.backgroundColor = "";
                if (this.ypos == 2) {

                    this.ypos = 3;

                    return true
                } else if (this.ypos == 3) {
                    if ((this.number + parseInt(this.columnCount)) < (this.findFriend.length)) {
                        this.number += parseInt(this.columnCount);
                        this.ypos = 2;
                        if (parseInt(this.findFriend.length / this.columnCount) - 2) {
                            return {
                                'num': (this.number / this.columnCount) + 1,
                                'length': (this.findFriend.length / this.columnCount),
                            }


                        }
                        // return true
                    }
                    // if (parseInt(this.number / this.columnCount) >= parseInt(this.findFriend.length / this.columnCount) - 1) {
                    //     return {
                    //         'num': (this.number / this.columnCount) + 1,
                    //         'length': (this.findFriend.length / this.columnCount),
                    //     }
                    //
                    //
                    // }

                }


                return false
            },
            right() {
                this.defineItem();
                this.item.style.backgroundColor = "";
                if (this.number % this.columnCount != 0) {
                    this.number--;
                    this.ypos = 2;
                    return true
                }
                return false;
            }, left() {
                this.defineItem();
                this.item.style.backgroundColor = "";
                if ((this.number % this.columnCount != parseInt(this.columnCount) - 1) && (this.number + 1 < this.findFriend.length)) {
                    this.number++;
                    this.ypos = 2;
                    return true
                }
                return false;
            },
            enter() {
                this.defineItem();
                return {
                    'ypos': this.ypos,
                    'friendID': this.findFriend[this.number]['id'],
                    'level': this.findFriend[this.number]['level'],
                    'pic': this.findFriend[this.number]['pic'],
                    'username': this.findFriend[this.number]['username'],
                    'item': this.item,
                    'itemTxt': this.itemTxt

                };
            },

        }

    }
</script>

<style scoped>

  .peopleParent {

    width: 860px;
    height: 840px;
    position: absolute;
    right: 420px;
    top: 145px;
    overflow: hidden;
    /* border: 1px solid green; */
  }

  .friendItem {
    position: relative;
    float: right;
    width: 261px;
    height: 328px;
    margin-top: 20px;
    margin-right: 20px;
    border-radius: 5px;

  }

  .friendBack {
    position: absolute;
    width: 100%;
    height: 100%;
    border-bottom-width: 1px;
    border-bottom-color: rgb(215, 215, 215);
    border-bottom-style: solid;
    background-color: rgb(250, 249, 254);
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.45);
    border-radius: 5px;
  }

  .friendOver {
    background: linear-gradient(0deg, rgba(141, 142, 150, 0.5) 1.4%, rgba(207, 207, 207, 0) 100%), #FFFFFF;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
    transition: 0.5s;
    transform: scale(1.1);

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

  .L_2 {
    top: 261px;
    right: 2px;
  }

  .scoreParent {
    width: 261px;
    height: 60px;
    position: absolute;
    /*border: 1px solid red;*/

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

  .button {
    width: 240px;
    height: 40px;
    position: relative;
    top: 7px;
    right: 10px;


  }

  .txtButton {
    width: 240px;
    height: 40px;
    line-height: 40px;
    position: relative;
    border-radius: 5px;

  }

  .request {
    float: right;
    position: relative;
    top: 5px;
    right: 40px;

  }

  .requestHover {
    position: absolute;
    top: 5px;
    right: 40px;
  }

  .hoverAdd {
    background-color: #1955a6;
    color: #fff;
  }

  .hoverWaiting {
    background-color: rgb(149, 149, 149);
    color: #fff;
  }

</style>
