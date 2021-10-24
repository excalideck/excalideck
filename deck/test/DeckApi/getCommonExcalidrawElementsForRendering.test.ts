import { Deck, DeckApi } from "../../src";
import PrintableAreaUtils from "../../src/utils/PrintableAreaUtils";

describe("DeckApi.getCommonExcalidrawElementsForRendering", () => {
    it("returns the common excalidraw elements merged with the printable area", () => {
        // Setup
        const deck: Deck = {
            commonExcalidrawElements: [
                { id: "commonExcalidrawElementId", versionNonce: 0 },
            ],
            printableArea: {
                topLeftCorner: { x: 0, y: 0 },
                bottomRightCorner: { x: 100, y: 100 },
            },
            slides: [],
        };

        // Exercise
        const excalidrawElements =
            DeckApi.getCommonExcalidrawElementsForRendering(deck);

        // Verify
        expect(excalidrawElements).toEqual([
            ...deck.commonExcalidrawElements,
            PrintableAreaUtils.getExcalidrawElement(deck.printableArea),
        ]);
    });
});
