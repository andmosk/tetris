import React, { Component } from "react";
import "./App.css";
import { Container } from "./Container";
import { Blocks } from "./Blocks";
import { FIGURES } from "./figures";
import { shuffle, calcBlockSize } from "./utils";
const figuresName = Object.keys(FIGURES);
class App extends Component {
  state = {
    figure: {
      topLeft: { x: 3, y: 0 },
      elements: [[1, 1, 1]]
    },
    size: {
      width: 10,
      height: 16
    },
    landed: [...Array(16)].map(_ => [...Array(10)].map(_ => 0))
  };

  componentDidMount() {
    //this.interval = setInterval(this.handleMoveDown, 1000);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      const { action } = this.props;
      if (action === "left") {
        this.handleMoveVertically(action);
      }
      if (action === "right") {
        this.handleMoveVertically(action);
      }
      if (action === "rotate") {
        this.handleRotate();
      }
      if (action === "down") {
        this.handleMoveDown();
      }
    }
    const { landed, size } = this.state;

    const completedRowIndex = landed.findIndex(row =>
      row.every(block => block === 1)
    );
    if (completedRowIndex !== -1) {
      console.log("completed", completedRowIndex);
      const newLanded = [
        Array(size.width).fill(0),
        ...landed.slice(0, completedRowIndex),
        ...landed.slice(completedRowIndex + 1)
      ];
      this.setState({ landed: newLanded });
    }
  }
  componentWillUnmount() {
    // clearInterval(this.interval);
  }
  handleMoveVertically = direction => {
    const num = direction === "left" ? -1 : 1;
    const { figure } = this.state;
    const { x: prevX } = figure.topLeft;
    const x = prevX + num;
    const isCollision = this.checkCollision({ x });
    const isLanded = this.isLanded();

    if (!(isCollision || isLanded)) {
      this.setState({
        figure: { ...figure, topLeft: { ...figure.topLeft, x } }
      });
    }
  };

  handleRotate = () => {
    console.warn("rotate");
    const transpose = m => m[0].map((x, i) => m.map(x => x[i]));
    const { figure } = this.state;
    const { elements: prevElements } = figure;
    const elements = transpose(prevElements).reverse();
    const isCollision = this.checkCollision({ elements });

    if (!isCollision) {
      this.setState({ figure: { ...figure, elements } });
    }
  };

  handleMoveDown = () => {
    console.warn("down");
    const { figure, landed: prevLanded } = this.state;
    const { elements, topLeft } = figure;
    const { y: prevY } = topLeft;

    const y = prevY + 1;
    const isLanded = this.isLanded(y);

    if (isLanded) {
      console.warn("landed");
      const landed = prevLanded.map(arr => arr.slice());

      const offsetLeft = topLeft.x;

      elements.forEach((row, i) => {
        const offsetTop = topLeft.y + i;
        row.forEach(
          (square, j) => square && (landed[offsetTop][j + offsetLeft] = 1)
        );
      });

      const nextFigureName = shuffle(figuresName)[0];
      const nextFigure = FIGURES[nextFigureName];

      this.setState({
        figure: {
          ...figure,
          topLeft: { ...topLeft, y: 0 },
          elements: nextFigure
        },
        landed
      });
    } else {
      this.setState({
        figure: { ...figure, topLeft: { ...topLeft, y } }
      });
    }
  };

  checkCollision = ({
    x = this.state.figure.topLeft.x,
    elements = this.state.figure.elements
  }) => {
    const { size } = this.state;
    if (x < 0) {
      return true;
    }

    const offsetTop = this.state.figure.topLeft.y + elements.length - 1;

    if (offsetTop >= size.height) {
      return true;
    }

    const figureLength = elements[0].length;
    if (x + figureLength > size.width) {
      return true;
    }
    return false;
  };

  isLanded = (y = this.state.figure.topLeft.y) => {
    const { figure, landed, size } = this.state;
    const { elements, topLeft } = figure;
    const offsetLeft = topLeft.x;
    const offsetTop = y + elements.length - 1;

    if (offsetTop >= size.height) {
      return true;
    }

    const isCollision = elements.some((row, i) => {
      const offsetTop = topLeft.y + i + 1;
      return row.some(
        (square, i) => square + landed[offsetTop][i + offsetLeft] === 2
      );
    });
    return isCollision;
  };

  render() {
    const blockSize = calcBlockSize(
      this.props.size.width,
      this.props.size.height,
      10,
      16,
      50
    );
    const { figure, size, landed } = this.state;
    return (
      <Container
        onKeyUp={this.handleKeyUp}
        tabIndex="0"
        height={blockSize * size.height}
        width={blockSize * size.width}
      >
        <Blocks
          blocks={figure.elements}
          position={figure.topLeft}
          blockSize={blockSize}
          prefix={"figure-"}
        />
        <Blocks blocks={landed} prefix={"landed-"} blockSize={blockSize} />
      </Container>
    );
  }
}

export default App;
