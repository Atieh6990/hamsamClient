<template>
    <div class="wrapper">
        <div :class="[(xpos == 4 && activeRoute==1)?'activeContent':'', 'content']">
            <div id="scroller" class="chat">

                <div v-if="botData[0]" v-for="(data , index) in botData">
                    <div  v-if="(pms[index-1]) && (index > 0)" class="parent-box">


                        <img :class="['self', 'avatar']"
                             :src="(pic )  "/>
                        <div :class="['self', 'pm-box']">
                            <div v-html="pms[index-1]"></div>
<!--                            <div :class="['self','date']">{{ data["timeHumans"] }}</div>-->
                        </div>
                    </div>

                  <div v-if="botData[index]" class="parent-box">


                    <img :class="['other', 'avatar']"
                         :src="(pic )  "/>
                    <div :class="['other', 'pm-box']">
                      <div v-html="botData[index]['text']"></div>

                      <div style="width: 100%;float: right;margin-top: 10px">

                    <div style="padding: 10px;
    background: blue;
    color: white;
    border-radius: 10px;
    position: relative;float: left;margin: 10px" v-for="(button,index) in botData[index]['button']">  <span >  {{ button }} </span> <span  style="direction: rtl"> - {{ index+1 }} </span></div>
                      </div>
                      <!--                            <div :class="['self','date']">{{ data["timeHumans"] }}</div>-->
                    </div>
                  </div>




                </div>

            </div>

        </div>
        <div :class="[((keyboard) ? 'message-box-active':''),'message-items']">
            <div class="message-box">
                <input id="msg" v-model="message" placeholder="پیامتان را بنویسید"
                       :class="[((page == active && xpos==1 && activeRoute==1) ? 'active':''),'item']" class="text-box"/>
<!--                <img :class="[((page == active && xpos==2 && activeRoute==1) ? 'active':''),'stickers']"-->
<!--                     src="../../assets/images/chat/sticker.png" alt="">-->
            </div>
            <div :class="[((page == active && xpos==3 && activeRoute==1) ? 'active':''),'btn-send']">
                <img src="../../assets/images/chat/Vector.png" alt="" class="img-send">
            </div>
        </div>
        <div v-if="chats.length == 0" class="msgTxt">{{des}}</div>
    </div>
</template>

<script>
    import {ROAST_CONFIG} from "../../config";
    import {mapGetters} from "vuex";
    import IScroll from "../../js/iscroll";
    import chatApi from "./../../api/chat";
    import func from "../../mixins/func";
    import {page} from 'vue-analytics'
    // require( "../../js/iscroll" );
    export default {

        data() {
            return {
                xpos: 1,
                keyboard: false,
                baseImg: ROAST_CONFIG.URL_IMAGE,
                userId: 0,
                myScroll: "",
                pic: "",
                message: "",
                iv: '',
                massageList:[],
                NextUrl:"",
                once:true,
                list:[],
                senderUserId:"",
              botData:[{
                "chatid": "0",
                "text": "لطفا سوال خود را از همسام بپرسید.",
                "button": []
              }],pms:[],time:""



            };
        }, props: ["page", "active", "datas", "chats", "des","reciverId","chatListId","activeRoute","reciever","chatUserId"],
        created() {

          var d = new Date();
         this.time = d.getTime();

          //  console.log("creatmassageListtttttttttttttttttttttt",this.datas)

            this.userId = this.getUser().userID;
            this.pic = this.getUser().picture;

            setTimeout(() => {
                this.scrollInit();
            }, 200);

        }, mixins: [func],
      watch: {
            // datas: function (val, oldVal) {
            //
            //     if(this.chats["id"]!=0){
            //         this.once=false
            //      //   console.log("datsssssbiaaaaaaaaaaaaaa",this.datas)
            //         this.massageList=this.datas["data"];
            //         this.list=this.datas["data"]
            //         this.NextUrl=this.datas["links"]["next"]
            //         // this.setIntervalPm();
            //       //  console.log("massageListtttttttttttttttttttttt",this.massageList)
            //       //  console.log("this.listttttttttttttttttttttttttttttttttttttttt",this.list)
            //         setTimeout(() => {
            //             this.myScroll.refresh();
            //             this.myScroll.scrollTo(0, this.myScroll.maxScrollY, 0);
            //         }, 1);
            //     }
            //     //data["links"]["next"];
            //
            // }
        }, methods: {
            ...mapGetters(["getUser"]),
            up() {

                if (this.xpos < 4) {
                    this.xpos = 4;

                } else if (this.xpos === 4) {

                    this.myScroll.moveUp(80);

                    if (this.myScroll.y === 0) {

                    //    if (this.NextUrl ==null || this.NextUrl =="null") return false;
                        //alert(this.datas["page"])
                        const height = this.myScroll.maxScrollY;
                        var _this=this

                      setTimeout(() => {
                        _this.myScroll.refresh();
                        _this.myScroll.scrollTo(0, _this.myScroll.maxScrollY - height, 0);

                      }, 1);


                      }
                        // if (height != 0) {
                        // if(this.NextUrl!=null && this.NextUrl!="null"){
                        //     chatApi.PMLazyLoad(this.chatListId,this.NextUrl).then(data => {
                        //       //  console.log("PMLazyLoaddddddddddddddmassageList",_this.massageList)
                        //        // console.log("PMLazyLoadddddddddddddddata",data)
                        //         _this.massageList=_this.list.reverse()
                        //       //  console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[",(data["data"].length)-1)
                        //
                        //
                        //         for(var i = parseInt(data["data"].length-1); i > 0  ; i--){
                        //
                        //          //   console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiii",data["data"][i])
                        //             _this.massageList.push(data["data"][i]);
                        //         }
                        //         _this.massageList=_this.list.reverse()
                        //       //  console.log("PMLazyLpushhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",_this.massageList)
                        //         _this.NextUrl=data["links"]["next"]
                        //         setTimeout(() => {
                        //             _this.myScroll.refresh();
                        //             _this.myScroll.scrollTo(0, _this.myScroll.maxScrollY - height, 0);
                        //
                        //         }, 1);
                        //     })
                        // }


                        // }

                    }
                }

           , down() {
                if (this.xpos === 4) {
                    if (this.myScroll.y !== this.myScroll.maxScrollY) {
                        this.myScroll.moveDown(80);
                    } else {
                        this.xpos = 1;
                    }

                }
            }, right() {
                if (this.xpos === 4) { //scroll
                    this.xpos = 1;
                    return false;
                }
                if (this.xpos > 1) {
                  if(this.xpos==3){//paresh az sticer
                    this.xpos=1
                  }else{
                    this.xpos--;
                  }


                    return true;
                }
                return false;
            }, left() {
                if (this.xpos < 3) {
                  if(this.xpos==1){//paresh az sticer
                    this.xpos=3
                  }else{
                    this.xpos++;
                  }

                    return true;
                }
                return false;
            }, enter() {
                switch (this.xpos) {
                    case 1:

                      var typeUser = this.getUser().type;
                      var rules = this.getUser().rules;
                      if(typeUser!=0 && rules!=0){
                        this.keyboard = true;
                      }

                        this.showIme("msg");
                      //  console.log(' this.keyboard  enter after ->' + this.keyboard)
                        break;
                    case 3:
                        page({
                            page:   "send pm",
                            title:  "send pm"
                        })
                      var massages = this.message
                      if(this.message==""){ return }
                      if(this.message==0){
                          massages="بازگشت"
                                         }

                      if((this.botData[this.pms.length]["button"]) != 0){
                        if((typeof parseInt(this.message)) == "number" ){
                            if((this.botData[this.pms.length]["button"].length >= parseInt(this.message)) && (parseInt(this.message)>0) ){
                             // alert(this.botData[this.pms.length]["button"][parseInt(this.message)])
                              console.log("eeeeeeeeeeeeeeeeeeeee",this.botData[this.pms.length]["button"])
                              massages = this.botData[this.pms.length]["button"][parseInt(this.message)-1]
                                    }
                        }


                        }
                    // alert(massages)
                      this.insertBot(massages)
                       // this.insertPm(this.message);
                        break;

                }

            }, back() {
               // alert(this.xpos)
                switch (this.xpos) {
                    case 1:
                        if (this.keyboard == true) {
                            this.keyboard = false;
                            this.hideIme("msg");
                           // console.log('return  this.keyboard    ->' + this.keyboard)
                        } else {
                            this.$router.go(-1);
                        }

                        break;
                    default:

                        this.$router.go(-1);


                        break;


                }


            }, done() {
                this.keyboard = false;
                this.hideIme("msg");
            },
            cancel() {
                this.keyboard = false;
                this.hideIme("msg");
            },
        ObjSize(obj){
          var size = 0, key;
          for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
          }
          return size;
        },


    // Get the size of an object

        scrollInit() {
                this.myScroll = new IScroll(".content", {
                    scrollY: true,
                    scrollbars: "custom",
                    momentum: true,
                    preventDefault: false,
                    scrollbars: true,
                    mouseWheel: true,
                    interactiveScrollbars: true,
                    shrinkScrollbars: "none",
                    fadeScrollbars: false,
                    mouseMove: true
                });
            }, insertBot(pm) {
var _this=this
                if (pm == "") return false;



                chatApi.insertBot(pm,this.time).then(data => {
                 console.log(data)
              if (!data[0][0]) return false;

               //   console.log(data0.length)
                //  var size = ObjSize(data[0]);
                  if(this.ObjSize(data[0])==14){
                   var question=data[0][9]
               //     alert(question)
                    var button=[]
                    for(var i =0; i< data.length  ; i++){
                      button = [...button,data[i][3]]
                    }
                  }else {
                    var button=[]
                    var question=data[0][6]
                  }

                  let dataGet={
                    "chatid": "0",
                    "text": question,
                    "button": button
                  }
                  this.botData = [...this.botData,dataGet]
                  this.pms=[...this.pms,pm]
                  console.log(this.botData)
                  console.log(this.pms)
         //     this.message = "";
              //if(data[0][0].length==14)
              // const user={
              //     "pic": this.pic,
              //     "username": 0
              // }
              //       const pmData = {
              //           "user": user,
              //           "id": 0,
              //           "image":null,
              //           "message": pm,
              //           "self": 1,
              //           "status": pm,
              //           "sticker": 0,
              //           "time": 0,
              //           "timeHumans": "1 ثانیه پیش",
              //
              //       };
              //     _this.massageList.push(pmData);
                  console.log("pmmm",pm)
                  setTimeout(() => {
                    this.myScroll.refresh();
                    this.myScroll.scrollTo(0, this.myScroll.maxScrollY, 0);
                    this.message=""
                  }, 1);


                });


            }, SowlastPm(data){

                this.message = "";
                const user={
                    "pic": data["user"]["pic"],
                    "username": 0
                }
                const pmData = {
                    "user": user,
                    "id": 0,
                    "image":null,
                    "message": data["message"],
                    "self": 0,
                    "status": data["status"],
                    "sticker": 0,
                    "time": 0,
                    "timeHumans": data["timeHumans"],

                };
                this.massageList.push(pmData);

                setTimeout(() => {
                    this.myScroll.refresh();
                    this.myScroll.scrollTo(0, this.myScroll.maxScrollY, 0);
                }, 1);
            }
//         lastPm(data){
// //alert("dd")
//               //  console.log("6666666666666666666666666666666666666666666666666----------------------------------",data["chat"]["id"],this.chatListId,data["self"],data["chat"]["user"],this.getUser().userID,data["chat"]["user_id"],parseInt(this.chatUserId))
//                 if((data["chat"]["id"]==this.chatListId && data["self"]!=1)||( data["chat"]["user"]== this.getUser().userID&& parseInt(data["chat"]["user_id"]) == parseInt(this.chatUserId) &&  data["self"]!=1)){
//                     this.SowlastPm(data);
//                 }
//             }
            /*,lastPm(lastPm) {
                chatApi.lastPm(this.userId, this.datas["reciever_id"], lastPm).then(data => {
                   // console.log("lastPm", data);
                    if (data["status"] !== "ok") return false;
                    if (data["chat"].length === 0) return false;
                    this.datas["chat"].push(data["chat"]);
                    setTimeout(() => {
                        this.myScroll.refresh();
                        this.myScroll.scrollTo(0, this.myScroll.maxScrollY, 0);
                    }, 1);
                });
            }, setIntervalPm() {
                clearInterval(this.iv);
                this.iv = setInterval(() => {
                    this.lastPm(this.getLastReceiverPm);
                }, 6000);
            }*/, cleanIv() {

                clearInterval(this.iv);
            }
        }, computed: {
           /* getLastReceiverPm() {
                if (!this.datas["chat"]) return -1;
                const filterReceiver = this.datas["chat"].filter((value, index) => {
                    return value["sender"] === this.datas["reciever_id"];
                });
                return (filterReceiver.length > 0 ? filterReceiver[filterReceiver.length - 1]["id"] : -1);
            }*/
        }
    };
</script>

<style scoped>
    .wrapper {
        width: 1236px;
        height: 978px;
        background: #F0F0F0;
        border: 2px solid #CCCCCC;
        border-radius: 10px;
    }

    .message-box {
        position: absolute;
        width: 1079px;
        height: 61px;
        left: 148px;
        top: 0px;
        background: #FFFFFF;
        border: 1px solid #C2C2C2;
        border-radius: 10px;
        transition: all 0.5s;
    }

    .message-items {
        position: absolute;
        width: 100%;
        height: 75px;
        left: 0px;
        top: 903px;
        background: #F0F0F0;
        transition: all 0.5s;
    }

    .btn-send {
        position: absolute;
        width: 128px;
        height: 61px;
        left: 12px;
        top: 0px;
        background: #2F80ED;
        box-shadow: 0px 4px 4px rgba(187, 107, 217, 0.25);
        border-radius: 10px;
        transition: all 0.5s;
    }

    .img-send {
        width: 35px;
        height: 35px;
        margin-top: 14px;
        margin-left: 42px;
        margin-right: 51px;
    }

    .text-box {
        position: absolute;
        right: 5px;
        top: 2px;
        width: 1071px;
        height: 55px;
        border: transparent;
        text-align: right;
        direction: rtl;
        font-size: 20px;
        transition: all 0.5s;
    }

    .text-box:focus {
        border: transparent;
    }

    .stickers {
        position: absolute;
        left: 8px;
        top: 11px;
        transition: all 0.5s;
        border-radius: 50%;
    }

    *:focus {
        outline: none;
    }

    .active {
        box-shadow: 0px 0px 20px #2F80ED;
    }

    .message-box-active {
        top: 400px;
    }

    .pm-box {
        width: 895px;
        min-height: 88px;
        border: 1px solid #C6C6C6;
        box-sizing: border-box;
        font-size: 18px;
        line-height: 42px;
        direction: rtl;
        padding: 0px 10px;
        color: #000;
        overflow: hidden;
    }

    .self {
        float: right;
    }

    .other {
        float: left;
    }

    .pm-box.self {
        background: #99DEF4;
        border-radius: 20px 20px 0px 20px;
        margin-right: 31px;
        text-align: right;

    }

    .pm-box.other {
        background: #EAEAEA;
        border-radius: 20px 20px 20px 0px;
        margin-left: 31px;
        text-align: left;

    }

    .parent-box {
        float: right;
        width: 100%;
        margin-top: 32px;
    }

    .avatar {
        width: 71.16px;
        height: 71.16px;
        margin-top: 8px;
    }

    .avatar.self {
        margin-right: 25px;
    }

    .avatar.other {
        margin-left: 25px;
    }

    .date.self {
        float: left;
    }

    .date.other {
        float: right;
    }

    .date {
        color: #6A6A6A;
        font-size: 18px;
    }

    .content {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 1236px;
        height: 890px;
        overflow: hidden;
    }

    #scroller {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 1236px;
        margin-bottom: 10px;
    }

    .activeContent.content {
        box-shadow: 0px 0px 20px #2F80ED;
    }

    .msgTxt {
        width: 100%;
        position: absolute;
        top: 180px;
        color: #000;
        font-size: 22px;
    }
</style>
