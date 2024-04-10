import { useState } from 'react';

function Square({ value, onSquareClick, iter, win=false }) {
  if (win === true) {
    return(
      <button className="square" style={{width:"208px", height: "208px"}} onClick={onSquareClick}>
        {value}
      </button>
    )   
  } else if (iter === 1) {
    return (
      <button className="square" style={{width:"70px", height: "70px"}} onClick={onSquareClick}>
        {value}
      </button>
    );
  } else {
    return (
        <button className="square">
          <Game iter={iter - 1}></Game>
        </button>
    );
  }
  
}

function Board({ xIsNext, squares, onPlay, iter }) {
  const [player, setPlayer] = useState("X")
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
    setPlayer(player === "X" ? 'O' : 'X')
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + player;
  }
  
  if (winner != null) {
    return(
      <Square win={true} value={winner} onSquareClick={() => handleClick(0)} iter={iter} />
    )
  } else if (iter === 1) {
    return (
      <>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} iter={iter} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} iter={iter} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} iter={iter} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} iter={iter} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} iter={iter} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} iter={iter} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} iter={iter} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} iter={iter} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} iter={iter} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} iter={iter} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} iter={iter} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} iter={iter} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} iter={iter} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} iter={iter} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} iter={iter} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} iter={iter} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} iter={iter} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} iter={iter} />
        </div>
      </>
    );
  }
  
}

export default function Game({iter=2}) {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [but, setBut] = useState('hist-but');
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button className={but} onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  if (iter === 1) {
    return (
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} iter={iter} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} iter={iter} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
