<template>
  <div id="nineteen">
    <div class="msgbox" v-if="msg">{{msg}}</div>
    <walllist ref="list" :categories="categories" :active="0" :page="ypos"
              :selectedCat="walldata['cat']" :activeRoute="activeRoute" :selectedPerson="selectedPerson"></walllist>
    <wallItem ref="item" :active="1" :page="ypos" :activeRoute="activeRoute" :wallitems="finalList"
              :counter="walldata['counter']" :loadNumber="loadNumber" :likeArr="likeArr" :people="people"
              :reportMsg="reportMsg"></wallItem>
    <ad></ad>
    <wallReply :active="2" :page="ypos" :isMine="isMine" :data="comments" :selectedCat="walldata['categories']"
               ref="reply"
               :isPost="isPost"></wallReply>
    <div class="mobAppParent">
      <!--      <img :src="imgUrl + 'wall/scan.png'" style="width: 310px"/>-->
      <img class="code" :src="barcodeUrl"/>
      <div class="txtMob">بارکد را اسکن کنید و وارد وب اپلیکیشن هم سام شوید.</div>
    </div>

  </div>
</template>

<script>
  import walllist from '../components/pageNineteen/list'
  import ajaxwall from '../api/wall'
  import wallItem from '../components/pageNineteen/wallItem'
  import ad from '../components/pageNineteen/advertisement'
  import wallReply from '../components/pageNineteen/wallReply'
  import func from '../mixins/func'
  import {page} from 'vue-analytics'
  import {ROAST_CONFIG} from "../config";

  export default {
    name: 'nineteen',
    components: {walllist, wallItem, ad, wallReply},
    mixins: [func],
    data() {
      return {
        active: 1,
        activeRoute: 1,
        walldata: {},
        ypos: 0,
        selectedPerson: 0,
        from: 0,
        loadNumber: 30,
        to: 0,
        isFriends: 0,  //aya doostan as
        isMine: 0,  //aya male man ast?
        isPost: 0,
        msg: false,
        categories: [],
        comments: [],
        catID: {id: 1, xpos: 2},
        people: 2,
        url: ROAST_CONFIG.url_Domain + "hamsam/pservice/api/v1/wall/list",
        likeArr: [],
        next: '',
        finalList: [],
        txtLen: false,
        modalShow: false,
        reportMsg: '',
        imgUrl: ROAST_CONFIG.url_Img_server,
        barcodeUrl: 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=http://ssn.tvapps.ir/hamsam/app/'
    }
    }, created() {
      this.$root.$emit('sideMenu_show');
      this.to = this.from + this.loadNumber;

      this.$root.$on('moreWall', () => {
        this.moreWall();
      });

      ajaxwall.list(this.url, this.catID.id, this.catID.xpos).then(data => {

        if (data.data) {

          this.walldata = data.data;
          this.finalList = this.walldata.filter(data => (data['wall'] != null));
          this.next = data.links.next;
          this.categories = data.categories;
          //  console.log('next ->' + this.next)
          for (let i in this.finalList) {

            if (this.finalList[i]['is_liked'] == undefined) {
              this.likeArr[i] = 0;
            } else if (this.finalList[i]['is_liked'] == 1) {
              this.likeArr[i] = 1
            }

          }

        }
      });
    }, methods: {
      setLenght() {
        this.from = ((parseInt(this.walldata['counter']) + 1) * this.loadNumber);
        this.to = this.loadNumber + this.from;
      },
      up() {
        if (this.ypos == 0) {
          this.$refs.list.up()
        } else if (this.ypos == 1) {
          this.$refs.item.up()
        } else if (this.ypos == 2) {
          this.$refs.reply.up()
        }
      }, down() {
        if (this.ypos == 0) {
          this.$refs.list.down()
        } else if (this.ypos == 1) {
          if (!this.$refs.item.down()) {
            // alert('ajax');
            //  this.setLenght();
            // if (this.isFriends == 1) {
            //     ajaxwall.listcatFriends(this.from, this.to, 0, this.walldata['cat']).then(data => {
            //         if (data['wall']) {
            //             this.walldata['counter'] = data['counter'];
            //             this.walldata['wall'] = this.walldata['wall'].concat(data['wall']);
            //         }
            //     });
            // } else {
            //     ajaxwall.listcatperson(this.from, this.to, this.isMine, this.walldata['cat']).then(data => {
            //         if (data['wall']) {
            //             this.walldata['counter'] = data['counter'];
            //             this.walldata['wall'] = this.walldata['wall'].concat(data['wall']);
            //
            //         }
            //     });
            // }


          }
        } else if (this.ypos == 2) {
          this.$refs.reply.down();
        }
      }, right() {
        if (this.ypos == 0) {
          if (!(this.$refs.list.right())) {
            this.activeRoute = 0;
            this.$root.$emit('sideMenu_active');
          }
        } else if (this.ypos == 1) {
          if (!(this.$refs.item.right())) {
            this.ypos = 0;
          }
        } else if (this.ypos == 2) {
          this.$refs.reply.right()
        }
      }, left() {
        if (this.ypos == 0) {
          if (this.walldata.length > 0) {
            this.ypos++;
          }
        } else if (this.ypos == 1) {
          if (!this.$refs.item.left()) {
            this.activeRoute = 0;
            this.$root.$emit('leftside_active');

          }
        } else if (this.ypos == 2) {
          this.$refs.reply.left()
        }
      }, enter() {
        if (this.ypos == 0) {
          this.catID = this.$refs.list.enter();

          // status=0 : friend wall list
          // status=1 : user wall list
          // status=2 : all users wall list

          this.people = 0;
          if (this.catID.xpos == 1) // friends
            this.people = 0;
          else if (this.catID.xpos == 2) // me
            this.people = 1;
          else this.people = 2; // all
          page({
            page: 'view post of the different wall',
            title: 'view post of the different wall'
          })
          ajaxwall.list(this.url, this.catID.id, this.people).then(data => {


            this.next = data.links.next;
            this.walldata = data.data;
            this.finalList = this.walldata.filter(data => (data['wall'] != null));
            this.$refs.item.zpos = 0
            this.$refs.item.myScroll.refresh();
            this.$refs.item.myScroll.scrollTo(0, 0, 0);


            for (let i in this.finalList) {

              if (this.finalList[i]['is_liked'] == undefined) {
                this.likeArr[i] = 0;
              } else if (this.finalList[i]['is_liked'] == 1) {

                this.likeArr[i] = 1;
              }
              //console.log('like ------------->' + this.finalList[0]['is_liked'])
            }
            // }
          });
        } else if (this.ypos === 1) {

          this.$refs.reply.error = '';
          this.isPost = '1';

          let result = this.$refs.item.enter();
          //alert(result.result)
          if (result.result === 1) {
            this.isPost = result.result;
            // if (result.cmcount != 0) {

            ajaxwall.getComments(this.finalList[this.$refs.item.zpos].id).then(data => {
              this.ypos = 2;
              this.$refs.reply.show = 1;
              if (data.success == true) {
                this.comments = data.data;
                if (this.isPost != '0') {
                  setTimeout(() => {

                    this.$refs.reply.resetScroll();


                  }, 200);


                  //} else {

                  //}
                }

              }


            });
            // }


          } else if (result === 2) {
            this.comments.comments = [];
            this.$refs.reply.show = 1;
            this.$refs.reply.walltext = '';

            this.isPost = '0';
            this.ypos = 2;
          } else if (result.result === 2) {
            let time = new Date().getTime();
            this.$router.push({
              path: '/six/' + time,
              query: {
                params: {
                  // level: this.level,
                  pic: result.pic,
                  username: result.username
                }, id: result.user_id,
              }
            });
          } else if (result.result === 3) {
            // console.log(result.result + '  ' + result.wall_user_id + ' ' + result.user_id)

            if (result.wall_user_id != result.user_id) {

              page({
                page: 'report post of the wall',
                title: 'report post of the wall'
              })

              ajaxwall.report(result.id).then(data => {
                this.$root.$emit('report_show');
                this.reportMsg = data.data.message

                setTimeout(() => {
                  this.$root.$emit('report_hide');
                }, 3000);
              });
            } else if (result.wall_user_id == result.user_id) {

              if (!this.modalShow) {
                this.modalShow = true;
                var obj = {
                  color: "#EB5757",
                  text: 'آیا می خواهید پست خود را پاک کنید؟',
                  pics: null,
                  icon: '',
                  btnNumber: 2,
                  btnText: ['خیر', 'بله'],
                  title: 'پاک کردن پست'
                };
                this.$root.$emit("modal_active", (obj));
              } else {

                page({
                  page: 'delete post from wall',
                  title: 'delete post from wall'
                })


                this.close();
                ajaxwall.delete(result.id).then(data => {
                  if (data.success === true) {
                    ajaxwall.list(this.url, this.catID.id, this.people).then(data => {
                      if (data.data) {
                        this.walldata = data.data;
                        this.finalList = this.walldata.filter(data => (data['wall'] != null));
                        this.categories = data.categories;
                        this.$refs.item.zpos = 0;
                        this.$refs.item.xpos = 0;

                        for (let i in this.finalList) {

                          if (this.finalList[i]['is_liked'] == undefined) {
                            this.likeArr[i] = 0;
                          } else if (this.finalList[i]['is_liked'] == 1) {

                            this.likeArr[i] = 1;
                          }

                        }
                      }
                    });

                  }

                });
              }

            }

          }
        } else if (this.ypos === 2) {
          let replyText = this.$refs.reply.enter();
          let id = this.$refs.item.getWallId();
          if (this.isPost === '0') {
            if (replyText.ypos === 1) {
              this.$refs.reply.error = ''
              if (replyText.text.length < 5) {
                this.txtLen = true
              }

              if (replyText.text !== '' && replyText.text != null && this.txtLen == false) {
                page({
                  page: 'post on wall',
                  title: 'post on wall'
                })
                ajaxwall.post(this.catID.id, replyText.text).then(response => {
                  if (response.success === true) {
                    this.$refs.reply.show = 0;
                    ajaxwall.list(this.url, this.catID.id, this.people).then(data => {
                      if (data.data) {
                        this.walldata = data.data;
                        this.finalList = this.walldata.filter(data => (data['wall'] != null));
                        this.categories = data.categories;
                        this.ypos = 1;
                        for (let i in this.finalList) {

                          if (this.finalList[i]['is_liked'] == undefined) {
                            this.likeArr[i] = 0;
                          } else if (this.finalList[i]['is_liked'] == 1) {

                            this.likeArr[i] = 1;
                          }

                        }
                      }
                    });
                  }
                })
              } else {
                this.$refs.reply.error = 'متن ارسالی باید بیشتر از 5 کاراکتر باشد';
                this.txtLen = false
                // if(this.txtLen == true){
                //   this.$refs.reply.error = 'متن ارسالی باید بیشتر از 5 کاراکتر باشد';
                // }else {
                //   this.$refs.reply.error = 'لطفاً متن مورد نظر را وارد کنید';
                // }

              }
            }
          } else if (replyText && id) {
            this.isPost = '1';// comment gozari baraye yek post
            if (replyText.text !== '' && replyText.text != null) {
              page({
                page: 'reply to post of the wall',
                title: 'reply to post of the wall'
              })
              ajaxwall.insert(id, replyText.text).then(data => {
                if (data.success === true) {
                  this.$refs.reply.show = 0;
                  this.ypos = 1;
                }

              });
            }
          }

        }
      }
      , back() {

        // if (this.ypos == 2 || this.$refs.reply.show === 1) {
        //   this.hideKeyboards();
        //   this.ypos = 1;
        //   this.$refs.reply.show = 0;
        // } else {
        //   this.$router.go(-1);
        // }
        // alert(this.ypos + ' ' + this.$refs.item.isMore)
        if (this.ypos == 2) {
          if (this.$refs.reply.show === 1) {
            this.hideKeyboards();
            this.ypos = 1;
            this.$refs.reply.show = 0;
          } else {
            // alert('else')
            this.$router.go(-1);
          }

        } else if (this.ypos == 1) {
          if (this.$refs.item.isMore) {
            this.$refs.item.isMore = false
            return true;
          }
          if (this.modalShowStatus()) {
            this.close();
          } else {
            this.$router.go(-1);
          }
        }
      }, addOver() {
      }, removeOver() {
        this.$root.$emit('sideMenu_deactive');
      }, cancel: function () {
        this.hideKeyboards();
      }, done() {
        this.hideKeyboards();
      },
      hideKeyboards() {
        this.hideIme('wallmsg');
      }, moreWall() {

        if (this.next != null) {


          ajaxwall.list(this.next, this.catID.id, this.people).then(data => {

            if (data.data) {

              this.walldata = data.data;
              this.walldata = this.walldata.filter(data => (data['wall'] != null));
              this.finalList = this.finalList.concat(this.walldata);

              this.next = '';
              this.next = data.links.next;
              this.categories = data.categories;
              //  console.log('next ->' + this.next)
              for (let i in this.finalList) {

                if (this.finalList[i]['is_liked'] == undefined) {
                  this.likeArr[i] = 0;
                } else if (this.finalList[i]['is_liked'] == 1) {

                  this.likeArr[i] = 1;
                }

              }

            }
          });
        }
      },
      close() {
        this.$root.$emit("modal_off");
        this.modalShow = false;
      },
      modalShowStatus() {
        return this.modalShow;
      },

    }
  }

</script>
<style scoped>
  .msgbox {
    position: absolute;
    top: 100px;
    text-align: center;
    left: 936px;
    color: red;
    width: 600px;
    height: 66px;
    /*  border: 1px solid red;*/
    z-index: 44;
    font-size: 17px;
  }

  .mobAppParent {
    position: absolute;
    bottom: 200px;
    left: 50px;
    width: 30%;
  }

  .txtMob {
    position: absolute;
    left: 80px;
    top: 340px;
    font-size: 20px;
    /*color: #0455a5;*/
    color: #000;
    direction: rtl;
  }

</style>
