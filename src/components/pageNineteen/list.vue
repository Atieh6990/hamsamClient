<template>
    <div>
        <div class="cat-holder">


            <div v-for="(prs,indexPrs) in people"
                 :class="['catitem','maincat',(xpos==indexPrs&&activeRoute==1&&active==page && isCatActive==0?'prs-hover':'')]">
                <!--<div v-for="(cat, indexPrs) in categories"-->
                <div style="text-align: center">{{prs}}</div>
                <!--:class="['title',(indexPrs==selectedPerson?'select-prs':'')]"-->
                <!--  <div v-if="selectedPerson==indexPrs" class="rectangle" style="background-color:red;"></div>-->
                <div style="clear:both"></div>
                <div v-if="indexPrs==xpos && isCatActive==1">
                    <div v-for="(cat,index) in categories" style="font-weight: normal;"
                         :class="['catitem',(ypos==index&&activeRoute==1 &&active==page?'cat-hover':''),(selectedCat==cat['cat_id']&&xpos==selectedPerson?'':'')]">
                        <div :class="['title',(selectedCat==cat['id']&&xpos==selectedPerson?'title-hover':'')]"
                             style="margin-right:55px;">
                            <!--{{cat['cat_persion']}}-->
                            {{cat.name}}
                        </div>
                        <!--   <div v-if="selectedCat==cat['cat_id']&&xpos==selectedPerson" class="rectangle"></div>-->
                    </div>
                </div>
                <div style="clear:both"></div>
            </div>
            <!--<div class="line"></div>-->


        </div>


    </div>
</template>

<script>
    export default {
        name: "list",
        props: ['categories', 'selectedCat', 'activeRoute', 'selectedPerson', 'active', 'page'],
        data() {
            return {
                ypos: 0,  //daste bandi ha
                xpos: 0, //afrad
                people: ['همه اعضا', 'دوستان', 'من'],
                isCatActive: 1, //aya rooye liste dastebandie?
            }
        },
        created() {

        }, methods: {
            down() {
                // console.log('cat lenght->', this.categories.length + ',is active=>' + this.isCatActive);
                if (this.isCatActive == 0) {
                    if (this.xpos + 1 < this.people.length) {
                        this.xpos++;
                    }
                } else if (this.isCatActive == 1) {
                    if ((this.ypos + 1) < this.categories.length) {
                        this.ypos++;
                    } else if (((this.ypos + 1) >= this.categories.length) && (this.xpos + 1 < this.people.length)) {
                        this.isCatActive = 0;
                        this.xpos++;
                    }
                }

            }
            , up() {
                if (this.isCatActive == 0) {
                    if (this.xpos != 0) {
                        this.xpos--;
                    }
                } else if (this.isCatActive == 1) {
                    if (this.ypos > 0) {
                        this.ypos--;
                    } else if (this.ypos == 0) {
                        this.isCatActive = 0;
                        if (this.xpos != 0) {
                            // this.xpos--;
                        }
                    }
                }

            }, right() {

                return false
            }, left() {
                return false;
            }, enter() {
                if (this.isCatActive == 0) {
                    this.isCatActive = 1;
                    this.ypos = 0;
                    return {id: 1, xpos: this.xpos};
                } else {
                    // return [this.xpos, this.categories[this.ypos]['cat_id']];
                    return {id: this.categories[this.ypos].id, xpos: this.xpos};
                }

            }, back() {
                this.$router.go(-1);
            }, addOver() {

            },
        }
    }
</script>

<style scoped>
    .cat-holder {
        position: absolute;
        width: 248px;
        height: 904px;
        left: 1575px;
        top: 176px;
        border-radius: 2px;
        /*margin-right:30px;*/
        /*  border: 1px solid red;*/
    }

    .catitem {
        color: #4d4d4f;
        width: 248px;
        min-height: 54px;
        float: right;
        line-height: 54px;
        border-radius: 10px;
        Font-size: 24px;
        /*  Font-size: 26px;*/
        margin-bottom: 13px;
        text-align: right;
        /* background-color: red;*/
        /*  position: relative;*/
    }

    .maincat {
        font-size: 30px;
        font-weight: bold;
        color: #0455a5;
        border-radius: 10px;
    }

    .title {
        padding-right: 30px;
    }

    .rectangle {
        position: absolute;
        width: 54px;
        height: 3px;
        right: -26px;
        top: 25px;
        background-color: #3A4AB4;
        transform: rotate(90deg);
    }

    .title-hover {
        color: #fff;;
    }

    .cat-hover {
        /* background-color: #E3E6F9;*/
        background-color: #d7d7d7;
        border-radius: 10px;
        /* border:1px solid #d7d7d7;*/
    }

    .line {
        position: relative;
        width: 249px;
        height: 1px;
        margin: 26px 0px;
        background-color: #CDCDCD;
        transform: rotate(-180deg);
    }

    .prs-hover {
        background-color: #d7d7d7;
        /*border:2px solid #0455a5;*/
    }

    .prstitle-hover {
        color: #BB6BD9;
    }

    .select-prs {
        /* border: 2px solid #d7d7d7;*/
        border-width: 2px;
        border-color: rgb(204, 204, 204);
        border-style: solid;
        border-radius: 5px;
        background-color: rgb(235, 235, 235);

    }

    .select-category {
        background-color: #0455a5;
    }
</style>
