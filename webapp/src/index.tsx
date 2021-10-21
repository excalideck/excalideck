import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { initialDeck } from "./config";
import "./index.css";

ReactDOM.render(
    <StrictMode>
        <App initialDeck={initialDeck} />
    </StrictMode>,
    document.getElementById("root")
);
