<template>
  <div class="wrapper" dir="rtl">
    <div class="title">
      <!--<img :src="url_img + 'ten/activity/runner.png'" style="margin-right: 30px;"/>-->
      <div class="text">فعالیت ها</div>

      <div class="actsContainer">
        <div class="scroll">
          <div class="acts" v-for="(content, index) in data"
               :id="'act_' + index"
               v-bind:class="(xpos === index+1 && page === active && activeRoute === 1) ? 'hover' : ''">
            <img :src="url_img + 'ten/activity/checked.png'"
                 v-if="(((content.usercount * 5) / content.count) | 0) >= 5"
                 class="checked"/>

            <img :src="url_img + 'ten/activity/unchecked.png'"
                 v-if="(((content.usercount * 5) / content.count) | 0) < 5"
                 class="checked"/>

            <div class="act-text">{{(content.valuefa!=null?content.valuefa.substring(0, 33):content.title)}}</div>
            <div class="progress-bar">
              <div class="box"
                   v-bind:style="((content.usercount * 5) / content.count)  >= 1 ? {backgroundColor: '#27AE60'} : {}"></div>
              <div class="box"
                   v-bind:style="((content.usercount * 5) / content.count)  >= 2 ? {backgroundColor: '#27AE60'} : {}"></div>
              <div class="box"
                   v-bind:style="((content.usercount * 5) / content.count)  >= 3 ? {backgroundColor: '#27AE60'} : {}"></div>
              <div class="box"
                   v-bind:style="((content.usercount * 5) / content.count)  >= 4 ? {backgroundColor: '#27AE60'} : {}"></div>
              <div class="box"
                   v-bind:style="((content.usercount * 5) / content.count)  >= 5 ? {backgroundColor: '#27AE60'} : {}"></div>
            </div>

            <div class="point" style="right: 610px;">{{content.coin}} سکه</div>
            <!--<div class="progress-number">{{content.whole}}/{{content.number}}</div>-->
            <div class="point">{{content.point}} امتیاز</div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import IScroll from "../../js/iscroll"
  import {ROAST_CONFIG} from "../../config";

  export default {
    props: ['data', "active", "page", "activeRoute"],
    name: "activity",
    data() {
      return {
        url_img: ROAST_CONFIG.url_comp_server,
        xpos: 1,
        myScroll: ''
      }
    },
    created() {
      let _self = this;
      setTimeout(function () {
        _self.scrollInit()
      }, 600);
    },
    methods: {
      down() {
        if (this.xpos < this.data.length) {
          this.xpos++;
          if (this.xpos > 4)
            this.myScroll.scrollToElement('#act_' + this.xpos, 500, false, -180);
          // this.myScroll.scrollToElement('#act_' + this.xpos, 590, false, -180);
        }
      },
      up() {
        if (this.xpos > 1) {
          this.xpos -= 1;
          // if (this.data.length - this.xpos > 4) {
          this.myScroll.scrollToElement('#act_' + this.xpos, 500, false, true);
          // }
          return true;
        } else {
          this.xpos = false;
          return false;
        }
      },
      scrollInit() {

        this.myScroll = new IScroll(".actsContainer", {
          scrollY: true,
          momentum: true,
          preventDefault: false,
          scrollbars: false,
          mouseWheel: true,
          interactiveScrollbars: true,
          shrinkScrollbars: "none",
          fadeScrollbars: false,
          mouseMove: true
        });

      },
    }
  }
</script>

<style scoped>


  .text {
    position: absolute;
    font-size: 30px;
    left: -162px;
    text-align: right;
    color: #4F4F4F;
    margin-top: -50px;
  }


  .acts {
    width: 767px;
    height: 54px;
    border-radius: 10px;
    color: #4f4f4f;
    border: 2px solid transparent;
    font-size: 21px;
    margin-top: 5px;
    text-align: right;
    margin-right: 80px;
    transition: 0.8s;
  }

  .actsContainer {
    width: 920px;
    height: 500px;
    position: absolute;
    right: 0px;
    overflow: hidden;
  }

  .scroll {
    width: 100%;
    position: absolute;
    right: 0;
    top: 0;
    /*border: 3px solid red;*/
  }

  .hover {
    border: 2px solid #2F80ED;
    color: #2F80ED;
    box-shadow: 0px 4px 11px rgba(53, 125, 229, 0.3);
    transition: 0.8s;
  }

  .progress-bar {
    position: absolute;
    margin-top: -46px;
    right: 430px;
    width: 120px;
  }

  .act-text {
    padding: 10px;
  }

  .box {
    display: inline-block;
    width: 16px;
    height: 5px;
    background-color: #BDBDBD;
    /*margin-right: -4px;*/
    border-radius: 2px;
  }

  .progress-number {
    position: absolute;
    margin-top: -45px;
    right: 740px;
  }

  .point {
    position: absolute;
    width: 100px;
    margin-top: -45px;
    right: 750px;
  }

  .checked {
    position: absolute;
    margin-top: 15px;
    margin-right: -40px;
  }

</style>
