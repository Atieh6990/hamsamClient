<template>
    <div>
      <div class="adv-holder">
        <img :src="urlDomain+'hamsam/panel/uploads/shares/news/hamsam.jpg'">
      </div>
    </div>
</template>

<script>
    import {ROAST_CONFIG} from "../../config";
    export default {
        name: "advertisement"
       , data() {
            return {
                urlDomain:ROAST_CONFIG.url_Domain
            }
        },
    }
</script>

<style scoped>

  .adv-holder{
    position: absolute;
    width: 521px;
    height: 325px;
    top:101px;
    left:115px;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.12);
    border-radius: 5px;
  }
</style>
