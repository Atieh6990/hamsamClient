<template>
  <div class="circle">
    <img class="logo" src="../../assets/images/ten/hamsam.png"/>
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
    width: 79px;
    height: 79px;
    background: #F4F4F4;
    box-shadow: 0px 4px 17px rgba(0, 0, 0, 0.1);
    border-radius: 100%;
  }

  .logo {
    position: absolute;
    top: 17px;
    right: 10px;
    width: 56px;
    height: 45px;
  }
</style>
