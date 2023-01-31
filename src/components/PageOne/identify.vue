<template>
  <div
    style="position: absolute;
    overflow: hidden !important;
    left: 87px;
    /* width: 571px; */
    /* height: 120px; */
    /* border-radius: 13px; */
    z-index: 2;
    top: 452px;">


    <img :src="IMG">

  </div>
</template>

<script>
import {ROAST_CONFIG} from "../../config";

export default {
  name: "identify",
  data() {
    return {
      IMG: (ROAST_CONFIG.url_Img_server + 'identify.png'),
    }
  },

  methods:{

  }
}
</script>

<style scoped>

</style>
