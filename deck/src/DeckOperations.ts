import Deck from "./entities/Deck";
import ExcalidrawElement from "./entities/ExcalidrawElement";
import PrintableArea from "./entities/PrintableArea";
import Slide from "./entities/Slide";
import SlideOperations from "./SlideOperations";

const DeckOperations = {
    makeEmptyDeck(printableArea: PrintableArea): Deck {
        return {
            commonExcalidrawElements: [],
            printableArea: printableArea,
            slides: SlideOperations.addEmpty([]),
        };
    },

    updatePrintableArea(deck: Deck, printableArea: PrintableArea): Deck {
        return { ...deck, printableArea };
    },

    updateCommonExcalidrawElements(
        deck: Deck,
        commonExcalidrawElements: ExcalidrawElement[]
    ): Deck {
        return { ...deck, commonExcalidrawElements };
    },

    addEmptySlide(deck: Deck): Deck {
        return {
            ...deck,
            slides: SlideOperations.addEmpty(deck.slides),
        };
    },

    moveSlide(deck: Deck, fromIndex: number, toIndex: number): Deck {
        return {
            ...deck,
            slides: SlideOperations.moveSlide(deck.slides, fromIndex, toIndex),
        };
    },

    deleteSlide(deck: Deck, slideId: string): Deck {
        const slides = SlideOperations.removeById(deck.slides, slideId);
        return {
            ...deck,
            slides: slides.length === 0 ? SlideOperations.addEmpty([]) : slides,
        };
    },

    updateSlideShouldRender(
        deck: Deck,
        slideId: string,
        shouldRender: boolean
    ): Deck {
        return {
            ...deck,
            slides: SlideOperations.updateShouldRenderById(
                deck.slides,
                slideId,
                shouldRender
            ),
        };
    },

    updateSlideShouldRenderWithCommonExcalidrawElements(
        deck: Deck,
        slideId: string,
        shouldRenderWithCommonExcalidrawElements: boolean
    ): Deck {
        return {
            ...deck,
            slides: SlideOperations.updateShouldRenderWithCommonExcalidrawElementsById(
                deck.slides,
                slideId,
                shouldRenderWithCommonExcalidrawElements
            ),
        };
    },

    updateSlideExcalidrawElements(
        deck: Deck,
        slideId: string,
        excalidrawElements: ExcalidrawElement[]
    ): Deck {
        return {
            ...deck,
            slides: SlideOperations.updateExcalidrawElementsById(
                deck.slides,
                slideId,
                excalidrawElements
            ),
        };
    },

    getSlide(deck: Deck, slideId: string): Slide {
        return SlideOperations.getById(deck.slides, slideId);
    },
};
export default DeckOperations;
