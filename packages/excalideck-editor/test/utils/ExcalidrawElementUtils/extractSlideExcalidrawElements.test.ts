import ExcalidrawElementUtils from "../../../src/utils/ExcalidrawElementUtils";
import PrintableAreaUtils from "../../../src/utils/PrintableAreaUtils";

describe("ExcalidrawElementUtils.extractSlideExcalidrawElements", () => {
    it("removes the printable area and common elements from the passed-in excalidraw elements", () => {
        // Setup
        const commonExcalidrawElements = [
            { id: "commonExcalidrawElementId", versionNonce: 0 },
        ];
        const slideExcalidrawElements = [
            { id: "slideExcalidrawElementId", versionNonce: 0 },
        ];
        const excalidrawInputExcalidrawElements = [
            ...slideExcalidrawElements,
            ...commonExcalidrawElements,
            PrintableAreaUtils.getExcalidrawElement({
                width: 100,
                height: 100,
            }),
        ];

        // Exercise
        const extractedSlideExcalidrawElements =
            ExcalidrawElementUtils.extractSlideExcalidrawElements(
                excalidrawInputExcalidrawElements,
                commonExcalidrawElements
            );

        // Verify
        expect(extractedSlideExcalidrawElements).toEqual(
            slideExcalidrawElements
        );
    });
});
