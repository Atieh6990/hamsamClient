<template>
  <div>
    <div class="earned-achievements">
      <div v-if="earnAchievements.length == 0" class="message">لیست دستاوردها خالی است</div>
      <div v-else v-for="(earn, index) in earnAchievements" class="pics">
        <img alt="" :src="earn.pic"/>
        <div class="text">{{earn.title}}</div>
      </div>
    </div>
    <div v-if="earnAchievements.length > 4" :class="['moreTxt' , active === page && activeRoute && ypos === 1 ? 'hover' : '']">مشاهده بیشتر</div>
    <!--<div class="remain-achievements">-->
    <!--<div v-for="(remain, index) in remainAchievements" class="pics"-->
    <!--v-bind:class="active === page && activeRoute && ypos === 2 && xpos === index+1 ? 'hover' : ''">-->
    <!--<img alt="" :src="remain.image"/>-->
    <!--</div>-->
    <!--</div>-->
  </div>

</template>

<script>
  import profile from "../../api/profileALIREZA";
  import {ROAST_CONFIG} from "../../config"

  export default {
    name: "achievement",
    props: ["active", "page", "activeRoute", "id"],
    data() {
      return {
        earnAchievements: [],
        remainAchievements: [
          {image: "../src/assets/images/six/achievements/leaf-g.png"},
          {image: "../src/assets/images/six/achievements/key-g.png"},
          {image: "../src/assets/images/six/achievements/tree-g.png"},
          {image: "../src/assets/images/six/achievements/tree-g.png"},
          {image: "../src/assets/images/six/achievements/star-g.png"},
          {image: "../src/assets/images/six/achievements/like-g.png"},
          {image: "../src/assets/images/six/achievements/star-g.png"},
        ],
        xpos: 1,
        ypos: 1,
        rowLength: 11,
      }
    },
    created() {
      profile.badges(this.id).then(data => {
        this.earnAchievements = data.data.list;
        // console.log('badge ----> ' + JSON.stringify(this.earnAchievements))
      });

    },
    methods: {
      leftSide() {
        this.$root.$emit('leftside_active');
        this.activeRoute = 0;
      },

      right() {
        if (this.xpos > 1) {
          this.xpos -= 1;
          return true
        }
        return false;
      },
      left() {
        if (this.ypos === 1) {
          if (this.xpos < this.earnAchievements.length) {
            this.xpos++;
            return true
          } else if (this.xpos === this.earnAchievements.length) {
            // this.leftSide();
            return false;
          }
          return false;
        }
        // else if (this.ypos === 2) {
        //   if (this.xpos < this.remainAchievements.length) {
        //     this.xpos++;
        //     return true
        //   } else if (this.xpos === this.remainAchievements.length) {
        //     // this.leftSide();
        //     return false;
        //   }
        //   return false;
        // }
      },
      down() {
        // if (this.ypos === 1) {
        //   if (this.xpos > this.rowLength) {
        //     if (this.ypos === 1) {
        //       this.ypos = 2;
        //       this.xpos = 1;
        //       return true
        //     }
        //   }
        //
          // else if (this.xpos <= this.rowLength && (this.xpos + this.rowLength) <= this.earnAchievements.length) {
          //   this.xpos += this.rowLength; // bia khate paein
          //   return true
          // }
          // } else if (this.ypos === 2) {
          //   if (this.xpos <= this.rowLength && (this.xpos + this.rowLength) <= this.remainAchievements.length) {
          //     this.xpos += this.rowLength;
          //     return true;
          //   }
          //   return false;
        // }
      },
      up() {
        if (this.ypos === 1) {
          if (this.xpos > this.rowLength) {
            this.xpos -= 11;
            return true;
          } else
            return false;
          // } else if (this.ypos === 2) {
          //   if (this.xpos > this.rowLength) {
          //     this.xpos -= this.rowLength;
          //   } else {
          //     this.xpos = 1;
          //     this.ypos = 1;
          //     return true
          //   }
        }
      },
      enter() {
      },

      getAchievementsLength() {
        return this.earnAchievements.length
      }
    }
  }
</script>

<style scoped>
  .earned-achievements {
    width: 780px;
    height: 335px;
    position: absolute;
    top: 110px;
    right: 20px;
  }

  .pics {
    width: 180px;
    position: relative;
    float: right;
    display: inline-block;
    margin-right: 12px;
  }

  .text {
    position: relative;
    float: right;
    width: 171px;
    height: 35px;
    line-height: 35px;
    color: #000;
    text-align: center;
    font-size: 20px;
  }

  .moreTxt {
    position: absolute;
    top: 360px;
    right: 510px;
    width: 239px;
    height: 70px;
    background: #d7d7d7;
    box-shadow: 0px 0px 21px rgba(196, 196, 196, 0.32);
    border-radius: 15px;
    font-size: 24px;
    text-align: center;
    line-height: 70px;
    color: rgb(77, 13, 125);
    transition: 0.5s;
  }

  .remain-achievements {
    margin-top: 26px;
  }

  .hover {
    background: rgb(77, 13, 125);
    color: #fff;
    transition: 0.5s;
  }

  .message {
    font-size: 24px;
    /*margin: 50px;*/
    font-weight: normal;
    color: #4f4f4f;
    /*color: black;*/
  }


</style>
