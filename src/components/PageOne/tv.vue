<template>

    <div>
        <div class="tv">
            <div v-bind:class=" [activeRoute==1 && xActive==xPage && yActive== yPage && xpos==0 ? 'border' : '','player']">


            </div>
            <div class="chanles">

                <div v-if="i<5" v-for="(chanle , i) in chanles"
                     v-bind:class=" [i!=0  ? 'margin-top' : '',activeRoute==1 && xActive==xPage && yActive== yPage &&xpos==1 &&ypos==i  ? 'active' : '','chanle']">

                    {{chanle.channelName}}
                </div>


            </div>
        </div>

    </div>
</template>
<script>

    import {page} from 'vue-analytics'
    export default {
        components: {},
        mounted: function () {

        }, created() {
//alert(10)
            this.loadChannel();

           // this.openTv(188, 85, 472, 351)
        }, activated(){
            this.openTv(188, 85, 472, 351)
        },deactivated(){
//console.log("6666666666666666666666666666666666666666666666666666666666666",to)
           this.hideTv()
        }
        , props: ['xActive', 'yActive', 'yPage', 'xPage', 'activeRoute'], data() {
            return {
                chanles: [],
                xpos: 0,
                ypos: 0,
                zPos: ""
            };

        }, methods: {

            loadChannel() {
                try {

                    tizen.tvchannel.getChannelList(this.successhannelList, null, "ALL", 0, 100);


                } catch (error) {

                }

            }, successhannelList(channels) {
                this.chanles=channels
              //  console.log(channels)
                // channels[i].major
                //channels[i].channelName
            }, hideTv() {
        //  alert("hideTv")
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

            }, openTv(xpos, ypos, width, height) {
          //    alert("open")
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
                            // log(text);

                            // console.log(text)

                        },
                        function (fail) {
                            var text = 'tizen.tvwindow.show BEHIND Error : ' + JSON.stringify(error);
                            // log(text);

                            //   console.log(text)
                        },
                        [xpos + 'px', ypos + 'px', width + 'px', height + 'px'],
                        'MAIN',
                        _this.zPos
                    );
                } catch (error) {

                }
            },
            down() {
                if (this.xpos == 0) {
                    return false
                } else {
                    if (this.ypos < 4) {
                        this.ypos++
                        return true
                    } else {
                        return false
                    }
                }


            },
            up() {
//alert(this.ypos)
                if (this.ypos == 0) {
                    return false
                } else {
                    if (this.ypos != 0) {
                        this.ypos--
                        return true
                    } else {
                        return false
                    }
                }

            },
            right() {
                if (this.xpos == 0) {
                    return false
                } else {
                    this.xpos--
                    return true
                }


            }, left() {
                if (this.xpos == 1) {
                    return false
                } else {
                    this.xpos++
                    return true
                }

            }, enter() {
                if (this.xpos == 0) {
                    page({
                        page: 'full tv p1',
                        title: 'full tv p1'
                    })
                    let time = new Date().getTime();
                    this.$router.push({path: '/Thirteen/'+ time });

                    //bozorgnamaii
                } else {
                    page({
                        page: 'tv channel '  +this.ypos+ ' p1',
                        title: 'tv channel '  +this.ypos+  ' p1'
                    })
                    tizen.tvchannel.tune({major: this.chanles[this.ypos].major}, {onsuccess: function () {
                       //    console.log("Tune() is successfully done. And there is a signal.");
                        },
                        onnosignal: function () {
                       //  console.log("Tune() is successfully done. But there is no signal.");
                        }});
                }


            },channelUp(){
                page({
                    page: 'chnnel up p1',
                    title: 'chnnel up p1'
                })
              //  alert("tv" )
                var tuneCB = {
                    onsuccess: function () {
                        var channel = tizen.tvchannel.getCurrentChannel();

                    },
                    onnosignal: function () {
                        // console.log("tuneDown() is successfully done. But there is no signal.");
                    }
                };

                try {
                    // change the channel down according to 'ALL' navigation mode.
                    tizen.tvchannel.tuneUp(tuneCB, null, "ALL");
                } catch (error) {
                    //  console.log("Error name = " + error.name + ", Error message = " + error.message);
                }
            },channelDown(){
                page({
                    page: 'chnnel down p1',
                    title: 'chnnel down p1'
                })
                var tuneCB = {
                    onsuccess: function () {
                        var channel = tizen.tvchannel.getCurrentChannel();

                    },
                    onnosignal: function () {
                        // console.log("tuneDown() is successfully done. But there is no signal.");
                    }
                };

                try {
                    // change the channel down according to 'ALL' navigation mode.
                    tizen.tvchannel.tuneDown(tuneCB, null, "ALL");
                } catch (error) {
                    //  console.log("Error name = " + error.name + ", Error message = " + error.message);
                }
            }
        }, watch: {}
    };

</script>

<style scoped>
    .tv {
        position: absolute;
        left: 88px;
        top: 83px;
        width: 582px;
        height: 352px;

    }

    .player {
        border: 3px transparent;
        position: absolute;
        width: 471.85px;
        height: 351.41px;
        right: 7px;
        top: -1px;
       /* background: #000;*/
        /* border-radius: 10px; */
        overflow: hidden;
    }

    .chanles {
        width: 86px;
        position: absolute;
        left: 0px;
        top: 0px;
        height: 352px;
    }

    .chanle {
        position: relative;
        width: 85.95px;
        height: 50px;
        line-height: 50px;
        margin-left: 0px;
        font-size: 15px;
        color: #4d4d4f;
        background: #FFFBFB;
        box-shadow: 0px 4px 15px rgba(124, 124, 124, 0.25);
        border-radius: 5px;
    }

    .margin-top {
        margin-top: 25px;
    }

    .border {
        border: 3px solid #F95858 !important
    }

    @keyframes active {
        0% {

            -webkit-transform:  scale(1);
            transform:  scale(1);
        }
        50% {
            -webkit-transform: scale(1.1);
            transform:  scale(1.1);
        }
        100% {
            -webkit-transform:  scale(1.1);
            transform:  scale(1.1);
        }
    }

    .active {
        /* background: #727272 !important;
         color: white  !important;*/
        /*display: inline-block;*/
        vertical-align: middle;
        /*-webkit-transform: perspective(1px) translateZ(0);*/
        /*transform: perspective(1px) translateZ(0);*/
        -webkit-animation-name: hvr-bob-float, active;
        animation-name: hvr-bob-float, active;
        -webkit-animation-duration: .3s, 1.5s;
        animation-duration: .3s, 1.5s;
        /*-webkit-animation-delay: 0s, .3s;*/
        /*animation-delay: 0s, .3s;*/
        -webkit-animation-timing-function: ease-out, ease-in-out;
        animation-timing-function: ease-out, ease-in-out;
        -webkit-animation-iteration-count: 1, infinite;
        /*animation-iteration-count: 1, infinite;*/
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
        -webkit-animation-direction: normal, alternate;
        animation-direction: normal, alternate;
        border: 3px solid #F95858 !important;
        z-index: 10;
        /*  box-shadow: 0 0 1px rgba(0, 0, 0, 0);*/

    }

</style>
