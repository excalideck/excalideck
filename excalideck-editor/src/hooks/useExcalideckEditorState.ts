import {
    Deck,
    DeckOperations,
    ExcalidrawElement,
    Hash,
    PrintableArea,
} from "@excalideck/deck";
import { Reducer, useEffect, useReducer } from "react";
import ExcalideckEditorState from "../entities/ExcalideckEditorState";
import View from "../entities/View";
import ExcalideckEditorStateOperations from "../ExcalideckEditorStateOperations";

export default function useExcalideckEditorState(
    initialDeck: Deck,
    onDeckChange: (deck: Deck) => void
) {
    const [excalideckEditorState, dispatch] = useReducer<
        Reducer<ExcalideckEditorState, Action>
    >(excalideckEditorStateReducer, {
        activeView: View.Slides,
        deck: initialDeck,
        selectedSlideId: initialDeck.slides[0]!.id,
    });

    const deckHash = Hash.deck(excalideckEditorState.deck);
    useEffect(() => {
        onDeckChange(excalideckEditorState.deck);
    }, [onDeckChange, deckHash]);

    return {
        activeView: excalideckEditorState.activeView,
        activateView(view: View) {
            dispatch(["activateView", view]);
        },

        deck: excalideckEditorState.deck,
        updatePrintableArea(printableArea: PrintableArea) {
            dispatch(["updatePrintableArea", printableArea]);
        },
        updateCommonExcalidrawElements(
            commonExcalidrawElements: ExcalidrawElement[]
        ) {
            dispatch([
                "updateCommonExcalidrawElements",
                commonExcalidrawElements,
            ]);
        },
        addEmptySlide() {
            dispatch(["addEmptySlide"]);
        },
        moveSlide(fromIndex: number, toIndex: number) {
            dispatch(["moveSlide", fromIndex, toIndex]);
        },
        deleteSlide(slideId: string) {
            dispatch(["deleteSlide", slideId]);
        },
        updateSlideShouldRender(slideId: string, shouldRender: boolean) {
            dispatch(["updateSlideShouldRender", slideId, shouldRender]);
        },
        updateSlideShouldRenderWithCommonExcalidrawElements(
            slideId: string,
            shouldRenderWithCommonExcalidrawElements: boolean
        ) {
            dispatch([
                "updateSlideShouldRender",
                slideId,
                shouldRenderWithCommonExcalidrawElements,
            ]);
        },
        updateSlideExcalidrawElements(
            slideId: string,
            excalidrawElements: ExcalidrawElement[]
        ) {
            dispatch([
                "updateSlideExcalidrawElements",
                slideId,
                excalidrawElements,
            ]);
        },

        selectedSlide: DeckOperations.getSlide(
            excalideckEditorState.deck,
            excalideckEditorState.selectedSlideId
        ),
        selectSlide(slideId: string) {
            dispatch(["selectSlide", slideId]);
        },
    };
}

type Action =
    | ["activateView", View]
    | ["updatePrintableArea", PrintableArea]
    | ["updateCommonExcalidrawElements", ExcalidrawElement[]]
    | ["addEmptySlide"]
    | ["moveSlide", number, number]
    | ["deleteSlide", string]
    | ["updateSlideShouldRender", string, boolean]
    | ["updateSlideShouldRenderWithCommonExcalidrawElements", string, boolean]
    | ["updateSlideExcalidrawElements", string, ExcalidrawElement[]]
    | ["selectSlide", string];

function excalideckEditorStateReducer(
    excalideckEditorState: ExcalideckEditorState,
    [methodName, ...params]: Action
): ExcalideckEditorState {
    return (ExcalideckEditorStateOperations[methodName] as any)(
        excalideckEditorState,
        ...params
    );
}
