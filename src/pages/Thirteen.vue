<template>
    <div>

        <div class="tvBack" >


            <div v-bind:class=" [activeRoute==1 && Page ==0 ? 'border' : '','tv']" > </div>

            <tvDetail v-if="chanles[0]"  :chanles="chanles" :Active="1"  :activeRoute="activeRoute"  :Page="Page" ref="tvDetail">

            </tvDetail>
            <div class="Title">
                برنامه های پیشنهادی
            </div>
        <SugestedProgram class="Parent-filickty" :programs="apps" :xActive="0" :yActive="2" :activeRoute="activeRoute" :yPage="Page" :xPage="0" ref="SugestedProgram">

        </SugestedProgram>

    </div>  </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import SugestedProgram from '../components/PageOne/SuggestedPrograms'
    import tvDetail from '../components/Thirteen/tvDetail'
    import api from '../api/apps';
    import {page} from 'vue-analytics'



    export default {
        name: "thirteen",
        data() {
            return {
                chanles:[],activeRoute:1,Active:0,Page:0,apps:[]
            }
        }, components: {
            SugestedProgram, tvDetail
        }, created() {
            this.info = this.getTvDetail();
            this.year = this.info['year'];
            this.old = this.info['isOld'];


            api.topApps(this.year, this.old).then(data => {


                this.apps = data['data'];
                //console.log('this.apps ==>' + JSON.stringify(this.apps))
                // this_.$emit('init', Flickity);


            });

        },
        activated() {

            this.openTv(535, 78, 770, 502)

        }, deactivated() {
            this.hideTv()
        },
        methods: {
            ...mapGetters([
                'getTvDetail'
            ]),
            loadChannel() {
                try {

                    tizen.tvchannel.getChannelList(this.successhannelList, null, "ALL", 0, 100);


                } catch (error) {

                }

            },
         openTv(xpos, ypos, width, height) {
             if (window.screen.width != 1920) {
                 xpos = Math.round((window.screen.width * xpos) / 1920)
                 ypos = Math.round((window.screen.height * ypos) / 1080)
                 width = Math.round((window.screen.width * width) / 1920)
                 height = Math.round((window.screen.height * height) / 1080)
                 // xpos, ypos, width, height
                 // Math.round(x)


             }

            var _this = this

            this.zPos = "FRONT";
            try {
                tizen.tvwindow.show(
                    function (success) {
                        var text = 'tizen.tvwindow.show BEHIND Success';


                           // var channel = tizen.tvchannel.getCurrentChannel();
                            //  alert(channel)
                        _this.loadChannel();



                    },
                    function (fail) {
                        var text = 'tizen.tvwindow.show BEHIND Error : ' + JSON.stringify(error);

                    },
                    [xpos + 'px', ypos + 'px', width + 'px', height + 'px'],
                    'MAIN',
                    _this.zPos
                );
            } catch (error) {

            }
        }, successhannelList(channels) {
                this.chanles=channels.reverse()

               // console.log("pouria1111111111111111111111111111111111111111111111111111111111111111111111",channels)
                // channels[i].major
                //channels[i].channelName
            },hideTv() {
                //   alert()
                try {
                    tizen.tvwindow.hide(
                        function (success) {
                            //    console.log('success');
                        },
                        function (fail) {
                            //  console.log('fail');
                        }
                    );
                } catch (error) {

                }

            }, enter() {
                if(this.Page==0){
                    page({
                        page:   "full tv tv middle",
                        title:  "full tv tv middle"
                    })
                    let time = new Date().getTime();
                    this.$router.push({path: '/Three/'+ time });
                }
                else  if(this.Page==1){

                    this.$refs.tvDetail.enter()
                } else  if(this.Page==2){
                    this.$refs.SugestedProgram.enter()
                }


            }, up() {
                if(this.Page!=0){
                    this.Page--

                }

            },
            down() {
                if(this.Page!=2){
                    this.Page++

                }
            }   ,
            right() {
                if(this.Page==1){
                    if (!this.$refs.tvDetail.right()) {
                        this.removeOverR()
                    }

                }else if(this.Page==2){
                    if (!this.$refs.SugestedProgram.right()) {
                        this.removeOverR()
                    }

                }
            },left() {
                if(this.Page==1){
                    if (!this.$refs.tvDetail.left()) {
                        this.removeOverL()
                    }

                }else if(this.Page==2){
                    if (!this.$refs.SugestedProgram.left()) {
                        this.removeOverL()
                    }

                }
            }, removeOverR() {
            this.activeRoute = 0
            this.$root.$emit('sideMenu_active');
        }, removeOverL() {
                this.activeRoute = 0
                this.$root.$emit('leftside_active');

        },
            back() {
                this.$router.go(-1);
            }

}    }
</script>

<style scoped>
    .Title {
        position: absolute;
        height: 31px;
        right: 6px;
        top: 806.47px;
        line-height: normal;
        font-size: 18px;
        color: #A9A9A9;

    }
    .Parent-filickty {

        top: 848px;
        height: 162px;
        width: 1754px;
        position: absolute;
        right: -4px;

    }
    .tvBack{
        position: absolute;
        width: 1756.03px;
        height: 507.66px;
        left: 85.97px;
        top: 73.89px;

        background: #464646;
    }
.tv{
    position: absolute;
    width: 770px;
    height: 502px;
    left: 446.25px;
    top: 1px;
}
    .border {
        border: 3px solid #F95858 !important
    }

</style>