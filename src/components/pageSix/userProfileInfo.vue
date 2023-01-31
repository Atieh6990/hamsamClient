<template>
    <div class="parent">

        <div class="item">
            <img class="icon" src="../../assets/images/six/infoProfile/0_6.png">
            <div class="title">تحصیلات</div>
            <div class="txt">{{ userData['details'][0]['education'] }}</div>
        </div>
        <div class="item">
            <img class="icon" :src="url_img + 'six/infoProfile/1_6.png'">
            <div class="title">جنسیت</div>
            <div class="txt" v-if="userData['details'][0]['gender'] == 1">مرد</div>
            <div class="txt" v-else-if="userData['details'][0]['gender'] == 0">زن</div>
            <div class="txt" v-else>ثبت نشده</div>
        </div>

        <div class="item">
            <img class="icon" :src="url_img + 'six/infoProfile/2_6.png'">
            <div class="title">سن</div>
            <div class="txt">{{ userData['details'][0]['age'] }}</div>
        </div>

        <div class="item">
            <img class="icon" :src="url_img + 'six/infoProfile/4_6.png'">
            <div class="title">استان</div>
            <div v-if="userData['details'][0]['filled_stateID'] == -1" class="txt">ثبت نشده</div>
            <div v-else class="txt">{{ userData['details'][0]['filled_state'] }}</div>
        </div>

        <div class="item">
            <img class="icon" :src="url_img + 'six/infoProfile/4_6.png'">
            <div class="title">شهر</div>
            <div v-if="userData['details'][0]['filled_cityID'] == -1" class="txt">ثبت نشده</div>
            <div v-else class="txt">{{ userData['details'][0]['filled_city'] }}</div>
        </div>

        <div class="item">
            <img class="icon" :src="url_img + 'six/infoProfile/5_6.png'">
            <div class="title">تلگرام</div>
            <div class="txt">{{ userData['details'][0]['telegram'] }}</div>
        </div>
        <div class="item">
            <img class="icon" :src="url_img + 'six/infoProfile/5_6.png'">
            <div class="title">اینستاگرام</div>
            <div class="txt">{{ userData['details'][0]['telegram'] }}</div>
        </div>
        <div class="item">
            <img class="icon" :src="url_img + 'six/infoProfile/6_6.png'">
            <div class="title">ایمیل</div>
            <div class="txt">{{ userData['details'][0]['email'] }}</div>
        </div>


    </div>
</template>

<script>
  import {ROAST_CONFIG} from "../../config";

  export default {
        name: "user-profile-info",

        props: ['userData'],
        data() {
            return {
              url_img: ROAST_CONFIG.url_comp_server,
            }
        }
    }
</script>

<style scoped>
    .parent {
        position: absolute;
        width: 974px;
        height: 294px;
        left: 844px;
        top: 765px;
        /*border: 1px solid red;*/
    }

    .item {
        position: relative;
        float: right;
        width: 485px;
        height: 59px;
        margin-right: 0px;
        margin-top: 0px;
        /*border: 1px solid green;*/
    }

    .icon {
        position: relative;
        float: right;
        margin-right: 0px;
        top: 3px;
    }

    .title {
        position: relative;
        float: right;
        top: 0px;
        margin-right: 15px;
        min-width: 25px;
        line-height: 45px;
        font-size: 18px;
        text-align: right;
        color: #2D9CDB;
        white-space: nowrap;
        direction: rtl;
    }

    .txt {
        position: relative;
        float: right;
        min-width: 142px;
        line-height: 44px;
        font-size: 18px;
        margin-right: 15px;
        text-align: right;
        color: #000000;
    }
</style>
