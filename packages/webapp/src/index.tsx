import PersistentExcalideckEditor from "@excalideck/persistent-excalideck-editor";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import CTABanner from "./components/CTABanner";
import config from "./config";
import "./index.css";
import InitialDeck from "./InitialDeck";
import registerServiceWorker from "./service-worker/registerServiceWorker";

async function init() {
    const initialDeck = await InitialDeck.get(config.isHomepage);
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

    if (!config.isHomepage) {
        registerServiceWorker(config.serviceWorkerScope);
    }
}
init();
