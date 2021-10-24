import Deck from "./entities/Deck";
import ExcalidrawElement from "./entities/ExcalidrawElement";
import PrintableArea from "./entities/PrintableArea";
import Slide from "./entities/Slide";

// Multiplications by different primes are done to avoid collisions
const Hash = {
    deck(deck: Deck): number {
        return (
            Hash.printableArea(deck.printableArea) +
            Hash.excalidrawElements(deck.commonExcalidrawElements) +
            Hash.slides(deck.slides)
        );
    },

    printableArea(printableArea: PrintableArea): number {
        return (
            2 * printableArea.topLeftCorner.x +
            3 * printableArea.topLeftCorner.y +
            5 * printableArea.bottomRightCorner.x +
            7 * printableArea.bottomRightCorner.y
        );
    },

    slide(slide: Slide): number {
        return (
            2 * (slide.shouldRender ? 0 : 1) +
            3 * (slide.shouldRenderWithCommonExcalidrawElements ? 0 : 1) +
            Hash.excalidrawElements(slide.excalidrawElements)
        );
    },

    slides(slides: Slide[]): number {
        return slides.reduce(
            // Multiply by index+1 to:
            // - index: make the hash order-dependent
            // - +1: avoid multiplying by 0
            (hash, slide, index) => hash + (index + 1) * Hash.slide(slide),
            0
        );
    },

    excalidrawElement(excalidrawElement: ExcalidrawElement): number {
        return excalidrawElement.versionNonce;
    },

    excalidrawElements(excalidrawElements: ExcalidrawElement[]): number {
        return excalidrawElements.reduce(
            // Multiply by index+1 to:
            // - index: make the hash order-dependent
            // - +1: avoid multiplying by 0
            (hash, excalidrawElement, index) =>
                hash + (index + 1) * Hash.excalidrawElement(excalidrawElement),
            0
        );
    },
};
export default Hash;
