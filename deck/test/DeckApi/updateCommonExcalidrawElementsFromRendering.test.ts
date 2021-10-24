import { Deck, DeckApi, ExcalidrawElement } from "../../src";
import PrintableAreaUtils from "../../src/utils/PrintableAreaUtils";

describe("DeckApi.updateCommonExcalidrawElementsFromRendering", () => {
    it("removes the printable area from the passed-in excalidraw elements", () => {
        // Setup
        const deck: Deck = {
            commonExcalidrawElements: [],
            printableArea: {
                topLeftCorner: { x: 0, y: 0 },
                bottomRightCorner: { x: 100, y: 100 },
            },
            slides: [],
        };

        // Exercise
        const commonExcalidrawElement: ExcalidrawElement = {
            id: "commonExcalidrawElementId",
            versionNonce: 0,
        };
        const updatedDeck = DeckApi.updateCommonExcalidrawElementsFromRendering(
            deck,
            [
                commonExcalidrawElement,
                PrintableAreaUtils.getExcalidrawElement(deck.printableArea),
            ]
        );

        // Verify
        expect(updatedDeck.commonExcalidrawElements).toEqual([
            commonExcalidrawElement,
        ]);
    });
});
