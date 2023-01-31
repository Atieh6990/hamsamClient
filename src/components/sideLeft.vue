<template>
    <div v-show="show" class="leftside">
        <div class="holder">
            <div class="line"></div>

            <template v-for="(item,index) in items">
                <div v-if="(index != xpos || active==0)&& notifpos != index ">
                    <div :class="item">
                        <img :src="imgUrl+item+'.png?'">
                    </div>
                    <div :class="item" style="z-index: 2;">
                        <img :src="imgUrl+item+'-over.png?'">
                        <div v-if=" getnotifications()[itemCount[index]] && getnotifications()[itemCount[index]]>0"
                             class="counter">{{getnotifications()[itemCount[index]] +'+'}}
                        </div>
                    </div>
                </div>
                <!-- <div v-if="active==1">-->
                <div :class="[item,'title-holder','box']"
                     :style="{'min-width':(getnotifications()[itemCount[index]]>0?(widthBox[index]*2.0)+'px':widthBox[index]+'px'),'z-index':'3','left':'11px'}"
                     :z="widthBox[index]" v-if="(active==1 && index==xpos ) || notifpos==index">
                    <img style="float:left;margin-top: 3px;"
                         :src="imgUrl+item+'-select.png?'">
                    <div class="title">
                        <span style="font-weight: bold;">{{names[index]}}</span>
                        <span v-if="getnotifications()[itemCount[index]] && getnotifications()[itemCount[index]]>0">{{'  |  '+getnotifications()[itemCount[index]]+names[index]+' جدید'}}</span>
                    </div>
                </div>
                <!--   </div>-->

            </template>

        </div>

    </div>

</template>

<script>
    import {mapMutations} from 'vuex'
    import {mapGetters} from 'vuex'
    import {page} from 'vue-analytics'
    import {ROAST_CONFIG} from '../config';

    export default {
        name: "side-left",
        data() {
            return {
                show: 1,
                active: 0,
                items: ['hamsampms', 'requests', 'friends', 'pms'],
                itemCount: ['msg1', 'friendreq', 'like', 'msg'],
                names: ['از من بپرس', 'درخواست دوستی', 'دوست', 'پیام'],
                xpos: 0,
                widthBox: ['145', '200', '125', '108'],
                routes: ['/four/', '/five/', '/five/', '/four/'],
                notifpos: -1,
                routeName: ["Four", "Five", "Five", "Four"],
                imgUrl:ROAST_CONFIG.url_Img_server+'leftside/'
            }
        },
        created() {
            this.$root.$on('save_notif', (data) => {
                // alert('save notif');
                // console.log('dataaaaaaaa->' + (data));

                // console.log('boefoooooooooore=?'+(this.getnotifications()));
                //console.log('seeeeeeeeeeeeeeeeeeeeeeeeet');
                this.setnotifications(JSON.parse(data));
                // console.log('afterrrrrr=?'+((this.getnotifications())));
                // console.log('tk=?'+(this.getnotifications()['tk']));
                // console.log('get user'+this.getUser());
            });
            //console.log('tk=?'+(this.getnotifications()['tk']));
            this.$root.$on('leftside_show', () => {
                this.show = 1
            });

            this.$root.$on('notif_pos', (pos) => {
                this.notifpos = pos
                setTimeout(() => {
                    this.notifpos = -1
                }, 3000);

            });
            this.$root.$on('leftside_active', () => {
                this.active = 1
            });
            this.$root.$on('leftside_deactive', () => {
                this.active = 0
            });
            this.$root.$on('leftside_hide', () => {
                this.show = 0
            });
            /* console.log('ffffffffffffffff->' + this.getnotifications()['request_count']);
             console.log('ffffffffffffffff->' + this.getnotifications()['friend_count']);
             console.log('ffffffffffffffff->' + this.getnotifications()['unread_count']);
             console.log('ffffffffffffffff->' + this.getnotifications()[(this.itemCount[0])] + ',' + this.itemCount[0]);
             console.log('ffffffffffffffff->' + this.getnotifications()[(this.itemCount[1])] + ',' + this.itemCount[1]);
             console.log('ffffffffffffffff->' + this.getnotifications()[(this.itemCount[2])] + ',' + this.itemCount[2]);*/
        }, methods: {
            ...mapMutations([
                'setnotifications'
            ]),
            ...mapGetters([
                'getnotifications',
                'getUser',
                'getCurrentPage'
            ])
            , up() {
                if (this.xpos != 0) {
                    this.xpos--;
                }

            }, down() {
                if (this.xpos + 1 < this.items.length) {
                    this.xpos++;
                }
            }, right() {
                // console.log('right');
                this.active = 0;

            }, left() {
                //alert('left');
            }, enter() {
                if (this.getCurrentPage() != this.routeName[this.xpos]) {
                    page({
                        page: this.items[this.xpos] + 'left menue',
                        title: this.items[this.xpos] + 'left menue'
                    })
                    if (this.xpos != 0) {
                        this.$router.push({path: this.routes[this.xpos] + new Date().getTime()});
                    } else if (this.xpos == 0) {

                        var time = new Date().getTime()
                        this.$router.push({
                            path: '/four/' + time,
                            // query: {'appID': this.appID, 'version': this.version, 'year': this.year, 'pkgID': this.pkgID}reciever
                            query: {'reciever': ROAST_CONFIG.hamsmUserId}
                        });
                    }
                }
                this.active = 0;
            }, back() {
                this.active = 0;
            }
        }
    }
</script>

<style scoped>
    .leftside {
        position: absolute;
        top: 0px;
        left: 0px;
        height: 1080px;
        width: 64px;
        /* border: 1px solid red;*/
    }

    .requests {
        position: absolute;
        left: 20px;
        bottom: 146.97px;
        /* border: 1px solid green;*/
    }

    .friends {
        position: absolute;
        left: 20px;
        bottom: 84.97px;
        /*  border: 1px solid blue;*/
    }

    .pms {
        position: absolute;
        left: 23px;
        bottom: 27.97px;
        /*  border: 1px solid black;*/
    }

    .hamsampms {
        position: absolute;
        left: 23px;
        bottom: 208.97px;
    }

    .holder {
        position: relative;
        height: 1080px;
        width: 64px;
    }

    .item {
        z-index: 1;
        /*position:absolute;*/
    }

    .line {

        position: absolute;
        width: 36px;
        height: 2px;
        left: 20px;
        bottom: 275.97px;

        background-color: #D0D0D0;
    }

    .counter {
        position: absolute;
        width: 20.07px;
        height: 20.07px;
        right: -8px;
        top: -2px;
        border-radius: 50%;
        background: #4B0D85;
        font-size: 12px;

        color: #FFFFFF;
    }

    .title-holder {
        /* width: 500px;*/
        line-height: 47px;

        color: #FFFFFF;
        background-color: #9B51E0;
        border-radius: 10px;
        padding-right: 14px;
        padding-left: 9px;
    }

    .box {
        height: 47px;
    }

    .title {
        float: right;
        text-align: right;
        Font-size: 18px;
    }

</style>
