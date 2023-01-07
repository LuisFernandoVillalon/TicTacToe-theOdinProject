let element = document.getElementsByClassName("XO");
let mode = document.getElementById("levels");
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
//human
const player1 = "X";
//ai
const player2 = "O";
function randomChoice (options) {
    return Math.floor(Math.random() * options.length);
}
// returns list of the indexes of empty spots on the board
function emptyIndexies(board){
    return  board.filter(s => s != "O" && s != "X");
}
// winning combinations using the board indexies
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
//minimax function using recursion to obtain best possible move
function minimax(stringArr, player) {
    //available spots
    let availSpots = emptyIndexies(stringArr);
    // checks for the terminal states such as win, lose, and tie 
    // and returning a value accordingly
    if (winning(stringArr, player1)) {
      return { score: -10 };
    }
    else if (winning(stringArr, player2)) {
      return { score: 10 };
    }
    else if (availSpots.length == 0) {
      return { score: 0 };
    }
    // an array to collect all the objects
    let moves = [];

    // loop through available spots
    for (let i = 0; i < availSpots.length; ++i) {
    //create an object for each
      let move = {};
      for (let j = 0; j < stringArr.length; ++j) {
        if (availSpots[i] == stringArr[j]) {      
          //set the empoty spot to the current player
          stringArr[j] = player;
          //store the index in that spot
           move.index = j;
          break;
        }
      }
      //collect the score resulted from calling minimax 
      //on the opponent of the current player
      if (player == player2) {
        let result = minimax(stringArr, player1);
        move.score = result.score;
      } else if (player == player1) {
        let result = minimax(stringArr, player2);
        move.score = result.score;
      }
      // reset the spot to empty
      stringArr[move.index] = move.index;
      // push the object to the array
      moves.push(move);
    }
    let bestMove;
    // if it is the computer's turn loop over the moves and choose the move with the highest score
    if (player === player2) {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      // else loop over the moves and choose the move with the lowest score
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    // return the chosen move (object) from the moves array
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
                        result.innerHTML = "You win!";
                        return true;
                    } else if (stringArr[0] == "O") {
                        result.innerHTML = "The computer wins!";
                        return true;
                    }
                } else if (i == 1) {
                    if (stringArr[3] == "X") {
                        result.innerHTML = "You win!";
                        return true;
                    } else if (stringArr[3] == "O") {
                        result.innerHTML = "The computer wins!";
                        return true;
                    }
                } else if (i == 2) {
                    if (stringArr[6] == "X") {
                        result.innerHTML = "You win!";
                        return true;
                    } else if (stringArr[6] == "O") {
                        result.innerHTML = "The computer wins!";
                        return true;
                    }
                } else if (i == 4) {
                    if (stringArr[1] == "X") {
                        result.innerHTML = "You win!";
                        return true;
                    } else if (stringArr[1] == "O") {
                        result.innerHTML = "The computer wins!";
                        return true;
                    }
                } else if (i == 7 || i == 5) {
                    if (stringArr[2] == "X") {
                        
                        result.innerHTML = "You win!";
                        return true;
                    } else if (stringArr[2] == "O") {
                        
                        result.innerHTML = "The computer wins!";
                        return true;
                    }
                }
            }
        }  
    } 
}
function computerTurn() {
   let choice;
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
    if (mode.value == "hard") {
        let objectAns = minimax(stringArr, player2);
         choice = objectAns.index;
    } else if (mode.value == "easy") {
        let temp = randomChoice(options);
        choice = options[temp];
    }
    if (Gameboard[choice].innerHTML == "") {
        Gameboard[choice].innerHTML = player2;  
    }          
}
//Loops adds an eventlistener to every every element stored in 'element'.
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
    }
    result.innerHTML = "Who will win?";

});
mode.addEventListener('click', function onClick() {

    for (let i = 0; i < Gameboard.length; ++i) {
        Gameboard[i].innerHTML = "";
    }

});

resetPopUp.addEventListener('click', function onClick() {
    for (let i = 0; i < Gameboard.length; ++i) {
        Gameboard[i].innerHTML = "";
    }
    let popUp = document.querySelector(".popup");
    popUp.classList.add("hidden");
});
