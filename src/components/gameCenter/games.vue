<template>
    <div>

        <img :src="imgURL2 + 'gameCenter/logog.png'" class="title">
        <div class="title2">بازی خود را انتخاب کنید</div>
        <div class="gameParent">
            <div class="gameItem">

                <img class="backGame" :src="imgURL + 'pages/Fifty/back-1.png'">
                <img class="iconGame" :src="imgURL + 'pages/Fifty/gameIcon/2.png'"/>

                <!--<div class="nameP">{{ gameData['result'][0]['app_name'] }}</div>-->
                <!--<div class="nameE">{{ gameData['result'][0]['appdet_org_name'] }}</div>-->

                <div class="nameP">{{ gameData['result'][0]['name'] }}</div>
                <div class="nameE">{{ gameData['result'][0]['orgname'] }}</div>

                <img class="hoverGame" :src="imgURL + 'pages/Fifty/HOVER.png'">
            </div>
        </div>

    </div>

</template>

<script>
    import {ROAST_CONFIG} from '../../config';

    export default {
        name: "games",
        props: ['gameData'],

        data() {
            return {
                imgURL: ROAST_CONFIG.URL_GAMECENTER,
                imgURL2: ROAST_CONFIG.url_comp_server,
            }
        },
        methods:{
            enter(){
                return this.gameData['result'][0]['id']
            }
        }
    }
</script>

<style scoped>

    .gameItem {
        position: relative;
        float: left;
        margin-top: 50px;
        margin-left: 0px;
        width: 570px;
        height: 200px;
    }
    .title {
        position: absolute;
        top: 130px;
        left: 820px;
    }
    .backGame {
        position: absolute;
        top: -5px;
        left: 47px;
    }

    .title2 {
        position: absolute;
        top: 245px;
        left: 820px;
        width: 300px;
        height: 50px;
        font-size: 30px;
        direction: rtl;
        text-align: center;
        /* line-height: 50px; */
        white-space: nowrap;
        color: #000;
        /*text-shadow: -4px 1px 5px #1d2029 !important*/
    }

    .gameParent {
        width: 690px;
        height: 500px;
        position: absolute;
        top: 320px;
        left: 620px;
    }
    .iconGame{
        position: absolute;
        top: 31px;
        left: 444px;

    }
    .nameP{
        position: absolute;
        top: 50px;
        left: 150px;
        width: 300px;
        height: 50px;
        font-size: 30px;
        line-height: 50px;
        color: #6b3b87;
        direction: rtl;
        text-align: center;
        white-space: nowrap;
    }
    .nameE{
        position: absolute;
        top: 105px;
        left: 150px;
        width: 300px;
        height: 50px;
        font-size: 30px;
        line-height: 50px;
        color: #6b3b87;
        direction: rtl;
        text-align: center;
        white-space: nowrap;
    }
    .hoverGame{
        position: absolute;top: 0px;left: 50px;
    }
</style>