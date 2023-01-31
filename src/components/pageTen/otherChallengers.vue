<template>
  <div class="title-wrapper">
    <img :src="url_img + 'ten/message.png'"/>
    <div class="title">افراد دیگری که در این چالش شرکت کرده اند</div>
    <div class="people">
      <div v-for="(p, index) in people" class="guys"
           v-bind:class="(xpos === index+1 && page === active && activeRoute === 1) ? 'hover' : ''"
           v-if="index < 4 || allPeople"><img v-bind:src="p.picture"/></div>
      <div v-if="!allPeople && people.length > 4" v-bind:class="(xpos === 5 && page === active && activeRoute === 1) ? 'hover' : ''"
           class="others">+{{people.length - 4}}
      </div>
    </div>
  </div>
</template>

<script>
  import {ROAST_CONFIG} from "../../config";

  export default {
    props: ["active", "page", "activeRoute", "people"],
    name: "otherChallengers",
    data() {
      return {
        allPeople: false,
        //people: [],
        xpos: 1,
        url_img: ROAST_CONFIG.url_comp_server
      }
    },

    created() {

    },

    methods: {
      showOthers() {
        if (!this.allPeople && this.xpos === 5)
          this.allPeople = true
      },
      left() {
        if (!this.allPeople) {
          if (this.xpos < 5) {
            if (this.xpos === 5)
              return false;
            else {
              this.xpos++;
              return true;
            }
          }
        } else if (this.allPeople) {
          if (this.xpos < this.people.length) {
            this.xpos++;
            return true
          }
          return false;
        }
      },
      right() {
        if (this.xpos > 1) {
          this.xpos -= 1;
          return true;
        }
        return false;
      },
    }
  }
</script>

<style scoped>

  .title-wrapper {
    font-size: 21px;
    color: #4B0D85;
  }

  .title {
    font-weight: bolder;
    right: 30px;
    position: absolute;
    width: 400px;
    top: 0;
  }

  .people {
    position: absolute;
    width: 480px;
    height: 200px;
    text-align: right;
    right: 10px;
    top: 110px;
  }

  .guys, .others {
    width: 80px;
    height: 80px;
    border-radius: 80px;
    overflow: hidden;
    margin-right: 3px;
    display: inline-block;
    text-align: center;
    border: 4px solid transparent;
    transition: 0.7s;
  }

  .others {
    background: #FFFFFF;
    box-shadow: 0px 1px 19px rgba(0, 0, 0, 0.16);
    color: #A6A6A6;
    font-size: 24px;
    line-height: 90px;
  }

  .guys > img {
    width: 80px;
    height: 80px;
  }

  .hover {
    border: 4px solid #4B0D85;
    transition: 0.7s;
    transform: scale(1.1);
  }
</style>
