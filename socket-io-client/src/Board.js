import React from "react";

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSquare(i, j, moving, size) {
    let active = moving ? moving.from.i == i && moving.from.j == j : false,
      moveTo = false,
      forceEat = false;
    if (moving)
      for (let v of moving.to) if (v.i == i && v.j == j) moveTo = true;

    if (this.props.forceEat)
      for (let v of this.props.forceEat)
        if (v.from.j == j && v.from.i == i) forceEat = true;

    return (
      <Square
        key={i + j}
        size={size}
        active={active}
        moveTo={moveTo}
        forceEat={forceEat}
        value={this.props.squares[i][j]}
        onClick={() => this.props.onClick(i, j)}
      />
    );
  }

  createBoard = () => {
    let board = [];
    for (let i = 0; i <= this.props.size - 1; i++) {
      let childrens = [];
      for (let j = 0; j <= this.props.size - 1; j++)
        childrens.push(
          this.renderSquare(i, j, this.props.moving, this.props.size)
        );
      board.push(
        <div className="board-row" key={i}>
          {childrens}
        </div>
      ); //
    }
    return board;
  };

  render() {
    return this.createBoard();
  }
}

function Square(props) {
  const className =
      "square flex" +
      (props.active ? " active" : "") +
      (props.moveTo ? " move" : "") +
      (props.forceEat ? " force" : ""),
    style = {
      width: "calc( (100% + " + (props.size - 1) + "px) / " + props.size + " )",
      height: "0",
      paddingBottom:
        "calc(((100% + " +
        (props.size - 1) +
        "px) / " +
        props.size +
        ") - 3px)",
    };
  return (
    <button style={style} className={className} onClick={props.onClick}>
      {getPiece(props.value)}
    </button> //
  );
}

function getPiece(v) {
  switch (v) {
    case 1:
      v = "piece";
      break;
    case 2:
      v = "piece enemy";
      break;
    case 3:
      v = "dama piece";
      break;
    case 4:
      v = "dama piece enemy";
      break;
    default:
      v = "";
  }
  return <div className={v}></div>; //
}

export default Board;