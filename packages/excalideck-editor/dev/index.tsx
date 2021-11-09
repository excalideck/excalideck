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
            onDeckChange={(newDeck) => {
                console.log("onDeckChange");
                console.log(newDeck);
            }}
            fileSavingState={null}
            onLoadFromFile={() => {
                console.log("onOpen");
            }}
            onSaveToFile={() => {
                console.log("onSave");
            }}
            initialLibrary={[]}
            onLibraryChange={(newLibrary) => {
                console.log("onLibraryChange");
                console.log(newLibrary);
            }}
        />
    </StrictMode>,
    document.getElementById("root")
);
