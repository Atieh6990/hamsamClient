<template>
  <div class="circle">
    <img class="logo" :src="url_img + 'ten/hamsam.png'"/>
  </div>
</template>

<script>
  import {ROAST_CONFIG} from "../../config";

  export default {
    props: [],
    name: "hamsamLogo",
    data() {
      return {
        url_img: ROAST_CONFIG.url_comp_server
      }
    },
    created() {
    },
    methods: {}
  }
</script>

<style scoped>

  .circle {
    position: absolute;
    width: 124px;
    height: 124px;
    right: 32px;
    top: 36px;
    background: rgba(244, 244, 244, 1);
    border: 1.4px solid #8C8C8C;
    border-radius: 100%;
  }

  .logo {
    position: absolute;
    top: 23px;
    right: 15px;
  }
</style>
