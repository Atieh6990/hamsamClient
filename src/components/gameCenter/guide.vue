<template>
    <div>
        <div class="blurBox"></div>
        <img class="rahnamaBack" :src="imgURL+'gameCenter/rahnama.png'">

        <div class="rahnamaParent">
            <div class="rahnamaChild">
                برای بازی در این بخش مراحل زیر را به ترتیب طی کنید:
                <br>
                1)انتخاب بازی (بازی حاضر جواب)<br>
                2)انتخاب دسته بندی که در حاضر جواب سوالات در دسته های عمومی، ادبیات، سینما، موسیقی، ورزش و... وجود
                دارند. <br>
                3)انتخاب امتیاز برای بازی در اتاق: شما با توجه به امتیاز کل خود در دوره یکی از بازه های امتیازی 100،
                500، 1000 و 1500 را می توانید انتخاب نمایید. <br>

                پس از این مراحل اتاق ایجاد شده در لیست سایر اتاق ها برای همه کاربران قابل مشاهده خواهد بود. افراد می
                توانند رقیب مورد نظر خود را انتخاب کرده و به او درخواست بازی بدهند. اگر سازنده اتاق مایل باشد تا با این
                فرد بازی کند درخواست او را قبول می کند و هر دو بازیکن وارد بازی حاضر جواب می شوند و به سوالات دسته بندی
                تعیین شده پاسخ می دهند. و در صورتی که سازنده تمایلی به بازی با این فرد نداشته باید در خواست او را نادیده
                می گیرد.
                بعد از اتمام بازی در حاضر جواب، امتیاز تعیین شده برای اتاق (مرحله 3) به فرد برنده تخصیص می یابد و به
                مجموع امتیازهای وی در هم سام افزوده می شود.
            </div>
        </div>
    </div>
</template>

<script>
    import {ROAST_CONFIG} from '../../config';

    export default {
        name: "guide",
        data() {
            return {
                imgURL: ROAST_CONFIG.url_comp_server,
            }
        }
    }
</script>

<style scoped>
    .blurBox {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 1920px;
        height: 1080px;
        opacity: 0.5;
        background-color: #000 !important;
    }

    .rahnamaParent {
        position: absolute;
        top: 370px;
        left: 480px;
        width: 895px;
        height: 485px;

        z-index: 101;

    }

    .rahnamaChild {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        font-size: 20px;
        line-height: 40px;
        direction: rtl;
        color: #000;

    }

    .rahnamaBack {
        position: absolute;
        top: 185px;
        left: 430px;
        z-index: 100;

    }
</style>