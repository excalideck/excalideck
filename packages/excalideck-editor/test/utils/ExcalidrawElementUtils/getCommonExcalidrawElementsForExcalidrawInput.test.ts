import { Deck } from "@excalideck/deck";
import ExcalidrawElementUtils from "../../../src/utils/ExcalidrawElementUtils";
import PrintableAreaUtils from "../../../src/utils/PrintableAreaUtils";

describe("ExcalidrawElementUtils.getCommonExcalidrawElementsForExcalidrawInput", () => {
    it("returns the common excalidraw elements merged with the printable area", () => {
        // Setup
        const deck: Deck = {
            commonExcalidrawElements: [
                { id: "commonExcalidrawElementId", versionNonce: 0 },
            ],
            printableArea: { width: 100, height: 100 },
            slides: [],
        };

        // Exercise
        const commonExcalidrawElementsForExcalidrawInput =
            ExcalidrawElementUtils.getCommonExcalidrawElementsForExcalidrawInput(
                deck
            );

        // Verify
        expect(commonExcalidrawElementsForExcalidrawInput).toEqual([
            ...deck.commonExcalidrawElements,
            PrintableAreaUtils.getExcalidrawElement(deck.printableArea),
        ]);
    });
});
