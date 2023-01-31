<template>
    <div class="parent">
        <div class="rankBox">
            <div class="vLin" style="left: 98px;"></div>
            <div class="vLin" style="left: 248px;"></div>
            <div class="vLin" style="left: 309px;"></div>
            <div class="vLin" style="left: 404px;"></div>
            <div class="vLin" style="left: 542px;"></div>

            <div class="rankTitleBar">
                <div class="rankTitle" style="width: 63px;right: 0px;background-color: #ffa200">دوره</div>
                <div class="rankTitle" style="width: 138px;right: 63px;">نام کاربری</div>
                <div class="rankTitle" style="width: 96px;right: 203px;">امتیاز</div>
                <div class="rankTitle" style="width: 56px;right: 297px;">کل</div>
                <div class="rankTitle" style="width: 156px;right: 352px;">نام کاربری</div>
                <div class="rankTitle" style="width: 96px;right: 507px;">امتیاز</div>
            </div>

            <div class="rankChild">
                <div class="rank" v-for="(item , index) in rankData.all">
                    <div class="periodNumber">{{ (index + 1)}}</div>
                    <div class="periodUserName">{{ rankData['round'][index]['user']['username']|substr(7) }}</div>
                    <div class="periodUserScore">{{ rankData['round'][index]['score']}}</div>

                    <div class="allNumber">{{ (index + 1) }}</div>
                    <div class="allUserName">{{ rankData['all'][index]['user']['username']|substr(7) }}</div>
                    <div class="allUserScore">{{ rankData['all'][index]['score'] }}</div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
    import func from '../../mixins/func'
    export default {
        name: "rank",
        props:['rankData'],
        mixins: [func],
    }
</script>

<style scoped>



    .parent {
        position: absolute;
        width: 1738px;
        height: 986px;
        top: 50px;
        left: 82px;
        background-color: #ffffff;
        box-shadow: 5px 10px 10px #e6e7e9;
    }

    .rankBox {
        position: absolute;
        width: 608px;
        height: 904px;
        top: 54px;
        right: 46px;
        border-bottom: 2px solid #eaebeb;
        border-left: 2px solid #eaebeb;
        border-right: 2px solid #eaebeb;
        border-top-left-radius: 40px;
        border-top-right-radius: 40px;
        background-color: #eff0f2;
        overflow: hidden;
    }

    .vLin {
        position: absolute;
        width: 2px;
        height: 904px;
        background-color: #ebebec;
        top: 0px;
    }

    .rankTitleBar {
        position: absolute;
        width: 608px;
        height: 80px;
        background-color: #3e6045;
        left: 0px;
        top: -2px;
        border-radius: 26px;
        overflow: hidden;
        border: transparent;
    }

    .rankTitle {
        position: absolute;
        height: 100%;
        top: 0px;
        color: #fff;
        font-size: 20px;
        line-height: 80px;
        text-align: center;
        direction: rtl;
    }

    .rankChild {
        position: absolute;
        width: 100%;
        top: 82px;
        left: 0px;
        height: 825px;

    }

    .rank {
        position: relative;
        float: left;
        margin-top: 0px;
        left: 0px;
        width: 608px;
        height: 90px;
        text-align: center;
        font-size: 22px;
        direction: rtl;
    }

    .periodNumber {
        position: absolute;
        width: 50px;
        height: 50px;
        top: 19px;
        border-radius: 50px;
        background-color: #e2e2e4;
        color: #000;
        right: 6px;
        line-height: 50px;
    }

    .periodUserName {
        position: absolute;
        width: 139px;
        height: 85px;
        top: 2px;
        color: #000;
        right: 67px;
        line-height: 85px;
    }

    .periodUserScore {
        position: absolute;
        width: 91px;
        height: 85px;
        top: 2px;
        right: 205px;
        line-height: 85px;
        color: #f7c87f;
    }

    .allNumber {
        position: absolute;
        width: 50px;
        height: 50px;
        top: 19px;
        border-radius: 50px;
        background-color: #e2e2e4;
        color: #000;
        right: 304px;
        line-height: 50px;
    }

    .allUserName {
        position: absolute;
        width: 139px;
        height: 85px;
        top: 2px;
        color: #000;
        right: 367px;
        line-height: 85px;
    }

    .allUserScore {
        position: absolute;
        width: 91px;
        height: 85px;
        top: 2px;
        right: 515px;
        line-height: 85px;
        color: #f7c87f;
    }
</style>