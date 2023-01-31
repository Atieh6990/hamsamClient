<template>
    <div>
        <div class="appName1" style="">{{ gameData['result'][0]['app_name'] }}</div>
        <div class="appName2" style="">{{ gameData['result'][0]['appdet_org_name'] }}</div>
        <img class="appIMG" :src="imgURL + 'pages/Fifty/gameIcon/2.png'">
    </div>
</template>

<script>
    import {ROAST_CONFIG} from '../../config';

    export default {
        name: "game-info",
        props:['gameData'],
        data() {
            return {
                imgURL: ROAST_CONFIG.URL_GAMECENTER,
            }
        }
    }
</script>

<style scoped>
    .appName1 {
        position: absolute;
        width: 300px;
        height: 100px;
        top: 325px;
        right: 200px;
        font-size: 35px;
        direction: rtl;
        text-align: center;
        white-space: nowrap;
        color: #000;
    }

    .appName2 {
        position: absolute;
        width: 300px;
        height: 100px;
        top: 385px;
        right: 200px;
        font-size: 35px;
        direction: rtl;
        text-align: center;
        white-space: nowrap;
        color: #000;
    }

    .appIMG {
        -webkit-box-reflect: below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(60%, transparent), to(rgba(255, 255, 255, 0.8)));
        position: absolute;
        top: 460px;
        right: 266px;
    }

</style>