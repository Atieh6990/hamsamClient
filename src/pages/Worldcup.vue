<template>
  <div class="routParent">
    <videoPlayer ref="player" v-if="!showPlayer"></videoPlayer>

  </div>
</template>

<script>
import videoPlayer from '../components/video/videoPlayer'

  export default {
    name: "eight",
    data() {

    }, created() {
      this.$root.$emit('sideMenu_deactive');
      this.$root.$emit('sideMenu_hide');
      this.$root.$emit('leftside_hide');
      this.$root.$emit('header_hide');
    },

    components: {videoPlayer},
    methods: {
      up() {
        return false
      },
      down() {
        return false
      },left() {
        return false
      },right() {
        return false
      }, enter() {
        return false
      },back() {

        this.$root.$emit('sideMenu_show');
        this.$root.$emit('leftside_show');
        this.$root.$emit('header_show');

          this.$refs.player.stop()
          console.log("inn stop")

        //  console.log("inn end")
        // this.$router.replace({path:'/worldCupHome/menuRout'});
        this.$router.go(-1);
      },done() {

      },cancel() {

      },showNumber(num) {

      },numberShow(num) {

      }
    }

  }
</script>

<style scoped>


.routParent {
  position: fixed;
  top: 0px;
  right: 0px;
  width: 1920px;
  direction: rtl;
  display: flex;
  display: -webkit-flex !important;
  height: 100%;

}

.nestedRoutParent {
  overflow: hidden;
  height: 100%;
  width: 350px;
  right: 0px;
  top: 0px;
  border-radius: 0px;
  position: relative;
  box-shadow: 0px 4px 20px 0px #00000073;
  z-index: 10000000;
}

.nestedRoutBackground {
  height: 1080px;
  width: 350px;
  right: 0px;
  top: 0px;
  border-radius: 0px;
  position: absolute;
  background-color: #11151A;
  opacity: 0.8;
}

:focus {
  outline: -webkit-focus-ring-color auto 0px !important;
}

.simple-keyboard {
  max-width: 350px !important;
  position: absolute;
  left: 0px !important;
  direction: ltr !important;
}

.iScrollLoneScrollbar {
  right: 0px !important;
}

@font-face {
  font-family: 'BYekan';
  font-weight: normal;
  font-style: normal;
  /*font-size: 18px;*/
  src: url('../assets/font/BYekan.ttf');
}

body, input, select, label, div, span, p {
  font-family: "BYekan" !important;
}

:focus {
  outline: -webkit-focus-ring-color auto 0px !important;
}

.hg-theme-default .hg-row {
  display: -webkit-flex !important;;
}

.hg-row {
  display: -webkit-flex !important;;
}
</style>

