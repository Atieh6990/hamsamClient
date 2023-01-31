<template>
    <div>
        <div v-if="show" class="popupParent">
            <div class="popup">
                <div class="buttonsParent">
                    <div class="title" v-text="type == 'signup' ? 'ثبت نام' : type == 'rules' ? 'قوانین' : ''"></div>
                    <div :class="[xpopup == 1 ? 'blueBut' : '', 'buttons whiteBut']" style="margin-left: 35px"
                         v-text="type == 'signup' ? 'صرف نظر' : type == 'rules' ? 'موافقم' : ''"></div>
                    <div :class="[xpopup == 2 ? 'blueBut' : '' , 'buttons whiteBut']" style="margin-left: 15px"
                         v-text="type == 'signup' ? 'ثبت نام' : type == 'rules' ? 'مشاهده قوانین' : ''"></div>

                </div>
                <div class="lineHor"></div>
                <div class="text"
                     v-text="type == 'signup' ? 'برای استفاده از این بخش نیاز به ثبت نام دارید.' : type == 'rules' ? 'آیا با قوانین هم سام موافقید؟' : ''"></div>
                <img :src="type == 'signup' ? URL + 'popup/signup.png' : type == 'rules' ? URL + 'popup/ghavanin.png' : ''"
                     class="image">

            </div>
        </div>
        <rules ref="rules"></rules>
    </div>

</template>

<script>
    import Rules from "../components/rules";
    import {ROAST_CONFIG} from '../config';
    import api from '../api/rules';
    import {mapMutations} from 'vuex';
    import {page} from 'vue-analytics'


    export default {
        name: "popup",
        components: {
            Rules
        },
        data() {
            return {
                URL: ROAST_CONFIG.url_Img_comp,
                show: false,
                type: 'signup',
                xpopup: 2,
                //  seenRules: false


            }
        },
        created() {

            this.$root.$on('popup_rules', () => {
                page({
                    page: 'popup rules',
                    title: 'popup rules'
                })
                this.show = true;
                this.type = 'rules';

            });
            this.$root.$on('popup_signup', () => {
                page({
                    page: 'popup signup',
                    title: 'popup signup'
                })
                this.show = true;
                this.type = 'signup';

            });
            this.$root.$on('hide_popup', () => {
                this.show = false;

            });
            // this.$root.$on('seen_rules', () => {
            //     this.seenRules ;
            //
            // });


        },

        methods: {
            ...mapMutations([
                'updateDetail',

            ]),
            up() {

                this.$refs.rules.up();

            }, down() {

                this.$refs.rules.down();

            },
            left() {
                this.xpopup = 1;
            },
            right() {
                this.xpopup = 2;
            },
            enter() {

                let time = new Date().getTime();

                if (this.type == 'rules' || this.type == 'signup') {
                    if (this.xpopup == 1) {
                        this.show = false;
                    }
                }
                if (this.type == 'rules') {
                    if (this.xpopup == 2) {

                        if (!this.$refs.rules.showRules) {
                            this.$root.$emit('show_rules');
                            var _self = this;
                            setTimeout(() => {
                                this.$refs.rules.scrollInit();
                            }, 10);

                        }
                        else {
                            //  alert('ruleeeeeeeeees')
                            this.$refs.rules.enter();
                            this.show = false;

                        }
                    }
                    page({
                        page: 'view rules',
                        title: 'view rules'
                    })
                    api.rules().then(data => {

                        if (data['success'] == true) {
                            // this.seenRules = true;
                            this.updateDetail({item: "rules", amount: 1})


                        }

                    });
                    return true;

                } else if (this.type == 'signup') {

                    if (this.xpopup == 2) {

                        page({
                            page: 'guest signup',
                            title: 'guest signup'
                        })
                        this.$router.push({
                            path: '/seven/' + time, query: {FromSabtNam:true}
                        });
                        this.show = false;
                        return true;
                    }
                }

                return false;
            },
            back() {
                if (!this.$refs.rules.showRules) {
                    this.show = false;
                }else{
                    this.$refs.rules.back();
                }


            }
        }
    }
</script>

<style scoped>
    .popupParent {
        background: rgba(246, 246, 246, 0.9);
        width: 1920px;
        height: 1080px;
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 111111;
    }

    .popup {
        position: absolute;
        width: 1130px;
        height: 428px;
        left: 400px;
        top: 325px;
        background: #FFFFFF;
        box-shadow: 0px -1px 20px rgba(0, 0, 0, 0.25);
        border-radius: 30px;
        z-index: 1;
    }

    .buttonsParent {
        width: 1130px;
        height: 100px;
        position: absolute;
        /*left: 55px;*/
        /*border: 1px solid red;*/
    }

    .title {
        width: 190px;
        height: 100px;
        float: right;
        position: relative;
        /* right: 30px; */
        /* top: 26px; */
        color: #2F80ED;
        line-height: 100px;
        font-size: 28px;
        text-align: center;
    }

    .buttons {
        width: 170px;
        height: 68px;
        float: left;
        margin-top: 16px;
        position: relative;
        border-radius: 10px;
        line-height: 68px;
        font-size: 24px;
        text-align: center;

    }

    .blueBut {
        background: #2F80ED !important;
        border: 1px solid #2F80ED !important;
        box-shadow: 0px 0px 22px rgba(47, 128, 237, 0.6) !important;
        /*margin-left: 35px !important;*/
        color: #FFFFFF !important;

    }

    .whiteBut {
        background: #FFFFFF;
        border: 1px solid #BDBDBD;
        box-shadow: 0px 0px 21px rgba(98, 92, 100, 0.2);
        /*margin-left: 15px;*/
        color: #2F80ED;
    }

    .lineHor {
        position: absolute;
        width: 1070px;
        height: 0px;
        left: 30px;
        top: 95px;
        border: 1px solid #535C68;
    }

    .text {
        width: 745px;
        height: 38px;
        position: absolute;
        line-height: 42px;
        font-size: 24px;
        color: #4F4F4F;
        direction: rtl;
        right: 0px;
        top: 205px;
        text-align: right;
        text-indent: 60px;
    }

    .image {
        position: absolute;
        left: 25px;
        top: 130px;
    }
</style>
