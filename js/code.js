let board = [[],[],[],[],[],[],[]];
const buttons = document.querySelectorAll(".supButton");
const buttonBoards = document.querySelectorAll(".botonBoard")
const showTurn = document.querySelector("#numTurn")
const PlayersTurn = document.querySelector("#turnoJugador")
const winner = document.querySelector("#winner")
const victoryText = document.querySelector("#victoryText")
const displayPlayerTurn = document.querySelector("#displayPlayerTurn")
const players = ["Rojo", "Azul"]
const resetButton = document.querySelector("#resetButton")
const gray = document.querySelector("#gray");
const menuEndGame = document.querySelector(".displayWinner")
const errorMessage = document.querySelector(".error")

let wrongClick= 0;
let turn = 1;
let end = 0;

const resetGame = () => {
    turn = 1;
    end= 0;
    board = [[],[],[],[],[],[],[]];
    drawBoard()
    victoryText.classList.remove("redPlayer")
    victoryText.classList.remove("bluePlayer")
    menuEndGame.classList.add("hidden");
    PlayersTurn.textContent=players[(turn+1)%2];
    showTurn.textContent=turn;
    buttons.forEach(button => {
        button.classList.add("redButton"); button.classList.remove("blueButton")
    })
    resetButton.classList.add("hidden")
    displayPlayerTurn.classList.remove("hidden")
    gray.classList.remove("gray")

    

}

const checkEnd = () => {
    for(x=0; x < board.length; x++){
        for(y=0; y < board[x].length; y++){
            board[x][y] == board[x][y+1] && board[x][y] == board[x][y+2] && board[x][y] == board[x][y+3] && (end = 1);
        }
    }
    for(x=0; x < board.length-3; x++){
        for(y=0; y < board[x].length; y++){
            board[x][y] == board[x+1][y] && board[x][y] == board[x+2][y] && board[x][y] == board[x+3][y] && (end = 1);
            board[x][y] == board[x+1][y+1] && board[x][y] == board[x+2][y+2] && board[x][y] == board[x+3][y+3] && (end = 1);
            board[x][y] == board[x+1][y-1] && board[x][y] == board[x+2][y-2] && board[x][y] == board[x+3][y-3] && (end = 1);
        }
    }

    if(end==1){
        menuEndGame.classList.remove("hidden")
        victoryText.classList.add("winner")
        winner.textContent=players[(turn%2)]
        resetButton.classList.remove("hidden")
        displayPlayerTurn.classList.add("hidden")
        gray.classList.add("gray")
        turn%2==0? victoryText.classList.add("redPlayer") : victoryText.classList.add("bluePlayer")
    }
}

const drawBoard = () => {
    x=0;
    y=0;
    buttonBoards.forEach(button => {
        const rowActual = button.dataset.col-1;
        const colActual = button.dataset.row-1;
        if (board[colActual][rowActual] == "X"){
            button.classList.add("blueButton")
        } else if (board[colActual][rowActual] == "O"){
            button.classList.add("redButton")
        } else {
            button.classList.remove("redButton")
            button.classList.remove("blueButton")
        }
    })
}

const refreshTurn = () => {
    showTurn.textContent=turn;
    PlayersTurn.textContent=players[(turn+1)%2];
    end === 1 && (PlayersTurn.textContent="");
}

const returnErrorMessage = () => {
    if (wrongClick == 0) {
        wrongClick=1;
        errorMessage.classList.remove("hidden")
        errorMessage.classList.add("mensajeError", "errorAnimacion");
        turn%2 === 1? errorMessage.classList.add("redPlayer") : errorMessage.classList.remove("redPlayer")
        setTimeout( () => {
            errorMessage.classList.add("hidden")
            errorMessage.classList.remove("mensajeError", "errorAnimacion")
            wrongClick=0;
        },999)}
}

const addPlayersMove = (e) => {
    if(turn%2 === 0){
        board[e.target.dataset.column].push("X");
        buttons.forEach((button) => {
            button.classList.remove("blueButton")
        })
    } else {
        board[e.target.dataset.column].push("O");
        buttons.forEach((button) => {
            button.classList.add("blueButton")
        })
    }
}

const resolveUserInteraction = (e) => {
    if ((board[e.target.dataset.column].length < 6) && (end == 0)){
        addPlayersMove(e)
        turn++;
    } else {
        returnErrorMessage()
    }
    checkEnd()
    drawBoard()
    refreshTurn()
}

const initialLoad = () => {
    buttons.forEach(button => {button.addEventListener("click", resolveUserInteraction)})
}

initialLoad()
