import PropTypes from "prop-types";
import React from "react";
export class KeyboardEventWatch extends React.Component {
  state = {
    action: "1"
  };
  static propTypes = { render: PropTypes.func.isRequired };
  componentDidMount() {
    window.addEventListener("keyup", this.handleKeyUp);
  }
  handleKeyUp = event => {
    if (event.which === 65 || event.which === 37) {
      this.setState({ action: "left" });
    }

    if (event.which === 68 || event.which === 39) {
      this.setState({ action: "right" });
    }

    if (event.which === 87 || event.which === 38) {
      this.setState({ action: "rotate" });
    }

    if (event.which === 83 || event.which === 40) {
      this.setState({ action: "down" });
    }
  };
  render() {
    return this.props.render(this.state.action);
  }
}
