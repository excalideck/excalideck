import { Deck, DeckOperations } from "@excalideck/deck";
import ExcalideckEditorState from "../../src/entities/ExcalideckEditorState";
import View from "../../src/entities/View";
import ExcalideckEditorStateOperations from "../../src/ExcalideckEditorStateOperations";

describe("ExcalideckEditorStateOperations.deleteSlide", () => {
    describe("when the to-be-deleted slide is the selected one", () => {
        describe("deletes it and selects an adjacent one", () => {
            it("case: to-be-deleted slide is the only one in the deck", () => {
                // Setup
                const deck = DeckOperations.makeEmptyDeck({
                    width: 100,
                    height: 100,
                });
                const excalideckEditorState: ExcalideckEditorState = {
                    activeView: View.Slides,
                    deck,
                    selectedSlideId: deck.slides[0]!.id,
                };

                // Exercise
                const newExcalideckEditorState =
                    ExcalideckEditorStateOperations.deleteSlide(
                        excalideckEditorState,
                        excalideckEditorState.selectedSlideId
                    );

                // Verify
                expect(newExcalideckEditorState.deck.slides).toHaveLength(1);
                expect(newExcalideckEditorState.selectedSlideId).toEqual(
                    newExcalideckEditorState.deck.slides[0]!.id
                );
            });

            it("case: to-be-deleted slide is the first (but not only) one in the deck", () => {
                // Setup
                const deck: Deck = DeckOperations.addEmptySlide(
                    DeckOperations.addEmptySlide(
                        DeckOperations.makeEmptyDeck({
                            width: 100,
                            height: 100,
                        })
                    )
                );
                const excalideckEditorState: ExcalideckEditorState = {
                    activeView: View.Slides,
                    deck,
                    selectedSlideId: deck.slides[0]!.id,
                };

                // Exercise
                const newExcalideckEditorState =
                    ExcalideckEditorStateOperations.deleteSlide(
                        excalideckEditorState,
                        excalideckEditorState.selectedSlideId
                    );

                // Verify
                expect(newExcalideckEditorState.deck.slides).toHaveLength(2);
                expect(newExcalideckEditorState.selectedSlideId).toEqual(
                    newExcalideckEditorState.deck.slides[0]!.id
                );
            });

            it("case: to-be-deleted slide is the last (but not only) one in the deck", () => {
                // Setup
                const deck: Deck = DeckOperations.addEmptySlide(
                    DeckOperations.addEmptySlide(
                        DeckOperations.makeEmptyDeck({
                            width: 100,
                            height: 100,
                        })
                    )
                );
                const excalideckEditorState: ExcalideckEditorState = {
                    activeView: View.Slides,
                    deck,
                    selectedSlideId: deck.slides[2]!.id,
                };

                // Exercise
                const newExcalideckEditorState =
                    ExcalideckEditorStateOperations.deleteSlide(
                        excalideckEditorState,
                        excalideckEditorState.selectedSlideId
                    );

                // Verify
                expect(newExcalideckEditorState.deck.slides).toHaveLength(2);
                expect(newExcalideckEditorState.selectedSlideId).toEqual(
                    newExcalideckEditorState.deck.slides[1]!.id
                );
            });

            it("case: to-be-deleted slide is neither the first nor the last one in the deck", () => {
                // Setup
                const deck: Deck = DeckOperations.addEmptySlide(
                    DeckOperations.addEmptySlide(
                        DeckOperations.makeEmptyDeck({
                            width: 100,
                            height: 100,
                        })
                    )
                );
                const excalideckEditorState: ExcalideckEditorState = {
                    activeView: View.Slides,
                    deck,
                    selectedSlideId: deck.slides[1]!.id,
                };

                // Exercise
                const newExcalideckEditorState =
                    ExcalideckEditorStateOperations.deleteSlide(
                        excalideckEditorState,
                        excalideckEditorState.selectedSlideId
                    );

                // Verify
                expect(newExcalideckEditorState.deck.slides).toHaveLength(2);
                expect(newExcalideckEditorState.selectedSlideId).toEqual(
                    newExcalideckEditorState.deck.slides[0]!.id
                );
            });
        });
    });
});
