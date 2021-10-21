import { useState } from "react";
import Deck from "../entities/Deck";
import ExcalideckState from "../entities/ExcalideckState";
import View from "../entities/View";
import fingerprintDeck from "../utils/fingerprintDeck";
import { Statified, statifyClass } from "../utils/statify";

export default function useExcalideckState(
    initialDeck: Deck,
    onDeckChange: (newDeck: Deck) => void
): Statified<ExcalideckState> {
    const [excalideckState, setExcalideckState] = useState<ExcalideckState>(
        ExcalideckState.from({
            activeView: View.Slides,
            deck: initialDeck,
            selectedSlideId: initialDeck.slides[0].id,
        })
    );
    return statifyClass(excalideckState, (newExcalideckState) => {
        setExcalideckState(newExcalideckState);
        if (
            fingerprintDeck(excalideckState.deck) !==
            fingerprintDeck(newExcalideckState.deck)
        ) {
            onDeckChange(newExcalideckState.deck);
        }
    });
}
