"use strict";

const winnerColor = document.getElementById("winner-color");
const winnerScore = document.getElementById("winner-score");
const looserScore = document.getElementById("looser-score");
const wrong = document.getElementById("wrong");
const right = document.getElementById("correct");
const squares = document.querySelectorAll(".square");

let numberSquares = 3;
let colorVar = storeColors();
let pickedColor = pickAColor();

/// Crear las variables de los marcadores
let scoreRight = 0;
let scoreWrong = 0;
const numRightOrWrong = 3;
const customModelMain = document.querySelector(".popup-main");
const playAgain = document.getElementById("play-again");
const youWin = document.getElementById("you-win");
const youLoose = document.getElementById("you-loose");

// Generar colores RGB aleatorios
function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  return "rgb(" + r + ", " + g + ", " + b + ")";
}

//Añadir uno de los colores aleatorios al selector
winnerColor.textContent = pickedColor.toUpperCase();

// Guardar los colores generados en un array
function storeColors() {
  let colorArray = [];
  for (let i = 0; i < numberSquares; i++) {
    colorArray.push(randomColor());
  }
  return colorArray;
}

// Elegir un color de el array guardado
function pickAColor() {
  let randomIndex = Math.floor(Math.random() * colorVar.length);
  return colorVar[randomIndex];
}

// Añade colores a las squares
function setUpColors() {
  squares.forEach(
    (currVal, ind) => (squares[ind].style.background = colorVar[ind])
  );
}

// Función del juego
function setUpGame() {
  squares.forEach((currVal, ind) => {
    squares[ind].addEventListener("click", function () {
      let clickedSquare = this.style.background;

      if (clickedSquare === pickedColor) {
        // Increntar en 1 el marcador de aciertos
        scoreRight++;
        winnerScore.textContent = scoreRight;
        //Mostrar el mensaje de acierto
        right.classList.remove("hidden");
      } else {
        // Increntar en 1 el marcador de fallos
        scoreWrong++;
        looserScore.textContent = scoreWrong;
        //Mostrar el mensaje de fallo
        wrong.classList.remove("hidden");
      }
      scoreSetUp();
    });
  });
}

// Función del marcador
function scoreSetUp() {
  // Al llegar a Número máximo de aciertos o fallos termina la partida
  if (scoreRight === numRightOrWrong || scoreWrong === numRightOrWrong) {
    customModelMain.classList.add("model-open");
    scoreRight === numRightOrWrong
      ? youWin.classList.remove("hidden")
      : youLoose.classList.remove("hidden");

    playAgain.addEventListener("click", function () {
      customModelMain.classList.remove("model-open");
      setTimeout(() => {
        resetGame();
      }, 500);
    });
  } else {
    //Timeout para resetear los colores
    setTimeout(() => {
      resetColors();
    }, 500);
  }
}

//Resetear los colores
function resetColors() {
  colorVar = storeColors();
  pickedColor = pickAColor();
  winnerColor.textContent = pickedColor.toUpperCase();
  setUpColors();
  setTimeout(() => {
    right.classList.add("hidden");
    wrong.classList.add("hidden");
  }, 500);
}

// Resetear el juego
function resetGame() {
  scoreRight = 0;
  scoreWrong = 0;
  winnerScore.textContent = scoreRight;
  looserScore.textContent = scoreWrong;
  youWin.classList.add("hidden");
  youLoose.classList.add("hidden");
  right.classList.add("hidden");
  wrong.classList.add("hidden");
}

// Empezar el juego
function init() {
  setUpColors();
  setUpGame();
}

// Añadir listener al evento de carga de la ventana para iniciar la app
window.addEventListener("load", init);
