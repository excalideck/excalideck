import { Deck } from "@excalideck/deck";
import ExcalidrawElementUtils from "../../../src/utils/ExcalidrawElementUtils";
import PrintableAreaUtils from "../../../src/utils/PrintableAreaUtils";

describe("ExcalidrawElementUtils.getSlideExcalidrawElementsForExcalidrawInput", () => {
    describe("when slide.shouldRenderWithCommonExcalidrawElements = true", () => {
        it("returns the slide excalidraw elements, merged with the common excalidraw elements and the printable area", () => {
            // Setup
            const deck: Deck = {
                commonExcalidrawElements: [
                    { id: "commonExcalidrawElementId", versionNonce: 0 },
                ],
                printableArea: { width: 100, height: 100 },
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
            const slideExcalidrawElementsForExcalidrawInput =
                ExcalidrawElementUtils.getSlideExcalidrawElementsForExcalidrawInput(
                    deck,
                    deck.slides[0]!.id
                );

            // Exercise
            expect(slideExcalidrawElementsForExcalidrawInput).toEqual([
                ...deck.slides[0]!.excalidrawElements,
                ...deck.commonExcalidrawElements,
                PrintableAreaUtils.getExcalidrawElement(deck.printableArea),
            ]);
        });
    });

    describe("when slide.shouldRenderWithCommonExcalidrawElements = false", () => {
        it("returns the slide excalidraw elements merged with the printable area", () => {
            // Setup
            const deck: Deck = {
                commonExcalidrawElements: [
                    { id: "commonExcalidrawElementId", versionNonce: 0 },
                ],
                printableArea: { width: 100, height: 100 },
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
            const slideExcalidrawElementsForExcalidrawInput =
                ExcalidrawElementUtils.getSlideExcalidrawElementsForExcalidrawInput(
                    deck,
                    deck.slides[0]!.id
                );

            // Verify
            expect(slideExcalidrawElementsForExcalidrawInput).toEqual([
                ...deck.slides[0]!.excalidrawElements,
                PrintableAreaUtils.getExcalidrawElement(deck.printableArea),
            ]);
        });
    });
});
