<template>
  <div>
    <img v-if="isSplash==1" id="splash"
         :src="imgAdrs+'ssn/images/SplashScren.jpg?t='+new Date().getMonth()+'-'+ Math.floor((new Date().getDate()) / 7)">
    <div v-if="isSplash==0">
      <div v-show="pageNum==1 && isHamsam==1" class="logIn">
        <div class="LoginTitle">
          ورود به هم سام
        </div>

        <div style="position: absolute;width: 1px;height:864px;left: 1544px;top: 123px;background: #BCBCBC;"></div>
        <div style="position: absolute;width: 1px;height:864px;left: 376px;top: 123px;background: #BCBCBC;"></div>
        <div style="position: absolute;width: 459px;height:1px;left: 730px;top: 758px;background: #BCBCBC;"></div>
        <div style="position: absolute;width: 1px;height:312px;left: 959px;top: 365px;background: #BCBCBC;"></div>
        <img style="position: absolute;width: 82.97px;height: 109px;left: 629px;top: 231px;"
             src="../assets/images/Login/gestUser.png">
        <img style="position: absolute;width: 82.97px;height: 109px;left: 1209px;top: 226px;"
             src="../assets/images/Login/user.png">
        <div
          style="left: 515px;top: 378px;position: absolute;width: 310px;height: 63px;line-height: normal;font-size: 36px;text-align: right;color: #3B4191;">
          ورود به عنوان مهمان
        </div>
        <div
          style="top: 378px;left: 1094px;position: absolute;width: 313px;height: 63px;line-height: normal;font-size: 36px;text-align: right;color: #3B4191;">
          ورود به حساب کاربری
        </div>
        <div
          style="direction: rtl;top: 477px;left: 432px;position: absolute;width: 476px;height: 83px;line-height: normal;font-size: 24px;text-align: center;color: #8C8C8C;">
          در صورتی که در هم سام حساب کاربری ندارید ، بر روی دکمه ثبت ورود مهمان کلیک کنید .
        </div>
        <div
          style="direction: rtl;top: 477px;left: 1012px;position: absolute;width: 476px;height: 83px;line-height: normal;font-size: 24px;text-align: center;color: #8C8C8C;">
          در صورتی که در هم سام حساب کاربری دارید ، بر روی دکمه ورود کلیک کنید .
        </div>
        <div
          style="direction: rtl;top: 477px;left: 711px;top: 814px;position: absolute;width: 476px;height: 83px;line-height: normal;font-size: 24px;text-align: center;color: #8C8C8C;">
          در صورتی که در هم سام حساب کاربری ندارید ، بر روی دکمه ثبت نام کلیک کنید .
        </div>
        <div :class="[YP1 == 0 && XP1==1 ? 'btn-big' : 'btn-small','btn-white']"
             style="position: absolute;color:#9B51E0;left: 574px;top: 622px">ورود مهمان
        </div>
        <div :class="[YP1 == 0 && XP1==0 ? 'btn-big' : 'btn-small','btn-pink']"
             style="position: absolute;color:white;left: 1154px;top: 622px">ورود
        </div>
        <div :class="[YP1 == 1  ? 'btn-big' : 'btn-small','btn-greenBlue']"
             style="position: absolute;color:white;left: 863px;top: 933px">ثبت نام
        </div>
      </div>
      <div v-show="pageNum==1 && isHamsam==0" class="logIn">
        <div class="LoginTitle">
          ورود به هم سام
        </div>

        <div style="position: absolute;width: 1px;height:864px;left: 1544px;top: 123px;background: #BCBCBC;"></div>
        <div style="position: absolute;width: 1px;height:864px;left: 376px;top: 123px;background: #BCBCBC;"></div>
        <div style="position: absolute;width: 459px;height:1px;left: 730px;top: 758px;background: #BCBCBC;"></div>


        <img style="position: absolute;width: 82.97px;height: 109px;left: 915px;top: 226px;"
             src="../assets/images/Login/user.png">

        <div
          style="top: 378px;left: 807px;position: absolute;width: 313px;height: 63px;line-height: normal;font-size: 36px;text-align: right;color: #3B4191;">
          ورود به حساب کاربری
        </div>

        <div
          style="direction: rtl;top: 477px;left: 711px;position: absolute;width: 476px;height: 83px;line-height: normal;font-size: 24px;text-align: center;color: #8C8C8C;">
          در صورتی که در هم سام حساب کاربری ندارید ، بر روی دکمه ثبت نام کلیک کنید .
        </div>
        <div
          style="direction: rtl;left: 711px;top: 814px;position: absolute;width: 476px;height: 83px;line-height: normal;font-size: 24px;text-align: center;color: #8C8C8C;">
          در صورتی که در هم سام حساب کاربری ندارید ، بر روی دکمه ثبت نام کلیک کنید .
        </div>

        <div :class="[YP1 == 0  ? 'btn-big' : 'btn-small','btn-pink']"
             style="position: absolute;color:white;left: 838px;top: 622px">ورود
        </div>
        <div :class="[YP1 == 1  ? 'btn-big' : 'btn-small','btn-greenBlue']"
             style="position: absolute;color:white;left: 838px;top: 933px">ثبت نام
        </div>
      </div>
      <div v-show="pageNum==2" class="logIn">
        <div
          style="position: absolute;width: 230px;height: 63px;left: 863px;top: 196px;line-height: normal;font-size: 36px;text-align: right;color: #3B4191;">
          ورود به هم سام

        </div>

        <div style="position: absolute;width: 1px;height:700px;left: 497px;top:205px;background: #BCBCBC;"></div>
        <div style="position: absolute;width: 1px;height:700px;left: 1424px;top: 205px;background: #BCBCBC;"></div>


        <div
          style="direction: rtl;left: 711px;top: 296px;position: absolute;width:500px;height: 83px;line-height: normal;font-size: 24px;text-align: center;color: #8C8C8C;">
          برای ورود به شبکه اجتماعی هم سام ، نام کاربری و رمز عبور خود را وارد نمایید .
        </div>
        <div :class="[YP2 == 0   ? 'input-big' : 'input-small']" style="left: 734px;top: 434px;">
          <img class="inputImg-small" src="../assets/images/Login/Phone.png">
          <input v-model="Phone2" placeholder="شماره تلفن همراه خود را وارد کنید" class="mainInput-samal"
                 id="Phone2"
                 style="" v-validate="'required|max:11|min:11'"
                 name="تلفن">
        </div>
        <div :class="[YP2 == 1   ? 'input-big' : 'input-small']" style="left: 734px;top:519px;">
          <img class="inputImg-small" src="../assets/images/Login/key.png">
          <input v-model="Key2" placeholder="رمز عبور خود را وارد کنید" class="mainInput-samal" id="Key2"
                 style=""
                 v-validate="'required|max:11'"
                 name="پسورد" type="password">
        </div>

        <div :class="[YP2 == 2 && XP2 == 0  ? 'btn-big' : 'btn-small','btn-pink']"
             style="position: absolute;color:white;left: 973px;top:634px">ورود
        </div>
        <div :class="[YP2 == 2  && XP2 == 1 ? 'btn-big' : 'btn-small','btn-white']"
             style="position: absolute;color:#3A4AB4;left: 734px;top:634px">فراموشی
          رمز
        </div>
      </div>
      <div v-show="pageNum==3 " class="logIn">
        <div
          style="position: absolute;width: 272px;height: 63px;left: 827px;top: 196px;line-height: normal;font-size: 36px;text-align: right;color: #3B4191;">
          ثبت نام در هم سام
        </div>

        <div style="position: absolute;width: 1px;height:700px;left: 497px;top:205px;background: #BCBCBC;"></div>
        <div style="position: absolute;width: 1px;height:700px;left: 1424px;top: 205px;background: #BCBCBC;"></div>


        <div
          style="direction: rtl;left: 711px;top: 296px;position: absolute;width:500px;height: 83px;line-height: normal;font-size: 24px;text-align: center;color: #8C8C8C;">
          در صورتی که در هم سام حساب کاربری ندارید ، بر روی دکمه ثبت نام کلیک کنید .
        </div>
        <div :class="[YP3 == 0   ? 'input-big' : 'input-small']" style="left: 734px;top: 434px;">
          <img class="inputImg-small" src="../assets/images/Login/Phone.png">
          <input v-model="Phone3" placeholder="شماره تلفن همراه خود را وارد کنید" class="mainInput-samal"
                 id="Phone3"
                 style="" v-validate="'required|max:11|min:11'"
                 name="تلفن">
        </div>
        <div style="font-size: 20px ;direction: rtl;text-align: center;width: 100%;position: absolute;top: 650px"> در
          صورت بروز مشکل در این فرایند با شماره ی
          <span style="direction: ltr;font-size: 22px ; font-weight: bold">88888219 - 021</span>
          تماس حاصل فرمایید
        </div>
        <div :class="[YP3 == 1   ? 'btn-big' : 'btn-small','btn-greenBlue']"
             style="position: absolute;color:white;left: 869px;top: 550px">ثبت نام
        </div>
      </div>

      <div v-show="pageNum==4 " class="logIn">
        <div v-if="isRegister==1"
             style="position: absolute;width: 272px;height: 63px;left: 825.5px;;top: 196px;line-height: normal;font-size: 36px;text-align: right;color: #3B4191;">
          ثبت نام در هم سام
        </div>
        <div v-if="isRegister==0"
             style="position: absolute;width: 272px;height: 63px;left: 825.5px;;top: 196px;line-height: normal;font-size: 36px;text-align: right;color: #3B4191;">
          فراموشی پسورد
        </div>
        <input v-model="Key4"
               id="Key4" v-validate="'required|length:4'" name="کد فعالسازی">
        <div style="position: absolute;top: 425px;left:850px;">
          <div :class="[YP4 == 0   ? 'color-BC-big' : 'color-BC-small','']"
               style="position:relative;height: 1px;float: left;margin-left:0px "></div>
          <div :class="[YP4 == 0   ? 'color-BC-big' : 'color-BC-small','']"
               style="position:relative;height: 1px;float: left;margin-left:26px "></div>
          <div :class="[YP4 == 0   ? 'color-BC-big' : 'color-BC-small','']"
               style="position:relative;height: 1px;float: left;margin-left:26px "></div>
          <div :class="[YP4 == 0   ? 'color-BC-big' : 'color-BC-small','']"
               style="position:relative;height: 1px;float: left;margin-left:26px "></div>
          <!--          <div :class="[YP4 == 0   ? 'color-BC-big' : 'color-BC-small','']"-->
          <!--               style="position:relative;height: 1px;float: left;margin-left:26px "></div>-->
          <!--          <div :class="[YP4 == 0   ? 'color-BC-big' : 'color-BC-small','']"-->
          <!--               style="position:relative;height: 1px;float: left;margin-left:26px "></div>-->


        </div>
        <div style="position: absolute;width: 1px;height:700px;left: 497px;top:205px;background: #BCBCBC;"></div>
        <div style="position: absolute;width: 1px;height:700px;left: 1424px;top: 205px;background: #BCBCBC;"></div>


        <div
          style="direction: rtl;left: 658px;top: 282px;position: absolute;width:618px;height: 42px;line-height: normal;font-size: 24px;text-align: center;color: #565656;">
          کد ارسالی به تلفن همراهتان را وارد کنید .
        </div>


        <div :class="[YP4 == 1   ? 'btn-big' : 'btn-small','btn-greenBlue']"
             style="position: absolute;color:white;left: 870px;top: 496px">تایید
        </div>
        <div style="position: absolute;width: 614px;height:1px;left: 644px;top: 610px;background: #C0C0C0;"></div>

        <div
          style="direction: rtl;left: 740px;top: 656px;position: absolute;width:466px;height: 42px;line-height: normal;font-size: 24px;text-align: center;color: #565656;">
          در صورتی که کد فعال سازی را دریافت نکرده اید
        </div>
        <div :class="[YP4 == 2   ? 'btn-big' : 'btn-small','btn-green']"
             style="position: absolute;color:white;left: 870px;top: 752px">ارسال مجدد
          کد
        </div>
        <div style="font-size: 20px ;direction: rtl;text-align: center;width: 100%;position: absolute;top: 622px"> در
          صورت بروز مشکل در این فرایند با شماره ی
          <span style="direction: ltr;font-size: 22px ; font-weight: bold">88888219 - 021</span>
          تماس حاصل فرمایید
        </div>
      </div>
      <div v-show="pageNum==5 " class="logIn">
        <div
          style="position: absolute;width: 272px;height: 63px;left: 827px;top: 196px;line-height: normal;font-size: 36px;text-align: right;color: #3B4191;">
          فراموشی رمز عبور
        </div>

        <div style="position: absolute;width: 1px;height:700px;left: 497px;top:205px;background: #BCBCBC;"></div>
        <div style="position: absolute;width: 1px;height:700px;left: 1424px;top: 205px;background: #BCBCBC;"></div>


        <div
          style="direction: rtl;left: 711px;top: 296px;position: absolute;width:500px;height: 83px;line-height: normal;font-size: 24px;text-align: center;color: #8C8C8C;">
          در صورت فراموش کردن رمز عبور خود ، شماره تلفنی که آن را ثبت نام کرده اید وارد نمایید .
        </div>
        <div style="left: 734px;top: 434px;" :class="[YP5 == 0   ? 'input-big' : 'input-small','']">
          <img class="inputImg-small" src="../assets/images/Login/Phone.png">
          <input id="Phone5" placeholder="شماره تلفن همراه خود را وارد کنید" v-model="Phone5"
                 class="mainInput-samal"
                 style=""
                 v-validate="'required|max:11|min:11'" name="تلفن">
        </div>

        <div :class="[YP5 == 1   ? 'btn-big' : 'btn-small','btn-greenBlue']"
             style="position: absolute;color:white;left: 869px;top: 550px">بعدی
        </div>
        <div style="font-size: 20px ;direction: rtl;text-align: center;width: 100%;position: absolute;top: 650px"> در
          صورت بروز مشکل در این فرایند با شماره ی
          <span style="direction: ltr;font-size: 22px ; font-weight: bold">88888219 - 021</span>
          تماس حاصل فرمایید
        </div>

      </div>
      <div v-show="pageNum==6" class="logIn">
        <div
          style="position: absolute;width: 212px;height: 63px;left: 855px;top: 211px;line-height: normal;font-size: 36px;text-align: right;color: #3B4191;">
          تغییر رمز عبور

        </div>

        <div style="position: absolute;width: 1px;height:700px;left: 497px;top:205px;background: #BCBCBC;"></div>
        <div style="position: absolute;width: 1px;height:700px;left: 1424px;top: 205px;background: #BCBCBC;"></div>


        <div
          style="direction: rtl;left: 711px;top: 296px;position: absolute;width:500px;height: 83px;line-height: normal;font-size: 24px;text-align: center;color: #8C8C8C;">
          برای ورود به شبکه اجتماعی هم سام ، نام کاربری و رمز عبور خود را وارد نمایید .
        </div>
        <div :class="[YP6 == 0   ? 'input-big' : 'input-small','']" style="left: 734px;top: 434px;">
          <img class="inputImg-small" src="../assets/images/Login/key.png">
          <input v-model="Pass6" id="Pass6" placeholder="رمز عبور جدید" class="mainInput-samal" style="">
        </div>
        <div :class="[YP6 == 1   ? 'input-big' : 'input-small','']" style="left: 734px;top:519px;">
          <img class="inputImg-small" src="../assets/images/Login/key.png">
          <input v-model="Repass6" id="Repass6" placeholder="تکرار رمز عبور" class="mainInput-samal" style="">
        </div>

        <div :class="[YP6 == 2   ? 'btn-big' : 'btn-small','btn-greenBlue']"
             style="position: absolute;color:white;left: 853px;top:634px">ثبت
        </div>
        <div style="font-size: 20px ;direction: rtl;text-align: center;width: 100%;position: absolute;top: 650px"> در
          صورت بروز مشکل در این فرایند با شماره ی
          <span style="direction: ltr;font-size: 22px ; font-weight: bold">88888219 - 021</span>
          تماس حاصل فرمایید
        </div>

      </div>
      <div v-if="(errorlogin.length>0 || errorAjax!='')" class="error-holder">
        <div v-for="error in errorlogin">
          <div>{{ error }}</div>
        </div>
        <div v-if="(errorAjax!='')">{{ errorAjax }}</div>
      </div>

      <img class="HamsamLogo" src="../assets/images/Login/HamsamIcon.png">
    </div>
  </div>

</template>


<script>
import Auth from '../js/auth'
import {mapMutations} from 'vuex'
import {mapGetters} from 'vuex'
import {ROAST_CONFIG} from '../config'
import func from '../mixins/func'
import ajaxback from '../api/ajax'
import login from '../api/login'
import challenge from '../api/challenge'
import {page} from 'vue-analytics'

export default {
  name: "Seven",
  mixins: [func],
  data() {
    return {
      imgAdrs: ROAST_CONFIG.URL_IMAGE,
      isSplash: this.getStateSpalsh(),
      pageNum: 1,
      isHamsam: 1,
      Phone2: '',
      Key2: '',
      Phone3: '',
      Key4: '',
      Phone5: '',
      Pass6: '',
      Repass6: '',
      YP1: 0, YP2: 0, YP3: 0, YP4: 0, YP5: 0, YP6: 0,
      XP1: 0, XP2: 0, XP3: 0, XP4: 0, XP5: 0, XP6: 0,
      errorlogin: [],
      errorAjax: [],
      isRegister: 0,
      token: '',
      appName: "hamsam",
      documentsDir: "",
      FileName: "samsung-TK",
      isFile: 0,
      FileSelected: "",
      modeDebug: false,
      fromSabtnam: this.$route.query
    }
  },
  created() {
    //  console.log("this.isSplashhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh h", this.isSplash)

    if (this.isSplash && !this.modeDebug) {

      this.loadFile()

    } else if (this.isSplash && this.modeDebug) {
      this.showLogin()
      //  console.log("ffffffffffffffffffffffffffffffffff",this.FileSsystem("samsung-TK","read"))
    }

    // alert('page 7');
    // console.log('pageeeeeeeeeeee 7');

    //  this.hideSplash = 0;
    this.$root.$emit('sideMenu_deactive');
    this.$root.$emit('sideMenu_hide');
    this.$root.$emit('leftside_hide');
    this.$root.$emit('header_hide');
    //if((this.getUser())==0) {
    //alert(this.getParam('Islogout'));
    //this.clearParam();


    /*if(this.getParam('seckret key') != '' && this.getParam('seckret key') != null){
    //alert(this.getParam('seckret key'))
    }else{
        this.LoggedIn = 1;
    }
    */


    /*setTimeout(function () {
      //alert('time out');
      //console.log('main.getParam(\'Islogout\')-?'+main.getParam('Islogout'));
      if (main.getParam('Islogout') != '2') {
        //console.log('bala in logeed in 7');

        Auth.methods.isLoggedIn().then(data => {
          // console.log(this.getUser());
          main.fillUser(data);
          //console.log(this.getUser());
        });
      } else {
        main.LoggedIn = 1;
        main.setParam('Islogout', '1');
      }
    }, 1);*/

    // }else{
    // //  this.LoggedIn = 1;
    //     }
  }, watch: {
    pageNum: function () {
      if (this.pageNum != 4) {
        //  alert(this.pageNum)
        this.Phone5 = ''
        this.Phone3 = ''
      }
      this.errorlogin = [];
      //
      // this.Phone2 = '09102383575',
      //   this.Key2 = 'randh',

        // this.Phone2 = '09354596624',
        // this.Key2 = '54fiH',

        // this.Phone2 = '09352793516',
        // this.Key2 = '4wHsja',


        // this.Phone2 = '09124703854',
        //   this.Key2 = 'FGZjxZ',

        this.Phone2 = '',
        this.Key2 = '',

        this.Key4 = '',

        this.Pass6 = '',
        this.Repass6 = '',
        this.errorAjax = ''

    }
  }, methods: {
    ...mapMutations([
      'setUser', // map `this.add()` to `this.$store.commit('increment')`
      'setSsnUser',
      'setUserTv',
      'startSocket',
      'setAccesToken',
      'hideSplash'
    ]),
    ...mapGetters([
      'access_token',
      'getUser',
      'getSsnUser',
      'getModelTv',
      'getTvDetail',
      'getSocket',
      'getStateSpalsh'
    ]), checkTocken(token) {
      let _this = this;
      if ((new Date).getTime() >= token.expires_in) {
        login.refreshToken(token.refresh_token).then(data => {
          //    console.log("refeshhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", data)
          if ("access_token" in data) {
            //data["data"]["access_token"], data["data"]["refresh_token"], data["data"]["expires_in"]
            _this.ssnLogin(data["access_token"], data["refresh_token"], data["expires_in"])

          } else {
            _this.showLogin()
          }
        });

      } else {
        //  console.log("ffffffffffffffffdataaaaaaaaaa", token)
        _this.succesLogin(token.access_token)
      }
      /*  token.access_token
        token.refresh_token*/

    }, withotFileToken() {
      console.log(this.isHamsam , this.getParam('guest_token'))
      if (this.isHamsam) {//hamsam ast
        if (this.getParam('guest_token') != '' && this.getParam('guest_token') != null) {//token mehman darad
          this.succesLogin(this.getParam('guest_token'))
        } else {
          //  this.showLogin();
          login.loginGuest().then(data => {
            //      console.log('data tooooooooooooooooooooook ====>' + data)
            if (data["success"] == true) {
              this.setParam('guest_token', data["data"]["access_token"]);
              this.succesLogin(data["data"]["access_token"]);
            }
          });

        }
      } else {
        this.showLogin();
      }
    }, showLogin() {

      if (this.getStateSpalsh == 1 || this.isSplash == 1) {
        this.hideSplash()
        this.isSplash = 0
      }


    },
    succesLogin(token) {
      //   console.log("succesLoginnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
      var _this = this

      this.setAccesToken(token)
      this.startSoucket("Bearer " + token)

      //  this.getProfile()


    },
    ssnLogin(token, refresh_token, expires_in) {

      //   console.log("ssnLoginnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
      if (!this.modeDebug) {
        this.DeleteFile(this.FileName, token, refresh_token, expires_in)

      } else {
        this.succesLogin(token)
      }


    }, startSoucket(token) {
      this.startSocket()

      //  console.log( this.getSocket())

      this.getSocket().emit("login", token, this.appName); //login

    }, getProfile() {

      login.GetProfile().then(data => {

        if (data["success"] = true) {
          //   console.log("profileeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", data)
          this.fillUser(data["data"])
          if (this.getParam('Chanse_date') == '' || this.getParam('Chanse_date') == null || this.getParam('Chanse_date') != new Date().getDay()) {
            this.$root.$emit('Chanse_on', 1);
          }
        } else {
          this.showLogin();
        }
      });
      if (this.access_token() != '') {


        challenge.challengeApp(1, 1).then(data => {

          if (data["success"] = true) {

            //      console.log("starttttttttttt app  -------->", data)


          } else {

          }
        });
        challenge.challengeApp(35, 1).then(data => {

          if (data["success"] = true) {

            //  console.log("challenge app  -------->", data)


          } else {

          }
        });
      }

    },
    fillUser(data) {
      //alert('fiiiill');
      // this.LoggedIn = 1;
      if (data["success"] = true) {

        // this.setParam('Islogout', '');


        this.setUser(data);
        //   console.log('seveeeeeeeeeeeen ->' + JSON.stringify(data))
        this.$root.$emit('header_show');
        this.$root.$emit('sideMenu_show');
        this.$root.$emit('leftside_show');


        this.$router.push({path: '/one/' + new Date().getTime()});
        setTimeout(() => {
          this.showLogin();
        }, 5000);


        /* try {
             //console.log('tvvvvvvvv ------->' + this.getModelTv());
             if (this.getModelTv() == "tizen") {
                 //  console.log('tizen');
                 var infoAPP = tizen.application.getAppInfo(null);
                 var apppackageIDApp = infoAPP.packageId;
                 cntTime = 0;
                 clearInterval(infoSsn.intervalClick);
                 //console.log('clear');
                 ajaxSsn("POST", urlSsn + "?act=deviceDetail&type=insert&cnttime=" + cntTime, funSuccess, {
                     detail: JSON.stringify(infoSsn.getProduct())
                 });

             } else {
                 cntTime = 0;
                 clearInterval(infoSsn.intervalClick);
                 ajaxSsn("POST", urlSsn + "?act=deviceDetail&type=oldInsert&isold=1&cnttime=" + cntTime, SuccessDeviceDetail, {
                     detail: JSON.stringify(infoSsn.getProduct())
                 });
             }

         } catch (error) {
             // console.log('catchhh');
         }*/


      }

      this.setUserTv(JSON.parse(this.fillUserTv(this.getModelTv())));
      //console.log('tv detail->',this.getTvDetail());
    }, up: function () {
      if (this.pageNum == 1) {
        if (this.YP1 != 0) {
          this.YP1--
        }
      } else if (this.pageNum == 2) {
        if (this.YP2 != 0) {
          this.YP2--
        }
      } else if (this.pageNum == 3) {
        if (this.YP3 != 0) {
          this.YP3--
        }
      } else if (this.pageNum == 4) {
        if (this.YP4 != 0) {
          this.YP4--
        }
      } else if (this.pageNum == 5) {
        if (this.YP5 != 0) {
          this.YP5--
        }
      } else if (this.pageNum == 6) {
        if (this.YP6 != 0) {
          this.YP6--
        }
      }
    }
    ,
    down: function () {
      // this.hideKeyboards();
      if (this.pageNum == 1) {
        //console.log(this.YP1);
        if (this.YP1 != 1) {
          this.YP1++
          // console.log(this.YP1);
        }
      } else if (this.pageNum == 2) {
        if (this.YP2 != 2) {
          this.YP2++
        }
      } else if (this.pageNum == 3) {
        if (this.YP3 != 1) {
          this.YP3++
        }
      } else if (this.pageNum == 4) {
        if (this.YP4 != 2) {
          this.YP4++
        }
      } else if (this.pageNum == 5) {
        if (this.YP5 != 1) {
          this.YP5++
        }
      } else if (this.pageNum == 6) {
        if (this.YP6 != 2) {
          this.YP6++
        }
      }

    }
    ,
    left: function () {
      if (this.pageNum == 1 && this.isHamsam == 1) {
        if (this.XP1 == 0 && this.YP1 == 0) {
          this.XP1++
        }
      } else if (this.pageNum == 2) {
        if (this.XP2 == 0 && this.YP2 == 2) {
          this.XP2++
        }

      } else if (this.pageNum == 3) {

      } else if (this.pageNum == 4) {

      } else if (this.pageNum == 5) {

      } else if (this.pageNum == 6) {

      }
    }
    ,
    right: function () {
      if (this.pageNum == 1 && this.isHamsam == 1) {
        if (this.XP1 == 1 && this.YP1 == 0) {
          this.XP1--
        }
      } else if (this.pageNum == 2) {
        if (this.XP2 == 1 && this.YP2 == 2) {
          this.XP2--
        }
      } else if (this.pageNum == 3) {

      } else if (this.pageNum == 4) {

      } else if (this.pageNum == 5) {

      } else if (this.pageNum == 6) {

      }
    }
    ,
    enter: function () {
      //console.log('page num->',this.pageNum);
      // alert(this.pageNum + ' ' + this.XP2 + ' ' + this.YP2);
      var _this = this;
      if (this.pageNum == 1) {                      //safeye entekhab
        if (this.XP1 == 0 && this.YP1 == 0) { //boro login
          page({
            page: 'entry to login',
            title: 'entry to login'
          })
          this.pageNum = 2;
        } else if (this.XP1 == 1 && this.YP1 == 0) { //guest
          page({
            page: 'guest entry to app',
            title: 'guest entry to app'
          })

          login.loginGuest().then(data => {
            //      console.log('data tooooooooooooooooooooook ====>' + data)
            if (data["success"] == true) {
              _this.setParam('guest_token', data["data"]["access_token"]);
              _this.succesLogin(data["data"]["access_token"]);


            }
          });
        } else if (this.YP1 == 1) { //boro signup
          page({
            page: 'entry to signup',
            title: 'entry to signup'
          })
          this.pageNum = 3;
        }
      } else if (this.pageNum == 2) {  //safe login

        if (this.XP2 == 0 && this.YP2 == 0) {
          this.showIme('Phone2');
        } else if (this.XP2 == 0 && this.YP2 == 1) {
          this.showIme('Key2');
        } else if (this.XP2 == 0 && this.YP2 == 2) {  //login
          page({
            page: 'sinup entry to app',
            title: 'sinup entry to app'
          })


          //  this.errorlogin = data;
          // console.log(data)
          //  if (this.errorlogin.length == 0) {
          if (this.Phone2 != "" && this.Key2 != "") {
            login.loginPhone(this.Phone2, this.Key2).then(data => {
              /*    if ("access_token" in data["data"]) {
      _this.setAccesToken(data["data"]["access_token"])
      _this.getProfile()
      } else {
      this.errorAjax = data['data']["data"]['message'];
      }*/
              if ("access_token" in data["data"]) {
                // this.fillUser(data);
                _this.ssnLogin(data["data"]["access_token"], data["data"]["refresh_token"], data["data"]["expires_in"])


              } else {
                if (typeof data['data']["data"]['message'] == "object") {
                  this.errorAjax = data['data']["data"]['message']["mobile"][0];
                } else {
                  this.errorAjax = data['data']["data"]['message'];
                }

              }
            });

          } else if (this.Phone2 == "" && this.Key2 == "") {
            this.errorAjax = "شماره تلفن  و رمز عبور نمیتواند خالی باشد"
          } else if (this.Phone2 == "") {
            this.errorAjax = "شماره تلفن نمیتواند خالی باشد"
          } else if (this.Key2 == "") {
            this.errorAjax = "رمز عبور  نمیتواند خالی باشد"
          }


          // }


        } else if (this.XP2 == 1 && this.YP2 == 2) {  //boro forget pass
          this.pageNum = 5;
          page({
            page: 'entry to forget pass',
            title: 'entry to forget pass'
          })
        }
      } else if (this.pageNum == 3) {  //safeye register

        if (this.YP3 == 0) {
          this.showIme('Phone3');
        } else if (this.YP3 == 1) {
          //alert("kkk")


          if (this.Phone3 != "") {
            page({
              page: 'send tell login',
              title: 'send tell login'
            })
            login.registerPhone(this.Phone3).then(data => {
              if (data['success'] == true) {
                this.token = data['data']['key'];
                this.isRegister = 1;
                this.pageNum = 4;
              } else {
                // this.errorAjax = data['data']['message']['mobile'][0];
                this.errorAjax = data['data']['message'];
              }
            });

          } else {
            this.errorAjax = "تلفن نمیتواند خالی باشد . "
          }


        }


      } else if (this.pageNum == 4) {  //safe 2vome sabtenam ya faramooshi pass

        if (this.YP4 == 0) {
          this.showIme('Key4');
        } else if (this.YP4 == 1) {


          if (this.Key4 != "") {
            if (this.isRegister == 0) {  //age faramooshi pass marhale 2 bood
              page({
                page: 'confirm forget pass',
                title: 'confirm forget pass'
              })
              this.changePassword();
            } else {  //age sabtenam bood

              page({
                page: 'confirm login',
                title: 'confirm login'
              })
              this.finalRegistration();
            }
          } else {
            this.errorAjax = "کد نمیتواند خالی باشد . "
          }

        } else if (this.YP4 == 2) {
          if (this.isRegister == 0) {
            page({
              page: 'send repeat forget pass',
              title: 'send repeat forget pass'
            })
            login.forgetPass(this.Phone5).then(data => {
              //  alert(this.Phone5)
              // console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",data)
              if (data['success'] == true) {
                this.token = data['data']['key'];
                this.isRegister = 0;
                this.pageNum = 4;
              } else {
                this.errorAjax = data['data']['message']["mobile"][0];
              }
            });
          } else {
            page({
              page: 'send repeat  login',
              title: 'send repeat  login'
            })
            login.registerPhone(this.Phone3).then(data => {
              if (data['success'] == true) {
                this.token = data['data']['key'];
                this.isRegister = 1;
                this.pageNum = 4;
              } else {
                this.errorAjax = data['data']['message']['mobile'][0];
              }
            });
          }
        }
        /* else if (this.YP4 == 2) {
           alert('change pass recode');
         }*/
      } else if (this.pageNum == 5) {  //forget pass
        if (this.YP5 == 0) {
          this.showIme('Phone5');
        } else if (this.YP5 == 1) {
          page({
            page: 'entry to forget pass',
            title: 'entry to forget pass'
          })


          if (this.Phone5 != "") {
            page({
              page: 'send tell from forget pass',
              title: 'send tell from forget pass'
            })
            login.forgetPass(this.Phone5).then(data => {
              //  alert(this.Phone5)
              // console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",data)
              if (data['success'] == true) {
                this.token = data['data']['key'];
                this.isRegister = 0;
                this.pageNum = 4;
              } else {
                this.errorAjax = data['data']['message']["mobile"][0];
              }
            });
          } else {
            this.errorAjax = "شماره تلفن نمیتواند خالی باشد."
          }

        }
      } else if (this.pageNum == 6) {      //taghire ramz
        //console.log('x6->' + this.XP6 + ',y6->' + this.YP6);
      }

    }, back: function () {
      this.hideKeyboards();
      if (this.pageNum == 1) {

        if (this.fromSabtnam.FromSabtNam) {
          this.$root.$emit('header_show');
          this.$root.$emit('sideMenu_show');
          this.$root.$emit('leftside_show');
          this.$router.go(-1);

        } else {
          tizen.application.getCurrentApplication().exit();
        }

      } else if (this.pageNum == 2) {
        this.pageNum = 1;
      } else if (this.pageNum == 3) {
        this.pageNum = 1;
      } else if (this.pageNum == 4) {
        (this.isRegister == 1 ? this.pageNum = 3 : this.pageNum = 5);
      } else if (this.pageNum == 5) {
        this.pageNum = 2;
      } else if (this.pageNum == 6) {

      }
    }, done: function () {
      this.hideKeyboards();
      if (this.pageNum == 1) {

      } else if (this.pageNum == 2) {

      } else if (this.pageNum == 3) {

      } else if (this.pageNum == 4) {

      } else if (this.pageNum == 5) {

      } else if (this.pageNum == 6) {

      }
    }, cancel: function () {
      this.hideKeyboards();
      if (this.pageNum == 1) {

      } else if (this.pageNum == 2) {

      } else if (this.pageNum == 3) {

      } else if (this.pageNum == 4) {

      } else if (this.pageNum == 5) {

      } else if (this.pageNum == 6) {

      }
    }, changePassword() {
      // alert(this.Phone5)
      var _this = this
      login.changepass(this.token, this.Key4, this.Phone5).then(data => {
        //  console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", data, data['Status Code'])
        if (data['status'] == 200) {
          if ("access_token" in data["data"]) {

            _this.ssnLogin(data["data"]["access_token"], data["data"]["refresh_token"], data["data"]["expires_in"])


          } else {
            if (typeof data['data']["data"]['message'] == "object") {
              _this.errorAjax = data['data']["data"]['message']["code"][0];
            } else {
              _this.errorAjax = data['data']["data"]['message']
            }

          }
        }
      });
    }, finalRegistration() {

      var _this = this
      login.registerFinal(this.token, this.Key4, this.Phone3).then(data => {
        if ("access_token" in data["data"]) {

          _this.ssnLogin(data["data"]["access_token"], data["data"]["refresh_token"], data["data"]["expires_in"])


        } else {
          if ("message" in data['data']['data']) {
            if (typeof data['data']["data"]['message'] == "object") {
              _this.errorAjax = data['data']['data']['message']["code"][0];
            } else {
              _this.errorAjax = data['data']['data']['message'];
            }

          }

        }
      });
    }, hideKeyboards() {
      this.hideIme('Phone2');
      this.hideIme('Phone5');
      this.hideIme('Key4');
      this.hideIme('Key2');
      this.hideIme('Phone3');
    }
    , loadFile() {
      //   console.log("loadFile0000000000000000000000000000000000000000000000000")
      let _this = this

      function onsuccess(files) {
        //    console.log("oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo", files)
        for (var i = 0; i < files.length; i++) {
          if (files[i].name == _this.FileName) {
            _this.isFile = 1
            _this.FileSelected = files[i]

          }

        }
        //    console.log("oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo", _this.isFile)
        if (_this.isFile) {//
          _this.FileRead()
        } else {
          _this.withotFileToken();

        }
      }

      function onerror(error) {
        console.log("The error " + error.message + " occurred when listing the files in the selected folder");
      }

      tizen.filesystem.resolve(
        'documents',
        function (dir) {

          _this.documentsDir = dir;
          dir.listFiles(onsuccess, onerror);


          //   CompressPath = dir.path + compressFileName;
        }, function (e) {
          console.log("Error" + e.message);
        }, "rw"
      );


    }, FileWrite(token, refresh_token, expires_in) {
      //    console.log("FileWrite0000000000000000000000000000000000000000000000000")
      var _this = this
      /*console.log("tttttee" + JSON.parse(text).hpv);expires_in access_token refresh_token
{hpv: getParam("pfK"), userID: getParam("ufK"), pv: this.key};
JSON.stringify(user.JsLogin)*/
      //  console.log("++++++++++++documentsDir", _this.documentsDir)

      var json = {
        expires_in: (expires_in * 1000) + (new Date).getTime(),
        access_token: token,
        refresh_token: refresh_token
      };
      var testFile = _this.documentsDir.createFile(this.FileName);
      //    console.log("++++++++++++testFile", _this.testFile)
      json = JSON.stringify(json)


      if (testFile != null) {


        testFile.openStream(
          "w",
          function (fs) {
            fs.write(json);
            fs.close();
            _this.succesLogin(token)

          }, function (e) {
            console.log("Error " + e.message);
          }, "UTF-8"
        );
      }
    }, FileRead() {
      //    console.log("FileRead0000000000000000000000000000000000000000000000000")
      let _this = this
      var file = _this.documentsDir.resolve(this.FileName);


      file.openStream(
        "r",
        function (fs) {

          var text = fs.read(file.fileSize);

          fs.close();

          var data = JSON.parse(text)
          _this.checkTocken(data);
        }, function (e) {
          console.log("Error " + e.message);
        }, "UTF-8");

    }, DeleteFile(file, token, refresh_token, expires_in) {
      //   console.log("loadFile0000000000000000000000000000000000000000000000000")
      let _this = this

      function onsuccess(files) {
        //    console.log("oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo", files)
        for (var i = 0; i < files.length; i++) {
          if (files[i].name == _this.FileName) {
            _this.isFile = 1
            _this.FileSelected = files[i]

          }

        }
        //    console.log("oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo", _this.isFile)
        if (_this.isFile) {
          if (!_this.FileSelected.isDirectory) {
            _this.documentsDir.deleteFile(
              _this.FileSelected.fullPath,
              function () {
                _this.isFile = 0
                _this.FileSelected = ""
                _this.FileWrite(token, refresh_token, expires_in)
              }, function (e) {
                console.log("Error" + e.message);
              });
          }
        } else {
          _this.FileWrite(token, refresh_token, expires_in)
        }
      }

      function onerror(error) {
        //       console.log("The error " + error.message + " occurred when listing the files in the selected folder");
      }

      tizen.filesystem.resolve(
        'documents',
        function (dir) {

          _this.documentsDir = dir;
          dir.listFiles(onsuccess, onerror);


          //   CompressPath = dir.path + compressFileName;
        }, function (e) {
          console.log("Error" + e.message);
        }, "rw"
      );


    }
  }
}

</script>

<style scoped>
#splash {
  /* background: #1f2227 !important;*/
  position: absolute;
  left: 0px;
  top: 0px;
  width: 1920px;
  height: 1080px;
  z-index: 100000 !important;
  overflow: hidden;
}

.color-BC-small {
  background: #BCBCBC;
  width: 34px
}

.color-BC-big {
  background: red;
  width: 40px
}

.HamsamLogo {
  position: absolute;
  width: 210px;
  height: 168px;
  left: 40px;
  top: 877px;
  display: none;

}

.LoginTitle {
  position: absolute;
  width: 306px;
  height: 83px;
  left: 807px;
  top: 98px;
  line-height: normal;
  font-size: 48px;
  text-align: right;
  color: #3B4191;
}

.logIn {
  position: absolute;
  width: 1920px;
  height: 1080px;
  top: 0px;
  left: 0px;
}

.btn-white {
  background: #FFFFFF;

  box-shadow: 0px 0px 21px rgba(187, 107, 217, 0.32);

}

.btn-greenBlue {
  background: linear-gradient(69.7deg, #2D9CDB -8.92%, #6FCF97 82.16%);

  box-shadow: 0px 0px 21px rgba(45, 156, 219, 0.5);

}

.btn-green {
  background: linear-gradient(71.57deg, #27AE60 -8.81%, #6FCF97 89.47%);

  box-shadow: 0px 0px 21px rgba(187, 107, 217, 0.32);

}

.btn-pink {
  background: linear-gradient(71.57deg, #9B51E0 -8.81%, #E91CB0 89.47%);

  box-shadow: 0px 0px 21px rgba(187, 107, 217, 0.32);

}

.btn-small {
  line-height: 62px;
  width: 214.62px;
  height: 62px;
  font-size: 24px;
  border-radius: 10px;
  border: 1px solid #BCBCBC;
}

.btn-big {
  box-shadow: 0px 0px 21px rgba(45, 156, 219, 0.7);
  line-height: 70px !important;
  width: 230px !important;
  height: 74px !important;
  font-size: 24px;
  border-radius: 10px;
  border: 3px solid #FFFFFF;
}

.input-small {

  border: 1px solid #BCBCBC;
  width: 454px;
  height: 62px;
  border-radius: 20px;
  box-shadow: 0px 0px 21px rgba(0, 0, 0, 0.06);
  background: #FFFFFF;
  position: absolute;
}

.inputImg-small {
  position: relative;
  margin: 12px;
  width: 34px;
  height: 34px;
  float: right;
}

.input-big {
  border: 3px solid #2D9CDB;
  width: 454px;
  height: 62px;
  border-radius: 20px;
  box-shadow: 0px 0px 21px rgba(45, 156, 219, 0.7);
  background: #FFFFFF;
  position: absolute;

}

.mainInput-samal {
  margin-right: 7px;
  line-height: 60px;
  float: right;
  width: 367px;
  height: 60px;
  /* top: 60px; */
  border: 0px;
  direction: rtl;
  font-size: 24px;
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #D0D0D0;
  opacity: 1; /* Firefox */
}

.error-holder {
  font-size: 20px;
  color: red;
  position: absolute;
  left: 738px;
  width: 473px;
  top: 849px;
  direction: rtl;
}

#Key4 {
  border: 0px;
  width: 363px;
  height: 60px;
  direction: ltr;
  font-size: 27px;
  line-height: 60px;
  position: absolute;
  top: 366px;
  letter-spacing: 50px;
  right: 695px;
  background: transparent;
}
</style>
