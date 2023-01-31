<template>

  <div v-if="show==1" class="backreply">
    <img class="overlay" :src="imgUrl+'overlay.png'"/>
    <div class="replybox">
      <div class="header" v-if="isPost!='0'">
        <div class="cm"
             v-if="data.comments.length !== 0 && data.comments.length !== 'undefined' && data.comments.length != null"
             style="margin-right: 25px; float:right;">نظرات در مورد این پست
        </div>
        <div v-if="data.comments.length !== 0 && data.comments.length !== 'undefined' && data.comments.length != null"
             class="cm"
             style="margin-left:12px; float:left; width:74px;">{{data.comments.length}} نظر
        </div>
      </div>
      <div class="replyholder">
        <input v-model="walltext" id="wallmsg"
               :class="['inputreply',(active==page&&xpos==0 && ypos==0?'active-input':'')]"
               placeholder="متن پیام خود را اینجا بنویسید" v-validate="'required|max:300|min:5'"
               name="پیام">
        <div :class="['btn',(active==page&&xpos==0 && ypos==1?'active-btn':'')]"><span>ارسال</span>
          <img class="img-send" src="../../assets/images/wall/send.png">
        </div>
        <div class="error">
          {{error}}
        </div>
      </div>
      <div style="clear:both"></div>
      <div v-if="isPost!='0' && data.wall" class="mainPost">
        <div class="userParent">
          <div class="pic-holder">
            <img src="../../assets/images/header/userdefaul.png" class="pic-wall">
            <img v-if="data.user.pic" :src="data.user.pic" class="pic-wall"
                 :onLoad="loadImage()"
                 :style="'z-index:'+avatarZindex">
          </div>
          <div class="username">{{data.user.username}}</div>
        </div>
        <div v-if="(data.wall.image!='' && data.wall.image!=null)" class="img-holder">
          <img class="wall-img"
               :src="data.wall.image">
        </div>
        <div v-if="data.wall.text!= ''"
             :class="['text' ,(data.wall.image!='' && data.wall.image!=null && data.wall.text!= '') ? 'withImgTxt':'']"
             v-html="data.wall.text.substring(0, 110)+ ' ...'"></div>
        <div
          :class="['line', (data.wall.image!='' && data.wall.image!=null && data.wall.text!= '') ? 'withImgLine' : (data.wall.image!='' && data.wall.image!=null) ? 'withoutTxtLine' : '']"></div>
      </div>
      <div style="position:relative;">
        <div v-if="data.comments.length > 0"
             :class="['holderreply' , (data.wall.image!='' && data.wall.image!= null && data.wall.text!= '') ? 'withImgTxtReplyBox' : (data.wall.image!='' && data.wall.image!=null) ? 'withImgReplyBox' : '']">
          <div class="scrollholder">
            <!-- <div v-if="isPost!='0'" class="list" :class="(isPost=='0'?'list-empty':'')">-->
            <div v-for="(item,index) in data.comments" class="item"
                 :id="'item_'+index">
              <div class="pic-holder" style="margin-right: 15px">
                <img src="../../assets/images/header/userdefaul.png" class="pic-wall">
                <img :src="item.user.pic" v-if="item.user.pic" class="pic-wall" :onLoad="loadImage()"
                     :style="'z-index:'+avatarZindex">
              </div>
              <div class="username">{{item.user.username}}</div>
              <div class="text" v-html="item.text" style="right: 17px;"></div>
              <div style="clear:both"></div>
              <div class="line" style="width:1137px;right: 7px;"></div>
            </div>
            <!--  </div>-->
          </div>
        </div>
      </div>
      <div style="clear:both"></div>
    </div>
  </div>
</template>

<script>
  import wallajax from '../../api/wall'
  import {ROAST_CONFIG} from "../../config";
  import IScroll from "../../js/iscroll";
  import func from '../../mixins/func'

  export default {
    name: "wall-reply",
    props: ['activeRoute', 'active', 'page', 'isPost', 'selectedCat', 'isMine', 'data', 'mainUsername'],
    mixins: [func],
    data() {
      return {
        show: 0,
        // data: {},
        imgAdrs: ROAST_CONFIG.URL_IMAGE,
        imgUrl: ROAST_CONFIG.url_Img_server,
        avatarZindex: 1,
        heightAll: 0,
        xpos: 0,
        ypos: 0,
        walltext: '',
        error: '',
        myScroll: '',
        url:'http://ssn.tvapps.ir/hamsam/pservice//api/v1/wall/upload'

      }
    }, created() {
    }, watch: {
//             show: function (val) {
//                 // this.data = {};
//                 this.xpos = 0;
//                 this.ypos = 0;
//                 this.walltext = '';
//                 //if (val == 1) {
//                 if (this.isPost != '0') {
//                     setTimeout(() => {
// alert('watch')
//                         this.scrollInit();
//                         this.myScroll.refresh();
//                         this.myScroll.scrollToElement('#item' + this.ypos, 1000, false, 0);
//                     }, 200);
//
//
//                     //} else {
//
//                     //}
//                 }
//
//             }
    }, methods: {
      loadImage() {
        this.avatarZindex = 3;
      }, scrollInit() {
        //alert(this.myScroll)
        this.myScroll = '';
        if (this.myScroll == '') {
          this.myScroll = new IScroll(".holderreply", {
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
        }

      }, left() {
        if (this.xpos == 0 && this.ypos == 0) {
          this.ypos = 1;
        }

      }, right() {
        if (this.xpos == 0 && this.ypos == 1) {
          this.ypos = 0;
        }
      }, up() {
        if (this.xpos == 1) {
          if (this.ypos > 0) {
            this.ypos--;
            this.myScroll.scrollToElement('#item_' + this.ypos, 500, false, true);
          } else if (this.ypos == 0) {
            this.xpos = 0;
          }
        }

      }, down() {
        if (this.xpos == 0) {
          if (this.data.comments && this.data.comments.length > 2 && this.isPost !== '0') {
            this.xpos = 1;
          }
        } else {
          // if (this.data.comments.length > 4) {
          this.ypos++;
          this.myScroll.scrollToElement('#item_' + this.ypos, 500, false, true);

          // }


        }

      }, enter() {
        if (this.xpos == 0 && this.ypos == 0) {
          this.showIme('wallmsg');
          return false;
        } else if (this.xpos === 0 && this.ypos === 1) {
          return {text: this.walltext, ypos: this.ypos};

        } else {
          return false;
        }
      }, resetScroll() {
        this.xpos = 0;
        this.ypos = 0;
        this.walltext = '';
        this.scrollInit();
        this.myScroll.refresh();
        this.myScroll.scrollToElement('#item' + this.ypos, 1000, false, 0);
      }
    }
  }
</script>

<style scoped>
  /*.backreply {*/
  /*    position: absolute;*/
  /*    width: 1920px;*/
  /*    height: 1080px;*/
  /*    left: 0.23px;*/
  /*    top: -2px;*/
  /*    z-index: 22222;*/
  /*    background: rgba(246, 246, 246, 0.9);*/
  /*}*/
  .backreply {
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

  .list {

    position: relative;
    width: 1130.19px;
    max-height: 834.08px;
    min-height: 88px;
    /*   left: 385.13px;
       top: 246.92px;*/
    margin-right: 0px;

    background: #FFFFFF;
    /* box-shadow: 0px -1px 20px rgba(0, 0, 0, 0.25);
     border-radius: 30px 30px 0px 0px;*/


  }

  .error {
    position: absolute;
    top: 160px;
    left: 815px;
    text-align: right;
    color: red
  }

  .replyholder {
    position: absolute;
    top: 30px;
    width: 1130.19px;
    height: 85px;
    right: 30px;


  }

  .inputreply {
    position: relative;
    float: right;
    padding-right: 21.1px;
    margin-bottom: 12.91px;
    width: 900px;
    height: 75px;
    line-height: 75px;
    font-size: 20px;
    text-align: right;
    color: #BCBCBC;
    background: #FFFFFF;
    border: 1px solid #BCBCBC;
    box-shadow: 0px 0px 21px rgba(0, 0, 0, 0.06);
    border-radius: 10px;
  }

  .btn {
    position: relative;
    float: left;
    margin-left: 30px;
    padding-right: 81.1px;
    margin-bottom: 12.91px;
    width: 82.14px;
    height: 80px;
    line-height: 80px;
    font-size: 24px;
    text-align: right;
    color: #FFFFFF;
    background: #BCBCBC;
    box-shadow: 0px 4px 22px rgba(188, 188, 188, 0.39);
    border-radius: 10px;
  }

  .img-send {
    position: absolute;
    /*top: 16.19px;*/
    top: 26px;
    right: 28px;

  }

  .list-empty {
    top: 200px;
    border-radius: 30px;
  }

  .header {
    position: relative;
    float: right;
    width: 1130.19px;
    height: 35px;
    line-height: 35px;
    z-index: 99;
    top: 23px;
    display: none;
  }

  .cm {
    position: relative;
    width: 206px;
    font-size: 21px;
    /*color: #622B94;*/
    color: #0455a5;
    direction: rtl;
  }

  .line {
    width: 1132px;
    height: 2px;
    float: right;
    position: relative;
    right: 25px;
    top: 17px;
    background-color: #E4E4E4;
  }

  .withImgLine {
    top: 115px;
  }

  .withoutTxtLine {
    top: 120px;
  }

  .item {
    height: 155px;

  }

  .pic-holder {
    position: relative;
    float: right;
    width: 80.02px;
    height: 80.02px;
    margin-right: 45px;
    top: 10px;
    margin-bottom: 11.94px;
    overflow: hidden;
  }

  .pic-wall {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 80.02px;
    z-index: 1;
    border-radius: 100px;
  }

  .username {
    width: 100%;
    position: relative;
    float: right;
    right: 20px;
    max-width: 220px;
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    text-align: right;
    top: 35px;
    /*color: #000000;*/
    color: #0455a5;
  }

  .img-holder {
    background-color: #c9c9c9;
    float: left;
    position: relative;
    top: 100px;
    left: 290px;
    width: 572px;
    height: 330px;
    text-align: center;
  }

  .withTxt {
    top: 25px;
  }

  .wall-img {
    width: 547px;
    height: 308px;
    position: absolute;
    left: 13px;
    top: 11px;
  }

  .text {
    position: relative;
    float: right;
    /*width: 1035.34px;*/
    width: 1055px;
    height: 40px;
    top: 5px;
    right: 45px;
    overflow: hidden;
    line-height: 40px;
    font-size: 20px;
    text-align: right;
    color: #000;
    direction: rtl;

  }

  .withImgTxt {
    top: 110px;
  }

  .replybox {
    position: absolute;
    /*width: 1130.19px;*/
    width: 1160px;
    height: 950px;
    left: 385.13px;
    top: 70px;
    background: #FFFFFF;
    box-shadow: 0px -1px 20px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
  }

  .holderreply {
    position: relative;
    width: 1150px;
    height: 645px;
    left: 0px;
    top: 140px;
    overflow: hidden;
  }

  .withImgReplyBox {
    height: 365px;
    top: 245px;
  }

  .withImgTxtReplyBox {
    height: 315px;
    top: 240px;
  }

  .scrollholder {
    position: absolute;
    width: 1130.19px;
    left: 0px;
    top: 0px;
  }

  .active-input {
    box-shadow: 0px 0px 20px #2F80ED;
  }

  .active-btn {
    /*background: #2F80ED;*/
    background: #0455a5;
  }

  .mainPost {
    width: 100%;
    position: relative;
    max-height: 440px;
    top: 120px;
  }

  .userParent {
    width: 100%;
    position: relative;
    /*border: 1px solid red;*/
  }

</style>
