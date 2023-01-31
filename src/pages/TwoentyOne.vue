<template>
    <div class="page">

        <img :src="url_Img_page+ 'gameCenter/bg.jpg'" class="gameCenterPage">

        <userInfo :childWid="childWid" :def="def"></userInfo>
        <gameInfo v-if="type != 0" :gameData="gameData"></gameInfo>

        <games v-if="type == 0" :gameData="gameData" ref="games"></games>
        <category v-if="(type == 1) && (catData != '')" :catData="catData" ref="category"></category>
        <score v-if="(type == 2) && (scoreData != '')" :scoreData="scoreData" ref="score"></score>

    </div>
</template>

<script>
    import {ROAST_CONFIG} from '../config';
    import userInfo from '../components/gameCenter/userInfo'
    import games from '../components/gameCenter/games'
    import category from '../components/gameCenter/category'
    import score from '../components/gameCenter/score'
    import gameInfo from '../components/gameCenter/gameInfo'
    import notif from '../components/gameCenter/notification'

    export default {
        name: "twoenty-one",
        data() {
            return {
                imgURL: ROAST_CONFIG.URL_GAMECENTER,
                url_Img_page: ROAST_CONFIG.url_Img_page,
                def: this.$route.query.def,
                childWid: this.$route.query.childWid,
                gameData: this.$route.query.gameData,
                socket: this.$route.query.socket,
                type: 0,//0->games,1->category,2->score
                catData: '',
                scoreData: '',
                catNum: 0,
                scoreNum: 0
            }
        },
        created() {
            let _self = this
            this.socket.on("list categories", function (data) {//list game ha
                _self.catData = data
            });
            this.socket.on("list score", function (data) {//list game ha
                _self.scoreData = data
            });
            this.socket.on("respance create room", function (data) {//list game ha
            });
        },
        components: {
            userInfo, games, category, score, gameInfo
        },
        methods: {
            down() {
                if (this.type == 1) {
                    if (!this.$refs.category.down()) {

                    }
                } else if (this.type == 2) {
                    if (!this.$refs.score.down()) {

                    }
                }
            },
            up() {
                if (this.type == 1) {
                    if (!this.$refs.category.up()) {
                    }
                }
                if (this.type == 2) {
                    if (!this.$refs.score.up()) {
                    }
                }
            },
            right() {
                if (this.type == 2) {//score
                    if (!this.$refs.score.right()) {
                    }
                }
            },
            left() {
                if (this.type == 2) {//score
                    if (!this.$refs.score.left()) {
                    }
                }
            },
            enter() {
                //alert(this.type)
                if (this.type == 0) {//game
                    this.type = 1;
                    this.socket.emit('get list category', "" + this.$refs.games.enter() + "");
                } else if (this.type == 1) {//category
                    this.type = 2;
                    this.catNum = this.$refs.category.enter() + 1
                    this.socket.emit('get list score');
                } else if (this.type == 2) {//score

                    this.scoreNum = this.$refs.score.enter()
                    this.socket.emit('create room', 'ali', '' + this.scoreNum + '', '' + this.catNum + '');
                    this.$router.go(-1);
                    // let time = new Date().getTime();
                    // this.$router.push({path: '/twoelve/' + time});
                }
            },
            back() {

                if (this.type == 2) {
                    this.type = 1
                } else if (this.type == 1) {
                    this.type = 0
                } else if (this.type == 0) {
                    this.$router.go(-1);
                }
            }
        },
        mounted() {
            this.$root.$emit('sideMenu_hide');
            this.$root.$emit('header_hide');
            this.$root.$emit('leftside_hide');
        }
    }
</script>

<style scoped>
    .page {
        position: absolute;
        width: 1920px;
        height: 1080px;
        top: 0px;
        left: 0px;
    }

    .gameCenterPage {
        position: absolute;
        top: 0px;
        left: 0px;

    }


</style>