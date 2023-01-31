<template>
  <div class="modal-body" dir="rtl">
    <div class="top-container">
      <div class="accept-button" v-if="btnNumber === 1">{{btnText}}</div>
      <div v-if="btnNumber !== 1">
        <div class="button" style="left: 180px;" v-bind:class="xpos === 1 ? 'hover' : ''">{{btnText[0]}}</div>
        <div class="button" v-bind:class="xpos === 2 ? 'hover' : ''">{{btnText[1]}}</div>
      </div>

      <div class="title" v-bind:style="color ? {color: color} : {}">
        {{title}}
      </div>
    </div>

    <div class="content" dir="rtl">
      <img style="position: absolute;" v-show="color" :src="url_img + 'recylcebin.png'"/>
      <div style="position: absolute;" v-bind:style="color ? {right: '80px', top: '17px'} : {}">
        {{text}}
      </div>
      <!--<div class="pic-container">-->
      <!--<div class="pic">-->
      <!--<img :src="pics"/>-->
      <!--</div>-->
      <!--</div>-->
    </div>

  </div>
</template>

<script>
  import {ROAST_CONFIG} from '../config';
  import {mapMutations} from 'vuex';
  import challenge from "../api/challenge"

  export default {
    name: "modal",
    components: {},
    data() {
      return {
        text: '',
        pics: [],
        btnNumber: 0,
        btnText: [],
        title: '',
        color: '#535C68',
        xpos: 1,
        url_img: ROAST_CONFIG.url_comp_server
      }
    },
    created() {
      this.$root.$on("modal_active", (modalObject) => {
     //   console.log('modalObject  ---> ' + modalObject)
        this.text = modalObject.text;
        this.color = modalObject.color;
        this.pics = modalObject.pics;
        this.btnNumber = modalObject.btnNumber;
        this.btnText = modalObject.btnText;
        this.title = modalObject.title;
        this.$root.$emit("modal_on")
      })
    },

    methods: {

      up() {

      }, down() {

      },
      left() {
        this.xpos = 2
      },
      right() {
        this.xpos = 1;
      },
      enter() {
        // alert(this.xpos)
        if (this.btnNumber === 1 || this.xpos === 1) {
           // alert('false');
          return false;
        } else if (this.xpos === 2) {
          // this.$root.$emit("leave_challenge")
          // alert('true');
          return true;
        }
      },
      back() {

      },

    }
  }
</script>

<style scoped>
  .modal-body {
    position: absolute;
    /*z-index: 99999999999999999999999999;*/
    left: 239px;
    /*top: 1100px;*/
    width: 1442px;
    height: 700px;
    background: #FFFFFF;
    box-shadow: 0px -1px 20px rgba(0, 0, 0, 0.25);
    border-radius: 30px 30px 0px 0px;
    transition: 1s;
  }

  .top-container {
    position: absolute;
    border-radius: inherit;
    height: 92px;
    width: 1370px;
    /*background-color: brown;*/
    left: 36px;
    border-bottom: 1px solid #BDBDBD;
  }

  .accept-button {
    position: absolute;
    width: 152px;
    height: 57px;
    background: #2F80ED;
    top: 18px;
    left: 0;
    border: 1px solid #2F80ED;
    box-shadow: 0px 0px 22px rgba(47, 128, 237, 0.6);
    border-radius: 10px;
    color: #fff;
    line-height: 57px;
    font-size: 24px;
  }

  .title {
    position: absolute;
    width: inherit;
    height: 43px;
    left: 0px;
    top: 25px;
    font-size: 24px;
    line-height: 42px; /* identical to box height */
    color: #535C68;
    text-align: right;
    font-weight: bolder;
  }

  .pic-container {
    width: 1366px;
    height: 728px;
    text-align: center;
  }

  .pic {
    border-radius: 20px;
    overflow: hidden;
    width: 802px;
    height: 425px;
    /*background-color: darkkhaki;*/
  }

  .pic > img {
    width: 802px;
    height: 425px;
  }

  .content {
    position: absolute;
    width: 1370px;
    height: inherit;
    /*background-color: brown;*/
    left: 36px;
    top: 110px;
    text-align: justify;
    font-size: 21px;
    line-height: 43px;
    align-items: center;
    color: #4F4F4F;
  }

  .button {
    background: #FFFFFF;
    border: 1px solid #BDBDBD;
    box-shadow: 0px 0px 21px rgba(98, 92, 100, 0.2);
    border-radius: 10px;
    font-size: 24px;
    position: absolute;
    width: 154px;
    height: 62px;
    top: 15px;
    left: 0;
    line-height: 62px;
    color: #2F80ED;
    font-weight: bolder;
    transition: 0.5s;
  }

  .hover {
    background: #2F80ED;
    box-shadow: 0px 0px 22px rgba(47, 128, 237, 0.6);
    color: #fff;
    transform: scale(1.1);
  }
</style>
