import { ExcalidrawElement, PrintableArea } from "@excalideck/deck";
import { Zoom } from "@excalidraw/excalidraw/types/types";

const PRINTABLE_AREA_EXCALIDRAW_ELEMENT_ID = "PRINTABLE_AREA";

const PrintableAreaUtils = {
    getExcalidrawElement(printableArea: PrintableArea): ExcalidrawElement {
        const { topLeftCorner, bottomRightCorner } = printableArea;
        return {
            id: PRINTABLE_AREA_EXCALIDRAW_ELEMENT_ID,
            versionNonce: 0,
            version: 0,
            type: "rectangle",
            x: topLeftCorner.x,
            y: topLeftCorner.y,
            width: bottomRightCorner.x - topLeftCorner.x,
            height: bottomRightCorner.y - topLeftCorner.y,
            angle: 0,
            strokeColor: "#000000",
            backgroundColor: "transparent",
            fillStyle: "hachure",
            strokeWidth: 1,
            strokeStyle: "solid",
            roughness: 0,
            opacity: 100,
            groupIds: [],
            strokeSharpness: "sharp",
            seed: 0,
            isDeleted: false,
            boundElementIds: null,
        };
    },

    getExcalidrawElementId(): string {
        return PRINTABLE_AREA_EXCALIDRAW_ELEMENT_ID;
    },

    getFittingZoom(printableArea: PrintableArea): Zoom {
        const printableAreaWidth =
            printableArea.bottomRightCorner.x - printableArea.topLeftCorner.x;
        const printableAreaHeight =
            printableArea.bottomRightCorner.y - printableArea.topLeftCorner.y;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Padding to account for UI elements
        const xPadding = 500;
        const yPadding = 100;

        const availableWidth = windowWidth - xPadding;
        const availableHeight = windowHeight - yPadding;

        const fittingXZoom = availableWidth / printableAreaWidth;
        const fittingYZoom = availableHeight / printableAreaHeight;
        const fittingZoom = Math.min(fittingXZoom, fittingYZoom);

        const xTranslation =
            (windowWidth - fittingZoom * printableAreaWidth) / 2;
        const yTranslation =
            (windowHeight - fittingZoom * printableAreaHeight) / 2;

        return {
            value: fittingZoom as any,
            translation: { x: xTranslation, y: yTranslation },
        };
    },
};
export default PrintableAreaUtils;
