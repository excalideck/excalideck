import ExcalidrawElementUtils from "../../../../src/utils/ExcalidrawElementUtils";
import PrintableAreaUtils from "../../../../src/utils/PrintableAreaUtils";

describe("ExcalidrawElementUtils.extractCommonExcalidrawElements", () => {
    it("removes the printable area from the passed-in excalidraw elements", () => {
        // Setup
        const commonExcalidrawElements = [
            { id: "commonExcalidrawElementId", versionNonce: 0 },
        ];
        const excalidrawInputExcalidrawElements = [
            ...commonExcalidrawElements,
            PrintableAreaUtils.getExcalidrawElement({
                width: 100,
                height: 100,
            }),
        ];

        // Exercise
        const extractedCommonExcalidrawElements =
            ExcalidrawElementUtils.extractCommonExcalidrawElements(
                excalidrawInputExcalidrawElements
            );

        // Verify
        expect(extractedCommonExcalidrawElements).toEqual(
            commonExcalidrawElements
        );
    });
});
