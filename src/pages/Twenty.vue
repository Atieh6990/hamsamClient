<template>
  <div id="twenty">
    <div class="guidePopup">
      <img class="image" :src="URL + 'guide/photo.png'">
      <img class="samsung" :src="URL + 'rules/samsung-logo.png'">
      <div class="guideTxt">
        <div class="guide" v-html="guide">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import IScroll from "../js/iscroll";
  import {ROAST_CONFIG} from '../config';
  import api from '../api/guide';


  export default {
    name: "twenty",
    data() {
      return {
        myScroll: "",
        yguide: 1,
        URL: ROAST_CONFIG.url_Img_comp,
        guide: ''
      }

    },
    created() {

      this.scrollInit();
      api.guide().then(data => {

        this.guide = data['data']['text'];

      });
    },
    methods: {
      up() {

        this.myScroll.moveUp(80);

      },
      down() {


        this.myScroll.moveDown(80);


      },
      right() {
        this.activeRoute = 0;
        this.$root.$emit('sideMenu_active');
      },
      left() {
        this.activeRoute = 0;
        this.$root.$emit('leftside_active');
      },
      enter() {

      },
      back() {
        this.$router.go(-1);
      },
      scrollInit() {

        if (this.myScroll == '') {


          setTimeout(() => {
            this.myScroll = new IScroll(".guideTxt", {
              scrollY: true,
              scrollbars: "custom",
              momentum: true,
              preventDefault: false,
              scrollbars: true,
              mouseWheel: true,
              interactiveScrollbars: true,
              shrinkScrollbars: "none",
              fadeScrollbars: false,
              mouseMove: true
            });
          }, 10);
        }


      },
    }
  }
</script>

<style scoped>

  .guideParent {
    background-color: #e6e7e8;
    width: 1920px;
    height: 1080px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 11;
  }

  .guidePopup {
    width: 1665px;
    height: 785px;
    background: #FFFFFF;
    box-shadow: 0px -1px 20px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    position: absolute;
    top: 145px;
    /*top: 95px;*/
    left: 127px;
    z-index: 1;

  }

  .image {
    position: absolute;
    right: 0px;
    top: 0px;
  }

  .samsung {
    position: absolute;
    left: 30px;
    top: 40px;
  }

  .guideTxt {
    width: 1125px;
    height: 590px;
    float: left;
    position: relative;
    top: 125px;
    left: 50px;
    overflow: hidden;
  }

  .guide {
    width: 1070px;
    position: absolute;
    left: 15px;
    font-size: 20px !important;
    line-height: 50px;
    color: #212121;
    direction: rtl;
    text-align: justify;


  }


</style>
