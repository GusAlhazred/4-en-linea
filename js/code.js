let board = [[],[],[],[],[],[],[]];
const botonX0 = document.querySelector("#botonX0");
const botonX1 = document.querySelector("#botonX1");
const botonX2 = document.querySelector("#botonX2");
const botonX3 = document.querySelector("#botonX3");
const botonX4 = document.querySelector("#botonX4");
const botonX5 = document.querySelector("#botonX5");
const botonX6 = document.querySelector("#botonX6");
const buttons = document.querySelectorAll(".botonSup");
const buttonBoards = document.querySelectorAll(".botonBoard")
const showTurn = document.querySelector("#nroTurno")
const turnoJugador = document.querySelector("#turnoJugador")
const jugadorGanador = document.querySelector("#ganador")
const textoVictoria = document.querySelector("#textoVictoria")
const displayPlayerTurn = document.querySelector("#displayPlayerTurn")
const jugadores = ["Rojo", "Azul"]
const botonReset = document.querySelector("#botonReset")

let turn = 1;
let end = 0;

const resetGame = () => {
    // console.log("falopa")
    turn = 1;
    end= 0;
    board = [[],[],[],[],[],[],[]];
    dibujarTablero()
    textoVictoria.classList.add("hidden");
    turnoJugador.textContent=jugadores[(turn+1)%2];
    showTurn.textContent=turn;
    buttons.forEach(boton => {
        boton.classList.add("botonRojo"); boton.classList.remove("botonAzul")
    })
    botonReset.classList.add("hidden")
    displayPlayerTurn.classList.remove("hidden")

}

const verificarFin = () => {
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
        textoVictoria.classList.remove("hidden")
        jugadorGanador.textContent=jugadores[(turn%2)]
        botonReset.classList.remove("hidden")
        displayPlayerTurn.classList.add("hidden")
    }
}

const dibujarTablero = () => {
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

const actualizarTurno = () => {
    showTurn.textContent=turn;
    turnoJugador.textContent=jugadores[(turn+1)%2];
    end === 1 && (turnoJugador.textContent="");
}

const pushearElementoSegunTurno = (e) => {
    if ((board[e.target.dataset.column].length < 6) && (end == 0)){
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
        turn++;
    } else {
        console.log("No se puede")
    }
    
    verificarFin()
    dibujarTablero()
    actualizarTurno()
    
}

const cargaInicial = () => {
    botonX0.addEventListener("click", pushearElementoSegunTurno)
    botonX1.addEventListener("click", pushearElementoSegunTurno)
    botonX2.addEventListener("click", pushearElementoSegunTurno)
    botonX3.addEventListener("click", pushearElementoSegunTurno)
    botonX4.addEventListener("click", pushearElementoSegunTurno)
    botonX5.addEventListener("click", pushearElementoSegunTurno)
    botonX6.addEventListener("click", pushearElementoSegunTurno)
}

cargaInicial()
