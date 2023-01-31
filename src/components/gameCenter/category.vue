<template>
    <div>
        <div class="title"><span style="color: #fbca03 !important">دسته بندی</span> را انتخاب کنید</div>
        <div class="catParent">
            <div class="catChild">
                <div v-for="(item , index) in catData.result" class="catElm" :id="'cat_' + (index)">
                    <img class="backCat" :src="imgURL + 'pages/FiftyOne/but-1.png'"/>
                    <img class="logoCat" :src="imgURL + 'pages/FiftyOne/2/'+(index + 1)+'.png'"/>
                    <div :class="[((item.title.length > 15) ? 'LH1':'LH2') , 'titleCat']">{{ item.title }}</div>
                    <img class="backHover" :src="imgURL + 'pages/FiftyOne/but-2.png'" v-if="(ypos == index)"/>
                    <img class="tik" :src="imgURL + 'pages/FiftyOne/TIK.png'" v-if="(ypos == index)"/>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {ROAST_CONFIG} from '../../config';
    import IScroll from "../../js/iscroll";

    export default {
        name: "category",
        props: ['catData'],
        data() {
            return {
                imgURL: ROAST_CONFIG.URL_GAMECENTER,
                ypos: 0
            }
        },
        created() {
            let _self = this
            setTimeout(() => {
                _self.scrollInit();
            }, 500);
        },
        methods: {
                scrollInit() {
                this.myScroll = new IScroll(".catParent", {
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
            down() {
                if (this.ypos < this.catData.result.length - 1) {
                    this.ypos++;
                    this.myScroll.scrollToElement('#cat_' + this.ypos, 1000, false, -180);
                    return true
                }
                return false
            },
            up() {
                if (this.ypos > 0) {
                    this.ypos--;
                    this.myScroll.scrollToElement('#cat_' + this.ypos, 1000, false, -180);
                    return true
                }
                return false
            },
            enter() {
                // alert('sf,sl;'+this.ypos)
                return this.ypos;
            }
        }
    }
</script>

<style scoped>
    .title {
        position: absolute;
        width: 500px;
        height: 50px;
        top: 185px;
        left: 690px;
        font-size: 30px;
        direction: rtl;
        text-align: center;
        white-space: nowrap;
        color: #000;
        /*text-shadow: -4px 1px 5px #1d2029 !important;*/
    }

    .catParent {
        position: absolute;
        top: 235px;
        left: 660px;
        width: 550px;
        height: 700px;
        overflow: hidden;
    }

    .catChild {

        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
    }

    .catElm {
        position: relative;
        float: left;
        margin-top: 10px;
        width: 450px;
        height: 130px;
        margin-left: 50px;
    }

    .backCat {
        position: absolute;
        top: 0px;
        left: 0px;
    }

    .logoCat {
        position: absolute;
        top: 15px;
        left: 20px;
        z-index: 10;
    }

    .titleCat {
        position: absolute;
        top: 13px;
        left: 145px;
        width: 200px;
        height: 93px;
        /* white-space: nowrap; */
        font-size: 30px;
        color: #fefeff;
        direction: rtl;
        text-align: right;
        z-index: 10
    }

    .LH1 {
        line-height: 60px;
    }

    .LH2 {
        line-height: 93px;
    }

    .backHover {
        position: absolute;
        top: 0px;
        left: 0px;
    }

    .tik {
        position: absolute;
        top: 40px;
        right: 40px;
        z-index: 10;
    }
</style>