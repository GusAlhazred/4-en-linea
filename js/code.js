let board = [[],[],[],[],[],[],[]];
// const buttonX0 = document.querySelector("#botonX0");
// const buttonX1 = document.querySelector("#botonX1");
// const buttonX2 = document.querySelector("#botonX2");
// const buttonX3 = document.querySelector("#botonX3");
// const buttonX4 = document.querySelector("#botonX4");
// const buttonX5 = document.querySelector("#botonX5");
// const buttonX6 = document.querySelector("#botonX6");
const buttons = document.querySelectorAll(".botonSup");
const buttonBoards = document.querySelectorAll(".botonBoard")
const showTurn = document.querySelector("#nroTurno")
const PlayersTurn = document.querySelector("#turnoJugador")
const winner = document.querySelector("#ganador")
const VictoryText = document.querySelector("#textoVictoria")
const displayPlayerTurn = document.querySelector("#displayPlayerTurn")
const players = ["Rojo", "Azul"]
const botonReset = document.querySelector("#botonReset")
const gray = document.querySelector("#grises");
const menuEndGame = document.querySelector(".mostrarGanador")
const errorMessage = document.querySelector(".error")

let wrongClick= 0;
let turn = 1;
let end = 0;

const resetGame = () => {
    // console.log("falopa")
    turn = 1;
    end= 0;
    board = [[],[],[],[],[],[],[]];
    drawBoard()
    VictoryText.classList.remove("jugadorRojo")
    VictoryText.classList.remove("jugadorAzul")
    menuEndGame.classList.add("hidden");
    PlayersTurn.textContent=players[(turn+1)%2];
    showTurn.textContent=turn;
    buttons.forEach(boton => {
        boton.classList.add("botonRojo"); boton.classList.remove("botonAzul")
    })
    botonReset.classList.add("hidden")
    displayPlayerTurn.classList.remove("hidden")
    gray.classList.remove("grises")

    

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
        VictoryText.classList.add("ganador")
        winner.textContent=players[(turn%2)]
        botonReset.classList.remove("hidden")
        displayPlayerTurn.classList.add("hidden")
        gray.classList.add("grises")
        turn%2==0? VictoryText.classList.add("jugadorRojo") : VictoryText.classList.add("jugadorAzul")
    }
}

const drawBoard = () => {
    x=0;
    y=0;
    buttonBoards.forEach(boton => {
        
        const rowActual = boton.dataset.col-1;
        const colActual = boton.dataset.row-1;
        if (board[colActual][rowActual] == "X"){
            boton.classList.add("botonAzul")
        } else if (board[colActual][rowActual] == "O"){
            boton.classList.add("botonRojo")
        } else {
            boton.classList.remove("botonRojo")
            boton.classList.remove("botonAzul")
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
        turn%2 === 1? errorMessage.classList.add("jugadorRojo") : errorMessage.classList.remove("jugadorRojo")
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
            button.classList.remove("botonAzul")
        })
    } else {
        board[e.target.dataset.column].push("O");
        buttons.forEach((button) => {
            button.classList.add("botonAzul")
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
    // buttonX0.addEventListener("click", resolveUserInteraction)
    // buttonX1.addEventListener("click", resolveUserInteraction)
    // buttonX2.addEventListener("click", resolveUserInteraction)
    // buttonX3.addEventListener("click", resolveUserInteraction)
    // buttonX4.addEventListener("click", resolveUserInteraction)
    // buttonX5.addEventListener("click", resolveUserInteraction)
    // buttonX6.addEventListener("click", resolveUserInteraction)
    buttons.forEach(button => {button.addEventListener("click", resolveUserInteraction)})
}

initialLoad()
