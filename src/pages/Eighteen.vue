<template>
  <div id="eighteen">
    <!--<ranking :rank="rank" ref="ranking"></ranking>-->
    <div class="rankBg">
      <div v-for="(Rank , i) in rank" class="rankingList" v-if="(rank.length > 0) && (i + perpage > ypos)"
           :style="[i==0 ? {'background': 'url(' + (URL + 'ranking/nafar-aval.png') + ')'} : i==1 ? {'background': 'url(' + (URL + 'ranking/nafar-dovom.png') + ')'}: i==2 ? {'background': 'url(' + (URL + 'ranking/nafar-sevom.png') + ')'}:{'background': 'url(' + (URL + 'ranking/nafar-chahrom.png') + ')'}]"
           :class="[((ypos == i + 1) && (activeRoute == 1) ? 'hvr-grow':'')]">
        <div v-if="i > 2" class="txtRank">{{i + 1}}</div>
        <img v-if="Rank.pic != null" class="imgUser" :src="Rank.pic">
        <div class="nameUser">{{Rank.username}}</div>
        <div class="line"></div>
        <img :src="URL + 'ranking/emtiaz.png'" class="scoreIcon">
        <div class="scoreParent">
          <div class="score scoreTxtColor">امتیاز دوره</div>
          <div class="score scoreColor">{{Rank.score}}</div>
        </div>
        <div v-if="Rank.badges.length != 0" class="medalsParent">
          <div v-for="(Badge , j) in Rank.badges">
            <img v-if="filterBadge[i+'_'+j][0].pic != null" class="medals"
                 :src="filterBadge[i+'_'+j][0].pic">
            <div class="medalCnt">{{filterBadge[i+'_'+j][0].medal_count}}</div>
          </div>
        </div>
        <div v-else>
          <div class="medalsParent noMedal">تاکنون مدالی دریافت نکرده است.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import api from '../api/ranking'
  import {ROAST_CONFIG} from '../config'
  import {page} from 'vue-analytics'

  export default {
    components: {},
    name: "eighteen",
    data() {
      return {

        rank: [],
        badges: [],
        URL: ROAST_CONFIG.url_Img_comp,
        ypos: 1,
        perpage: 6,
        rankOrgNum: 10,
        startPage: 0,
        activeRoute: 1,
        rankUrl: ROAST_CONFIG.url_Domain + 'hamsam/pservice/api/v1/rank/list',
        next: '',
        userBadge: [],
        filterBadge: {},
        userId: '',
        level: '',
        pic: '',
        username: '',
        status: 1


      }

    },
    created() {

      api.ranking(this.rankUrl, this.status).then(data => {

        this.rank = data['data'];
        this.badges = data['badges'];
        this.next = data['links']['next'];


        for (let x in this.rank) {
          for (let y in this.rank[x]['badges']) {

            this.filterBadge[x + '_' + y] = this.badges.filter(data => data['id'] == this.rank[x]['badges'][y]['id']);

          }


        }
        //  console.log('filter --->' + JSON.stringify(this.filterBadge))

      });

    },
    methods: {

      ...mapGetters([
        'getUser'
      ]),
      removeOverR() {
        this.$root.$emit('sideMenu_active');
        this.activeRoute = 0;
      },
      removeOverL() {
        this.$root.$emit('leftside_active');
        this.activeRoute = 0;
      },
      up() {
        //  console.log('up ->' + this.ypos + ' ' + this.rank.length);
        if (this.ypos > 1) {
          this.ypos--;
        }
      },
      down() {
        //  console.log('ypos ->' + this.ypos + ' ' + this.rank.length);
        if (this.ypos < (this.rank.length) - 2) {

          this.ypos++;

        } else {

          if (this.next != null) {
            api.ranking(this.next, this.status).then(data => {

              this.rank = this.rank.concat(data['data']);
              this.badges = data['badges'];
              this.next = data['links']['next'];

              for (let x in this.rank) {
                for (let y in this.rank[x]['badges']) {

                  this.filterBadge[x + '_' + y] = this.badges.filter(data => data['id'] == this.rank[x]['badges'][y]['id']);

                }


              }
              // console.log('filter next--->' + JSON.stringify(this.filterBadge))


            });
          }

        }


      }, right() {

        this.removeOverR();


      },
      left() {

        // this.ypos = (this.ypos) - 50;
        // if (this.ypos <= 0) {
        //     this.ypos = 1;
        // } else {
        //     // alert('else')
        // }
        this.removeOverL();


      },
      back() {
        this.$router.go(-1);
      },
      enter() {
        let time = new Date().getTime();
        this.userId = this.rank[this.ypos - 1]['id']
        this.username = this.rank[this.ypos - 1]['username']
        this.score = this.rank[this.ypos - 1]['score']
        this.level = this.rank[this.ypos - 1]['level']
        this.coin = this.rank[this.ypos - 1]['coin']
        this.pic = this.rank[this.ypos - 1]['pic']

        page({
          page: 'view profile in ranking',
          title: 'view profile in ranking'
        })
        this.$router.push({
          path: '/six/' + time,
          query: {
            params: {
              username: this.username,
              score: this.score,
              level: this.level,
              coin: this.coin,
              pic: this.pic,
            }, id: this.userId,
          }
        });

      }
    }
  }
</script>

<style scoped>
  .rankBg {
    width: 1700px;
    height: 735px;
    position: absolute;
    top: 195px;
    left: 110px;
    overflow: hidden;

  }

  .show {
    display: block;
  }

  .hide {
    display: none;
  }

  .rankingList {
    width: 1555px;
    height: 118px;
    position: relative;
    float: right;
    top: 20px;
    right: 75px;
  }

  .firstOne {
    background: url("../assets/images/ranking/nafar-aval.png");

  }

  .secondPerson {
    background: url("../assets/images/ranking/nafar-dovom.png");

  }

  .thirdPerson {
    background: url("../assets/images/ranking/nafar-sevom.png");
  }

  .imgUser {
    width: 80px;
    height: 80px;
    position: absolute;
    right: 140px;
    top: 20px;

  }

  .nameUser {
    width: 272px;
    height: 118px;
    position: absolute;
    top: 0px;
    right: 205px;
    line-height: 118px;
    font-size: 23px;
    color: #838383;

  }

  .line {
    background-color: #9d9fa2;
    width: 2px;
    height: 93px;
    position: absolute;
    top: 13px;
    right: 505px;
  }

  .scoreIcon {
    position: absolute;
    right: 550px;
    top: 32px;
  }

  .txtRank {
    color: #f4f6f5;
    font-size: 20px;
    position: absolute;
    right: 45px;
    bottom: 15px;

  }

  .scoreParent {
    width: 200px;
    height: 100px;
    position: absolute;
    right: 600px;
    top: 10px;
  }

  .score {
    width: 200px;
    height: 40px;
    line-height: 40px;
    position: relative;
    float: right;
    text-align: right;
    direction: rtl;
    text-indent: 15px;
  }

  .scoreTxtColor {
    font-size: 21px;
    color: #9d9fa2;
    top: 12px;
  }

  .scoreColor {
    font-size: 23px;
    color: #fea11c;
    top: 12px;
  }

  .medalsParent {
    width: 785px;
    height: 118px;
    position: absolute;
    left: 20px;
    overflow: hidden;

  }

  .medals {
    width: 70px;
    height: 70px;
    position: relative;
    float: left;
    margin-left: 15px;
    margin-top: 25px;
  }

  .medalCnt {
    background-color: #f7941d;
    width: 35px;
    height: 35px;
    line-height: 35px;
    float: left;
    position: relative;
    margin-top: 60px;
    margin-left: -35px;
    border-radius: 100px;
    font-size: 20px;
    color: #fff;
    display: none;

  }

  .noMedal {
    line-height: 118px;
    font-size: 22px;
    color: #9d9fa2;
    text-align: center;
    direction: rtl;
  }

  /******************************************** animate ***************************************************/
  /*.hvr-grow {*/
  /*display: inline-block;*/
  /*vertical-align: middle;*/
  /*-webkit-transform: perspective(1px) translateZ(0);*/
  /*transform: perspective(1px) translateZ(0);*/
  /*box-shadow: 0 0 1px rgba(0, 0, 0, 0);*/
  /*-webkit-transition-duration: 0.3s;*/
  /*transition-duration: 0.3s;*/
  /*-webkit-transition-property: transform;*/
  /*transition-property: transform;*/
  /*-webkit-transform: scale(1.05);*/
  /*transform: scale(1.05);*/
  /*}*/
  .hvr-grow {

    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    -webkit-transition-duration: 0.6s;

  }

  /*.hvr-grow:hover, .hvr-grow:focus, .hvr-grow:active {*/
  /*-webkit-transform: scale(1.1);*/
  /*transform: scale(1.1);*/
  /*}*/
</style>
