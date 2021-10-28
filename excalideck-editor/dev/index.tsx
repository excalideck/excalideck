import { DeckOperations } from "@excalideck/deck";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import ExcalideckEditor from "../src";
import "./index.css";

ReactDOM.render(
    <StrictMode>
        <ExcalideckEditor
            initialDeck={DeckOperations.makeEmptyDeck({
                topLeftCorner: { x: 0, y: 0 },
                bottomRightCorner: { x: 1500, y: 1000 },
            })}
            onDeckChange={(updatedDeck) => {
                console.log("onDeckChange");
                console.log(updatedDeck);
            }}
            persistenceState={null}
            onOpen={() => {
                console.log("onOpen");
            }}
            onSave={() => {
                console.log("onSave");
            }}
        />
    </StrictMode>,
    document.getElementById("root")
);
