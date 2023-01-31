<template>
    <div style="position: absolute;top: 247px;width: 1295px;left: 275px; height: 755px">

        <div class="medalLargBox">


            <div class="medalChild">
                <div v-if="badgeData.length != 0">
                    <div v-for="(item , i) in badgeData" class="medalLarg"
                         :id="'badgeL_' + i"
                    >
                        <div style="position: absolute;width: 100%;top: 0px;left: 0px;height: 225px" class="inner"
                             :class="[(number == i) && (active == page) && (activeRoute==1) ? 'hover' :'']">
                            <img :src="item.pic" class="medalPic">
                            <!--<img :src="imgURL2 + 'profile/achievements/leaf (3).png'" class="medalPic">-->
                            <!--<img :src="imgURL2 + 'profile/achievements/test_'+i+'.png'" class="medalPic">-->

                            <div class="medalTitle">{{ item.title }}</div>
                            <!--<div class="medalCnt">0</div>-->
                        </div>


                    </div>
                </div>

                <div v-if="badgeData.length == 0" class="nomedal">
                    <img :src="imgURL2 + 'noResult.png'"/>
                    <div>{{ 'لیست دستاورد ها خالی است.' }}</div>
                </div>

            </div>

        </div>

    </div>

</template>

<script>
    import {ROAST_CONFIG} from '../../config';
    import IScroll from "../../js/iscroll"


    export default {

        name: "user-medals",
        props: ['badgeData', 'active', 'page', 'activeRoute'],
        data() {
            return {
                imgURL2: ROAST_CONFIG.url_comp_server,
                number: 0,
                columnCount: 6,
                myScroll: '',
            }
        },
        created() {

            let _self = this
            setTimeout(() => {
                _self.scrollInit();
            }, 600);
        },
        methods: {
            scrollInit() {
                this.myScroll = new IScroll(".medalLargBox", {
                    scrollY: true,
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


            left() {
                if ((this.number % this.columnCount != parseInt(this.columnCount) - 1) && (this.number + 1 < this.badgeData.length)) {
                    this.number++;
                    return true
                }
                return false
            },
            right() {
                if ((this.number % this.columnCount != 0)) {
                    this.number--;
                    return true
                }
                return false
            },
            down() {
                if (((this.number + parseInt(this.columnCount)) < (this.badgeData.length))) {

                    this.number += parseInt(this.columnCount);
                    //console.log('#badgeL_' + this.number)
                    this.myScroll.scrollToElement('#badgeL_' + this.number, 1000, false, true, '');

                    if (this.number + this.columnCount > this.badgeData.length) {
                        this.$root.$emit('call_next_Medal_list');
                    }
                    return true
                }
                return false
            },
            up() {
                if (((this.number) >= this.columnCount)) {
                    this.number -= parseInt(this.columnCount);
                    this.myScroll.scrollToElement('#badgeL_' + this.number, 1000, false, true, '');
                    return true
                }
                return false;
            },
            back() {
                return false;

            }
        }
    }
</script>

<style scoped>

    .medalLargBox {
        position: absolute;
        overflow: hidden;
        width: 1284px;
        left: 0px;
        height: 770px;
        top: 0px;
        padding-bottom: 30px;
    }

    .medalChild {
        position: absolute;
        width: 100%;
        top: 0px;
        left: 0px;
    }

    .medalLarg {
        position: relative;
        float: right;
        width: 160px;
        height: 250px;
        margin-top: 19px;

        margin-right: 50px;
    }

    .inner {
        border-width: 0.5px;
        border-color: transparent;
        border-style: solid;
    }

    .hover {
        box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.24);
        border-bottom-width: 0.5px;
        border-bottom-color: rgb(215, 215, 215);
        border-bottom-style: solid;
        border-radius: 10px;
    }

    .nomedal {
        position: absolute;
        text-align: right;
        white-space: nowrap;
        font-size: 22px;
        color: #000;
        width: 1108px;
    }

    .nomedal img {
        position: absolute;
        left: 306px;
    }
    .nomedal div {
        position: absolute;
        top: 345px;
        left: 393px;
    }

    .medalPic {
        position: absolute;
        left: 0px;
        top: 9px;

    }

    .medalTitle {
        position: absolute;
        width: 100%;
        height: 38px;
        left: 0px;
        line-height: 40px;
        font-size: 20px;
        text-align: center;
        color: #000000;
        /* bottom: 0px; */
        top: 180px;
    }

    .medalCnt {
        background-color: #f7941d;
        width: 35px;
        height: 35px;
        line-height: 35px;
        /* float: left; */
        position: absolute;
        /* margin-top: 60px; */
        /* margin-left: -35px; */
        top: 140px;
        border-radius: 100px;
        font-size: 20px;
        color: #fff;
        left: 4px;
    }


</style>
