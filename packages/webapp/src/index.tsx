import PersistentExcalideckEditor from "@excalideck/persistent-excalideck-editor";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import CTABanner from "./components/CTABanner";
import config from "./config";
import getInitialDeck from "./getInitialDeck";
import "./index.css";

async function init() {
    const initialDeck = await getInitialDeck(config.isHomepage);
    ReactDOM.render(
        <StrictMode>
            <PersistentExcalideckEditor
                initialDeck={initialDeck}
                saveToLocalStorage={!config.isHomepage}
            />
            {config.isHomepage ? <CTABanner /> : null}
        </StrictMode>,
        document.getElementById("root")
    );
}
init();
