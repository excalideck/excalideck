import Deck from "../Excalideck/entities/Deck";
import empty from "./empty";
import homepage from "./homepage";

const initialDecks: Record<string, Deck> = { empty, homepage };
export default initialDecks;
