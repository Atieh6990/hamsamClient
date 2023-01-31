<template>
    <div class="parent">
        <div class="item" v-for="(item , index) in userData['scores'].length ">
            <div class="half right">{{ userData['scores'][index]['titlePersian'] }}</div>
            <div class="half left">{{ userData['scores'][index]['score'] }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['userData'],
        name: "user-score"
    }
</script>

<style scoped>
    .parent {
        position: absolute;
        width: 974px;
        height: 294px;
        left: 911px;
        top: 765px;

    }

    .item {
        position: relative;
        float: right;
        width: 186px;
        height: 47px;
        margin-right: 57px;
        margin-top: 0px;
        /* border: 1px solid green; */
    }

    .half {
        width: 36%;
        height: 100%;
        /* border: 1px solid red; */
        position: relative;

        direction: rtl;
        font-size: 18px;
        white-space: nowrap;
        line-height: 40px;
        padding: 5px;
    }

    .right {
        float: right;
        right: 0px;
        text-align: right;
        color: #000000;
    }

    .left {
        float: left;
        left: 0px;
        text-align: left;
        color: #1955a6;
    }
</style>