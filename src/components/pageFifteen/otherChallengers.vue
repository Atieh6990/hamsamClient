<template>
  <div class="title-wrapper">
    <img v-if="title != null" :src="url_img + 'ten/message.png'"/>
    <div v-if="title != null" class="title">{{title}}</div>
    <div class="hline"></div>
    <div class="people">
      <div v-for="(p, index) in people" class="guys"
           v-if="index < available || allPeople">
        <div class="tooltip">
          <div v-show="(active === 5 && xpos === index+1 && page === active && activeRoute === 1)" class="tooltiptext">
            {{p.username|substr(10)}}
          </div>
          <div v-show="(active === 4 && xpos === index+1 && page === active && activeRoute === 1)" class="tooltiptext">
            {{p.name|substr(10)}}
          </div>
        </div>
        <div class="iconParent">
          <img v-if="p.pic != null && p.pic !== ''" :src="p.pic" style="z-index: 2"
               :class="[(xpos === index+1 && page === active && activeRoute === 1) ? 'hvr-bob' : '']"/>
          <img v-if="p.icon != null && p.icon !== ''" :src="p.icon" style="z-index: 2"
               :class="[(xpos === index+1 && page === active && activeRoute === 1) ? 'hvr-bob' : '']"/>
          <img v-if="p.icon === null && p.icon !== ''" :src="url_img + 'header/userdefaul.png'" style="z-index: 1"/>
        </div>

      </div>
      <div
        v-if="!allPeople && people.length > 9"
        v-bind:class="(xpos === available+1 && page === active && activeRoute === 1) ? 'hvr-bob' : ''"
        class="others">
        {{available}}+
      </div>
    </div>
  </div>
</template>

<script>
  import profile from '../../api/profile'
  import friend from '../../api/friends'
  import {ROAST_CONFIG} from "../../config";
  import func from '../../mixins/func';

  export default {
    props: ["active", "available", "title", "page", "activeRoute", "people", "friendsFlag", "interestsFlag"],
    name: "otherChallengers",
    data() {
      return {
        allPeople: false,
        xpos: 1,
        url_img: ROAST_CONFIG.url_comp_server
      }
    },
    created() {
    },
    mixins: [func],
    methods: {

      left() {
        if (this.xpos < this.people.length && this.xpos % 5 !== 0) {
          this.xpos++;
          return true;
        }
        if ((this.interestsFlag || this.friendsFlag) || (this.interestsFlag && this.friendsFlag)) {
          if (this.people.length === this.xpos || this.xpos === 5) {
            return false;
          }
        }
        return false;
      },
      right() {
        if ((this.xpos === 1 || this.xpos === 6) && this.active === 5) {
          // this.removeOver();
          // this.activeRoute = 0;
          return false;
        } else if (this.xpos > 1 && this.xpos % 5 !== 1) {
          this.xpos -= 1;
          return true;
        } else {
          this.xpos = 1;
          return false;
        }
      },
      down() {
        if (this.allPeople) {
          if (this.xpos + 5 <= this.people.length) {
            this.xpos += 5;
            return true
          }
        } else {
          if (this.xpos + 5 <= this.available + 1) {
            this.xpos += 5;
            return true;
          }
        }
      },
      up() {
        if (this.xpos - 5 >= 1) {
          this.xpos -= 5;
          return true
        } else return false
      },
      enter(nav, user, myUser) {
        let time = new Date().getTime();
        if ((nav === 5 && this.allPeople) || this.xpos < 10) {
          profile.openProfile(this.people[this.xpos - 1].id).then(data => {
            if (data.success === true) {
              // console.log(data)
              this.$router.push({
                path: '/six/' + time,
                query: {params: data.data, id: this.people[this.xpos - 1].id}
              });
            }
          });
        } else {
          if(user == myUser){
            this.$router.push({
              path: '/five/' + time,
              query: {id: user}
            });
          }

        }
        // if (this.xpos === 12){
        //   this.allPeople = true;
        // }
      }
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
    top: 60px;
  }

  .guys, .others {
    position: relative;
    width: 94px;
    height: 110px;
    float: right;
    text-align: center;
    /*transition: 0.7s;*/
  }

  .others {
    width: 80px;
    height: 80px;
    background: #4B0D85;
    box-shadow: 0px 1px 19px rgba(0, 0, 0, 0.16);
    color: #fff;
    font-size: 26px;
    line-height: 80px;
    border-radius: 50%;
    position: relative;
    top: 43px;
    right: 10px;
  }

  .iconParent {
    position: absolute;
    width: 100px;
    height: 100px;
    right: 0px;
    top: 35px;
  }

  .iconParent > img {
    position: absolute;
    width: 80px;
    height: 80px;
    left: 10px;
    top: 7px;
    border-radius: 50%;
  }

  /*.hover {*/
  /*  border: 3px solid #4B0D85;*/
  /*  !*transform: scale(1.03);*!*/
  /*  !*transition: 0.5s;*!*/
  /*  color: #fff;*/
  /*}*/
  .hvr-bob {
    vertical-align: middle;
    -webkit-animation-name: hvr-bob-float, hvr-bob;
    animation-name: hvr-bob-float, hvr-bob;
    -webkit-animation-duration: .3s, 1.5s;
    animation-duration: .3s, 1.5s;
    -webkit-animation-timing-function: ease-out, ease-in-out;
    animation-timing-function: ease-out, ease-in-out;
    -webkit-animation-iteration-count: 1, infinite;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-direction: normal, alternate;
    animation-direction: normal, alternate;
  }

  @keyframes hvr-bob {
    0% {
      -webkit-transform: translateY(-15px);
      transform: translateY(-15px);
    }
    50% {
      -webkit-transform: translateY(-5px);
      transform: translateY(-5px);
    }
    100% {
      -webkit-transform: translateY(-15px);
      transform: translateY(-15px);
    }
  }

  .hline {
    width: 455px;
    height: 1px;
    background-color: #d7d7d7;
    position: absolute;
    float: left;
    top: 74px;
  }

  .tooltip {
    position: relative;
    float: left;
    left: 92px;
    top: -10px;
    display: inline-block;
    border-bottom: 1px dotted black;
    z-index: 11;

  }

  .tooltip .tooltiptext {
    width: 100px;
    height: 30px;
    line-height: 30px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.31);
    color: #89949a;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    font-size: 16px;
    overflow: hidden;

  }

  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: rgb(255, 255, 255) transparent transparent transparent;
    border-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.31);
    transition: 2s;
  }

</style>
