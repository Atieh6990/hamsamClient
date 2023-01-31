<template>
  <div>
    <div style="position: absolute;">
      <ul class="titles">
        <img :src="url_img + 'eight/scores/chal-logo.png'"/>
        <li
          v-bind:class="(ypos === 1 && xpos === 1 && activeRoute && active === page) || selected === 1 ? 'linehover' : ''">
          چالش های اخیر
        </li>
        <img style="margin-right: 25px;" :src="url_img + 'eight/scores/act-logo.png'"/>
        <li
          v-bind:class="(ypos === 1 && xpos === 2 && activeRoute && active === page) || selected === 2 ? 'linehover' : ''">
          فعالیت های اخیر
        </li>
      </ul>
    </div>

    <div class="challenge-container">
      <div id="scroll">
        <!--<div class="error" v-show="items.length === 0">{{empty}}</div>-->

        <div v-show="items.length === 0" class="error">
          <img :src="url_img + 'noResult.png'"/>
          <div>{{ empty }}</div>
        </div>



        <div v-for="(data, index) in items" class="body"
             :id="'item_' + (index+1)"
             v-bind:class="[ypos === 2 && zpos === index+1 && page === active && activeRoute ? 'hover' : '']">
          <div class="photo">
            <!--<img v-show="xpos === 1" src="../../assets/images/eight/scores/zoozanaghe.png"/>-->
            <!--<img v-show="xpos === 2" src="../../assets/images/eight/scores/zoozanaghe-sabz.png"/>-->
            <img :src="data.picture" />
            <!--<img v-show="xpos === 1" class="icon" src="../../assets/images/eight/scores/hamsamlogo.png"/>-->
            <!--<img v-show="xpos === 2" class="icon" src="../../assets/images/eight/scores/hamsamlogo-sabz.png"/>-->
            <!--<img :src="item.picture" />-->
          </div>

          <div class="title">
            {{data.title}}
          </div>

          <div class="time">
            {{data.pasttime}}
          </div>

          <div class="info">
            <div class="img-dist">
              <div class="info-data" style="right: 5px;">{{data.medal}} مدال</div>
              <img :src="url_img + 'eight/scores/medal.png'"/>
              <div class="info-data" style="right: 155px;">{{data.coin}} سکه</div>
              <img :src="url_img + 'eight/scores/coin.png'"/>
              <div class="info-data" style="right: 320px;">{{data.point}} امتیاز</div>
              <img :src="url_img + 'eight/scores/star.png'"/>
            </div>
          </div>

        </div>
        <div style="height: 20px; width: 50px; display: block"></div>
      </div>
    </div>

  </div>
</template>

<script>
  import profile from "../../api/profileALIREZA"
  import IScroll from "../../js/iscroll";
  import {ROAST_CONFIG} from "../../config";

  export default {
    props: ["id", "page", "active", "activeRoute"],
    name: "recentChallenge",
    data() {
      return {
        items: [],
        xpos: 1,
        ypos: 1,
        zpos: 1,
        selected: false,
        myScroll: '',
        challenges: [],
        activities: [],
        empty: 'لیست چالش ها خالی است',
        url_img: ROAST_CONFIG.url_comp_server
      }
    },
    created() {

      let _self = this;
      setTimeout(function () {
        // console.log(this.data)
        _self.scrollInit();
      }, 600);

      profile.myScores(this.id).then(response => {
        this.challenges = response.data;
        this.items = this.challenges;
        this.items.length === 0 ? this.empty = 'لیست چالش ها خالی است' : this.empty = '';
      });

      profile.myActivities(this.id).then(response => {
        this.activities = response.data
      });

    },
    methods: {

      scrollInit() {
        this.myScroll = new IScroll(".challenge-container", {
          scrollY: true,
          momentum: true,
          scrollbars: "custom",
          preventDefault: false,
          scrollbars: false,
          mouseWheel: true,
          interactiveScrollbars: true,
          shrinkScrollbars: "none",
          fadeScrollbars: false,
          mouseMove: true
        });
        this.myScroll.refresh()
      },

      down() {
        if (this.ypos === 1 && this.items.length > 0) {
          this.ypos = 2;
          this.selected = this.xpos;
        } else if (this.ypos === 2)
          if (this.zpos < this.items.length)
            this.zpos++;
        if (this.zpos > 2)
          this.myScroll.scrollToElement('#item_' + this.zpos, 400, false, -180);
        this.myScroll.refresh()
      },

      up() {
        if (this.ypos === 2) {
          if (this.zpos > 1) {
            this.zpos -= 1;
            this.myScroll.scrollToElement('#item_' + this.zpos, 400, false, true);
            this.myScroll.refresh()
          } else this.ypos = 1;
          return true;
        } else if (this.ypos === 1) {
          this.selected = false;
          return false;
        }
      },

      left() {
        if (this.ypos === 1) {
          if (this.xpos === 1) {
            this.xpos = 2;
            this.selected = this.xpos;
            this.items = [];
            this.items = this.activities;
            this.empty = 'لیست فعالیت ها خالی است';
            return true;
          } else {
            this.selected = false;
            return false;
          }
          // TO-DO change items content
        }
        return false;
      },

      right() {
        if (this.ypos === 1) {
          if (this.xpos === 2) {
            this.xpos = 1;
            this.selected = this.xpos;
            this.items = [];
            this.items = this.challenges;
            this.empty = 'لیست چالش ها خالی است';
            return true;
          } else {
            this.selected = false;
            return false;
          }
          // TO-DO change items content
        } else {
          return false;
        }
      },
    }
  }
</script>

<style scoped>

  .body {
    width: 1108px;
    height: 125px;
    background-color: white;
    border-radius: 10px;
    margin-top: 20px;
    margin-right: 120px;
    overflow: hidden;
    position: relative;
    -webkit-box-shadow: -3px 3px 15px 1px rgba(0, 0, 0, 0.3);
    box-shadow: -3px 3px 15px 1px rgba(0, 0, 0, 0.3);
  }

  .photo {
    /*background-color: #337ab7;*/
    position: absolute;
    width: 181px;
    height: 127px;
    /*height: inherit;*/
  }

  #scroll {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
  }

  .error{
    font-size: 24px;
    margin-top: 100px;
  }

  .error {
    color: #000000;
    font-size: 20px;
    text-align: right;
    position: absolute;
    width: 1187.88px;
    height: 770px;
    top: -39.09px;
    left: 10px;
    overflow: hidden;
    text-indent: 50px;
  }
  .error img {
    position: absolute;
    left: 306px;
  }
  .error div {
    position: absolute;
    top: 345px;
    left: 430px;
  }



  .title {
    font-size: 23px;
    color: black;
    position: absolute;
    width: 400px;
    text-align: right;
    margin-top: 40px;
    right: 210px;
    font-weight: bolder;
    /*background-color: #337ab7;*/
  }

  .time {
    position: absolute;
    font-size: 22px;
    color: #9f9f9f;
    text-align: right;
    margin-top: 80px;
    right: 210px;
    width: 400px;
  }

  .info {
    width: 500px;
    /*background-color: burlywood;*/
    height: 80px;
    position: absolute;
    margin-top: 15px;
    right: 623px;
  }

  .info > div {
    float: left;
    margin-left: -80px;
  }

  .img-dist {
    color: black;
    font-size: 22px;
  }

  .img-dist > img {
    margin-left: 110px;
    margin-top: 15px;
  }

  .info-data {
    /*background-color: red;*/
    width: 100px;
    text-align: left;
    position: absolute;
    top: 25px;
  }

  .icon {
    position: absolute;
    z-index: 2;
    width: 129px;
    height: 80px;
    margin-top: -110px;
    margin-right: -70px;
  }

  li {
    color: black;
    font-weight: bolder;
    font-size: 24px;
    width: 165px;
    text-align: center;
    height: 60px;
    line-height: 60px;
    margin-right: 75px;
    display: inline-block;
  }

  .linehover {
    border-bottom: 4px solid #2F80ED;
  }

  .titles {
    margin-right: 50px;
  }

  ul > img {
    position: absolute;
    top: 30px;
    margin-right: 35px;
  }

  .hover {
    transform: scale(1.03);
    transition: 0.5s;
    background: linear-gradient(0deg, rgba(66, 127, 199, 0.3) 0%, rgba(178, 152, 200, 0.05) 33.48%, rgba(255, 255, 255, 0) 65.86%), #FFFFFF;
    /*border: 2px solid #DADADA;*/
    -webkit-box-shadow: -3px 3px 15px 1px rgba(0, 0, 0, 0.3);
    box-shadow: -3px 3px 15px 1px rgba(0, 0, 0, 0.3);
    /*border-radius: 5px;*/
  }

  .challenge-container {
    position: relative;
    top: 90px;
    overflow: hidden;
    /*background-color: #337ab7;*/
    height: 750px;
    width: 1300px;
    text-align: center;
  }

</style>
