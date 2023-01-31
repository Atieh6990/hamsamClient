<template>
  <div>
    <div :class="['btn',(activeRoute==1&&active==page&&ypos==0?'btn-hover':'')]" style="left: 663px;"><span>نوشتن بر دیوار</span>
      <div style="position:relative">
        <img class="img-write" src="../../assets/images/wall/write.png">
        <img v-if="activeRoute==1&&active==page&&ypos==0" style="z-index:2;" class="img-write"
             :src="URL_SERVER + 'wall/write-hvr.png'">
      </div>
    </div>
    <div class="wallcover">
      <div id="wallHolder">
        <div :id="'wall_'+index" v-for="(item,index) in wallitems">
          <div class="item">
            <div class="avatar-holder">
              <img v-if="(item.user.pic != '') && (item.user.pic != null)" :src="item.user.pic"
                   class="pic-wall" :onLoad="loadImage()" :style="'z-index:'+avatarZindex">
              <img v-else src="../../assets/images/header/userdefaul.png" class="pic-wall">
            </div>

            <div class="time-holder">
              <div v-if="(item.user.username != '') && (item.user.username != null)" class="username">
                {{item.user.username}}
              </div>
              <div class="username" style="margin-top:8px;font-size: 18px;color: #838383;">{{item.date}}</div>
            </div>
            <div style="clear:both;"></div>
            <div class="wall-content">
              <div v-if="item.wall.image!='' && item.wall.image!=null" class="img-holder">
                <img class="wall-img"
                     :src="item.wall.image">
              </div>
              <div style="clear:both"></div>
              <div v-if="item.wall.text!=''"
                   :class="['wall-text',item.wall.image!='' && item.wall.image!=null ? 'topImgPost':'']"
                   v-html="item.wall.text.substring(0,100)+ ' ...'"></div>
              <div v-else class="wall-text" style="height: 24px;"></div>
              <div class="lineList"></div>
              <div class="itemParent">
                <div class="wall-det">
                  <img class="btn-img" :src="URL_SERVER + 'wall/unlike.png'">
                  <img v-if="likeArr[index]==1" class="btn-img"
                       :src="URL_SERVER + 'wall/like.png'">
                  <img v-show="ypos==1 && xpos==0 && zpos==index && activeRoute==1 && active==page && likeArr[index]!=1"
                       class="btn-img"
                       :src="URL_SERVER + 'wall/like-hvr.png'">
                  <div class="count-text">{{item.wall.likecount}}</div>
                  <div class="tooltip">
                    <div class="tooltiptext"
                         v-show="ypos==1 && xpos==0 && zpos==index && activeRoute==1 && active==page">دوست داشتم
                    </div>
                  </div>
                </div>
                <div class="wall-det">
                  <img class="btn-img" :src="URL_SERVER + 'wall/cmd.png'">
                  <img v-show="ypos==1 && xpos==1 && zpos==index && activeRoute==1 && active==page"
                       class="btn-img" :src="URL_SERVER + 'wall/cmd-hvr.png'">
                  <div class="count-text">{{item.wall.cmcount}}</div>
                  <div class="tooltip">
                    <div class="tooltiptext"
                         v-show="ypos==1 && xpos==1 && zpos==index && activeRoute==1 && active==page">نظر دادن
                    </div>
                  </div>
                </div>
                <div v-if="item.user_id != hamsam" class="wall-det">
                  <img class="btn-img" :src="URL_SERVER + 'wall/pro.png'">
                  <img id="hover-image" class="btn-img"
                       v-show="ypos==1 && xpos==2 && zpos==index && activeRoute==1 && active==page"
                       :src="URL_SERVER + 'wall/pro-hvr.png'">
                  <div class="tooltip">
                    <div class="tooltiptext"
                         v-show="ypos==1 && xpos==2 && zpos==index && activeRoute==1 && active==page">پروفایل
                    </div>
                  </div>
                </div>
                <div v-else class="wall-det">
                  <img class="btn-img"
                       :src="URL_SERVER + 'wall/pro-deasable.png'">
                </div>
                <div v-if="item.user_id != hamsam" class="wall-det">
                  <img v-show="userID != item.user_id" class="btn-img" :src="URL_SERVER + 'wall/unrpt.png'">
                  <img
                    v-show="userID != item.user_id && ypos==1 && xpos==3 && zpos==index && activeRoute==1 && active==page"
                    class="btn-img"
                    :src="URL_SERVER + 'wall/rpt-hvr.png'">
                  <img v-show="userID == item.user_id" class="btn-img" :src="URL_SERVER + 'wall/delete.png'">
                  <img
                    v-show="userID == item.user_id && ypos==1 && xpos==3 && zpos==index && activeRoute==1 && active==page"
                    class="btn-img"
                    :src="URL_SERVER + 'wall/delete_hover.png'">
                  <div class="tooltip">
                    <div class="tooltiptext"
                         v-show="userID != item.user_id && ypos==1 && xpos==3 && zpos==index && activeRoute==1 && active==page">
                      گزارش تخلف
                    </div>
                    <div class="tooltiptext"
                         v-show="userID == item.user_id && ypos==1 && xpos==3 && zpos==index && activeRoute==1 && active==page">
                      پاک
                      کردن
                    </div>
                  </div>
                </div>
                <div v-else class="wall-det">
                  <img class="btn-img"
                       :src="URL_SERVER + 'wall/rpt-deasable.png'">
                </div>
                <div v-if="item.wall.text.length > 100" class="wall-det">
                  <img class="btn-img more-pos" :src="URL_SERVER + 'wall/more.png'">
                  <img v-show="ypos==1 && xpos==4 && zpos==index && activeRoute==1 && active==page"
                       class="btn-img more-pos"
                       :src="URL_SERVER + 'wall/more-hvr.png'">
                </div>
                <div v-else class="wall-det">
                  <img class="btn-img more-pos"
                       :src="URL_SERVER + 'wall/edame-deasable.png'">
                </div>
              </div>


            </div>
            <!--            <div style="clear:both"></div>-->
            <!--            <div class="hor-line"></div>-->
            <div style="clear:both;"></div>
            <div style="position: relative; margin-top: 10px"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="showReport" class="reportMsg">{{reportMsg}}
      <img class="icon-report" :src="URL_SERVER + 'wall/g-icon.png'"/>
    </div>
    <div v-if="isMore" class="morePost">
      <img class="overlay" :src="URL_SERVER+'overlay.png'"/>
      <div class="morePostBox">
        <div class="cm"
             style="margin-right: 33.86px;float:right">ادامه مطلب
        </div>
        <div class="hor-line"></div>
        <div class="textMorePostParent">
          <div class="pic-holder">
            <img src="../../assets/images/header/userdefaul.png" class="pic-wall">
            <img v-if="(wallitems[zpos]['user']['pic'] != '') && (wallitems[zpos]['user']['pic'] != null)"
                 :src="wallitems[zpos]['user']['pic']" class="pic-wall"
                 :onLoad="loadImage()"
                 :style="'z-index:'+avatarZindex">
          </div>
          <div class="usernameMorePost">{{wallitems[zpos]['user']['username']}}</div>
          <div class="textMorePost">
            <div class="textMoreScroll" v-html="wallitems[zpos]['wall']['text']"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex';
  import {ROAST_CONFIG} from '../../config'
  import IScroll from "../../js/iscroll";
  import ajaxwall from '../../api/wall'
  import {page} from 'vue-analytics'


  export default {
    name: "wall-item",
    props: ['activeRoute', 'active', 'page', 'wallitems', 'counter', 'loadNumber', 'likeArr', 'people', 'reportMsg'],
    data() {
      return {
        ypos: 1, //post roo wall=0,list=1
        imgAdrs: ROAST_CONFIG.URL_IMAGE,
        URL_SERVER: ROAST_CONFIG.url_comp_server,
        avatarZindex: 1,
        xpos: 0,  //0=like,1=reply,2=more
        zpos: 0,  //rooye list
        isMore: false,
        showReport: false,
        userID: '',
        myScroll: '',
        myScrollMorePost: '',
        hamsam: ROAST_CONFIG.hamsmUserId


      }
    }, created() {
      // alert(this.hamsam)

      this.getUser = this.getUser();
      this.userID = this.getUser['userID'];
      setTimeout(() => {
        this.scrollInit();
      }, 200);
      this.$root.$on('report_show', () => {
        this.showReport = true;
      });
      this.$root.$on('report_hide', () => {
        this.showReport = false;
      });

    }, watch: {

      wallitems: function () {

        var self = this;
        setTimeout(function () {

          if (self.myScroll) {
            self.myScroll.refresh();
            self.myScroll.scrollToElement('#wall_' + this.zpos, 500, false, true);
          }


        }, 100);
      }
    }, methods: {
      ...mapGetters([
        'getUser'
      ]),
      scrollInit() {

        this.myScroll = new IScroll(".wallcover", {
          scrollY: true,
          scrollbars: "custom",
          momentum: true,
          preventDefault: false,
          scrollbars: true,
          mouseWheel: true,
          interactiveScrollbars: true,
          shrinkScrollbars: "none",
          fadeScrollbars: false,
          mouseMove: true,
        });

      },
      scrollInitMorePost() {

        setTimeout(() => {
          this.myScrollMorePost = new IScroll(".textMorePost", {
            scrollY: true,
            scrollbars: "custom",
            momentum: true,
            preventDefault: false,
            scrollbars: true,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: "none",
            fadeScrollbars: false,
            mouseMove: true,
          });
        }, 10);


      },

      down() {
        if (this.isMore == false) {
          if ((this.ypos == 1)) {

            if (this.zpos < (this.wallitems.length) - 1) {

              this.zpos++;
              this.xpos = 0
              this.myScroll.scrollToElement('#wall_' + this.zpos, 500, false, true);
              this.myScroll.refresh();

              return true;

            } else if (this.zpos == (this.wallitems.length) - 1) {
              this.$root.$emit('moreWall');
              return true;

            }

          } else if (this.ypos == 0 && this.wallitems.length != 0) {
            this.ypos = 1;
            return true;
          }
          return false;
        } else {
          this.myScrollMorePost.moveDown(80);
        }

      }
      , up() {
        if (this.isMore == false) {
          if (this.ypos == 1 && this.zpos == 0) {
            this.ypos--;
          } else if (this.ypos == 1 && this.zpos != 0) {
            this.zpos--;
            this.xpos = 0
            this.myScroll.scrollToElement('#wall_' + this.zpos, 500, false, true);
            this.myScroll.refresh();


          }
        } else {
          this.myScrollMorePost.moveUp(80);
        }
      }, right() {

        if (this.isMore == false) {
          if (this.ypos == 0) {
            return false
          } else if (this.ypos == 1) {
            if (this.hamsam == this.wallitems[this.zpos]['user_id']) {
              if (this.wallitems[this.zpos]['wall']['text'].length > 100) {
                if (this.xpos == 4) {
                  this.xpos = 1;
                  return true
                } else if (this.xpos == 1) {
                  this.xpos = 0;
                  return true
                }
              } else {
                if (this.xpos == 1) {
                  this.xpos = 0;
                  return true
                }
              }

            } else {
              if (this.xpos == 0) {
                return false;
              } else {
                this.xpos--;
                return true;
              }

            }


          }
        } else {

          return true;
        }
      }, left() {
        //  alert('lef ->' + this.isMore)
        if (this.isMore == false) {
          if (this.ypos == 0) {
            return false;
          } else if (this.ypos == 1) {
            if (this.hamsam == this.wallitems[this.zpos]['user_id']) {

              if (this.xpos == 0) {
                this.xpos = 1;
                return true;
              } else if (this.xpos == 1) {
                if (this.wallitems[this.zpos]['wall']['text'].length > 100) {
                  this.xpos = 4;
                  return true;
                } else {
                  return false;
                }
              } else if (this.xpos == 4) {
                return false;
              }
            } else {

              if (this.wallitems[this.zpos]['wall']['text'].length > 100) {
                if (this.xpos == 4) {
                  return false;
                } else {
                  this.xpos++;
                  return true;
                }
              } else {
                if (this.xpos == 3) {
                  return false;
                } else {
                  this.xpos++;
                  return true;
                }
              }
            }
          }
        } else {
          return true;
        }
      }, enter() {

        if (this.ypos == 0) {
          return 2;
        } else if (this.ypos == 1) {
          switch (this.xpos) {
            case 0: //like

              if (this.likeArr[this.zpos] == 0 || this.likeArr[this.zpos] == 1) {
                page({
                  page: 'like or dislike post of the wall',
                  title: 'like or dislike post of the wall'
                })
                ajaxwall.like(this.wallitems[this.zpos]['wall_id']).then(data => {

                  if (data.success === true) {

                    this.wallitems[this.zpos]['wall']['likecount'] = data.data.likeCount;
                    this.$set(this.likeArr, this.zpos, data.data.is_liked);

                  }

                });
                // console.log('after ---------------------' + this.likeArr)
              }


              return false;
              break;
            case 1:  //cm
              return {
                id: this.wallitems[this.zpos]['wall_id'],
                result: 1,
                cmcount: this.wallitems[this.zpos]['wall']['cmcount']
              };

              break;
            case 2:  //profile
              return {
                result: 2,
                user_id: this.wallitems[this.zpos]['user_id'],
                // 'level': this.findFriend[this.number]['level'],
                username: this.wallitems[this.zpos]['user']['username'],
                pic: this.wallitems[this.zpos]['user']['pic'],
              };


              return false;


              break;
            case 3:  //report
              return {
                id: this.wallitems[this.zpos]['wall_id'],
                wall_user_id: this.wallitems[this.zpos]['user_id'],
                user_id: this.userID,
                result: 3
              };

              break;
            case 4: //more

              if (this.wallitems[this.zpos]['wall']['text'].length > 100) {
                this.isMore = true;
                this.scrollInitMorePost();

              }
              return false;
              break;
          }
        }
      }, back() {

      }, addOver() {

      }, loadImage() {
        this.avatarZindex = 3;
      },
      getWallId() {
        return this.wallitems[this.zpos]['id'];
      },

    }
  }
</script>

<style scoped>
  #wallHolder {
    position: absolute;
    width: 938px;
    left: 0px;
    top: 0px;
    margin-right: 25px;
  }

  .btn {
    position: absolute;
    width: 192px;
    height: 62px;
    padding-right: 35px;
    line-height: 62px;
    top: 100px;
    font-size: 24px;
    text-align: center;
    direction: rtl;
    color: #868686;
    background: #FFFFFF;
    border: 1px solid #BCBCBC;
    box-shadow: 0px 0px 21px rgba(196, 196, 196, 0.32);
    border-radius: 10px;
  }

  .btn-hover {
    background-color: #0455a5;
    color: #FFF;
    border: 1px solid #0455a5;
  }

  .img-write {
    position: absolute;
    top: -48px;
    right: -9px;
  }

  .item {
    position: relative;
    margin-bottom: 15px;
    width: 886px;
    min-height: 235px;
    background: #FFFFFF;
    border: 1px solid rgba(207, 207, 207, 0.5);
    box-sizing: border-box;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.12);
    border-radius: 15px;
    margin-left: 26px;
  }

  .avatar-holder {
    position: relative;
    width: 68.09px;
    height: 68.09px;
    margin-top: 22px;
    margin-right: 16.46px;
    float: right;
    overflow: hidden;
  }

  .pic-wall {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 68.09px;
    z-index: 1;
    border-radius: 100px;
  }

  .time-holder {
    float: right;
    margin-right: 15.46px;
    margin-top: 35px;
    width: 376px;
    height: 64px;
  }

  .username {
    color: #0455a5;
    height: 23px;
    line-height: 23px;
    direction: rtl;
    font-size: 23px;
    text-align: right;
    width: 100%;
  }

  .like {
    position: absolute;
    width: 30px;
    top: 23px;
  }

  .count-text {
    position: relative;
    float: right;
    width: 40px;
    height: 48px;
    line-height: 48px;
    overflow: hidden;
    font-size: 18px;
    text-align: center;
    right: 0px;

  }

  .wall-content {
    width: 833px;
    min-height: 30px;
    float: right;
    text-align: right;
    direction: rtl;
    font-size: 20px;
    margin-top: 0px;
    color: #000;
    margin-right: 23px;
    overflow: hidden;
  }

  .wall-img {
    width: 454px;
    height: 257px;
    position: absolute;
    left: 13px;
    top: 11px;

  }

  .hor-line {
    background-color: #d7d7d7;
    width: 1130px;
    height: 1px;
    position: absolute;
    top: 66px;
  }

  .lineList {
    width: 882px;
    height: 1px;
    background-color: #d7d7d7;
    position: absolute;
    float: left;
    left: 1px;
    bottom: 60px;
  }

  .itemParent {
    width: 880px;
    height: 48px;
    line-height: 48px;
    position: absolute;
    bottom: 8px;
    left: 0px;
    /* border: 1px solid green; */
  }

  .wall-det {
    position: relative;
    float: right;
    border: 2px solid transparent;
    width: 170px;
    height: 48px;
    line-height: 48px;
    font-size: 17.9952px;
    text-align: center;
    direction: rtl;
    color: #646464;

  }

  .wall-profile {
    width: 70px;
    height: 48px;
    float: left;
    position: absolute;
    left: 26px;

  }

  .btn-img {
    position: absolute;
    top: 10px;
    right: 40px;
  }

  .btn-profile {
    position: absolute;
    top: 6px;
  }


  .title-hover {
    color: #0455a5;
    border-radius: 5px;
    border: 2px solid #CCCCCC;
    background-color: #EBEBEB;

  }

  .wallcover {
    position: absolute;
    width: 970px;
    height: 878px;
    left: 575px;
    top: 165px;
    overflow: hidden;
    margin: 0px 26px;
    margin-top: 30px;
  }

  .wall-text {
    position: relative;
    height: 70px;
    /* margin-top: 5px; */
    margin-bottom: 50px;
    width: 840px;
    overflow: hidden;
    transition: 1s;
    line-height: 33px;
    text-align: right;

  }

  .topImgPost {
    margin-top: 15px;
  }

  .text-expand {
    height: fit-content;
    transition: 1s;
  }

  .img-holder {
    background-color: #c9c9c9;
    float: left;
    position: relative;
    top: 5px;
    left: 180px;
    width: 480px;
    height: 280px;
    text-align: center;
  }

  .more-pos {
    top: 0px;
    right: 0px;
  }

  .tooltip {
    position: absolute;
    right: 55px;
    display: inline-block;
    border-bottom: 1px dotted black;
    transition: 2s;
  }

  .tooltip .tooltiptext {
    width: 116px;
    height: 30px;
    line-height: 30px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.31);
    color: #89949a;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    left: 50%;
    margin-left: -60px;
    transition: 2s;
  }

  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: rgb(255, 255, 255) transparent transparent transparent;
    border-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.31);
    transition: 2s;
  }

  .reportMsg {
    background-color: rgb(0, 166, 81);
    width: 540px;
    height: 64px;
    line-height: 64px;
    position: absolute;
    left: 75px;
    bottom: 30px;
    font-size: 22px;
    color: #fff;
    border-radius: 30px;
  }

  .icon-report {
    position: absolute;
    right: 40px;
    top: 15px;

  }

  .morePost {
    position: absolute;
    width: 1920px;
    height: 1080px;
    top: 0px;
    left: 0px;
    z-index: 100;
  }

  .overlay {
    position: absolute;
    top: 0px;
    left: 0px;
  }

  .morePostBox {
    position: absolute;
    width: 1130.19px;
    height: 834.08px;
    left: 385.13px;
    top: 110px;
    background: #FFFFFF;
    box-shadow: 0px -1px 20px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
  }

  .textMorePostParent {
    position: absolute;
    width: 1040.34px;
    height: 750px;
    right: 40px;
    top: 70px;

  }

  .cm {
    position: relative;
    width: 206px;
    height: 33px;
    line-height: 33px;
    margin-top: 18.94px;
    font-size: 21px;
    text-align: right;
    color: #0455a5;
    direction: ltr;


  }

  .mainPost {
    position: absolute;
    top: 10px;

  }

  .pic-holder {
    position: relative;
    float: right;
    width: 80.02px;
    height: 80.02px;
    margin-right: 13.51px;
    top: 12.16px;
    margin-bottom: 11.94px;
    /* border: 1px solid dodgerblue;*/
    overflow: hidden;
  }

  .usernameMorePost {
    position: relative;
    float: right;
    margin-right: 20px;
    max-width: 220px;
    height: 29px;
    line-height: 29px;
    font-size: 21px;
    text-align: right;
    margin-top: 30px;
    color: #0455a5;
  }

  .textMorePost {
    position: relative;
    float: right;
    width: 1000px;
    height: 618px;
    right: 5px;
    top: 10px;
    line-height: 40px;
    font-size: 20px;
    text-align: right;
    /*color: #A4A4A4;*/
    color: #000;
    direction: rtl;
    overflow: hidden;

  }

  .textMoreScroll {
    position: absolute;
    right: 40px;
    direction: rtl;
  }

</style>
