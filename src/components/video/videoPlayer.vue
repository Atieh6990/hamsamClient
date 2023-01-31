<template>
  <div class="videoParent">

    <object v-if="url != '' && osType == 1" id="av-player" type="application/avplayer" class="playBox"></object>

  </div>
</template>

<script>

import Player from "../../js/player"



export default {
  name: "player",
  data() {
    return {
      Player: "",
      // url:"https://content.jwplatform.com/manifests/vM7nH0Kl.m3u8",
      url: "http://92.42.50.29/PLTV/88888888/224/3221226614/index.m3u8?rrsip=92.42.50.29&zoneoffset=0&devkbps=462-3000&servicetype=1&icpid=&accounttype=1&limitflux=-1&limitdur=-1&tenantId=9805&accountinfo=Xrt3KWcoCI5FlXhu5Zv8JxQnVoci7noamwPvHTQ6SQVrjR7xZ7nipIwU5pQG2f%2Bq%2BLz9EbXMj63mpUXJp%2FZIaRvnmpBPEQUyO0R0FdMse4cLPyll2NC5rjL0Q3a2xsb1SI7KHdCxszTDM7fXkNro04RcSWuBLLH0De9WBPjgyJ8%3D%3A20211207150049%3AUTC%2C10001007206428%2C77.81.151.194%2C20211207150049%2Curn%3AHuawei%3AliveTV%3AXTV100000922%2C10001007206428%2C-1%2C0%2C1%2C%2C%2C2%2C%2C%2C%2C2%2C10000506368856%2C0%2C10500006361944%2C384af8f5386e59cb%2C%2C%2C1%2C1%2CEND&GuardEncType=2&it=H4sIAAAAAAAAADWOyw7CIBRE_4YlAUotXbDSmJiYamJ1a27hFhtpqVBN_Hutj8VsZuZMZopgcLPS3ArWSM4ky6VsRdbYUkmwBZeZWhgDJOGtCloQA953g6uCnbHTYXnmjArBqWCzSD0Prj04zT7d6t43GHX-Bw8YH51BbVNLH5AoOBfRwdSFge49PI_R_yoE6_-5RaaUKsuyYIKTaXZrSNd3Qi6QlqEfIaLdBvcBdAs-IRnBXMFhBT3q4e79l9tF-37zAmu9M432AAAA",
      // url:"http://92.42.50.29/PLTV/88888888/224/3221226614/index.m3u8?rrsip=92.42.50.29&zoneoffset=0&devkbps=462-3000&servicetype=1&icpid=&accounttype=1&limitflux=-1&limitdur=-1&tenantId=9805&accountinfo=Xrt3KWcoCI5FlXhu5Zv8JxQnVoci7noamwPvHTQ6SQVrjR7xZ7nipIwU5pQG2f%2Bq%2BLz9EbXMj63mpUXJp%2FZIaRvnmpBPEQUyO0R0FdMse4cLPyll2NC5rjL0Q3a2xsb1SI7KHdCxszTDM7fXkNro04RcSWuBLLH0De9WBPjgyJ8%3D%3A20211207150049%3AUTC%2C10001007206428%2C77.81.151.194%2C20211207150049%2Curn%3AHuawei%3AliveTV%3AXTV100000922%2C10001007206428%2C-1%2C0%2C1%2C%2C%2C2%2C%2C%2C%2C2%2C10000506368856%2C0%2C10500006361944%2C384af8f5386e59cb%2C%2C%2C1%2C1%2CEND&GuardEncType=2&it=H4sIAAAAAAAAADWOyw7CIBRE_4YlAUotXbDSmJiYamJ1a27hFhtpqVBN_Hutj8VsZuZMZopgcLPS3ArWSM4ky6VsRdbYUkmwBZeZWhgDJOGtCloQA953g6uCnbHTYXnmjArBqWCzSD0Prj04zT7d6t43GHX-Bw8YH51BbVNLH5AoOBfRwdSFge49PI_R_yoE6_-5RaaUKsuyYIKTaXZrSNd3Qi6QlqEfIaLdBvcBdAs-IRnBXMFhBT3q4e79l9tF-37zAmu9M432AAAA",
      playerObj: "",
      osType: 1
    }
  },
  created() {

    // if (this.osType == 0) {
    let _self = this
    setTimeout(()=>{
      // console.log("videoPaly created")
      _self.playVideo()
    },1000)

    // }

  },
  beforeDestroy: function () {
    // console.log("beforeDestroy !!!")
    this.playerObj.stop();
    this.playerObj.closeVideo();
  },
  deactivated: function () {
    // console.log("beforeDestroy !!!")
    this.playerObj.stop();
    this.playerObj.closeVideo();
  },
  methods: {
    playVideo() {
      let _self = this
      if (this.osType == 1) {//tizen
        this.playerObj = new Player.VideoPlayer(0);//this.channel 104->aiofilm , 100->aiotoon
        this.playerObj.open(this.url);
        this.playerObj.play();
      } else {
        setTimeout(function () {
          window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'playVideo',
            data: {video: _self.url, poster: ''}
          }))
        }, 200);
      }
      ;
    },

    stop() {
      this.playerObj.stop();
    }
  }
}
</script>

<style scoped>
.videoParent {
  position: absolute;
  width: 1920px;
  height: 1080px;
  top: 0px;
  left: 0px;
  z-index: 10;
  border: 1px solid transparent;
}

.playBox {
  position: absolute;
  width: 1920px;
  height: 1080px;
  top: 0px;
  left: 0px;
}
</style>
