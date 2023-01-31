<template>
  <div v-show="show" class="rightMenu">


    <img v-for="(title,id) in titles" v-bind:style="{ top: (id*72) +'px' }" class='img'
         :src="`https://ssn.tvapps.ir/hamsamClient/3.1/sideMenu/sideMenu/rightMenu${id}.png?t=2`"
         v-show="ypos != id || !active  "/>

    <div v-bind:style="{ top: id*70 +'px ',background:color[id] }" class="hover" v-for="(title,id) in titles"
         v-show="ypos==id && active">
      <img class="imgHov" :src="`https://ssn.tvapps.ir/hamsamClient/3.1/sideMenu/sideMenu/rightMenu${id}.png?t=2`"/>
      <div style="float: right;padding-right:15px;padding-left: 30px ">
        {{ title }}
      </div>
    </div>


    <!--   <img v-bind:style="{ top: (11*72) +'px' }" class='img'
            :src="`/dist/rightMenu11.png`" v-show="ypos != 10 || !active  "/>

       <div v-bind:style="{ top: 11*70 +'px' }" class="hover"  v-show="ypos == 10 && active">
           <img class="imgHov" :src="`/dist/rightMenu11.png`"/>
           <div style="float: right;padding-right:20px ">

           </div>
       </div>--->

  </div>

</template>
<script>
import func from '../mixins/func'
import {page} from 'vue-analytics'
import {mapGetters} from 'vuex'

export default {
  mixins: [func],
  mounted: function () {

  }, created() {

    this.$root.$on('sideMenu_show', () => {
      this.show = 1
    });

    this.$root.$on('sideMenu_active', () => {
      this.active = 1
    });
    this.$root.$on('sideMenu_deactive', () => {
      this.active = 0
    });
    this.$root.$on('sideMenu_hide', () => {
      this.show = 0
      //console.log("------",this.show )
    });
  }, data() {
    return {
      active: 0,
      show: 0,
      ypos: 0,
      // titles: ['صفحه اصلی', 'برنامه ها ', 'دیوار ', 'بازی و سرگرمی', 'دوستان', 'رتبه بندی', 'پیام ها', 'پروفایل', 'خروج'],
      // color: ['#828282', '#622B94', '#2D9CDB', '#8DC63F', '#EB5757', '#16A085', '#F1C40F', '#535C68', '#EB5757'],
      // routes: ['/one/', '/two/', '/nineteen/', '/nine/', '/five/', '/eighteen/', '/four/', '/six/', '/seven/']
      enTitle: ["world cup", "main page", "program", "wall", "games", "Challenge", "friends", "pm", "rank", "profile", "guide", "exit", "ertbot pm"],
      titles: ['پخش آنلاین', 'صفحه اصلی', 'برنامه ها ', 'دیوار ', 'بازی و سرگرمی', 'چالش ها', 'دوستان', 'پیام ها', 'رتبه بندی', 'پروفایل', 'راهنما', 'خروج', 'ربات همسام'],
      color: ['#EB5757', '#828282', '#622B94', '#2D9CDB', '#8DC63F', 'red', '#EB5757', '#16A085', '#F1C40F', '#535C68', '#FE9923', '#EB5757', '#828282'],
      routes: ['/worldCupHome/', '/one/', '/two/', '/nineteen/', '/nine/', '/fifteen/', '/five/', '/four/', '/eighteen/', '/six/', '/twenty/', '/seven/', '/twentyFive/'],
      routeName: ["Worldcup", "One", "Two", "Nineteen", "Nine", "Fifteen", "Five", "Four", "Eighteen", "Six", "Twenty", "Seven", "TwentyFive"],
    };

  }, methods: {
    ...mapGetters([
      'getCurrentPage'
    ]),
    right() {


    }, left() {
      this.active = 0;

    }, up() {

      if (0 < this.ypos) {
        this.ypos--;

      }
    }, down() {

      if ((this.titles.length - 1) > this.ypos) {
        this.ypos++;

      }
    }, enter() {


      if (this.ypos == 11) {
        // console.log("sideMenuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
        this.logOut()
      }

      if (this.getCurrentPage() != this.routeName[this.ypos]) {
        //    console.log("---------------", this.getCurrentPage(), "---------------------", this.routeName[this.ypos])
        page({
          page: this.enTitle[this.ypos] + " right menue",
          title: this.enTitle[this.ypos] + " right menue"
        })
        if (this.ypos == 12) {

          this.$router.push({path: this.routes[this.ypos] + new Date().getTime(), query: {'reciever': -1}});
        } else if (this.ypos == 0) {
          //this.$router.push({path: this.routes[this.ypos]});
          this.$router.push({path: this.routes[this.ypos] + new Date().getTime()});
        } else {
          this.$router.push({path: this.routes[this.ypos] + new Date().getTime()});
        }


      }

      this.active = 0;

    }, back() {
      this.active = 0;
      //  this.$router.go(-1);


    }
  }
};

</script>

<style scoped>
.rightMenu {
  position: absolute;
  right: 0px;
  top: 80px;
  z-index: 10;

}

.img {
  position: absolute;

  right: 22px;
}

.hover {
  position: relative;
  height: 50px;
  background: red;
  right: 16px;
  /*z-index: 10000;*/
  font-size: 18px;
  color: white;
  border-radius: 10px;
  line-height: 2.5;
  z-index: 999999999999999;
}

.imgHov {
  float: right;
  margin: 7px;
  position: relative;
}

</style>
