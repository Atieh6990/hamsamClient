<template>
    <div class="wrapper">

        <div class="chat-box">
            <img class="icon" src="../../assets/images/chat/chat.png"/>
            <div class="chatListParent">
                <div class="line"></div>
                <div v-for="(data , index) in chatlist" v-if=" index + perpage > ypos"
                     :class="[((page == active && ypos==index && activeRoute==1) ? 'active':''),'item']">
                    <img :src="data['user']['pic']" alt="" class="avatar">
                    <div class="family">{{ data["user"]["username"] }}</div>
                    <div class="last-message">{{ data["message"] }}</div>
                    <div class="line-list"></div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {ROAST_CONFIG} from "../../config";
    import chatApi from "./../../api/chat";
    export default {
        watch: {
            datas: function (val, oldVal) {
                this.chatlist=this.datas
            },  NextChatlist: function (val, oldVal) {
                this.NextChatlistP=this.NextChatlist
            },
        },
        data() {
            return {
                ypos: 0, baseImg: ROAST_CONFIG.URL_IMAGE, perpage: 9,NextChatlistP:"",chatlist:[]
            };
        }, created() {

        }, props: ["page", "active", "datas", "activeRoute","NextChatlist"], methods: {
            up() {
                if (this.ypos > 0) {
                    this.ypos--;
                }
            }, down() {
                var _this=this
                if (this.ypos < this.chatlist.length - 1) {
                    this.ypos++;

//console.log("this.ypossssssssssssssssssssssssssssssssssss",this.ypos)
                  //  console.log("this.NextChatlistPpppppppppppppppppppppppppppppppppppp",this.NextChatlistP)

                }else if(this.NextChatlistP !=null && this.NextChatlistP !="null"){
                    chatApi.ChatListLazyLoad(this.NextChatlist).then(data => {
                        if (data["success"] == true) {
                            for(var i=0; i<data["data"].length;i++){
                             //   console.log("ddddddddd")
                                _this.chatlist.push(data["data"][i]);
                            }


                            _this.NextChatlistP=data["links"]["next"];
                        }

                    })
                }

            }, right() {

                return false;
            }, left() {
                return false;
            }, enter() {
                return this.ypos;
            },back(){
                this.$router.go(-1);
            }
        }

    };
</script>

<style scoped>
    .wrapper {
        width: 508px;
        height: 978px;
        background: #FFFFFF;
        border: 2px solid #CCCCCC;
        border-radius: 10px;
        overflow: hidden;
    }

    .chat-box {
        position: absolute;
        width: 61px;
        height: 61px;
        left: 13px;
        top: 15px;
        background: #2D9CDB;
        box-shadow: 0px 4px 18px rgba(45, 156, 219, 0.44);
        border-radius: 10px;
    }

    .icon {
        margin: 14px 12px
    }

    .line {
        width: 481.01px;
        height: 0px;
        position: absolute;
        left: 0px;
        border: 1px solid #C0C0C0;
    }

    .chatListParent {
        width: 509px;
        height: 885px;
        position: absolute;
        left: 0px;
        overflow: hidden;


    }

    .item {
        position: relative;
        width: 509px;
        height: 88px;
        padding-top: 10px;
        overflow: hidden;
        right: 25px;
        transition: all 0.5s;
    }

    .avatar {
        position: absolute;
        right: 15px;
        width: 72.52px;
        height: 72.52px;
        border-radius: 50%;
        box-shadow: 0px 0px 10px #ccc;
    }

    .family {
        position: absolute;
        height: 31px;
        line-height: normal;
        font-size: 18px;
        text-align: right;
        color: #000000;
        right: 102px;
    }

    .last-message {
        position: absolute;
        right: 102px;
        height: 31px;
        bottom: 10px;
        line-height: normal;
        font-size: 18px;
        text-align: right;
        color: #A4A4A4;
        direction: rtl;
    }

    .item.active {
        background: #D1EBFA;
    }

    .line-list {
        position: absolute;
        bottom: 0px;
        width: 481.01px;
        height: 0px;
        margin-left: 26px;
        margin-top: 13.2px;
        border: 1px solid #E7E7E7;

    }
</style>
