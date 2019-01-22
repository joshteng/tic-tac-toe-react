import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: [[null, null, null], [null, null, null], [null, null, null]],
      player: "X",
      winner: null
    };
  }

  handleClick = e => {
    if (this.state.winner) {
      return false;
    }

    const updateGameState = this.updateIndicatorState(
      e.target.dataset["row"],
      e.target.dataset["column"]
    );

    if (updateGameState) {
      if (this.detectWinner()) {
        this.setState({ winner: this.state.player });
      } else {
        this.changePlayer();
      }
    }
  };

  detectWinner = () => {
    return (
      this.detectRowWinner() ||
      this.detectColumnWinner() ||
      this.detectDiagonalWinner()
    );
  };

  detectRowWinner = () => {
    for (let i = 0; i < 3; i++) {
      let row = [
        this.state.gameState[i][0],
        this.state.gameState[i][1],
        this.state.gameState[i][2]
      ];

      if (row[0] === "X" && row[1] === "X" && row[2] === "X") {
        return true;
      } else if (row[0] === "Y" && row[1] === "Y" && row[2] === "Y") {
        return true;
      }
    }
  };

  detectColumnWinner = () => {
    for (let i = 0; i < 3; i++) {
      let row = [
        this.state.gameState[0][i],
        this.state.gameState[1][i],
        this.state.gameState[2][i]
      ];

      if (row[0] === "X" && row[1] === "X" && row[2] === "X") {
        return true;
      } else if (row[0] === "Y" && row[1] === "Y" && row[2] === "Y") {
        return true;
      }
    }
  };

  detectDiagonalWinner = () => {
    const diagonalOne = [
      this.state.gameState[0][0],
      this.state.gameState[1][1],
      this.state.gameState[2][2]
    ];

    const diagonalTwo = [
      this.state.gameState[0][2],
      this.state.gameState[1][1],
      this.state.gameState[2][0]
    ];

    if (
      diagonalOne[0] === "X" &&
      diagonalOne[1] === "X" &&
      diagonalOne[2] === "X"
    ) {
      return true;
    } else if (
      diagonalOne[0] === "Y" &&
      diagonalOne[1] === "Y" &&
      diagonalOne[2] === "Y"
    ) {
      return true;
    } else if (
      diagonalTwo[0] === "X" &&
      diagonalTwo[1] === "X" &&
      diagonalTwo[2] === "X"
    ) {
      return true;
    } else if (
      diagonalTwo[0] === "Y" &&
      diagonalTwo[1] === "Y" &&
      diagonalTwo[2] === "Y"
    ) {
      return true;
    }
  };

  updateIndicatorState = (row, column) => {
    const { gameState } = this.state;

    if (gameState[row][column] === null) {
      gameState[row][column] = this.state.player;
      this.setState({ gameState });
      return true;
    } else {
      return false;
    }
  };

  changePlayer = () => {
    const newPlayer = this.state.player === "X" ? "Y" : "X";

    this.setState({
      player: newPlayer
    });
  };

  createBoxes = () => {
    const rows = [];

    // Outer loop to create parent
    for (let i = 0; i < 3; i++) {
      let columns = [];
      //Inner loop to create children
      for (let j = 0; j < 3; j++) {
        columns.push(
          <div
            className="box"
            onClick={this.handleClick}
            data-row={i}
            data-column={j}
          >
            {this.state.gameState[i][j]}
          </div>
        );
      }

      rows.push(
        <div className="d-flex flex-row justify-content-center">{columns}</div>
      );
    }
    return rows;
  };

  displayGameStatus = () => {
    if (this.state.winner) {
      return `Player ${this.state.winner} wins!`;
    } else if (this.detectDraw()) {
      return "Draw";
    } else {
      return `Player ${this.state.player}'s turn`;
    }
  };

  detectDraw = () => {
    if (!this.state.winner) {
      const { gameState } = this.state;

      if (
        !gameState[0].includes(null) &&
        !gameState[1].includes(null) &&
        !gameState[2].includes(null)
      ) {
        return true;
      }
    }
  };

  resetGame = () => {
    this.setState({
      gameState: [[null, null, null], [null, null, null], [null, null, null]],
      player: "X",
      winner: null
    });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="col-md-10 offset-md-1 tic-tac-toe">
            {this.displayGameStatus()}
            {this.createBoxes()}
            <button onClick={this.resetGame} className="btn btn-primary">
              Reset Game
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
