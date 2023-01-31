<template>
  <div>
    <div class="soosk"></div>
    <div class="tag">
      <div dir="ltr" class="tag-time">
        <!--{{this.timer}}-->
        <div class="numbers" style="right: 185px;">{{days}} :</div>
        <div class="numbers" style="right: 130px;">{{hours}} :</div>
        <div class="numbers" style="right: 75px;">{{minutes}} :</div>
        <div class="numbers" style="right: 27px;">{{seconds}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Countdown from 'vuejs-countdown-timer'

  export default {
    props: ['time', 'start'],
    name: "counter",
    data() {
      return {
        timer: 0,
        days: '',
        hours: '',
        minutes: '',
        seconds: '',
          interval:""
      }
    },
    created() {
      this.timer = this.countdown();
    },
    components: {Countdown},
    methods: {
      countdown() {

        var _self = this;
          clearInterval( this.interval);
          this.interval = setInterval(function () {

          var now = new Date().getTime();
          var distance = _self.time - (now / 1000);

          var days = (distance / (60 * 60 * 24));
          var hours = ((distance % (60 * 60 * 24)) / (60 * 60));
          var minutes = ((distance % (60 * 60)) / 60);
          var seconds = (distance % 60);

          _self.days = parseInt(days);
          _self.hours = parseInt(hours);
          _self.minutes = parseInt(minutes);
          _self.seconds = parseInt(seconds);

          if (_self.days < 10)
            _self.days = '0'+_self.days;
          if (_self.hours < 10)
            _self.hours = '0'+_self.hours;
          if (_self.minutes < 10)
            _self.minutes = '0'+_self.minutes;
          if (_self.seconds < 10)
            _self.seconds = '0'+_self.seconds;

            if (distance < 0) {
              clearInterval(_self.interval);
            }
        }, 1000);
      }
    }, activated(){

          if(this.days!=""){
              this.timer = this.countdown();
          }

      },deactivated(){
          clearInterval( this.interval);
      }
  }
</script>

<style scoped>
  .tag {
    position: absolute;
    width: 261px;
    height: 57px;
    background: #FC4A1A;
    opacity: 0.8;
    border-radius: 0px 24.5px 24.5px 0px;
    box-shadow: 0px 4px 23px rgba(0, 0, 0, 0.8);
    z-index: 2
  }

  .tag-time {
    width: 300px;
    color: #fff;
    font-size: 30px;
    /*font-weight: bolder;*/
    top: -2px;
    right: -10px;
    line-height: 70px;
    position: absolute;
  }

  .numbers {
    /*opacity: .5;*/
    /*background-color: grey;*/
    text-align: center;
    position: absolute;
    width: 75px;
  }

  .soosk {
    position: absolute;
    width: 25px;
    height: 57px;
    top: -7px;
    right: 259px;
    background: #FC4A1A;
    opacity: 0.8;
    box-shadow: 0px 4px 23px rgba(0, 0, 0, 0.4);
    border-radius: 10px 0px 0px 10px;
    z-index: 2
  }
</style>
