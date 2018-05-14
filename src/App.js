import React, { Component, Fragment } from 'react';
import './App.css';
import styled from 'styled-components';

const Container = styled.div`
  background: gray;
  height: 80vh;
  width: 80vh;
  position: relative;
`;

const Square = styled.div`
  width: 44px;
  height: 44px;
  background: black;
  position: absolute;
  border: 3px solid white;
`;

const Figure = ({position={x:0, y:0}, elements=[{x:0,y:0}], angle}) => {
  const convertToPx = (pointPosition, figurePosition) => {
    return 50 * (pointPosition + figurePosition)  + 'px';
  }
  const squares = elements.map((element, index) => {
    return <Square key={index} style={{top: convertToPx(element.y, position.y), left: convertToPx(element.x, position.x)}} />
  })
  return <Fragment>
    {squares}
  </Fragment>
}

class App extends Component {

  componentDidMount() {
     this.interval = setInterval(this.handleMoveDown, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  state = {
    FigurePosition: {x:0, y:0},
  }
  handleMoveRight = () => {
    console.warn('right');
    const {x: prevX} =  this.state.FigurePosition;
    this.setState({FigurePosition: {...this.state.FigurePosition, x: prevX + 1, }});
  }
  handleMoveLeft = () => {
    console.warn('left');
    const {x: prevX} =  this.state.FigurePosition;
    this.setState({FigurePosition: {...this.state.FigurePosition, x: prevX - 1, }});
  }
  handleRotate = () => {
    console.warn('rotate');
  }
  handleMoveDown = () => {
    console.warn('down');
    const {y: prevY} =  this.state.FigurePosition;
    this.setState({FigurePosition: {...this.state.FigurePosition, y: prevY + 1, }});    
  }
  handleKeyUp = (e) => {
    
    switch (e.which) {
      case 65:
      case 37:
      this.handleMoveLeft()
      break;
      case 68:
      case 39:
      this.handleMoveRight()
      break;
      case 87:
      case 38:
      this.handleRotate()
      break;
      case 83:
      case 40:
      this.handleMoveDown()
      break;
    }
  }

  render() {
    const { FigurePosition } = this.state;
    return (
      <Container onKeyUp={this.handleKeyUp} tabIndex="0">
        <Figure elements={[{x:0, y:0}, {x:0, y: 1}]} position={ FigurePosition } />
      </Container>
    );
  }
}

export default App;
