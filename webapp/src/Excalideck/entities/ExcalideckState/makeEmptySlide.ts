import { nanoid } from "nanoid";
import Deck from "../Deck";
import makePrintableAreaPerimeter from "../PrintableArea/makePrintableAreaPerimeter";
import Slide from "../Slide";

export default function makeEmptySlide(deck: Deck): Slide {
    return {
        id: nanoid(),
        shouldRender: true,
        shouldRenderWithCommonElements: true,
        elements: [
            makePrintableAreaPerimeter(deck.printableArea),
            ...deck.commonElements,
        ],
    };
}
