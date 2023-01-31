<template>
  <div class="fifteen">

    <div class="challenge-menu">
      <challenge-menu ref="menu" :active="1" :page="xpos" :activeRoute="activeRoute"
                      :selected="this.getFilteredChallenge()"></challenge-menu>
    </div>

    <div class="details" v-if="challenges.length > 0">
      <best-pic-of-month :key="ypos" :renderFlag="xpos === 2" :ypos="xpos === 2 ? ypos : selected"
                         :obj="challenges"></best-pic-of-month>
    </div>

    <div class="challenge-position" v-if="challenges.length > 0">
      <challenge ref="challenge" :active="2" :page="xpos" :activeRoute="activeRoute" :data="challenges"
                 :length="challenges.length" :isActivity="isAct"></challenge>
    </div>

  </div>
</template>

<script>
  import BestPicOfMonth from "../components/pageFifteen/bestPicOfMonth"
  import FilterButton from "../components/pageFifteen/filterButton"
  import Challenge from "../components/pageFifteen/challenge";
  import ChallengeMenu from "../components/pageFifteen/ChallengeMenu";
  import connect from "../api/challenge";
  import {mapGetters, mapMutations} from "vuex"
  import profile from "../api/profileALIREZA"

  export default {
    name: "fifteen",
    components: {Challenge, BestPicOfMonth, FilterButton, ChallengeMenu},
    data() {
      return {
        allChallenges: [],
        myChallenges: [],
        challenges: [],
        activities: [],
        active: 2,
        xpos: 2,
        ypos: 1,
        activeRoute: 1,
        myScroll: '',
        challengeStatus: false,
        myChallengeFlag: false,
        isAct: false,
        selected: 1
      }
    },

    activated() {
      this.ypos = 1;
      // if (lastFilterChallengeSelected === undefined || lastFilterChallengeSelected === null)
      //   lastFilterChallengeSelected = 1;
      // this.selected = window.lastFilterChallengeSelected;
      this.distinguish(this.getFilteredChallenge());
    },

    // 20202HLPSO165ELU

    watch: {},

    methods: {

      ...mapMutations([
        'setFilteredChallenge'

      ]),

      ...mapGetters([
        'getUser',
        'getFilteredChallenge'
      ]),

      distinguish(deter) {

        this.selected = 1;
        this.challenges = [];
        connect.getChallenges(this.getUser().userID).then(response => {
          this.allChallenges = response.data.challenges;
          this.myChallenges = response.data.userchallenge;

          var ch = this.allChallenges.filter((value, index, arr) => {
            for (var i = 0; i < this.allChallenges.length; i++) {
              for (var j = 0; j < this.myChallenges.length; j++) {
                if (value.id == this.myChallenges[j].challenge_id)
                  return value;
              }
            }
          });
          this.myChallenges = ch;
          if (deter === 1) {
            this.challenges = this.allChallenges;
            this.myChallengeFlag = false;
          } else if (deter === 2) {
            this.challenges = this.myChallenges;
            this.myChallengeFlag = false;
          } else {
            connect.activityList(this.getUser().userID).then(response => {
              this.challenges = response.data;
            })
          }
          deter === 3 ? this.isAct = true : this.isAct = false;
          // console.log(this.challenges);

          //this.$refs.challenge.resetScroll();
          // this.scrollInit()
        });
      },

      isInMyChallenge(obj, arr) {
        var i;
        for (i = 0; i < arr.length; i++) {
          if (arr[i] === obj) {
            return true;
          }
        }
        return false;
      },
      down() {
        if (this.xpos === 2) {
          if (this.ypos < this.challenges.length) {
            this.ypos++;
            this.$refs.challenge.down()
          }
        } else if (this.xpos === 1) {
          // if (this.ypos < 3)
          //   this.ypos++;
          if (this.challenges.length !== 0) {
            this.ypos = this.selected;
            this.xpos = 2;
            if (this.myChallengeFlag)
              this.$refs.challenge.ypos = 1;
          }
        }
      },
      up() {
        if (this.xpos === 2) {
          if (this.ypos > 1)
            this.ypos -= 1;
          else {
            this.selected = this.ypos;
            this.xpos = 1;
            this.ypos = 1;
          }
          this.$refs.challenge.up()
        } else {
          if (this.ypos > 1)
            this.ypos -= 1;
        }
      },
      right() {
        if (this.xpos === 2) {
          this.$root.$emit('sideMenu_active');
          this.activeRoute = 0;
        } else {
          if (!this.$refs.menu.right()) {
            this.$root.$emit('sideMenu_active');
            this.activeRoute = 0;
          }
        }
      },
      left() {
        if (this.xpos === 2) {
          this.$root.$emit('leftside_active');
          this.activeRoute = 0;
        } else {
          this.$refs.menu.left();
        }
      },
      enter() {
        if (this.xpos === 1) {
          // = this.$refs.menu.enter();
          this.setFilteredChallenge(this.$refs.menu.enter())
          this.distinguish(this.$refs.menu.enter());
        }

        if (this.xpos === 2 && !this.isAct) {
          // alert(this.myChallenges.indexOf(this.challenges[this.ypos - 1]));
          if (!this.isInMyChallenge(this.challenges[this.ypos - 1], this.myChallenges))
            this.challengeStatus = false;
          else
            this.challengeStatus = true;
          // connect.challengeStartGiveup(this.challenges[this.ypos - 1].id).then(data => {
          //   if (data.data.data.success === true)
          //     this.challengeStatus = true
          // });
          //   alert('fifi')
          connect.challengeDetail(this.$refs.challenge.enter(), this.getUser().userID)
            .then(data => {
              // console.log(data.challenges[0])
              this.$router.push({
                path: '/ten/' + new Date().getTime(),
                query: {params: data.challenges[0]},
              });
            })
        }
      },
      back() {
        this.$router.go(-1);
      },
    }
  }
</script>

<style scoped>
  .fifteen {
    direction: rtl;
  }

  .challenge-position {
    width: 1110px;
    height: 1600px;
    /*background-color: #2c3e50;*/
    position: absolute;
    right: 30px;
    text-align: center;
    top: 170px;
  }

  .details {
    top: 185px;
    right: 1175px;
    position: absolute;
  }

  .challenge-menu {
    position: absolute;
    top: 90px;
    right: 90px;
  }

  .menu {
    position: absolute;
    width: 229px;
    right: 90px;
    top: 220px;
    height: 800px;
    /*background-color: #337ab7;*/
    font-size: 21px;
  }

  .menu-hover {
    color: #2F80ED;
    border-right: 3px solid #3A4AB4;
    background-color: #E0ECFA;
  }

  .menu-item {
    height: 38px;
    line-height: 38px;
  }
</style>
