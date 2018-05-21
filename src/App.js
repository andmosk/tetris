import React, { Component } from "react";
import "./App.css";
import { Container } from "./Container";
import { Blocks } from "./Blocks";

class App extends Component {
  state = {
    figure: {
      topLeft: { x: 0, y: 0 },
      elements: [[1, 0, 0], [1, 1, 1]]
    },
    size: {
      width: 10,
      height: 16
    },
    landed: [...Array(16)].map(_ => [...Array(10)].map(_ => 0))
  };

  componentDidMount() {
    // this.interval = setInterval(this.handleMoveDown, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleMoveRight = () => {
    console.warn("right");
    const { figure } = this.state;
    const { x: prevX } = figure.topLeft;
    const x = prevX + 1;
    const isCollision = this.checkCollision({ x });
    const isLanded = this.isLanded();
    if (isCollision || isLanded) {
      return;
    }
    this.setState({
      figure: { ...figure, topLeft: { ...figure.topLeft, x } }
    });
  };

  handleMoveLeft = () => {
    console.warn("left");
    const { figure } = this.state;
    const { x: prevX } = figure.topLeft;
    const x = prevX - 1;
    const isCollision = this.checkCollision({ x });
    if (isCollision) {
      return;
    }
    this.setState({
      figure: { ...figure, topLeft: { ...figure.topLeft, x } }
    });
  };

  handleRotate = () => {
    console.warn("rotate");
    const transpose = m => m[0].map((x, i) => m.map(x => x[i]));
    const { figure } = this.state;
    const { elements: prevElements } = figure;
    const elements = transpose(prevElements).reverse();
    const isCollision = this.checkCollision({ elements });
    if (isCollision) {
      return;
    }
    this.setState({ figure: { ...figure, elements } });
  };

  handleMoveDown = () => {
    console.warn("down");
    const { figure, landed: prevLanded } = this.state;
    const { elements, topLeft } = figure;
    const { y: prevY } = topLeft;
    const y = prevY + 1;
    const isLanded = this.isLanded(y);

    if (isLanded) {
      console.log("land", prevLanded);
      const landed = prevLanded.map(arr => arr.slice());

      const offsetLeft = topLeft.x;
      elements.forEach((row, i) => {
        const offsetTop = topLeft.y + i;
        row.forEach(
          (square, j) => square && (landed[offsetTop][j + offsetLeft] = 1)
        );
      });
      console.log(landed);
      this.setState({
        figure: { ...figure, topLeft: { ...topLeft, y: 0 } },
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

  handleKeyUp = event => {
    if (event.which === 65 || event.which === 37) {
      this.handleMoveLeft();
    }

    if (event.which === 68 || event.which === 39) {
      this.handleMoveRight();
    }

    if (event.which === 87 || event.which === 38) {
      this.handleRotate();
    }

    if (event.which === 83 || event.which === 40) {
      this.handleMoveDown();
    }
  };

  render() {
    const { figure, size, landed } = this.state;
    return (
      <Container
        onKeyUp={this.handleKeyUp}
        tabIndex="0"
        height={50 * size.height}
        width={50 * size.width}
      >
        <Blocks
          blocks={figure.elements}
          position={figure.topLeft}
          blockSize={50}
          prefix={"figure-"}
        />

        <Blocks blocks={landed} prefix={"landed-"} blockSize={50} />
      </Container>
    );
  }
}

export default App;
