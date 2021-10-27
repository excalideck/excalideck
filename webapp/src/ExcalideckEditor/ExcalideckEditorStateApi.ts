import { DeckApi, ExcalidrawElement, PrintableArea } from "@excalideck/deck";
import { last } from "lodash";
import ExcalideckEditorState from "./entities/ExcalideckEditorState";
import View from "./entities/View";
import SlideUtils from "./utils/SlideUtils";

const ExcalideckEditorStateApi = {
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
            deck: DeckApi.updatePrintableArea(
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
            deck: DeckApi.updateCommonExcalidrawElements(
                excalideckEditorState.deck,
                commonExcalidrawElements
            ),
        };
    },

    addEmptySlide(
        excalideckEditorState: ExcalideckEditorState
    ): ExcalideckEditorState {
        const updatedDeck = DeckApi.addEmptySlide(excalideckEditorState.deck);
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
            deck: DeckApi.moveSlide(
                excalideckEditorState.deck,
                fromIndex,
                toIndex
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

    deleteSelectedSlide(
        excalideckEditorState: ExcalideckEditorState
    ): ExcalideckEditorState {
        const updatedDeck = DeckApi.deleteSlide(
            excalideckEditorState.deck,
            excalideckEditorState.selectedSlideId
        );
        const adjacentSelectedSlideId = SlideUtils.getAdjacentSlideId(
            excalideckEditorState.deck.slides,
            excalideckEditorState.selectedSlideId
        );
        return {
            ...excalideckEditorState,
            deck: updatedDeck,
            selectedSlideId: adjacentSelectedSlideId
                ? adjacentSelectedSlideId
                : updatedDeck.slides[0]!.id,
        };
    },

    updateSelectedSlideShouldRender(
        excalideckEditorState: ExcalideckEditorState,
        shouldRender: boolean
    ): ExcalideckEditorState {
        return {
            ...excalideckEditorState,
            deck: DeckApi.updateSlideShouldRender(
                excalideckEditorState.deck,
                excalideckEditorState.selectedSlideId,
                shouldRender
            ),
        };
    },

    updateSelectedSlideShouldRenderWithCommonExcalidrawElements(
        excalideckEditorState: ExcalideckEditorState,
        shouldRenderWithCommonExcalidrawElements: boolean
    ): ExcalideckEditorState {
        return {
            ...excalideckEditorState,
            deck: DeckApi.updateSlideShouldRenderWithCommonExcalidrawElements(
                excalideckEditorState.deck,
                excalideckEditorState.selectedSlideId,
                shouldRenderWithCommonExcalidrawElements
            ),
        };
    },

    updateSelectedSlideExcalidrawElements(
        excalideckEditorState: ExcalideckEditorState,
        excalidrawElements: ExcalidrawElement[]
    ): ExcalideckEditorState {
        return {
            ...excalideckEditorState,
            deck: DeckApi.updateSlideExcalidrawElements(
                excalideckEditorState.deck,
                excalideckEditorState.selectedSlideId,
                excalidrawElements
            ),
        };
    },
};
export default ExcalideckEditorStateApi;
