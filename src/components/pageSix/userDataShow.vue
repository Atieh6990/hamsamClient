<template>
  <div>
    <div class="profile-pic">
      <img v-if="!img" :src=" url_Img_page + 'header/userdefaul.png'"/>
      <img v-if="img" :src="img"/>
    </div>
    <div class="name">
      {{name}}
    </div>
  </div>
</template>

<script>

  import {ROAST_CONFIG} from '../../config';

  export default {
    props: ['name', 'img'],
    name: "user-data-show",
    data() {
      return {
        url_Img_page: ROAST_CONFIG.url_comp_server,
      }
    }
  }
</script>

<style scoped>
  .profile-pic {
    width: 137px;
    height: 137px;
    border-radius: 100%;
    overflow: hidden;
    text-align: center;
    margin-top: 7px;
    margin-right: 5px;
  }

  .profile-pic > img {
    width: inherit;
    height: inherit;
  }

  .name {
    position: absolute;
    top: 7px;
    right: 165px;
    line-height: normal;
    font-size: 30px;
    text-align: center;
    color: #4F4F4F;
  }

</style>
