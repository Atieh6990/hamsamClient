<template>
  <div>

    <div v-if="albumData.length == 0" class="noImg">
      <img :src="imgURL + 'noResult.png'"/>
      <div>{{ 'لیست تصاویر خالی است.' }}</div>
    </div>

    <div v-else class="albumParent">
      <div class="albumChild">

        <div v-for="(item , index) in (addPic)" class="albumItem"
             :class="[(number == index) && (active == page) && (activeRoute==1) ? 'hover' :'']"
             :id="'album_' + index"
        >


          <div v-if="index == albumData.length-1 && !otherUser" class="addPic">

            <img v-if="(number == index)" :src="imgURL + 'eight/album/addHover.png'">
            <img v-else :src="imgURL + 'eight/album/add.png'">
            <div>اضافه کردن عکس</div>
          </div>
          <!--<div style="position: absolute;top: 224px;height: 2px;width: 100%;left: 0px;background-color: red" :id="'album_' + index"></div>-->
          <div v-if="item.is_album == 1" class="boxImg">
            <img v-if="(number == index && (active == page) && (activeRoute==1))"
                 :src="imgURL + 'profile/album/gallery_white.png'" class="folder">
            <img v-else :src="imgURL + 'profile/album/gallery.png'" class="folder">
            <div class="albumName">{{ item.title | substr(30) }}</div>
            <div class="albumCnt">{{ item.piccount +"تصویر" }}</div>
          </div>

          <div v-if="item.is_album == 0" class="boxImg">
            <div class="imageback"></div>
            <img :src="item.picture" class="imgShow">

            <div v-if="albumDetailShow == false && showBTNModel==3" class="select"
                 :class="[(selectingArr[index] == 1)?'selectHover':'']">
              <img v-if="selectingArr[index] == 1" class="tik"
                   :src="imgURL + 'profile/album/tik.png'">

            </div>


            <div v-if="albumDetailShow == true && showBTNModel==3" class="select"
                 :class="[(selectingAlbumDetail[index] == 1)?'selectHover':'']">
              <img v-if="selectingAlbumDetail[index] == 1" class="tik"
                   :src="imgURL + 'profile/album/tik.png'">

            </div>

          </div>


        </div>
      </div>
    </div>

    <div class="showImgFull" v-if="magnify == true">
      <div class="largBlur"></div>

      <img class="imgLargSize" v-if=" albumData[number]['mainpicture'] != null"
           :src="albumData[number]['mainpicture']"/>
      <img class="imgLargSize" v-else :src="albumData[number]['picture']"/>
    </div>

  </div>


</template>

<script>
  import api from '../../api/userAlbum'
  import {mapGetters} from 'vuex'
  import func from '../../mixins/func'
  import IScroll from "../../js/iscroll"
  import {ROAST_CONFIG} from '../../config'

  export default {
    name: "album",
    props: ['active', 'page', 'albumData', 'activeRoute', 'showBTNModel', 'selectingArr',
      'albumDetailShow', 'selectingAlbumDetail', 'hasNextLink', 'seeAlbumPermission', 'permissionTxt', 'albumId', "otherUser"],
    mixins: [func],
    data() {
      return {
        number: 0,
        columnCount: 5,
        cnt: 17,
        ypos: 0,//0->bozorgnamaee , 1->hazf
        magnify: false,
        cannotDeletPOP: false,
        myScroll: '',
        imgURL: ROAST_CONFIG.url_comp_server,
      }
    },
    created() {
      this.makeScroll();

    },

    watch:
      {

        albumData: function () {

          let self = this;
          setTimeout(function () {
            self.number = 0

            if (self.hasNextLink == false) {
              self.makeScroll();
            } else {

              if (self.myScroll) {
                self.myScroll.refresh();
                self.myScroll.scrollToElement('#album_' + self.number, 1000, false, true, '');
              }
            }

          }, 100);
        }
        ,

      }
    ,

    computed: {
      addPic() {
        if (!this.otherUser) {
          this.albumData.push({'is_album': -1});
        }
        return this.albumData


      },


    }
    ,


    methods: {
      ...
        mapGetters([
          'getUser'
        ]),

      scrollInit() {
        this.myScroll = ''
        if (this.myScroll == '' && this.albumData.length > 0) {

          this.myScroll = new IScroll(".albumParent", {
            scrollY: true,
            momentum: true,
            preventDefault: false,
            scrollbars: false,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: "none",
            fadeScrollbars: false,
            mouseMove: true
          });
        }

      }
      ,

      makeScroll() {

        let _self = this
        setTimeout(() => {
          _self.scrollInit();
        }, 100);
      }
      ,
      itemLength() {
        // console.log('000->'+this.albumData.length)
        return this.albumData.length
      },
      resetNumber() {
        this.number = 0;
      }
      ,

      right() {
        if ((this.magnify == false)) {
          if ((this.number % this.columnCount != parseInt(this.columnCount) - 1) && (this.number + 1 < this.albumData.length)) {
            this.number++;
            return true
          }
          return false
        } else {
          return true
        }

      }
      ,
      left() {
        if ((this.magnify == false)) {
          if ((this.number % this.columnCount != 0)) {
            this.number--;
            return true
          }
          return false
        } else {
          return true
        }

      }
      ,
      down() {
        if ((this.magnify == false)) {
          if (((this.number + parseInt(this.columnCount)) < (this.albumData.length))) {

            this.number += parseInt(this.columnCount);
            this.myScroll.scrollToElement('#album_' + this.number, 1000, false, true, '');

            if (this.number + this.columnCount > this.albumData.length && this.albumDetailShow == false) {
              this.$root.$emit('call_next_picture_list');
            }
            return true
          } else {
            if (this.albumDetailShow == false) {
              this.$root.$emit('call_next_picture_list');
              return true
            } else {
              return false
            }
          }
          return false
        } else {
          return true
        }


      }
      ,
      up() {
        if ((this.magnify == false)) {

          if (((this.number) >= this.columnCount)) {
            this.number -= parseInt(this.columnCount);
            this.myScroll.scrollToElement('#album_' + this.number, 1000, false, true, '');
            return true
          }
          return false;

        } else {
          return true;
        }

      }
      ,

      enter() {
        let checkAlbum = this.albumData[this.number]['is_album'];
        if (checkAlbum == 1) {//click rooye album
          if (this.showBTNModel != 3) {
            this.$root.$emit('album_detail', this.albumData[this.number]['id']);
          }


        } else {//click rooye axaye mamooli
          if (this.showBTNModel == 1) {//upload , select , new album


            if (this.number == this.albumData.length - 1 && !this.otherUser) {
              api.pictureUrl(0, -1).then(data => {
                this.$root.$emit('QR_upload_pic', data.data.token);
              });
            } else {
              this.magnify = true;
            }

          } else if (this.showBTNModel == 3) {//select kone


            if (this.albumDetailShow == false) {
              if (this.selectingArr[this.number] == -1) {//select beshe
                this.$set(this.selectingArr, this.number, 1);
              } else {
                this.$set(this.selectingArr, this.number, -1)
              }
            } else {
              if (this.selectingAlbumDetail[this.number] == -1) {//select beshe
                this.$set(this.selectingAlbumDetail, this.number, 1);
              } else {
                this.$set(this.selectingAlbumDetail, this.number, -1);
              }
            }
          } else if (this.showBTNModel == 2) {//dakhele album
            if (this.number == this.albumData.length - 1 && !this.otherUser) {
              api.pictureUrl(0, this.albumId).then(data => {
                this.$root.$emit('QR_upload_pic', data.data.token);
              });
            } else {
              this.magnify = true;
            }
          }

        }

      }
      ,
      back() {
        if (this.magnify == true) {
          this.magnify = false
          return true
        }


        if (this.showBTNModel == 3) {//delete
          let modelBtn = (this.albumDetailShow) ? 2 : 1;
          this.$root.$emit('reset_selectingArr', modelBtn);
          return true
        }

        if (this.albumDetailShow == true) {
          this.$root.$emit('change_detail_to_album');
          return true
        }

        return false
      }

    }
  }
</script>

<style scoped>
  .select {

    position: absolute;
    width: 24.73px;
    height: 24.73px;
    left: 231.65px;
    top: 12.24px;
    background: #FFFFFF;
    border: 1px solid #D6D3D3;
    box-shadow: 0px 4px 21px rgba(68, 82, 180, 0.32);
    border-radius: 5px;

  }

  .tik {
    position: absolute;
    left: 0px;
    top: 0px;

  }

  .selectHover {
    /*border: 3px solid #5A66BC;*/

  }

  .tikHover {
    display: block !important;
  }

  .albumParent {
    position: absolute;
    width: 1544.88px;
    height: 814px;
    top: 220.91px;
    left: 140px;
    overflow: hidden;

  }

  .albumParentNo {
    position: absolute;
    width: 1744.88px;
    height: 770px;
    top: 288.91px;
    left: 109px;
    overflow: hidden;

  }

  .noImg {
    color: #000000;
    font-size: 20px;
    text-align: right;
    position: absolute;
    width: 1187.88px;
    height: 770px;
    top: 288.91px;
    left: 459px;
    overflow: hidden;
    text-indent: 50px;
  }

  .noImg img {
    position: absolute;
    left: 306px;
  }

  .noImg div {
    position: absolute;
    top: 345px;
    left: 430px;
  }

  .albumChild {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .albumItem {
    position: relative;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
    border-radius: 20px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
    width: 273px;
    height: 214px;
    direction: rtl;
    overflow: hidden;
  }

  .imgShow {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 50%;
    width: 160px;
    height: 160px;
  }


  .imageback {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    background-color: #d7d7d7;
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }

  .boxImg {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%
  }

  .addPic {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: #ebebeb;

  }

  .addPic img {
    position: absolute;
    transform: translate(-50%, -25%);
    top: 25%;
    left: 50%;
  }

  .addPic div {
    position: absolute;
    transform: translate(-50%, -80%);
    top: 80%;
    left: 50%;
    width: 90%;
    text-align: center;
    font-size: 20px;
    color: #4d0d7d
  }

  .hover .addPic {
    background-color: #5b2098 !important;
  }

  .hover .addPic div {
    color: #ebebeb;
  }


  .blurBox {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
  }

  .blur {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-color: #000;
    opacity: 0.8;
  }

  .hover {
    background-color: #5b2098 !important;
  }

  .MagnifyBTN {
    position: absolute;
    width: 214.62px;
    height: 56px;
    left: 46px;

    line-height: 55px;
    font-size: 24px;
    text-align: center;
    color: #3A4AB4;
    background: #FFFFFF;
    border: 1px solid #BCBCBC;
    white-space: nowrap;
    box-shadow: 0px 0px 21px rgba(196, 196, 196, 0.32);
    border-radius: 10px;
  }

  .hoverMagnify {
    border: 4px solid #5A66BC !important;
    box-shadow: 0px 0px 21px rgba(90, 102, 188, 0.32);
    transition: 0.5s;
    transform: scale(1.1);
  }

  .showImgFull {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
  }

  .largBlur {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.9;
    z-index: 10;
  }

  .imgLargSize {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    z-index: 11;
    max-width: 100%;
  }

  .cannotDelet {
    position: absolute;
    min-height: 50px;
    padding: 20px;
    font-size: 20px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    text-align: center;
    background-color: #F9F9F9;
    color: #2c3e50;
    direction: rtl;
    border-radius: 10px;

  }

  .folder {
    position: absolute;
    left: 91.19px;
    top: 14px;
  }

  .albumName {
    position: absolute;
    width: 93%;
    height: 36px;
    left: 11px;
    top: 106.76px;
    line-height: 42px;
    font-size: 21px;
    text-align: center;
    color: #BCBCBC;
    overflow: hidden;
  }

  .albumCnt {

    position: absolute;
    width: 93%;
    height: 36px;
    left: 11px;
    top: 152.91px;
    line-height: 36px;
    font-size: 18px;
    text-align: center;
    color: #BCBCBC;
    text-align: center;
    direction: rtl;
  }

  .hover .albumName,
  .hover .albumCnt {
    color: #ebebeb;
  }
</style>
