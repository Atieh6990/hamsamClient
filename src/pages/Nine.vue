<template>
  <div>
    <div class="gameParent">
      <img v-for="(Game , i) in games" class="gameIcon" :src="'dist/images/games/' + games[i] + '.png'"
           :class="[(xpos == i + 1) && (activeRoute == 1) ? 'hover hvr-bob': '']">
    </div>
    <div v-if="showMsg" class="msg">در حال حاضر این قسمت در دسترس نمیباشد.</div>
  </div>


</template>

<script>
    import {mapGetters} from 'vuex'
    import {page} from 'vue-analytics'

    export default {
        name: "nine",
        data() {
            return {
                games: ['2048', 'gardone-shans', 'zang-ryazi', 'game-center', 'pish-bini'],
                xpos: 1,
                activeRoute: 1,
                showMsg: false,
                datas: [],
                typeUser: '',
                rules: ''

            }
        },
        methods: {
            ...mapGetters([
                'getUser'
            ]),
            removeOverR() {
                this.activeRoute = 0;
                this.$root.$emit('sideMenu_active');

            },
            removeOverL() {
                this.activeRoute = 0;
                this.$root.$emit('leftside_active');
            },
            right() {
                if (this.xpos > 1) {
                    this.xpos--;
                    return true;
                }
                this.removeOverR();
                return false;
            }, left() {
                if (this.xpos < this.games.length) {
                    this.xpos++;
                    return true;
                } else if (this.xpos == this.games.length) {
                    this.removeOverL();
                    return true;
                }
                return false;
            },
            enter() {
                page({
                    page: this.games[this.xpos] + 'games',
                    title: this.games[this.xpos] + 'games'
                })
                // var show = this;
                // show.showMsg = true;

                // setTimeout(function () {
                //     show.showMsg = false;
                // }, 3000);
                //

                let time = new Date().getTime();
                this.datas = this.getUser();
                this.rules = this.datas['rules'];
                this.typeUser = this.datas['type'];


                if (this.xpos == 1) {//2048

                    this.$root.$emit('sideMenu_hide');
                    this.$root.$emit('leftside_hide');
                    this.$root.$emit('header_hide');
                    this.$router.push({path: '/fourteen'});

                } else if (this.xpos == 2) {//chanse
                    // this.$router.push({path: '/eleven/' + time});
                    this.$root.$emit('Chanse_on', 0);
                } else if (this.xpos == 3) {//bazi riyazi
                    this.$router.push({path: '/sixteen/' + time});
                } else if (this.xpos == 4) {//game center
                    if (this.rules == 0) {
                        this.$root.$emit('popup_rules');

                    } else {
                        if (this.typeUser == 0) {
                            this.$root.$emit('popup_signup');
                        } else {

                          console.log(this.datas['userID'])
                          this.$router.push({path: '/twoelve/' + time});
                            // if (this.datas['userID'] == "346623" || this.datas['userID'] == "196568") {
                            //     this.$router.push({path: '/twoelve/' + time});
                            // } else {
                            //     var show = this;
                            //     show.showMsg = true;
                            //
                            //     setTimeout(function () {
                            //         show.showMsg = false;
                            //     }, 3000);
                            //
                            // }

                        }
                    }

                } else if (this.xpos == 5) {//forecast
                    this.$router.push({path: '/twentyThree/' + time});
                }
            },
            back() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
  .gameParent {
    width: 1506px;
    height: 416px;
    position: absolute;
    top: 145px;
    left: 190px;

  }

  .gameIcon {
    position: relative;
    float: right;
    margin-right: 5px;
  }

  .hover {
    border: 3px solid #636467;
    border-radius: 5px;
  }

  .msg {
    width: 100%;
    height: 100px;
    line-height: 100px;
    font-size: 25px;
    color: #636467;
    position: absolute;
    bottom: 220px;
    direction: rtl;
  }

  .hvr-bob {
    vertical-align: middle;
    -webkit-animation-name: hvr-bob-float, hvr-bob;
    animation-name: hvr-bob-float, hvr-bob;
    -webkit-animation-duration: .3s, .9s;
    animation-duration: .3s, .9s;
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
      -webkit-transform: translateY(-20px);
      transform: translateY(-20px);
    }
    50% {
      -webkit-transform: translateY(-10px);
      transform: translateY(-10px);
    }
    100% {
      -webkit-transform: translateY(-20px);
      transform: translateY(-20px);
    }
  }
</style>
