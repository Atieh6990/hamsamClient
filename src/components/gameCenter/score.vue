<template>
    <div>
        <div id="title_P52" class="title" style="">
            <span style="color: #fbca03 !important"> امتیاز</span> بازی خود را مشخص کنیدرا انتخاب کنید
        </div>
        <div class="scoreParent">

            <div v-for="(item , index) in scoreData.result.score" class="scoreElm"
                 v-if="(parseInt((index)/columnCount))+3>(parseInt((number)/columnCount))">
                <img class="backScore" :src="imgURL + 'pages/FiftyTwo/BUT-2.png'">
                <img class="backScoreOver" :src="imgURL + 'pages/FiftyTwo/BUT-1.png'" v-if="(number == index)">
                <img class="coin" :src="imgURL + 'pages/FiftyTwo/COIN.png'">
                <div class="scor" :style="{color : colorCode[index]}"><b>{{ item }}</b></div>
                <div class="tmp">{{ 'امتیاز بازی' }}</div>
                <img class="tikSore" :src="imgURL + 'pages/FiftyTwo/TIK.png'" v-if="(number == index)"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {ROAST_CONFIG} from '../../config';

    export default {
        name: "score",
        props: ['scoreData'],
        data() {
            return {
                imgURL: ROAST_CONFIG.URL_GAMECENTER,
                colorCode: ['#02ccfa', '#9a6cff', '#ff7b1e', '#62d109', '#bdf512', '#ffffff'],
                number: 0,
                columnCount: 2,
            }

        },
        methods: {
            right() {
                if ((this.number % this.columnCount != parseInt(this.columnCount) - 1) && (this.number + 1 < this.scoreData.result.score.length)) {
                    this.number++;
                    return true
                }
            },
            left() {
                if (this.number % this.columnCount != 0) {
                    this.number--;
                    return true
                }
            },
            down() {
                if ((this.number + parseInt(this.columnCount)) < (this.scoreData.result.score.length)) {
                    this.number += parseInt(this.columnCount);
                    return true
                }
            },
            up() {
                if ((this.number) >= this.columnCount) {
                    this.number -= parseInt(this.columnCount);
                    return true
                }
            },
            enter(){
                // console.log('scoreeeeee ='+JSON.stringify(this.scoreData) )
                // console.log('scoreeeeee ='+JSON.stringify(this.scoreData['result']['score'][this.number]) )
                // console.log( ' *** ' + this.scoreData['score'][this.number])
                return this.scoreData['result']['score'][this.number]
            }
        }
    }
</script>

<style scoped>
    .title {
        position: absolute;
        width: 500px;
        height: 50px;
        top: 185px;
        left: 690px;
        font-size: 30px;
        direction: rtl;
        text-align: center;
        white-space: nowrap;
        color: #000;
        /*text-shadow: -4px 1px 5px #1d2029 !important;*/
    }

    .scoreParent {
        position: absolute;
        width: 488px;
        height: 705px;
        top: 222px;
        left: 700px;
    }

    .scoreElm {
        position: relative;
        float: left;
        width: 220px;
        height: 205px;
        margin-left: -3px;
        margin-top: 18px;
    }

    .backScore {
        position: absolute;
        top: 0px;
        left: 0px
    }

    .backScoreOver {
        position: absolute;
        top: 0px;
        left: 0px;
    }

    .coin {
        position: absolute;
        top: 20px;
        left: 80px;
    }

    .scor {
        position: absolute;
        width: 175px;
        height: 40px;
        top: 95px;
        left: 17px;
        white-space: nowrap;
        direction: rtl;
        text-align: center;
        font-size: 30px;
        text-shadow: -4px 1px 5px #1d2029 !important;
        z-index: 10;
    }

    .tmp {
        position: absolute;
        width: 175px;
        height: 40px;
        top: 149px;
        left: 17px;
        white-space: nowrap;
        direction: rtl;
        text-align: center;
        font-size: 16px;
        color: #FFF;
    }

    .tikSore {
        position: absolute;
        top: 20px;
        left: 136px;

    }
</style>