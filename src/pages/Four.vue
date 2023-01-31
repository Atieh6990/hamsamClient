<template>
    <div>
        <ChatList class="list" ref="chatList" :NextChatlist="NextChatlist" :page="ypos" :activeRoute="activeRoute"
                  active="1"
                  :datas="chatlist"></ChatList>
        <Message v-if="reciever != -1" :chatUserId="chatUserId" :reciever="reciever" class="message" ref="message" :activeRoute="activeRoute" :page="ypos" active="2" :datas="messageList" :reciverId="Reciverid"
                 :chats="chatlist" :chatListId="chatListId"
                 :des="description"></Message>
      <Bot v-if="reciever==-1" :chatUserId="chatUserId" :reciever="reciever" class="message" ref="message" :activeRoute="activeRoute" :page="ypos" active="2" :datas="messageList" :reciverId="Reciverid"
               :chats="chatlist" :chatListId="chatListId"
               :des="description"></Bot>
    </div>

</template>

<script>
    import ChatList from "./../components/Chat/ChatList";
    import Message from "./../components/Chat/Message";
    import Bot from "./../components/Chat/Bot";
    import chatApi from "./../api/chat";
    import {mapGetters} from "vuex";
    import {page} from 'vue-analytics'
    export default {
        name: "four", components: {ChatList, Message,Bot}, data() {
            return {
                ypos: 1,
                userId: 0,
                chatlist: [],
                messageList: [],
                activeRoute: 1,
                reciever: this.$route.query.reciever,
                // reciever: "255991",
                description: '',
                Reciverid: "",
                NextChatlist: [],
                chatListId: "",
                chatUserId:""
            };
        }, activated() {

            // if(this.chatlist.length == 0){
            //
            //     this.$root.$emit('sideMenu_active');
            //     this.activeRoute = 1;
            // }
        }, created() {
            /*  if(this.reciever==undefined ){

              }*/

            this.userId = this.getUser().userID;
            var _this = this
            chatApi.chatList().then(data => {
              //  console.log("chat 11111111111111111111111111", data);
                if (data["success"] == true) {
                    // this.description = data["description2"]
                    if (this.reciever != undefined) {

                        var user={
                            "id": this.reciever,
                            "username": ""
                        }
                        if(this.reciever==-1){
                          user={
                            "id": this.reciever,
                            "username": "بات همسام",
                            "pic":"http://ssn.tvapps.ir/alt2/ssn/images/avatar/hamsaaam.png"
                          }
                        }
                        const pmData = {
                            "user": user,
                            "id": 0,

                            "message": "",
                            "sticker_id": 0,
                            "status": 0,


                        };
                        _this.chatlist.push(pmData)
                        _this.chatUserId = this.chatlist[0]["user"]["id"]
                        for (var i = 0; i < data["data"].length; i++) {
                            _this.chatlist.push(data["data"][i])
                        }
                        _this.NextChatlist = null;

                    }else{
                        _this.chatlist = data["data"];
                        _this.NextChatlist = data["links"]["next"];
                        if(this.chatlist.length > 0){
                            _this.enterChatList(this.chatlist[0]["id"],this.chatlist[0]["user"]["id"]);
                        }

                    }

                    if (!_this.chatlist[0]) {
                        this.description = "شما پیامی برای نمایش ندارید . "
                    }

                  //  console.log("chat cntttttttttttttttttttttttttttttttttttttt", this.chatlist);
                    if(this.chatlist.length > 0) {
                        this.Reciverid = _this.chatlist[0]["user"]["id"]
                    }
                    _this.ypos = 2;
                  /*  if (_this.chatlist.length == 0) {
                        _this.$root.$emit('sideMenu_active');
                        _this.activeRoute = 1;
                    }*/
                }
              //  console.log("chatApi", _this.chatlist);
            });


            //   if (typeof this.reciever != 'undefined') {

            // }
        }, methods: {
            ...mapGetters(["getUser"]), up() {

                switch (this.ypos) {
                    case 1:
                        if (!this.$refs.chatList.up()) { // right menu

                        }
                        break;
                    case 2:
                        if (!this.$refs.message.up()) {

                        }
                        break;
                }
            }, lastPm(data) {
                this.$refs.message.lastPm(data)
            }, down() {
                switch (this.ypos) {
                    case 1:
                        if (!this.$refs.chatList.down()) { // right menu

                        }
                        break;
                    case 2:
                        if (!this.$refs.message.down()) {

                        }
                        break;
                }

            }, right() {

                switch (this.ypos) {
                    case 1:
                        if (!this.$refs.chatList.right()) { // right menu
                            this.removeOverR();
                        }
                        break;
                    case 2:
                        if (!this.$refs.message.right()) {
                            if (this.chatlist.length > 0) {
                                this.ypos--;
                            } else {
                                this.removeOverR();
                            }

                        } else {

                        }

                        break;
                }
            }, left() {

                switch (this.ypos) {
                    case 1:
                        if (!this.$refs.chatList.left()) this.ypos++;
                        break;
                    case 2:
                        if (!this.$refs.message.left()) { //left menu
this.removeOverL()
                        }

                        break;

                }

            }, enter() {
                switch (this.ypos) {
                    case 1:
                        page({
                            page:   "select chat pm",
                            title:  "select chat pm"
                        })
                        this.listPos = this.$refs.chatList.enter();
                        this.Reciverid = this.chatlist[this.listPos]["user"]["id"]
                        const id = this.chatlist[this.listPos]["id"];

                        this.enterChatList(id,this.chatlist[this.listPos]["user"]["id"]);
                        break;
                    case 2:
                        this.$refs.message.enter();
                        break;
                }
            }, back() {

                if (this.chatlist.length == 0) {
                    this.addOver()
                    this.$router.go(-1);
                    return false
                } else {
                    this.$refs.message.cleanIv();
                    switch (this.ypos) {
                        case 1:
                            this.$refs.chatList.back();
                            break;
                        case 2:
                            this.$refs.message.back();
                            break;


                    }
                }


            }, done() {
                switch (this.ypos) {
                    case 2:
                        this.$refs.message.done();
                        break;


                }
            },
            cancel() {
                switch (this.ypos) {
                    case 2:
                        this.$refs.message.cancel();
                        break;


                }
            },
            enterChatList(id,userId) {
                this.chatListId = id
                this.chatUserId = userId
                const data = chatApi.pmList(id).then(data => {
                    this.messageList = data;

                    //console.log("data =>", data);
                });

            }, removeOverL() {
                this.activeRoute = 0
                this.$root.$emit('leftside_active');
            }, addOver() {
                this.$root.$emit('sideMenu_deactive');
                this.activeRoute = 1;
            }, removeOverR() {
                this.activeRoute = 0;
                this.$root.$emit("sideMenu_active");
            }, addOver() {
                this.$root.$emit('sideMenu_deactive');
                this.activeRoute = 1;
            },

        }
    };
</script>

<style scoped>
    .list {
        position: absolute;
        left: 1334px;
        top: 83px;
    }

    .message {
        position: absolute;
        left: 86px;
        top: 83px;
        direction: rtl;
    }
</style>
