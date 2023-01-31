<template>
  <div class="page" id="five">

    <div class="sug">پیشنهاد همسام</div>
    <div class="sugBox">به زودی ...</div>
    <div v-if="showDes" class="description">{{description}}</div>
    <!--<div class="tabFriends">-->
    <!--<div v-for="(tab , i) in tabFriend" class="pageTitle"-->
    <!--:class="[(ypos == 1 && xpos == i + 1 && activeRoute == 1 ? 'hoverTab' : '') , (i == 2) ? 'rightPos':'']">-->
    <!--<div class="tabTxt"-->
    <!--:class="[(ypos == 1 && xpos == i + 1 && activeRoute == 1 ? 'hoverTxt' : ''),(i == 2 ? 'searchTabTxt' : '') ]">-->
    <!--{{tab}}-->
    <!--</div>-->
    <!--&lt;!&ndash;<div v-if="i == 0 || i == 1" class="line_0"&ndash;&gt;-->
    <!--&lt;!&ndash;:class="[(ypos == 1 && xpos == i + 1 && activeRoute == 1? 'lineHover' : '') , (i == 0 ? 'firstLine':'secondLine')]"></div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div v-if="i == 0 || i == 1" class="num"&ndash;&gt;-->
    <!--&lt;!&ndash;:class="[(ypos == 1 && xpos == i + 1 && activeRoute == 1? 'numHover' : '')]"> {{total_friendC}} نفر&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--</div>-->
    <!--</div>-->

    <div class="tabFriends">
      <div v-for="(tab , i) in tabFriend" class="pageTitle">
        <div class="tabTxt">
          {{tab}}
        </div>
        <div
          :class="[(ypos == 1 && xpos == i + 1 && activeRoute == 1 ? 'hoverTab' : ''),(i == 0) ? 'sizeTabOne':'',(i == 1) ? 'sizeTabTwo':'',(i == 2) ? 'sizeTabThree':'']"></div>
        <!--<div v-if="i == 0 || i == 1" class="line_0"-->
        <!--:class="[(ypos == 1 && xpos == i + 1 && activeRoute == 1? 'lineHover' : '') , (i == 0 ? 'firstLine':'secondLine')]"></div>-->
        <!--<div v-if="i == 0 || i == 1" class="num"-->
        <!--:class="[(ypos == 1 && xpos == i + 1 && activeRoute == 1? 'numHover' : '')]"> {{total_friendC}} نفر-->
        <!--</div>-->
      </div>
    </div>
    <friends :friends="friends" :type="type" ref="friends" :show="show"
             :active="2" :page="ypos"
             :activeRoute="activeRoute" :status="status"></friends>

    <search-friends ref="search" :show="show" :active="2" :page="ypos" :activeX="1"
                    :pageX="xposSearch"
                    :activeRoute="activeRoute"></search-friends>

    <find-friend :findFriend="findFriend" :pendingFriend="pendingFriend"
                 ref="findFriend" :show="show" :active="2"
                 :page="ypos"
                 :activeX="2"
                 :pageX="xposSearch" :activeRoute="activeRoute" :continueFriend="continueFriend"></find-friend>

    <!--<state-city :state="state" ref="stateCity" :showState="showState" :activeRoute="activeRoute"-->
    <!--:parentID="parentID"></state-city>-->

    <div v-if="(friends) && (friends.length == 0)" class="msg"
         v-text="emptyListFri == 1 ? 'شما دوستی ندارید.' :emptyListFri == 2 ? 'شما درخواست دوستی ندارید.' : ''"></div>

  </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import friends from '../components/pageFive/friends'
    import searchFriends from '../components/pageFive/searchFriends'
    import api from '../api/friends'
    import chatApi from '../api/chat/index';
    // import StateCity from "../components/pageFive/state-city";
    import FindFriend from "../components/pageFive/find-friend";
    import {page} from 'vue-analytics'
    import {ROAST_CONFIG} from "../config";

    export default {
        name: "five",
        components: {
            FindFriend,
            // StateCity,
            friends, searchFriends
        },
        data() {
            return {
                show: 1,
                activeRoute: 1,
                friends: [],
                tabFriend: ['دوستان شما', 'درخواست دوستی', 'جستجوی دوستان'],
                datas: [],
                xpos: 1,
                ypos: 1,
                xfriend: '',
                yfriend: '',
                tokenMe: '',
                friendID: '',
                level: '',
                picture: '',
                userName: '',
                item: '',
                itemTxt: '',
                status: 1,
                messageList: [],
                emptyListFri: 0,
                total_friendC: '',
                total_reqC: '',
                showState: false,
                state: [],
                xposSearch: 1,
                findFriend: [],
                findFriendID: [],
                userPending: [],
                userPendingID: [],
                pendingFriend: [],
                isFriend: '',
                /****************************** filterSearch *********************/
                string: '', // nam
                // city: 0,
                // stateID: 0, // ostan
                // cityID: 0, //shahr
                gender: '', //jensiat
                pic: '', // ax
                age: '', //sen
                // medals: 0, //medalha
                /***************************************************/
                // stateName: '',
                // cityName: '',
                // parentID: 0,
                continueFriend: {},
                description: '',
                showDes: false,
                /************************new data***************************/
                type: 1,
                next: '',
                urlPending: ROAST_CONFIG.URL_Newssn + 'friend/request/pending',
                urlFri: ROAST_CONFIG.URL_Newssn + 'friend/list',
                urlSearch: ROAST_CONFIG.URL_Newssn + 'search',
                downDatas: [],
                friLength: '',
                number: '',
                success: '',


            }
        },
        created() {

            api.friends(this.urlFri, this.type).then(data => {
                this.friends = data['data'];

                if (this.friends.length == 0) {
                    this.emptyListFri = 1;
                }
                this.total_friendC = data['meta']['total'];
                this.next = data['links']['next'];

            });


        },
        watch: {},
        methods: {
            ...mapGetters([
                'getToken'
            ]),
            pendingAjax() {
                this.userPendingID = [];
                let _self = this;
                _self = setTimeout(() => {
                    api.pending(this.urlPending).then(data => {
                        if (data['success'] == true) {
                            this.userPending = data['data'];
                            for (let p in this.userPending) {
                                this.userPendingID.push(this.userPending[p]['id']);

                            }
                        }

                        console.log('this.userPendingID ->' + JSON.stringify(this.userPendingID));

                    });
                }, 1000);
            },
            pendingFri() {
                let _self = this;
                _self = setTimeout(() => {
                    this.pendingFriend = this.findFriendID.filter((word) => this.userPendingID.includes(word));
                    console.log('pendingFriend  ->' + JSON.stringify(this.pendingFriend));
                }, 2000);
            },
            removeOverR() {
                this.$root.$emit('sideMenu_active');
                this.activeRoute = 0;
            },
            removeOverL() {
                this.activeRoute = 0;
                this.$root.$emit('leftside_active');

            },
            left() {

                if (this.ypos == 1) {

                    if (this.xpos < this.tabFriend.length) {
                        this.xpos++;
                        return true;
                    } else if (this.xpos == this.tabFriend.length) {
                        this.removeOverL();
                    }

                } else if (this.ypos == 2) {

                    if (this.show == 1) {

                        if (!this.$refs.friends.left()) {
                            this.removeOverL();
                            return true;
                        }
                    } else if (this.show == 2) {

                        if (!this.showState) {
                            if (this.xposSearch == 1) {
                                if (!this.$refs.search.left()) {
                                    if (this.findFriend.length > 0) {
                                        this.xposSearch = 2;
                                    }


                                }
                            } else if (this.xposSearch == 2) {

                                if (!this.$refs.findFriend.left()) {
                                    this.removeOverL();
                                    return true;
                                }
                            }

                        } else {
                            if (!this.$refs.stateCity.left()) {
                                this.removeOverL();
                                return true;
                            }
                        }

                    }
                }

                return false;
            },
            right() {
                if (this.ypos == 1) {
                    if (this.xpos > 1) {
                        this.xpos--;
                        return true;
                    } else if (this.xpos == 1) {
                        this.removeOverR();
                        return true;
                    }

                } else if (this.ypos == 2) {
                    if (this.show == 1) {
                        if (!this.$refs.friends.right()) {
                            this.removeOverR();

                        }
                    } else if (this.show == 2) {

                        if (!this.showState) {
                            if (this.xposSearch == 2) {
                                if (!this.$refs.findFriend.right()) {
                                    this.xposSearch = 1;

                                }
                            } else if (this.xposSearch == 1) {
                                if (!this.$refs.search.right()) {
                                    this.removeOverR();
                                    this.$root.$emit('hide_keyboard');

                                }
                            }

                        } else {
                            if (!this.$refs.stateCity.right()) {

                            }
                        }
                    }
                }
                return false;
            },
            down() {
                // console.log('this.ypos -> ' + this.ypos + ' this.xposSearch --->' + this.xposSearch + ' this.show ->' + this.show)
                if (this.ypos == 1) {

                    if (this.xpos == 1 || this.xpos == 2) {

                        if (this.friends.length > 0) {
                            this.ypos = 2;
                            return true;
                        }
                    } else if (this.xpos == 3) {
                        this.ypos = 2;
                        this.xposSearch = 1;

                        return true;
                    }


                } else {

                    if (this.xpos == 1 || this.xpos == 2) {
                        if (this.show == 1) {

                            this.downDatas = this.$refs.friends.down();
                            this.number = this.downDatas['num'];
                            this.friLength = this.downDatas['length'];

                            if (this.number >= this.friLength) {
                                this.moreFriend();
                            }
                            // if (!this.$refs.friends.down()) {
                            //     //return true;
                            // }
                        }

                    } else if (this.xpos == 3) {
                        if (this.show == 2) {
                            if (!this.showState) {
                                if (this.xposSearch == 1) {
                                    if (!this.$refs.search.down()) {

                                    }
                                } else if (this.xposSearch == 2) {

                                    this.downDatas = this.$refs.findFriend.down();
                                    this.number = this.downDatas['num'];
                                    this.friLength = this.downDatas['length'];
                                    //  alert(this.number + ' ' + this.friLength)
                                    if (this.number >= this.friLength) {
                                        this.moreSearch();
                                    }

                                }

                            } else {
                                if (!this.$refs.stateCity.down()) {

                                }
                            }
                        }


                    }


                }
                return false;
            },
            up() {

                if (this.ypos == 2) {
                    if (this.xpos == 1 || this.xpos == 2) {
                        if (!this.$refs.friends.up()) {
                            this.ypos = 1;
                            return true;
                        }
                    } else if (this.xpos == 3) {
                        if (!this.showState) {
                            if (this.xposSearch == 1) {
                                if (!this.$refs.search.up()) {
                                    this.$root.$emit('hide_keyboard');
                                    this.ypos = 1;
                                    return true;

                                }
                            } else if (this.xposSearch == 2) {

                                if (!this.$refs.findFriend.up()) {
                                    this.ypos = 1;
                                    return true;

                                }
                            }

                        } else {
                            if (!this.$refs.stateCity.up()) {
                            }
                        }

                    }
                }
                return false;

            }, enter() {

                let time = new Date().getTime();


                if (this.ypos == 1) {

                    if (this.xpos == 1 || this.xpos == 2) {

                        this.show = 1;

                        if (this.xpos == 1) {
                            this.status = 1;
                            this.type = 1; // friends list
                        } else {
                            this.status = 0;
                            this.type = 0; // friends request
                        }


                        api.friends(this.urlFri, this.type).then(data => {
                            this.friends = data['data'];
                            this.total_friendC = data['meta']['total'];
                            this.next = data['links']['next'];


                            if (this.friends.length == 0) {

                                if (this.xpos == 1) {
                                    this.emptyListFri = 1;
                                } else {
                                    this.emptyListFri = 2;

                                }

                            }


                        });
                    } else if (this.xpos == 3) {
                        this.show = 2;
                        this.findFriend = [];
                        // this.stateName = '';
                        this.cityName = '';
                        this.emptyListFri = 0;
                        this.$refs.search.resetFilter();
                        var _self = this;
                        _self = setTimeout(() => {
                            this.$refs.search.scrollInit();
                        }, 10);


                    }

                } else if (this.ypos == 2) {

                    if (this.show == 1) {

                        this.datas = this.$refs.friends.enter();
                        this.friendID = this.datas['friendID'];
                        this.level = this.datas['level'];
                        this.picture = this.datas['pic'];
                        this.userName = this.datas['username'];
                        this.number = this.datas['number'];
                        this.xfriend = this.datas['xpos'];
                        this.yfriend = this.datas['ypos'];


                        if (this.yfriend == 2) {

                            page({
                                page: 'view profile of the friend',
                                title: 'view profile of the friend'
                            })
                            this.$router.push({
                                path: '/six/' + time,
                                query: {
                                    params: {
                                        level: this.level,
                                        pic: this.picture,
                                        username: this.userName
                                    }, id: this.friendID,
                                }
                            });

                        } else if (this.yfriend == 3) {

                            if (this.status == 0) {


                                if (this.xfriend == 1 || this.xfriend == 2) {

                                    if (this.xfriend == 1) {
                                        this.type = 1;
                                    } else {
                                        this.type = 0;
                                    }
                                    page({
                                        page: 'accept or reject friendship',
                                        title: 'accept or reject friendship'
                                    })
                                    api.answer(this.friendID, this.type).then(data => {
                                        this.success = data['success'];
                                        this.reloadFriend(this.success, this.number);


                                    });

                                }
                            } else if (this.status == 1) {

                                if (this.xfriend == 1) {

                                    this.$router.push({path: '/four/' + time, query: {'reciever': this.friendID}});

                                } else if (this.xfriend == 2) {
                                    page({
                                        page: 'cancel friendship',
                                        title: 'cancel friendship'
                                    })
                                    api.unfriend(this.friendID).then(data => {

                                        this.success = data['success']
                                        this.reloadFriend(this.success, this.number)
                                    })
                                }
                            }

                        }
                    } else if (this.show == 2) {

                        // alert(this.xposSearch)
                        if (this.xposSearch == 1) {

                            this.datas = this.$refs.search.enter();
                            this.yfriend = this.datas['ypos'];
                            this.string = this.datas['string'];
                            this.gender = this.datas['gender'];
                            this.pic = this.datas['pic'];
                            this.age = this.datas['age'];
                            // this.medals = this.datas['medals'];

                            //   console.log('this.datas ---->' + JSON.stringify(this.datas))
                            if (this.medals == '') {
                                this.medals = 0;
                            }

                            if (this.yfriend == 2) {

                                this.$root.$emit('find_friend');
                                // console.log('state -> ' + this.stateID + '   city ->' + this.stateID + '  gender ->' + this.gender + '  pic ->' + this.pic + '  age ->' + this.age + '  medals  -> ' + this.medals + ' term ->' + this.term);
                                // (this.cityID == 0 ? this.city = this.stateID : this.city = this.cityID);
                                page({
                                    page: 'search friend',
                                    title: 'search friend'
                                });

                                api.filterSearch(this.urlSearch, this.string, this.gender, this.age, this.pic).then(data => {
                                    this.findFriendID = [];
                                    this.findFriend = data['data'];
                                    this.next = data['links']['next'];
                                    for (let f in this.findFriend) {
                                        this.findFriendID.push(this.findFriend[f]['id']);
                                    }

                                    // console.log('this.findFriend in load search ->' + JSON.stringify(this.findFriend));
                                    console.log('this.findFriendID in load search ->' + JSON.stringify(this.findFriendID));

                                });
                                this.pendingFriend = [];
                                this.pendingAjax();
                                this.pendingFri();
                            }

                        } else if (this.xposSearch == 2) {

                            this.datas = this.$refs.findFriend.enter();
                            this.yfriend = this.datas['ypos'];
                            this.friendID = this.datas['friendID'];
                            this.level = this.datas['level'];
                            this.picture = this.datas['pic'];
                            this.userName = this.datas['username'];
                            this.item = this.datas['item'];
                            this.itemTxt = this.datas['itemTxt'];


                            if (this.yfriend == 2) {

                                page({
                                    page: 'view profile of the friend',
                                    title: 'view profile of the friend'
                                })

                                this.$router.push({
                                    path: '/six/' + time,
                                    query: {
                                        params: {
                                            level: this.level,
                                            pic: this.picture,
                                            username: this.userName
                                        }, id: this.friendID,
                                    }
                                });

                            } else if (this.yfriend == 3) {

                                page({
                                    page: 'request friendship',
                                    title: 'request friendship'
                                })
                                // alert(this.pendingFriend.indexOf(this.friendID))

                                console.log('indexOf ->' + this.pendingFriend.indexOf(this.friendID));
                                if (this.pendingFriend.indexOf(this.friendID) !== -1) {

                                    api.cancelPending(this.friendID).then(data => {
                                        if (data.success === true) {
                                            this.pendingAjax();
                                            this.pendingFri();
                                            this.item.style.backgroundColor = "#1955a6";
                                            this.itemTxt.innerText = 'درخواست دوستی';
                                            this.description = data['data']['message'];
                                            this.showDes = true;
                                        }
                                    })
                                } else {
                                    api.requestToFri(this.friendID).then(data => {
                                        if (data.success === true) {
                                            this.pendingAjax();
                                            this.pendingFri();
                                            this.item.style.backgroundColor = "rgb(149, 149, 149)"
                                            this.itemTxt.innerText = 'در انتظار دوستی';
                                            this.description = data['data']['message'];
                                            this.showDes = true;
                                        }
                                    });
                                }


                                setTimeout(() => {
                                    this.showDes = false;
                                }, 3000);
                            }


                        }


                    }

                }


            },
            reloadFriend(success, number) {


                if (success == true) {
                    this.friends.splice(number, 1);

                    if (this.friends.length == 0) {
                        if (this.status == 0) {
                            this.emptyListFri = 2;
                            this.ypos = 1;
                            this.xpos = 2;
                        } else if (this.status == 1) {
                            this.emptyListFri = 1;
                            this.ypos = 1;
                            this.xpos = 1;
                        }
                    }

                    this.$root.$emit('friend');
                }


                // if (this.status == 0) {
                //
                //     this.friends = obj['requests'];
                //     this.total_friendC = obj['total_friendC'];
                //
                // } else if (this.status == 1 || obj['code'] == 119) {
                //
                //     this.friends = obj['friends'];
                //     this.total_friendC = obj['total_friendC'];
                // }
                //
                // // alert(this.ypos + '***&&&&&&&&&&&&&&&&&' + this.xpos + ' length -> ' + this.friends.length)
                //
                // if ((this.friends) && (this.friends.length == 0)) {
                //
                //     // this.$root.$emit('empty');
                //     this.emptyList = true;
                //     this.ypos = 1;
                //     this.xpos = 1;
                //
                // } else if ((this.friends) && (this.friends.length > 0)) {
                //
                //     this.$root.$emit('friend');
                //     this.emptyList = false;
                // }

            },
            back() {
                if (this.showState) {
                    this.showState = false;
                } else {
                    this.$router.go(-1);
                }

            },
            moreFriend() {
                if (this.next != null) {
                    api.friends(this.next, this.type).then(data => {

                        this.total_friendC = data['meta']['total'];
                        this.next = data['links']['next'];
                        this.friends = this.friends.concat(data['data']);

                    });
                }
            }, moreSearch() {
                //alert(this.next)
                if (this.next != null) {
                    api.filterSearch(this.next, this.string, this.gender, this.age, this.pic).then(data => {
                        this.findFriendID = [];
                        this.next = data['links']['next'];
                        this.findFriend = this.findFriend.concat(data['data']);
                        for (let f in this.findFriend) {
                            this.findFriendID.push(this.findFriend[f]['id'])
                        }
                        // console.log('this.findFriend in next ->' + JSON.stringify(this.findFriend));
                        // console.log('this.findFriendID in next ->' + JSON.stringify(this.findFriendID));


                    });
                    this.pendingFri();
                }
            }

        }
        ,
    }
</script>

<style scoped>
  .page {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 1920px;
    height: 1080px;
  }

  .sug {
    position: absolute;
    width: 147px;
    height: 38px;
    left: 485px;
    top: 88px;
    line-height: normal;
    font-size: 24px;
    text-align: right;
    color: #aeb0bd;
    white-space: nowrap;
  }

  .sugBox {
    position: absolute;
    width: 548px;
    height: 86px;
    /*left: 108px;*/
    left: 85px;
    top: 163px;
    background: #FFFFFF;
    opacity: 0.6;
    border: 1px solid rgba(207, 207, 207, 0.5);
    box-sizing: border-box;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    color: black;
    direction: rtl;
    line-height: 40px;
    font-size: 20px;
  }

  .tabFriends {
    /* width: 1130px; */
    height: 65px;
    position: absolute;
    right: 65px;
    top: 78px;
    line-height: 65px;
    /*border: 1px solid red;*/

  }

  .pageTitle {
    position: relative;
    width: 200px;
    /* width: 360px; */
    height: 65px;
    float: right;
    /* margin-right: 10px; */
    /* border: 1px solid green; */

  }

  .tabTxt {
    /*width: 170px;*/
    width: 200px;
    height: 65px;
    float: right;
    /*margin-right: 10px;*/
    font-size: 22px;
    text-align: center;
    /*color: #1955a6;*/
    color: #3A4AB4;
    direction: rtl;
    /*text-indent: 10px;*/
  }

  .searchTabTxt {
    width: 360px;
  }

  .hoverTab {
    /*background-color: #1955a6;*/
    /*border-radius: 10px;*/
    background: #3A4AB4;
    width: 110px;
    height: 6px;
    border-radius: 10px;
    position: absolute;
    bottom: 0px;

  }

  .sizeTabOne {
    width: 120px;
    right: 40px;
  }

  .sizeTabTwo {
    width: 170px;
    right: 15px;
  }

  .sizeTabThree {
    width: 180px;
    right: 8px;
  }

  .hoverTxt {
    /*color: #fff;*/
    color: #3A4AB4;
  }

  .rightPos {
    margin-right: 30px;
    text-align: center;
  }

  .line_0 {
    position: relative;
    float: right;
    width: 44px;
    top: 32px;
    border: 1px solid #4d4d4f;
    transform: rotate(90deg);
  }

  /*.firstLine{*/
  /*right: 105px;*/
  /*}*/
  /*.secondLine{*/
  /*right: 150px;*/
  /*}*/

  .lineHover {
    border: 1px solid #fff;
  }

  .num {
    top: 0px;
    /*width: 125px;*/
    width: 160px;
    text-align: center;
    height: 65px;
    font-size: 22px;
    color: #4d4d4f;
    position: relative;
    float: left;
    line-height: 65px;
    direction: rtl;
  }

  .numHover {
    color: #fff;
  }

  .msg {
    width: 100%;
    height: 100px;
    line-height: 100px;
    font-size: 25px;
    color: #636467;
    position: absolute;
    top: 450px;
    direction: rtl;
    /*border: 1px solid red;*/
  }

  .description {
    width: 815px;
    height: 50px;
    position: absolute;
    top: 25px;
    right: 442px;
    text-align: center;
    color: rgb(9, 206, 88);
    line-height: 50px;
    font-size: 25px;

  }

</style>
