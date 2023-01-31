<template>

    <div>
        <div v-bind:class=" [activeRoute==1 && xActive==xPage && yActive== yPage ? 'active' : '','middle-second']">
            <!---->
            <transition v-if="titls[0]" name="fade" v-for="(title, index) in  titls">
                <div v-if="index == item"   :key="index">
                    <div class="world-cup-2"><img style="width: 190px;height: 120px;" :src="imgURL + 'akharin-khabar.png'">
                    </div> <!---->
                    <div class="brief-second-2">
                        {{titls.eq(index).find("title").text()}}
                    </div>
                    <div style="position: absolute;top: 29px; left: 28px;">
                        <img src="../../assets/images/one/lastNews/last-news-icn.png" style="width: 55px"></div>
                </div>
                <!--  <div class="second-date"><strong>دیروز</strong></div>-->
            </transition>

        </div>
    </div>
</template>
<script>
    import api from '../../api/news';
    import {ROAST_CONFIG} from '../../config';

    export default {
        components: {},
        mounted: function () {

        },
      created() {
            api.newNews().then(data => {
                var xmlDoc = $.parseXML(data)
                var $xml = $(xmlDoc)
                this.titls = $xml.find("News");
                for (var i = 0; i < this.titls.length; i++) {
                    this.ids = this.titls.eq(i).find("id").text()


                }

                this.changeContent()

            });

        }, props: ['xActive', 'yActive', 'yPage', 'xPage', 'activeRoute'], data() {
            return {titls: '', id: '', ids: [], item: 0,interval:"", imgURL: ROAST_CONFIG.url_comp_server,};

        }, methods: {
            changeContent: function () {

               var this_=this
                clearInterval( this.interval);
              this.interval=  setInterval(function () {
                    if (this_.item != this_.titls.length - 1) {
                        this_.item++
                    } else {
                        this_.item = 0
                    }

                }, 7000);
            },
            down() {

                return false

            },
            up() {

                return false

            },
            right() {
                return false


            }, left() {
                return false

            }, enter() {
                return false


            }
        }, watch: {}, activated(){

            if(this.titls!=""){
             this.changeContent()
            }

        },deactivated(){
            clearInterval( this.interval);
        }
    };

</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 1.5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
    .middle-second {
        overflow: hidden;
        position: absolute;
        right: 672px;
        top: 462px;
        width: 558px;
        height: 120px;
        background-color: #FFF;
        border-radius: 22px;
        z-index: 2;
    }

    .world-cup-2 {
        position: absolute;
        overflow: hidden;
        width: 190px;
        height: 120px;
        border-radius: 22px;
        right: -7px;
    }

    .brief-second-2 {
        position: absolute;
        left: 90px;
        top: 18px;
        font-size: 18px;
        line-height: 21px;
        color: #333333;
        width: 291px;
        height: 62px;
        overflow-wrap: break-word;
        text-align: right;
    }

    .second-date {
        position: absolute;
        display: block;
        color: #EB5757;
        margin-right: 410px;
        margin-top: 75px;
    }

    @keyframes active {

        0% {

            -webkit-transform: scale(1);
            transform:  scale(1);

        }
        50% {

            -webkit-transform:  scale(1.1);
            transform:   scale(1.1);
        }
        100% {

            -webkit-transform: scale(1.1) ;
            transform:  scale(1.1);

        }
    }

    .active {

        /*display: inline-block;*/
        vertical-align: middle;
        /*-webkit-transform: perspective(1px) translateZ(0);*/
        /*transform: perspective(1px) translateZ(0);*/
        -webkit-animation-name: hvr-bob-float, active;
        animation-name: hvr-bob-float, active;
        -webkit-animation-duration: .3s, 1.5s;
        animation-duration: .3s, 1.5s;
        /*-webkit-animation-delay: 0s, .3s;*/
        /*animation-delay: 0s, .3s;*/
        -webkit-animation-timing-function: ease-out, ease-in-out;
        animation-timing-function: ease-out, ease-in-out;
        -webkit-animation-iteration-count: 1, infinite;
        /*animation-iteration-count: 1, infinite;*/
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
        -webkit-animation-direction: normal, alternate;
        animation-direction: normal, alternate;
        border: 2px solid #555 !important;

        /*  box-shadow: 0 0 1px rgba(0, 0, 0, 0);*/
    }

    .d-none {
        display: none;
    }

    .d-block {
        display: block;
    }
</style>
