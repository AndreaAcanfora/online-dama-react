import React, { useEffect } from "react";
import Select from "react-select";
import ReactDOM from "react-dom";
import { getIDMoves, getListMoves } from "./moves.js";
import Board from './Board';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://10.20.16.81:4001",//"http://192.168.1.53:4001",//"http://127.0.0.1:4001",
  socket       = socketIOClient(ENDPOINT);

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultSettings(8);

    this.handleInputChange = this.handleInputChange.bind(this);

    let dama = this;
    window.addEventListener("load", function () {
      dama.state.auto && dama.bot(dama.state.history[0].squares.slice());
    });
  }

  getDefaultSettings(size) {
    return {
      history: [
        {
          squares: squaresDefault(size),
          plainBefore: null,
          move: null,
          moveID: null,
        },
      ],
      settings: {
        show: 0,
        difficulty: 0,
        speedBot: 1000,
      },
      size: size,
      stepNumber: 0,
      myTurn: true,
      moving: false,
      pieceEatData: false,
      forceEatStatus: true,
      forceEat: [],
      auto: false,
      autoCount: 1000,
      winner: false
    };
  }

  isEnemyPieces(squares, i, j) {
    return squares[i][j] && this.state.myTurn === (squares[i][j] % 2 !== 0);
  }

  isMyPieces(squares, i, j) {
    return squares[i][j] && this.state.myTurn !== (squares[i][j] % 2 !== 0);
  }

  isNotForcePiece(squares, i, j) {
    if (!this.state.forceEat.length || !squares[i][j]) return false;
    let valid = false;
    for (let v of this.state.forceEat)
      if (v.from.i == i && v.from.j == j) valid = true;
    return !valid;
  }

  handleClick(i, j, playerMove) {
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    let current = history[history.length - 1];
    let squares = [];
    for (let v of current.squares) squares.push(v.slice());

    if (
      calculateWinner(squares) ||
      (i + j) % 2 ||
      this.isEnemyPieces(squares, i, j) ||
      this.isNotForcePiece(squares, i, j)
    ) {
      return 0;
    }

    if ( !playerMove ){
      socket.emit('move', {
        i: i,
        j: j
      });
    }

    if (squares[i][j]) return this.checkMoves(i, j, squares);
    if (this.state.moving) {
      //if ( this.state.auto || this.state.myTurn ) squareToString( squares, i, j, this.state.moving, this.state.size );
      this.move(history, squares, i, j);
      if ( this.state.auto || ( !this.state.myTurn && this.state.settings.difficulty ))
        this.bot(squares);
      else if (this.state.forceEatStatus) this.checkEat(squares);
    }
  }

  bot(squares) {
    this.state.forceEat = [];
    if (calculateWinner(squares)) return 1;
    let botMoves = this.botMoves(squares);
    if (!botMoves) return 0;
    switch (this.state.settings.difficulty) {
      case 1:
        this.botEasy(squares, botMoves.forceEat, botMoves.piecesToMove);
        break;
      case 2:
        this.botEasy(squares, botMoves.forceEat, botMoves.piecesToMove);
        break;
    }
  }

  botMoves(squares) {
    let forceEat = [],
      piecesToMove = [];

    for (let i = 0; i < this.state.size; i++) {
      for (let j = 0; j < this.state.size; j++) {
        if (this.isMyPieces(squares, i, j)) {
          let moves = this.checkMoves(i, j, squares, true);
          if (moves.length)
            piecesToMove.push({
              i: i,
              j: j,
              moves: moves,
            });
          if (this.state.forceEatStatus) {
            for (let k in moves)
              if (moves[k].enemy) {
                forceEat.push({
                  from: {
                    i: i,
                    j: j,
                  },
                  to: {
                    i: moves[k].i,
                    j: moves[k].j,
                  },
                });
              }
          }
        }
      }
    }

    if (forceEat.length) {
      piecesToMove = [];
      for (let k of forceEat) {
        if (!piecesToMove[k.from.i.toString() + k.from.j.toString()]) {
          piecesToMove[k.from.i.toString() + k.from.j.toString()] = {
            i: k.from.i,
            j: k.from.j,
            moves: [],
          };
        }
        piecesToMove[k.from.i.toString() + k.from.j.toString()].moves.push({
          i: k.to.i,
          j: k.to.j,
        });
      }
      piecesToMove = Object.values(piecesToMove);
    }

    if (!piecesToMove.length) {
      this.setState({
        winner: this.state.myTurn ? "2" : "1",
      });
      return 0;
    }
    return { forceEat: forceEat, piecesToMove: piecesToMove };
  }

  botEasy(squares, forceEat, piecesToMove) {
    let pieceToMove =
        piecesToMove[Math.floor(Math.random() * piecesToMove.length)],
      dama = this;
    setTimeout(function () {
      dama.handleClick(pieceToMove.i, pieceToMove.j);
      setTimeout(function () {
        let move =
          pieceToMove.moves[
            Math.floor(Math.random() * pieceToMove.moves.length)
          ];
        dama.handleClick(move.i, move.j);
      }, dama.state.settings.speedBot / 2);
    }, dama.state.settings.speedBot / 2);

    if (this.state.forceEatStatus) {
      this.setState({
        forceEat: forceEat,
      });
    }
  }

  checkEat(squares) {
    if (calculateWinner(squares)) return 1;

    let forceEat = [];
    for (let i = 0; i < this.state.size; i++) {
      for (let j = 0; j < this.state.size; j++) {
        if (this.isMyPieces(squares, i, j)) {
          let moves = this.checkMoves(i, j, squares, true);
          for (let k in moves)
            if (moves[k].enemy) {
              forceEat.push({
                from: {
                  i: i,
                  j: j,
                },
                to: {
                  i: moves[k].i,
                  j: moves[k].j,
                },
              });
            }
        }
      }
    }

    this.setState({
      forceEat: forceEat,
    });
  }

  checkMoves(i, j, matrix, returnTo) {
    let to = [],
      alpha = 0;
    if (matrix[i][j] === 2) alpha = -1;
    if (matrix[i][j] === 1 || matrix[i][j] > 2) alpha = 1;
    this.addMove(to, matrix, i, j, alpha, -1);
    this.addMove(to, matrix, i, j, alpha, 1);
    if (matrix[i][j] > 2) {
      this.addMove(to, matrix, i, j, -1, -1);
      this.addMove(to, matrix, i, j, -1, 1);
    }

    if (returnTo) return to;

    if (to.length) {
      this.setState({
        moving: {
          from: {
            i: i,
            j: j,
          },
          to: to,
        },
      });
    }
    return !!to.length;
  }

  isValidCoords(i, j) {
    return i >= 0 && j >= 0 && i < this.state.size && j < this.state.size;
  }

  addMove(to, matrix, i, j, alpha, beta) {
    let ii = i + alpha,
      jj = j + beta,
      type = matrix[i][j];
    if (this.isValidCoords(ii, jj)) {
      if (!matrix[ii][jj]) {
        if (!this.state.forceEat.length)
          to.push({
            i: ii,
            j: jj,
          });
      } else {
        let len = to.length;
        to = this.addMoveEnemy(type, matrix, i, j, alpha, beta, to);

        if (to.length > len) {
          let firstEnemy = [
            {
              i: ii,
              j: jj,
            },
          ];
          ii += alpha;
          jj += beta;
          to = this.addMoveEnemy(
            type,
            matrix,
            ii,
            jj,
            alpha,
            beta,
            to,
            firstEnemy.slice()
          );
          to = this.addMoveEnemy(
            type,
            matrix,
            ii,
            jj,
            alpha,
            -beta,
            to,
            firstEnemy.slice()
          );
          if (type > 2) {
            to = this.addMoveEnemy(
              type,
              matrix,
              ii,
              jj,
              -alpha,
              beta,
              to,
              firstEnemy.slice()
            );
          }
        }
      }
    }
    return to;
  }

  addMoveEnemy(type, matrix, ii, jj, alpha, beta, to, enemy) {
    ii += alpha;
    jj += beta;
    if (
      this.isValidCoords(ii, jj) &&
      matrix[ii][jj] &&
      isEnemy(type, matrix[ii][jj], this.state.pieceEatData)
    ) {
      if (!enemy) enemy = [];
      enemy.push({
        i: ii,
        j: jj,
      });
      ii += alpha;
      jj += beta;
      if (this.isValidCoords(ii, jj) && !matrix[ii][jj])
        to.push({
          i: ii,
          j: jj,
          enemy: enemy,
        });
    }
    return to;
  }

  eatEnemy(squares, to) {
    if (typeof to.enemy != "undefined") {
      for (let v of to.enemy) {
        squares[v.i][v.j] = null;
      }
    }
    return squares;
  }

  move(history, squares, i, j) {
    let plain = "",
      moving = this.state.moving,
      move = {
        from: moving.from,
        to: {
          i: i,
          j: j,
        },
      },
      moveID;
    for (let k in squares)
      for (let kk in squares[k])
        if (-(-kk - k) % 2 === 0)
          plain += squares[k][kk] ? squares[k][kk] : "0";

    if (!moving.from) {
      this.setState({
        winner: this.state.myTurn ? "1" : "2",
      });
      return 0;
    }

    moveID = getIDMoves(
      moving.from.i,
      moving.from.j,
      i,
      j,
      squares[moving.from.i][moving.from.j]
    );

    for (let v of moving.to)
      if (v.i === i && v.j === j) {
        squares = this.eatEnemy(squares, v);
        squares[i][j] = squares[moving.from.i][moving.from.j];
        if (
          (i == this.state.size - 1 && squares[i][j] === 1) ||
          (!i && squares[i][j] === 2)
        )
          squares[i][j] += 2; // trasform to DAMA
        squares[moving.from.i][moving.from.j] = null;
        this.state.myTurn = !this.state.myTurn;
        this.state.moving = false;
      }

    this.setState({
      history: history.concat([
        {
          squares: squares,
          plainBefore: plain,
          move: move,
          moveID: moveID,
        },
      ]),
      stepNumber: history.length,
      myTurn: this.state.myTurn,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      myTurn: step % 2 === 0,
      moving: false,
      winner: false,
    });
    this.state.myTurn = step % 2 === 0;
    let history = this.state.history.slice(0, step + 1);
    let current = history[history.length - 1];
    let squares = [];
    for (let v of current.squares) squares.push(v.slice());
    if (this.state.auto) this.bot(squares);
    else if (this.state.forceEatStatus) this.checkEat(squares);
  }

  showSettings() {
    this.setState({
      settings: {
        show: !this.state.settings.show,
        difficulty: this.state.settings.difficulty,
        speedBot: this.state.settings.speedBot,
      },
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  setSizeDama(event) {
    this.dama.setState(this.dama.getDefaultSettings(event.value));
  }

  setDifficulty(event) {
    let defaultSettings = this.dama.getDefaultSettings(this.dama.state.size);

    defaultSettings.settings.difficulty = event.value;

    this.dama.setState(defaultSettings);
  }

  componentDidUpdate() {
    let win =
      this.state.winner ||
      calculateWinner(this.state.history[this.state.stepNumber].squares);
    if (0 || win) {
      // for save all moves in database
      let history = this.state.history,
        len = history.length,
        ajax = [],
        ajaxI = [];
      for (let k in history)
        if (k != 0) {
          let h = history[k];
          history[k].by = k % 2 == 0 ? "bot" : "me";
          history[k].p1 = (h.plainBefore.match(/1/g) || []).length;
          history[k].p2 = (h.plainBefore.match(/2/g) || []).length;
          history[k].d1 = (h.plainBefore.match(/3/g) || []).length;
          history[k].d2 = (h.plainBefore.match(/4/g) || []).length;
          history[k].diff =
            k % 2 == 0
              ? history[k].p1 - history[k].p2
              : history[k].p2 - history[k].p1;
          history[k].diffDame =
            k % 2 == 0
              ? history[k].d1 - history[k].d2
              : history[k].d2 - history[k].d1;
          history[k].score = 0;
        }

      for (let k in history)
        if (k != 0) {
          k = +k;
          let score = 0;
          if (k + 1 < len - 1) {
            history[k]["diff+2"] = history[k + 2].diff - history[k].diff;
            history[k]["diffDame+2"] =
              history[k + 2].diffDame - history[k].diffDame;
            if (k + 3 >= len - 1)
              score += history[k]["diff+2"] / 2 + history[k]["diffDame+2"];
          }
          if (k + 3 < len - 1) {
            history[k]["diff+4"] = history[k + 4].diff - history[k].diff;
            history[k]["diffDame+4"] =
              history[k + 4].diffDame - history[k].diffDame;
            score +=
              (history[k]["diff+4"] + history[k]["diff+2"]) / 2 +
              history[k]["diffDame+2"] +
              history[k]["diffDame+4"];
          }
          history[k].score = score;

          let inverse = getInverse(
            history[k].plainBefore.slice(),
            history[k].move.from.i,
            history[k].move.from.j,
            history[k].move.to.i,
            history[k].move.to.j,
            this.state.size,
            history[k].squares[history[k].move.to.i][history[k].move.to.j]
          );

          ajax.push(
            history[k].plainBefore + "|" + history[k].moveID + "|" + score
          );
          ajaxI.push(inverse + "|" + score);
        }

      // ajax for save moves
      var xhttp = new XMLHttpRequest(),
        This = this;
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          var result = this.response;
          console.log("result", result);
        }
      };
      xhttp.responseType = "json";
      xhttp.open("POST", "http://localhost/dama/save-moves.php");
      xhttp.send(
        JSON.stringify({
          ajax: ajax,
          ajaxI: ajaxI,
        })
      );
    }
    if (this.state.auto) {
      if (this.state.autoCount > 1 && win) {
        this.state.autoCount--;
        this.jumpTo(0);
      } else if (this.state.autoCount == 1 && win) console.log(getListMoves());
    }
  }

  render() {
    const history = this.state.history,
      current = history[this.state.stepNumber],
      winner = this.state.winner || calculateWinner(current.squares),
      historyLen = history.length,
      settingsStyle = { display: this.state.settings.show ? "block" : "none" },
      back =
        this.state.stepNumber > 0 ? (
          <button onClick={() => this.jumpTo(this.state.stepNumber - 1)}>
            Back
          </button>
        ) : (
          ""
        ); //

    let status;
    if (winner) {
      status = "Winner: Player" + winner;
    } else {
      status = "Next player: " + (this.state.myTurn ? "Player 1" : "Player 2");
    }

    const optionsSize = [
        { value: "6", label: "6" },
        { value: "8", label: "8" },
        { value: "10", label: "10" },
      ],
      optionsDiff = [
        { value: 0, label: "Nessuno" },
        { value: 1, label: "Facile" },
      ];

    const customStyles = {
      option: (base, state) => ({
        ...base,
        color: state.isSelected ? "white" : "#333",
        cursor: state.isSelected ? "default" : "pointer",
      }),
    };

    return (
      <div className="game">
        <div className="game-info">
          <img
            alt="Play classic dama - settings"
            src="img/classic-dama-settings.svg"
            width="32"
            onClick={() => this.showSettings()}
          />
          <div>{status}</div>
          <button onClick={() => this.jumpTo(0)}>New Game</button>
          {back}
        </div>
        <div className="game-settings" style={settingsStyle}>
          <img
            alt="Play classic dama - settings"
            src="img/close-dama.svg"
            width="32"
            onClick={() => this.showSettings()}
          />
          <div className="p-30">
            <label>
              I pedoni possono mangiare la dama:
              <input
                name="pieceEatData"
                type="checkbox"
                checked={this.state.pieceEatData}
                onChange={this.handleInputChange}
              />
            </label>
            <br />
            <div className="mt-20">
              <label>
                Cattura obbligatoria
                <input
                  name="forceEatStatus"
                  type="checkbox"
                  checked={this.state.forceEatStatus}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <br />
            <div className="mt-20">
              <label>
                Grandezza tabella
                <Select
                  styles={customStyles}
                  onChange={this.setSizeDama}
                  dama={this}
                  options={optionsSize}
                  defaultValue={optionsSize[1]}
                />
              </label>
            </div>
            <br />
            <div className="mt-20">
              <label>
                Bot
                <Select
                  styles={customStyles}
                  onChange={this.setDifficulty}
                  dama={this}
                  options={optionsDiff}
                  defaultValue={optionsDiff[this.state.settings.difficulty]}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="game-board">
          <Board
            squares={current.squares}
            size={this.state.size}
            moving={this.state.moving}
            forceEat={this.state.forceEat}
            onClick={(i, j) => this.handleClick(i, j)}
          />
        </div>
        <ClientComponent 
          dama={this}
        />
      </div>
    ); //
  }
}

// ========================================


function ClientComponent( props ) {

  useEffect(() => {
    
    socket.on("move", data => {
      props.dama.handleClick(data.i, data.j, 1);
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);

  return '';
}

function isEnemy(me, enemy, pieceEatData) {
  if ((!pieceEatData && me == 1 && enemy == 2) || (me == 2 && enemy == 1))
    return true;
  if (me > 2 || pieceEatData) {
    if (me % 2 && !(enemy % 2)) return true;
    if (!(me % 2) && enemy % 2) return true;
  }
  return false;
}

function squareToString(square, i, j, moving, size) {
  let s = "",
    si = "",
    sn = "";
  for (let k in square)
    for (let kk in square[k])
      if (-(-kk - k) % 2 === 0) s += square[k][kk] ? square[k][kk] : "0";
  sn =
    s +
    getIDMoves(
      moving.from.i,
      moving.from.j,
      i,
      j,
      square[moving.from.i][moving.from.j]
    );
  si = getInverse(
    s.slice(),
    moving.from.i,
    moving.from.j,
    i,
    j,
    size,
    square[moving.from.i][moving.from.j]
  );
  console.log(sn);
  console.log(si);
}

function getInverse(s, mi, mj, i, j, size, type) {
  let inverse = { 1: "2", 2: "1", 3: "4", 4: "3" };
  mi = size - 1 - mi;
  mj = size - 1 - mj;
  i = size - 1 - i;
  j = size - 1 - j;
  s = s.split("").reverse().join("");
  return s + "|" + getIDMoves(mi, mj, i, j, inverse[type]);
}

function squaresDefault(size) {
  let matrix = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(
        !((i + j) % 2) && i < size / 2 - 1
          ? 1
          : !((i + j) % 2) && i > size / 2
          ? 2
          : null
      );
    }
    matrix.push(row);
  }
  return matrix;
}

function calculateWinner(argument) {
  var aWin = true,
    bWin = true;
  for (let row of argument)
    for (let v of row) {
      if (v === 1 || v === 3) aWin = false;
      if (v === 2 || v === 4) bWin = false;
    }
  return aWin ? 1 : bWin ? 2 : 0;
}

export default Game;
