<template>
    <div v-if="show == 2">
        <div class="searchParent">
            <div class="searchItems">
                <div class="search">
                    <div class="searchInput"
                         :class="[(ypos == 2 && active == page && xsearch == 1 && activeRoute == 1 && activeX == pageX) ? 'hoverSearch':'']">
                        <img src="../../assets/images/five/search.png" class="icon">
                        <input v-model="search" id="search" placeholder="جستجو کنید" class="searchTxt">
                    </div>

                    <div class="go"
                         :class="[(ypos == 2 && xsearch == 2 && active == page && activeX == pageX) ? 'hoverGo':'']">برو
                    </div>
                </div>
                <div class="search"
                     :class="[(ypos == 3 && activeRoute == 1 && active == page && activeX == pageX) ? 'hoverSearch':'']">
                    <img src="../../assets/images/five/location.png" class="icon">
                    <div v-if="stateName == ''" class="searchTxt" style="width: 260px">نام استان را وارد کنید</div>
                    <div v-else class="searchTxt" style="width: 260px">{{stateName}}</div>
                </div>
                <div class="search"
                     :class="[(ypos == 4 && activeRoute == 1 && activeX == pageX) ? 'hoverSearch':'']">
                    <img src="../../assets/images/five/location.png" class="icon">
                    <div v-if="cityName == ''" class="searchTxt" style="width: 260px">نام شهر را وارد کنید</div>
                    <div v-else class="searchTxt" style="width: 260px">{{cityName}}</div>

                </div>
            </div>
            <div class="sortParent">
                <div class="sortList">
                    <div :id="'sort_'+i" v-for="(filter, i) in sort" class="sortItems">
                        <div class="sortIcon"
                             :class="[(ypos == 5 && activeRoute == 1 && active == page && activeX == pageX) && (ysort == i ? 'hoverSort':'') , ((filter.type != 'medal') && (newType[filter.type] == i)  ? 'selectSort':'') , ((filter.type == 'medal') && (selectItem[filter.ID]-1 == i)  ? 'selectSort':'')]">
                        </div>

                        <div class="sortTxt">{{filter.label}}</div>
                        <div v-if="(i == 0 || filter.type != sort[i-1].type)"
                             class="lineVertical"></div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
    import IScroll from "../../js/iscroll";
    import api from '../../api/friends'
    import func from "../../mixins/func"

    export default {
        name: "search-friends",
        props: ['show', 'active', 'page', 'activeX', 'pageX', 'activeRoute', 'stateName', 'cityName'],
        data() {
            return {
                xpos: 1,
                ypos: 2,
                ysort: 0,
                xsearch: 1,
                dataSearch: '{"0":{"0":{"type":"gender","label":"کاربران زن","ID":"1","picture":"female.png"},"1":{"type":"gender","label":"کاربران مرد","ID":"2","picture":"male.png"}},"1":{"0":{"type":"picture","label":"با عکس","ID":"3","picture":"withpic.png"}},"2":{"0":{"type":"age","label":"زیر 20","ID":"4","picture":"age.png"},"1":{"type":"age","label":"20-30","ID":"5","picture":"age.png"},"2":{"type":"age","label":"30-40","ID":"6","picture":"age.png"},"3":{"type":"age","label":"40-50","ID":"7","picture":"age.png"},"4":{"type":"age","label":"50 به بالا","ID":"8","picture":"age.png"}},"3":{"0":{"type":"medal","label":"بیشترین امتیاز روز","ID":"9","picture":"medal.png"},"1":{"type":"medal","label":"بیشترین امتیاز دوره","ID":"10","picture":"medal.png"},"2":{"type":"medal","label":"بیشترین کامنت دوره","ID":"11","picture":"medal.png"},"3":{"type":"medal","label":"بیشترین شانس دوره","ID":"12","picture":"medal.png"},"4":{"type":"medal","label":"بدترین شانس دوره","ID":"13","picture":"medal.png"},"5":{"type":"medal","label":"بیشترین شانس روز","ID":"14","picture":"medal.png"},"6":{"type":"medal","label":"بیشترین امتیاز بازی در روز","ID":"15","picture":"medal.png"},"7":{"type":"medal","label":"بیشترین پست روز","ID":"16","picture":"medal.png"},"8":{"type":"medal","label":"پست با بیشترین لایک در روز","ID":"17","picture":"medal.png"},"9":{"type":"medal","label":"بیشترین پیام دریافت شده","ID":"18","picture":"medal.png"},"10":{"type":"medal","label":"بیشترین دوست یابی در روز","ID":"19","picture":"medal.png"},"11":{"type":"medal","label":"بیشترین ماندگاری در روز","ID":"20","picture":"medal.png"},"12":{"type":"medal","label":"بیشترین کلیک روز","ID":"21","picture":"medal.png"}}}',
                objFilter: [],
                search: '',
                sort: [],
                newType: [],
                selectItem: [],
                ymedals: 0,
                medals: [],
                gender: 0,
                pic: 0,
                age: 0,
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

                if ((this.ypos == 2 || this.ypos == 3 || this.ypos == 4) && (this.ypos > 2)) {
                    this.ypos--;
                    return true;
                } else if (this.ypos == 5) {
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


                if (this.ypos == 2 || this.ypos == 3 || this.ypos == 4) {
                    if(this.ypos == 2){
                        this.keyboard = false;
                        this.hideIme("search");
                    }
                    this.ypos++;

                    return true;
                } else if (this.ypos == 5) {

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

                if (this.ypos == 2) {
                    if (this.xsearch == 1) {
                        this.keyboard = true;
                        this.showIme("search");
                        return true;
                    } else {

                    }
                }
                else if (this.ypos == 5) {


                    if (this.sort[this.ysort]['type'] != 'medal') {

                        if (this.newType[this.sort[this.ysort]['type']] == this.ysort) {
                            this.$delete(this.newType, this.sort[this.ysort]['type']);
                            this.$set(this.newType, this.sort[this.ysort]['type'], -1);
                        } else {
                            this.$delete(this.newType, this.sort[this.ysort]['type']);
                            this.$set(this.newType, this.sort[this.ysort]['type'], this.ysort);
                        }

                    } else {

                        if ((this.selectItem[this.ysort + 1]) == this.ysort + 1) {

                            this.$set(this.selectItem, this.selectItem[this.ysort + 1], -1);
                        } else {

                            this.$set(this.selectItem, this.sort[this.ysort]['ID'], this.ysort + 1);
                        }


                    }

                    if (this.sort[this.ysort]['ID'] == 1 || this.sort[this.ysort]['ID'] == 2) {

                        (this.gender == this.sort[this.ysort]['ID'] ? this.gender = 0 : this.gender = this.sort[this.ysort]['ID']);

                    }
                    else if (this.sort[this.ysort]['ID'] == 3) {

                        (this.pic == this.sort[this.ysort]['ID'] ? this.pic = 0 : this.pic = this.sort[this.ysort]['ID']);

                    }
                    else if (this.sort[this.ysort]['ID'] > 3 && this.sort[this.ysort]['ID'] < 9) {

                        (this.age == this.sort[this.ysort]['ID'] ? this.age = 0 : this.age = this.sort[this.ysort]['ID']);

                    }
                    else if (this.sort[this.ysort]['ID'] >= 9) {

                        this.includeEl = this.medals.indexOf(this.sort[this.ysort]['ID']);

                        if (this.includeEl == -1) {
                            this.medals.push(this.sort[this.ysort]['ID']);
                        } else {

                            this.medals.splice(this.includeEl, 1);
                        }


                    }


                }


                return {
                    'ypos': this.ypos,
                    // 'xpos': this.xsearch,
                    'term': this.search,
                    'gender': this.gender,
                    'pic': this.pic,
                    'age': this.age,
                    'medals': this.medals

                };
            },
            resetFilter() {
                this.ypos = 2;
                this.search = '';
                this.gender = 0;
                this.pic = 0;
                this.age = 0;
                this.medals = [];
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
        background-color: #fff;
        width: 315px;
        height: 810px;
        position: absolute;
        right: 105px;
        bottom: 115px;
        /*border: 1px solid red;*/
    }

    .searchItems {
        width: 300px;
        height: 165px;
        position: absolute;
        left: 8px;
        /*border: 1px solid green;*/
    }

    .search {
        width: 300px;
        height: 60px;
        position: relative;
        float: right;
        margin-top: 10px;
        border: 1px solid #b7b7b7;
        border-radius: 5px;
    }

    .sortParent {
        width: 300px;
        height: 570px;
        position: absolute;
        left: 7px;
        top: 230px;
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
        border: 1px solid #bfbfbf;
        position: relative;
        left: 20px;

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

</style>