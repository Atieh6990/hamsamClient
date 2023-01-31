<template>
    <div>
        <div class="listNews">
            <div class="scrollList">
                <div :id="'news_'+(i+1)" class="news" v-for="(News , i) in news"
                     v-if="(news.length > 0) && (i + perpage > newsItem)"
                     :class="[newsItem == (i + 1) && (xpos == 1) && (activeRoute==1) ? 'hoverList' : '']">
                    <div class="shortext">{{News.short_description|substr(25)}}</div>
                    <div class="longtext" v-html="News.long_description"></div>
                    <img :src="News.icon" class="images">
                </div>
            </div>

        </div>
        <div class="newsParent" :style="{'background': 'url(' + (URL + 'news/whit-back.png') + ')'}"
             :class="[(xpos == 2) && (activeRoute==1) ? 'hoverNews' : '']">
            <div class="scrollParent">
                <div id="news" class="scrollNews" v-images-loaded:on.progress="imageProgress">
                    <img class="newsImg" :src="news[newsItem - 1]['icon']">
                    <img :src="URL + 'news/BANNER.png'" class="banner">
                    <div class="title">{{news[newsItem - 1]['short_description']}}</div>
                    <div class="description" v-html="news[newsItem - 1]['long_description']"></div>
                </div>
            </div>


        </div>
    </div>

</template>

<script>
    import func from '../../mixins/func';
    import IScroll from "../../js/iscroll";
    import imagesLoaded from 'vue-images-loaded';
    import {ROAST_CONFIG} from '../../config';
    import api from "../../api/news";
    import {page} from 'vue-analytics'

    export default {

        name: "news-list",
        props: ['news', 'activeRoute', 'next'],
        mixins: [func],
        directives: {
            imagesLoaded
        },
        data() {
            return {
                URL: ROAST_CONFIG.url_Img_comp,
                newsItem: this.$route.query.item,
                ypos: 1,
                xpos: 1,
                ynews: 0,
                myScroll: "",
                perpage: 7
            }
        },
        created() {

            this.scrollInit();
            // this.myScroll.refresh();

        },

        watch: {

            news: function () {
                var self = this;
                setTimeout(function () {

                    if (self.myScroll) {
                        self.myScroll.refresh();
                        self.myScroll.scrollToElement('#news_' + this.newsItem, 1000, false, true, '');
                    }


                }, 100);
            },

        },

        methods: {
            imageProgress(instance, image) {
                const result = image.isLoaded ? 'loaded' : 'broken';
             //   console.log('image is ' + result + ' for ' + image.img.src);
                this.scrollInit();
                this.myScroll.refresh();

            },

            up() {
                page({
                    page: 'view detail of the news',
                    title: 'view detail of the news'
                })
                if (this.xpos == 1) {
                    if (this.newsItem > 1) {
                        this.newsItem--;
                         this.myScroll.scrollToElement('#news_' + this.newsItem, 590, false, true,'');
                        // this.myScroll.refresh();
                        setTimeout(() => {
                            this.myScroll.refresh();
                        }, 500);
                        return true;
                    }
                } else {
                    this.myScroll.moveUp(80);
                }

            },
            down() {
                page({
                    page: 'view detail of the news',
                    title: 'view detail of the news'
                })
                if (this.xpos == 1) {

                    if (this.newsItem <= this.news.length) {
                        this.newsItem++
                        this.myScroll.scrollToElement('#news_' + this.newsItem, 590, false, true, '');

                        if (this.newsItem == this.news.length - 1) {
                            this.$root.$emit('moreNews');
                        }
                    }
                    return true;
                } else {

                    this.myScroll.moveDown(80);
                    return true;

                }
                return false
            },
            right() {
                if (this.xpos == 2) {
                    setTimeout(() => {
                        this.myScroll.refresh();
                        this.myScroll.scrollTo(0, 0, 0);
                    }, 1);

                    this.xpos = 1;
                    return true;
                }
                return false;
            },
            left() {
                // setTimeout(() => {
                //     this.myScroll.refresh();
                // }, 500);
                // if(this.xpos == 1){
                //     this.xpos = 2;
                // }else if(this.xpos == 2){
                //     this.$root.$emit('leftside_active');
                // }
                if (this.xpos == 1) {
                    this.xpos = 2;
                    return true;
                }
                return false;
            },
            enter() {

            },
            scrollInit() {

                if (this.myScroll == '' && this.news.length > 0) {


                    setTimeout(() => {
                        this.myScroll = new IScroll(".scrollParent", {
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
                    }, 10);
                }


            },
        }
    }
</script>

<style scoped>
    .listNews {
        width: 465px;
        height: 930px;
        position: absolute;
        right: 145px;
        top: 95px;
        overflow: hidden;
    }

    .scrollList {
        width: 465px;
        position: absolute;
        left: 0px;
        top: 0px;
    }

    .news {
        background-color: #fff;
        width: 460px;
        height: 110px;
        position: relative;
        float: right;
        margin-top: 20px;
        border-radius: 5px;

    }

    .shortext {
        width: 290px;
        height: 50px;
        position: absolute;
        top: 15px;
        right: 15px;
        color: #0455a5;
        text-align: right;
        line-height: 25px;
        font-size: 20px;
        direction: rtl;
    }

    .longtext {
        width: 290px;
        height: 70px;
        position: absolute;
        top: 30px;
        right: 15px;
        color: #636466;
        text-align: right;
        line-height: 25px;
        font-size: 18px;
        overflow: hidden;
        direction: rtl;

    }

    .images {
        width: 140px;
        height: 90px;
        position: absolute;
        left: 10px;
        top: 10px;

    }

    .hoverList {
        border: 1px solid #0455a5;
    }

    .newsParent {
        /*background-color: #fff;*/
        width: 1169px;
        height: 938px;
        position: relative;
        left: 135px;
        top: 85px;
        float: left;
        border-radius: 5px;
        overflow: hidden;

    }

    .header {
        position: relative;
        z-index: 1;

    }

    .scrollParent {
        width: 1138px;
        height: 805px;
        position: relative;
        top: 100px;
        float: left;
        border-radius: 5px;
        overflow: hidden;

    }

    #news {
        position: absolute;
        left: 15px;

    }

    /*.newsImg {*/
    /*    width: 1020px;*/
    /*    height: 418px;*/

    /*}*/

    .banner {
        position: relative;
        float: left;
        left: 48px;
    }

    .title {
      width: 965px;
      height: 45px;
      line-height: 47px;
      position: absolute;
      /* top: 430px; */
      left: 60px;
      color: #fff;
      text-align: right;
      direction: rtl;
      text-indent: 10px;
      font-size: 20px;

    }

    .description {
        width: 1020px;
        position: relative;
        top: 40px;
        right: 50px;
        direction: rtl;
        color: #636466;
        font-size: 20px;
        text-align: justify;
    }

    .hoverNews {
        border: 1px solid #0455a5;
    }

    .iScrollVerticalScrollbar iScrollLoneScrollbar {
        background-color: #e6e5e5 !important;
    }


</style>
