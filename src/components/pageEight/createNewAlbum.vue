<template>
    <div>
        <div class="blur"></div>
        <div class="box">
            <div class="name" :class="[(xpos == 0 ? 'hover':'')]">
                <input class="nameInpt" name="albumName" id="albumName" placeholder="نام آلبوم را وارد کنید"
                       v-model="albumName"/>
            </div>
            <div class="btn" :class="[(xpos == 1 ? 'hover':'')]">ثبت</div>
            <div class="msg">{{msg}}</div>
        </div>
    </div>
</template>

<script>

    import func from '../../mixins/func'
    import api from '../../api/userAlbum'

    export default {
        name: "creat-new-album",
        mixins: [func],
        data() {
            return {
                xpos: 0,
                albumName: '',
                msg: ''
            }
        },
        methods: {

            left() {
                this.xpos = 1
                this.hideIme('albumName')
            },
            right() {
                this.xpos = 0
            },
            enter() {
                if (this.xpos == 0) {
                    this.showIme('albumName');
                } else if (this.xpos == 1) {//album sakhtebeshe
                    api.albumCreate(this.albumName).then(data => {
                        if (data.success == true) {
                            this.hideIme('albumName')
                            this.$root.$emit('update_pic_list');
                        } else {
                            this.msg = data['data']['message']['title'][0]
                        }

                    })
                }

            },
            hideAllIme(){
                this.hideIme('albumName');
            },
            done(){
                this.hideIme('albumName');
            },
            cancel(){
                this.hideIme('albumName');
            }
        }
    }
</script>

<style scoped>
    .blur {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        background-color: rgba(246, 246, 246, 0.9);
    }

    .msg {
        position: absolute;
        top: 148px;
        left: 722px;
        width: 500px;
        height: 50px;
        font-size: 20px;
        color: darkred;
        line-height: 50px;
        direction: rtl;
              text-align: right;

    }

    .box {
        position: absolute;
        width: 1300px;
        height: 215px;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        background: #FFFFFF;
        box-shadow: 0px -1px 20px rgba(0, 0, 0, 0.25);
        border-radius: 30px 30px 30px 30px;
    }

    .name {
        border: 3px solid #BCBCBC;
        width: 600px;
        height: 62px;
        border-radius: 20px;
        box-shadow: 0px 0px 21px rgba(187, 107, 217, 0.32);
        background: #FFFFFF;
        position: absolute;
        top: 70px;
        left: 620px;
    }

    .nameInpt {
        margin-right: 14px;
        line-height: 60px;
        float: right;
        width: 90%;
        height: 60px;
        /* top: 60px; */
        border: 0px;
        direction: rtl;
        font-size: 24px;
    }

    .btn {
        line-height: 62px;
        width: 214.62px;
        height: 62px;
        font-size: 24px;
        border-radius: 10px;
        border: 3px solid #BCBCBC;
        background: #FFFFFF;
        box-shadow: 0px 0px 21px rgba(187, 107, 217, 0.32);
        position: absolute;
        color: rgb(155, 81, 224);
        left: 220px;
        top: 70px;
        text-align: center;
    }

    .hover {
        box-shadow: 0px 0px 21px rgba(45, 156, 219, 0.7);
        border: 3px solid #2D9CDB;
    }
</style>