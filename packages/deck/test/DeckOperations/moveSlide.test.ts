import { Deck, DeckOperations } from "../../src";
import SlideNotFoundAtIndex from "../../src/errors/SlideNotFoundAtIndex";
import { getSlideIds, makeSlides } from "./testUtils";

describe("DeckOperations.moveSlide", () => {
    it("throws SlideNotFoundAtIndex when no slide exists at one of the specified indexes", () => {
        // Setup
        const deck: Deck = {
            commonExcalidrawElements: [],
            printableArea: { width: 100, height: 100 },
            slides: makeSlides(["0", "1"]),
        };

        // Exercise + verify
        expect(() => DeckOperations.moveSlide(deck, 0, 3)).toThrow(
            SlideNotFoundAtIndex
        );
    });

    it.each([
        {
            initialSlideIds: ["0", "1", "2", "3"],
            from: 1,
            to: 3,
            expectedSlideIds: ["0", "2", "3", "1"],
        },
        {
            initialSlideIds: ["0", "1", "2", "3"],
            from: 3,
            to: 1,
            expectedSlideIds: ["0", "3", "1", "2"],
        },
    ])(
        "moves the slide from position 'from' to position 'to' (case %#)",
        ({ initialSlideIds, from, to, expectedSlideIds }) => {
            // Setup
            const deck: Deck = {
                commonExcalidrawElements: [],
                printableArea: { width: 100, height: 100 },
                slides: makeSlides(initialSlideIds),
            };

            // Exercise
            const newDeck = DeckOperations.moveSlide(deck, from, to);

            // Verify
            expect(getSlideIds(newDeck)).toEqual(expectedSlideIds);
        }
    );
});
