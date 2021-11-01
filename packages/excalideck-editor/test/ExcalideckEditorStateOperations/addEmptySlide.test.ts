import { DeckOperations } from "@excalideck/deck";
import ExcalideckEditorState from "../../src/entities/ExcalideckEditorState";
import View from "../../src/entities/View";
import ExcalideckEditorStateOperations from "../../src/ExcalideckEditorStateOperations";

describe("ExcalideckEditorStateOperations.addEmptySlide", () => {
    it("adds an empty slide to the deck and makes it the selected slide", () => {
        // Setup
        const deck = DeckOperations.makeEmptyDeck({ width: 100, height: 100 });
        const excalideckEditorState: ExcalideckEditorState = {
            activeView: View.Slides,
            deck,
            selectedSlideId: deck.slides[0]!.id,
        };

        // Exercise
        const updatedExcalideckEditorState =
            ExcalideckEditorStateOperations.addEmptySlide(
                excalideckEditorState
            );

        // Verify
        expect(updatedExcalideckEditorState.deck.slides).toHaveLength(2);
        expect(updatedExcalideckEditorState.selectedSlideId).toEqual(
            updatedExcalideckEditorState.deck.slides[1]!.id
        );
    });
});
