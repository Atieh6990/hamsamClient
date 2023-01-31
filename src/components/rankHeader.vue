<template>
  <div v-if="show==1" id="rankHeader">
    <div class="avatar">
       <img :src="URL+'header/userdefaul.png'" class="avatar-pic" style="z-index:2;">
       <img  v-if="this.getUser()['picture']" class="avatar-pic" :style="'z-index:'+avatarZindex" :src="this.getUser()['picture']" :onLoad="loadImage()" >
    </div>
    <div class="username" v-if="this.getUser()['username']">{{this.getUser()['username']|substr(10)}}</div>
    <div class="splitor"></div>
    <div class="scoreholder" style="left: 257px;">
      <img class="score-period" :src="URL+'header/level.png'">
      <div class="title-score">سطح</div>
      <div class="score">{{this.getUser()['level']}}</div>
    </div>
    <div class="scoreholder" style="left: 426px;">
      <img class="score-period" :src="URL+'header/score.png'">
      <div class="title-score">امتیاز دوره</div>
      <div class="score">{{this.getUser()['score']}}</div>
    </div>
    <div class="scoreholder" style="left: 601px;">
      <img class="score-rank" style="height: 40px;width: 40px" :src="URL+'header/coin.png'">
      <div class="title-score" style="text-align: left">سکه</div>
      <div class="coin" >{{this.getUser()['coin']}}</div>
    </div>
    <div class="scoreholder" style="left: 751px;">
      <img class="score-rank1"  :src="URL+'header/rank.png'">
      <div class="title-score" style="text-align: left">رتبه</div>
      <div class="coin1" >{{this.getUser()['rank']}}</div>
    </div>

  </div>
</template>

<script>
  import mainpage from '../api/mainpage'
  import {mapMutations} from 'vuex'
  import {mapGetters} from 'vuex'
  import {ROAST_CONFIG} from '../config'
  import func from '../mixins/func'

  export default {
    name: "rank-header",
    mixins:[func],
    created() {
      this.$root.$on('header_show', () => {
        this.show=1
      });

      this.$root.$on('header_hide', () => {
        this.show=0
      });
    }, activated() {
    /*  alert('activated');
      console.log('is rank->',this.getIsRank());*/
    },data()
    {
      return {
        show:0,
        imgAdrs: ROAST_CONFIG.URL_IMAGE,
          URL: ROAST_CONFIG.url_comp_server,
        avatarZindex:1,
      }
    }, methods: {
      ...mapMutations([

      ]), ...mapGetters([
        'getUser',
        'getSsnUser',
        'getModelTv',
        'getTvDetail',
        'getIsRank',
        'getUserRank'
      ]),
      loadImage(){
        this.avatarZindex=3;
      }
    }
  }
</script>

<style scoped>
  #rankHeader {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 1000px;
    height: 80px;
  /*  border: 1px solid red;*/
  }

  .avatar {
    position: absolute;
    left: 15.53px;
    top: 17px;
    width: 52.4px;
    height: 52.4px;
  /*  border: 1px solid green;*/
    overflow: hidden;
  }

  .splitor {
    position: absolute;
    left: 230px;
    top: 26px;
    height: 31px;
    width: 2px;
    background-color: #D0D0D0;
  }

  .username {
    position: absolute;
    left: 86px;
    top: 26px;
    width: 127px;
    height: 31px;
    font-size: 22px;
    color: #603E80;
    direction: rtl;
    text-align: center;
    overflow: hidden;
   /* border: 1px solid red;*/
  }
  .score-period{
    position: absolute;
    top: 23px;
    left: 0px;
    width: 40px;
  }
  .scoreholder{
   /* border: 1px solid purple;*/
    position: absolute;
    top: 0px;
    width: 146px;
    height: 79px;
  }
  .title-score{
    font-size: 16px;
    text-align: right;
    position: absolute;
    top: 18px;
    left: 60px;
    direction: rtl;
    color: #C7C7C7;
    width: 66px;
  }
  .score{
    font-size: 24px;
    text-align: right;
    position: absolute;
    top: 45px;
    left: 54px;
    direction: rtl;
   /* border: 1px solid red;*/
    width: 71px;
    color: #FEA832;
  }
  .coin{
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 45px;
    left: 54px;
    direction: rtl;
    /* border: 1px solid red;*/
    width: 71px;
    color: #FEA832;
  }
  .coin1{
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 36px;
    left: 42px;
    direction: rtl;
    /* border: 1px solid red; */
    width: 71px;
    color: #FEA832;

  }
  .score-rank{
    position: absolute;
    top: 25px;
    left: -9px;
    width: 78px;
    height: 43px;
    width: 43px;
  }
  .score-rank1{
    position: absolute;
    top: 9px;
    left: -28px;

  }
  .avatar-pic{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 52px;
    border-radius: 50%;
  }
</style>
