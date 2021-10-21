import { nanoid } from "nanoid";
import Deck from "../Excalideck/entities/Deck";
import ExcalidrawElement from "../Excalideck/entities/ExcalidrawElement";
import makePrintableAreaPerimeter from "../Excalideck/entities/PrintableArea/makePrintableAreaPerimeter";
import Rectangle from "../Excalideck/entities/Rectangle";
import Slide from "../Excalideck/entities/Slide";

const defaultPrintableArea: Rectangle = {
    topLeftCorner: { x: 0, y: 0 },
    bottomRightCorner: { x: 1500, y: 1000 },
};
const defaultPrintableAreaPerimeter: ExcalidrawElement =
    makePrintableAreaPerimeter(defaultPrintableArea);
const emptySlide: Slide = {
    id: nanoid(),
    shouldRender: true,
    shouldRenderWithCommonElements: true,
    elements: [defaultPrintableAreaPerimeter],
};
const emptyDeck: Deck = {
    printableArea: defaultPrintableArea,
    commonElements: [defaultPrintableAreaPerimeter],
    slides: [emptySlide],
};
export default emptyDeck;
