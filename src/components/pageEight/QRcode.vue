<template>
    <div class="parent">
        <div class="largBlur"></div>
        <div class="box_1">
            <img :src="imgURL+ 'profile/album/qr-code.png'"/>
            <img class="code" :src="url"/>
        </div>
    </div>
</template>

<script>
    import {ROAST_CONFIG} from '../../config';
    import {mapGetters} from 'vuex'


    export default {
        name: "q-rcode",
        props: ['url'],
        data() {
            return {
                qrSRC: '',
                imgURL: ROAST_CONFIG.url_comp_server,
            }
        },
        created() {
            // this.qrSRC = 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=' + this.url + '&choe=UTF-8'
            // this.qrSRC = 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=' + this.url + '&choe=UTF-8'
        },
        methods: {
            ...mapGetters([
                'getUser'
            ]),
        }

    }
</script>

<style scoped>
    .parent {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
    }

    .largBlur {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background-color: #000000;
        opacity: 0.9;
        z-index: 10;
    }

    .box_1 {
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        z-index: 11;
    }

    .box_2 {
        position: absolute;
        width: 100%;
        height: 123px;
        left: 0px;
        bottom: 0px;
        background-color: #e1e1e1;
    }

    .scanKonid {
        position: absolute;
        width: 144px;
        height: 35px;
        font-size: 16px;
        color: #000000;
        text-align: center;
        top: 40px;
        right: 100px;
    }

    .code {
        top: 100px;
        left: 148px;
        position: absolute;
        /* border: 2px solid #faa44d; */
        margin-top: 20px;
        width: 302px;
    }
</style>