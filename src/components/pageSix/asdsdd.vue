<template>
  <div class="page">

    <profileMenue :active="0" :page="ypos" ref="profileMenue" :activeRoute="activeRoute"
                  v-if="visitOtherUserProfile == false"></profileMenue>

    <div style=" position: absolute;top: 80px;left: 70px" v-if="userData != ''">

      <img src="../assets/images/six/PLACE-HOLDER2.png" class="profileCover">
      <img :src=" imgURL +userData['details'][0]['picture'] " class="profileImg">

      <!--<div v-if="userData['details'][0]['name'] == null || userData['details'][0]['name'] == '' " class="userName">{{ userData['details'][0]['username'] }}</div>-->
      <!--<div v-else class="userName"> {{ userData['details'][0]['name'] + ' '+ userData['details'][0]['family_name'] }}</div>-->


      <div class="userName"> {{ userData['details'][0]['username'] }}</div>


      <div v-if="visitOtherUserProfile == false"
           :class="[((ypos == 1) && (xpos == 0) && (activeRoute == 1) ?'btnOver':'') , 'changePicBtn']"><b>تغییر
        تصویر</b></div>
      <div v-if="visitOtherUserProfile == false"
           :class="[((ypos == 1) && (xpos == 1) && (activeRoute == 1) ?'btnOver':'') , 'completeProfileBtn']"
           style="display: none"><b>تکمیل
        پروفایل</b></div>

    </div>

    <div class="lineH"></div>
    <userProfileInfo :userData="userData" v-if="userData != '' && visitOtherUserProfile == false"></userProfileInfo>

    <userFriend :type="'small'" :active="2" :page="ypos" :userFriends="userFriends"
                v-if="userFriends != ''"></userFriend>

    <userMedals :type="'small'" :userData="userData" v-if="userData != ''"></userMedals>


    <QRcode v-if="barCodeShow == true" :url="url"></QRcode>

    <userScore v-if="visitOtherUserProfile == true && userData != ''" :userData="userData"></userScore>

  </div>

</template>

<script>
  import userProfileInfo from '../components/pageSix/userProfileInfo'
  import userFriend from '../components/pageSix/userFriend'
  import userMedals from '../components/pageSix/userMedals'
  import profileMenue from '../components/pageSix/profileMenue'
  import {mapGetters} from 'vuex'
  import api from '../api/profile'
  import {ROAST_CONFIG} from '../config';
  import QRcode from '../components/pageEight/QRcode'
  import userScore from '../components/pageSix/userScore'

  export default {
    name: "six",
    data() {
      return {

        ypos: 0,//0->menu , 1->takmil profile & taghire tasvir , 2->friends
        xpos: 0,//0->tahire tasvir;1->takmil profile
        active: 0,//0->menu,
        userData: '',
        userFriends: '',
        activeRoute: 1,
        imgURL: ROAST_CONFIG.URL_IMAGE,
        barCodeShow: false,
        url: '',
        otherUserProfile: this.$route.query.otherUserProfile,
        otherUserId: this.$route.query.userId,
        visitOtherUserProfile: false,
        visitor: ''
      }
    }, activated() {

      if (this.visitOtherUserProfile == true) {

        this.$root.$emit('sideMenu_active');
        this.activeRoute = 1;
      }
    },
    activated() {

      if (this.visitOtherUserProfile == true) {

        this.$root.$emit('sideMenu_active');
        this.activeRoute = 1;
      }
    },

    created() {

      if (typeof this.otherUserProfile == "undefined") {
        this.visitor = this.getUser().userID;
        this.visitOtherUserProfile = false;
      } else {
        this.visitor = this.otherUserId;
        this.visitOtherUserProfile = true;
        this.$root.$emit('sideMenu_active');
        this.activeRoute = 1;
        // this.small = 3
      }

      api.profileData(this.visitor, this.getUser().userID).then(data => {
        this.userData = data;
        // console.log('this.userData ----->'+JSON.stringify(this.userData))
        if (this.visitOtherUserProfile == false) {
          api.friends(this.getUser().userID).then(datas => {
            this.userFriends = datas;
          })
        }
      })


    },
    components: {
      userProfileInfo,
      userFriend,
      userMedals,
      profileMenue,
      QRcode,
      userScore
    },
    methods: {
      ...mapGetters([
        'getUser'
      ]),
      removeOver() {
        this.$root.$emit('sideMenu_active');
        this.activeRoute = 0;
      },
      addOver() {
        this.$root.$emit('sideMenu_deactive');
        this.activeRoute = 1;
      },
      right() {
        if (this.ypos == 0) {
          if (!this.$refs.profileMenue.right()) {
            this.removeOver();
          }
        } else if (this.ypos == 1) {

          this.removeOver();

          // if (this.xpos == 1) {
          //     this.removeOver();
          // } else {
          //     this.xpos = 1
          // }
        }
      },
      left() {
        // alert(this.ypos  +'******' + this.xpos)
        if (this.ypos == 0) {
          if (!this.$refs.profileMenue.left()) {
            this.activeRoute = 0;
            this.$root.$emit('leftside_active');
          }
        } else if (this.ypos == 1) {
          if (this.xpos == 1) {
            this.xpos = 0;
          } else if (this.xpos == 0) {
            this.activeRoute = 0;
            this.$root.$emit('leftside_active');
          }
        }
      },
      down() {
        // alert('this------>'+this.activeRoute)
        if (this.ypos == 0) {
          if (!this.$refs.profileMenue.down() && this.visitOtherUserProfile == false) {
            this.ypos++;
          }
        } else if (this.ypos == 1) {
          this.ypos++;
        }
      },
      up() {
        if (this.ypos > 0) {
          this.ypos--;
        }
      },
      enter() {
        if (this.ypos == 1) {
          if (this.xpos == 0) {//taghire tasvir
            this.barCodeShow = true
            this.url = encodeURIComponent(ROAST_CONFIG.URL_Oldssn + "/?act=qr&type=view&u=" + this.getUser().u);
          }
        } else if (this.ypos == 0) {
          let pageing = this.$refs.profileMenue.enter();
          let time = new Date().getTime();

          //if ((pageing == 0)) {//album
          this.$router.push({path: '/eight/' + time, query: {'type': pageing, 'object': this.userData}});
          //}
        }
      },
      back() {
        // alert('kkkkkkkkkk')
        // alert(this.visitOtherUserProfile )
        if (this.visitOtherUserProfile == true) {
          this.addOver()
          this.$router.go(-1);
          return false
        } else {
          if (this.barCodeShow == true) {
            //console.log('000')
            this.barCodeShow = false
            return false
          }
          else {
            //console.log('1111')
            this.$router.go(-1);
            return false
          }
        }
        //  console.log('this.barCodeShow =>' + this.barCodeShow)

      }

    }
  }
</script>

<style scoped>
  .page {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 1920px;
    height: 1080px;
  }

  .profileCover {
    position: absolute;
    top: 80px;
    box-shadow: 0px 4px 21px rgba(59, 134, 200, 0.5);
    border-radius: 20px;
    left: 0px;
  }

  .profileImg {
    position: absolute;
    width: 104.64px;
    height: 104.64px;
    left: 1612.63px;
    top: 468px;
    border-radius: 50px;
  }

  .userName {
    position: absolute;
    width: 161px;
    height: 62px;
    left: 1404.95px;
    top: 490px;
    line-height: 70px;
    font-size: 36px;
    text-align: center;
    white-space: nowrap;
    color: #FFFFFF;
    direction: rtl;
  }

  .changePicBtn {
    position: absolute;
    width: 214.62px;
    height: 56px;
    left: 57px;
    top: 533px;
    line-height: 50px;
    font-size: 24px;
    text-align: center;
    color: #3A4AB4;
    background: #FFFFFF;
    border: 1px solid #BCBCBC;
    white-space: nowrap;
    box-shadow: 0px 0px 21px rgba(196, 196, 196, 0.32);
    border-radius: 10px;
  }

  .lineH {
    position: absolute;
    width: 1737px;
    height: 0px;
    left: 88px;
    top: 745px;
    border: 1px solid #D6D3D3;
  }

  .completeProfileBtn {
    position: absolute;
    width: 214px;
    height: 56px;
    left: 296px;
    top: 533px;
    background: #FFFFFF;
    border: 1px solid #BCBCBC;
    box-shadow: 0px 0px 21px rgba(196, 196, 196, 0.32);
    border-radius: 10px;
    line-height: 50px;
    font-size: 24px;
    text-align: center;
    color: #3A4AB4;
  }

  .btnOver {
    transition: 0.5s;
    transform: scale(1.1);
    color: #4452B4;
    border: 4px solid #4452B4;
  }
</style>
