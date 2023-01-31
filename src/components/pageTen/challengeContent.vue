<template>
  <div class="wrapper" dir="rtl">
    <div class="title" v-bind:style="{color: data.color}">
      {{data.title}}
    </div>
    <div class="challenge-button">
      <challenge-button :inch="isInChallenge"
                        :noramlHover="xpos === 0 && !isInChallenge && active === page && activeRoute === 1"
                        :hover="isInChallenge && xpos === 0 && active === page && activeRoute === 1"></challenge-button>
    </div>

    <div class="description">{{desc |substr(200)}}</div>
<!--    <div class="description" v-html="editStr(desc).replace(/(<([^>]+)>)/ig,'')"></div>-->
    <div class="more" v-bind:class="this.xpos === 1 ? 'more-hover' : ''">بیشتر</div>

    <div class="user-information">
      <user-info :data="data" :type="'chType'"></user-info>
    </div>
    <div class="activities">
      <activity ref="act" :page="page" :active="active" :activeRoute="activeRoute" :data="acts"></activity>
    </div>
  </div>
</template>

<script>
    import ChallengeButton from "./challengeButton";
    import UserInfo from "../pageTen/userInfo"
    import Activity from "../pageTen/activity";
    import IScroll from "../../js/iscroll";
    import connect from "../../api/challenge";
    import {mapGetters} from 'vuex';
    import func from '../../mixins/func';

    export default {
        props: ["page", "active", "activeRoute", "data", "inChallenge", "desc"],
        name: "challengeContent",
        mixins: [func],
        components: {UserInfo, ChallengeButton, Activity},
        data() {
            return {
                user: [2, 20, 30, 1],
                acts: this.data.activity,
                xpos: null,
                actYpos: 1,
                myScroll: '',
                isInChallenge: null,
                pureDescription: '',
                finalDesc: '',
                modalShow: false,
                datas: [],
                typeUser: '',
            }
        },
        computed: {
            // editStr(str) {
            //   this.pureDescription = str + '';
            //   let firstDot = this.pureDescription.indexOf('.');
            //   let secondDot = this.pureDescription.indexOf('.', firstDot + 1); // +1esh baraye ineke az "."e aval be bad ro hesab konim.
            //   this.finalDesc = this.pureDescription.substr(0, secondDot + 1); // +1esh be khatere ineke khode "." ham to string biad.
            //   // this.finalDesc = striptag(this.finalDesc);
            //   return this.finalDesc;
            // },
        },
        created() {
            console.log('desc ->', this.desc);
            console.log(this.editStr(this.desc));

            if (this.data.is_active)
                this.isInChallenge = true;
            else this.isInChallenge = false;

            // console.log(this.data.activity);

            var self = this;
            setTimeout(() => {
                this.initScroll();
                if (self.acts.length > 0)
                    self.xpos = 2;
                else self.xpos = 1;
            }, 600)
        },
        methods: {
            ...mapGetters([
                'getUser'
            ]),
            editStr(str) {
                this.pureDescription = str + '';
                let firstDot = this.pureDescription.indexOf('.');
                let secondDot = this.pureDescription.indexOf('.', firstDot + 1); // +1esh baraye ineke az "."e aval be bad ro hesab konim.
                this.finalDesc = this.pureDescription.substr(0, secondDot + 1); // +1esh be khatere ineke khode "." ham to string biad.
                // alert(this.finalDesc);
                return this.finalDesc;
            },

            up() {
                if (this.xpos === 2) {
                    if (!this.$refs.act.up()) {
                        this.xpos = 1
                    }
                } else if (this.xpos === 1) {
                    this.xpos -= 1;
                }
            },
            down() {
                if (this.xpos === 2) {
                    if (this.acts.length > 0) {
                        if (this.$refs.act.down() > 4) {
                            this.myScroll.moveDown(138);
                        }
                    }
                } else if (this.xpos === 1) {
                    if (this.acts.length > 0) {
                        this.xpos = 2;
                        this.$refs.act.xpos = 1;
                    }
                } else if (this.xpos === 0)
                    this.xpos++;
            },
            left() {
                return false;
            },

            right() {
                if (this.xpos === 1)
                    return false;
            },

            close() {
                this.$root.$emit("modal_off");
                this.modalShow = false;
            },

            enter() {
                // alert('===' + this.xpos + ' ' + this.isInChallenge + ' ' + this.modalShow)
                this.datas = this.getUser();
                this.typeUser = this.datas['type'];
                if (this.xpos === 0) {
                    if (this.typeUser != 0) {
                        if (this.isInChallenge === false) {

                            this.challengeStartGiveupHandling();


                        } else {
                            if (!this.modalShow) {
                                this.modalShow = true;
                                var obj = {
                                    color: "#EB5757",
                                    text: 'شما می خواهید از چالش "' + this.data.title + '" انصراف دهید. آیا مطمئن هستید؟',
                                    pics: null,
                                    icon: '',
                                    btnNumber: 2,
                                    btnText: ['خیر', 'بله'],
                                    title: 'انصراف از چالش'
                                };
                                this.$root.$emit("modal_active", (obj));
                            } else { // bale
                                this.close();
                                //this.challengeStartGiveupHandling();
                            }


                        }
                    } else {
                        this.$root.$emit('popup_signup');
                    }
                } else if (this.xpos === 1) {
                    this.modalShow = true;
                    var obj = {
                        text: this.data.description,
                        pics: this.data.background2,
                        btnNumber: 1,
                        btnText: 'تایید',
                        title: this.data.title
                    };
                    this.$root.$emit("modal_active", (obj));
                }
            },

            modalShowStatus() {
                return this.modalShow;
            },

            challengeStartGiveupHandling() {
                connect.challengeStartGiveup(this.data.id).then(data => {
                    if (data.data.success === false) {
                    } else {
                        this.isInChallenge = !this.isInChallenge;
                        this.$root.$emit("modal_off");
                    }
                })
            },

            initScroll() {
                this.myScroll = new IScroll(".activities", {
                    scrollY: true,
                    scrollbars: "custom ",
                    momentum: true,
                    preventDefault: false,
                    scrollbars: true,
                    mouseWheel: true,
                    interactiveScrollbars: true,
                    shrinkScrollbars: 'none',
                    fadeScrollbars: false,
                    mouseMove: true
                })
            }
        }
    }
</script>

<style scoped>
  .title {
    font-size: 34px;
    /*color: #FC4A1A;*/
    font-weight: bolder;
    text-align: right;
    width: 600px;
  }

  .challenge-button {
    top: 20px;
    right: 615px;
    position: absolute;
  }

  .description {
    position: absolute;
    /*background-color: antiquewhite;*/
    top: 100px;
    width: inherit;
    height: 200px;
    font-size: 22px;
    text-align: justify;
    /*line-height: 45px;*/
    color: #000;
    /*overflow: hidden;*/
  }

  .user-information {
    /*position: absolute;*/
    /*top: 350px;*/
    /*left: 150px;*/

    width: 985px;
    height: 85px;
    position: absolute;
    /* float: left; */
    top: 340px;
    right: -53px;
  }

  .challenge-wrapper {
    position: absolute;
    /*background-color: aquamarine;*/
    height: 4500px;
    width: 830px;
    left: 970px;
    top: 80px;
  }

  .more {
    background: #FFFFFF;
    font-size: 21px;
    position: absolute;
    top: 240px;
    right: 610px;
    color: #337ab7;
    border: 1px solid #337ab7;
    transition: 1s;
    display: inline-block;
    font-weight: bolder;
    box-sizing: border-box;
    box-shadow: 0px 4px 10px rgba(86, 86, 86, 0.26);
    border-radius: 10px;
    text-align: center;
    /*font-size: 24px;*/
    line-height: 57px;
    width: 221px;
    height: 57px;
  }

  .more-hover {
    transition: 1s;
    color: #fff;
    background-color: #337ab7;
  / / border: 1 px solid #337ab7;
  }

  .activities {
    position: absolute;
    top: 470px;
    left: 850px;
  }

</style>
