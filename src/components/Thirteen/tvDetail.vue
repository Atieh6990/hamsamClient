<template>

    <div class="Parent-filickty">
        <div class="Title">
          شبکه های سیما
        </div>
        <div v-if="chanles[0]" class="">
            <flickity class="flickity suggestedProgram" ref="flickity" :options="flickityOptions">
                <div v-for="(chanle, index) in  chanles"
                     v-bind:class="[xpos==index && activeRoute==1 && Page== Active ? 'active' : '',xpos == chanles.length-1&& activeRoute==1  ? 'ml--33' : '',xpos == 0&& activeRoute==1   ? 'ml-0' : '','carousel-cell']"
                     :key="index">

                    {{chanle.channelName}}
                </div>


            </flickity>
        </div>

    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import Flickity from 'vue-flickity';
    import api from '../../api/apps';
    import {ROAST_CONFIG} from '../../config';
    import {page} from 'vue-analytics'
    export default {
        props: ['chanles', 'Active', 'activeRoute', 'Page'],
        components: {
            Flickity
        },
        mounted: function () {

        },created() {
          //  console.log("pouriaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",this.chanles)

            /*  this.flickityOptions.initialIndex=this.apps['apps'].length-1
              this.xpos=this.apps['apps'].length-1
  */

            this.flickityOptions.initialIndex=this.chanles.length-1
            this.xpos= this.chanles.length-1

            // console.log("ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt",this.apps)

        }, data() {
            return {
                num: 0
                ,imgAdrs: ROAST_CONFIG.URL_IMAGE3+"ssn/images/apps/",
                flickityOptions: {


                    pageDots: false,

                    accessibility: false,
                    contain: true,
                    draggable: false,
                    freeScroll: false,
                    adaptiveHeight: true,


                    // any options from Flickity can be used
                }, xpos: 0, apps : []



            };

        }, methods: {
            ...mapGetters([
                'getUser', 'getTvDetail'
            ]),
            next() {
                //   console.log( this.$refs.flickity.$flickity.prevButton.isEnabled)
                //     console.log( this.$refs.flickity.$flickity.nextButton.isEnabled)

                this.$refs.flickity.next();

            },

            previous() {

                this.$refs.flickity.previous();
            },
            right() {
                if (this.$refs.flickity.$flickity.nextButton.isEnabled) {
                    this.next();
                    this.xpos++
                    return true
                } else {

                    return false
                }


            }, left() {

                if (this.$refs.flickity.$flickity.prevButton.isEnabled) {

                    this.previous();
                    this.xpos--
                    return true
                } else {
                    return false
                }


            }, up() {
                return false;
            }, down() {
                return false;
            },enter(){
                page({
                    page:   "channel " +this.xpos +" tv middle",
                    title:  "channel " +this.xpos +" tv middle"
                })
                tizen.tvchannel.tune({major: this.chanles[this.xpos].major}, {onsuccess: function () {
                        //    console.log("Tune() is successfully done. And there is a signal.");
                    },
                    onnosignal: function () {
                        //  console.log("Tune() is successfully done. But there is no signal.");
                    }});
            }
        }, watch: {
            active: function () {

            }
        }
    };

</script>

<style scoped>
    .active.ml-0 {
        margin-left: 0px !important;
    }

    .active.ml--33 {
        margin-left: -33px !important;
    }

    .flickity {
        height: 162px;
    }

    .off {

        width: 276.59px !important;
        height: 121.96px !important;
        float: left !important;
        margin-left: 8px !important;
        text-align: center !important;
        line-height: 122px !important;
        background: #FFFFFF !important;
        border: 1px solid rgba(207, 207, 207, 0.5) !important;
        box-sizing: border-box !important;
        box-shadow: 0px 0px 18px rgba(66, 65, 67, 0.16) !important;
        border-radius: 20px !important;
        margin-top: 7px !important;
    }

    .Title {
        position: absolute;
        height: 31px;
        /* right: 86px; */
        top: -45px;
        line-height: normal;
        font-size: 18px;
        color: #a9a9a9;

    }
    .Parent-filickty {

        top: 640px;
        height: 162px;
        width: 1754px;
        position: absolute;
        right: 0px;

    }

    .carousel-cell {
        position: relative;
        width: 276.59px;
        height: 121.96px;
        float: right;
        margin-right: 8px;
        text-align: center;
        line-height: 122px;
        background: #FFFFFF;
        border: 1px solid rgba(207, 207, 207, 0.5);
        box-sizing: border-box;
        box-shadow: 0px 0px 18px rgba(66, 65, 67, 0.16);
        border-radius: 20px;
        margin-top: 7px;

    }

    .img {
        vertical-align: middle;
        max-height: 100px;
    }

    .flickity {
        width: 100%;
    }

    .flickity-button-icon {

    }

    .flickity-viewport {
        height: 100% !important;
    }

    @keyframes is-selected {
        0% {
            -webkit-transform: translateY(0px);
            transform: translateY(0px);
        }
        50% {
            -webkit-transform: translateY(10px);
            transform: translateY(10px);
        }
        100% {
            -webkit-transform: translateY(0px);
            transform: translateY(0px);
        }
    }

    .active {

        /*display: inline-block;*/
        vertical-align: middle;
        /*-webkit-transform: perspective(1px) translateZ(0);*/
        /*transform: perspective(1px) translateZ(0);*/
        -webkit-animation-name: hvr-bob-float, is-selected;
        animation-name: hvr-bob-float, is-selected;
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

        /*  box-shadow: 0 0 1px rgba(0, 0, 0, 0);*/
    }

    .carousel-cell.active {
        background: linear-gradient(180deg,#919192,#fff);
        border: 2px solid #555;
        box-sizing: border-box;
        box-shadow: 0px 0px 18px rgba(66, 65, 67, 0.16);
        border-radius: 20px;
        width: 308.46px;
        height: 136.01px;
        margin-right: -8px;
        z-index: 1;
        margin-top: 0px;
    }

    .flickity-button {

    }


</style>
