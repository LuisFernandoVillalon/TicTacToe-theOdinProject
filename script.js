let element = document.getElementsByClassName("XO");
let reset = document.getElementById("reset");
let resetPopUp = document.getElementById("resetPopUp");
let result = document.getElementById("results");
let one = document.getElementById("1");
let two = document.getElementById("2");
let three = document.getElementById("3");
let four = document.getElementById("4");
let five = document.getElementById("5");
let six = document.getElementById("6");
let seven = document.getElementById("7");
let eight = document.getElementById("8");
let nine = document.getElementById("9");
let Gameboard = [one, two, three, four, five, six, seven, eight, nine]
const player1 = "X";
const player2 = "O";
function emptyIndexies(board){
    return  board.filter(s => s != "O" && s != "X");
}
function winning(board, player) {
    if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
      )   {
        return true;
    } else {
        return false;
    }
}
function minimax(stringArr, player) {
    let availSpots = emptyIndexies(stringArr);
    if (winning(stringArr, player1)) {
      return { score: -10 };
    }
    else if (winning(stringArr, player2)) {
      return { score: 10 };
    }
    else if (availSpots.length == 0) {
      return { score: 0 };
    }
    let moves = [];
    for (let i = 0; i < availSpots.length; ++i) {
      let move = {};
      for (let j = 0; j < stringArr.length; ++j) {
        if (availSpots[i] == stringArr[j]) {      
          stringArr[j] = player;
           move.index = j;
          break;
        }
      }
      if (player == player2) {
        let result = minimax(stringArr, player1);
        move.score = result.score;
      } else if (player == player1) {
        let result = minimax(stringArr, player2);
        move.score = result.score;
      }
      stringArr[move.index] = move.index;
      moves.push(move);
    }
    let bestMove;
    if (player === player2) {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    
    return moves[bestMove];
}
function createPopUp() {
    let popUp = document.querySelector(".popup");
    result.classList.add("moveUp");
    reset.classList.add("moveUp");
    popUp.classList.remove("hidden");
}
function checkWinner() {
    let stringArr = [];
    for (let i = 0; i < Gameboard.length; ++i) {
        if (Gameboard[i].innerHTML) {
            stringArr.push(Gameboard[i].innerHTML);
        } else {
        stringArr.push(i);
        }
    }
    
    let case1 = ((stringArr[0] == stringArr[1] && stringArr[0] === stringArr[2]));
    let case2 = ((stringArr[3] == stringArr[4] && stringArr[3] == stringArr[5]));
    let case3 = ((stringArr[6] == stringArr[7] && stringArr[6] == stringArr[8]));
    let case4 = ((stringArr[0] == stringArr[3] && stringArr[0] == stringArr[6]));
    let case5 = ((stringArr[1] == stringArr[4] && stringArr[1] == stringArr[7]));
    let case6 = ((stringArr[2] == stringArr[5] && stringArr[2] == stringArr[8]));
    let case7 = ((stringArr[0] == stringArr[4] && stringArr[0] == stringArr[8]));
    let case8 = ((stringArr[2] == stringArr[4] && stringArr[2] == stringArr[6]));
    let booleanArr = [case1, case2, case3, case4, case5, case6, case7, case8];
    let options = emptyIndexies(stringArr);
    if (options.length == 0) {
        createPopUp();
        result.innerHTML = "Tied game!";
    }
    if (case1 || case2 || case3 || case4 || case5 || case6 || case7 || case8 ) { 
        createPopUp();
        for (let i = 0; i < booleanArr.length; ++i) {
            if (booleanArr[i] == true) {
                if (i == 0 || i == 3 || i == 6) {
                    if (stringArr[0] == "X") {
                        result.innerHTML = "Player 1 is the winner!";
                        return true;
                    } else if (stringArr[0] == "O") {
                        result.innerHTML = "Player 2 is the winner!";
                        return true;
                    }
                } else if (i == 1) {
                    if (stringArr[3] == "X") {
                        result.innerHTML = "Player 1 is the winner!";
                        return true;
                    } else if (stringArr[3] == "O") {
                        result.innerHTML = "Player 2 is the winner!";
                        return true;
                    }
                } else if (i == 2) {
                    if (stringArr[6] == "X") {
                        result.innerHTML = "Player 1 is the winner!";
                        return true;
                    } else if (stringArr[6] == "O") {
                        result.innerHTML = "Player 2 is the winner!";
                        return true;
                    }
                } else if (i == 4) {
                    if (stringArr[1] == "X") {
                        result.innerHTML = "Player 1 is the winner!";
                        return true;
                    } else if (stringArr[1] == "O") {
                        result.innerHTML = "Player 2 is the winner!";
                        return true;
                    }
                } else if (i == 7 || i == 5) {
                    if (stringArr[2] == "X") {
                        
                        result.innerHTML = "Player 1 is the winner!";
                        return true;
                    } else if (stringArr[2] == "O") {
                        
                        result.innerHTML = "Player 2 is the winner!";
                        return true;
                    }
                }
            }
        }  
    } 
}
function computerTurn() {
   
    let stringArr = [];
    for (let i = 0; i < Gameboard.length; ++i) {
        if (Gameboard[i].innerHTML) {
            stringArr.push(Gameboard[i].innerHTML);
        } else {
        stringArr.push(i);
        }
    }
    let options = emptyIndexies(stringArr);
    if (options.length == 0) {
        return;
    }
    let objectAns = minimax(stringArr, player2);
    let choice = objectAns.index;
    if (Gameboard[choice].innerHTML == "") {
        Gameboard[choice].innerHTML = player2;  
    }          
}
for (let XO of element) {
    XO.addEventListener('click', function onClick() {
        for (let i = 0; i < Gameboard.length; ++i) {
            if (Gameboard[i] == XO && Gameboard[i].innerHTML == "") {
                Gameboard[i].innerHTML = player1;
                computerTurn(); 
                checkWinner();
            } 
        }
    });
}
reset.addEventListener('click', function onClick() {

    for (let i = 0; i < Gameboard.length; ++i) {
        Gameboard[i].innerHTML = "";
        Gameboard[i].removeAttribute("value");
    }
    result.innerHTML = "Who will win?";

});
resetPopUp.addEventListener('click', function onClick() {
    for (let i = 0; i < Gameboard.length; ++i) {
        Gameboard[i].innerHTML = "";
        Gameboard[i].removeAttribute("value");
    }
    let popUp = document.querySelector(".popup");
    popUp.classList.add("hidden");
});
