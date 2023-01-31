<template>
    <div class="network">
        <div class="blurBack"></div>
        <div class="alert-problem">
            <img class="achar" src="dist/images/tool.gif">
            <div class="txt">ارتباط شما با سرور قطع شده است. لطفا اتصال کابل اینترنت را بررسی کنید.</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "network"
    }
</script>

<style scoped>

    .network {
        position: absolute;
        width: 1920px;
        height: 1080px;
        top: 0px;
        left: 0px;
        z-index: 100;
    }

    .blurBack {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        background-color: #000;
        opacity: 0.8;
    }
    .alert-problem{
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        width: 640px;
        height: 404px;
        background-color: #F9F9F9;
    }
    .achar{
        position: absolute;
        transform: translate(-50%, -50%);
        top: 67%;
        left: 55%;
    }
    .txt{
        position: absolute;
        width: 610px;
        height: 50px;
        font-size: 20px;
        line-height: 40px;
        direction: rtl;
        color: black;
        top: 30px;
        padding: 15px;
    }
</style>