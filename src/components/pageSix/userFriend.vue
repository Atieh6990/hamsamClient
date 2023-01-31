<template>
    <div v-if="(type == 'small')">
        <img class="friendIcon" src="../../assets/images/six/friends.png"/>
        <div class="friends"><b>دوستان</b></div>
        <div class="line"></div>
        <div class="cnt">{{ userFriends.friends.length + 'نفر' }}</div>


        <div class="friendBox" :style="{ min_width: ((userFriends.friends.length)* 70)+'px'}">

            <div v-for="(item , index) in (userFriends.friends) " class="imgBox" :class="[(index > 7) ? 'hide':'']">
                <img v-if="item.picture" :src="imgURL + item.picture" style="width: 100%"/>
                <img v-else :src="imgURL + 'ssn/images/userDefault.png'" style="width: 100%"/>
            </div>

        </div>

        <div :class="[((active == page)?'plusOver':'') , 'plus']">+</div>

    </div>
</template>

<script>
    import {ROAST_CONFIG} from '../../config';

    export default {
        name: "user-friend",
        props: ['type', 'active', 'page', 'userFriends'],
        data() {
            return {
                imgURL: ROAST_CONFIG.url_comp_server,
            }
        }
    }
</script>

<style scoped>
    .hide {
        display: none
    }

    .friendIcon {
        position: absolute;
        width: 22.45px;
        height: 29px;
        left: 782px;
        top: 775px;
    }

    .friends {
        position: absolute;
        width: 64px;
        height: 43px;
        line-height: 42px;
        font-size: 21px;
        text-align: right;
        color: #4B0D85;
        top: 773px;
        left: 711px;
    }

    .line {
        position: absolute;
        width: 22px;
        height: 0px;
        left: 686px;
        top: 790px;
        border: 1px solid #3A4AB4;
        transform: rotate(90deg);
    }

    .cnt {
        position: absolute;
        width: 50px;
        height: 29px;
        left: 622px;
        top: 776px;
        line-height: 36px;
        font-size: 18px;
        text-align: right;
        color: #3A4AB4;
        direction: rtl;
    }

    .plus {
        position: relative;
        float: right;
        width: 58.63px;
        height: 59px;
        /* left: 168.77px; */
        margin-right: 10px;
        top: 850px;
        background: #FFFFFF;
        box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.23);
        border-radius: 50px;
        line-height: 60px;
        font-size: 21px;
        text-align: center;
        color: #A6A6A6;
    }

    .friendBox {
        /*position: relative; *!*/
        /* width: 581px; */
        height: 62.92px;
        position: relative;
        float: right;
        margin-right: 1100px;
        top: 845px;
        /*border: 1px solid red;*/
    }

    .imgBox {
        position: relative;
        float: right;
        margin-right: 7px;
        width: 61.42px;
        height: 61.8px;
        border-radius: 50px;
        overflow: hidden;
        /*border: 1px solid green;*/
    }

    .plusOver {
        transition: 0.5s;
        transform: scale(1.1);
        color: #4452B4;
        border: 4px solid #4452B4;
    }
</style>
