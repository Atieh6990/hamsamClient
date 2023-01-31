<template>
  <div class="loading">
    <img class="overlay" :src="imgUrl+'overlay.png'"/>
    <img class="loadingS" :src="imgUrl+'loading.gif'" style="z-index: 101"/>
  </div>
</template>

<script>
  import {ROAST_CONFIG} from '../config';

  export default {
    name: "loading",
    data() {
      return {
        imgUrl: ROAST_CONFIG.url_Img_server

      }
    }
  }
</script>

<style scoped>
  .loading {
    position: absolute;
    width: 1920px;
    height: 1080px;
    top: 0px;
    left: 0px;
    z-index: 1000;
  }

  .overlay {
    position: absolute;
    top: 0px;
    left: 0px;
  }

  .loadingS {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
</style>
