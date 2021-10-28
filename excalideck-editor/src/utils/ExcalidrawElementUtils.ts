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

    getCommonExcalidrawElements(deck: Deck): ExcalidrawElement[] {
        return [
            ...deck.commonExcalidrawElements,
            PrintableAreaUtils.getExcalidrawElement(deck.printableArea),
        ];
    },

    extractCommonExcalidrawElements(
        /** They include common excalidraw elements and the printable area */
        sourceExcalidrawElements: ExcalidrawElement[]
    ): ExcalidrawElement[] {
        return ExcalidrawElementUtils.removeByIds(sourceExcalidrawElements, [
            PrintableAreaUtils.getExcalidrawElementId(),
        ]);
    },

    getSlideExcalidrawElements(
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
        /** They include common excalidraw elements and the printable area */
        sourceExcalidrawElements: ExcalidrawElement[],
        commonExcalidrawElements: ExcalidrawElement[]
    ): ExcalidrawElement[] {
        return ExcalidrawElementUtils.removeByIds(sourceExcalidrawElements, [
            ...ExcalidrawElementUtils.getIds(commonExcalidrawElements),
            PrintableAreaUtils.getExcalidrawElementId(),
        ]);
    },
};
export default ExcalidrawElementUtils;
