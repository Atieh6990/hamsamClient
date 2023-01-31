<template>
  <div class="parent">
    <div class="blur" v-if="permission == 0">
      <div class="start">
        <span v-if="trueAnsCNT != 0">
          {{ 'تعداد پاسخ صحیح :' +trueAnsCNT }}
          <br>
        </span>
        {{ permissionTxt }}
      </div>
    </div>

    <div class="opBox" v-if="permission == 1">{{ num1 + ' '}} {{ op + ''}} {{ num2 + ' = '}}<span
      style="color: #ffa200"> {{ finalResult }}</span></div>

        <img :src="imgURL + 'math/blackboard.jpg'" class="background"/>

    <timerElement v-if="permission == 1" ref="timerElement"></timerElement>

  </div>

</template>

<script>

    import timerElement from '../../components/math/timer'
    import {ROAST_CONFIG} from '../../config';

    export default {
        name: "board",
        props: ['permission', 'op', 'num1', 'num2', 'finalResult', 'permissionTxt','trueAnsCNT'],
        data() {
            return {
                timerDuration: 10000,
                imgURL: ROAST_CONFIG.url_comp_server,
            }

        },
        created() {

        },
        components: {
            timerElement
        },

        methods: {
            truAnswer() {
                this.$refs.timerElement.increaseTime();
            },
            falseAnswer() {
                this.$refs.timerElement.decreaseTime();
            },
            clearTimer() {
                if (this.permission == 1)
                    this.$refs.timerElement.cleaning();
            }
        },
        mounted() {


        },
    }
</script>

<style scoped>
    .parent {
        position: absolute;
        width: 1038px;
        height: 789px;
        top: 100px;
        left: 121px;
    }

    .background {
        position: absolute;
        top: 3px;
        left: 3px;
    }

    .blur {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 1025px;
        height: 783px;
        background-color: #000;
        opacity: 0.8;
        z-index: 10;
    }

    .start {
        position: absolute;
        width: 100%;
        height: 50px;
        top: 397px;
        left: 0px;
        font-size: 50px;
        color: #fff;
        text-align: center;
        direction: rtl;
    }

    .opBox {
        position: absolute;
        width: 1006px;
        height: 229px;
        top: 477px;
        left: 8px;
        z-index: 10;
        text-align: center;
        font-size: 135px;
        color: #fff;
        direction: ltr;
    }

    .barParent {
        position: absolute;
        width: 940px;
        height: 14px;
        left: 40px;
        top: 694px;
        background-color: #213826;
        border-radius: 10px;
        overflow: hidden;
    }

    .barChild {
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100%;
        background-color: #ffa200;
        width: 1038px;
    }
</style>
