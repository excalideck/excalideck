import { Deck, DeckApi, Slide } from "../../src";

const makeSlides = (ids: string[]): Slide[] =>
    ids.map((id) => ({
        id,
        shouldRender: true,
        shouldRenderWithCommonExcalidrawElements: true,
        excalidrawElements: [],
    }));

const getSlideIds = (deck: Deck): string[] =>
    deck.slides.map((slide) => slide.id);

describe("DeckApi.moveSlide", () => {
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
                printableArea: {
                    topLeftCorner: { x: 0, y: 0 },
                    bottomRightCorner: { x: 100, y: 100 },
                },
                slides: makeSlides(initialSlideIds),
            };

            // Exercise
            const updatedDeck = DeckApi.moveSlide(deck, from, to);

            // Verify
            expect(getSlideIds(updatedDeck)).toEqual(expectedSlideIds);
        }
    );
});
