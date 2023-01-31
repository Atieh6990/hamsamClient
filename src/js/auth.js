import {mapGetters} from 'vuex';
import store from '../store/index'
import func from '../mixins/func'
import login from '../api/login'
import ajaxback from '../api/ajax'

export default {
  methods: {
    ...mapGetters([
      'getTv'
    ]),
    isStorageFilled(){

    },
    isLoggedIn() {

        //alert('fuck');
     /* console.log('is log out->' + func.methods.getParam('Islogout'));
      console.log('getters->', JSON.stringify(store.getters));
      console.log(store.getters.getModelTv);*/
      //this.fillUserTv();

     // func.methods.clearParam();

      if (func.methods.getParam('Islogout') != '1') {
       // console.log('11111111');
        if (func.methods.getParam('pfK') != '' && func.methods.getParam('ufK') != '' && func.methods.getParam('pfK') != null && func.methods.getParam('ufK') != null) {
         // console.log('2222222222');
          // user.userID = func.methods.getParam('ufK');

          //console.log('generaaaal login');
          return login.loginGeneral(func.methods.getParam('ufK')).then(data => {
            // alert('general login ok');
            //console.log('333333');
             return data;
          });

        } else {
          //console.log('444444444444');
          return login.loginAio().then(data => {
            //alert('aio');
          //  console.log('5555555');
            if ("userID" in data) {
           //   console.log('666666666666');
             // alert('aio ok');
              return data;
              //this.fillUserData(data);
            } else {
             // alert('no aio,guest');
            //  console.log('7777777777');
              return login.loginGuest().then(data => {
             //   console.log('888888888');
                return data;
              /*  alert('guest ok after aio');
                console.log('%%%%%%%%%%%%%%%%%%%%%%%'+window.store2);
                window.store2._mutations.setUser(data);
                this.fillUserData(data);
                return data;
                this.fillUserData(data);*/
              });

            }
          });

        }
      } else {
      //  console.log('99999999');
        return login.loginGuest().then(data => {
        //  console.log('100000000000');
         // alert('guest from start,logged out');
          return data;
         // this.fillUserData(data);
        });
      }
    },
    fillUserData(data) {

     // alert('fill user in app');
        // console.log('this.$store.->'+JSON.stringify(this.$store));
      // console.log('stoooore->'+(store));
      // console.log(JSON.stringify(store._mutations));
     // store._mutations.setUser(data);

     // return;


     /* this.setParam('Islogout', '');
      let status = data['status'];
      if ("hpv" in data) {
        var pvkey = ajaxback.b64DecodeUnicode(ajaxback.b64DecodeUnicode(data['hpv']));
        var userID = data['userID'];
        this.setParam("pfK", pvkey);
      this.setParam("ufK", userID);
        console.log('user id->', this.getParam('ufK'));
      }
*/


    }

  },


}
