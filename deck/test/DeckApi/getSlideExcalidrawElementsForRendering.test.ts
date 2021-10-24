import { Deck, DeckApi } from "../../src";
import PrintableAreaUtils from "../../src/utils/PrintableAreaUtils";

describe("DeckApi.getSlideExcalidrawElementsForRendering", () => {
    describe("when slide.shouldRenderWithCommonElements = true", () => {
        it("returns the slide excalidraw elements, merged with the common excalidraw elements and the printable area", () => {
            // Setup
            const deck: Deck = {
                commonExcalidrawElements: [
                    { id: "commonExcalidrawElementId", versionNonce: 0 },
                ],
                printableArea: {
                    topLeftCorner: { x: 0, y: 0 },
                    bottomRightCorner: { x: 100, y: 100 },
                },
                slides: [
                    {
                        id: "slideId",
                        shouldRender: true,
                        shouldRenderWithCommonExcalidrawElements: true,
                        excalidrawElements: [
                            {
                                id: "slideExcalidrawElementId",
                                versionNonce: 0,
                            },
                        ],
                    },
                ],
            };

            // Exercise
            const excalidrawElements =
                DeckApi.getSlideExcalidrawElementsForRendering(
                    deck,
                    deck.slides[0]!.id
                );

            // Exercise
            expect(excalidrawElements).toEqual([
                ...deck.slides[0]!.excalidrawElements,
                ...deck.commonExcalidrawElements,
                PrintableAreaUtils.getExcalidrawElement(deck.printableArea),
            ]);
        });
    });

    describe("when slide.shouldRenderWithCommonElements = false", () => {
        it("returns the slide excalidraw elements, merged with the common excalidraw elements and the printable area", () => {
            // Setup
            const deck: Deck = {
                commonExcalidrawElements: [
                    { id: "commonExcalidrawElementId", versionNonce: 0 },
                ],
                printableArea: {
                    topLeftCorner: { x: 0, y: 0 },
                    bottomRightCorner: { x: 100, y: 100 },
                },
                slides: [
                    {
                        id: "slideId",
                        shouldRender: true,
                        shouldRenderWithCommonExcalidrawElements: false,
                        excalidrawElements: [
                            {
                                id: "slideExcalidrawElementId",
                                versionNonce: 0,
                            },
                        ],
                    },
                ],
            };

            // Exercise
            const excalidrawElements =
                DeckApi.getSlideExcalidrawElementsForRendering(
                    deck,
                    deck.slides[0]!.id
                );

            // Verify
            expect(excalidrawElements).toEqual([
                ...deck.slides[0]!.excalidrawElements,
                PrintableAreaUtils.getExcalidrawElement(deck.printableArea),
            ]);
        });
    });
});
