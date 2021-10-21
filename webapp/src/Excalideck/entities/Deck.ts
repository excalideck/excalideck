import ExcalidrawElement from "./ExcalidrawElement";
import Rectangle from "./Rectangle";
import Slide from "./Slide";

export default interface Deck {
    printableArea: Rectangle;
    commonElements: ExcalidrawElement[];
    slides: Slide[];
}
