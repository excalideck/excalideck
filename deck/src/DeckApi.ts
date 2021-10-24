import Deck from "./entities/Deck";
import ExcalidrawElement from "./entities/ExcalidrawElement";
import PrintableArea from "./entities/PrintableArea";
import Slide from "./entities/Slide";
import ExcalidrawElementUtils from "./utils/ExcalidrawElementUtils";
import PrintableAreaUtils from "./utils/PrintableAreaUtils";
import SlideUtils from "./utils/SlideUtils";

const DeckApi = {
    updatePrintableArea(deck: Deck, printableArea: PrintableArea): Deck {
        return { ...deck, printableArea };
    },

    updateCommonExcalidrawElementsFromRendering(
        deck: Deck,
        /** They include the printable area */
        excalidrawElements: ExcalidrawElement[]
    ): Deck {
        return {
            ...deck,
            commonExcalidrawElements: ExcalidrawElementUtils.removeByIds(
                excalidrawElements,
                [PrintableAreaUtils.getExcalidrawElementId()]
            ),
        };
    },

    addEmptySlide(deck: Deck): Deck {
        return {
            ...deck,
            slides: SlideUtils.addEmpty(deck.slides),
        };
    },

    moveSlide(deck: Deck, from: number, to: number): Deck {
        return {
            ...deck,
            slides: SlideUtils.moveSlide(deck.slides, from, to),
        };
    },

    deleteSlide(deck: Deck, slideId: string): Deck {
        return {
            ...deck,
            slides: SlideUtils.removeById(deck.slides, slideId),
        };
    },

    updateSlideShouldRender(
        deck: Deck,
        slideId: string,
        shouldRender: boolean
    ): Deck {
        return {
            ...deck,
            slides: SlideUtils.updateShouldRenderById(
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
            slides: SlideUtils.updateShouldRenderWithCommonExcalidrawElementsById(
                deck.slides,
                slideId,
                shouldRenderWithCommonExcalidrawElements
            ),
        };
    },

    updateSlideExcalidrawElementsFromRendering(
        deck: Deck,
        slideId: string,
        /** They include the printable area */
        excalidrawElements: ExcalidrawElement[]
    ): Deck {
        return {
            ...deck,
            slides: SlideUtils.updateExcalidrawElementsById(
                deck.slides,
                slideId,
                ExcalidrawElementUtils.removeByIds(excalidrawElements, [
                    ...ExcalidrawElementUtils.getIds(
                        deck.commonExcalidrawElements
                    ),
                    PrintableAreaUtils.getExcalidrawElementId(),
                ])
            ),
        };
    },

    getSlide(deck: Deck, slideId: string): Slide {
        return SlideUtils.getById(deck.slides, slideId);
    },

    getCommonExcalidrawElementsForRendering(deck: Deck): ExcalidrawElement[] {
        return [
            ...deck.commonExcalidrawElements,
            PrintableAreaUtils.getExcalidrawElement(deck.printableArea),
        ];
    },

    getSlideExcalidrawElementsForRendering(
        deck: Deck,
        slideId: string
    ): ExcalidrawElement[] {
        const slide = DeckApi.getSlide(deck, slideId);
        return [
            ...slide.excalidrawElements,
            ...(slide.shouldRenderWithCommonExcalidrawElements
                ? deck.commonExcalidrawElements
                : []),
            PrintableAreaUtils.getExcalidrawElement(deck.printableArea),
        ];
    },
};
export default DeckApi;
