<template>

    <div>
        <div style="background: white"
             v-bind:class=" [activeRoute==1 && xActive==xPage && yActive== yPage ? 'active' : '','news']">
            <transition v-if="datas[0]" name="fade" v-for="(data, index) in  datas">
                <div style="background: white" v-show="index == item" :key="index">
                    <img style="    position: absolute;top:0px;left: 0px;width: 557.99px;height: 347.26px;" :src='data["pic"]'>
                </div>
            </transition>
        </div>

    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import api from '../../api/news' ;
    import {ROAST_CONFIG} from '../../config';
    import {page} from 'vue-analytics'

    export default {
        components: {},
        mounted: function () {

        }, created() {
            api.news().then(data => {
                this.changeContent()
                this.datas = data["data"]["news"];
              //  console.log('news =======>' + JSON.stringify(this.datas))

            });

        }, props: ['xActive', 'yActive', 'yPage', 'xPage', 'activeRoute'], data() {
            return {datas: [], item: 0,interval:""};

        }, methods: {
            ...mapGetters([
                'getUser'
            ]),
            changeContent: function () {

                var this_ = this
                clearInterval( this.interval);
                this.interval = setInterval(function () {
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
                    page: 'last news p1',
                    title: 'last news p1'
                })
                return {
                    'item': this.item
                }
                // return false


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
    .news {
        position: absolute;
        width: 557.99px;
        height: 347.26px;
        left: 1276.01px;
        top: 82.15px;

        box-shadow: 0px 4px 23px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
        overflow: hidden;
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
        z-index: 10;
        left: 1241.01px !important;
    }

    .active {

        /*display: inline-block;* /
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
        z-index: 20;
        border-radius: 40px;
        /*  box-shadow: 0 0 1px rgba(0, 0, 0, 0);*/
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 1.5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

</style>
