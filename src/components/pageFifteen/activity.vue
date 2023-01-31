<template>
  <div class="wrapper" dir="rtl">
    <div class="title">
      <img :src="url_img + 'ten/activity/runner.png'" style="margin-right: 30px;"/>
      <div class="text">فعالیت ها</div>

      <div class="acts-container">
        <div class="acts" v-for="(content, index) in data"
             v-bind:class="(xpos === index+1 && page === active && activeRoute === 1) ? 'hover' : ''">
          <img :src="url_img + 'ten/activity/checked.png'" v-if="content.is_done != undefined && content.is_done != null && content.is_done"
               class="checked"/>
          <div class="act-text">{{content.title}}</div>

          <!--<div class="progress-bar">-->
            <!--<div class="box" v-bind:style="content.number >= 1 ? {backgroundColor: '#27AE60'} : {}"></div>-->
            <!--<div class="box" v-bind:style="content.number >= 2 ? {backgroundColor: '#27AE60'} : {}"></div>-->
            <!--<div class="box" v-bind:style="content.number >= 3 ? {backgroundColor: '#27AE60'} : {}"></div>-->
            <!--<div class="box" v-bind:style="content.number >= 4 ? {backgroundColor: '#27AE60'} : {}"></div>-->
            <!--<div class="box" v-bind:style="content.number === 5 ? {backgroundColor: '#27AE60'} : {}"></div>-->
          <!--</div>-->

          <!--<div class="progress-number">{{content.whole}}/{{content.number}}</div>-->
          <!--<div class="duration">{{content.duration}}</div>-->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ROAST_CONFIG} from "../../config";

  export default {
    props: ['data', "active", "page", "activeRoute"],
    name: "activity",
    data() {
      return {
        xpos: 1,
        url_img: ROAST_CONFIG.url_comp_server,
      }
    },
    created() {
    },
    methods: {
      down() {
        if (this.xpos < this.data.length)
          this.xpos++;
      },
      up() {
        if (this.xpos > 1) {
          this.xpos -= 1;
          return true;
        } else {
          this.xpos = false;
          return false;
        }
      },
    }
  }
</script>

<style scoped>

  .wrapper {

  }

  .text {
    position: absolute;
    font-size: 30px;
    left: -130px;
    text-align: right;
    color: #4F4F4F;
    margin-top: -50px;
  }

  .acts {
    width: 600px;
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

  .acts-container {
    margin-left: -820px;
  }

  .hover {
    border: 2px solid #2F80ED;
    color: #2F80ED;
    box-shadow: 0px 4px 11px rgba(53, 125, 229, 0.3);
    transition: 0.8s;
  }

  .progress-bar {
    position: absolute;
    margin-top: -45px;
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
    right: 565px;
  }

  .duration {
    position: absolute;
    width: 100px;
    margin-top: -45px;
    right: 630px;
  }

  .checked {
    position: absolute;
    margin-top: 15px;
    margin-right: -40px;
  }

</style>
