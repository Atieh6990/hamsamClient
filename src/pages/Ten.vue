<template>
  <div id="ten" dir="rtl">
    <div class="slider-wrapper">
      <slider ref="slider" :data="challenge" :active="1" :page="xpos" :activeRoute="activeRoute"></slider>
    </div>

    <div class="people-challenge-wrapper">
      <other-challengers ref="other" :active="2" :page="xpos" :people="others"
                         :activeRoute="activeRoute"></other-challengers>
    </div>

    <div class="challenge-wrapper">
      <challenge-content :inChallenge="challenge.is_active ? true : false" :data="challenge"
                         :desc="challenge.description" ref="content" :active="3" :page="xpos"
                         :activeRoute="activeRoute"></challenge-content>
    </div>

    <div class="current-challenge-info" v-if="challenge.length>0">
      <current-challenge-info :data="challenge"></current-challenge-info>
    </div>

  </div>
</template>

<script>
  import Slider from "../components/pageTen/slider";
  import ChallengeContent from "../components/pageTen/challengeContent";
  import OtherChallengers from "../components/pageTen/otherChallengers";
  import currentChallengeInfo from "../components/pageTen/currentChallengeInfo";
  import connect from "../api/challenge"

  export default {
    name: "ten",
    components: {OtherChallengers, ChallengeContent, Slider, currentChallengeInfo},
    data() {
      return {
        user: [
          {icon: '../assets/images/ten/info/card.png', text: 'کارت', data: 1},
          {icon: '../assets/images/ten/info/star.png', text: 'امتیاز', data: 30},
          {icon: '../assets/images/ten/info/bitcoin.png', text: 'سکه', data: 20},
          {icon: '../assets/images/ten/info/rank.png', text: 'سطح', data: 2},
        ],
        challenge: this.$route.query.params,
        xpos: 3,
        active: 1,
        activeRoute: 1,
        showAllPeople: false,
        others: []
      }
    },

    created() {


      connect.getOtherChallengers(this.challenge.id).then(response => {
        this.others = response.data;
      })
    },

    activated() {
      this.show = true
    },

    deactivated() {
      this.show = false;
    },

    methods: {
      right() {
        if (this.xpos === 1) {
          if (!this.$refs.slider.right())
            this.xpos = 3;
        } else if (this.xpos === 2) {
          if (!this.$refs.other.right())
            this.xpos = 3
        } else if (this.xpos === 3)
          if (!this.$refs.content.right())
            this.rightSide();
      },
      left() {
        // if (this.xpos === 1) {
        //   if (!this.$refs.slider.left())
        //     this.leftSide()
        // } else if (this.xpos === 2) {
        //   if (!this.$refs.other.left())
        //     this.leftSide()
        // } else
        if (this.xpos === 3) {
          // this.$refs.content.left();
          // this.xpos = 1;
          this.leftSide()
        }
      },
      down() {
        // if (this.xpos === 1) {
        //   if (!this.$refs.slider.down())
        //     this.xpos += 1
        // } else
        if (this.xpos === 3) {
          this.$refs.content.down();
        }
      },
      up() {
        if (this.xpos === 3) {
          this.$refs.content.up()
        } else if (this.xpos === 2)
          this.xpos = 1;
      },
      enter() {
        if (this.xpos === 2) {
          this.$refs.other.showOthers();
        } else if (this.xpos === 1)
          this.$refs.slider.changeMainPic();
        else if (this.xpos === 3) {
          this.$refs.content.enter()
        }
      },
      rightSide() {
        this.$root.$emit('sideMenu_active');
        // this.$root.$emit('leftSideMenu_active');
        this.activeRoute = 0;
      },
      leftSide() {
        this.$root.$emit('leftside_active');
        this.activeRoute = 0;
      },
      back() {
        if (this.$refs.content.modalShowStatus()) {
          this.$refs.content.close();
        } else {
          this.$router.go(-1);
        }
      }
    }
  }
</script>

<style scoped>
  .slider-wrapper {
    position: absolute;
    left: 109px;
    top: 100px;
  }

  .challenge-wrapper {
    position: absolute;
    /*background-color: aquamarine;*/
    height: 4500px;
    width: 830px;
    left: 1000px;
    top: 80px;
  }

  .people-challenge-wrapper {
    position: absolute;
    top: 730px;
    right: 1000px;
  }

  .current-challenge-info {
    position: absolute;
    top: 900px;
    right: 1000px;
  }

</style>
