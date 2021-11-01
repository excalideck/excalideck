import PersistentExcalideckEditor from "@excalideck/persistent-excalideck-editor";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { initialDeck } from "./config";
import "./index.css";

ReactDOM.render(
    <StrictMode>
        <PersistentExcalideckEditor initialDeck={initialDeck} />
    </StrictMode>,
    document.getElementById("root")
);
