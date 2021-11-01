import { DeckOperations } from "@excalideck/deck";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import ExcalideckEditor from "../src";
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
            fileSavingState={null}
            onLoadFromFile={() => {
                console.log("onOpen");
            }}
            onSaveToFile={() => {
                console.log("onSave");
            }}
        />
    </StrictMode>,
    document.getElementById("root")
);
