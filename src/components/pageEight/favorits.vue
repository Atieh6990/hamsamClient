<template>
  <div>
    <div v-if="showFav == true" class="backFav">
      <img class="overlay" :src="imgURL+'overlay.png'"/>
      <div class="backPopup">
        <div class="favPopup">
          <div v-if="showTxt == true" class="showTxt">علاقه مندی های این دسته بندی انتخاب شده است.</div>
          <div class="popupScroll">
            <div :id="'fav_'+f" v-if="(filterFav.length != 0)"
                 :class="['favList' , f > 5 ? 'topOtherColumn' : '']"
                 v-for="(fav , f) in filterFav">
              <div v-if="(f == numTable)"

                   :class="['tooltipPopup']">
                <div class="tooltiptext">{{fav.name}}
                </div>
                <div
                  v-if="(xpos == 3 && otherUser == false &&  f == numTable && page == active && activeRoute == 1)"
                  class="manfiParent" style="top: 80px">
                  <img :src="imgURL + 'favorite/manfi.png'" class="manfi"/>
                </div>

              </div>
              <div :id="'icon_' + f" :ref="'icon_' + f"
                   :class="['iconPopupParent',(f == numTable && page == active && activeRoute == 1) ? 'iconPopupParent-hvr' : '', 'randomClass']">
                <img :src="fav.icon"
                     :class="['iconPopup']"/>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="favParent">
      <div class="favScroll">
        <div v-for="(cat , c) in items"
             :class="['tooltipParent', c != 0 ? 'otherItem' : '']">
          <div :id="'cat_' + c"
               :class="['favCat' , c == 0 ? 'firstItem' : '',(ypos == 1 && number == c && page == active && activeRoute == 1 ? 'item-hvr' : '')]">
            <img class="iconCat" :src="cat.icon"/>
            <div v-if="otherUser == false"
                 :class="['addParent', (number == c && page == active && ypos == 1 && xpos == 1 && activeRoute == 1 ? 'cat-hvr' : '')]">
              <img :src="imgURL + 'favorite/add.png'" class="addFav"/>
            </div>
            <div v-if="otherUser == false" class="line-shape"></div>
            <div :class="['interestParent' , otherUser == true ? 'interestParentOtherUser' : '']">

              <div v-if="intrestFav[c].length != 0" v-for="(interest , i) in propsFav[c]">
                <div v-if="(number == c && xpos == 2  && xfav == i && page == active && activeRoute == 1)"
                     :class="['tooltip' , i == 0 ? 'tooltipRight' : '']">
                  <div class="tooltiptext">{{interest.name}}
                  </div>
                  <div
                    v-if="(otherUser == false && number == c && xpos == 2  && xfav == i && page == active && activeRoute == 1)"
                    class="manfiParent">
                    <img :src="imgURL + 'favorite/manfi.png'" class="manfi"/>
                  </div>

                </div>
                <img :src="interest.icon"
                     :class="['interestIcon' , i == 0 ? 'iconFirstItem' : '' , otherUser == true ? 'iconOtherUser' : '']"/>

              </div>
              <div v-if="propsFav[c].length == 0" class="notFav">گزینه ای انتخاب نشده است.</div>
            </div>
            <div v-if="otherUser == false && propsFav[c].length > 9"
                 :class="['plus', number == c && xpos == 3 && page == active && activeRoute == 1 ? 'plus-hvr' : '', otherUser == true ? 'plusOtherUser' : '']">
              +9
            </div>
            <div v-else-if="otherUser == true && propsFav[c].length > 10"
                 :class="['plus', number == c && xpos == 3 && page == active && activeRoute == 1 ? 'plus-hvr' : '', otherUser == true ? 'plusOtherUser' : '']">
              +10
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {ROAST_CONFIG} from '../../config';
  import profileApi from '../../api/profile'
  import {mapGetters} from 'vuex'
  import IScroll from "../../js/iscroll";

  export default {

    name: "favorits",
    props: ['user', 'items', 'parentFav', 'page', 'active', 'activeRoute', 'intrestFav', 'otherUser'],
    data() {
      return {
        imgURL: ROAST_CONFIG.url_comp_server,
        number: 0,
        xfav: 0,
        numberfavList: 0,
        columnCount: 2,
        ypos: 1,
        xpos: 2,
        myScroll: '',
        myScroll2: '',
        propsFav: [],
        refreshFav: [],
        showFav: false,
        filterFav: [],
        selectFav: [],
        numTable: 0,
        columnCount: 6,
        backColor: "#39b54a",
        concatFav: [],
        showTxt: false


      }
    },
    created() {
      let _self = this
      setTimeout(() => {
        _self.scrollInit();
      }, 600);
      if (this.otherUser == false) {
        this.xpos = 1;
      } else {
        this.xpos = 2;
      }
      this.propsFav = this.intrestFav;
    },
    watch: {

      propsFav: function () {
        // console.log('props')
      },
      filterFav: function () {
        // console.log('filter')
      }

    },
    methods: {
      ...
        mapGetters([
          'getUser'
        ]),
      changeColor: function () {

        this.$refs['icon_' + this.numTable][0].style.backgroundColor = "#39b54a";
      },

      scrollInit() {

        this.myScroll = '';
        if (this.myScroll == '') {
          this.myScroll = new IScroll(".favParent", {
            scrollY: true,
            scrollbars: "custom",
            momentum: true,
            preventDefault: false,
            scrollbars: true,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: "none",
            fadeScrollbars: false,
            mouseMove: true
          });
        }


      },
      scrollInitPopup() {
        this.myScroll2 = '';
        if (this.myScroll2 == '') {
          this.myScroll2 = new IScroll(".favPopup", {
            scrollY: true,
            scrollbars: "custom",
            momentum: true,
            preventDefault: false,
            scrollbars: true,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: "none",
            fadeScrollbars: false,
            mouseMove: true
          });
        }
      },

      left() {

        if (this.ypos == 1) {
          if (!this.showFav) {
            if (this.xpos == 1) {
              if (this.propsFav[this.number].length != 0) {
                this.xpos = 2;
                this.xfav = 0;
                return true;
              } else {
                return false;
              }
            } else if (this.xpos == 2) {

              if (this.xfav < this.propsFav[this.number].length - 1) {
                this.xfav++;
                if (this.otherUser == false) {
                  if (this.xfav == 9) {
                    this.xpos = 3;
                  }
                } else {
                  if (this.xfav == 10) {
                    this.xpos = 3;
                  }
                }
                return true;
              }

            }
            // return false;
          } else {
            if ((this.numTable % this.columnCount != parseInt(this.columnCount) - 1) && (this.numTable + 1 < this.filterFav.length)) {
              this.numTable++;
              if (this.xpos == 3) {
                if (this.xfav < this.propsFav[this.number].length - 1) {
                  this.xfav++;
                }
              }
            }
            return true;
          }


        }

      }
      ,
      right() {
        if (this.ypos == 1) {
          if (!this.showFav) {
            if (this.xpos == 3) {
              this.xpos = 2;
              if (this.otherUser == false) {
                this.xfav = 8;
              } else {
                this.xfav = 9;
              }

              return true;

            } else if (this.xpos == 2) {

              if (this.xfav > 0) {
                this.xfav--;

              } else if (this.xfav == 0) {
                if (this.otherUser == false) {
                  this.xpos = 1;
                } else {
                  return false;
                }
              }
              return true;
            }
            // return false;
          } else {

            if (this.numTable % this.columnCount != 0) {
              this.numTable--;
              if (this.xpos == 3) {
                if (this.xfav > 0) {
                  this.xfav--;

                }
              }
            }
            return true;
          }


        }

      }
      ,
      down() {
        if (this.ypos == 1) {
          if (!this.showFav) {
            if (this.number < this.items.length - 1) {
              if (this.otherUser == false) {
                this.xpos = 1;
              } else {
                this.xpos = 2;
              }

              this.xfav = 0;
              this.number++;
              this.myScroll.refresh();
              this.myScroll.scrollToElement('#cat_' + this.number, 1000, false, true);

            }
            return true
          } else {
            console.log(this.numTable + '  ' + parseInt(this.columnCount) + ' ' + (this.filterFav.length))
            if ((this.numTable + parseInt(this.columnCount)) < (this.filterFav.length)) {
              this.numTable += parseInt(this.columnCount);
            } else {
              this.numTable = this.filterFav.length - 1;
            }

            this.myScroll2.refresh();
            this.myScroll2.scrollToElement('#fav_' + this.numTable, 1000, false, true);
            return true;
          }


        }
        return false;

      }
      ,
      up() {

        if (this.ypos == 1) {
          if (!this.showFav) {
            if (this.number > 0) {
              if (this.otherUser == false) {
                this.xpos = 1;
              } else {
                this.xpos = 2;
              }

              this.xfav = 0;
              this.number--;
              this.myScroll.refresh();
              this.myScroll.scrollToElement('#cat_' + this.number, 1000, false, true);
              return true
            }
          } else {
            if ((this.numTable) >= this.columnCount) {
              this.numTable -= parseInt(this.columnCount);
              this.myScroll2.refresh();
              this.myScroll2.scrollToElement('#fav_' + this.numTable, 1000, false, true);
            }
            return true;
          }
        }
        // else if (this.ypos == 1) {
        //   if ((this.numberfavList) >= this.columnCount) {
        //     this.numberfavList -= parseInt(this.columnCount);
        //     this.myScroll.scrollToElement('#favorite_' + this.numberfavList, 1000, false, true);
        //     return true
        //   } else {
        //     if (this.intrestFav.length != 0) {
        //       this.ypos = 0;
        //       return true
        //     } else {
        //       return false
        //     }
        //
        //   }
        // }

      }
      ,
      enter() {

        if (this.ypos == 1) {
          if (!this.showFav) {
            if (this.xpos == 1) {
              let _self = this
              setTimeout(() => {
                _self.scrollInitPopup();
              }, 100);
              this.showFav = true;
              this.filterFav = [];
              profileApi.favoriteList(this.user).then(data => {

                let sideData = data['data']['categories'];
                let filtering = data['data']['list'];
                this.numTable = 0;

                for (var i = 0; i < this.items.length; i++) {

                  this.filterFav = filtering.filter(data => (data['parent'] == sideData[this.number]['id'] && data['is_active'] != 1));

                }
                if (this.filterFav.length == 0) {
                  this.showTxt = true;
                } else {
                  this.showTxt = false;
                }
              });

            } else if (this.xpos == 2) {
              if (this.otherUser == false) {

                profileApi.favoriteSave(this.propsFav[this.number][this.xfav]['id']).then(data => {
                  if (data.success == true) {

                    this.propsFav[this.number].splice(this.xfav, 1);
                    this.refreshMyFav();
                    // console.log('before popup => ' + JSON.stringify(this.propsFav[this.number][this.xfav]))
                    //
                    // this.filterFav.push(this.propsFav[this.number][this.xfav]);
                    // this.selectFav = this.filterFav;
                    // this.filterFav = [];
                    // this.filterFav = this.selectFav;
                    //
                    // console.log('after popup => ' + JSON.stringify(this.filterFav))


                  }
                })
              }
            } else if (this.xpos == 3) {
              let _self = this
              setTimeout(() => {
                _self.scrollInitPopup();
              }, 100);
              this.showTxt = false;
              this.showFav = true;
              this.filterFav = [];
              this.numTable = 0;
              let x;

              if (!this.otherUser) {
                x = 9;
              } else {
                x = 10;
              }
              //  console.log('ghablesh ->' + JSON.stringify(this.propsFav[this.number]));
              for (x; x < this.propsFav[this.number].length; x++) {

                this.filterFav.push(this.propsFav[this.number][x]);

                //console.log('filter ' + JSON.stringify(this.filterFav) + '---------' + this.xfav);
              }


            }

          } else {
            if (this.xpos == 1) {
              let result = this.propsFav[this.number].indexOf(this.filterFav[this.numTable]);
              if (result == -1) {
                profileApi.favoriteSave(this.filterFav[this.numTable]['id']).then(data => {
                  if (data.success == true) {
                    this.changeColor();
                    this.concatFav = this.propsFav[this.number].push(this.filterFav[this.numTable])

                  }
                })
              }


            } else if (this.xpos == 3) {
              if (!this.otherUser) {
                profileApi.favoriteSave(this.filterFav[this.numTable]['id']).then(data => {
                  if (data.success == true) {
                    this.propsFav[this.number].splice(this.xfav, 1);
                    this.filterFav.splice(this.numTable, 1);
                    this.refreshMoreFav();
                    // console.log('splice koli ->' + JSON.stringify(this.propsFav[this.number]) + '  ' + this.xfav)


                  }
                })
              }
            }

          }

        }

      },
      refreshMyFav() {
        //alert('my fax')
        this.refreshFav = this.propsFav;
        this.propsFav = [];
        this.propsFav = this.refreshFav;
        this.xpos = 1;
        // this.xfav = 0;

      },
      refreshMoreFav() {
        this.selectFav = this.filterFav;
        this.filterFav = [];
        this.filterFav = this.selectFav;
        this.numTable = 0;
      },
      refreshArrs() {
        if (this.xpos == 1) {
          this.propsFav[this.number].concat(this.concatFav);

        }
        this.refreshMyFav();

      },
      back() {
        if (this.showFav) {
          this.showFav = false;
          this.myScroll2.refresh();
          this.refreshArrs();


        } else {
          this.$router.go(-1);
        }
      }

    }

  }
</script>

<style scoped>

  .backFav {
    position: absolute;
    width: 1920px;
    height: 1080px;
    top: 0px;
    left: 0px;
    z-index: 100;
  }

  .overlay {
    position: absolute;
    top: 0px;
    left: 0px;
  }

  .backPopup {
    border-radius: 20px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
    width: 1132px;
    height: 736px;
    position: absolute;
    top: 165px;
    left: 400px;
    overflow: hidden;
  }

  .favPopup {
    width: 1080px;
    height: 690px;
    position: absolute;
    top: 25px;
    left: 0px;
    overflow: hidden;
  }

  .popupScroll {
    width: 1000px;
    position: absolute;
    top: 0px;
    left: 30px;
  }

  .favList {
    position: relative;
    float: right;
    margin-right: 5px;
    margin-top: -25px;

  }

  .topOtherColumn {
    margin-top: -57px;
  }

  .tooltipPopup {
    position: relative;
    float: right;
    right: 5px;
    top: 30px;
    display: inline-block;
    border-bottom: 1px dotted black;
    z-index: 1;
  }

  .tooltipPopup .tooltiptext {
    width: 150px;
    height: 30px;
    line-height: 28px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.31);
    color: #89949a;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    font-size: 18px;
  }

  .tooltipPopup .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: rgb(255, 255, 255) transparent transparent transparent;
    border-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.31);
    transition: 2s;
  }

  .iconPopupParent {
    width: 155px;
    height: 155px;
    position: relative;
    float: right;
    margin-top: 65px;
    border-radius: 50%;
  }

  .iconPopupParent-hvr {
    background-color: #cccccc;
  }

  .iconPopup {
    width: 130px;
    height: 130px;
    position: absolute;
    left: 12px;
    top: 12px;

  }

  .favParent {
    position: absolute;
    top: 230px;
    width: 1450px;
    height: 785px;
    right: 118px;
    overflow: hidden;


  }

  .favScroll {
    width: 1385px;
    position: absolute;
    left: 0px;
  }

  .tooltipParent {
    width: 1381px;
    height: 155px;
    position: relative;
  }

  .otherItem {
    height: 106px;;
  }

  .item-hvr {
    background: linear-gradient(0deg, rgba(141, 142, 150, 0.5) 1.4%, rgba(207, 207, 207, 0) 100%), #FFFFFF;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
    transition: 0.5s;
    /*transform: scale(1.1);*/
  }

  .favCat {
    border-radius: 20px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
    width: 1381px;
    height: 106px;
    position: relative;
    margin-top: 15px;
  }

  .firstItem {
    top: 50px;
  }

  .iconCat {
    position: absolute;
    right: -3px;
    top: -3px;
  }

  .addParent {
    background-color: #d7d7d7;
    border-radius: 50%;
    width: 90px;
    height: 90px;
    position: absolute;
    right: 190px;
    top: 9px;
  }

  .addFav {
    width: 44px;
    height: 44px;
    position: absolute;
    left: 22px;
    top: 22px;
  }

  .cat-hvr {
    background-color: rgb(25, 85, 166) !important;
    box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.57);
  }

  .line-shape {
    border-width: 2px;
    border-color: rgb(183, 183, 183);
    border-style: solid;
    width: 0;
    height: 57px;
    position: absolute;
    right: 305px;
    top: 22px;
  }

  .interestParent {
    width: 977px;
    height: 165px;
    position: absolute;
    top: -60px;
    right: 305px;
    overflow: hidden;

  }

  .interestParentOtherUser {
    width: 1105px;
    right: 170px;
  }

  .otherItemInterest {

  }

  .interest {
    position: relative;
    float: right;
  }

  .interestIcon {
    width: 85px;
    height: 85px;
    float: right;
    margin-top: 72px;
    margin-right: 18px;
  }

  .iconFirstItem {
    margin-right: 30px;
  }

  .iconOtherUser {
    margin-right: 22px;
  }

  .plus {
    background-color: #FFF;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.23);
    border-radius: 50%;
    width: 85px;
    height: 85px;
    position: absolute;
    left: 30px;
    top: 11px;
    font-size: 24px;
    direction: ltr;
    color: #0455a5;
    line-height: 90px;
  }

  .plusOtherUser {
    left: 35px;
  }

  .plus-hvr {
    background-color: #0455a5;
    color: #FFF;
  }

  .tooltip {
    position: relative;
    float: right;
    right: -12px;
    top: 15px;
    display: inline-block;
    border-bottom: 1px dotted black;

  }

  .tooltipRight {
    right: 2px;
  }

  .tooltip .tooltiptext {
    width: 150px;
    height: 30px;
    line-height: 28px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.31);
    color: #89949a;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    font-size: 18px;

  }

  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: rgb(255, 255, 255) transparent transparent transparent;
    border-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.31);
    transition: 2s;
  }

  .manfiParent {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.74);
    position: absolute;
    float: right;
    right: 41px;
    top: 70px;
  }

  /*.tooltipManfi {*/
  /*  right: 34px;*/
  /*}*/

  .manfi {
    position: absolute;
    right: 8px;
    top: 8px;
  }


  .notFav {
    position: relative;
    top: 90px;
    right: 25px;
    color: #000;
    font-size: 25px;
    text-align: right;
  }

  .parentFavorits {
    position: absolute;
    width: 1284px;
    top: 394px;
    left: 120px;
    overflow: hidden;
    height: 443px;
  }


  .noIntrest {
    text-align: right;
    position: absolute;
    width: 1000px;
    text-align: right;
    white-space: nowrap;
    font-size: 22px;
    color: #000;
    height: 770px;
    top: 0.91px;
    left: 197px;
    overflow: hidden;
    text-indent: 50px;
  }

  .noIntrest img {
    position: absolute;
    left: 306px;
    top: -48px;
  }

  .noIntrest div {
    position: absolute;
    top: 295px;
    left: 374px;
  }


  .childFavorite {
    position: absolute;
    /*top: -7px;*/
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .line {
    position: absolute;
    width: 1347px;
    height: 0px;
    left: 103px;
    top: 354px;
    border: 1px solid #D6D3D3;
    transform: rotate(-180deg);
  }

  .parentIntrest {

    position: absolute;
    width: 1284px;
    top: 0px;
    left: 120px;
    /* border: 1px solid red; */
    height: 396px;
    overflow: hidden;
  }

  .parentIntrestOtherUser {
    position: absolute;
    width: 1284px;
    top: 0px;
    left: 0px;
    /* border: 1px solid red; */
    height: 800px;
    overflow: hidden;
  }

  .childIntrest {
    position: absolute;
    /*top: -7px;*/
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .box {
    position: relative;
    float: right;
    width: 567px;
    height: 126.67px;
    margin-top: 14px;
    margin-left: 30px;
    top: 11px;
    border: 1px solid #DCDCDC;
    box-sizing: border-box;
    border-radius: 10px;
    background: #FFFFFF;
    box-shadow: 0px 4px 22px rgba(0, 0, 0, 0.1);
  }

  .icon {
    position: absolute;
    top: 5px;
    right: 5px;
    max-width: 115px;
  }

  .name {
    position: absolute;
    top: 19px;
    right: 128px;
    width: 336px;
    height: 88px;
    line-height: 85px;
    font-size: 24px;
    text-align: right;
    color: #606060;
    /*border: 1px solid red;*/
  }

  .vLine {
    position: absolute;
    width: 68px;
    height: 0px;
    left: 67px;
    top: 61px;
    border: 1px solid #E2E2E2;
    transform: rotate(90deg);
  }

  .menha {
    position: absolute;
    left: 7px;

  }

  .menhaBox {
    position: absolute;
    left: 39px;
    top: 34px;

    width: 42px;
    height: 49px;
    border-radius: 10px;

  }

  .hover {
    background: linear-gradient(0deg, rgba(141, 142, 150, 0.5) 1.4%, rgba(207, 207, 207, 0) 100%), #FFFFFF;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
    transition: 0.5s;
    /*transform: scale(1.1);*/
  }

  .hover .menhaBox {
    background-color: #1955a6;
  }

  .showTxt {
    width: 90%;
    position: absolute;
    top: 300px;
    right: 25px;
    color: #000;
    font-size: 25px;
    text-align: center;
    direction: rtl;
  }

</style>
