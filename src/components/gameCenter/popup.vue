<template>
    <div>

        {{popupData}}
        <div class="blur"></div>


        <div v-for="(item , index) in popupData" class="popupParent" :style="{ zIndex: 101+(index) }">


            <img class="popupBack" :src="imgURL + 'gameCenter/box.png'">
            <img class="popImg" :src="item.img">
            <!--<div class="">{{ JSON.stringify(popupData) + '****' + item.btn }}</div>-->

            <div v-if="(item.sts == 'ok')" class="popTxt">{{ item.msg }}</div>
            <div v-if="(item.sts == 'error' && item.state == -1 && item.adminId == getUser().userID)" class="popTxt">{{
                'این اتاق توسط خود شما ساخته شده است. منتظر رقیب بمانید ....' }}
            </div>
            <div v-if="(item.sts == 'error' && item.state == -1 && item.adminId != getUser().userID)" class="popTxt">{{
                item.msg }}
            </div>


            <div class="popupBtn" v-if="item.btn == 1">
                <img class="acceptBtn" :src="imgURL + 'gameCenter/accept.png'">
                <img class="overPopupBtn_1" :src="imgURL + 'gameCenter/hoverDialouge.png'"
                     v-if="(ypos == 0) && (activeRoute == 1) && (active == page)">
                <div class="popupBtnTxt acceptTxt">قبول میکنم</div>
                <!--<div class="popupBtnTxt acceptTxt">{{ '%%%%%'+activeRoute }}</div>-->

                <img class="ignoreBtn" :src="imgURL + 'gameCenter/ignore.png'">
                <img class="overPopupBtn_2" :src="imgURL + 'gameCenter/hoverDialouge.png'"
                     v-if="(ypos == 1) && (activeRoute == 1) && (active == page)">
                <div class="popupBtnTxt ignoreTxt">قبول نمیکنم</div>
            </div>

        </div>
    </div>
</template>

<script>
    import {ROAST_CONFIG} from '../../config';
    import {mapGetters} from 'vuex'

    export default {
        name: "popup",
        props: ['popupData', 'active', 'page', 'activeRoute', 'socket'],
        data() {
            return {
                imgURL: ROAST_CONFIG.url_comp_server,
                popupCnt: 0,
                ypos: 0,
                interval: ''
            }
        },
        created() {
            //  alert('jjjjjjjjjjjjjjjjjj')
            this.hidePopup();
        },
        methods: {
            ...mapGetters([
                'getUser'
            ]),

            hidePopup() {

                let _self = this;
                this.popupCnt = this.popupData.length
                this.interval = setInterval(function () {
                    if (_self.popupData.length > 0) {

                        if (_self.popupData[_self.popupData.length - 1]['btn'] == 0) {

                            _self.popupData.pop();
                            _self.popupCnt--;
                            if (_self.popupData.length == 0) {
                                clearInterval(_self.interval);
                                _self.$root.$emit('resetFocuse_hidePOPup');
                            }

                        } else {

                            clearInterval(_self.interval);

                            for (var i = 0; i < _self.popupData.length; i++) {
                                // console.log(i + ' ** ' + _self.popupData[i]['btn'])
                                if (_self.popupData[i]['btn'] == 0) {
                                    _self.popupData.splice(i, 1);
                                }
                            }
                            // console.log('bade in fore')
                            _self.popupCnt = _self.popupData.length
                        }
                    } else {
                        clearInterval(_self.interval);
                        _self.$root.$emit('resetFocuse_hidePOPup');
                    }

                }, 3000);
            },
            down() {
                this.ypos = 1;
            },
            up() {
                this.ypos = 0;
            },
            enter() {
                //  console.log('this.popupCnt --------------------------------->' + this.popupCnt)
                if (this.popupData[this.popupCnt - 1]['btn'] == 1) {
                    // if (this.ypos == 0) {//accept
                    // } else if (this.ypos == 1) {//ignore
                    // }

                    let reqId = this.popupData[this.popupData.length - 1]['req'];
                    let room = this.popupData[this.popupData.length - 1]['roomId'];
                    let sts = this.ypos + 1;
                    this.popupData.pop();
                    this.popupCnt = this.popupData.length;

                    if (this.popupData.length == 0) {
                        clearInterval(this.interval)
                        this.$root.$emit('resetFocuse_hidePOPup');
                    }

                    let joinRes = {
                        'reqId': reqId, 'room': room, 'sts': sts
                    };
                    return joinRes;
                    //
                }
            },
            emptyArr(){
                while (this.popupData.length >0){
                    this.popupData.pop();
                };
                this.popupCnt = 0;
                this.ypos = 0
            },

        }
    }
</script>

<style scoped>
    .blur {
        position: absolute;
        width: 1920px;
        height: 1080px;
        top: 0px;
        left: 0px;
        background-color: #000;
        opacity: 0.8;
        z-index: 100;
    }

    .popupBack {
        opacity: 1 !important;
        position: absolute;
        top: 0px;
        left: 0px;
        /*z-index: 100;*/
    }

    .popupParent {
        position: absolute;
        width: 600px;
        height: 500px;
        top: 220px;
        left: 635px;
        /*border: 1px solid red;*/
        /*z-index: 100;;*/
    }

    .popImg {
        position: absolute;
        top: 20px;
        width: 120px;
        left: 270px;
        border-radius: 60px;
    }

    .popTxt {
        position: absolute;
        width: 548px;
        height: 130px;
        top: 150px;
        left: 53px;
        /*border: 1px solid green;*/
        color: #000;
        font-size: 20px;
        text-align: center;
        line-height: 40px;
        direction: rtl;
    }

    .popupBtn {
        position: absolute;
        width: 500px;
        height: 185px;
        top: 240px;
        left: 88px;
        /*border: 1px solid blue*/
    }

    .acceptBtn {
        position: absolute;
        top: 10px;
        left: 100px;
        border: 3px solid transparent;
    }

    .overPopupBtn_1 {
        position: absolute;
        top: 14px;
        left: 103px;
    }

    .overPopupBtn_2 {
        position: absolute;
        top: 111px;
        left: 103px;
    }

    .popupBtnTxt {
        left: 123px;
        direction: rtl;
        font-size: 24px;
        text-align: center;
        color: #000;
        line-height: 52px;
        white-space: nowrap;
        text-shadow: -4px 1px 5px #1d2029 !important;
        position: absolute;
        width: 180px;
        height: 52px;
    }

    .acceptTxt {
        top: 21px;
    }

    .ignoreBtn {
        position: absolute;
        top: 110px;
        left: 100px;
        border: 3px solid transparent;
    }

    .ignoreTxt {
        top: 123px;
    }
</style>