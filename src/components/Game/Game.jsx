import React, { useEffect, useState } from "react";
import gameTie from "../../assets/gameTie.svg";
import cirlePiece from "../../assets/circle.svg";
import crossPiece from "../../assets/cross.svg";
import circleWins from "../../assets/circleWins.svg";
import crossWins from "../../assets/crossWins.svg";
import "./Game.css";

export default function Game() {
  const emptyBoard = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ];
  
  const [turn, setTurn] = useState("circle");
  let [pieces, setPieces] = useState(0);
  let [board, setBoard] = useState(emptyBoard);
  const [winner, setWinner] = useState("");

  useEffect(() => {
    if (winner) {
      displayWinner(winner);
    }
    if (pieces >= 9 && winner.length >= 0) {
      displayTie();
      return;
    }
  }, [winner, pieces]);

  function addPiece(pos, piece) {
    //Obtain number position and substract for accurate array location
    let curPos = Number(pos.slice(3)) - 1;

    //Assign numeric value to the pieces
    piece === "cross" ? (piece = 1) : (piece = -1);

    //Iterate to locate the piece on the board array
    for (let i = 0; i < board.length; i++) {
      if (curPos < 3) {
        board[0][curPos] = piece;
      }
      if (curPos >= 3 && curPos < 6) {
        board[1][curPos - 3] = piece;
      }
      if (curPos >= 6 && curPos <= 9) {
        board[2][curPos - 6] = piece;
      }
    }

    //Check for diagonal win
    diagonalVictoryCheck(board);

    //Iterate to check for column win
    columnVictoryCheck(board);

    //Check for row victory
    rowVictoryCheck(board);

    //If pos numeric value is incorrect return an error
    if (curPos > 9) {
      return new Error("Not a valid position");
    }
  }

  function diagonalVictoryCheck(boardState) {
    if (boardState[0][0] + boardState[1][1] + boardState[2][2] === 3) {
      setWinner("Cross");
    }
    if (boardState[0][2] + boardState[1][1] + boardState[2][0] === 3) {
      setWinner("Cross");
    }
    if (boardState[0][0] + boardState[1][1] + boardState[2][2] === -3) {
      setWinner("Circle");
    }
    if (boardState[0][2] + boardState[1][1] + boardState[2][0] === -3) {
      setWinner("Circle");
    }
  }

  function rowVictoryCheck(boardState) {
    //Iterate over the row array and check for winner value. Return the corresponding winnner
    for (let i = 0; i < boardState.length; i++) {
      if (boardState[i].reduce((a, b) => a + b) === 3) {
        setWinner("Cross");
        return;
      } else if (boardState[i].reduce((a, b) => a + b) === -3) {
        setWinner("Cross");
        return;
      }
    }
  }

  function columnVictoryCheck(boardState) {
    //Iterate to check for column win
    //By adding the values of the columns and return the winner state
    for (let i = 0; i < boardState.length; i++) {
      if (board[0][i] + board[1][i] + board[2][i] === 3) {
        setWinner("Cross");
        return;
      }
      if (board[0][i] + board[1][i] + board[2][i] === -3) {
        setWinner("Circle");
        return;
      }
    }
  }

  function onClick(e) {
    e.preventDefault();
    if (e.target.className.includes("occupied")) {
      alert("This tile is taken, chose another!");
      return;
    }
    addPiece(e.target.id, turn);
    if (turn === "circle") {
      const circle = document.createElement("img");
      circle.id = "circle";
      circle.src = `${cirlePiece}`;
      circle.classList.add("occupied");
      e.target.appendChild(circle);
      setPieces(++pieces);
      setTurn("cross");
      return;
    }
    if (turn === "cross") {
      const cross = document.createElement("img");
      cross.id = "cross";
      cross.src = `${crossPiece}`;
      cross.classList.add("occupied");
      e.target.appendChild(cross);
      setPieces(++pieces);
      setTurn("circle");
      return;
    }
  }

  function displayTie() {
    if (winner.length > 0) {
      return;
    }

    const tieMessage = document.createElement("img");
    tieMessage.src = `${gameTie}`;
    tieMessage.className = "tieMessage";
    tieMessage.alt = "Game tied";

    const restartBtn = document.createElement("button");
    restartBtn.id = "restartBtn";
    restartBtn.className = "restartBtn";
    restartBtn.addEventListener("click", function () {
      window.location.reload();
    });
    restartBtn.innerText = "Restart";

    const gameWrapper = document.getElementById("gameWrapper");
    gameWrapper.style.opacity = 0.1;

    const finalMessage = document.getElementById("finalMessage");
    finalMessage.style.zIndex = 2;
    finalMessage.appendChild(tieMessage);
    finalMessage.appendChild(restartBtn);
  }

  function displayWinner(winner) {
    const winnerImage = document.createElement("img");
    if (winner === "Circle") {
      winnerImage.src = `${circleWins}`;
    }
    if (winner === "Cross") {
      winnerImage.src = `${crossWins}`;
    }
    winnerImage.className = "winnerMessage";
    winnerImage.alt = `${winner} won the match`;

    const restartBtn = document.createElement("button");
    restartBtn.id = "restartBtn";
    restartBtn.className = "restartBtn";
    restartBtn.addEventListener("click", function () {
      window.location.reload();
    });
    restartBtn.innerText = "Restart";

    const gameWrapper = document.getElementById("gameWrapper");
    gameWrapper.style.opacity = 0.1;

    const finalMessage = document.getElementById("finalMessage");
    finalMessage.style.zIndex = 2;
    finalMessage.appendChild(winnerImage);
    finalMessage.appendChild(restartBtn);
  }

  return (
    <>
      <div
        className="finalMessage"
        id="finalMessage"
        style={{ zIndex: -1 }}
      ></div>
      <div id="gameWrapper">
        <div className="piecesContainer">
          <div id="pos1" onClick={onClick}></div>
          <div id="pos2" onClick={onClick}></div>
          <div id="pos3" onClick={onClick}></div>
          <div id="pos4" onClick={onClick}></div>
          <div id="pos5" onClick={onClick}></div>
          <div id="pos6" onClick={onClick}></div>
          <div id="pos7" onClick={onClick}></div>
          <div id="pos8" onClick={onClick}></div>
          <div id="pos9" onClick={onClick}></div>
        </div>
      </div>
    </>
  );
}
