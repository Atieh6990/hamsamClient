<template>
  <div ref="eightPage" class="pageP" dir="rtl">
    <div class="top">
      <userDataShow :name="userObject.username" :img="userObject.pic || userObject.picture"></userDataShow>

      <div class="pages">
        <ProfileMenu :selected="0" :me="me" :active="0" :page="ypos" :xpage="xpos" ref="ProfileMenu"
                     :activeRoute="activeRoute"></ProfileMenu>
      </div>
      <div v-if="otherUser == true" class="buttonParent">
        <div :class="[ypos === 0 && xpos === 1 && xbutton === 1 && activeRoute === 1 ? 'hvr-bob' : '']"
             style="background-color: rgb(77, 13, 125)"
             class="friendship">ارسال پیام
        </div>
        <div ref="friendship" :class="[ypos === 0 && xpos === 1 && xbutton === 2 && activeRoute === 1 ? 'hvr-bob' : '']"
             class="friendship">{{friendshipText}}
        </div>
      </div>
    </div>


    <!-- ************************************************ album ******************************************-->
    <div v-if="type == 2">

      <showPermissionAlbum v-if="seeAlbumPermission == false" :permissionTxt="permissionTxt"
                           :seeAlbumPermission="seeAlbumPermission"></showPermissionAlbum>

      <btns v-if="otherUser == false" :btnData="filterAlbumBtns" :active="2" :page="ypos" :activeRoute="activeRoute"
            :showBTNModel="showBTNModel" :albumId="albumId" ref="btns" :itemLen="albumDetailData.length"></btns>

      <QRcode v-if="barCodeShow == true" :url="url"></QRcode>

      <div v-if="albumDetailShow == false">
        <album :active="1" :page="ypos" :albumData="albumData" :activeRoute="activeRoute"
               :showBTNModel="showBTNModel" :selectingArr="selectingArr"
               :albumDetailShow="albumDetailShow" :hasNextLink="hasNextLink"
               ref="album" :otherUser="otherUser"
        ></album>
        <createNewAlbum v-if="newAlbumShow == true" ref="createNewAlbum"></createNewAlbum>
      </div>

      <div v-if="albumDetailShow == true">
        <album :active="1" :page="ypos" :albumData="albumDetailData" :activeRoute="activeRoute"
               :showBTNModel="showBTNModel" :selectingAlbumDetail="selectingAlbumDetail"
               :albumDetailShow="albumDetailShow" :hasNextLink="hasNextLink" :albumId="albumId"
               :otherUser="otherUser"
               ref="album"></album>
      </div>

    </div>

    <!-- ************************************************* medals (badge)*************************************************************** -->
    <div v-if="type == 1">
      <userMedals :badgeData="badgeData" :active="1" :page="ypos" :activeRoute="activeRoute"
                  ref="userMedals" v-if="showBadge == true"></userMedals>
      <sideList :type="1" :items="badgeCatName" :active="3" :page="ypos" :activeRoute="activeRoute"
                ref="sideList"></sideList>
    </div>


    <!-- ************************************************* favorits *************************************************************** -->
    <div v-if="type == 3 && intesrtData != ''">
      <!--            <sideList :type="1" :items="sideData" :active="3" :page="ypos" :activeRoute="activeRoute"-->
      <!--                      ref="sideList"></sideList>-->
      <favorits :user="userID" :items="sideData" :otherUser="otherUser" :parentFav="filtering" :intrestFav="intrestFav"
                :active="3"
                :page="ypos"
                ref="favorits"
                :activeRoute="activeRoute"></favorits>
    </div>

    <!-- *************************************************** My Scores *************************************************************** -->

    <div v-if="type == 4">
      <div class="scores-page">
        <div class="container">
          <recent-challenge ref="challenge" :id="this.userID" :active="5" :page="ypos"
                            :activeRoute="activeRoute"></recent-challenge>
        </div>
      </div>
    </div>

    <!-- ************************************************* moshahede profile *************************************************************** -->
    <div v-if="type == 5 && profileData.length != 0">
      <visitProfile :otherUser="otherUser" :active="1" :page="ypos" :activeRoute="activeRoute"
                    :profileData="profileData"
                    ref="visitProfile"></visitProfile>
    </div>
  </div>
</template>

<script>
  import ProfileMenu from '../components/pageSix/profileMenu'
  import album from '../components/pageEight/album'
  import userMedals from '../components/pageSix/userMedals'
  import api from '../api/userAlbum'
  import profileApi from '../api/profile'
  import {mapGetters} from 'vuex'
  import QRcode from '../components/pageEight/QRcode'
  import {ROAST_CONFIG} from '../config';
  import favorits from '../components/pageEight/favorits'
  import sideList from '../components/pageTwo/sideList'
  import btns from '../components/pageEight/btns'
  import createNewAlbum from '../components/pageEight/createNewAlbum'
  import userDataShow from '../components/pageSix/userDataShow'
  import visitProfile from '../components/pageEight/visitProfile'
  import RecentChallenge from "../components/pageEight/recentChallenge";
  import showPermissionAlbum from "../components/pageEight/showPermisssionAlbum"
  import {page} from 'vue-analytics'
  import friends from "../api/friends";

  export default {
    name: "eight",
    data() {
      return {
        xpos: 0,
        ypos: 0,//0->menue , 1->table , 2->album btns , 3->favlist
        active: 0,
        activeRoute: 1,
        type: this.$route.query.type,//0->album ; 1->medals, 2->favorite
        albumData: '',
        albumDetailData: '',
        albumId: '',
        barCodeShow: false,
        url: '',
        intesrtData: '',
        sideData: [],
        badgeCat: [],
        badgeCatName: [],
        intrestFav: [],
        filtering: [],
        badgeFilter: [],
        tmpAlbum: [],
        pictureOutOfAlbum: [],//axaee ke biroone album ha hastan
        newAlbumShow: false,
        albumDetailShow: false,
        albumLink: ROAST_CONFIG.url_Domain + 'hamsam/pservice/api/v1/picture/list',
        badgeLink: ROAST_CONFIG.url_Domain + 'hamsam/pservice/api/v1/badges',
        albumNextLink: '',//lazy load link pictur list
        badgeNextLink: '',//lazy load link badge
        selectingArr: [],//array baraye select kardane item vase delete ke default ba -1 por mishe
        selectingAlbumDetail: [],//array baraye select kardane item vase delete ke default ba -1 por mishe

        //*********** album ***********************
        showBTNModel: 1,//1 --> biroone album , 2 --> dakhele album
        albumBtn: [
          {'txt': 'عکس پروفایل', 'type': 1},
          {'txt': 'ایجاد آلبوم', 'type': 1},
          {'txt': 'انتخاب آیتم', 'type': 1},
          {'txt': ' اضافه کردن عکس ', 'type': 1},
          {'txt': 'حذف آلبوم', 'type': 2},
          {'txt': 'انتخاب آیتم', 'type': 2},
          {'txt': ' اضافه کردن عکس ', 'type': 2},
          {'txt': 'حذف آیتم', 'type': 3},
        ],//type = 1 --> biroone album , type=2 --> dakhele album , type=3 --> delete
        btnData: [],
        //*********** album ***********************

        badgeData: [],
        profileData: [],
        userID: this.$route.query.id,
        userObject: this.$route.query.userObject,
        challenges: [],
        otherUser: true,//namayeshe dokmehaye zire menu baraye moshahedeye profile digaran
        hasNextLink: false,
        seeAlbumPermission: true,
        permissionTxt: '',
        isProfilePic: 0,
        me: false,
        sel: this.$route.query.sel,
        showBadge: false,
        xbutton: 1,
        friendship: '',
        friendshipText: ''

      }
    },
    components: {
      RecentChallenge,
      ProfileMenu, album, userMedals, userDataShow,
      QRcode, favorits, sideList, btns, createNewAlbum,
      visitProfile, showPermissionAlbum
    },
    computed: {
      filterAlbumBtns() {
        this.btnData = this.albumBtn.filter(data => (data['type'] == this.showBTNModel));
        return this.btnData
      }
    },
    created() {

      this.$root.$on('changeTopBack', () => {
        this.$refs.eightPage.style.top = "-475px";
        this.$refs.eightPage.style.transition = '0.5s';
      });
      this.$root.$on('defaultTopBack', () => {
        this.$refs.eightPage.style.top = "0px";
        this.$refs.eightPage.style.transition = '0.5s';
      });

      if (this.userID !== this.getUser().userID) {
        profileApi.friendshipStatus(this.userID).then(data => {

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

        })
      }


      if (this.userID == this.getUser().userID) {
        this.otherUser = false;
        this.me = true
      }


      this.$root.$on('emitupdateUserName', () => {
        let _self = this
        setTimeout(() => {
          _self.userObject = _self.getUser();
        }, 1000)
      });

      this.loadData(this.type);
      this.$root.$on('new_album', () => {
        this.newAlbumShow = true;
      });

      this.$root.$on('select_album_item', () => {
        if (this.albumDetailShow == true) {
          if (this.albumDetailData.length > 0) {
            this.showBTNModel = 3;
            this.ypos = 1
          }
        } else {
          if (this.albumData.length > 0) {
            this.showBTNModel = 3;
            this.ypos = 1
          }
        }


      });

      this.$root.$on('reset_selectingArr', (modelBtn) => {
        this.showBTNModel = modelBtn
        if (this.albumDetailShow == true) {
          for (let i in this.selectingAlbumDetail) {
            this.$set(this.selectingAlbumDetail, i, -1);
          }
        } else {
          for (let i in this.selectingArr) {
            this.$set(this.selectingArr, i, -1);
          }
        }

      });

      this.$root.$on('update_pic_list', () => {
        if (this.newAlbumShow == true) {
          this.newAlbumShow = false;
        }
        this.loadData(this.type);
      });
      this.$root.$on('delete_album', () => {
        this.albumDetailShow = false;
        this.loadData(this.type);
        this.showBTNModel = 1;

      });

      this.$root.$on('album_detail', (data) => {
        this.albumDetailShow = true;
        this.albumDetailData = '';

        this.showBTNModel = 2;
        this.ypos = 2;
        this.hasNextLink = false
        this.albumId = data;
        this.getAlbumDetail(data);

      });

      this.$root.$on('change_detail_to_album', () => {
        this.albumDetailShow = false;
        this.showBTNModel = 1;
        this.$refs.album.resetNumber();
      });

      this.$root.$on('QR_upload_pic', (data) => {
        this.isProfilePic = 0
        this.barCodeShow = true;
        this.url = (data);
      });

      this.$root.$on('QR_upload_pic_for_profile', (data) => {
        this.isProfilePic = 1
        this.barCodeShow = true;
        this.url = (data);
      });
      this.$root.$on('delete_picture', () => {
        if (this.albumDetailShow == true) {
          this.makeDeletingArr(this.selectingAlbumDetail, this.albumDetailData);
        } else {
          this.makeDeletingArr(this.selectingArr, this.albumData);
        }
      });
      this.$root.$on('call_next_picture_list', () => {
        let userId = this.getUser().userID;

        if (this.albumNextLink != null && this.albumNextLink != '') {
          // console.log('toooooooooooo')
          api.pictureList(this.albumNextLink, userId).then(data => {
            this.prepareAlbumData(data, 1)
          });
        }

      });

      this.$root.$on('call_next_Medal_list', () => {
        if (this.badgeNextLink != null || this.badgeNextLink != '') {
          profileApi.totalbadges(this.badgeNextLink, this.userID, 'all').then(data => {
            this.prepareBadgeData(data, 1)
          });
        }

      });


    },
    methods: {
      ...mapGetters([
        'getUser', 'access_token'
      ]),
      removeOver() {
        this.$root.$emit('sideMenu_active');
        this.activeRoute = 0;
      },
      addOver() {
        this.$root.$emit('sideMenu_deactive');
        this.activeRoute = 1;
      },
      makeDeletingArr(selectArr, idArr) {
        let deletingArray = [];//array az id haee ke gharare pak beshan
        for (let i in selectArr) {
          if (selectArr[i] == 1) {
            deletingArray.push(idArr[i]['id'])
          }

          if (i == selectArr.length - 1) {
            this.deletePic(deletingArray);
          }
        }
      },
      deletePic(arr) {

        api.pictureDelete(arr).then(data => {
          if (data.success == true) {
            this.albumNextLink = '';
            if (this.albumDetailShow == true) {
              this.getAlbumDetail(this.albumId)
            } else {
              this.showBTNModel = 1
              this.loadData(this.type);
            }

          }
        });
      },
      getAlbumDetail(id) {

        api.albumDetail(id, this.userID).then(data => {

          this.albumDetailData = data.data;
          this.$refs.album.resetNumber();
          for (var i=0; i<data.data.length; i++) {
            this.selectingAlbumDetail[i] = -1;
            this.$set(data['data'][i], 'is_album', 0);
          }
          if (this.albumDetailData.length == 0) {
            this.ypos = (this.otherUser) ? 0 : 2
          }
        })
      },
      loadData(index) {

        if (index == 1) {//badge

          if (this.me == true) {
            page({
              page: 'view badge',
              title: 'view badge'
            })
          } else {
            page({
              page: 'view badge others',
              title: 'view badge others'
            })
          }

          if (this.badgeNextLink == '' || this.badgeNextLink == null) {
            profileApi.totalbadges(this.badgeLink, this.userID, 'all').then(data => {
              this.prepareBadgeData(data, 0)
            });
          } else {
            profileApi.totalbadges(this.badgeNextLink, this.userID, 'all').then(data => {
              this.prepareBadgeData(data, 1)
            });
          }

        }

        if (index == 2) {//album

          if (this.me == true) {
            page({
              page: 'view albums',
              title: 'view albums'
            })
          } else {
            page({
              page: 'view albums others',
              title: 'view albums others'
            })
          }

          if (this.albumNextLink == '' || this.albumNextLink == null) {
            api.pictureList(this.albumLink, this.userID).then(data => {
              this.prepareAlbumData(data, 0)
            });
          } else {

            if (this.albumNextLink != null) {
              api.pictureList(this.albumNextLink, this.userID).then(data => {
                this.prepareAlbumData(data, 1)
              });
            }

          }
        }

        if (index == 3) {//favorits

          if (this.me == true) {
            page({
              page: 'view favorits',
              title: 'view favorits'
            })
          } else {
            page({
              page: 'view albums others',
              title: 'view albums others'
            })
          }

          profileApi.favoriteList(this.userID).then(data => {

            this.intesrtData = data;
            this.sideData = data['data']['categories'];
            this.filtering = data['data']['list'];
            //console.log('------------------------------ ' + JSON.stringify(this.sideData))


            for (var i = 0; i < this.sideData.length; i++) {

              this.intrestFav[i] = this.filtering.filter(data => (data['parent'] == this.sideData[i]['id'] && data['is_active'] == 1));

            }


          });
        }
        if (index == 5) {//see profile
          if (this.otherUser == true) {
            this.ypos = 0;
            page({
              page: 'view profile info others',
              title: 'view profile info others'
            })
          } else {
            this.ypos = 1;
            page({
              page: 'view profile info',
              title: 'view profile info'
            })
          }

          this.profileData = ''
          profileApi.profileView(this.userID).then(data => {
            this.profileData = data.data;
          })
        }
      },
      prepareBadgeData(data, hasNext) {
        this.badgeNextLink = data.links.next;
        this.badgeCat = data.data.category;
        this.badgeCatName = [];
        for (let i in this.badgeCat) {
          this.badgeCatName.push(this.badgeCat[i]['name'])
        }

        if (hasNext == 1) {
          this.badgeFilter = this.badgeFilter.concat(data.data.list);
        } else {
          this.badgeFilter = data.data.list;
        }
        this.showBadge = true
        this.badgeData = this.badgeFilter
        // alert(this.ypos + ' ' + this.type)
        // alert(this.type)
        // // if (this.badgeData.length == 0) {
        // //   this.ypos = 3;
        // // }
      },
      prepareAlbumData(data, hasNext) {
        if (data.success == true) {
          this.albumNextLink = data.links.next;

          if (hasNext == 1) {
            this.hasNextLink = true
            this.pictureOutOfAlbum = this.pictureOutOfAlbum.concat(data.data);
          } else {
            this.pictureOutOfAlbum = data.data;
          }
          for (let i in data.albums) {
            this.$set(data['albums'][i], 'is_album', 1);
          }
          for (let i in this.pictureOutOfAlbum) {
            this.$set(this.pictureOutOfAlbum[i], 'is_album', 0);
          }
          this.filtering = this.pictureOutOfAlbum;
          this.tmpAlbum = this.filtering.filter(data => (data['album_id'] == 0));
          this.albumData = data.albums.concat(this.tmpAlbum);
          for (let i in this.albumData) {
            this.selectingArr[i] = -1
          }
          if (this.albumData.length == 0) {
            this.ypos = 0;
          }

        } else {

          this.seeAlbumPermission = false;
          this.permissionTxt = data.data.message
          this.ypos = 0;
        }
      },
      left() {
        switch (this.ypos) {
          case 0://menu
            if (this.otherUser) {
              if (this.xpos == 0) {
                if (!this.$refs.ProfileMenu.left()) {
                  this.xpos = 1;
                  this.xbutton = 1;
                }
              } else if (this.xpos == 1) {
                if (this.xbutton == 1) {
                  this.xbutton = 2;
                  return true;
                } else if (this.xbutton == 2) {
                  this.activeRoute = 0;
                  this.$root.$emit('leftside_active');
                }

              }
            } else {
              if (!this.$refs.ProfileMenu.left()) {
                this.activeRoute = 0;
                this.$root.$emit('leftside_active');
              }
            }

            break;
          case 1://table
            if (this.type == 1) {//badge
              if (!this.$refs.userMedals.left()) {
                this.activeRoute = 0;
                this.$root.$emit('leftside_active');
              }
            }
            if (this.type == 2) {//component album
              if (!this.$refs.album.left()) {
                this.activeRoute = 0;
                this.$root.$emit('leftside_active');
              }
            }
            if (this.type == 3) {//favorite
              if (!this.$refs.favorits.left()) {
                this.activeRoute = 0;
                this.$root.$emit('leftside_active');
              }
            }
            if (this.type == 5) {//takmil profile
              if (!this.$refs.visitProfile.left()) {
                this.activeRoute = 0;
                this.$root.$emit('leftside_active');
              }
            }

            break;
          case 2:// album btns
            if (this.type == 2) {

              if (this.barCodeShow == true) {
                return false
              }
              if (this.newAlbumShow == true) {
                this.$refs.createNewAlbum.left()
                return false
              }


              if (this.albumDetailShow && this.albumDetailData.length != 0) {
                this.ypos = 1;
              }

              if (!this.albumDetailShow && this.albumData.length != 0) {
                this.ypos = 1;
              }


            }

            break
          case 3://side list
            if (this.type == 1) {//badge
              this.ypos = 1;
            } else if (this.type == 3) { //favorite
              if (!this.$refs.favorits.left()) {
                this.activeRoute = 0;
                this.$root.$emit('leftside_active');
              }
            }

            break;
          case 5:
            if (!this.$refs.challenge.left()) {
              this.$root.$emit('leftside_active');
              this.activeRoute = 0;
            }
        }

      },
      right() {
        switch (this.ypos) {
          case 0://menu
            if (this.otherUser) {
              if (this.xpos == 1) {
                if (this.xbutton == 2) {
                  this.xbutton = 1;
                } else {
                  this.xpos = 0;
                }
              } else if (this.xpos == 0) {
                if (!this.$refs.ProfileMenu.right()) {
                  this.removeOver()
                }
              }
            } else {
              if (!this.$refs.ProfileMenu.right()) {
                this.removeOver()
              }
            }


            break
          case 1://table
            if (this.type == 1) {//badge
              if (!this.$refs.userMedals.right()) {
                this.ypos = 3;
              }
            }
            if (this.type == 2) {//albuum
              if (!this.$refs.album.right()) {
                if (this.otherUser) {
                  this.removeOver()
                } else {
                  this.ypos = 2
                }

              }
            }
            if (this.type == 3) {
              if (!this.$refs.favorits.right()) {
                this.ypos = 3


              }
            }
            if (this.type == 5) {//takmil profile
              if (!this.$refs.visitProfile.right()) {
                this.removeOver()
              }
            }
            break
          case 2://age zire menu dokme bood
            if (this.type == 2) {//album
              if (this.barCodeShow == true) {
                return false
              }
              if (this.newAlbumShow == true) {
                this.$refs.createNewAlbum.right()
                return false
              }
              this.removeOver()

            }
            break
          case 3://side list

            if (this.type == 1) { //sideList
              if (!this.$refs.sideList.right()) {
                this.removeOver();
              }
            } else if (this.type == 3) {  //favorite
              if (!this.$refs.favorits.right()) {
                this.removeOver();
              }
            }


            break
          case 5:
            if (!this.$refs.challenge.right()) {
              this.removeOver()
              this.$root.$emit()
            }
        }
      },
      down() {

        switch (this.ypos) {
          case 0: //menue
            if (this.type == 2) {
              if (this.seeAlbumPermission == true) {
                if (this.otherUser == true) {

                  if (this.albumDetailShow == true) {
                    if (this.albumDetailData.length != 0) {
                      this.ypos = 1
                    }
                  } else {
                    if (this.albumData.length != 0) {
                      this.ypos = 1
                    }
                  }

                } else {
                  let len = this.$refs.album.itemLength();
                  this.ypos = (len != 0) ? 1 : 2

                }
              }
            }
            if (this.type == 3) {
              this.ypos = 3
            }
            if (this.type == 1) {
              if (this.badgeData.length > 0)
                this.ypos = 1;
            }
            if (this.type == 5) {
              if (this.otherUser == false) {
                this.ypos = 1
              }

            }
            if (this.type == 4)
              this.ypos = 5;

            break;
          case 1://table
            if (this.type == 1) {//badge
              if (!this.$refs.userMedals.down()) {
              }
            }
            if (this.type == 2) {

              if (!this.$refs.album.down()) {
              }
            }
            if (this.type == 3) {
              if (!this.$refs.favorits.down()) {
              }
            }
            if (this.type == 5) {//takmil profile
              if (!this.$refs.visitProfile.down()) {
              }
            }
            break
          case 2://dokme haye zire menu
            if (this.type == 2) {
              if (this.barCodeShow == true) {
                return false
              }
              if (this.newAlbumShow == true) {
                return false
              }
              this.$refs.btns.down()


            }
            break;
          case 5:
            this.$refs.challenge.down();
            break;
          case 3:

            if (this.type == 1) { // sideList
              if (!this.$refs.sideList.down()) {
              }
            } else if (this.type == 3) { //favorite
              if (!this.$refs.favorits.down()) {
              }
            }


            break;
        }
      },

      up() {
        switch (this.ypos) {
          case 0://menu
            break;
          case 1://table
            if (this.type == 1) {//badge
              if (!this.$refs.userMedals.up()) {
                this.ypos = 0
              }
            }
            if (this.type == 2) {
              if (!this.$refs.album.up()) {

                if (this.otherUser == true) {
                  this.ypos = 0
                } else {
                  this.ypos = 2
                }

              }
            }
            if (this.type == 3) {
              if (!this.$refs.favorits.up()) {
                this.ypos = 0
              }
            }
            if (this.type == 5) {//takmil profile
              if (!this.$refs.visitProfile.up()) {
                this.ypos = 0
              }
            }
            break
          case 2://dokme zire menu
            if (this.barCodeShow == true) {
              return false
            }
            if (this.newAlbumShow == true) {
              return false
            }
            if (!this.$refs.btns.up()) {
              this.ypos = 0
            }
            break;
          case 5:
            if (!this.$refs.challenge.up())
              this.ypos = 0;
            break;
          case 3:
            if (this.type == 1) { //sideList
              if (!this.$refs.sideList.up()) {
              }
            } else if (this.type == 3) { //favorite
              if (!this.$refs.favorits.up()) {
                this.ypos = 0
              }
            }

            break;
        }
      },
      enter() {
        // alert(this.ypos + ' ' + this.type)
        let time = new Date().getTime();
        switch (this.ypos) {
          case 0://menue
            if (this.xpos == 0) {
              this.type = this.$refs.ProfileMenu.enter();
              this.sel = this.type;

              if (this.type === 0) {
                this.$router.push({
                  path: '/six/' + time + '/', query: {params: this.userObject, id: this.userID}
                });
              } else
                this.loadData(this.type);
            } else if (this.xpos == 1) {
              if (this.xbutton == 1) {
                this.$router.push({path: '/four/' + time, query: {'reciever': this.userID}});
              } else {
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
              }
            }

            break;
          case 1://table
            if (this.type == 2) {//album

              this.$refs.album.enter();
              if (this.otherUser == true) {
                this.ypos = 1;
              }

              //    this.$refs.album.makeScroll();

            }
            if (this.type == 3) {
              this.$refs.favorits.enter()
            }
            if (this.type == 5) {//takmil profile
              if (!this.$refs.visitProfile.enter()) {
                this.$router.push({
                  path: '/eight/' + time,

                  query: {
                    'type': 2,
                    'id': this.userID,
                    'userObject': this.userObject,
                    'sel': 2
                  }

                });
              }
            }
            break
          case 2://dokme haye zire menu

            if (this.barCodeShow == true) {
              this.barCodeShow = false;

              if (this.showBTNModel == 2) {
                this.getAlbumDetail(this.albumId);
              } else if (this.showBTNModel == 1) {
                this.loadData(2)
                if (this.isProfilePic == 1) {
                  this.$root.$emit('emitupdateUserName')
                }
              }


              return false
            }
            if (this.newAlbumShow == true) {
              this.$refs.createNewAlbum.enter()
              return false
            }
            this.$refs.btns.enter();

            break
          case 3://side list
            this.$refs.favorits.enter();

            break
        }

      },
      back() {
        switch (this.ypos) {
          case 0://menue
            this.$router.go(-1);
            //this.$router.go(-1);
            break
          case 1://table
            if (this.type == 2) {//album
              if (this.barCodeShow == true) {
                this.barCodeShow = false;

                if (this.albumDetailShow == true) {
                  this.getAlbumDetail(this.albumId);
                } else {
                  this.loadData(2);
                }


                return false
              }


              if (!this.$refs.album.back()) {
                this.$router.go(-1);
              }
            }
            if (this.type == 3 || this.type == 1) {
              this.$router.go(-1);
            }
            if (this.type == 5) {//takmil profile
              if (!this.$refs.visitProfile.back()) {
                this.$router.go(-1);
              }
            }
            break
          case 2://dokme zire menu

            if (this.type == 2) {

              if (this.newAlbumShow == true) {
                this.$refs.createNewAlbum.hideAllIme();
                this.newAlbumShow = false;
                return false;
              }

              if (this.barCodeShow == true) {
                this.barCodeShow = false
                if (this.showBTNModel == 2) {
                  this.getAlbumDetail(this.albumId);
                } else if (this.showBTNModel == 1) {

                  this.loadData(2)
                  if (this.isProfilePic == 1) {
                    this.$root.$emit('emitupdateUserName')
                  }
                }
                return false
              }


              if (this.showBTNModel == 3) {//delete
                let modelBtn = (this.albumDetailShow) ? 2 : 1;
                this.$root.$emit('reset_selectingArr', modelBtn);
                return false
              }

              if (this.albumDetailShow == true) {
                this.$root.$emit('change_detail_to_album');
                return false
              }

              this.$router.go(-1);


            }
            if (this.type == 3) {
              this.$router.go(-1);
            }
            break;
          case 3:
            this.$refs.favorits.back()
            break;
          case 5:
            this.$router.go(-1);
            break
        }
      },
      done() {
        if (this.type == 5) {//takmil profile
          this.$refs.visitProfile.hideAll()
        }
        if (this.newAlbumShow == true) {
          this.$refs.createNewAlbum.hideAllIme()
        }
      },
      cancel() {
        if (this.type == 5) {//takmil profile
          this.$refs.visitProfile.hideAll()
        }
        if (this.newAlbumShow == true) {
          this.$refs.createNewAlbum.hideAllIme()
        }
      }

    }
  }
</script>

<style scoped>
  .pageP {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 1920px;
    height: 1080px;
  }

  .top {
    width: 1760px;
    height: 160px;
    position: absolute;
    right: 80px;
    top: 80px;
    /*background-color: #2c3e50;*/
  }

  .buttonParent {
    position: absolute;
    left: 30px;
    top: 75px;
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

  .container {
    /*background-color: darkkhaki;*/
    width: 1160px;
    height: inherit;
    position: absolute;
    right: 107px;
    /*width:*/
  }

  .scores-page {
    position: absolute;
    width: 1760px;
    height: 850px;
    top: 240px;
    right: 80px;
    text-align: right;
    /*background-color: #337ab7;*/
  }

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
</style>

