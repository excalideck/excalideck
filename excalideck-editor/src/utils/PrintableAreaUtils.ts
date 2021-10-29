import { ExcalidrawElement, PrintableArea } from "@excalideck/deck";
import { Zoom } from "@excalidraw/excalidraw/types/types";

const PRINTABLE_AREA_EXCALIDRAW_ELEMENT_ID = "PRINTABLE_AREA";

const PrintableAreaUtils = {
    getExcalidrawElement(printableArea: PrintableArea): ExcalidrawElement {
        return {
            id: PRINTABLE_AREA_EXCALIDRAW_ELEMENT_ID,
            versionNonce: 0,
            version: 0,
            type: "rectangle",
            x: 0,
            y: 0,
            width: printableArea.width,
            height: printableArea.height,
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
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Padding to account for UI elements
        const xPadding = 500;
        const yPadding = 100;

        const availableWidth = windowWidth - xPadding;
        const availableHeight = windowHeight - yPadding;

        const fittingXZoom = availableWidth / printableArea.width;
        const fittingYZoom = availableHeight / printableArea.height;
        const fittingZoom = Math.min(fittingXZoom, fittingYZoom);

        const xTranslation =
            (windowWidth - fittingZoom * printableArea.width) / 2;
        const yTranslation =
            (windowHeight - fittingZoom * printableArea.height) / 2;

        return {
            value: fittingZoom as any,
            translation: { x: xTranslation, y: yTranslation },
        };
    },
};
export default PrintableAreaUtils;
