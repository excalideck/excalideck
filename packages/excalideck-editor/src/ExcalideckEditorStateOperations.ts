import {
    DeckOperations,
    ExcalidrawElement,
    PrintableArea,
} from "@excalideck/deck";
import { last } from "lodash";
import ExcalideckEditorState from "./entities/ExcalideckEditorState";
import View from "./entities/View";
import SlideUtils from "./utils/SlideUtils";

const ExcalideckEditorStateOperations = {
    activateView(
        excalideckEditorState: ExcalideckEditorState,
        view: View
    ): ExcalideckEditorState {
        return { ...excalideckEditorState, activeView: view };
    },

    updatePrintableArea(
        excalideckEditorState: ExcalideckEditorState,
        printableArea: PrintableArea
    ): ExcalideckEditorState {
        return {
            ...excalideckEditorState,
            deck: DeckOperations.updatePrintableArea(
                excalideckEditorState.deck,
                printableArea
            ),
        };
    },

    updateCommonExcalidrawElements(
        excalideckEditorState: ExcalideckEditorState,
        commonExcalidrawElements: ExcalidrawElement[]
    ): ExcalideckEditorState {
        return {
            ...excalideckEditorState,
            deck: DeckOperations.updateCommonExcalidrawElements(
                excalideckEditorState.deck,
                commonExcalidrawElements
            ),
        };
    },

    addEmptySlide(
        excalideckEditorState: ExcalideckEditorState
    ): ExcalideckEditorState {
        const updatedDeck = DeckOperations.addEmptySlide(
            excalideckEditorState.deck
        );
        const addedSlide = last(updatedDeck.slides)!;
        return {
            ...excalideckEditorState,
            deck: updatedDeck,
            selectedSlideId: addedSlide.id,
        };
    },

    moveSlide(
        excalideckEditorState: ExcalideckEditorState,
        fromIndex: number,
        toIndex: number
    ): ExcalideckEditorState {
        return {
            ...excalideckEditorState,
            deck: DeckOperations.moveSlide(
                excalideckEditorState.deck,
                fromIndex,
                toIndex
            ),
        };
    },

    deleteSlide(
        excalideckEditorState: ExcalideckEditorState,
        slideId: string
    ): ExcalideckEditorState {
        const updatedDeck = DeckOperations.deleteSlide(
            excalideckEditorState.deck,
            excalideckEditorState.selectedSlideId
        );
        const updatedSelectedSlideId =
            slideId === excalideckEditorState.selectedSlideId
                ? SlideUtils.getAdjacentSlideId(
                      excalideckEditorState.deck.slides,
                      excalideckEditorState.selectedSlideId
                  ) ?? updatedDeck.slides[0]!.id
                : excalideckEditorState.selectedSlideId;
        return {
            ...excalideckEditorState,
            deck: updatedDeck,
            selectedSlideId: updatedSelectedSlideId,
        };
    },

    updateSlideShouldRender(
        excalideckEditorState: ExcalideckEditorState,
        slideId: string,
        shouldRender: boolean
    ): ExcalideckEditorState {
        return {
            ...excalideckEditorState,
            deck: DeckOperations.updateSlideShouldRender(
                excalideckEditorState.deck,
                slideId,
                shouldRender
            ),
        };
    },

    updateSlideShouldRenderWithCommonExcalidrawElements(
        excalideckEditorState: ExcalideckEditorState,
        slideId: string,
        shouldRenderWithCommonExcalidrawElements: boolean
    ): ExcalideckEditorState {
        return {
            ...excalideckEditorState,
            deck: DeckOperations.updateSlideShouldRenderWithCommonExcalidrawElements(
                excalideckEditorState.deck,
                slideId,
                shouldRenderWithCommonExcalidrawElements
            ),
        };
    },

    updateSlideExcalidrawElements(
        excalideckEditorState: ExcalideckEditorState,
        slideId: string,
        excalidrawElements: ExcalidrawElement[]
    ): ExcalideckEditorState {
        return {
            ...excalideckEditorState,
            deck: DeckOperations.updateSlideExcalidrawElements(
                excalideckEditorState.deck,
                slideId,
                excalidrawElements
            ),
        };
    },

    selectSlide(
        excalideckEditorState: ExcalideckEditorState,
        slideId: string
    ): ExcalideckEditorState {
        return {
            ...excalideckEditorState,
            selectedSlideId: slideId,
        };
    },
};
export default ExcalideckEditorStateOperations;
