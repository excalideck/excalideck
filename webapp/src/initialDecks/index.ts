import { Deck } from "@excalideck/deck";
import empty from "./empty";
import homepage from "./homepage.json";

const initialDecks: Record<string, Deck> = { empty, homepage };
export default initialDecks;
