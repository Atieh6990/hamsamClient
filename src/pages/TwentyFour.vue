<template>
  <div>
    <app-detail ref="detailApp" :app-detail="appDetail"
                :userComment="userComment" :screen="screen" :commentcount="commentCount" :ratemsg="rateMsg"
                :comment-app="comments" :success-cmd="successCmd"
                :noAjaxCmd="noAjaxCmd"
                :yPage="yPage"
                :xPage="xPage" :xActive="0" :yActive="1" :activeRoute="activeRoute"></app-detail>

    <SugestedProgram class="Parent-filickty" ref="SugestedProgram" :programs="smiliar" :yPage="yPage" :xPage="xPage"
                     :xActive="0" :yActive="2" :activeRoute="activeRoute"></SugestedProgram>

  </div>


</template>

<script>
  import api from '../api/apps'
  import challenge from '../api/challenge'
  import appDetail from '../components/pageTwentyFour/appDetail'
  import SugestedProgram from '../components/PageOne/SuggestedPrograms'
  import {page} from 'vue-analytics'
  import {ROAST_CONFIG} from "../config";


  export default {
    name: "twenty-four",
    data() {
      return {
        appID: this.$route.query.appID,
        pkgID: this.$route.query.pkgID,
        xActive: 0,
        yActive: 0,
        activeRoute: 1,
        yPage: 1,
        xPage: 1,
        appDetail: [],
        screen: [],
        datas: [],
        userComment: [],
        ypos: '',
        xpos: '',
        xdetail: '',
        showStar: '',
        rating: '',
        commentCount: 0,
        rateMsg: '',
        xmsg: '',
        comments: [],
        cmdUrl: ROAST_CONFIG.url_Domain + 'hamsam/pservice/api/v1/application/comment',
        prev: '',
        next: '',
        dataDown: [],
        noAjaxCmd: false,
        ycmd: '',
        lengthcmd: '',
        ysend: '',
        xsend: '',
        comment: '',
        smiliar: '',
        showMsg: '',
        ysendmsg: '',
        successCmd: '',
        showText: '',



      }

    },
    components: {appDetail, SugestedProgram},
    created() {

      this.$root.$on('refresh_flag', () => {
        this.noAjaxCmd = false;

      });

      api.appDetail(this.appID).then(data => {
        // console.log('data ->' + JSON.stringify(data));
        this.appDetail = data['data']['detail'];
        this.userComment = data['data']['comments'];
        this.commentCount = data['data']['commentcount'];
        this.smiliar = data['data']['smiliar'];


        for (let i = 1; i < 5; i++) {
          this.screen.push(this.appDetail['screen' + i]);
        }

        // console.log('this.commentCount -> ' + this.commentCount)
        // console.log('this.comment4444s -> ' + this.userComment)

      });


    },
    methods: {
      up() {
        if (this.yPage == 1) {
          this.$refs.detailApp.up();
        } else {
          this.yPage = 1;
        }

      },
      down() {

//alert(this.$refs.detailApp.down())
        if (!this.$refs.detailApp.down()) {
          this.yPage = 2;
        } else {
          this.dataDown = this.$refs.detailApp.down();
          // alert(JSON.stringify(this.dataDown))
          this.ycmd = this.dataDown['ycmd'];
          this.lengthcmd = this.dataDown['length'];
          this.ypos = this.dataDown['ypos'];
          this.showMsg = this.dataDown['showMsg'];
          this.ysendmsg = this.dataDown['ysendmsg'];
          // alert(this.ycmd + ' ' + this.lengthcmd);
          if (this.showMsg == true) {

            if (this.ysendmsg == 1) {

              if (this.ycmd == this.lengthcmd) {
                this.moreCmd(this.next);
              }

            }
          }
        }

      },
      right() {
        // console.log('right page ---->' + this.$refs.detailApp.right())
        if (this.yPage == 1) {


          if (!this.$refs.detailApp.right()) {
            this.activeRoute = 0;
            this.$root.$emit('sideMenu_active');
          }


        } else if (this.yPage == 2) {

          if (!this.$refs.SugestedProgram.right()) {
            this.activeRoute = 0;
            this.$root.$emit('sideMenu_active');
          }
        }

      },
      left() {
        //   console.log('left page ---->' + this.$refs.detailApp.left())
        if (this.yPage == 1) {
          if (!this.$refs.detailApp.left()) {
            this.activeRoute = 0;
            this.$root.$emit('leftside_active');
          }

        } else if (this.yPage == 2) {
          if (!this.$refs.SugestedProgram.left()) {
            this.activeRoute = 0;
            this.$root.$emit('leftside_active');
          }

        }
      }, enter() {

        if (this.yPage == 1) {

          this.datas = this.$refs.detailApp.enter();

          this.ypos = this.datas['ypos'];
          this.xpos = this.datas['xpos'];
          this.xdetail = this.datas['xdetail'];
          this.showStar = this.datas['showStar'];
          this.xmsg = this.datas['xmsg'];
          this.rating = this.datas['rating'];
          this.ysend = this.datas['ysend'];
          this.xsend = this.datas['xsend'];
          this.comment = this.datas['comment'];
          this.showText = this.datas['showText'];


          if (this.ypos == 1) {
            if (this.xpos == 1) {
              if (this.xdetail == 1) {
                page({
                  page: 'open app',
                  title: 'open app'
                })
                this.openApp(this.pkgID, this.appID);
              } else if (this.xdetail == 2) {
                if (this.showStar) {
                  if (this.rating != 0) {
                    page({
                      page: 'rate app',
                      title: 'rate app'
                    })
                    this.giveStar(this.rating);

                  }

                }

              }
            }
          } else if (this.ypos == 2) {

            if (this.xmsg == 1 || this.xmsg == 2) {

              if (this.noAjaxCmd == false) {
                var _self = this;
                _self = setTimeout(() => {
                  this.$refs.detailApp.scrollInit();
                }, 10);
                page({
                  page: 'view comments of the app',
                  title: 'view comments of the app'
                })
                this.cmd();
              }

            }
            if (this.ysend == 2) {
              if (this.xsend == 1) {
                  this.$refs.detailApp.showKeyboard();

              } else if (this.xsend == 2) {
                // alert('ssssss ->' + this.comment)
                if (this.comment != '') {
                  page({
                    page: 'comment app',
                    title: 'comment app'
                  })
                  this.sendCmd(this.comment);
                }

              }

            }

          }
        } else {
            if (this.yPage == 2) {
                this.$refs.SugestedProgram.enter()
            }
        }


      },
      back() {
        if (!this.$refs.detailApp.back()) {
          this.$router.go(-1);
        } else {
          // alert('return')

        }
      },
      done() {
        this.$refs.detailApp.done();
      },
      cancel() {
        this.$refs.detailApp.cancel();
      },
      openApp(pkg, ID) {

        var show = this;
        // console.log(' pkg ---->' + pkg)
        // var id = this.id[this.number];

        tizen.application.launch(
          pkg,
          function () {

            challenge.challengeApp(36, ID).then(data => {

              if (data["success"] = true) {
                //    console.log("challenge open app detail  -------->", data)


              } else {

              }
            });

            show.text = 'Success';
            show.$root.$emit('hide_dl');

            //   console.log('Success  in detail---->' + show.text)

          }, function (error) {

            show.text = 'Error : ' + JSON.stringify(error);
            show.$root.$emit('show_dl');


            //   console.log('Error in detail ---->' + show.text);


          });
        setTimeout(function () {
          show.$root.$emit('hide_dl');
        }, 5000);
      },
      giveStar(rate) {
        api.rate(this.appID, rate).then(data => {
          //   console.log('data rate ->' + JSON.stringify(data));
          this.rateMsg = data['message'];
          // this.showRateMsg = true;
          // alert(this.showRateMsg)


        });
        this.$root.$emit('showRateMsg');

        setTimeout(() => {
          this.$root.$emit('hideRateMsg');
        }, 3000);


      },
      cmd() {

        api.comment(this.cmdUrl, this.appID).then(data => {

          this.noAjaxCmd = true;
          // this.prev = data['links']['prev'];
          this.next = data['links']['next'];
          this.comments = data['data'];


        });
      },
      moreCmd() {
        if (this.next != null) {
          api.comment(this.next, this.appID).then(data => {

            this.noAjaxCmd = true;
            this.next = data['links']['next'];

            this.comments = this.comments.concat(data['data']);


          });
        }


      },
      sendCmd(text) {

        api.sendComment(this.appID, text).then(data => {

          this.successCmd = data['data']['message'];

        });

        this.$root.$emit('showMsg');

        setTimeout(() => {
          this.$root.$emit('hideMsg');
        }, 3000);

      }


    }


  }
</script>

<style scoped>

</style>
