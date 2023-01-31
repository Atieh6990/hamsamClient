<template>

  <div v-if=isActive class="c-timer">
    <div class="c-timebar">
      <div class="c-timebar__background"></div>

      <transition name="move" enter-active-class="add" leave-active-class="lose">
        <div class="c-timebar__remaining" v-bind:style="{width: progress+'px'}"></div>
      </transition>
    </div>
  </div>
</template>

<script>
    export default {
        name: "timer",
        data: function () {
            return {
                isActive: true,
                timeoutId: -1,
                transitionBarWithStyle: {},
                duration: 10000, // default,
                progress: 940,
                editProgress: 94,
                intval: '',
                time: 1000
            }
        },

        created() {


            this.$root.$on('start-timer', function (time) {
                // self.start(time);
            });
            this.$root.$on('start-cancel', function (time) {
                //   self.cancel();
            })

            this.startTime()

        },
        mounted() {
        },

        methods: {
            increaseTime() {
                clearInterval(this.intval);
                this.progress = this.progress + this.editProgress;
             //   console.log('increase ?  '+ this.progress)
                if (this.progress > 940) {
                    this.progress = 940
                }
                this.startTime();
            },

            decreaseTime() {
                clearInterval(this.intval);
                this.progress = this.progress - (5 * this.editProgress);
             //   console.log('decrease ?  '+ this.progress)
                if (this.progress <= 0) {
                    this.progress = 0;
                 //   console.log('inja')
                    this.cancelTimer()
                } else {
                    this.startTime();
                }

            },

            startTime() {
                let _self = this;
                this.intval = setInterval(() => {
                    _self.progress -= parseInt(_self.editProgress);
                    //console.log(_self.progress);
                    if (_self.progress == 0) {
                       // console.log('onja')
                        _self.cancelTimer()
                    }
                }, this.time);
            },



            cancelTimer() {
                //console.log('tooye cancelTimer')
                clearInterval(this.intval);
                this.intval = '';
                this.$root.$emit('math_finish_Time');
            },
            cleaning(){
                clearInterval(this.intval);
                this.intval = '';
            },

            start: function (time) {
                var self = this;
                if (self.isActive) {
                    //console.log('timer is already active. Please wait to finish')
                    return;
                }
                if (time)
                    self.duration = time;

                if (self.duration < 0)
                    return;


                self.isActive = true;
                self.timeoutId = setTimeout(function () {
                        self.finished();
                    } /* 1 */
                    , self.duration);

                self.transitionBarWithStyle = {
                    animationDuration: (self.duration / 1000) + 's',
                    animationName: 'timebar_progress_y'
                }
            },
            cancel: function () {
                if (this.isActive && this.timeoutId > -1) {
                    clearTimeout(this.timeoutId);
                    this.transitionBarWithStyle = {};
                    this.isActive = false;
                  //  console.log('timer has been canceled');
                }
            },
            finished: function () {
              //  console.log('timer has finished after ' + this.duration + ' ms');
                this.transitionBarWithStyle = {};
                this.isActive = false;
                this.$root.$emit('math_finishTime');
            },

        },


    }
</script>

<style scoped>


  .gradient {
    background: #4b6cb7; /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, red, #4b6cb7); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, red, #4b6cb7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  body, html {
    min-width: 100%;
    min-height: 100%;
  }

  html {
  @extend . gradient;
  }

  .clearfix:after {
    content: '';
    display: table;
    clear: both;
  }

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  h1 {
    font-family: 'Zilla Slab Highlight', cursive;
    opacity: 0.98;
    font-size: 46px;
  }

  p {
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.25em;
    font-weight: bold;
    margin-bottom: 0;
  }

  ol li {
    margin: 0;
    line-height: 1.2;
    padding-top: 6px;
  }

  .note {
    opacity: 0.5;
  }

  /* LAYOUT STUFF */
  #vm {
    max-width: 550px;
    margin: 2em auto 2em;
    position: relative;
  }

  .c-box {
    background: white;
    border: 4px solid red;
    max-width: 460px;
    width: 85%;
    float: left;
    padding: 40px;
  }

  .c-timer {
    position: absolute;
    width: 940px;
    height: 14px;
    left: 40px;
    top: 694px;
    background-color: #213826;
    border-radius: 10px;

    overflow: hidden;
    /*right: 0;*/
    /*width: 10%;*/
    /*height: 100%;*/
    /*position: absolute;*/
  }

  .c-box__form {
    margin-top: 5em;
  }

  .c-box__txt {
    margin-top: 1.5em;
  }

  .c-btn {
  @extend . gradient;
    border: 1px solid red;
    box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.6) inset;
    color: white;
    border-radius: 1px;
  }

  .c-btn:hover {
    color: rgba(255, 255, 255, 0.9);
    border-color: red;
    box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.6) inset, 0px 2px 3px rgba(0, 0, 0, 0.3);
  }

  .c-btn:focus {
    /*box-shadow: 0px;*/
    color: white;
  }

  input.c-form__input {
    border-radius: 1px;
  }

  input.c-form__input:focus, input.c-form__input:active {
    border-color: red;
    border-radius: 1px;
  }

  /* TIMEBAR COMPONENT */
  .c-timebar {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .c-timebar__background {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: #FFF8C4;
    opacity: 0.15;
    z-index: 1;
  }

  .c-timebar__remaining {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    background-color: #ffa200;
    width: 940px;
    z-index: 2;
    /*transform-origin: 0 100%;*/
    /*transition-timing-function: linear;*/
    /*-webkit-transition-timing-function: linear;*/
    /*animation-name: lose;*/
    transition: 1s;
    -webkit-transition: 1s;
    animation-fill-mode: forwards;

    /*width: inherit;*/
    /*height: 100%;*/
    /*position: absolute;*/
    /*left: 0;*/
    /*top: 0;*/
    /*background: #FFE626;*/
    /*z-index: 2;*/
    /*transform-origin: 0 100%;*/
    /*animation-timing-function: linear;*/
    /*animation-fill-mode: forwards;*/
    /*transition: 10s;*/
  }

  @keyframes timebar_progress_x {
    from {
      transform: scaleX(1)
    }
    to {
      transform: scaleX(0)
    }
  }

  @keyframes timebar_progress_y {
    from {

      -webkit-transform: scaleY(1); /* Safari & Chrome */
      -moz-transform: scaleY(1); /* Firefox */
      -ms-transform: scaleY(1); /* Internet Explorer */
      -o-transform: scaleY(1); /* Opera */
      transform: scaleY(1);
    }
    to {
      -webkit-transform: scaleY(0); /* Safari & Chrome */
      -moz-transform: scaleY(0); /* Firefox */
      -ms-transform: scaleY(0); /* Internet Explorer */
      -o-transform: scaleY(0); /* Opera */
      transform: scaleY(0);
    }
  }

  @-webkit-keyframes timebar_progress_y {
    from {

      -webkit-transform: scaleY(1); /* Safari & Chrome */
      -moz-transform: scaleY(1); /* Firefox */
      -ms-transform: scaleY(1); /* Internet Explorer */
      -o-transform: scaleY(1); /* Opera */
      transform: scaleY(1);
    }
    to {
      -webkit-transform: scaleY(0); /* Safari & Chrome */
      -moz-transform: scaleY(0); /* Firefox */
      -ms-transform: scaleY(0); /* Internet Explorer */
      -o-transform: scaleY(0); /* Opera */
      transform: scaleY(0);
    }
  }

  @-webkit-keyframes lose {
    100% {
      width: 940px
    }
    90% {
      width: 840px;
    }

    80% {
      width: 740px;
    }
  }

  @keyframes lose {
    100% {
      width: 940px
    }
    90% {
      width: 840px;
    }

    80% {
      width: 740px;
    }
  }


</style>