<template>

    <div v-if="datas[0]">
        <div v-bind:class=" [activeRoute==1 && xActive==xPage && yActive== yPage ? 'active' : '','middle-first']">

            <transition v-if="datas[0]" name="fade" v-for="(data, index) in  datas">
                <div  v-if="index == item"   :key="index">
            <div class="middle-profile-pic-1 ">
                <img v-if="data['user']['pic']" :onLoad="loadImage(data['user']['pic'])" :style="'z-index:'+avatarZindex+';width: 54px;position: absolute;right:0px'"  :src='data["user"]["pic"]'>
                <img  src="../../assets/images/header/userdefaul.png"  style="width: 54px;z-index: 1;position: absolute;right:0px">
            </div>

            <div class="first-name-1 ">
                {{data['user']['username']}}

            </div>
            <div v-if="data['wall']!=null" v-html="data['wall']['text']" class="brief-first-1">


            </div>
            <img src="../../assets/images/one/wall/post-it.png"
                 style="top: 26px;left: 37px; height: 50px;position: absolute">
            <div class="first-date">
                <strong>   {{data["date"]}}</strong></div>

                </div>
                </transition>

        </div>

    </div>
</template>
<script>

    import api from '../../api/wall';
    import {ROAST_CONFIG} from '../../config';
    import {page} from 'vue-analytics'
    export default {
        components: {},
        mounted: function () {

        }, created() {
            api.top().then(data => {

                this.datas = data["data"]
                //console.log( this.datas)
                this.changeContent()
            });

        }, props: ['xActive', 'yActive', 'yPage', 'xPage', 'activeRoute'], data() {
            return {avatarZindex:0,datas: [], ids: [], item: 0,urlAdres:ROAST_CONFIG.URL_IMAGE,interval:""};

        }, methods: {

        loadImage(){



                this.avatarZindex=3;


        },
            changeContent: function () {

                var this_=this
                clearInterval( this.interval);
                this.interval =   setInterval(function () {
                    if (this_.item != this_.datas.length - 1) {

                        this_.item++
                    } else {
                        this_.item = 0
                    }

                }, 6000);
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
                page({
                    page: 'wall p1',
                    title: 'wall p1'
                })
                this.$router.push({path: "/nineteen/" + new Date().getTime()});
                return false


            },
        }, watch: {}, activated(){

            if(this.datas[0]){
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

    .fade-enter, .fade-leave-to
    {
        opacity: 0;
    }
    .middle-first {
        position: absolute;
        right: 86px;
        top: 462px;
        width: 558px;
        height: 120px;
        background-color: #FFF;
        border-radius: 22px;

    }

    .middle-profile-pic-1 {
        position: absolute;
        width: 54px;
        height: 54px;
        border-radius: 54px;
        overflow: hidden;
        top: 15px;
        right: 20px;
    }

    .first-name-1 {
        direction: rtl;
        text-align: center;
        position: absolute;
        display: block;

        color: #424AB5;
        font-size: 18px;
        right: 32px;
        top: 74px;
    }

    .brief-first-1 {
        position: absolute;
        left: 90.5px;
        font-size: 18px;
        line-height: normal;
        color: #737373;
        width: 383px;
        height: 62px;
        overflow-wrap: break-word;
        text-align: right;
        top: 17px;
        overflow: hidden;
        direction: rtl;
    }

    .first-date {
        position: absolute;
        display: block;
        font-size: 14px;
        text-align: right;

        color: #424AB5;
        right: 425px;
        top: 79px;
        direction: rtl;
    }

    /*@keyframes active {*/
        /*0% {*/

            /*-webkit-transform: translateY(0px) scale(1.1);*/
            /*transform: translateY(0px) scale(1.1);*/
        /*}*/
        /*50% {*/
            /*-webkit-transform: translateY(10px) scale(1.1);*/
            /*transform: translateY(10px) scale(1.1);*/
        /*}*/
        /*100% {*/
            /*-webkit-transform: translateY(0px) scale(1.1);*/
            /*transform: translateY(0px) scale(1.1);*/
        /*}*/
    /*}*/
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
        z-index: 10;
        /*  box-shadow: 0 0 1px rgba(0, 0, 0, 0);*/
        right: 103px !important;
    }
</style>
