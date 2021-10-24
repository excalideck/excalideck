import ExcalidrawElement from "./ExcalidrawElement";
import PrintableArea from "./PrintableArea";
import Slide from "./Slide";

export default interface Deck {
    readonly printableArea: PrintableArea;
    readonly commonExcalidrawElements: ExcalidrawElement[];
    readonly slides: Slide[];
}
