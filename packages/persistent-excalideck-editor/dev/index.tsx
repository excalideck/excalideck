import { DeckOperations } from "@excalideck/deck";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import PersistentExcalideckEditor from "../src";
import "./index.css";

ReactDOM.render(
    <StrictMode>
        <PersistentExcalideckEditor
            initialDeck={DeckOperations.makeEmptyDeck({
                width: 1500,
                height: 1000,
            })}
            saveToLocalStorage={true}
        />
    </StrictMode>,
    document.getElementById("root")
);
