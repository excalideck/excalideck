import { Deck, DeckOperations, ExcalidrawElement } from "@excalideck/deck";
import PrintableAreaUtils from "./PrintableAreaUtils";

const ExcalidrawElementUtils = {
    getIds(excalidrawElements: ExcalidrawElement[]): string[] {
        return excalidrawElements.map(
            (excalidrawElement) => excalidrawElement.id
        );
    },

    removeByIds(
        excalidrawElements: ExcalidrawElement[],
        ids: string[]
    ): ExcalidrawElement[] {
        const idSet = new Set(ids);
        return excalidrawElements.filter(
            (excalidrawElement) => !idSet.has(excalidrawElement.id)
        );
    },

    getCommonExcalidrawElementsForExcalidrawInput(
        deck: Deck
    ): ExcalidrawElement[] {
        return [
            ...deck.commonExcalidrawElements,
            PrintableAreaUtils.getExcalidrawElement(deck.printableArea),
        ];
    },

    extractCommonExcalidrawElements(
        /** These include common excalidraw elements and the printable area */
        excalidrawInputExcalidrawElements: ExcalidrawElement[]
    ): ExcalidrawElement[] {
        return ExcalidrawElementUtils.removeByIds(
            excalidrawInputExcalidrawElements,
            [PrintableAreaUtils.getExcalidrawElementId()]
        );
    },

    getSlideExcalidrawElementsForExcalidrawInput(
        deck: Deck,
        slideId: string
    ): ExcalidrawElement[] {
        const slide = DeckOperations.getSlide(deck, slideId);
        return [
            ...slide.excalidrawElements,
            ...(slide.shouldRenderWithCommonExcalidrawElements
                ? deck.commonExcalidrawElements
                : []),
            PrintableAreaUtils.getExcalidrawElement(deck.printableArea),
        ];
    },

    extractSlideExcalidrawElements(
        /**
         * These include common excalidraw elements (possibly) and the printable
         * area
         */
        excalidrawInputExcalidrawElements: ExcalidrawElement[],
        commonExcalidrawElements: ExcalidrawElement[]
    ): ExcalidrawElement[] {
        return ExcalidrawElementUtils.removeByIds(
            excalidrawInputExcalidrawElements,
            [
                ...ExcalidrawElementUtils.getIds(commonExcalidrawElements),
                PrintableAreaUtils.getExcalidrawElementId(),
            ]
        );
    },
};
export default ExcalidrawElementUtils;
