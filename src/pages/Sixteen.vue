<template>
  <div class="page">
    <rank :rankData="rankData"></rank>
    <board :permission="permission" :op="op" :num1="num1" :num2="num2" :finalResult="finalResult"
           :permissionTxt="permissionTxt" :trueAnsCNT="trueAnsCNT"
           ref="board"
    ></board>

    <!--        <div style="position: absolute;width: 200px;height: 50px;top: 100px;left: 100px;border: 1px solid red">{{ help-->
    <!--            }}-->
    <!--        </div>-->

    <answer :permission="permission" ref="answer"></answer>

  </div>

</template>

<script>
  import api from '../api/math'
  import rank from '../components/math/rank'
  import board from '../components/math/board'
  import answer from '../components/math/answer'
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex';
  import {page} from 'vue-analytics'

  export default {
    name: "sixteen",
    data() {
      return {
        rankData: [],
        waitingTime: ['00:05', '00:10', '00:20', '00:40', '01:00', '02:00', '05:00', '10:00', '20:00', '40:00', '59:59'],
        randMax: [20, 50, 100, 150, 200],
        questionCntInLevel: [10, 20, 30, 40, 50],
        operation: ['+', '-', '/', '*'],
        lastLevel: 1,
        permission: 0,//ejaze shorooE bazi
        permissionTxt: 'شروع بازی',
        gameId: '',
        operationIndex: '',
        questionCnt: 0,
        trueAnsCNT: 0,
        falseAnsCnt: 0,
        levelPointer: 0,
        op: '', num1: '', num2: '', realResult: '', finalResult: '',
        help: '',
        hasTime: 1
      }
    },

    components: {
      rank, board, answer
    },
    created() {

      page({
        page: 'math',
        title: 'math'
      })

      this.$root.$on('math_finish_Time', () => {
        // console.log('tooye in yaroo')
        this.permission = 0;
        this.permissionTxt = 'زمان شما به اتمام رسید';
        this.hasTime = 0;

        if (this.gameId != '') {
          api.mathEndGame(this.gameId, this.trueAnsCNT).then(data => {
            if (data.data.message == 'ok') {
              this.permission = 0;
              this.permissionTxt = 'زمان شما به اتمام رسید';
              //this.setPlayMathInDay();

            }
          })
        }

      });

      api.mathRank().then(data => {
        //alert(this.getPlayMathInDay())
        if (data.success == true) {
          this.rankData = data.data;

          if (this.getPlayMathInDay() == 1) {
            this.permission = 0;
            this.permissionTxt = 'بازی امروز شما ثبت شده است.';
          }
        }

      });

    },

    methods: {
      ...mapGetters([
        'getPlayMathInDay'
      ]),
      ...mapMutations([
        'setPlayMathInDay'
      ]),
      right() {
        if (this.permission == 1) {
          this.$refs.answer.right();
          this.userSeeAnswer()
        }

      },

      left() {
        if (this.permission == 1) {
          this.$refs.answer.left();
          this.userSeeAnswer()
        }
      },
      up() {
      },
      down() {
      },
      enter() {
        if (this.permission == 0) {

          if (this.hasTime == 1 && this.getPlayMathInDay() == 0) {
            this.permission = 1;
            this.getNewGameId();
          }

        } else {

        }
      },

      userSeeAnswer() {
        let ans = this.$refs.answer.enter();
        this.questionCnt++;


        if (ans == this.checkAns()) {//dorost javab dade
          this.trueAnsCNT++;
          this.$refs.board.truAnswer();

        } else { //ghalat javab dade

          this.falseAnsCnt++;
          this.$refs.board.falseAnswer();
        }
        this.calculate();
      },

      back() {
        this.gameId = '';
        this.$router.go(-1);
        this.$root.$emit('sideMenu_show');
        this.$root.$emit('header_show');
        this.$root.$emit('leftside_show');
      },

      getNewGameId() {
        api.mathStartGame().then(data => {
          if (data.success == true) {
            this.gameId = data.data.id;
            this.calculate()
          }

        });
      },

      calculate() {
        this.op = this.randOperation();//amalgar
        this.num1 = this.randNumber();//adade aval
        this.num2 = this.randNumber();//adade dovom

        if (this.op == '/') {//age taghsim bood adade aval beshe hasele zarbeshoon
          var tmp = this.num1 * this.num2;
          this.num1 = tmp;
        }
        this.realResult = this.doOperation(this.op, this.num1, this.num2);//emale  amalgar rooye adAd

        this.help = this.realResult

        var status = this.makeBooleanRand();
        if (status == 1) {
          this.finalResult = this.realResult
        } else {
          var mistake = this.makeRandom(1, 5);//random baraye khata
          var newOPst = this.makeBooleanRand();//random baraye + ya - az javab
          if (newOPst == 0) {
            var newOP = '-';
          } else {
            var newOP = '+';
          }
          this.finalResult = this.doOperation(newOP, this.realResult, mistake);//mohasebeye javabe ghabele namayesh
          if (this.finalResult <= 0) { // age javabi ke mikhast neshoon bede - shod
            this.finalResult = -1 * this.finalResult;
          }
        }
      },

      makeRandom(min, max) {

        let random = Math.floor(Math.random() * max) + min;
        return random;
      },
      makeBooleanRand() {
        var items = new Array(0, 1);
        var item = items[Math.floor(Math.random() * items.length)];
        return item;
      },
      randOperation() {
        let randOp = this.makeRandom(0, 3);
        this.operationIndex = randOp;
        return this.operation[randOp];
      },
      randNumber() {
        if ((this.questionCnt > this.questionCntInLevel[this.levelPointer]) && (this.levelPointer < this.randMax.length - 1)) {
          this.levelPointer++;
        }
        //console.log('this.questionCnt ->' + this.questionCnt + 'this.levelPointer ->'+this.levelPointer)
        var maximum = this.randMax[this.levelPointer];

        var number = this.makeRandom(parseInt(1), parseInt(maximum));
        return number;
      },
      doOperation(op, n1, n2) {
        var result;
        switch (op) {
          case '+':
            result = n1 + n2;
            break;
          case '-':
            result = n1 - n2;
            break;
          case '*':
            result = n1 * n2;
            break;
          case '/':
            result = n1 / n2;
            break;

          default:

            break;
        }
        return result;
      },
      checkAns() {
        if (this.finalResult != -9999 && this.realResult != -9999) {
          if (this.finalResult == this.realResult) {
            return true;
          } else {
            return false;
          }
        } else {
          return "bug";
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
    top: 0px;
    left: 0px;
    width: 1920px;
    height: 1080px;
  }
</style>
