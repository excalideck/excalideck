import Deck from "./Excalideck/entities/Deck";
import initialDecks from "./initialDecks";

const APP_CONFIG: Record<string, string> = (window as any).APP_CONFIG ?? {};

const { INITIAL_DECK = "homepage" } = APP_CONFIG;
export const initialDeck: Deck =
    initialDecks[INITIAL_DECK] ?? initialDecks.empty;
