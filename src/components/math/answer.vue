<template>
    <div class="parent">

        <div class="box" style="left: 170px;">
            <img :src="imgURL + 'math/1.png'" class="item" v-if="xpos == 0"/>
            <img :src="imgURL + 'math/1_w.png'" class="item" v-if="xpos == 1"/>
        </div>


        <div class="box" style="left: 505px;">
            <img :src="imgURL + 'math/true.png'" class="item" v-if="xpos == 1"/>
            <img :src="imgURL + 'math/true_w.png'" class="item" v-if="xpos == 0"/>
        </div>

    </div>
</template>

<script>

    import {ROAST_CONFIG} from '../../config';

    export default {
        name: "answer",
        props: ['permission'],
        data() {
            return {
                xpos: 0,
                imgURL: ROAST_CONFIG.url_comp_server,
            }
        },
        methods: {
            right() {
                if (this.permission == 1)
                    this.xpos = 1;
            },
            left() {
                if (this.permission == 1)
                    this.xpos = 0;
            },
            enter() {
                if (this.permission == 1){
                    if(this.xpos == 0){
                        return false
                    }else if(this.xpos == 1){
                        return true;
                    }
                }

            }
        }
    }
</script>

<style scoped>
    .parent {
        position: absolute;
        width: 1018px;
        height: 134px;
        top: 885px;
        left: 125px;

    }

    .box {
        position: absolute;
        width: 328px;
        height: 80px;
        background-color: #d7d7d7;
        border-radius: 30px;
        top: 20px;
    }

    .item {
        position: relative;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 8%;
    }

</style>