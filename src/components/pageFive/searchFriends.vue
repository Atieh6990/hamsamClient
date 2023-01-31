<template>
    <div v-if="show == 2">
        <div class="searchParent">
            <div class="searchItems">
                <div class="search">
                    <div class="searchInput"
                         :class="[(ypos == 2 && active == page && xsearch == 1 && activeRoute == 1 && activeX == pageX) ? 'hoverSearch':'']">
                        <img :src="URL + 'friends/search.png'" class="icon">
                        <input v-model="search" id="search" placeholder="جستجو کنید" class="searchTxt">
                    </div>

                    <div class="go"
                         :class="[(ypos == 2 && xsearch == 2 && active == page && activeX == pageX) ? 'hoverGo':'']">برو
                    </div>
                </div>
                <!--<div class="search"-->
                <!--:class="[(ypos == 3 && activeRoute == 1 && active == page && activeX == pageX) ? 'hoverSearch':'']">-->
                <!--<img src="../../assets/images/five/location.png" class="icon">-->
                <!--<div v-if="stateName == ''" class="searchTxt" style="width: 260px">نام استان را وارد کنید</div>-->
                <!--<div v-else class="searchTxt" style="width: 260px">{{stateName}}</div>-->
                <!--</div>-->
                <!--<div class="search"-->
                <!--:class="[(ypos == 4 && activeRoute == 1 && activeX == pageX) ? 'hoverSearch':'']">-->
                <!--<img src="../../assets/images/five/location.png" class="icon">-->
                <!--<div v-if="cityName == ''" class="searchTxt" style="width: 260px">نام شهر را وارد کنید</div>-->
                <!--<div v-else class="searchTxt" style="width: 260px">{{cityName}}</div>-->

                <!--</div>-->
            </div>
            <div class="sortParent">
                <div class="sortList">
                    <div :id="'sort_'+i" v-for="(filter, i) in sort" class="sortItems">
                        <div class="sortIcon"
                             :class="[(ypos == 3 && activeRoute == 1 && active == page && activeX == pageX) && (ysort == i ? 'hoverSort':'') , ((filter.type != 'medal') && (newType[filter.type] == i)  ? 'selectSort':'') , ((filter.type == 'medal') && (selectItem[filter.ID]-1 == i)  ? 'selectSort':'')]">
                        </div>

                        <div class="sortTxt">{{filter.label}}</div>
                        <div v-if="(i == 0 || filter.type != sort[i-1].type)"
                             class="lineVertical" :class="[i == 0 ? 'hidden':'']"></div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
    import IScroll from "../../js/iscroll";
    import func from "../../mixins/func";
    import {ROAST_CONFIG} from '../../config';

    export default {
        name: "search-friends",
        props: ['show', 'active', 'page', 'activeX', 'pageX', 'activeRoute'],
        data() {
            return {
                URL: ROAST_CONFIG.url_Img_comp,
                xpos: 1,
                ypos: 2,
                ysort: 0,
                xsearch: 1,
                dataSearch: '{\n' +
                '  "0": {\n' +
                '    "0": {\n' +
                '      "type": "gender",\n' +
                '      "label": "کاربران مرد",\n' +
                '      "ID": "1",\n' +
                '      "picture": "female.png"\n' +
                '    },\n' +
                '    "1": {\n' +
                '      "type": "gender",\n' +
                '      "label": "کاربران زن",\n' +
                '      "ID": "2",\n' +
                '      "picture": "male.png"\n' +
                '    }\n' +
                '  },\n' +
                '  "1": {\n' +
                '    "0": {\n' +
                '      "type": "picture",\n' +
                '      "label": "با عکس",\n' +
                '      "ID": "1",\n' +
                '      "picture": "withpic.png"\n' +
                '    }\n' +
                '  },\n' +
                '  "2": {\n' +
                '    "0": {\n' +
                '      "type": "age",\n' +
                '      "label": "زیر 20",\n' +
                '      "ID": "0",\n' +
                '      "picture": "age.png"\n' +
                '    },\n' +
                '    "1": {\n' +
                '      "type": "age",\n' +
                '      "label": "20-30",\n' +
                '      "ID": "1",\n' +
                '      "picture": "age.png"\n' +
                '    },\n' +
                '    "2": {\n' +
                '      "type": "age",\n' +
                '      "label": "30-40",\n' +
                '      "ID": "2",\n' +
                '      "picture": "age.png"\n' +
                '    },\n' +
                '    "3": {\n' +
                '      "type": "age",\n' +
                '      "label": "40-50",\n' +
                '      "ID": "3",\n' +
                '      "picture": "age.png"\n' +
                '    },\n' +
                '    "4": {\n' +
                '      "type": "age",\n' +
                '      "label": "50 به بالا",\n' +
                '      "ID": "4",\n' +
                '      "picture": "age.png"\n' +
                '    }\n' +
                '  }\n' +
                '}',
                objFilter: [],
                search: '',
                sort: [],
                newType: [],
                selectItem: [],
                ymedals: 0,
                medals: [],
                gender: '',
                pic: '',
                age: '',
                includeEl: '',
                keyboard: false,


            }
        }, created() {

            this.$root.$on('hide_keyboard', () => {
                this.keyboard = false;
                this.hideIme("search");

            });

            this.objFilter = JSON.parse(this.dataSearch);

            for (let x in this.objFilter) {

                for (let y in this.objFilter[x]) {

                    this.sort.push(this.objFilter[x][y]);
                    this.selectItem.push(-1);

                    if (this.objFilter[x][y]['type'] != 'medal') {

                        this.newType[this.objFilter[x][y]['type']] = -1;
                    }
                }
            }
            // console.log(' this.selectItem --->' + this.selectItem)

        },
        mixins: [func],
        methods: {
            scrollInit() {
                this.myScroll = new IScroll(".sortParent", {
                    scrollY: true,
                    scrollbars: "custom",
                    momentum: true,
                    preventDefault: false,
                    scrollbars: false,
                    mouseWheel: true,
                    interactiveScrollbars: true,
                    shrinkScrollbars: "none",
                    fadeScrollbars: false,
                    mouseMove: true
                });
            },
            up() {

                if ((this.ypos == 2) && (this.ypos > 2)) {
                    this.ypos--;
                    return true;
                } else if (this.ypos == 3) {
                    if (this.ysort > 0) {
                        this.ysort--;
                        this.myScroll.scrollToElement('#sort_' + this.ysort, 590, false, true);
                        this.myScroll.refresh();

                        return true;
                    } else if (this.ysort == 0) {
                        this.ypos--;
                        return true;
                    }
                }
                return false;
            },
            down() {


                if (this.ypos == 2) {
                    this.keyboard = false;
                    this.hideIme("search");

                    this.ypos++;

                    return true;
                } else if (this.ypos == 3) {

                    if (this.ysort < (this.sort.length) - 1) {
                        this.ysort++;
                        this.myScroll.scrollToElement('#sort_' + this.ysort, 590, false, -180);
                        this.myScroll.refresh();

                        return true;
                    }


                }
                return false;

            },
            left() {

                if (this.ypos == 2) {
                    if (this.xsearch == 1) {
                        this.xsearch = 2;
                        this.keyboard = false;
                        this.hideIme("search");
                        return true;
                    }
                }
                return false;
            }
            , right() {
                if (this.ypos == 2) {
                    if (this.xsearch == 2) {
                        this.xsearch = 1;
                        return true;
                    }
                }


                return false;
            }, enter() {
                // alert(this.newType)

                if (this.ypos == 2) {
                    if (this.xsearch == 1) {
                        this.keyboard = true;
                        this.showIme("search");
                        return true;
                    } else {

                    }
                }
                else if (this.ypos == 3) {

                    //console.log('sort ------>' + JSON.stringify(this.sort));
                    if (this.sort[this.ysort]['type'] != 'medal') {

                        if (this.newType[this.sort[this.ysort]['type']] == this.ysort) {
                            this.$delete(this.newType, this.sort[this.ysort]['type']);
                            this.$set(this.newType, this.sort[this.ysort]['type'], -1);
                        } else {
                            this.$delete(this.newType, this.sort[this.ysort]['type']);
                            this.$set(this.newType, this.sort[this.ysort]['type'], this.ysort);
                        }

                    }

                    if (this.ysort == 0 || this.ysort == 1) {
                        //   alert('1')
                        (this.gender == this.sort[this.ysort]['ID'] ? this.gender = '' : this.gender = this.sort[this.ysort]['ID']);

                    }
                    else if (this.ysort == 2) {
                        //   alert('2')
                        (this.pic == this.sort[this.ysort]['ID'] ? this.pic = '' : this.pic = this.sort[this.ysort]['ID']);

                    }
                    else if (this.ysort > 2) {
                        //    alert('3')
                        (this.age == this.sort[this.ysort]['ID'] ? this.age = '' : this.age = this.sort[this.ysort]['ID']);

                    }


                }

                //  alert(this.gender + ' ' + this.pic + ' ' + this.age)
                return {
                    'ypos': this.ypos,
                    'string': this.search,
                    'gender': this.gender,
                    'pic': this.pic,
                    'age': this.age,
                    // 'medals': this.medals

                };
            },
            resetFilter() {
                this.ypos = 2;
                this.search = '';
                this.gender = '';
                this.pic = '';
                this.age = '';
                // this.medals = [];
                this.newType = [];
                this.selectItem = [];


            },
            done() {
                this.keyboard = false;
                this.hideIme("search");
            },
            cancel() {
                this.keyboard = false;
                this.hideIme("search");
            },
            back() {
                switch (this.ypos) {
                    case 2:
                        if (this.keyboard == true) {
                            this.keyboard = false;
                            this.hideIme("search");
                            //console.log('return  this.keyboard    ->' + this.keyboard)
                        } else {

                        }

                        break;
                }
                // this.$router.go(-1);
            }

        }
    }
</script>

<style scoped>
    .searchParent {
        width: 320px;
        height: 820px;
        position: absolute;
        right: 100px;
        top: 165px;
        border-bottom-width: 1px;
        border-bottom-color: rgb(215, 215, 215);
        border-bottom-style: solid;
        background-color: rgb(250, 249, 254);
        box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.45);
        border-radius: 5px;

    }

    .searchItems {
        width: 300px;
        height: 60px;
        position: absolute;
        top: 15px;
        left: 12px;
        /*border: 1px solid green;*/
    }

    .search {
        width: 300px;
        height: 60px;
        position: relative;
        float: right;
        border: 1px solid #b7b7b7;
        border-radius: 5px;
    }

    .sortParent {
        width: 300px;
        height: 570px;
        position: absolute;
        left: 7px;
        top: 86px;
        overflow: hidden;
    }

    .sortList {
        width: 300px;
        position: absolute;
        left: 0px;
        top: 0px;

    }

    .sortItems {
        width: 250px;
        height: 55px;
        position: relative;
        float: right;
        top: 5px;
        right: 20px;
        line-height: 55px;

    }

    .topItems {
        margin-right: 0px;
    }

    .searchTxt {
        width: 195px;
        height: 50px;
        color: #4d4d4f;
        line-height: 50px;
        float: right;
        direction: rtl;
        font-size: 20px;
        position: relative;
        top: 4px;
        right: 35px;
        text-align: right;
        border: 1px solid transparent;

    }

    .go {
        background-color: #b7b7b7;
        width: 65px;
        height: 60px;
        line-height: 60px;
        color: #fff;
        font-size: 20px;
        text-align: center;
        float: left;
        position: relative;

    }

    /*.dropDown {*/
    /*background-color: #fff;*/
    /*width: 300px;*/
    /*height: 150px;*/
    /*position: absolute;*/
    /*top: 61px;*/
    /*z-index: 1;*/
    /*overflow: hidden;*/
    /*border: 1px solid red;*/
    /*display: none;*/
    /*}*/

    .cities {
        width: 260px;
        height: 50px;
        position: relative;
        float: right;
        right: 35px;
        font-size: 20px;
        line-height: 50px;
        color: #4d4d4f;
        text-align: right;
        /*border: 1px solid green;*/
    }

    .icon {
        position: absolute;
        right: 3px;
        top: 15px;
    }

    textarea:focus, input:focus {
        outline: none;
    }

    .sortIcon {
        width: 30px;
        height: 30px;
        position: absolute;
        background-color: #e1e1e1;
        float: right;
        top: 12px;
        right: 0px;
        border: 1px solid #bfbfbf;
        border-radius: 7px;
    }

    .hoverSort {
        /*border: 2px solid #b9b9b9;*/
        /*border: 1px solid red;*/
        border: 1px solid #1955a6;
        box-shadow: 0px 0px 25px #1955a6 !important;
        /*-webkit-transition: all 1s !important;*/
    }

    .lineVertical {
        width: 300px;
        border: 1px solid rgb(183, 183, 183);
        position: relative;
        left: 30px;

    }

    .top1 {
        margin-top: 117px;
    }

    .top2 {
        margin-top: 50px;
    }

    .top3 {
        margin-top: 275px;
    }

    .sortTxt {
        width: 235px;
        font-size: 20px;
        text-align: right;
        /* text-indent: 40px; */
        float: right;
        direction: rtl;
        position: relative;
        right: 45px;

    }

    .selectSort {
        background-color: #1955a6;
    }

    .searchInput {
        width: 233px;
        height: 60px;
        float: right;
    }

    .hoverSearch {
        border: 1px solid #1955a6;
        box-shadow: 0px 0px 25px #1955a6 !important;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    .hoverGo {
        background-color: #1955a6;
        color: #fff;
        border-bottom-left-radius: 5px;
        border-top-left-radius: 5px;
    }
    .hidden{
        display: none;
    }

</style>