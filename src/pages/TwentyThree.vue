<template>
  <div>
    <forecast ref="forecast" :matches="matches" :meta="meta" :cat="matchCat"></forecast>
    <div v-if="showMsg" class="msg" :class="[status == true ? 'successColor':'errorColor']">{{msg}}</div>
  </div>

</template>

<script>
    import Forecast from "../components/pageTwentyThree/forecast";
    import {mapGetters} from 'vuex';
    import api from '../api/forecast'
    import {page} from 'vue-analytics'

    export default {
        components: {Forecast},
        name: "twenty-three",
        data() {
            return {
                userID: '',
                token: '',
                matches: [],
                datas: [],
                matchID: '',
                type: '',
                point: '',
                // stsPoint: '',
                msg: '',
                cancelMood: 0,
                forecast: '',
                showMsg: false,
                status: '',
                yforecast: '',
                tab: '',
                meta: [],
                ypos: '',
                xpage: '',
                prev: '',
                next: '',
                forecastUrl: 'http://ssn.tvapps.ir/hamsam/pservice/api/v1/forecast/forecastme',
                length: '',
                category: [],
                matchCat: {},
                dataUser: [],
                typeUser: '',
                rules: ''


            }
        },
        created() {
            this.getMatches();
        },
        methods: {
            ...mapGetters([
                'getUser'
            ]),
            up() {
                this.$refs.forecast.up();
            }, down() {
                this.$refs.forecast.down();
            }, left() {


                this.datas = this.$refs.forecast.left();
                this.yforecast = this.datas['ypos'];
                this.tab = this.datas['xtab'];

                if (this.yforecast == 1) {
                    // if (this.tab < this.length - 1) {
                    if (this.tab == 1) {
                        this.getMatches();
                    } else if (this.tab == 2) {
                        this.getForecastMe(this.forecastUrl);
                    }
                    // }
                }


            }, right() {


                this.datas = this.$refs.forecast.right();
                this.yforecast = this.datas['ypos'];
                this.tab = this.datas['xtab'];

                if (this.yforecast == 1) {

                    if (this.tab == 1) {
                        this.getMatches();
                        this.$refs.forecast.scrollInit();
                    } else if (this.tab == 2) {
                        this.getForecastMe(this.forecastUrl);
                    }

                }
            },
            enter() {

                this.datas = this.$refs.forecast.enter();
                this.matchID = this.datas['matchID'];
                this.type = this.datas['type'];
                this.point = this.datas['point'];
                // this.stsPoint = this.datas['stsPoint'];
                this.forecast = this.datas['forecast'];
                this.ypos = this.datas['ypos'];
                this.xpage = this.datas['xpage'];

                this.dataUser = this.getUser();
                this.rules = this.dataUser['rules'];
                this.typeUser = this.dataUser['type'];

                if (this.ypos == 2) {
                    if (this.rules == 0) {
                        this.$root.$emit('popup_rules');

                    } else {
                        if (this.typeUser == 0) {
                            this.$root.$emit('popup_signup');
                        } else {
                            if (this.forecast == 0) {
                                // if (!this.stsPoint) {
                                page({
                                    page: 'forecast',
                                    title: 'forecast'
                                })
                                api.registerForecast(this.matchID, this.type, this.point).then(data => {
                                    // console.log('data forecast------> ' + JSON.stringify(data));
                                    this.status = data['success'];
                                    this.msg = data['data']['msg'];
                                    this.showMsg = true;
                                    if (this.status == true) {
                                        this.getMatches();
                                        // this.cancelMood = 1;

                                    }

                                });

                                // } else {
                                //
                                // }

                            } else if (this.forecast == 1) {
                                page({
                                    page: 'cancel forecast',
                                    title: 'cancel forecast'
                                })
                                api.cancelForecast(this.matchID).then(data => {
                                    // console.log('data cancel------> ' + JSON.stringify(data));
                                    this.status = data['success'];
                                    this.msg = data['data']['msg'];
                                    this.showMsg = true;
                                    if (this.status == true) {
                                        this.getMatches();


                                    }

                                });


                            }
                            this.$root.$emit('refresh_list');
                            setTimeout(() => {
                                this.showMsg = false;
                            }, 3000);
                        }
                    }

                } else if (this.ypos == 3) {
                    if (this.xpage == 1 && this.prev != null) {

                        this.forecastUrl = this.prev;
                        this.getForecastMe(this.forecastUrl);

                    } else if (this.xpage == 2 && this.next != null) {

                        this.forecastUrl = this.next;
                        this.getForecastMe(this.forecastUrl);
                    }
                    this.$root.$emit('refresh_page');
                }


            },
            showNumber(number) {
                this.$refs.forecast.showNumber(number);
            },
            getMatches() {
                page({
                    page: 'matches of the forecast',
                    title: 'matches of the forecast'
                })
                this.matches = [];
                api.matches().then(data => {

                    var status = data['success'];
                    // if (status == true) {

                    this.matches = data['data']['matches'];
                    this.category = data['data']['categories'];
                    // console.log('***********   ====>' + JSON.stringify(this.matches))
                    for (let x in this.matches) {

                        this.matchCat[x] = this.category.filter(data => data['id'] == this.matches[x]['category_id']);


                    }
                    // console.log('x ------------------->' + JSON.stringify(this.matchCat))

                });
            },
            getForecastMe(url) {
                page({
                    page: 'my forecast',
                    title: 'my forecast'
                })
                this.matches = [];
                api.forecastMe(url).then(data => {

                    var status = data['success'];
                    if (status == true) {

                        this.matches = data['data']['matches'];
                        this.meta = data['meta']
                        this.prev = data['links']['prev'];
                        this.next = data['links']['next'];
                        // console.log('***********   ====>' + JSON.stringify(this.matches))


                    }
                });
            }, back() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
  .msg {
    width: 1534px;
    height: 40px;
    line-height: 40px;
    position: absolute;
    top: 245px;
    left: 180px;
    z-index: 11;
    font-size: 22px;
    text-align: center;

  }

  .successColor {
    color: #0ed964;
  }

  .errorColor {
    color: #e63a3a;
  }


</style>
