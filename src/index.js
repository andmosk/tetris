import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { MainContainer } from "./MainContainer";

ReactDOM.render(
  <div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <MainContainer />
  </div>,
  document.getElementById("root")
);
registerServiceWorker();
