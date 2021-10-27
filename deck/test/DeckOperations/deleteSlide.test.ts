import { Deck, DeckOperations } from "../../src";
import SlideNotFoundWithId from "../../src/errors/SlideNotFoundWithId";
import { getSlideIds, makeSlides } from "./testUtils";

describe("DeckOperations.deleteSlide", () => {
    it("throws SlideNotFoundWithId when no slide exists with the specified id", () => {
        // Setup
        const deck: Deck = {
            commonExcalidrawElements: [],
            printableArea: {
                topLeftCorner: { x: 0, y: 0 },
                bottomRightCorner: { x: 100, y: 100 },
            },
            slides: makeSlides(["0"]),
        };

        // Exercise + verify
        expect(() =>
            DeckOperations.deleteSlide(deck, "non-existing-id")
        ).toThrow(SlideNotFoundWithId);
    });

    it("when the deck contains slides other than the to-be-deleted one, deletes the to-be-deleted slide from the deck", () => {
        // Setup
        const deck: Deck = {
            commonExcalidrawElements: [],
            printableArea: {
                topLeftCorner: { x: 0, y: 0 },
                bottomRightCorner: { x: 100, y: 100 },
            },
            slides: makeSlides(["0", "1"]),
        };

        // Exercise
        const updatedDeck = DeckOperations.deleteSlide(deck, "0");

        // Verify
        expect(getSlideIds(updatedDeck)).toEqual(["1"]);
    });

    it("when the deck only contains the to-be-deleted slide, replaces it with an empty one", () => {
        // Setup
        const deck: Deck = {
            commonExcalidrawElements: [],
            printableArea: {
                topLeftCorner: { x: 0, y: 0 },
                bottomRightCorner: { x: 100, y: 100 },
            },
            slides: makeSlides(["0"]),
        };

        // Exercise
        const updatedDeck = DeckOperations.deleteSlide(deck, "0");

        // Verify
        expect(getSlideIds(updatedDeck)).toHaveLength(1);
    });
});
