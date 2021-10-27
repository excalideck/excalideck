import { Deck, Hash } from "@excalideck/deck";
import { mapValues } from "lodash";
import { useCallback, useState } from "react";
import ExcalideckEditorState from "../entities/ExcalideckEditorState";
import View from "../entities/View";
import ExcalideckEditorStateApi from "../ExcalideckEditorStateApi";

export default function useExcalideckEditorState(
    initialDeck: Deck,
    onDeckChange: (deck: Deck) => void
) {
    const [excalideckEditorState, setExcalideckEditorState] =
        useState<ExcalideckEditorState>({
            activeView: View.Slides,
            deck: initialDeck,
            selectedSlideId: initialDeck.slides[0]!.id,
        });
    const deckHash = Hash.deck(excalideckEditorState.deck);

    const selectedSlide = excalideckEditorState.deck.slides.find(
        (slide) => slide.id === excalideckEditorState.selectedSlideId
    )!;

    const setExcalideckEditorStateAndCallOnChange = useCallback(
        (updatedExcalideckEditorState: ExcalideckEditorState) => {
            setExcalideckEditorState(updatedExcalideckEditorState);
            if (Hash.deck(updatedExcalideckEditorState.deck) !== deckHash) {
                onDeckChange(updatedExcalideckEditorState.deck);
            }
        },
        [onDeckChange, deckHash]
    );

    return {
        ...excalideckEditorState,
        selectedSlide,
        ...statifyExcalideckEditorStateApi(
            excalideckEditorState,
            setExcalideckEditorStateAndCallOnChange
        ),
    };
}

type TupleSplit<
    T,
    N extends number,
    O extends readonly any[] = readonly []
> = O["length"] extends N
    ? [O, T]
    : T extends readonly [infer F, ...infer R]
    ? TupleSplit<readonly [...R], N, readonly [...O, F]>
    : [O, T];

type StatifiedExcalideckEditorStateApi = {
    [Key in keyof typeof ExcalideckEditorStateApi]: (
        ...args: TupleSplit<
            Parameters<typeof ExcalideckEditorStateApi[Key]>,
            1
        >[1]
    ) => void;
};

function statifyExcalideckEditorStateApi(
    excalideckEditorState: ExcalideckEditorState,
    setExcalideckEditorState: (
        excalideckEditorState: ExcalideckEditorState
    ) => void
): StatifiedExcalideckEditorStateApi {
    return mapValues(
        // For each function of the ExcalideckEditorStateApi, expose a
        // function that takes the same arguments, minus the initial
        // excalideckEditorState. The function then injects the
        // excalideckEditorState argument, calls the
        ExcalideckEditorStateApi,
        (apiFn: any) =>
            (...args: any[]) =>
                setExcalideckEditorState(apiFn(excalideckEditorState, ...args))
    );
}
