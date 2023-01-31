<template>
    <div>
        <div class="InfoInGameCenterBox">
            <img class="profilePic_P49" :src=" getUser().picture">
            <img class="nameBackPic_P49"
                 :src="imgURL + 'gameCenter/name.png'">
            <div class="namePlace_P49" id="namePlace_P49">{{this.getUser().username|substr(15)}}</div>
            <img class="emtiazBar_P49"
                 :src="imgURL + 'gameCenter/emtiaz.png'">
            <div class="emtiazBoxParent_P49">
                <div class="emtiazBoxChild_P49" :style="{ width: childWid+'%' }"></div>

            </div>
            <div class="Limitscor_P49" id="Limitscore_P49">{{ this.def + 'از 2000' }}</div>

        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {ROAST_CONFIG} from '../../config';
    import func from '../../mixins/func'

    export default {
        name: "user-info",
        props: ['def', 'childWid'],
        mixins: [func],
        data() {
            return {
                imgURL: ROAST_CONFIG.url_comp_server,
            }

        },
        created() {

        },
        methods: {
            ...mapGetters([
                'getUser'
            ]),
        }
    }
</script>

<style scoped>
    .InfoInGameCenterBox {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%
    }

    .profilePic_P49 {
        position: absolute;
        top: 50px;
        width: 90px;
        height: 90px;
        left: 1774px;
        z-index: 10;
        border-radius: 50px;
    }

    .nameBackPic_P49 {
        position: absolute;
        top: 45px;
        left: 1430px;
        z-index: 10;
    }

    .namePlace_P49 {
        position: absolute;
        top: 63px;
        left: 1455px;
        width: 230px;
        height: 48px;
        font-size: 20px;
        color: #000;
        text-align: center;
        direction: rtl;
        line-height: 40px;
        z-index: 11;
    }

    .emtiazBar_P49 {
        position: absolute;
        top: 130px;
        left: 1440px;
        z-index: 15;
    }

    .emtiazBoxParent_P49 {
        position: absolute;
        top: 137px;
        left: 1450px;
        width: 245px;
        height: 28px;
        border-radius: 20px;
        z-index: 10;
        overflow: hidden;
    }

    .emtiazBoxChild_P49 {
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100%;
        background: linear-gradient(to right, #fe7608, #fed849);
    }

    .Limitscor_P49 {
        position: absolute;
        width: 300px;
        height: 30px;
        top: 170px;
        right: 227px;
        text-align: right;
        direction: rtl;
        font-size: 22px;
        color: #000;
        z-index: 10
        /* border: 1px solid red; */
    }

</style>