import { KeyboardEventWatch } from "./hoc/KeybardEventsWatch";
import React from "react";
import App from "./App";
import { withDynamicSize } from "./hoc/withDynamicSize";
const AppWithDynamicSize = withDynamicSize(App);
export class MainContainer extends React.Component {
  render() {
    return (
      <KeyboardEventWatch
        render={action => <AppWithDynamicSize action={action} />}
      />
    );
  }
}
