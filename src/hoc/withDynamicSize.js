import React from "react";
import { debounce } from "../utils";

export const withDynamicSize = WrappedComponent => {
  return class extends React.Component {
    state = {
      size: null
    };
    updateSize = debounce(() => {
      const parentEl = this.div.parentElement;
      this.setState({
        size: {
          width: parentEl.offsetWidth,
          height: parentEl.offsetHeight
        }
      });
    }, 500);
    componentDidMount() {
      window.addEventListener("resize", this.updateSize);
      this.updateSize();
    }
    render() {
      return (
        <div ref={div => (this.div = div)}>
          {this.state.size && (
            <WrappedComponent size={this.state.size} {...this.props} />
          )}
        </div>
      );
    }
  };
};
