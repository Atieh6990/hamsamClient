<template>
  <div id="two">
    <div class="appsParent">

      <side-list :items="cat" :active="1" :page="xpage" ref="sideList" :activeRoute="activeRoute"></side-list>
      <app-list :app-list="finalApps" :active="2" :page="xpage" ref="appList" :cat="ycat"
                :activeRoute="activeRoute"></app-list>
      <div v-if="showApp" class="txtApp">در این دسته بندی اپلیکیشنی وجود ندارد.</div>

    </div>
  </div>


</template>

<script>
    import {mapGetters} from 'vuex';
    import api from '../api/apps'
    import challenge from '../api/challenge'
    import sideList from '../components/pageTwo/sideList'
    import appList from "../components/pageTwo/appsList";
    import {page} from 'vue-analytics'
    import {ROAST_CONFIG} from "../config";

    export default {
        name: 'two',

        data() {
            return {
                active: 1,
                xpage: 1, // 1: category list , 2: app list
                cat: ['همه برنامه ها'],
                apps: [],
                filterApps: [],
                finalApps: [],
                activeRoute: 1,
                xpos: '',
                userID: '',
                info: [],
                year: '',
                old: '',
                pkgID: '',
                appID: '',
                cats: [],
                ycat: '',
                showText: '',
                url: ROAST_CONFIG.url_Domain + 'hamsam/pservice/api/v1/application/list',
                next: '',
                showApp: false


            }

        },
        created() {

            this.info = this.getTvDetail();
            this.year = this.info['year'];
            this.old = this.info['isOld'];
            api.apps(this.url, this.year, this.old, this.ycat).then(data => {

                this.apps = data['data'];
                this.finalApps = this.apps;
                this.cats = data['categories'];
                this.next = data['links']['next'];

                for (let i = 0; i < this.cats.length; i++) {
                    this.cat.push(this.cats[i]['name']);


                }

            });

            this.$root.$on('moreApps', () => {
                this.moreApps();
            });

        },
        components: {
            appList,
            sideList,

        }, methods: {
            ...mapGetters([
                'getTvDetail'
            ]),
            up() {
                if (this.xpage == 1) {
                    if (!this.$refs.sideList.up()) {

                    }
                } else if (this.xpage == 2) {
                    this.$refs.appList.up();
                }


            }, down() {

                if (this.xpage == 1) {
                    this.$refs.sideList.down();
                } else if (this.xpage == 2) {
                    this.$refs.appList.down();
                }
            }, right() {

                if (this.xpage == 1) {
                    this.activeRoute = 0;
                    this.$root.$emit('sideMenu_active');

                } else if (this.xpage == 2) {

                    if (!this.$refs.appList.right()) {
                        this.xpage = 1;

                    } else {

                    }

                }
            }, left() {
                if (this.xpage == 1) {
                    this.xpage = 2;
                } else if (this.xpage == 2) {
                    if (!this.$refs.appList.left()) {
                        this.activeRoute = 0;
                        this.$root.$emit('leftside_active');

                    }
                }

            }, enter() {
                // alert(this.xpage + ' ' + this.ycat);
                // this.showApp = false;
                let time = new Date().getTime();
                if (this.xpage == 1) {
                    this.ycat = this.$refs.sideList.enter();
                    this.$root.$emit('refresh_list');

                    if (this.ycat == 0) {

                        page({
                            page: 'view all of the apps',
                            title: 'view all of the apps'
                        });

                    } else {
                        page({
                            page: 'view different category of the apps',
                            title: 'view different category of the apps'
                        });

                    }


                    // this.filterApps = this.apps.filter(data => data['category_id'] == this.ycat);
                    // this.finalApps = this.filterApps;

                    api.apps(this.url, this.year, this.old, this.ycat).then(data => {
                        this.apps = data['data'];
                        this.finalApps = this.apps;
                        this.next = data['links']['next'];

                        if (this.finalApps.length == 0) {
                            this.showApp = true;
                        } else {
                            this.showApp = false;
                        }


                    });


                } else if (this.xpage == 2) {
                    this.datas = this.$refs.appList.enter();
                    this.xpos = this.datas['xpos'];
                    this.pkgID = this.datas['packageID'];
                    this.appID = this.datas['appID'];


                    if (this.xpos == 1) {
                        page({
                            page: 'open app',
                            title: 'open app'
                        })
                        this.openApp(this.pkgID, this.appID);

                    } else if (this.xpos == 2) {
                        page({
                            page: 'app detail',
                            title: 'app detail'
                        })

                        this.$router.push({
                            path: '/twentyFour/' + time,
                            query: {'appID': this.appID, 'pkgID': this.pkgID}
                        });
                    }
                }

            }, openApp(pkg, ID) {

                var show = this;

                tizen.application.launch(
                    pkg,
                    function () {
                        challenge.challengeApp(36, ID).then(data => {

                            if (data["success"] = true) {


                            } else {

                            }
                        });
                        show.text = 'Success';
                        show.$root.$emit('hide_dl');


                    }, function (error) {

                        show.text = 'Error : ' + JSON.stringify(error);
                        show.$root.$emit('show_dl');


                    });
                setTimeout(function () {
                    show.$root.$emit('hide_dl');
                }, 5000);
            },
            back() {
                this.$router.go(-1);
            },

            moreApps() {

                if (this.next != null) {
                    api.apps(this.next, this.year, this.old, this.ycat).then(data => {

                        this.apps = this.apps.concat(data['data']);
                        this.finalApps = this.apps;
                        this.next = data["links"]['next'];

                    });
                } else {


                }
            }


        }
    };
</script>
<style scoped>

  .appsParent {
    width: 1680px;
    height: 990px;
    position: absolute;
    left: 127px;
    top: 66.21px;

  }

  .txtApp {
    width: 100%;
    height: 50px;
    color: #000;
    text-align: center;
    font-size: 25px;
    direction: rtl;
    position: absolute;
    top: 400px;
  }


</style>
