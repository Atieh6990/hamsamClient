<template>
    <div v-if="showRules" class="rulesParent">
        <div class="rulesPopup">
            <img class="image" :src="URL + 'rules/photo2.png'">
            <img class="samsung" :src="URL + 'rules/samsung-logo.png'">
            <div class="rulesTxt">
                <div class="rules">
                    <p>قوانین و مقررات برنامه هم سام</p>
                    <p>1- عضویت در اپلیکیشن هم سام به معنای تبعیت از شرع مبین اسلام و قوانین جاری جمهوری اسلامی ایران میباشد بدیهی است گام برداشتن بر اساس قوانین قطعا باعث پایداری وارائه خدمات بهتر خواهد بود.</p>
                    <p>2- ورود به اپلیکیشن هم سام  به معنای قبول کلیه شرایط و موازین فعالیت در این اپلیکیشن است</p>
                    <p>3- کاربران با عضویت در اپلیکیشن هم سام   ضمن قبول قوانین اپلکیشن هم سام ، اقرار به اطلاع از مقررات جرائم رایانه ای می نمایند.</p>
                    <p>4- توهین به نظام مقدس جمهوری اسلامی، اصل ولایت فقیه و شخص حضرت امام خمینی (ره) و مقام معظم رهبری حضرت آیت‌الله خامنه‌ای (مد ظله العالی)  طبق قانون مجازات اسلامی جرم شناخته شده و درصورت عدم رعایت این مهم ،همچنین توهین یا افترا به هر یک از مقامات تصریح شده در قانون جمهوری اسلامی ایران  جهت پیگیری به مرجع صالح ارجاع داده خواهد شد.</p>
                    <p>5- ارسال هرگونه مطلب ، تصویر ، ویدئو ، ثبت نظرات و کلیه کامنت ها صرفا بیانگر نظر و عقیده ناشر آن بوده و ارسال کننده شخصا مسئول میباشد. و تفکر حاکم بر اپلیکیشن هم سام  و مسئولان آن نمیباشد ، بدیهی است اپلیکیشن هم سام   در قبال ارسالهای کاربران  هیچگونه مسئولیتی بر عهده نداشته و نخواهد داشت ولی با دریافت گزارش تخلف با خاطی برخورد و در صورت ضرورت به مراجع ذیصلاح قانونی ارجاع خواهد داد .</p>
                    <p>6- کاربران موظف به انتخاب نام کاربری مناسب و نگهداری از رمز عبور خویش میباشند </p>
                    <p>7-  در انتخاب نام کاربری خود دقت کنید ، استفاده از کلمات نامناسب و آدرس وبلاگ ها یا سایت ها ممنوع میباشد .</p>
                    <p>8-  بکار بردن اسامی منصوب به اپلیکیشن هم سام   خلاف بوده و با کاربر خاطی برخورد خواهد شد .</p>
                    <p>9-  ایمیل خود را بصورت صحیح وارد کنید از بکار بردن www در ابتدای ایمیل خود خودداری کنید .</p>
                    <p>10- ضروریست کاربران در ارسال مطالب و انتخاب عکس پروفایل خود دقت کنند و از گذاشتن مطالب و عکس های مخالف با قوانین جمهوری اسلامی ایران و شرع مبین اسلام خودداری کنند .</p>
                    <p>11- از وارد کردن عکس‌های خانوادگی بدون پوشش مناسب خودداری گردد. اپلیکیشن هم سام  در صورت مشاهده و گزارش چنین عکس‌هایی رأسا اقدام به حذف عکس خواهد کرد. رعایت کردن حدود شرعی و عرفی حجاب در جامعه در عکس‌های ارسالی کاربران الزامی است.</p>
                    <p>12- هرگونه سوء استفاده از اطلاعات کاربران، عکسها و مشخصات آنها ممنوع میباشد.</p>
                    <p>13- ایجاد مزاحمت برای کاربران با هرعنوانی خلاف قوانین اپلیکیشن هم سام   بوده و در صورت گزارش ، توسط مدیران رسیدگی خواهد شدو طبق نظر ایشان عمل خواهد شد..</p>
                    <p>14- کپی کردن مطالب کاربران خلاف قوانین اپلیکیشن هم سام   می باشد و در صورت اثبات این موضوع ، کاربر از استفاده از این اپلیکیشن محروم خواهد شد.</p>

                    <p>15- نشر هرگونه شماره تماس ثابت و همراه و آیدی های مسنجر در اپلیکیشن هم سام   که جهت دوستیابی و هر نوع سوء استفاده،ممنوع میباشد .</p>
                    <p>16- درج و نشر مطالب تحریک آمیز، بکار بردن کلمات رکیک، بی احترامی به کاربران، دین، اعتقادات، قومیت های اشخاص، مسئولان کشور، آرمان و ارزشهای انقلاب اسلامی خلاف قوانین میباشد .</p>
                    <p>17- نشر مطالب متعلق به سایتهای مسدود شده ممنوع می باشد .</p>
                    <p>18- تبلیغ عقاید کلیه ادیان غیر از دین مبین اسلام ممنوع می باشد .</p>
                    <p>19- انتشار و تبلیغ هرگونه فیلتـر شکـن، VPN و پروکـسی خلاف قوانین میباشد .</p>
                    <p>20- تبلیغ شبکه های مجازی دیگر ، دعوت به چت روم ها یا انجمن های گفت و گو و سایت های کسب درآمد در این سایت ممنوع میباشد .</p>
                    <p>21- هرگونه امور تبلیغاتی در فضای اپلیکیشن هم سام   ممنوع بوده و جهت امور تبلیغاتی باید با مدیریت هماهنگی شود.</p>
                    <p>22- کلیه فعالیت هایی که همراه با انتشار ویروس، تروجان یا هرگونه برنامه ی مخرب دیگر باشند تخلف محسوب میگردد.</p>
                    <p>23- هرگونه ارسال و انتشار کدهای مخرب و ویروس از طریق اپلیکیشن هم سام   ممنوع میباشد .</p>
                    <p>24- در صورت ایجاد مشکل در سرور فایل های اپلیکیشن هم سام   ، امکان حذف عکس ها و مطالب پیوستی وجود دارد و بدلیل حجم زیاد فایل ها امکان بک آپ گیری وجود ندارد بنابراین اپلیکیشن هم سام   مسئولیتی در این زمینه ندارد . کاربران میتوانند فایل های خود را در سایت های دیگر آپلود و بعنوان بک آپ نگهداری نمایند .</p>
                    <p>25- کاربران مسدود شده فقط از طریق تماس با ما (یکی از بخش های اپلیکیشن ) و با وارد کردن ایمیل خود قادر به رسیدگی هستند .</p>
                    <p>26- اپلیکیشن هم سام   بر خود لازم میداند بمنظور حفظ نظم و آرامش ، هر کاربری را که در جهت ضربه زدن به اپلیکیشن هم سام   ی
                        ا ایجاد تشنج اقدام نماید ، همراه با عوامل آنها مسدود و در صورت نیاز تمام مطالب آن را حذف نماید .
                        همچنین عدم رعایت بندهای 10، 8 و بندهای 15 لغایت 23 مشمول این ماده خواهند بود.</p>
                    <p>27- مدیران اپلیکیشن هم سام   مجاز میباشند  در مواقع نیاز به کلیه ارسالها و پروفایل کاربران وارد شده و نظارت نماید.</p>

                    <p>28- کاربرانی که تمایل به استفاده از  محیط سالم و بدور از هرگونه مسائل سیاسی و جناحی و موارد غیر اخلاقی میباشند ، میتوانند در این اپلیکیشن (هم سام )  عضو شده و  فعالیت داشته باشند. </p>
                    <p>29- زمان و اعلام نتایج برندگان در اپلیکیشن هم سام  قابل تغییر است و سامسونگ به صلاحدید خود میتواند آنرا تغییر دهد</p>

                    <p>30- برندگان رضایت کامل خود را جهت چاپ عکس و فیلم بمنظور تبلیغ از طریق انتشار آگهی در روزنامه های کثیر الانتشار ، پوستر و نمایش از سوی صدا وسیما جمهوری اسلامی ایران اعلام می دارند .</p>

                    <p>31 -بدیهی است در صورت  ارتکاب هر یک از تخلفات مندرج  در این دستورالعمل ، هیچ گونه مسئولیتی ( کیفری- حقوقی و غیره) متوجه اپلیکیشن و مدیران هم سام همچنین شرکت سام الکترونیک و سامسونگ نمی باشد.</p>

                    <p>32 -این دستورالعمل در 32 بند تنظیم شده است و در کارگروه تخصصی کاربر اپلیکیشن هم سام   تصویب گردیده است.</p>
                    <p>33 -جوایز به افرادی تعلق می گیرد که پروفایل خود را تکمیل کرده باشند .</p>
                </div>
            </div>

        </div>
        <div :class="[yrules == 2 ? 'hvr' : '','accept']">قبول می کنم</div>
    </div>
</template>

<script>
    import IScroll from "../js/iscroll";
    import {ROAST_CONFIG} from '../config';

    export default {
        name: "rules",
        data() {
            return {
                URL: ROAST_CONFIG.url_Img_comp,
                showRules: false,
                myScroll: "",
                yrules: 1
            }

        },
        created() {
            this.$root.$on('show_rules', () => {
                this.showRules = true;


            });
            // this.scrollInit();

        },
        methods: {
            up() {
                if (this.yrules == 2) {
                    this.yrules = 1;
                } else if (this.yrules == 1) {
                    this.myScroll.moveUp(80);
                }


            },
            down() {

                if (this.myScroll.y !== this.myScroll.maxScrollY) {
                    this.myScroll.moveDown(80);
                    return true;

                } else {
                    this.yrules = 2;
                    return true;
                }
                return false;

            }, enter() {
                if (this.yrules == 2) {
                    this.showRules = false;
                    this.$root.$emit('hide_popup');
                    // this.myScroll.refresh();
                }

            }, back() {

                this.showRules = false;
            },
            scrollInit() {
                this.myScroll = '';
                if (this.myScroll == '') {
                    setTimeout(() => {
                        this.myScroll = new IScroll(".rulesTxt", {
                            scrollY: true,
                            scrollbars: "custom",
                            momentum: true,
                            preventDefault: false,
                            scrollbars: true,
                            mouseWheel: true,
                            interactiveScrollbars: true,
                            shrinkScrollbars: "none",
                            fadeScrollbars: false,
                            mouseMove: true
                        });
                    }, 10);
                }


            },

        }
    }
</script>

<style scoped>
    .rulesParent {
        background: rgba(246, 246, 246, 0.9);
        width: 1920px;
        height: 1080px;
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 111111;
    }

    .rulesPopup {
        width: 1665px;
        height: 785px;
        background: #FFFFFF;
        box-shadow: 0px -1px 20px rgba(0, 0, 0, 0.25);
        border-radius: 30px;
        position: absolute;
        top: 95px;
        left: 127px;
        z-index: 1;

    }

    .image {
        position: absolute;
        right: 0px;
        top: 0px;
    }

    .samsung {
        position: absolute;
        left: 30px;
        top: 40px;
    }

    .rulesTxt {
        width: 1125px;
        height: 590px;
        float: left;
        position: relative;
        top: 125px;
        left: 50px;
        overflow: hidden;
    }

    .rules {
        width: 1070px;
        position: absolute;
        left: 15px;
        font-size: 24px;
        line-height: 50px;
        color: #212121;
        direction: rtl;
        text-align: justify;

    }

    .accept {
        background-color: #c7c8ca;
        width: 250px;
        height: 80px;
        position: absolute;
        left: 130px;
        bottom: 70px;
        color: #fff;
        line-height: 80px;
        text-align: center;
        font-size: 28px;
        border-radius: 20px;
    }

    .hvr {
        background: #2F80ED !important;
        border: 1px solid #2F80ED !important;
        box-shadow: 0px 0px 22px rgba(47, 128, 237, 0.6) !important;
        color: #FFFFFF !important;
    }


</style>
