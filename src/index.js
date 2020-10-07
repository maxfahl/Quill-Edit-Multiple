import "@atlaskit/css-reset";
import "quill/dist/quill.snow.css";
import "./index.css"

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    rootElement
);
