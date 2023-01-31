<template>
    <div>
        <news-list ref="listNews" :news="news" :next="next" :activeRoute="activeRoute"></news-list>
    </div>
</template>

<script>
    import NewsList from "../components/pageTwentyTwo/newsList";
    import api from "../api/news";
    import {ROAST_CONFIG} from "../config";

    export default {
        components: {
            NewsList
        },
        name: "twenty-two",
        data() {
            return {
                news: [],
                url: ROAST_CONFIG.url_Domain+'hamsam/pservice/api/v1/news/list',
                next: '',
                ID: '',
                activeRoute: 1,
                downDatas: {},
                number: '',
                Length: ''

            }
        },
        created() {
            api.newsList(this.url).then(data => {

                this.news = data["data"];
                this.next = data["links"]['next'];


            });


            this.$root.$on('moreNews' , ()=>{
                this.moreNews();
            });
        },
        methods: {
            up() {
                if (!this.$refs.listNews.up()) {

                }
            },
            down() {

                if( !this.$refs.listNews.down()){

                }


            },
            right() {
                if (!this.$refs.listNews.right()) {
                    this.activeRoute = 0;
                    this.$root.$emit('sideMenu_active');
                }
            },
            left() {
                if (!this.$refs.listNews.left()) {
                    this.activeRoute = 0;
                    this.$root.$emit('leftside_active');

                }
                // this.$refs.listNews.left();
            },
            enter() {


            },
            back() {
                this.$router.go(-1);
            },
            moreNews() {

                if (this.next != null) {

                    api.newsList(this.next).then(data => {

                        this.next = data["links"]['next'];
                        //  alert(this.next)

                        this.news = this.news.concat(data['data']);


                    });
                } else {


                }
            }

        }
    }
</script>

<style scoped>

</style>
