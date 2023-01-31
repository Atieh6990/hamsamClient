<template>
    <div>
        <img class="creatRoom_P49"
             :src="imgURL + 'gameCenter/make-a-room.png'"
             id="creatRoom_P49">
        <img class="creatRoom_P49 creatRoomHoverShow_P49"
             :class="[(active == page) && (xpos == 0) && (activeRoute == 1) ? 'creatRoomHover_P49':'']"
             :src="imgURL + 'gameCenter/hover2.png'"
             id="creatRoomHover_P49">

        <img class="rahnama_P49"
             :src="imgURL + 'gameCenter/rahnama-buttom.png'"
             id="rahnama_P49">
        <img class="rahnama_P49 rahnamaHoverShow_P49 "
             :class="[(active == page) && (xpos == 1) && (activeRoute == 1) ? 'creatRoomHover_P49':'']"
             :src="imgURL + 'gameCenter/hover2.png'"
             id="rahnamaHover_P49">

    </div>
</template>

<script>
    import {ROAST_CONFIG} from '../../config';

    export default {
        name: "btns",
        props: ['page', 'active', 'activeRoute'],
        data() {
            return {
                imgURL: ROAST_CONFIG.url_comp_server,
                xpos: 0,//creat room , 1->rahnama
            }
        },
        methods: {
            right() {
                if (this.xpos == 0) {
                    this.xpos = 1;
                    return true
                }
            },
            left() {
                if (this.xpos == 1) {
                    this.xpos = 0;
                    return true
                }
            },
            enter(){
                return this.xpos
            }
        }
    }
</script>

<style scoped>
    .creatRoom_P49 {
        position: absolute;
        top: 200px;
        left: 590px;
        border: 3px solid transparent;
    }

    .creatRoomHoverShow_P49 {
        display: none
    }

    .creatRoomHover_P49 {
        display: block !important;
    }

    .creatRoom_P49 .creatRoomHover_P49 {
        display: block !important;
    }

    .rahnama_P49 {
        position: absolute;
        top: 200px;
        left: 990px;
        border: 3px solid transparent;
    }

    .rahnamaHoverShow_P49 {
        display: none
    }

    .rahnamaHover_P49 {
        display: block !important;
    }

    .rahnama_P49 .rahnamaHover_P49 {
        display: block !important;
    }
</style>