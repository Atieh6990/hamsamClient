<template>
  <div id="six" dir="rtl">
    <div class="top">
      <userDataShow :name="object.username" :img="object.pic || object.picture"></userDataShow>

      <div class="pages">
        <ProfileMenu :me="!infoShow" :page="xpos" :activeRoute="activeRoute" :active="1" :selected="sel" :xpage="xpage"
                     ref="ProfileMenu"></ProfileMenu>
      </div>

    </div>
    <div v-if="friendButton" class="buttonParent">
      <div :class="[xpos === 0 && showButton === 1 && activeRoute === 1 ? 'hvr-bob' : '']"
           style="background-color: rgb(77, 13, 125)"
           class="friendship">ارسال پیام
      </div>
      <div ref="friendship" :class="[xpos === 0 && showButton === 2 && activeRoute === 1 ? 'hvr-bob' : '']"
           class="friendship">{{friendshipText}}
      </div>
    </div>


    <div v-if="infoShow" class="info">
      <user-info :data="detail" :type="'proType'"></user-info>
    </div>

    <div v-if="pageNav === 1" class="about-me page">

      <!--------------------diagram--------------------->
      <div class="titr"><img src="../assets/images/six/friends.png"/>
        <div class="text">
        </div>
      </div>
      <div class="" :class="['chart-wrapper' , (userID === getUser().userID) ? 'chartPos':'']">
        <!--<div class="line" style="right: 145px;"></div>-->
        <!--<div class="line" style="right: 270px;"></div>-->
        <!--<div class="line" style="right: 395px;"></div>-->
        <!--<div class="line" style="right: 520px"></div>-->
        <!--<div class="line" style="right: 645px"></div>-->
        <!--<div class="line" style="right: 770px"></div>-->
        <CommitChart :chartData="chart" :width="904" :height="327"></CommitChart>
      </div>
      <!-----------------End diagram---------------------->
      <!------------------achievements-------------------->
      <div class="achievements-container">
        <div class="titr">
          <img style="display: block" class="achievements-icon" :src="url_img + 'six/medalhaye-daryafty.png'"/>
          <div class="text achievements-txt">دستاوردها</div>
          <achievement ref="achievement" :id="this.userID" :activeRoute="activeRoute" :page="xpos" :active="2"
                       :ypos="ypos"></achievement>
        </div>
      </div>
      <!----------------End achievements------------------>
      <!--------------------friends----------------------->
      <div class="friends">
        <div class="titr">
          <img :src="url_img + 'six/friends.png'" alt="">
          <div class="text">دوستان</div>
        </div>
        <div v-show="noFriendFlag" class="message">لیست دوستان خالی است</div>
        <other-challengers :interestsFlag="noInterestsFlag" ref="friends" :people="friends" :page="xpos" :active="5"
                           :activeRoute="activeRoute"
                           style="margin-top: 60px;"
                           :title="null" :available="friends.length < 9 ? friends.length : 9"></other-challengers>
      </div>
      <!-----------------End Friends-------------------->
      <!------------------interests--------------------->
      <div class="friends" style="right: 20px;">
        <div class="titr">
          <img :src="url_img + 'six/friends.png'" alt="">
          <div class="text">علاقه مندی ها</div>
        </div>
        <div v-show="noInterestsFlag" class="message">لیست علاقه مندی ها خالی است</div>
        <other-challengers :friendsFlag="noFriendFlag" ref="interest" :people="favs" :page="xpos" :active="4"
                           :activeRoute="activeRoute"
                           style="margin-top: 60px;"
                           :title="null" :available="favsLength < 9 ? favsLength : 9"></other-challengers>
      </div>
      <!------------------End interests--------------------->
      <!----------------recent activities------------------->
      <div class="recent-activity">
        <div class="titr">
          <img :src="url_img + 'six/friends.png'" alt="">
          <div class="text">فعالیت های اخیر</div>
        </div>
        <div class="act-wrapper">
          <div v-show="activities.length === 0" class="message">لیست فعالیت ها خالی است</div>
          <recent-activities v-for="act in activities" :act="act"></recent-activities>
        </div>
      </div>
      <!----------------End recent activities--------------->
      <!------------------recent challenges----------------->
      <div class="recent-challenges">
        <div class="titr" style="right: 15px;">
          <img :src="url_img + 'six/achievement.png'" alt="">
          <div class="text">چالش های اخیر</div>
        </div>
        <div class="hline"></div>
        <div v-show="challenges.length === 0" class="message">لیست چالش ها خالی است</div>

        <recent-challenge ref="challenge" :activeRoute="activeRoute" :data="challenges"
                          :hover="xpos === 3 && activeRoute"></recent-challenge>
        <!--        <recent-challenge :hover="ypos === index+1 && xpos === 3 && activeRoute"-->
        <!--                          :activeRoute="activeRoute"-->
        <!--                          v-for="(challenge, index) in challenges"-->
        <!--                          :length="challenges.length"-->
        <!--                          :data="challenge"></recent-challenge>-->
      </div>

    </div>
    <!----------------End recent challenge---------------->
  </div>
</template>

<script>
    import {ROAST_CONFIG} from '../config';
    import ProfileMenu from '../components/pageSix/profileMenu'
    import userDataShow from '../components/pageSix/userDataShow'
    import {mapGetters} from 'vuex'
    import api from '../api/userAlbum'
    import CommitChart from '../js/commitChart';
    import Achievement from "../components/pageSix/achievement";
    import OtherChallengers from "../components/pageFifteen/otherChallengers";
    import RecentActivities from "../components/pageSix/recentActivities";
    import RecentChallenge from "../components/pageSix/recentChallenge";
    import profile from "../api/profileALIREZA";
    import friends from "../api/friends";
    import UserInfo from "../components/pageTen/userInfo";
    import challenge from "../api/challenge"
    import {page} from 'vue-analytics'


    export default {
        name: "six",
        data() {
            return {
                url_img: ROAST_CONFIG.url_Img_server,
                activities: ['هم سام جدید رو بشناس', 'هم سام جدید رو بشناس', 'هم سام جدید رو بشناس'],
                activeRoute: 1,
                xpos: 1,
                pageNav: 1,
                ypos: 1,
                friendshipText: '',
                object: this.$route.query.params,
                userID: this.$route.query.id,
                albumData: null,
                friends: [],
                friendButton: true,
                friendship: false,
                noFriendFlag: false,
                noInterestsFlag: false,
                favs: [],
                favsLength: 0,
                challenges: [],
                chart: {},
                infoShow: true,
                sel: 0,
                showButton: 1,
                xpage: 0,
                detail: []
            }
        },

        created() {
            console.log('object -> ', JSON.stringify(this.object));
            page({
                page: 'view my profile',
                title: 'view my profile'
            })
            if (this.object == undefined) {
                this.object = this.getUser();
                this.userID = this.getUser().userID;
                this.friendButton = false;
                this.infoShow = false;
            }
            // console.log(this.userID + '     ' + this.getUser().userID)

            if (this.userID === this.getUser().userID) {
                this.friendButton = false;
                this.infoShow = false;
                page({
                    page: 'view my profile for other user',
                    title: 'view my profile for other user'
                })
            }


            profile.friendsList(this.userID).then(data => {
                this.friends = [];
                this.friends = data;
                if (this.friends.length === 0)
                    this.noFriendFlag = true
                //  console.log(this.friends)
            })

            profile.favouritesList(this.userID).then(data => {
                this.favs = data;
                this.favsLength = this.favs.length;
                // console.log(data)
                if (this.favs.length === 0)
                    this.noInterestsFlag = true;
                // console.log(this.favs);
            });
            if (this.userID !== this.getUser().userID) {
                profile.friendshipStatus(this.userID).then(data => {
                    this.detail = data;
                    if (data.friend.status === -1) {
                        this.friendship = 'request';
                        this.friendshipText = 'درخواست دوستی';
                        this.$refs.friendship.style.backgroundColor = "#00c853";
                    } else if (data.friend.status === 1) {
                        this.friendship = 'friends';
                        this.friendshipText = 'لغو دوستی';
                        this.$refs.friendship.style.backgroundColor = "rgb(77, 13, 125)";
                    } else if (data.friend.status === 0) {
                        if (data.friend.me_request === 1) {
                            this.friendship = 'pending';
                            this.friendshipText = 'در انتظار دوستی';
                            this.$refs.friendship.style.backgroundColor = "#959595";
                        } else {
                            this.friendButton = false;
                        }
                    }

                });
            }
            profile.myActivities(this.userID).then(data => {
                this.activities = data.data
            })

            challenge.getChallenges(this.userID).then(data => {

                var myChallenge = 0
                this.challenges = data.data.challenges.filter((value, index, arr) => {
                    for (var i = 0; i < data.data.challenges.length; i++) {
                        for (var j = 0; j < data.data.userchallenge.length; j++) {
                            if (myChallenge > 2)
                                return;
                            if (value.id === data.data.userchallenge[j].challenge_id) {
                                myChallenge++;
                                return value;
                            }
                        }
                    }
                });
            })

            var labelChart = [];
            var dataChart = [];
            CommitChart.method.getChart(this.userID).then(data => {
                // console.log(data);
                for (var i = 0; i < data.length; i++) {
                    dataChart.push(data[i].point);
                    labelChart.push(data[i].date);
                }
                dataChart.reverse();
                labelChart.reverse();

                this.chart = {
                    labels: labelChart,
                    datasets: [
                        {
                            data: dataChart,
                            // data: chartData,
                            label: 'دریافت امتیاز',
                            backgroundColor: '#42CAEB',
                            borderColor: [
                                '#42EAEB',
                            ],
                            borderWidth: 6,
                            options: {
                                scales: {
                                    xAxes: [{
                                        display: true,
                                        gridLines: {
                                            display: false
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Month'
                                        }
                                    }],
                                    yAxes: [{
                                        display: true,
                                        gridLines: {
                                            display: false
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Value'
                                        }
                                    }]
                                }
                            },

                        },
                    ]
                }
            });
        },
        computed: {},
        components: {
            UserInfo,
            ProfileMenu,
            userDataShow,
            RecentActivities,
            OtherChallengers,
            Achievement,
            // QRcode,
            CommitChart,
            RecentChallenge,
            profile
        },
        methods: {
            ...mapGetters([
                'getUser'
            ]),
            removeOver() {
                this.$root.$emit('sideMenu_active');
                this.activeRoute = 0;
            },
            addOver() {
                this.$root.$emit('sideMenu_deactive');
                this.activeRoute = 1;
            },
            right() {
                if (this.xpos === 0) {
                    if (this.showButton == 2) {
                        this.showButton = 1;
                    } else if (this.showButton == 1) {
                        this.xpos = 1;
                    }
                } else if (this.xpos === 1) {
                    if (!this.$refs.ProfileMenu.right()) {
                        this.removeOver();
                        this.activeRoute = 0;
                    }
                } else if (this.pageNav === 1) { // profile man
                    if (this.xpos === 2) {
                        if (!this.$refs.achievement.right())
                            this.xpos = 4;
                    } else if (this.xpos === 3) {
                        if (this.noInterestsFlag)
                            this.xpos = 5;
                        else
                            this.xpos = 4;
                    } else if (this.xpos === 4) {
                        if ((this.$refs.interest.xpos === 1 || this.$refs.interest.xpos % 6 === 1) && this.noFriendFlag)
                        // if (!this.$refs.interest.right() && this.noFriendFlag)
                            this.removeOver();
                        else if (!this.$refs.interest.right() && !this.noFriendFlag)
                            this.xpos = 5;
                    } else if (this.xpos === 5) {
                        if (!this.$refs.friends.right()) {
                            this.removeOver();
                            this.activeRoute = 0;
                        }
                    }
                }

                if (this.pageNav === 3) { // tasavire man
                    this.$refs.album.right()
                }
            },
            left() {
                if (this.xpos === 0) {
                    if (this.showButton == 1) {
                        this.showButton = 2;

                    } else if (this.showButton == 2) {
                        this.activeRoute = 0;
                        this.$root.$emit('leftside_active');
                    }

                } else if (this.xpos === 1) {
                    if (!this.$refs.ProfileMenu.left()) {
                        if (this.friendButton) {
                            this.xpos = 0;
                            this.showButton = 1;
                        } else {
                            this.activeRoute = 0;
                            this.$root.$emit('leftside_active');
                        }

                    }

                } else if (this.pageNav === 1) {
                    if (this.xpos === 2) {
                        if (!this.$refs.achievement.left()) {
                            this.activeRoute = 0;
                            this.$root.$emit('leftside_active');
                        }
                        // else
                        //   this.$refs.achievement.left();
                    } else if (this.xpos === 4) {
                        if (!this.$refs.interest.left()) {
                            if (this.challenges.length === 0) {
                                if (this.$refs.achievement.earnAchievements.length !== 0)
                                    this.xpos = 2;
                                else {
                                    this.$root.$emit('leftside_active');
                                    this.activeRoute = 0;
                                }
                            } else
                                this.xpos = 3;
                        }
                    } else if (this.xpos === 5) {
                        if (!this.$refs.friends.left()) {
                            this.xpos = 4;
                            if (!this.noInterestsFlag)
                                return
                        } else
                            return;
                        if ((this.$refs.friends.xpos === this.friends.length || this.$refs.friends.xpos === 6) && this.noInterestsFlag)
                            this.xpos = 3;
                        if (this.challenges.length === 0) {
                            this.$root.$emit('leftside_active');
                            this.activeRoute = 0;
                        }
                    } else if (this.xpos === 3) {
                        this.$root.$emit('leftside_active');
                        this.activeRoute = 0;
                    }
                } else if (this.pageNav === 3) {
                    this.$refs.album.left()
                }

            },

            down() {
                if (this.xpos === 0) {
                    if (this.$refs.achievement.getAchievementsLength() <= 4 && this.challenges.length > 0) {
                        this.xpos = 3;
                        if (this.challenges.length === 0)
                            this.xpos = 4;
                        if (this.noInterestsFlag)
                            this.xpos = 5;
                        if (this.noFriendFlag)
                            this.xpos = 0;
                    } else if (this.$refs.achievement.getAchievementsLength() > 4)
                        this.xpos = 2;
                } else if (this.xpos === 1) {
                    if (!this.noFriendFlag && this.friends.length > 0)
                        this.xpos = 5;
                    else if (this.noFriendFlag && this.favs.length > 0)
                        this.xpos = 4;
                    else if (this.noInterestsFlag && this.friends.length > 0)
                        this.xpos = 5;
                    else if (this.noInterestsFlag && this.noFriendFlag)
                        if (this.challenges.length > 0)
                            this.xpos = 3;
                } else if (this.xpos === 2) {
                    if (!this.$refs.achievement.down())
                        this.xpos = 3;
                    if (this.challenges.length === 0)
                        this.xpos = 4;
                    if (this.noInterestsFlag)
                        this.xpos = 5;
                    if (this.noFriendFlag)
                        this.xpos = 2;
                } else if (this.xpos === 3) {
                    this.$refs.challenge.down();
                } else if (this.xpos === 4)
                    this.$refs.interest.down();
                else if (this.xpos === 5)
                    this.$refs.friends.down();
            },

            up() {
                if (this.xpos === 2) {
                    if (!this.$refs.achievement.up() && this.friendButton) {
                        this.xpos = 0;
                        // this.pageNav = 1;
                    } else if (!this.$refs.achievement.up() && !this.friendButton)
                        this.xpos = 1;
                } else if (this.xpos === 3) {
                    if (!this.$refs.challenge.up()) {
                        if (this.$refs.achievement.getAchievementsLength() <= 4) {
                            if (this.friendButton)
                                this.xpos = 0;
                            else
                                this.xpos = 1;
                        } else
                            this.xpos = 2;
                    }
                } else if (this.xpos === 4) {
                    if (!this.$refs.interest.up())
                        this.xpos = 1;
                } else if (this.xpos === 5) {
                    if (!this.$refs.friends.up())
                        this.xpos = 1;
                }
            },
            enter() {
                // alert(this.xpos)
                let time = new Date().getTime();
                this.sel = this.$refs.ProfileMenu.enter();
                if (this.xpos === 1) {
                    if (this.sel === 4) {
                        this.$router.push({
                            path: '/eight/' + time,
                            // query: {'type': this.$refs.ProfileMenu.enter(), id: this.userID, userObject: this.object, 'sel': this.$refs.ProfileMenu.enter()}
                            query: {'type': this.sel, id: this.userID, userObject: this.object, 'sel': this.sel}
                        });
                    } else {
                        if (this.sel !== 0) {
                            this.$router.push({
                                path: '/eight/' + time,

                                query: {
                                    'type': this.sel,
                                    'id': this.userID,
                                    'userObject': this.object,
                                    'sel': this.sel
                                }
                                // query: {'type': this.$refs.ProfileMenu.enter(), 'id': this.userID, 'userObject': this.object, 'sel': this.$refs.ProfileMenu.enter()}

                            });
                        }
                    }
                } else if (this.xpos === 5) {
                    this.$refs.friends.enter(this.xpos, this.userID, this.getUser().userID);
                } else if (this.xpos === 0) {
                    if (this.showButton == 2) {
                        if (this.friendship == 'request') {
                            friends.requestToFri(this.userID).then(data => {
                                if (data.success === true) {
                                    this.friendship = 'pending';
                                    this.friendshipText = 'در انتظار دوستی';
                                    this.$refs.friendship.style.backgroundColor = "#959595";
                                }
                            })
                        } else if (this.friendship == 'friends') {
                            friends.unfriend(this.userID).then(data => {
                                if (data.success === true) {
                                    this.friendship = 'request';
                                    this.friendshipText = 'درخواست دوستی';
                                    this.$refs.friendship.style.backgroundColor = "#00c853";
                                }
                            })
                        } else if (this.friendship == 'pending') {
                            friends.cancelPending(this.userID).then(data => {
                                if (data.success === true) {
                                    this.friendship = 'request';
                                    this.friendshipText = 'درخواست دوستی';
                                    this.$refs.friendship.style.backgroundColor = "#00c853";
                                }
                            })
                        }
                    } else if (this.showButton == 1) {
                        this.$router.push({path: '/four/' + time, query: {'reciever': this.userID}});

                    }

                } else if (this.xpos === 3) {
                    if (!this.infoShow) // agar profile khodesh nabood, natoone rooye challenge click kone
                        this.$router.push({
                            path: '/ten/' + new Date().getTime(),
                            query: {params: this.$refs.challenge.enter(), status: true},
                        });
                } else if (this.xpos === 4) {
                    if (this.$refs.interest.xpos > 9) {
                        // this.$refs.interest.allPeople = true;
                        this.$router.push({
                            path: '/eight/' + time,

                            query: {
                                'type': 3,
                                'id': this.userID,
                                'userObject': this.object,
                                'sel': 3
                            }

                        });

                    }


                } else if (this.xpos === 2) {
                    // console.log(this.sel + ' ' + this.userID + ' ' + JSON.stringify(this.object) + ' ')
                    this.$router.push({
                        path: '/eight/' + time,

                        query: {
                            'type': 1,
                            'id': this.userID,
                            'userObject': this.object,
                            'sel': 1
                        }

                    });
                }
            },
            back() {
                if (this.activeRoute === 0) {
                    this.$root.$emit('leftside_deactive');
                    this.addOver();
                    this.activeRoute = 1;
                } else {
                    this.$router.go(-1);
                }
            },
            //  console.log('this.barCodeShow =>' + this.barCodeShow)
        }
    }
</script>

<style scoped>
  .page {
    /*background-color: darkgreen;*/
    position: absolute;
    width: 1760px;
    height: 850px;
    top: 240px;
    right: 80px;
    text-align: right;
  }

  .top {
    width: 1760px;
    height: 160px;
    position: absolute;
    right: 80px;
    top: 80px;
    /*background-color: #2c3e50;*/
  }

  .profile-pic {
    width: 137px;
    height: 137px;
    border-radius: 100%;
    overflow: hidden;
    text-align: center;
    margin-top: 7px;
    margin-right: 5px;
  }

  .info {
    position: absolute;
    width: 892px;
    height: 85px;
    right: 180px;
    top: 250px;
  }

  .profile-pic > img {
    width: inherit;
    height: inherit;
  }

  .buttonParent {
    position: absolute;
    left: 105px;
    top: 155px;
    width: 505px;
    height: 60px;
  }


  .friendship {
    position: relative;
    float: right;
    width: 239px;
    height: 70px;
    border: 1px solid #BCBCBC;
    box-shadow: 0px 0px 21px rgba(196, 196, 196, 0.32);
    border-radius: 15px;
    font-size: 24px;
    text-align: center;
    margin-right: 10px;
    line-height: 70px;
    color: #fff;
    transition: 0.5s;
  }

  /*.friendshipHover {*/
  /*  background-color: #fff;*/
  /*  color: rgb(77, 13, 125);*/
  /*  border: 1px solid rgb(77, 13, 125);*/
  /*  transition: 0.5s;*/

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
      -webkit-transform: translateY(-20px);
      transform: translateY(-20px);
    }
    50% {
      -webkit-transform: translateY(-5px);
      transform: translateY(-5px);
    }
    100% {
      -webkit-transform: translateY(-20px);
      transform: translateY(-20px);
    }
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

  .pages {
    font-size: 24px;
    text-align: center;
    color: #000000;
    position: absolute;
    top: 88px;
    right: 138px;
    border-bottom: 4px solid transparent;
    /*background-color: tan;*/
  }

  .page-hover {
    /*border-bottom: 4px;*/
    /*border-color: #2F80ED;*/
    color: #2F80ED;
    border-bottom: 4px solid #2F80ED;
    /*border-radius: 10px;*/
    /*background-color: #424AB5;*/
  }

  .pages-item {
    display: inline-block;
    margin-right: 30px;
    text-align: center;
    height: 61px;
  }

  .message {
    font-size: 24px;
    position: relative;
    float: right;
    top: 90px;
    right: 15px;
  }

  .chart-wrapper {
    max-width: 904px;
    max-height: 400px;
    opacity: 0.9;
    background-color: #233767;
    border-radius: 23px;
    position: relative;
    right: 30px;
    top: 110px;
  }

  .chartPos {
    top: 70px;
  }

  .line {
    position: absolute;
    background: #4D96BE;
    width: 1px;
    height: 280px;
    top: 95px;
  }

  .titr {
    position: absolute;
    color: #4B0D85;
    font-size: 25px;
    text-align: right;
    right: 15px;
    top: 20px;
  }

  .achievements-icon {
    position: absolute;
    top: 40px;
  }

  .achievements-txt {
    float: right;
    position: relative;
    right: 50px;
    top: 40px;
    font-size: 27px;
  }

  .titr > img {
    position: absolute;
    display: none;
  }

  .titr > .text {
    font-weight: bolder;
    width: 300px;
    display: inline-block;
  }

  .achievements-container {
    width: 760px;
    position: absolute;
    height: 400px;
    right: 970px;
    top: 30px;
    /*background-color: tan;*/
  }

  .friends {
    width: 480px;
    height: 307px;
    position: relative;
    float: right;
    top: 130px;
    right: 10px;
    overflow: hidden;
  }

  .recent-activity {
    display: none;
    position: absolute;
    top: 650px;
    width: 800px;
  }

  .act-wrapper {
    position: absolute;
    top: 50px;
    right: 25px;
  }

  .recent-challenges {
    width: 765px;
    height: 345px;
    position: absolute;
    top: 455px;
    left: 0px;
    overflow: hidden;
  }

  .hline {
    width: 755px;
    height: 1px;
    background-color: #d7d7d7;
    position: absolute;
    float: left;
    left: 10px;
    top: 76px;
  }

</style>
