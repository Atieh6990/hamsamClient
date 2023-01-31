import api from '../../api/2048' ;
import {page} from 'vue-analytics'
export default new class {

    Game() {
       // console.log(api)
    /*   try {

            var $ = window.jQuery = require('jquery');
        } catch (e) {
        }*/


      //  alert()

        var isGameOver = false;
      //  var isOneGame = true;
        var defaults = {
            delay: 200, //Game speed
            score2048: 0
        };
        var _options
        // alert(dis)
        // if (isOneGame) {
        var _this = this,
            options = $.extend(defaults, _options),
            dir = {
                up: 'up',
                right: 'right',
                down: 'down',
                left: 'left'
            },
            holder = {}, //Game outer holder
            content = {}, //Game inner container

            matrix = [], //For the logic behind
            boxes = [], //Boxes storage


            isCheating = 0,
            gameId = 0,
            flagStartGame = 0,
            moveCount = 0
        return {

            play: function (status) {



               return (function ($) {
                    /**
                     * User options
                     */




                    // $.fn.init2048.bind()

              var  init2048=(status) => {
   // alert(status)
                //  alert(num)
                  if(status=="start") {



                      // alert( json.parse(options))


                      //  }else{

                      //  }
                      //  var dataStartGame = {data: '{"userID":"' + user.userID + '"}'};
                     // alert(isGameOver)

                          $("#ErrSecond2048").css("display", "none")
                          //  alert(isGameOver)
                          //  $("#loading-pic").css("opacity", "0")

                          api.startGame().then(data => {
                              succesStartGame(data)
                          });
                          //  eight.ajaxLaravel("POST", "http://ssn.tvapps.ir/alt2/hamsam/public/api/startGame", succesStartGame, dataStartGame);








                  }else {
                      if (isGameOver) {
                          $("#page2048").css("display", "none");
                          $("#ErrSecond2048").css("display", "block")
                      }else{

                          document.body.addEventListener("keydown", bind, false);
                      }



                  }

                        function succesStartGame(data) {
                            var response = data
                            //$("#loading-pic").css("opacity", "1")
                            if (response['success']) {
                                gameId = response['data']['id'];
                                setTimeout(function () {

                                    resetGame();

                                    $("#page2048").css("display", "block");
                                    document.body.addEventListener("keydown", bind, false);


                                }, 2000);


                            }

                        }

                        function returnGame() {
      //  alert("return")
                            moveCount = 0
                            flagStartGame = 0
                            $("#popUp2048").css("display", "none")

                            $("#popUpScore2048").html("")
                            $(".score2048").html(0)
                            $(".score2048r").html(0)
                            defaults.score2048 = 0
                           // removeBack2048()
                         //   document.body.removeEventListener("keydown", bind, false);
                        }

                        //  AddBack2048()
                        /**
                         * Restart the game by recreate all DOM elements.
                         */
                        function resetGame() {
                            defaults.score2048 = 0
                            $(".score2048").html(0)
                          $(".score2048r").html(0)

                            //Reset the props
                            boxes = [];
                            matrix = [];
                            isCheating = 0;
                            // isOneGame=false
                            //Recreate DOM elements
                            holder = $('<div>').addClass('holder2048');
                            content = $('<div>').addClass('container').appendTo(holder);
                            for (var i = 0; i < 4; i++) {
                                for (var j = 0; j < 4; j++) {
                                    //Reset matrix
                                    matrix[i * 4 + j] = {
                                        top: i * 200,
                                        left: j * 200,
                                        taken: false,
                                        combined: false,
                                        value: 0
                                    };
                                    //This is for the borders of each cell.
                                    $('<div>').addClass('mask').css({
                                        left: j * 200 + "px",
                                        top: i * 200 + "px"
                                    }).appendTo(content);
                                }
                            }
                            //Create the first box on board
                            createBox();
                            //Insert game holder and anything to whoever calls this function
                           $("#2048").html(holder);
                        }

                        /**
                         * Just for fun.
                         * Reset the game and place a 4096 box on the board.
                         */
                        function cheat() {
                            // alert("cheat")
                            /*    resetGame();
                                createBox(4096);*/
                        }

                        /**
                         * Create a box and add to game
                         * Takes 1 or 0 param.
                         *
                         * @param value
                         */
                        function createBox(value) {
                            //Check if there are spaces for a new box or not
                            var emptyMatrix = 0;
                            for (var i = 0; i < matrix.length; i++) {
                                if (!matrix[i].taken) {
                                    emptyMatrix++;
                                }
                            }
                            if (emptyMatrix === 0) {
                                return;
                            }
                            //Chose an actual index (means not taken) randomly for the new box
                            var random = Math.floor(Math.random() * emptyMatrix + 1);
                            var chosenIndex = 0;
                            for (var j = 0; chosenIndex < matrix.length; chosenIndex++) {
                                while (matrix[chosenIndex].taken) {
                                    chosenIndex++;
                                }
                                if (++j === random) {
                                    matrix[chosenIndex].taken = true;
                                    break;
                                }
                            }
                            //Do the create job
                            value = value ? value : (Math.floor(Math.random() * 4 + 1) === 4 ? 4 : 2); //Use the value parse in or (1/4 -> 4 or  3/4 -> 2)
                            var newBox = $('<div>').addClass('box').attr({
                                position: chosenIndex,
                                value: value
                            }).css({
                                top: matrix[chosenIndex].top + 6,
                                left: matrix[chosenIndex].left + 6,
                                opacity: 0,
                                position:"absolute"
                            }).text(value).appendTo(content).animate({
                                opacity: 1
                            }, options.delay * 2);
                            //Finally push it to the boxes array
                            boxes.push(newBox);
                        }

                        /**
                         * Combine 2 boxes into 1
                         * @param source
                         * @param target
                         * @param value
                         */
                        function combineBox(source, target, value) {

                            var _value = parseInt(value) * 2;
                            defaults.score2048 += _value
                            $(".score2048").html(defaults.score2048)
                            $(".score2048r").html(_value)
                            boxes[target].attr('value', _value).html(_value).css({
                                zIndex: 99
                            }).animate({
                                    width: '+=20',
                                    height: '+=20',
                                    top: '-=10',
                                    left: '-=10'
                                },
                                options.delay / 2, function () {
                                    $(this).animate({
                                            width: '-=20',
                                            height: '-=20',
                                            top: '+=10',
                                            left: '+=10'
                                        }, options.delay / 2, function () {
                                            $(this).css({
                                                zIndex: 1
                                            })
                                        }
                                    )
                                }
                            );
                            boxes[source].remove();
                            boxes.splice(source, 1);
                        }

                        /**
                         * Check if game over
                         * @returns {boolean}
                         */
                        function gameOver() {
                            if (boxes.length != 16) {
                                return false;
                            }
                            var i, a, b;
                            for (i = 0; i < 16; i++) {
                                for (a = 0; a < 16; a++) {
                                    if (boxes[a].attr('position') == i)
                                        break;
                                }
                                if (i % 4 != 3) {
                                    for (b = 0; b < 16; b++) {
                                        if (boxes[b].attr('position') == i + 1)
                                            break;
                                    }
                                    if (boxes[a].attr('value') == boxes[b].attr('value'))
                                        return false;
                                }
                                if (i < 12) {
                                    for (b = 0; b < 16; b++) {
                                        if (boxes[b].attr('position') == i + 4)
                                            break;
                                    }
                                    if (boxes[a].attr('value') == boxes[b].attr('value'))
                                        return false;
                                }
                            }
                            return true;
                        }

                        /**
                         * Game run
                         * @param dir
                         */
                        function gameRun(dir) {

                            if (isGameOver) {
                                return;
                            }
                            if (run(dir)) {
                                createBox();
                            }
                            if (gameOver()) {
                                //  alert("Game Over1");

                                //  var data = {data: '{"macID":"' + user.Duid + '","year":' + user.year + ',"isOld":"1","ps":"' + user.psID + '","real":"' + user.real + '","model":"' + user.model + '","firmware":"' + user.firmware + '","IsCompletePrf":"1"}'};

                               //   var dataSaveScoreGame = {data: '{"userID":"' + user.userID + '","ID":' + gameId + ',"counts":"' + moveCount + '","totalscore":"' + defaults.score2048 + '" }'};

                                if (!isGameOver) {
                                //    isOneGame = false
                                    page({
                                        page:   "end game 2048",
                                        title:  "end game 2048"
                                    })
                                    api.saveScoreGame(parseInt(gameId),parseInt(moveCount),parseInt(defaults.score2048)).then(data => {
                                        succesSaveScoreGame(data)
                                    });
                                   // eight.ajaxLaravel("POST", "http://ssn.tvapps.ir/alt2/hamsam/public/api/saveScoreGame", succesSaveScoreGame, dataSaveScoreGame);
                                }
                                isGameOver = true;

                                // alert("Game Over");
                            }
                        }

                        function succesSaveScoreGame(data) {
                         //   Stats.track('End 2048 game', 'End 2048 game')
                            var response = data

                            $("#popUp2048").css("display", "block")

                            if (response['success']) {
                             //   changeTotallScore(1, response['score']);
                            //    $("#popUpScore2048").html(response['givenScore'])

                            }


                        }

                        /**
                         * Bind keyboard and screen touch events to game
                         */
                        function bind(e) {




                            switch (e.keyCode) {

                                /* case 404:
                                 //   alert("ll")
                                 movePages.FiftyThree.returnMove()

                                 break;*/
                                case 37://Left
                                case 4://Left


                                        if (!isGameOver) {
                                            gameRun(dir.left);
                                        }

                                    //     movePages.prof._left();
                                    // }
                                    break;
                                case 38://Up
                                case 29460://Up

                                        if (!isGameOver) {
                                            gameRun(dir.up);
                                        }
                                    break;
                                case 39://Right
                                case 5://Right

                                        if (!isGameOver) {
                                            gameRun(dir.right);
                                        }
                                    //     movePages.prof._right();
                                    // }
                                    break;
                                case 40://Down
                                case 29461://Down

                                        if (!isGameOver) {
                                            gameRun(dir.down);
                                        }
                                    /*  event.preventDefault();
                                         gameRun(dir.left);
                                     } else if (event.which == 38) {
                                         event.preventDefault();
                                         gameRun(dir.up);
                                     } else if (event.which == 39) {
                                         event.preventDefault();
                                         gameRun(dir.right);
                                     } else if (event.which == 40) {
                                         event.preventDefault();
                                         gameRun(dir.down);
                                     }*/
                                    break;
                                case 13://Enter
                                case 29443://Enter

                                        break;
                                case 10009: //return tizen
                                case 187: //return tizen
                                    if (isGameOver) {
                                        returnGame()}
                                 //   ShowScene(managePage.retun());
                                    document.body.removeEventListener("keydown", bind, false);

                                    break;





                                default:
                                    break;
                            }


                        }

                        /*document.addEventListener("touchstart", function (event) {
                            if (event.touches.length > 1)
                                return;
                            touchStartClientX = event.touches[0].clientX;
                            touchStartClientY = event.touches[0].clientY;
                        });*/
                        /* document.addEventListener("touchmove", function (event) {
                             event.preventDefault();
                         });*/

                        /*  document.addEventListener("touchend", function (event) {
                              if (event.touches.length > 0)
                                  return;
                              var dx = event.changedTouches[0].clientX - touchStartClientX;
                              var absDx = Math.abs(dx);
                              var dy = event.changedTouches[0].clientY - touchStartClientY;
                              var absDy = Math.abs(dy);
                              if (Math.max(absDx, absDy) > 10) {
                                  if (absDx > absDy) {
                                      if (dx > 0) {
                                          gameRun(dir.right);
                                      } else {
                                          gameRun(dir.left);
                                      }
                                  } else {
                                      if (dy > 0) {
                                          gameRun(dir.down);
                                      } else {
                                          gameRun(dir.up);
                                      }
                                  }
                              }
                          });*/


                        /**
                         * [WARNING] This method is ugly enough for now. Waiting for refactor.
                         *
                         * Make a single game move.
                         * Takes 1 param.
                         *
                         * @param dir
                         * @returns {boolean}
                         */

                        function succesGetLogGame(data) {
                          //  Stats.track('2048 game 500 move', '2048 game 500 move')
                         //   $("#loading-pic").css("opacity", "1")
                        }
                        function run(dir) {
                            moveCount++
                            if (moveCount % 500==0) {

                               // var dataLogGame = {data: '{"userID":"' + user.userID + '","ID":' + gameId + ',"moveCount":"' + moveCount + '","totalscore":"' + defaults.score2048 + '" }'};
                               // $("#loading-pic").css("opacity", "0")
                                page({
                                    page:   "500 move 2048",
                                    title:  "500 move 2048"
                                })
                                api.getLogGame(parseInt(gameId),parseInt(moveCount),parseInt(defaults.score2048)).then(data => {
                                    succesGetLogGame(data)
                                });
                              //  eight.ajaxLaravel("POST", "http://ssn.tvapps.ir/alt2/hamsam/public/api/getLogGame", succesGetLogGame, dataLogGame);
                            }
                            var isMoved = false; //This is to indicate that if the game actually moved after calling this function
                            var i, j, k, empty, _empty, position, value1, value2, temp; //Junks
                            //Reset the matrix attr 'combined' before moving
                            for (i = 0; i < 16; i++) {
                                matrix[i].combined = false;
                            }
                            if (dir == "left") {
                                isCheating = -1;
                                for (i = 0; i < 4; i++) {
                                    empty = i * 4;
                                    _empty = empty;
                                    for (j = 0; j < 4; j++) {
                                        position = i * 4 + j;
                                        if (!matrix[position].taken) {
                                            continue;
                                        }
                                        if (matrix[position].taken && position === empty) {
                                            empty++;
                                            if (empty - 2 >= _empty) {
                                                for (k = 0; k < boxes.length; k++) {
                                                    if (boxes[k].attr("position") == position) {
                                                        break;
                                                    }
                                                }
                                                value1 = boxes[k].attr('value');
                                                for (temp = 0; temp < boxes.length; temp++) {
                                                    if (boxes[temp].attr("position") == empty - 2) {
                                                        break;
                                                    }
                                                }
                                                value2 = boxes[temp].attr('value');
                                                if (value1 == value2 && !matrix[empty - 2].combined) {
                                                    combineBox(k, temp, value1);
                                                    matrix[empty - 1].taken = false;
                                                    matrix[empty - 2].combined = true;
                                                    empty--;
                                                    isMoved = true;
                                                }
                                            }
                                        } else {
                                            for (k = 0; k < boxes.length; k++) {
                                                if (boxes[k].attr("position") == position) {
                                                    break;
                                                }
                                            }
                                            boxes[k].animate({
                                                left: matrix[empty].left + 6,
                                                top: matrix[empty].top + 6
                                            }, options.delay);
                                            boxes[k].attr('position', empty);
                                            matrix[empty].taken = true;
                                            matrix[position].taken = false;
                                            empty++;
                                            isMoved = true;
                                            if (empty - 2 >= _empty) {
                                                value1 = boxes[k].attr('value');
                                                for (temp = 0; temp < boxes.length; temp++) {
                                                    if (boxes[temp].attr("position") == empty - 2) {
                                                        break;
                                                    }
                                                }
                                                value2 = boxes[temp].attr('value');
                                                if (value1 == value2 && !matrix[empty - 2].combined) {
                                                    combineBox(k, temp, value1);
                                                    matrix[empty - 1].taken = false;
                                                    matrix[empty - 2].combined = true;
                                                    empty--;
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if (dir == "right") {
                                isCheating = -1;
                                for (i = 3; i > -1; i--) {
                                    empty = i * 4 + 3;
                                    _empty = empty;
                                    for (j = 3; j > -1; j--) {
                                        position = i * 4 + j;
                                        if (!matrix[position].taken) {
                                            continue;
                                        }
                                        if (matrix[position].taken && position === empty) {
                                            empty--;
                                            if (empty + 2 <= _empty) {
                                                for (k = 0; k < boxes.length; k++) {
                                                    if (boxes[k].attr("position") == position) {
                                                        break;
                                                    }
                                                }
                                                value1 = boxes[k].attr('value');
                                                for (temp = 0; temp < boxes.length; temp++) {
                                                    if (boxes[temp].attr("position") == empty + 2) {
                                                        break;
                                                    }
                                                }
                                                value2 = boxes[temp].attr('value');
                                                if (value1 == value2 && !matrix[empty + 2].combined) {
                                                    combineBox(k, temp, value1);
                                                    matrix[empty + 1].taken = false;
                                                    matrix[empty + 2].combined = true;
                                                    empty++;
                                                    isMoved = true;
                                                }
                                            }
                                        } else {
                                            for (k = 0; k < boxes.length; k++) {
                                                if (boxes[k].attr("position") == position) {
                                                    break;
                                                }
                                            }
                                            boxes[k].animate({
                                                left: matrix[empty].left + 6,
                                                top: matrix[empty].top + 6
                                            }, options.delay);
                                            boxes[k].attr('position', empty);
                                            matrix[empty].taken = true;
                                            matrix[position].taken = false;
                                            empty--;
                                            isMoved = true;
                                            if (empty + 2 <= _empty) {
                                                value1 = boxes[k].attr('value');
                                                for (temp = 0; temp < boxes.length; temp++) {
                                                    if (boxes[temp].attr("position") == empty + 2) {
                                                        break;
                                                    }
                                                }
                                                value2 = boxes[temp].attr('value');
                                                if (value1 == value2 && !matrix[empty + 2].combined) {
                                                    combineBox(k, temp, value1);
                                                    matrix[empty + 1].taken = false;
                                                    matrix[empty + 2].combined = true;
                                                    empty++;
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if (dir == "up") {
                                isCheating = -1;
                                for (i = 0; i < 4; i++) {
                                    empty = i;
                                    _empty = empty;
                                    for (j = 0; j < 4; j++) {
                                        position = j * 4 + i;
                                        if (!matrix[position].taken) {
                                            continue;
                                        }
                                        if (matrix[position].taken && position === empty) {
                                            empty += 4;
                                            if (empty - 8 >= _empty) {
                                                for (k = 0; k < boxes.length; k++) {
                                                    if (boxes[k].attr("position") == position) {
                                                        break;
                                                    }
                                                }
                                                value1 = boxes[k].attr('value');
                                                for (temp = 0; temp < boxes.length; temp++) {
                                                    if (boxes[temp].attr("position") == empty - 8) {
                                                        break;
                                                    }
                                                }
                                                value2 = boxes[temp].attr('value');
                                                if (value1 == value2 && !matrix[empty - 8].combined) {
                                                    combineBox(k, temp, value1);
                                                    matrix[empty - 4].taken = false;
                                                    matrix[empty - 8].combined = true;
                                                    empty -= 4;
                                                    isMoved = true;
                                                }
                                            }
                                        } else {
                                            for (k = 0; k < boxes.length; k++) {
                                                if (boxes[k].attr("position") == position) {
                                                    break;
                                                }
                                            }
                                            boxes[k].animate({
                                                left: matrix[empty].left + 6,
                                                top: matrix[empty].top + 6
                                            }, options.delay);
                                            boxes[k].attr('position', empty);
                                            matrix[empty].taken = true;
                                            matrix[position].taken = false;
                                            empty += 4;
                                            isMoved = true;
                                            if (empty - 8 >= _empty) {
                                                value1 = boxes[k].attr('value');
                                                for (temp = 0; temp < boxes.length; temp++) {
                                                    if (boxes[temp].attr("position") == empty - 8) {
                                                        break;
                                                    }
                                                }
                                                value2 = boxes[temp].attr('value');
                                                if (value1 == value2 && !matrix[empty - 8].combined) {
                                                    combineBox(k, temp, value1);
                                                    matrix[empty - 4].taken = false;
                                                    matrix[empty - 8].combined = true;
                                                    empty -= 4;
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if (dir == "down") {
                                //  alert(isCheating)
                                // cheat()
                                if (isCheating != -1) {
                                    isCheating++;
                                    if (isCheating == 10) {
                                        cheat();
                                        return true;
                                    }
                                }
                                for (i = 0; i < 4; i++) {
                                    empty = i + 12;
                                    _empty = empty;
                                    for (j = 3; j > -1; j--) {
                                        position = j * 4 + i;
                                        if (!matrix[position].taken) {
                                            continue;
                                        }
                                        if (matrix[position].taken && position === empty) {
                                            empty -= 4;
                                            if (empty + 8 <= _empty) {
                                                for (k = 0; k < boxes.length; k++) {
                                                    if (boxes[k].attr("position") == position) {
                                                        break;
                                                    }
                                                }
                                                value1 = boxes[k].attr('value');
                                                for (temp = 0; temp < boxes.length; temp++) {
                                                    if (boxes[temp].attr("position") == empty + 8) {
                                                        break;
                                                    }
                                                }
                                                value2 = boxes[temp].attr('value');
                                                if (value1 == value2 && !matrix[empty + 8].combined) {
                                                    combineBox(k, temp, value1);
                                                    matrix[empty + 4].taken = false;
                                                    matrix[empty + 8].combined = true;
                                                    empty += 4;
                                                    isMoved = true;
                                                }
                                            }
                                        } else {
                                            for (k = 0; k < boxes.length; k++) {
                                                if (boxes[k].attr("position") == position) {
                                                    break;
                                                }
                                            }
                                            boxes[k].animate({
                                                left: matrix[empty].left + 6,
                                                top: matrix[empty].top + 6
                                            }, options.delay);
                                            boxes[k].attr('position', empty);
                                            matrix[empty].taken = true;
                                            matrix[position].taken = false;
                                            empty -= 4;
                                            isMoved = true;
                                            if (empty + 8 <= _empty) {
                                                value1 = boxes[k].attr('value');
                                                for (temp = 0; temp < boxes.length; temp++) {
                                                    if (boxes[temp].attr("position") == empty + 8) {
                                                        break;
                                                    }
                                                }
                                                value2 = boxes[temp].attr('value');
                                                if (value1 == value2 && !matrix[empty + 8].combined) {
                                                    combineBox(k, temp, value1);
                                                    matrix[empty + 4].taken = false;
                                                    matrix[empty + 8].combined = true;
                                                    empty += 4;
                                                }
                                            }
                                        }
                                    }
                                }

                            }
                            return isMoved;
                        }

                    }
                  // console.log(init2048)
                //   if(!isGameOver){
               //   alert(isGameOver)
                       init2048(status)
                 //  }

                })(jQuery);


        }
        }
}


}