import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./components/App";

function Main() {
  return <App />;
}

let root = document.getElementById("root");
ReactDOM.createRoot(root).render(<Main />);
