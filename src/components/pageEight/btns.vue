<template>

  <div class="btnParent">

    <div v-for="(item , index) in btnData"
         :class="[((ypos == index) && (activeRoute == 1) && (page == active) ?'btnOver':'') , 'btnItem']">
      {{ item.txt }}
    </div>

  </div>

</template>

<script>
  import api from '../../api/userAlbum'
  import {ROAST_CONFIG} from '../../config';
  import {mapGetters} from 'vuex'

  export default {
    name: "btns",
    props: ['btnData', 'active', 'page', 'activeRoute', 'showBTNModel', 'albumId', 'itemLen'],
    data() {
      return {
        imgURL: ROAST_CONFIG.url_comp_server + 'profile/album/',
        ypos: 0,
      }
    },

    watch: {
      btnData: function () {
        this.ypos = 0;
      }
    },
    methods: {
      ...mapGetters([
        'getUser'
      ]),
      down() {
        if (this.ypos < this.btnData.length - 1) {
          this.ypos++;
          return true
        }
        return false
      },
      up() {
        if (this.ypos > 0) {
          this.ypos--;
          return true
        }
        return false;
      },


      enter() {
        this.datas = this.getUser();
        let typeUser = this.datas['type'];


        if (this.showBTNModel == 1) {

          if (this.ypos == 3) {// axe jadid (qr code)(biroone album)


            if (typeUser == 0) {
              this.$root.$emit('popup_signup');
            } else {
              api.pictureUrl(0, -1).then(data => {
                this.$root.$emit('QR_upload_pic', data.data.token);
              });
            }


          } else if (this.ypos == 1) {// album jadid
            if (typeUser == 0) {
              this.$root.$emit('popup_signup');
            } else {
              this.$root.$emit('new_album');
            }

          } else if (this.ypos == 2) {//entekhabe item
            this.$root.$emit('select_album_item');
          } else if (this.ypos == 0) { // profile image

            if (typeUser == 0) {
              this.$root.$emit('popup_signup');
            } else {
              api.pictureUrl(1, -1).then(data => {
                this.$root.$emit('QR_upload_pic_for_profile', data.data.token);
              });
            }

          }
        }


        if (this.showBTNModel == 3) {//faghat delete
          this.$root.$emit('delete_picture');
        }


        if (this.showBTNModel == 2) {//new image va delete album va select item (dakhele album)


          if (this.ypos == 0) {//delete album
            api.albumDelete(this.albumId).then(data => {
              if (data.success == true) {
                this.$root.$emit('delete_album');
              }
            })


          } else if (this.ypos == 1) {// select item

            if (this.itemLen != 0)
              this.$root.$emit('select_album_item');

          } else if (this.ypos == 2) {//add image

            if (typeUser == 0) {
              this.$root.$emit('popup_signup');
            } else {
              api.pictureUrl(0, this.albumId).then(data => {
                this.$root.$emit('QR_upload_pic', data.data.token);
              });
            }


          }
        }
      }
    }
  }
</script>

<style scoped>
  .btnParent {
    position: absolute;
    width: 180px;
    height: 375px;
    top: 231px;
    right: 87px;
    /*border: 1px solid red;*/
  }


  .btnItem {
    position: relative;
    float: left;
    margin-left: 0px;
    width: 180px;
    height: 50px;
    margin-top: 10px;
    line-height: 55px;
    font-size: 20px;
    text-align: center;
    color: #410988;
    white-space: nowrap;
    border-radius: 10px;
    background-color: #ebebeb;
  }

  .btnOver {

    color: #ebebeb;
    background-color: #410988;
  }

</style>
