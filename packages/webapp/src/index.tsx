import PersistentExcalideckEditor from "@excalideck/persistent-excalideck-editor";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import config from "./config";
import getInitialDeck from "./getInitialDeck";
import "./index.css";

async function init() {
    const initialDeck = await getInitialDeck(config.isHomepage);
    ReactDOM.render(
        <StrictMode>
            <PersistentExcalideckEditor initialDeck={initialDeck} />
        </StrictMode>,
        document.getElementById("root")
    );
}
init();
