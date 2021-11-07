import { Deck } from "@excalideck/deck";
import { debounce } from "lodash";

const LOCAL_STORAGE_ITEM_KEY = "ExcalideckLocalDeck";

const LocalDeck = {
    get(): Deck | null {
        try {
            const serializedDeck = localStorage.getItem(LOCAL_STORAGE_ITEM_KEY);
            return serializedDeck ? JSON.parse(serializedDeck) : null;
        } catch {
            // Ignore parsing errors, and just fallback to returning null
            return null;
        }
    },

    set: debounce((deck: Deck): void => {
        localStorage.setItem(LOCAL_STORAGE_ITEM_KEY, JSON.stringify(deck));
    }, 2000),
};
export default LocalDeck;
