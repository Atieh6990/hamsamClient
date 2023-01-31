<template>

    <div>
        <div v-bind:class=" [activeRoute==1 && xActive==xPage && yActive== yPage ? 'active' : '','reward']">
            <transition v-if="datas[0]" name="fade" v-for="(data, index) in  datas">
                <div style="background: white" v-show="index == item" :key="index">
                    <img style="    width: 557.99px;height: 347.26px;" :src='data["pic"]'>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>

    import api from '../../api/news' ;

    export default {
        components: {},
        mounted: function () {

        }, created() {
            api.news().then(data => {
                this.changeContent()
                this.datas = data["data"]["samsung"];
           //     console.log('samsung =======>' + JSON.stringify(this.datas))

            });

        }, props: ['xActive', 'yActive', 'yPage', 'xPage', 'activeRoute'], data() {
            return {datas: [], item: 0,interval:""};

        }, methods: {
            changeContent: function () {

                var this_ = this
                clearInterval( this.interval);
                this.interval =  setInterval(function () {
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
                return {
                    'item': this.item
                }


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
    .reward {
        position: absolute;
        width: 561.2px;
        height: 351.29px;
        left: 692.8px;
        top: 82.12px;

        border: 1px solid #A2A2A2;
        box-sizing: border-box;
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
        z-index: 9;
        border-radius: 40px;
        /*  box-shadow: 0 0 1px rgba(0, 0, 0, 0);*/
    }

</style>
