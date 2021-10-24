import { Deck, DeckApi, ExcalidrawElement } from "../../src";
import PrintableAreaUtils from "../../src/utils/PrintableAreaUtils";

describe("DeckApi.updateSlideExcalidrawElementsFromRendering", () => {
    it("removes the printable area and common elements from the passed-in excalidraw elements", () => {
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
                    excalidrawElements: [],
                },
            ],
        };

        // Exercise
        const slideExcalidrawElement: ExcalidrawElement = {
            id: "slideExcalidrawElementId",
            versionNonce: 0,
        };
        const updatedDeck = DeckApi.updateSlideExcalidrawElementsFromRendering(
            deck,
            deck.slides[0]!.id,
            [
                slideExcalidrawElement,
                ...deck.commonExcalidrawElements,
                PrintableAreaUtils.getExcalidrawElement(deck.printableArea),
            ]
        );

        // Verify
        expect(updatedDeck.slides[0]!.excalidrawElements).toEqual([
            slideExcalidrawElement,
        ]);
    });
});
