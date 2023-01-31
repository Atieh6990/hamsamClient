<template>
  <div>
    <news :xActive="0" :yActive="0" :activeRoute="activeRoute" :yPage="yPage" :xPage="xPage" ref="news"></news>
    <reward :xActive="1" :yActive="0" :activeRoute="activeRoute" :yPage="yPage" :xPage="xPage"
            ref="reward"></reward>
    <tv :xActive="2" :yActive="0" :activeRoute="activeRoute" :yPage="yPage" :xPage="xPage" ref="tv"></tv>
    <wall :xActive="0" :yActive="1" :activeRoute="activeRoute" :yPage="yPage" :xPage="xPage" ref="wall"></wall>
    <newNews :xActive="1" :yActive="1" :activeRoute="activeRoute" :yPage="yPage" :xPage="xPage"
             ref="newNews"></newNews>
    <!--    <rank :xActive="2" :yActive="1" :activeRoute="activeRoute" :yPage="yPage" :xPage="xPage" ref="rank"></rank>-->
    <identify></identify>


    <!-- digitoon be bug khorde ->(11.11.1401)-->
    <!--    <div class="Title">-->
    <!--      <span style="float: right;line-height: 36px">تماشای آنلاین فیلم و سریال</span>-->
    <!--      <img style="float: left ;width: 40px; margin-right: 10px" :src="(imgURL)">-->
    <!--    </div>-->
    <!--    <onlineFilms :films="films" :xActive="0" :yActive="2" :activeRoute="activeRoute"-->
    <!--                 :yPage="yPage" :xPage="xPage" ref="onlineFilms"></onlineFilms>-->
    <!--    <onlineFilms :films="films" class="Parent-filickty" :xActive="0" :yActive="3" :activeRoute="activeRoute"-->
    <!--                 :yPage="yPage" :xPage="xPage" ref="onlineFilms"></onlineFilms>-->

    <div class="Title" style="  top: 625px;"> فعالیت های پیشنهادی</div>
    <SugestedActivity :challenges="challenges" :xActive="0" :yActive="2" :activeRoute="activeRoute" :yPage="yPage"
                      :xPage="xPage"
                      ref="SugestedActivity">
    </SugestedActivity>

    <div class="Title" style="  top: 850px;"> برنامه های پیشنهادی</div>
    <SugestedProgram :programs="apps" :xActive="0" :yActive="3" :activeRoute="activeRoute"
                     :yPage="yPage" :xPage="xPage" ref="SugestedProgram">
    </SugestedProgram>


    <!--<guide ref="guide"></guide>-->


  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import SugestedProgram from '../components/PageOne/SuggestedPrograms'
import SugestedActivity from '../components/PageOne/SuggestedActivity'
import tv from '../components/PageOne/tv'
import reward from '../components/PageOne/reward'
import wall from '../components/PageOne/wall'
import rank from '../components/PageOne/rank'
import news from '../components/PageOne/news'
import newNews from '../components/PageOne/newNews'
import challenge from '../api/challenge'
import axios from 'axios';
import {mapMutations} from 'vuex';
import api from '../api/apps';
import {ROAST_CONFIG} from '../config';
import {page} from 'vue-analytics'
import filmsApi from '../api/onlineFilms'
import onlineFilms from "../components/onlineFilms/onlineFilms";
import identify from "../components/PageOne/identify"

export default {
  name: 'one', data() {
    return {
      xActive: 0,
      yActive: 0,
      activeRoute: 1,
      yPage: 0,
      xPage: 0,
      apps: [],
      dataNews: [],
      item: '',
      year: '',
      old: '',
      apps: [],
      pkgID: '3rGOWfR9DK.akharinKhabar',
      appID: '208',
      challenges: [],
      films: [],
      imgURL: (ROAST_CONFIG.url_Img_server + 'onlineFilms/ri_play-circle-fill.png'),
    }
  }, created() {

    this.$root.$on("HideTv", () => {

      try {
        this.HideTv()
        // this.$refs.routeview.HideTv();
      } catch (error) {
      }
    });
    this.$root.$on("ShowTv", () => {
      // alert("showOne")
      try {
        this.ShowTv()
      } catch (error) {

      }
    });
    this.info = this.getTvDetail();
    this.year = this.info['year'];
    this.old = this.info['isOld'];

    //dar tarikh 12.9.1401 hazf shod
    api.topApps(this.year, this.old).then(data => {
      this.apps = data['data'];
    });


    //digitoon be bug khorde ->(11.11.1401)
    // filmsApi.productList(10, 0).then(data => {
    //   this.films = data
    //   // console.log(this.films)
    // })


    let Url = ROAST_CONFIG.URL_Newssn + 'challenge/top';
    return axios({
      method: "POST",
      url: Url

    }).then(response => {
      this.challenges = response['data']['data'].reverse();
      // console.log('data login aio->' + JSON.stringify(data));
    });


  }, components: {
    SugestedProgram, SugestedActivity, tv, reward, wall, rank, news, newNews, onlineFilms, identify
  }, methods: {
    ...mapGetters([
      'getTvDetail'
    ]),
    up() {

      if (this.yPage == 0 && this.xPage == 2) {
        if (!this.$refs.tv.up()) {
          //  this.yPage--
        }
      } else if (this.yPage != 0) {
        this.yPage--
      }


    }, down() {
      console.log(this.yPage + ' ' + this.xPage);
      if (this.yPage == 0 && this.xPage == 2) {
        if (!this.$refs.tv.down()) {
          this.yPage++
        }
      // } else if (this.yPage < 4) { digitoon be bug khorde ->(11.11.1401)
      } else if (this.yPage != 3) {
        this.yPage++
      }

    }, left() {
      console.log(this.yPage, this.xPage)
      if (this.yPage == 0 && this.xPage == 2) {
        if (!this.$refs.tv.left()) {

          this.removeOverL()
        }
      } else if (this.yPage == 2) {
        if (!this.$refs.SugestedActivity.left()) {
          this.removeOverL()
        }

        //digitoon be bug khorde ->(11.11.1401)
        // if (!this.$refs.onlineFilms.left()) {
        //   this.removeOverL()
        // }
      } else if (this.yPage == 3) {
        if (!this.$refs.SugestedProgram.left()) {
          this.removeOverL()
        }
        //digitoon be bug khorde ->(11.11.1401)
        // if (!this.$refs.SugestedActivity.left()) {
        //   this.removeOverL()
        // }


        // } else if (this.xPage != 2 ) {
      } else if (this.xPage != 1) {
        this.xPage++

      } else {
        this.removeOverL()
      }


    }, right() {
      // alert(this.yPage)
      if (this.yPage == 2) {
        //digitoon be bug khorde ->(11.11.1401)
        // if (!this.$refs.onlineFilms.right()) {
        //   this.removeOverR()
        // }
        if (!this.$refs.SugestedActivity.right()) {
          this.removeOverR()
        }
      } else if (this.yPage == 3) {
        //digitoon be bug khorde ->(11.11.1401)
        // if (!this.$refs.SugestedActivity.right()) {
        //   this.removeOverR()
        // }
        if (!this.$refs.SugestedProgram.right()) {
          this.removeOverR()
        }

      } else {
        if (this.xPage == 0) {
          this.removeOverR()

        } else if (this.xPage == 1) {
          this.xPage--
        } else if (this.xPage == 2) {
          if (!this.$refs.tv.right()) {
            this.xPage--
          }
        }


      }

    }, enter() {
      let time = new Date().getTime();
      if (this.yPage == 0 && this.xPage == 0) {
        page({
          page: 'news p1',
          title: 'news p1'
        })
        this.dataNews = this.$refs.news.enter();
        this.item = this.dataNews['item'] + 1;
        this.$router.push({
          path: '/twentyTwo/' + time,
          query: {'item': this.item}
        })
      } else if (this.yPage == 0 && this.xPage == 1) {
        this.dataNews = this.$refs.reward.enter();
        this.item = this.dataNews['item'] + 1;
        this.$router.push({
          path: '/twentyTwo/' + time,
          query: {'item': this.item}
        })
        page({
          page: 'reward p1',
          title: 'reward p1'
        })
      } else if (this.yPage == 0 && this.xPage == 2) {
        this.$refs.tv.enter()
      } else if (this.yPage == 1 && this.xPage == 0) {
        this.$refs.wall.enter();
      } else if (this.yPage == 1 && this.xPage == 1) {
        this.openApp()
      } else if (this.yPage == 1 && this.xPage == 2) {
        this.$refs.rank.enter()
      } else if (this.yPage == 2) {
        this.$refs.SugestedActivity.enter()

        //digitoon be bug khorde ->(11.11.1401)
        // let filmSelect = this.$refs.onlineFilms.enter();
        // let filmId = this.films[filmSelect].id
        //
        // page({
        //   page: 'Films p1' + filmId,
        //   title: 'Films p1' + filmId
        // })
        //
        //
        // this.$router.push({
        //   path: '/videoDetails/' + time,
        //   query: {'filmId': filmId, 'films': this.films}
        // })

      } else if (this.yPage == 3) {
        //digitoon be bug khorde ->(11.11.1401)
        //this.$refs.SugestedActivity.enter()
        this.$refs.SugestedProgram.enter()
      }

    }, removeOverR() {
      this.activeRoute = 0
      this.$root.$emit('sideMenu_active');
    }, removeOverL() {

      this.activeRoute = 0
      this.$root.$emit('leftside_active');
    }, back() {
      tizen.application.getCurrentApplication().exit();
    }, addOver() {

    },
    removeOver() {
      this.$root.$emit('sideMenu_deactive');
    }
    , channelUp() {
      //  alert("p1")
      this.$refs.tv.channelUp()
    }
    , channelDown() {
      this.$refs.tv.channelDown()
    },
    openApp() {

      var show = this;
      //   console.log(' pkg ---->' + show.pkgID)
      tizen.application.launch(
        show.pkgID,
        function () {

          challenge.challengeApp(36, show.appID).then(data => {

            if (data["success"] = true) {
              //              console.log("challenge open appppppp  -------->", data)


            } else {

            }
          });

          show.text = 'Success';
          show.$root.$emit('hide_dl');


        }, function (error) {

          show.text = 'Error : ' + JSON.stringify(error);
          show.$root.$emit('show_dl');


        });
      setTimeout(function () {
        show.$root.$emit('hide_dl');
      }, 5000);
    }, HideTv() {
      // alert("hideOne")
      this.$refs.tv.hideTv()
    }, ShowTv() {

      this.$refs.tv.openTv(188, 85, 472, 351)
    }


  }, computed: {}
}
</script>
<style scoped>

.Title {
  position: absolute;
  height: 31px;
  right: 86px;
  line-height: normal;
  font-size: 18px;
  color: #A9A9A9;

}

</style>
