<template>
    <transition-group name="list" class="score">
        <div v-if="show" key="item">
            <div class=" list-item scoreDet">

                <img style="right: 0px;position: absolute" :src='URL+back'>
                <div style="font-size: 19px;position: relative; direction: rtl; width: 250px; margin-top: 20px;">
                    <span style="">{{scoreDifference}}</span>
                    <span style="">امتیاز</span></div>
                <div style="clear: both"></div>
                <div style="position: relative; width: 250px;">{{textScore}}</div>

            </div>
        </div>
        <!--<div class="scoreDet">-->
        <!--<img :src='URL+"plusScore.png"'>-->
        <!--</div>-->
    </transition-group>
</template>

<script>
    import {ROAST_CONFIG} from '../config';

    export default {
        name: "loading",
        data() {
            return {
                show: 0,
                URL: ROAST_CONFIG.url_Img_server,
                back: "negativeScore.png",
                scoreDifference: 0,
                isPlus: 0,
                textScore: "کسر امتیاز"

            }
        }, created() {

        },
        methods: {
            ShowScore(score) {
                if (score > 0) {

                    this.back = "plusScore.png"
                    this.textScore = "افزایش امتیاز"
                    this.isPlus = 1
                } else {
                    this.textScore = "کسر امتیاز"
                    this.back = "negativeScore.png"
                    this.isPlus = 0
                }
                this.scoreDifference = score
                this.show = 1
                setTimeout(() => {
                    this.show = 0

                }, 5000);

            }
        }
    }
</script>

<style scoped>
    .scoreDet {
        position: absolute;
        right: 0px;
    }

    .score {
        position: absolute;
        right: 0px;
        top: 81px;
        width: 341px;
        height: 115px;
        z-index: 999999999999999;
    }

    .list-item {
        display: inline-block;
        margin-right: 10px;
    }

    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }

    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */
    {
        opacity: 0;
        transform: translateX(300px);
    }
</style>