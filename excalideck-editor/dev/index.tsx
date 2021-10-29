import { DeckOperations } from "@excalideck/deck";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ExcalideckEditor } from "../src";
import "./index.css";

ReactDOM.render(
    <StrictMode>
        <ExcalideckEditor
            initialDeck={DeckOperations.makeEmptyDeck({
                width: 1500,
                height: 1000,
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
